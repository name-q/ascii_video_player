const fs = require('fs');
const readline = require('readline');

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function playAsciiVideo(filepath) {
  const { width, height, fps, frames } = JSON.parse(fs.readFileSync(filepath, 'utf-8'));
  const interval = 1000 / fps;

  readline.emitKeypressEvents(process.stdin);
  if (process.stdin.isTTY) process.stdin.setRawMode(true);

  let stop = false;
  process.stdin.on('keypress', () => stop = true);

  console.clear();

  for (let i = 0; i < frames.length; i++) {
    if (stop) break;
    console.log(frames[i]);
    await sleep(interval);
    process.stdout.write(`\x1b[${height}A`);
  }

  process.stdout.write(`\x1b[${height}B`);
  console.log(stop ? "🏀😧" : "🏀😊🎉");
  
  // 恢复终端状态并退出
  if (process.stdin.isTTY) process.stdin.setRawMode(false);
  process.exit(0);
}

playAsciiVideo('output/ascii_video.json');
