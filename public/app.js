const tokenKey = "token";

const $ = (id) => document.getElementById(id);
const logEl = $("log");

function log(msg) {
  logEl.textContent = `[${new Date().toLocaleTimeString()}] ${msg}\n` + logEl.textContent;
}

function getToken() {
  return localStorage.getItem(tokenKey);
}

function setAuthUI() {
  const t = getToken();
  $("authStatus").textContent = t ? "Logged in (token saved)" : "Not logged in";
}

async function api(path, options = {}) {
  const headers = options.headers || {};
  headers["Content-Type"] = "application/json";
  const t = getToken();
  if (t) headers["Authorization"] = `Bearer ${t}`;

  const res = await fetch(path, { ...options, headers });
  const data = await res.json().catch(() => ({}));

  if (!res.ok) throw new Error(data.message || `HTTP ${res.status}`);
  return data;
}

async function loadPosts() {
  $("posts").innerHTML = "Loading...";
  try {
    const posts = await api("/api/posts");
    $("posts").innerHTML = posts.map(p => `
      <div class="card">
        <h3>${escapeHtml(p.title || "")}</h3>
        <p>${escapeHtml(p.content || "")}</p>
        <p class="muted">id: ${p._id}</p>
      </div>
    `).join("");
    log(`Loaded posts: ${posts.length}`);
  } catch (e) {
    $("posts").innerHTML = "";
    log(`Load posts error: ${e.message}`);
  }
}

function escapeHtml(s){
  return String(s).replace(/[&<>"']/g, c => ({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"
  }[c]));
}

$("registerForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = e.target.email.value;
  const password = e.target.password.value;

  try {
    await api("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({ email, password })
    });
    log("Registered successfully. Now login.");
  } catch (err) {
    log(`Register error: ${err.message}`);
  }
});

$("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = e.target.email.value;
  const password = e.target.password.value;

  try {
    const data = await api("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password })
    });
    localStorage.setItem(tokenKey, data.token);
    setAuthUI();
    log("Login OK. Token saved.");
  } catch (err) {
    log(`Login error: ${err.message}`);
  }
});

$("logoutBtn").addEventListener("click", () => {
  localStorage.removeItem(tokenKey);
  setAuthUI();
  log("Logged out.");
});

$("refreshBtn").addEventListener("click", loadPosts);

$("createPostForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = e.target.title.value;
  const content = e.target.content.value;

  try {
    await api("/api/posts", {
      method: "POST",
      body: JSON.stringify({ title, content })
    });
    log("Post created (if admin).");
    loadPosts();
  } catch (err) {
    log(`Create post error: ${err.message} (If 403 — RBAC works)`);
  }
});

setAuthUI();
loadPosts();
