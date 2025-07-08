const AsciiPlayer = require('./player');

let globalPlayer = null;
let buildCount = 0;
let isWaiting = false;

function withAsciiPlayer(config, videoPath = './ascii_video.json') {
  if (!globalPlayer) {
    globalPlayer = new AsciiPlayer(videoPath);
  }

  // Hook into Metro's transformer
  const originalTransformer = config.transformer || {};
  const originalTransform = originalTransformer.transform;

  return {
    ...config,
    transformer: {
      ...originalTransformer,
      transform: async (params) => {
        // Start playing on first transform
        if (buildCount === 0) {
          buildCount++;
          globalPlayer.start();
          console.log('🎬 Metro bundling...');
        }

        try {
          const result = originalTransform ? 
            await originalTransform(params) : 
            { code: params.src, map: null };
          return result;
        } catch (error) {
          globalPlayer.showError(`Build Error: ${error.message}`);
          throw error;
        }
      }
    },
    server: {
      ...config.server,
      enhanceMiddleware: (middleware, server) => {
        return (req, res, next) => {
          // Detect bundle completion
          if (req.url.includes('.bundle')) {
            const originalEnd = res.end;
            res.end = function(chunk, encoding) {
              if (res.statusCode === 200 && !isWaiting) {
                isWaiting = true;
                globalPlayer.stop();
                console.clear();
                console.log('✅ Bundle ready! Waiting for requests...');
              }
              originalEnd.call(this, chunk, encoding);
            };
          }

          // Detect errors
          if (res.statusCode >= 400) {
            const originalEnd = res.end;
            res.end = function(chunk, encoding) {
              globalPlayer.showError(`HTTP ${res.statusCode}: ${req.url}`);
              originalEnd.call(this, chunk, encoding);
            };
          }

          return middleware(req, res, next);
        };
      }
    }
  };
}

module.exports = { withAsciiPlayer };