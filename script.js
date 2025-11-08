// 🎨 Background Animation
const canvas = document.getElementById("bgCanvas");
if (canvas) {
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let points = Array.from({ length: 100 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.5,
    vy: (Math.random() - 0.5) * 0.5,
  }));

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "#00ffcc";
    points.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
      ctx.stroke();
    });
    requestAnimationFrame(animate);
  }
  animate();
}

// 🚀 Launch Wallet Button
const launchBtn = document.getElementById("launchBtn");
if (launchBtn) {
  launchBtn.addEventListener("click", () => {
    alert("🔓 Wallet launching...");
    window.location.href = "login.html";
  });
}

// 🔐 Login Form Validation
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const user = document.getElementById("username").value;
    const pass = document.getElementById("password").value;
    const msg = document.getElementById("loginMessage");

    if (user === "admin" && pass === "defi123") {
      msg.textContent = "Login successful!";
      msg.style.color = "lime";
    } else {
      msg.textContent = "Invalid credentials.";
      msg.style.color = "red";
    }
  });
}

// 🆕 Sign-Up Form Validation
const signupForm = document.getElementById("signupForm");
if (signupForm) {
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const user = document.getElementById("newUsername").value;
    const email = document.getElementById("newEmail").value;
    const pass = document.getElementById("newPassword").value;
    const confirm = document.getElementById("confirmPassword").value;
    const msg = document.getElementById("signupMessage");

    if (pass !== confirm) {
      msg.textContent = "Passwords do not match.";
      msg.style.color = "red";
    } else {
      msg.textContent = `Welcome, ${user}! Account created.`;
      msg.style.color = "lime";
    }
  });
}