# 🎥 ASCII 视频终端播放器

中文 | [English](./README.md)

一个将 `.mp4` 视频转换为 ASCII 字符画动画并在终端中播放的工具。  
基于 Python + OpenCV（转码）和 Node.js（播放）。

> ✅ 使用 Python 和 Node.js 实现  
> 🎞️ 将视频转换为 ASCII JSON 文件  
> 📟 在终端中平滑播放字符画动画

---

## 📦 环境要求

- Python 3.7+
- Node.js（推荐 LTS）
- 支持终端的 macOS 或 Linux（Windows 建议使用 WSL）

---

## 🚀 快速开始

### 1. 初始化 Python 脚本权限

```bash
npm run initpy
# 设置 convert/run.sh 脚本为可执行。
# 只需运行一次，首次配置时使用。
```

### 2. 将视频转换为 ASCII
```bash
npm run toAscii
# 这条命令会：
# - 自动创建 Python 虚拟环境（如果不存在）
# - 安装 requirements.txt 中的依赖项
# - 读取 assets/video.mp4 并转为字符帧
# - 输出文件为 output/ascii_video.json
# - 可在 convert/video_to_ascii.py 中修改输入路径。
```

### 3. 播放 ASCII 视频
```bash
npm run play
# 读取 output/ascii_video.json 并在终端逐帧播放字符动画。
```

### 📁 项目结构
```bash
ascii_video_player/
├── assets/                 # 视频文件存放目录 (.mp4)
│   └── video.mp4
├── convert/                # Python 转码工具
│   ├── run.sh              # 一键转换脚本
│   ├── requirements.txt    # Python 依赖
│   └── video_to_ascii.py   # 转码脚本
├── output/                 # 输出的 JSON 文件
│   └── ascii_video.json
├── play/                   # Node.js 播放器脚本
│   └── play_ascii_video.js
├── package/                # NPM包，用于构建集成
├── package.json
└── README.md
```

## 📦 NPM包集成

生成的ASCII视频可以集成到构建工具中：

👉 **[ascii-build-player](./package/README_zh.md)** - 支持Metro和Rollup的构建播放器