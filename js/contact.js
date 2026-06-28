

function showError(fieldId, msg) {
  const field = document.getElementById(fieldId);
  const error = document.getElementById(fieldId + '-error');
  if (field)  field.classList.add('error');
  if (error)  { error.textContent = msg; error.classList.add('show'); }
}

function clearError(fieldId) {
  const field = document.getElementById(fieldId);
  const error = document.getElementById(fieldId + '-error');
  if (field)  field.classList.remove('error');
  if (error)  error.classList.remove('show');
}

function validateContact(e) {
  e.preventDefault();

  const name    = document.getElementById('c-name').value.trim();
  const email   = document.getElementById('c-email').value.trim();
  const phone   = document.getElementById('c-phone').value.trim();
  const message = document.getElementById('c-message').value.trim();
  let valid = true;

  // Clear all errors first
  ['c-name', 'c-email', 'c-phone', 'c-message'].forEach(clearError);

  if (!name) {
    showError('c-name', 'Full name is required.');
    valid = false;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    showError('c-email', 'Email address is required.');
    valid = false;
  } else if (!emailPattern.test(email)) {
    showError('c-email', 'Please enter a valid email address.');
    valid = false;
  }

  const phonePattern = /^\d+$/;
  if (!phone) {
    showError('c-phone', 'Phone number is required.');
    valid = false;
  } else if (!phonePattern.test(phone)) {
    showError('c-phone', 'Phone number must contain digits only.');
    valid = false;
  } else if (phone.length < 10) {
    showError('c-phone', 'Phone number must be at least 10 digits.');
    valid = false;
  }

  if (!message) {
    showError('c-message', 'Message cannot be empty.');
    valid = false;
  }

  if (valid) {
    const success = document.getElementById('form-success');
    if (success) { success.classList.add('show'); }
    e.target.reset();
    setTimeout(() => { if (success) success.classList.remove('show'); }, 5000);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  if (form) form.addEventListener('submit', validateContact);
});
