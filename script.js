// ===============================
// AI FINDER - PERSONAL APP
// ===============================

const loginPage = document.getElementById("loginPage");
const signupPage = document.getElementById("signupPage");
const appPage = document.getElementById("appPage");


// ===============================
// SIGN UP
// ===============================

function showSignup() {
  loginPage.classList.add("hidden");
  signupPage.classList.remove("hidden");
}

function showLogin() {
  signupPage.classList.add("hidden");
  loginPage.classList.remove("hidden");
}

function signup() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("signupEmail").value.trim();
  const password = document.getElementById("signupPassword").value;

  const message = document.getElementById("signupMessage");

  if (!name || !email || !password) {
    message.textContent = "Please complete all fields.";
    return;
  }

  if (password.length < 6) {
    message.textContent =
      "Password must be at least 6 characters.";
    return;
  }

  localStorage.setItem("finderName", name);
  localStorage.setItem("finderEmail", email);
  localStorage.setItem("finderPassword", password);

  message.textContent =
    "Account created successfully.";

  setTimeout(() => {
    showLogin();
  }, 800);
}


// ===============================
// LOGIN
// ===============================

function login() {
  const email =
    document.getElementById("email").value.trim();

  const password =
    document.getElementById("password").value;

  const savedEmail =
    localStorage.getItem("finderEmail");

  const savedPassword =
    localStorage.getItem("finderPassword");

  const savedName =
    localStorage.getItem("finderName");

  const message =
    document.getElementById("message");

  if (!email || !password) {
    message.textContent =
      "Please enter your email and password.";
    return;
  }

  if (
    email === savedEmail &&
    password === savedPassword
  ) {

    loginPage.classList.add("hidden");
    signupPage.classList.add("hidden");
    appPage.classList.remove("hidden");

    document.querySelector("#appPage main h1").textContent =
      "Welcome, " + savedName + " 👋";

  } else {

    message.textContent =
      "Incorrect email or password.";
  }
}


// ===============================
// FORGOT PASSWORD
// ===============================

function forgotPassword() {

  const email = prompt(
    "Enter your account email:"
  );

  if (!email) return;

  const savedEmail =
    localStorage.getItem("finderEmail");

  if (email !== savedEmail) {

    alert(
      "No account was found with this email."
    );

    return;
  }

  const newPassword = prompt(
    "Enter your new password:"
  );

  if (!newPassword) return;

  if (newPassword.length < 6) {

    alert(
      "Password must be at least 6 characters."
    );

    return;
  }

  localStorage.setItem(
    "finderPassword",
    newPassword
  );

  alert(
    "Password changed successfully!"
  );
}


// ===============================
// LOG OUT
// ===============================

function logout() {

  appPage.classList.add("hidden");
  loginPage.classList.remove("hidden");

  document.getElementById("email").value = "";
  document.getElementById("password").value = "";
}


// ===============================
// PHOTO UPLOAD
// ===============================

const photoInput =
  document.getElementById("photo");

photoInput.addEventListener(
  "change",
  function () {

    const file = this.files[0];

    const fileName =
      document.getElementById("photoName");

    const preview =
      document.getElementById("preview");

    if (!file) {

      fileName.textContent =
        "No photo selected";

      preview.classList.add("hidden");

      return;
    }

    fileName.textContent =
      "Selected: " + file.name;

    const reader =
      new FileReader();

    reader.onload = function (event) {

      preview.src =
        event.target.result;

      preview.classList.remove(
        "hidden"
      );
    };

    reader.readAsDataURL(file);
  }
);


// ===============================
// PUBLIC PROFILE SEARCH
// ===============================

function searchProfiles() {

  const username =
    document
      .getElementById("username")
      .value
      .trim()
      .replace(/^@/, "");

  const results =
    document.getElementById("results");

  if (!username) {

    results.innerHTML = `
      <h2>Search Results</h2>
      <p>Please enter a public username.</p>
    `;

    return;
  }

  const platforms = [

    {
      name: "Instagram",
      url:
        "https://www.instagram.com/" +
        encodeURIComponent(username) +
        "/"
    },

    {
      name: "TikTok",
      url:
        "https://www.tiktok.com/@" +
        encodeURIComponent(username)
    },

    {
      name: "YouTube",
      url:
        "https://www.youtube.com/@" +
        encodeURIComponent(username)
    },

    {
      name: "X",
      url:
        "https://x.com/" +
        encodeURIComponent(username)
    },

    {
      name: "GitHub",
      url:
        "https://github.com/" +
        encodeURIComponent(username)
    },

    {
      name: "Reddit",
      url:
        "https://www.reddit.com/user/" +
        encodeURIComponent(username) +
        "/"
    }

  ];


  results.innerHTML = `
    <h2>🔎 Public Results</h2>

    <p>
      Public profile links for
      <strong>${escapeHTML(username)}</strong>
    </p>
  `;


  platforms.forEach(platform => {

    results.innerHTML += `

      <div class="result">

        <strong>
          ${platform.name}
        </strong>

        <a
          href="${platform.url}"
          target="_blank"
          rel="noopener noreferrer"
        >
          Open Profile →
        </a>

      </div>

    `;
  });
}


// ===============================
// SECURITY
// ===============================

function escapeHTML(text) {

  const div =
    document.createElement("div");

  div.textContent = text;

  return div.innerHTML;
}
