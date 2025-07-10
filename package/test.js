const { AsciiPlayer } = require('./index');
const path = require('path');

// 测试播放器基本功能
async function testPlayer() {
  console.log('🧪 Testing AsciiPlayer...');
  
  const videoPath = path.join(__dirname, '../output/ascii_video.json');
  const player = new AsciiPlayer(videoPath);
  
  // 开始播放
  player.start();
  
  // 3秒后显示成功
  setTimeout(() => {
    player.showSuccess();
    console.log('✅ Success test passed');
    testExit();
  }, 3000);
}

function testExit() {
  console.log('\n🧪 Testing exit handling...');
  
  const videoPath = path.join(__dirname, '../output/ascii_video.json');
  const player = new AsciiPlayer(videoPath);
  
  player.start();
  
  // 2秒后显示退出
  setTimeout(() => {
    player.showExit();
    console.log('✅ Exit test passed');
    testError();
  }, 2000);
}

function testError() {
  console.log('\n🧪 Testing error handling...');
  
  const videoPath = path.join(__dirname, '../output/ascii_video.json');
  const player = new AsciiPlayer(videoPath);
  
  player.start();
  
  // 2秒后显示错误
  setTimeout(() => {
    player.showError('Test error: Build failed!');
    console.log('✅ Error test passed');
    testRollup();
  }, 2000);
}

function testRollup() {
  console.log('\n🧪 Testing Rollup plugin...');
  
  const asciiPlayerPlugin = require('./rollup');
  const plugin = asciiPlayerPlugin('../output/ascii_video.json');
  
  // 模拟构建开始
  plugin.buildStart();
  
  // 2秒后模拟构建成功
  setTimeout(() => {
    plugin.buildEnd();
    console.log('✅ Rollup plugin test passed');
    console.log('\n🎉 All tests completed!');
  }, 2000);
}

// 开始测试
testPlayer();