// ====== DOM Elements ======
const form = document.getElementById("auth-form");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmInput = document.getElementById("confirm");

const emailError = document.getElementById("email-error");
const passwordError = document.getElementById("password-error");
const confirmError = document.getElementById("confirm-error");

const reqItems = document.querySelectorAll(".reqs li");
const strengthMeter = document.querySelector(".strength");

const togglePwdBtn = document.getElementById("togglePwd");
const submitBtn = document.getElementById("submitBtn");

// ====== Validation Helpers ======
function validateEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email.trim());
}

function checkPasswordRequirements(password) {
  return {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };
}

function calculateStrength(password) {
  const checks = checkPasswordRequirements(password);
  return Object.values(checks).filter(Boolean).length; // score 0–4
}

// ====== UI Update Functions ======
function updateReqList(password) {
  const checks = checkPasswordRequirements(password);
  reqItems.forEach((item) => {
    const req = item.dataset.req;
    if (checks[req]) {
      item.classList.add("ok");
      item.classList.remove("bad");
    } else {
      item.classList.add("bad");
      item.classList.remove("ok");
    }
  });
}

function updateStrengthMeter(score) {
  strengthMeter.className = "strength"; // reset classes
  if (score > 0) {
    strengthMeter.classList.add(`level-${score}`);
  }
}

function showError(input, messageElement, message) {
  messageElement.textContent = message;
  input.classList.add("invalid");
  input.classList.remove("valid");
}

function showSuccess(input, messageElement) {
  messageElement.textContent = "";
  input.classList.add("valid");
  input.classList.remove("invalid");
}

// ====== Event Listeners ======
emailInput.addEventListener("input", () => {
  const value = emailInput.value;
  if (value === "") {
    showError(emailInput, emailError, "Email is required");
  } else if (!validateEmail(value)) {
    showError(emailInput, emailError, "Enter a valid email address");
  } else {
    showSuccess(emailInput, emailError);
  }
  checkFormValidity();
});

passwordInput.addEventListener("input", () => {
  const value = passwordInput.value;
  updateReqList(value);
  const strengthScore = calculateStrength(value);
  updateStrengthMeter(strengthScore);

  if (value === "") {
    showError(passwordInput, passwordError, "Password is required");
  } else if (strengthScore < 4) {
    showError(passwordInput, passwordError, "Password is too weak");
  } else {
    showSuccess(passwordInput, passwordError);
  }
  checkConfirmPassword();
  checkFormValidity();
});

confirmInput.addEventListener("input", () => {
  checkConfirmPassword();
  checkFormValidity();
});

function checkConfirmPassword() {
  const pwd = passwordInput.value;
  const confirm = confirmInput.value;
  if (confirm === "") {
    showError(confirmInput, confirmError, "Please confirm your password");
  } else if (pwd !== confirm) {
    showError(confirmInput, confirmError, "Passwords do not match");
  } else {
    showSuccess(confirmInput, confirmError);
  }
}

// Toggle password visibility
togglePwdBtn.addEventListener("click", () => {
  const type =
    passwordInput.type === "password" ? "text" : "password";
  passwordInput.type = type;
  confirmInput.type = type;
  togglePwdBtn.setAttribute(
    "aria-pressed",
    type === "text" ? "true" : "false"
  );
  togglePwdBtn.setAttribute(
    "aria-label",
    type === "text" ? "Hide password" : "Show password"
  );
});

// Enable/disable submit button
function checkFormValidity() {
  const allValid =
    emailInput.classList.contains("valid") &&
    passwordInput.classList.contains("valid") &&
    confirmInput.classList.contains("valid");

  submitBtn.disabled = !allValid;
}

// Prevent default submit for demo
form.addEventListener("submit", (e) => {
  e.preventDefault();
  alert("✅ Form submitted successfully!");
});
