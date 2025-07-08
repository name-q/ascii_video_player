const AsciiPlayer = require('./player');

let globalPlayer = null;

function withAsciiPlayer(config, videoPath = './ascii_video.json') {
  // Start player immediately
  if (!globalPlayer) {
    globalPlayer = new AsciiPlayer(videoPath);
    // globalPlayer.start();
    
    // Listen for process exit to show success
    process.on('SIGINT', () => {
      globalPlayer?.showSuccess();
      process.exit(0);
    });
    
    // Listen for uncaught errors
    process.on('uncaughtException', (error) => {
      globalPlayer?.showError(error.stack || error.message);
      process.exit(1);
    });
  }
  
  return {
    ...config,
    // Metro config remains unchanged
  };
}

module.exports = { withAsciiPlayer };