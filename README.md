# 🎥 ASCII Video Terminal Player

[中文](./README_zh.md) | English

A tool that converts `.mp4` videos to ASCII art animations and plays them in the terminal.  
Based on Python + OpenCV (conversion) and Node.js (playback).

> ✅ Implemented with Python and Node.js  
> 🎞️ Convert videos to ASCII JSON files  
> 📟 Smooth ASCII animation playback in terminal

---

## 📦 Requirements

- Python 3.7+
- Node.js (LTS recommended)
- macOS or Linux with terminal support (Windows users should use WSL)

---

## 🚀 Quick Start

### 1. Initialize Python Script Permissions

```bash
npm run initpy
# Sets convert/run.sh script as executable
# Only run once for initial setup
```

### 2. Convert Video to ASCII
```bash
npm run toAscii
# This command will:
# - Auto-create Python virtual environment (if not exists)
# - Install dependencies from requirements.txt
# - Read assets/video.mp4 and convert to character frames
# - Output file: output/ascii_video.json
# - You can modify input path in convert/video_to_ascii.py
```

### 3. Play ASCII Video
```bash
npm run play
# Reads output/ascii_video.json and plays character animation frame by frame in terminal
```

### 📁 Project Structure
```bash
ascii_video_player/
├── assets/                 # Video files directory (.mp4)
│   └── video.mp4
├── convert/                # Python conversion tools
│   ├── run.sh              # One-click conversion script
│   ├── requirements.txt    # Python dependencies
│   └── video_to_ascii.py   # Conversion script
├── output/                 # Output JSON files
│   └── ascii_video.json
├── play/                   # Node.js player scripts
│   └── play_ascii_video.js
├── package/                # NPM package for build integration
├── package.json
└── README.md
```

## 📦 NPM Package Integration

The generated ASCII videos can be integrated into build tools:

👉 **[ascii-build-player](./package/README.md)** - Build player supporting Metro and Rollup