document.addEventListener('DOMContentLoaded', () => {
    const googleLoginButton = document.getElementById('google-login');
    const messageElement = document.getElementById('message');
    const protectedButton = document.getElementById('protected');
    const logoutButton = document.getElementById('logout');
  
    if (googleLoginButton) {
      googleLoginButton.addEventListener('click', () => {
        window.location.href = 'http://localhost:5000/auth/google';
      });
    }
  
    if (protectedButton) {
      protectedButton.addEventListener('click', () => {
        const token = new URLSearchParams(window.location.search).get('token');
        fetch('http://localhost:5000/protected', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        .then(response => response.text())
        .then(data => {
          messageElement.textContent = data;
        })
        .catch(error => {
          messageElement.textContent = 'Access denied.';
        });
      });
    }
  
    if (logoutButton) {
      logoutButton.addEventListener('click', () => {
        fetch('http://localhost:5000/logout')
          .then(() => {
            window.location.href = '/';
          });
      });
    }
  });
  