const fs = require("fs");

class AsciiPlayer {
  constructor(videoPath) {
    const data = JSON.parse(fs.readFileSync(videoPath, "utf-8"));
    this.frames = data.frames;
    this.height = data.height;
    this.interval = 1000 / data.fps;
    this.currentFrame = 0;
    this.playing = false;
    this.timer = null;

    // 默认进入拦截逻辑
    this.isHookActive = true;

    this._hookConsoleForMetro(); // 自动侦测 Metro 输出
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
    // 加入零宽空格标记
    console.log(this.frames[this.currentFrame] + "\u200B\u200B");

    this.currentFrame = (this.currentFrame + 1) % this.frames.length;

    this.timer = setTimeout(() => this.playLoop(), this.interval);
  }

  showSuccess() {
    this.stop();
    process.stdout.write(`\x1b[${this.height}A`);
    console.clear();
    console.log("🎉 Build Success! 🎉\u200B\u200B\n");
  }

  showError(error) {
    this.stop();
    process.stdout.write(`\x1b[${this.height}A`);
    console.clear();
    console.error("❌ Build Error:\n");
    console.error(error);
  }

  _stripAnsi(str) {
    return str.replace(
      /[][[\]()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g,
      ""
    );
  }

  _hookConsoleForMetro() {
    const originalStdoutWrite = process.stdout.write.bind(process.stdout);
    const originalStderrWrite = process.stderr.write.bind(process.stderr);

    // 抑制播放时原内容输出
    this.suppressOutput = false;

    process.stdout.write = (chunk, encoding, callback) => {
      if (!this.isHookActive) {
        // 不在播放状态，直接透传，无性能损耗
        return originalStdoutWrite(chunk, encoding, callback);
      }

      const msg = chunk.toString();
      const strippedMsg = this._stripAnsi(msg);

      if (strippedMsg.includes("Dev server ready") && !this.playing) {
        this.suppressOutput = true;
        this.start();
      } else if (
        strippedMsg.trim().startsWith("BUNDLE") &&
        !strippedMsg.includes("%")
      ) {
        this.showSuccess();
        this.suppressOutput = false;
      }

      if (msg.includes("\u200B\u200B") || !this.suppressOutput) {
        originalStdoutWrite(
          chunk.replace("\u200B\u200B", ""),
          encoding,
          callback
        );
      }
    };

    process.stderr.write = (chunk, encoding, callback) => {
      if (!this.isHookActive) {
        // 不在播放状态，直接透传，无性能损耗
        return originalStderrWrite(chunk, encoding, callback);
      }

      const msg = chunk.toString();
      const strippedMsg = this._stripAnsi(msg);

      if (strippedMsg.toLowerCase().includes("error")) {
        this.showError(strippedMsg);
        this.suppressOutput = false;
      }

      if (!this.suppressOutput) {
        originalStderrWrite(chunk, encoding, callback);
      }
    };
  }
}

module.exports = AsciiPlayer;
