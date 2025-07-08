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

## 📁 项目结构

```
package/
├── index.js           # 主入口文件
├── player.js          # 核心播放器类
├── metro.js           # Metro插件
├── rollup.js          # Rollup插件
├── test.js            # 测试脚本
├── example-rollup.js  # Rollup使用示例
├── package.json       # NPM包配置
└── README.md          # 使用文档
```

## 🎯 核心功能

- **循环播放**: 构建过程中持续播放ASCII动画
- **智能停止**: 构建完成或出错时自动停止
- **错误处理**: 显示完整错误堆栈信息
- **成功提示**: 构建成功时显示庆祝动画

## 🧪 测试

```bash
# 运行测试
npm test

# Rollup示例
npm run example:rollup
```

## 🚀 CI/CD

- GitHub Actions自动化测试
- 多Node.js版本兼容性测试
- 自动NPM发布流程