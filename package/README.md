# ASCII Build Player

[中文](./README_zh.md) | English

Play ASCII video animations during build processes. Supports Metro and Rollup.

## 📦 Installation

```bash
npm install ascii-build-player
```

## 🎬 Generate ASCII Video

First, you need to generate ASCII video files using our converter:

👉 **[ASCII Video Generator](https://github.com/name-q/ascii_video_player)**

1. Clone the repository:
```bash
git clone https://github.com/name-q/ascii_video_player.git
cd ascii_video_player
```

2. Convert your video:
```bash
# Put your .mp4 file in assets/video.mp4
npm run initpy  # First time only
npm run toAscii # Convert video to ASCII
```

3. Copy the generated `output/ascii_video.json` to your project

## 🚀 Usage

### Rollup

```js
// rollup.config.js
import asciiPlayerPlugin from 'ascii-build-player/rollup';

export default {
  plugins: [
    asciiPlayerPlugin('path/to/ascii_video.json')
  ]
};
```

### Metro (React Native)

```js
// metro.config.js
const { withAsciiPlayer } = require('ascii-build-player/metro');

module.exports = withAsciiPlayer({
  // Your Metro config
}, 'path/to/ascii_video.json');
```

### Direct Usage

```js
const { AsciiPlayer } = require('ascii-build-player');

const player = new AsciiPlayer('ascii_video.json');
player.start();

// On build success
player.showSuccess();

// On build error
player.showError(error);
```

## 📁 Project Structure

```
package/
├── index.js           # Main entry file
├── player.js          # Core player class
├── metro.js           # Metro plugin
├── rollup.js          # Rollup plugin
├── test.js            # Test script
├── example-rollup.js  # Rollup usage example
├── package.json       # NPM package configuration
└── README.md          # Documentation
```

## 🎯 Core Features

- **Loop Playback**: Continuously plays ASCII animation during the build process
- **Smart Stop**: Automatically stops when the build completes or encounters an error
- **Error Handling**: Displays full error stack trace
- **Success Notification**: Shows a celebratory animation upon successful build

## 🧪 Testing

```bash
# Run tests
npm test

# Rollup example
npm run example:rollup
```

## 🚀 CI/CD

- Automated testing via GitHub Actions
- Compatibility testing across multiple Node.js versions
- Automated publishing to NPM