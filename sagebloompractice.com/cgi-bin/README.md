# Sage & Bloom Practice Portfolio

## Setup

1. Download PHPMailer from https://github.com/PHPMailer/PHPMailer (download ZIP and extract to a `PHPMailer` folder in your project).
2. Upload all files to your web hosting provider.
3. Update `contact.php` with your SMTP settings (see below).

## Contact Form

The contact form uses PHPMailer to send emails via SMTP for reliable delivery.

### SMTP Configuration

The form is configured for Gmail SMTP. To complete setup:

1. Enable 2-Factor Authentication on your Google account (if not already).
2. Generate an app password: Go to https://myaccount.google.com/apppasswords, select "Mail" and "Other", name it "Sage Bloom Contact Form", and copy the 16-character password.
3. In `contact.php`, replace `'your-app-password'` with the generated app password.

#### Gmail Settings (Already Configured)
- Host: `smtp.gmail.com`
- Port: `587`
- Encryption: `PHPMailer::ENCRYPTION_STARTTLS`
- Username: `sage.bloom.practice@gmail.com`
- Password: Your app password

If you prefer a different provider, update the settings accordingly.

## Deployment

Upload the files to your web server. Ensure PHP is enabled.