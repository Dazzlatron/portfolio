document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const messageDiv = document.getElementById('formMessage');
    
    // Show loading message
    messageDiv.className = 'show';
    messageDiv.innerHTML = 'Sending...';
    messageDiv.style.color = 'blue';
    
    fetch('/contact-form.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        // Show success message
        messageDiv.className = 'show success';
        messageDiv.innerHTML = data;
        
        // Clear the form
        document.getElementById('contactForm').reset();
        
        // Optional: Hide message after 5 seconds
        setTimeout(() => {
            messageDiv.className = '';
        }, 5000);
    })
    .catch(error => {
        // Show error message
        messageDiv.className = 'show error';
        messageDiv.innerHTML = 'Something went wrong. Please try again.';
    });
});