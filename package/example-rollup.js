// Rollup使用示例
const asciiPlayerPlugin = require('./rollup');

// 模拟Rollup配置
const config = {
  input: 'src/index.js',
  output: {
    file: 'dist/bundle.js',
    format: 'cjs'
  },
  plugins: [
    asciiPlayerPlugin('../output/ascii_video.json')
  ]
};

// 模拟构建过程
console.log('🚀 Starting Rollup build simulation...');

const plugin = config.plugins[0];

// 开始构建
plugin.buildStart();

// 模拟构建时间
setTimeout(() => {
  // 随机成功或失败
  if (Math.random() > 0.5) {
    plugin.buildEnd(); // 成功
  } else {
    plugin.buildEnd(new Error('Simulated build error')); // 失败
  }
}, 5000);