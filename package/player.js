const fs = require("fs");

class AsciiPlayer {
  constructor(videoPath, options = { tool: "metro", hookConsole: true }) {
    const data = JSON.parse(fs.readFileSync(videoPath, "utf-8"));
    this.frames = data.frames;
    this.height = data.height;
    this.interval = 1000 / data.fps;
    this.currentFrame = 0;
    this.playing = false;
    this.timer = null;

    // 记录原有输出逻辑
    this.originalStdoutWrite = process.stdout.write.bind(process.stdout);
    this.originalStderrWrite = process.stderr.write.bind(process.stderr);

    // 是否进入拦截逻辑
    this.isHookActive = options.hookConsole;
    if (options.hookConsole) {
      // 原自动侦测 Metro 输出 改为公共方案 如果走日志监听在里面判断tool的逻辑
      this._hookConsole(options.tool);
    }
  }

  start() {
    if (this.playing) return;
    this.playing = true;
    this.isHookActive = true; // 开始播放时打开拦截逻辑
    console.clear();
    this.playLoop();
  }

  stop() {
    this.playing = false;
    this.isHookActive = false; // 结束播放时关闭拦截逻辑
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  playLoop() {
    if (!this.playing) return;

    process.stdout.write(`\x1b[${this.height}A`);
    // console.log(this.frames[this.currentFrame] + "\u200B\u200B");
    this.originalStdoutWrite(this.frames[this.currentFrame]);

    this.currentFrame = (this.currentFrame + 1) % this.frames.length;

    this.timer = setTimeout(() => this.playLoop(), this.interval);
  }

  showSuccess() {
    this.stop();
    this.originalStdoutWrite(`\x1b[${this.height}A`);
    console.clear();
    // console.log("🎉 Build Success! 🎉\u200B\u200B\n");
    this.originalStdoutWrite("🎉 Build Success! 🎉\n");
  }

  showError(error) {
    this.stop();
    this.originalStdoutWrite(`\x1b[${this.height}A`);
    console.clear();
    this.originalStderrWrite("❌ Build Error:\n\n");
    this.originalStderrWrite(error + "\n\n");
  }

  _stripAnsi(str) {
    return str.replace(
      /[][[\]()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g,
      ""
    );
  }

  // 日志拦截方案
  _hookConsole(tool) {
    // 抑制播放时原内容输出
    // this.suppressOutput = false;

    process.stdout.write = (chunk, encoding, callback) => {
      if (!this.isHookActive) {
        return this.originalStdoutWrite(chunk, encoding, callback);
      }

      const msg = chunk.toString();
      const strippedMsg = this._stripAnsi(msg);

      if (tool === "metro") {
        if (!this.playing && strippedMsg.includes("Dev server ready")) {
          // this.suppressOutput = true;
          this.start();
        } else if (
          strippedMsg.trim().startsWith("BUNDLE") &&
          !strippedMsg.includes("%")
        ) {
          this.showSuccess();
          // this.suppressOutput = false;
        }
      }

      // 如果rollup、webpack、vite等工具也要走日志监听的路子，可以在这里扩展
      // 但目前rollup走生命周期钩子，，所以这里就不写了

      // 如果没有播放状态，直接输出原内容
      if (!this.playing) {
        return this.originalStdoutWrite(chunk, encoding, callback);
      }
    };

    // error的输出逻辑在外部process.on('uncaughtException', ...)中处理或生命周期监听了 这里也去掉吧
    // process.stderr.write = (chunk, encoding, callback) => {
    //   if (!this.suppressOutput) {
    //     return originalStderrWrite(chunk, encoding, callback);
    //   }

    //   const msg = this._stripAnsi(chunk.toString());

    //   if (msg.toLowerCase().includes("error")) {
    //     this.showError(msg);
    //   }

    //   // stderr 同理屏蔽
    // };
  }
}

module.exports = AsciiPlayer;
