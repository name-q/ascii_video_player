# ASCII Build Player

中文 | [English](./README.md)

在构建过程中播放ASCII视频动画的npm包，支持Metro和Rollup。

## 📦 安装

```bash
npm install ascii-build-player
```

## 🎬 生成ASCII视频

首先，你需要使用我们的转换器生成ASCII视频文件：

👉 **[ASCII视频生成器](https://github.com/name-q/ascii_video_player)**

1. 克隆仓库：
```bash
git clone https://github.com/name-q/ascii_video_player.git
cd ascii_video_player
```

2. 转换你的视频：
```bash
# 将你的.mp4文件放在 assets/video.mp4
npm run initpy  # 仅首次运行
npm run toAscii # 转换视频为ASCII
```

3. 将生成的 `output/ascii_video.json` 复制到你的项目根目录

## ⚠️ 重要：排除ASCII文件打包

为防止大型ASCII视频文件被打包：

**Rollup:**
```js
// rollup.config.js
export default {
  external: ['./ascii_video.json'] // 从根目录排除
};
```

**Metro (React Native):**
```js
// metro.config.js
const path = require('path');

module.exports = {
  resolver: {
    alias: {
      // 保持ASCII视频文件外部化
      './ascii_video.json': path.resolve(__dirname, 'ascii_video.json'),
    },
  },
};
```

**或者将ASCII文件放在public文件夹中并使用绝对路径**

## 🚀 使用方法

### Rollup

```js
// rollup.config.js
import asciiPlayerPlugin from 'ascii-build-player/rollup';

export default {
  plugins: [
    asciiPlayerPlugin('./ascii_video.json') // 从项目根目录
  ]
};
```

### Metro (React Native)

```js
// metro.config.js
const { withAsciiPlayer } = require('ascii-build-player/metro');

module.exports = withAsciiPlayer({
  // 你的Metro配置
}, './ascii_video.json'); // 从项目根目录
```

### 直接使用播放器

```js
const { AsciiPlayer } = require('ascii-build-player');

const player = new AsciiPlayer('./ascii_video.json'); // 从项目根目录
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