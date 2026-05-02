
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent normal form submission
    
    const formData = new FormData(this);
    const messageDiv = document.getElementById('formMessage');
    
    // Show loading message
    messageDiv.innerHTML = 'Sending...';
    messageDiv.style.color = 'blue';
    
    // Send form via AJAX
    fetch('/contact-form.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        // Show success message
        messageDiv.innerHTML = data;
        messageDiv.style.color = 'green';
        
        // Clear the form
        document.getElementById('contactForm').reset();
    })
    .catch(error => {
        // Show error message
        messageDiv.innerHTML = 'Something went wrong. Please try again.';
        messageDiv.style.color = 'red';
    });
});
