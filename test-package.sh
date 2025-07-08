#!/bin/bash

echo "🧪 Testing ASCII Build Player Package"

# 确保有ASCII视频文件
if [ ! -f "output/ascii_video.json" ]; then
    echo "📹 Converting video to ASCII first..."
    npm run toAscii
fi

# 复制ASCII视频到package目录
cp output/ascii_video.json package/

# 进入package目录
cd package

echo "🔧 Running basic tests..."
timeout 10s node test.js

echo ""
echo "🎲 Running Rollup example..."
timeout 8s node example-rollup.js

echo ""
echo "✅ Package testing completed!"