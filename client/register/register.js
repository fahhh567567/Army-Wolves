// register.js

import { registerUser } from "./registerAPI";

let selectedColor = "pink";
let selectedCaptcha = null;

// ----------------------
// COLOR SELECT
// ----------------------
document.querySelectorAll(".color").forEach(color => {
  color.addEventListener("click", () => {

    document
      .querySelectorAll(".color")
      .forEach(c => c.classList.remove("selected"));

    color.classList.add("selected");

    selectedColor = color.dataset.color;
  });
});

// ----------------------
// CAPTCHA SELECT
// ----------------------
document.querySelectorAll(".choices button").forEach(btn => {
  btn.addEventListener("click", () => {

    document
      .querySelectorAll(".choices button")
      .forEach(b => (b.style.border = "none"));

    btn.style.border = "2px solid yellow";

    selectedCaptcha = btn.dataset.answer;
  });
});

// ----------------------
// REGISTER
// ----------------------
document
  .getElementById("registerBtn")
  .addEventListener("click", handleRegister);

async function handleRegister() {

  const username =
    document.getElementById("username").value.trim();

  const password =
    document.getElementById("password").value;

  const confirmPassword =
    document.getElementById("confirmPassword").value;

  const email =
    document.getElementById("email").value.trim();

  const referral =
    document.getElementById("referral").value.trim();

  const terms =
    document.getElementById("terms").checked;

  // ----------------------
  // VALIDATION
  // ----------------------

  if (!username || !password || !email) {
    alert("Fill all required fields");
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  if (!terms) {
    alert("You must accept the terms");
    return;
  }

  if (!selectedCaptcha) {
    alert("Select the captcha item");
    return;
  }

  try {

    await registerUser({
      username,
      password,
      email,
      color: selectedColor,
      captcha: selectedCaptcha,
      referral
    });

    alert("Account created!");

    window.location.href = "../play.html";

  } catch (err) {

    console.error(err);

    alert(err.message || "Registration failed");
  }
}