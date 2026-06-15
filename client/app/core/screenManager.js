export class ScreenManager {
  constructor() {
    this.current = null;
    this.currentName = null;
  }

  set(screen, name = null) {
    // cleanup old screen
    if (this.current?.destroy) {
      this.current.destroy();
    }

    this.current = screen;
    this.currentName = name;

    // optional lifecycle hook
    if (this.current?.enter) {
      this.current.enter();
    }

    console.log(`[ScreenManager] -> ${name || "unknown"}`);
  }

  update(dt) {
    if (this.current?.update) {
      this.current.update(dt);
    }
  }

  render(ctx) {
    if (this.current?.render) {
      this.current.render(ctx);
    }
  }

  pointerDown(x, y) {
    if (this.current?.pointerDown) {
      this.current.pointerDown(x, y);
    }
  }

  pointerMove(x, y) {
    if (this.current?.pointerMove) {
      this.current.pointerMove(x, y);
    }
  }

  pointerUp(x, y) {
    if (this.current?.pointerUp) {
      this.current.pointerUp(x, y);
    }
  }

  keyDown(e) {
    if (this.current?.keyDown) {
      this.current.keyDown(e);
    }
  }

  keyUp(e) {
    if (this.current?.keyUp) {
      this.current.keyUp(e);
    }
  }

  destroy() {
    if (this.current?.destroy) {
      this.current.destroy();
    }

    this.current = null;
    this.currentName = null;
  }
}