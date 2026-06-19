export class FormController {
  keyDown(screen, e) {
    if (!screen?.form) return;

    if (e.key === "Tab") {
      e.preventDefault();
      this.nextField(screen);
      return;
    }

    if (e.key === "Enter") {
      screen.submit?.();
      return;
    }

    const field = screen.form.fields[screen.form.focus];
    if (!field) return;

    if (e.key === "Backspace") {
      field.value = field.value.slice(0, -1);
      return;
    }

    if (e.key.length === 1) {
      if (field.value.length >= field.maxLength) return;
      field.value += e.key;
    }
  }

  nextField(screen) {
    const order = screen.form.order;
    const current = order.indexOf(screen.form.focus);

    screen.form.focus =
      order[(current + 1) % order.length];
  }

  pointerDown(screen, x, y) {
    if (!screen?.form?.layout) return;

    for (const name in screen.form.layout) {
      const box = screen.form.layout[name];

      const inside =
        x >= box.x &&
        x <= box.x + box.w &&
        y >= box.y &&
        y <= box.y + box.h;

      if (inside) {
        screen.form.focus = name;
        return;
      }
    }
  }
}