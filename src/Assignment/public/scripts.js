document.addEventListener('DOMContentLoaded', () => {
    const deleteForms = document.querySelectorAll('.delete-form');
    deleteForms.forEach(form => {
      form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const userId = form.querySelector('input[name="UserId"]').value;
        const response = await fetch('/deleteUser', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ UserId: userId })
        });
        if (response.ok) {
          location.reload();
        }
      });
    });
  });
  