let selectedColor = "blue";
let selectedCaptcha = null;

// COLOR SELECT
document.querySelectorAll(".color").forEach(c => {
    c.addEventListener("click", () => {
        document.querySelectorAll(".color").forEach(x => x.classList.remove("selected"));
        c.classList.add("selected");
        selectedColor = c.dataset.color;
    });
});

// CAPTCHA SELECT
document.querySelectorAll(".choices button").forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelectorAll(".choices button").forEach(x => x.style.border = "none");
        btn.style.border = "2px solid yellow";
        selectedCaptcha = btn.dataset.answer;
    });
});

// REGISTER BUTTON
document.getElementById("registerBtn").addEventListener("click", async () => {

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const email = document.getElementById("email").value.trim();
    const referral = document.getElementById("referral").value.trim();
    const terms = document.getElementById("terms").checked;

    // BASIC VALIDATION
    if (!username || !password || !email) {
        alert("Fill all required fields");
        return;
    }

    if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
    }

    if (!terms) {
        alert("You must accept terms");
        return;
    }

    if (!selectedCaptcha) {
        alert("Select the captcha item");
        return;
    }

    // SEND TO BACKEND
    try {
        const res = await fetch("http://localhost:3000/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username,
                password,
                email,
                color: selectedColor,
                captcha: selectedCaptcha,
                referral
            })
        });

        const data = await res.json();

        if (!res.ok) {
            alert(data.error || "Registration failed");
            return;
        }

        alert("Account created!");
        window.location.href = "/login.html";

    } catch (err) {
        console.error(err);
        alert("Server error");
    }
});