export class LoginScreen {
  constructor({ onLogin } = {}) {
    this.type = "login";
    this.onLogin = onLogin;

    this.form = {
      fields: {
        username: { value: "", type: "text" },
        password: { value: "", type: "password" }
      },

      focus: "username",

      layout: {
        username: { x: 400, y: 270, w: 320, h: 56 },
        password: { x: 400, y: 350, w: 320, h: 56 }
      }
    };
  }

  submit() {
    const { username, password } = this.form.fields;

    if (!username.value || !password.value) return;

    this.onLogin?.(username.value, password.value);
  }
}