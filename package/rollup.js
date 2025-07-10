const AsciiPlayer = require('./player');

function asciiPlayerPlugin(videoPath = './ascii_video.json') {
  let player = null;

  return {
    name: 'ascii-build-player',
    
    buildStart() {
      player = new AsciiPlayer(videoPath, { tool: 'rollup', hookConsole: false });
      player.start();
    },

    buildEnd(error) {
      if (error) {
        player?.showError(error.stack || error.message);
      } else {
        player?.showSuccess();
      }
    }
  };
}

module.exports = asciiPlayerPlugin;