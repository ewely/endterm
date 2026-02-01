function getUserIdFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

const loginBtn = document.getElementById("loginBtn");
if (loginBtn) {
  loginBtn.addEventListener("click", async () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) return alert(data.message);
      localStorage.setItem("user", JSON.stringify(data));
      window.location.href = "profile.html";
    } catch (err) { console.error(err); alert("Ошибка сервера"); }
  });
}

const profileName = document.getElementById("profileName");
const profileEmail = document.getElementById("profileEmail");
const user = JSON.parse(localStorage.getItem("user"));
if (profileName && user) {
  profileName.textContent = `Name: ${user.name}`;
  profileEmail.textContent = `Email: ${user.email}`;
}

const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("user");
  window.location.href = "login.html";
});

async function loadUsers() {
  const tableBody = document.querySelector("#userTable tbody");
  if (!tableBody) return;
  const res = await fetch("/api/auth");
  const users = await res.json();
  tableBody.innerHTML = "";
  users.forEach(u => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${u.name}</td>
      <td>${u.email}</td>
      <td>
        <a href="edit-user.html?id=${u._id}" class="action-btn edit-btn">
          <i class="fas fa-edit"></i> Edit
        </a>
        <button onclick="deleteUser('${u._id}')" class="action-btn delete-btn">
          <i class="fas fa-trash-alt"></i> Delete
        </button>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

async function deleteUser(id) { 
  if (!confirm("Удалить пользователя?")) return;
  await fetch(`/api/auth/${id}`, { method: "DELETE" });
  loadUsers();
}

const addBtn = document.getElementById("addBtn");
if (addBtn) {
  addBtn.addEventListener("click", async () => {
    const name = document.getElementById("addName").value;
    const email = document.getElementById("addEmail").value;
    const password = document.getElementById("addPassword").value;
    const res = await fetch("/api/auth/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password })
    });
    if (!res.ok) return alert((await res.json()).message);
    alert("Пользователь добавлен!");
    window.location.href = "index.html";
  });
}

const editBtn = document.getElementById("saveEditBtn");
if (editBtn) {
  editBtn.addEventListener("click", async () => {
    const id = getUserIdFromURL();
    const name = document.getElementById("editName").value;
    const email = document.getElementById("editEmail").value;
    const password = document.getElementById("editPassword").value;
    const body = { name, email };
    if (password) body.password = password;
    const res = await fetch(`/api/auth/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
    if (!res.ok) return alert((await res.json()).message);
    alert("User updated!");
    window.location.href = "index.html";
  });
}

if (document.getElementById("editName")) {
  const id = getUserIdFromURL();
  fetch(`/api/auth/${id}`).then(res => res.json())
  .then(data => {
    document.getElementById("editName").value = data.name;
    document.getElementById("editEmail").value = data.email;
  });
}

// LOAD USERS
loadUsers();
