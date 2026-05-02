<?php
// Prevent direct access
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: /');
    exit;
}

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

$mail = new PHPMailer(true);

try {
    // Use GoDaddy's SMTP relay instead of mail()
    $mail->isSMTP();
    $mail->Host = 'localhost';
    $mail->SMTPAuth = false;
    $mail->Port = 25;
    
    $mail->setFrom('hello@darynhigginson.com', 'Website Contact Form');
    $mail->addReplyTo($_POST['email'], $_POST['name']); 
    $mail->addAddress('hello@darynhigginson.com');
    
    $mail->Subject = 'New Contact Form Submission';
    $mail->Body = "Name: " . $_POST['name'] . "\n";
    $mail->Body .= "Email: " . $_POST['email'] . "\n";
    $mail->Body .= "Message: " . $_POST['message'];
    
    $mail->send();
    echo 'Message sent successfully!';
    
} catch (Exception $e) {
    echo "Error: {$mail->ErrorInfo}";
}
?>