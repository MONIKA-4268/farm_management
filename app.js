const loginForm = document.getElementById('login-form');
const loginError = document.getElementById('login-error');
const loginSection = document.getElementById('login-section');
const dashboard = document.getElementById('dashboard');
const logoutBtn = document.getElementById('logout-btn');

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  try {
    const res = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const data = await res.json();

    if (res.ok) {
      localStorage.setItem('token', data.token);
      loginSection.style.display = 'none';
      dashboard.style.display = 'block';
      loginError.textContent = '';
    } else {
      loginError.textContent = data.message || 'Login failed';
    }
  } catch (err) {
    loginError.textContent = 'Error connecting to server';
  }
});

logoutBtn.addEventListener('click', () => {
  localStorage.removeItem('token');
  loginSection.style.display = 'block';
  dashboard.style.display = 'none';
});
