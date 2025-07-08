const AsciiPlayer = require('./player');

function createMetroPlugin(videoPath = 'output/ascii_video.json') {
  let player = null;

  return {
    name: 'ascii-build-player',
    
    setup(build) {
      // Metro build start
      build.onStart(() => {
        player = new AsciiPlayer(videoPath);
        player.start();
      });

      // Metro build end
      build.onEnd((result) => {
        if (result.errors.length > 0) {
          player?.showError(result.errors.join('\n'));
        } else {
          player?.showSuccess();
        }
      });
    }
  };
}

// For Metro config
function withAsciiPlayer(config, videoPath) {
  const originalTransformer = config.transformer || {};
  
  return {
    ...config,
    transformer: {
      ...originalTransformer,
      plugins: [
        ...(originalTransformer.plugins || []),
        createMetroPlugin(videoPath)
      ]
    }
  };
}

module.exports = { createMetroPlugin, withAsciiPlayer };