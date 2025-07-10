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

    this._hookConsoleForMetro(); // 自动侦测 Metro 输出
  }

  start() {
    if (this.playing) return;
    this.playing = true;
    console.clear();
    this.playLoop();
  }

  stop() {
    this.playing = false;
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  playLoop() {
    if (!this.playing) return;

    process.stdout.write(`\x1b[${this.height}A`);
    console.log(this.frames[this.currentFrame]);

    this.currentFrame = (this.currentFrame + 1) % this.frames.length;

    this.timer = setTimeout(() => this.playLoop(), this.interval);
  }

  showSuccess() {
    this.stop();
    process.stdout.write(`\x1b[${this.height}A`);
    console.clear();
    console.log("🎉 Build Success! 🎉");
  }

  showError(error) {
    this.stop();
    process.stdout.write(`\x1b[${this.height}A`);
    console.clear();
    console.error("❌ Build Error:");
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

    this.suppressOutput = false;

    process.stdout.write = (chunk, encoding, callback) => {
      const msg = this._stripAnsi(chunk.toString());

      if (msg.includes("Dev server ready") && !this.playing) {
        this.suppressOutput = true;
        this.start();
      } else if (msg.trim().startsWith("BUNDLE") && !msg.includes("%")) {
        this.showSuccess();
        this.suppressOutput = false;
      }

      if (!this.suppressOutput) {
        originalStdoutWrite(chunk, encoding, callback);
      }
    };

    process.stderr.write = (chunk, encoding, callback) => {
      const msg = this._stripAnsi(chunk.toString());

      if (msg.toLowerCase().includes("error")) {
        this.showError(msg);
        this.suppressOutput = false;
      }

      if (!this.suppressOutput) {
        originalStderrWrite(chunk, encoding, callback);
      }
    };
  }
}

module.exports = AsciiPlayer;
