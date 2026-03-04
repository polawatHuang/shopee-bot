const API = "/api";

function getToken() {
  return localStorage.getItem("token");
}

async function register() {
  await fetch(API + "/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: email.value,
      password: password.value
    })
  });
  alert("Registered");
}

async function login() {
  const res = await fetch(API + "/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: email.value,
      password: password.value
    })
  });

  const data = await res.json();
  localStorage.setItem("token", data.token);
  location.href = "/";
}

async function createJob() {
  await fetch(API + "/bot/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getToken()
    },
    body: JSON.stringify({
      product_link: link.value,
      target_price: price.value
    })
  });

  alert("Job created");
  loadDashboard();
}

async function loadDashboard() {
  const res = await fetch(API + "/dashboard", {
    headers: { Authorization: "Bearer " + getToken() }
  });

  const data = await res.json();
  stats.innerHTML = `
    Success Rate: ${data.percent}% <br/>
    ${data.success} / ${data.total}
  `;
}

if (window.location.pathname === "/") {
  loadDashboard();
}