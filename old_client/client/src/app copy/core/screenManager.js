export class ScreenManager {
  constructor() {
    this.current = null;
    this.currentName = null;
  }

  set(screen, name = null) {
    if (this.current?.destroy) {
      this.current.destroy();
    }

    this.current = screen;
    this.currentName = name;

    if (this.current?.enter) {
      this.current.enter();
    }

    console.log(`[ScreenManager] -> ${name || "unknown"}`);
  }

  update(dt) {
    this.current?.update?.(dt);
  }

  // 👇 input stays here (routing layer)
  pointerDown(x, y) {
    this.current?.pointerDown?.(x, y);
  }

  pointerMove(x, y) {
    this.current?.pointerMove?.(x, y);
  }

  pointerUp(x, y) {
    this.current?.pointerUp?.(x, y);
  }

  keyDown(e) {
    this.current?.keyDown?.(e);
  }

  keyUp(e) {
    this.current?.keyUp?.(e);
  }

  destroy() {
    this.current?.destroy?.();
    this.current = null;
    this.currentName = null;
  }
}