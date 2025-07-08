# ASCII Build Player

在构建过程中播放ASCII视频动画的npm包，支持Metro和Rollup。

## 安装

```bash
npm install ascii-build-player
```

## 使用

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
  // 你的Metro配置
}, 'path/to/ascii_video.json');
```

### 直接使用播放器

```js
const { AsciiPlayer } = require('ascii-build-player');

const player = new AsciiPlayer('ascii_video.json');
player.start();

// 构建成功时
player.showSuccess();

// 构建失败时
player.showError(error);
```