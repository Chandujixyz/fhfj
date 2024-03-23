const loginContainer = document.getElementById('loginContainer');
const profileContainer = document.getElementById('profileContainer');
const errorMessage = document.getElementById('errorMessage');
const userInfo = document.getElementById('userInfo');

async function handleLogin() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  try {
    const response = await fetch('https://dummyjson.com/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem('token', data.token);
      localStorage.setItem('id', data.id);
      showProfile();
    } else {
      const errorMessageText = await response.json();
      errorMessage.textContent = errorMessageText.error;
      errorMessage.style.display = 'block';
    }
  } catch (error) {
    console.error('Login error:', error);
  }
}

function showProfile() {
    const id = localStorage.getItem('id');
    const token = localStorage.getItem('token');

    if (id && token) {
      fetch(`https://dummyjson.com/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          userInfo.innerHTML = `
            <p>Name: ${data.name}</p>
            <p>Email: ${data.email}</p>
            <!-- Display other user information as needed -->
          `;
          loginContainer.style.display = 'none';
          profileContainer.style.display = 'block';
        })
        .catch((error) => console.error('Profile fetch error:', error));
    }
  }

  // Check if user is already logged in
  const storedToken = localStorage.getItem('token');
  if (storedToken) {
    showProfile();
  }