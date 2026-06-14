handleLogin() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;

  fetch("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  })
  .then(res => res.json())
  .then(data => {

    if (!data.success) {
      alert(data.error || "Login failed");
      return;
    }

    this.onLoginSuccess({
      user: data.user,
      token: data.token || null,      // safe fallback
      playerId: data.user.id
    });

  })
  .catch(err => {
    console.error(err);
    alert("Server error");
  });
}