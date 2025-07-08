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

  _hookConsoleForMetro() {
    const originalLog = console.log;
    const originalError = console.error;

    console.log = (...args) => {
      const msg = args.join(" ");

      if (msg.includes("BUNDLE") && msg.includes("%") && !this.playing) {
        // 启动动画
        this.start();
      } else if (msg.trim().startsWith("BUNDLE") && !msg.includes("%")) {
        // 结束构建
        this.showSuccess();
      }

      originalLog(...args);
    };

    console.error = (...args) => {
      const msg = args.join(" ");
      if (msg.toLowerCase().includes("error")) {
        this.showError(msg);
      }
      originalError(...args);
    };
  }
}

module.exports = AsciiPlayer;
