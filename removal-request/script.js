const form = document.getElementById('removal-form');
const usernameInput = document.getElementById('username');
const reasonInput = document.getElementById('reason');
const messageEl = document.getElementById('message');

form.addEventListener('submit', async (event) => {
  event.preventDefault(); // Prevent default form submission

  const username = usernameInput.value.trim();
  const reason = reasonInput.value.trim();

  if (username === '') {
    messageEl.textContent = 'Error: Please enter your Meta Quest username.';
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
      body: JSON.stringify({
        content: `**Monkey Mall Account Removal Request:**\nUsername: ${username}\nReason: ${reason || 'None provided'}\n`,
      }),
    });

    if (response.ok) {
      messageEl.textContent = 'Account removal request submitted. Please allow for processing.';
      form.reset(); // Clear form after successful submission
    } else {
      messageEl.textContent = `Error: ${response.statusText}`;
    }
  } catch (error) {
    console.error('Error sending request:', error);
    messageEl.textContent = 'An error occurred. Please try again later.';
  }
});
