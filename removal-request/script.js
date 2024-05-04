const form = document.getElementById('removal-form');
const message = document.getElementById('message');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const username = document.getElementById('username').value.trim();
  const reason = document.getElementById('reason').value.trim();

  if (!username) {
    message.textContent = 'Error: Please enter your Meta Quest username.';
    return;
  }

  const data = {
    username,
    reason,
  };

  try {
    const response = await fetch('https://discord.com/api/webhooks/1236291748242788414/UrUBhrlstiYB9RaLdsTZNaaOx-wfqBzO_RQkOYZy_pas0rgLKhGtlSX9rnqyDLsHsAkb', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      message.textContent = 'Your removal request has been submitted. You will be contacted shortly.';
      form.reset();
    } else {
      message.textContent = 'An error occurred. Please try again later.';
    }
  } catch (error) {
    console.error(error);
    message.textContent = 'An error occurred. Please try again later.';
  }
});
