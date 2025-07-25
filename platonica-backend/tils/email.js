const nodemailer = require('nodemailer');

// Create transporter
const createTransporter = () => {
    return nodemailer.createTransporter({
        service: process.env.EMAIL_SERVICE,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });
};

// Send contact form notification
const sendContactNotification = async (contactData) => {
    const transporter = createTransporter();
    
    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: process.env.EMAIL_USER,
        subject: `New Contact Form Submission - ${contactData.topic}`,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #4A90E2;">New Contact Form Submission</h2>
                <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                    <p><strong>Name:</strong> ${contactData.name}</p>
                    <p><strong>Email:</strong> ${contactData.email}</p>
                    <p><strong>Topic:</strong> ${contactData.topic}</p>
                    <p><strong>Priority:</strong> ${contactData.priority || 'Medium'}</p>
                    <p><strong>Message:</strong></p>
                    <p style="background: white; padding: 15px; border-radius: 4px; border-left: 4px solid #4A90E2;">
                        ${contactData.message}
                    </p>
                </div>
                <p style="color: #666; font-size: 12px;">
                    This email was sent from the Platonica contact form.
                </p>
            </div>
        `
    };
    
    await transporter.sendMail(mailOptions);
};

// Send welcome email
const sendWelcomeEmail = async (userData) => {
    const transporter = createTransporter();
    
    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: userData.email,
        subject: 'Welcome to Platonica - Your Mental Health Journey Begins! 🌟',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #4A90E2;">Welcome to Platonica, ${userData.name}! 💖</h2>
                <p>We're thrilled to have you join our mental health community.</p>
                <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                    <h3>What you can do now:</h3>
                    <ul>
                        <li>🧠 Track your daily mood</li>
                        <li>📚 Access self-care resources</li>
                        <li>🤝 Connect with our support team</li>
                        <li>📅 Book therapy sessions</li>
                    </ul>
                </div>
                <p>Remember, taking care of your mental health is a journey, and we're here to support you every step of the way.</p>
                <p style="color: #666; font-size: 12px;">
                    With love and support,<br>
                    The Platonica Team
                </p>
            </div>
        `
    };
    
    await transporter.sendMail(mailOptions);
};

// Send internship application confirmation
const sendInternshipConfirmation = async (applicationData) => {
    const transporter = createTransporter();
    
    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: applicationData.email,
        subject: 'Internship Application Received - Platonica',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #4A90E2;">Thank you for your application, ${applicationData.name}!</h2>
                <p>We've received your application for the <strong>${applicationData.position}</strong> internship position.</p>
                <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                    <h3>Next Steps:</h3>
                    <ul>
                        <li>Our team will review your application</li>
                        <li>We'll contact you within 5-7 business days</li>
                        <li>If selected, we'll schedule an interview</li>
                    </ul>
                </div>
                <p>We appreciate your interest in joining our team!</p>
                <p style="color: #666; font-size: 12px;">
                    Best regards,<br>
                    The Platonica Hiring Team
                </p>
            </div>
        `
    };
    
    await transporter.sendMail(mailOptions);
};

module.exports = {
    sendContactNotification,
    sendWelcomeEmail,
    sendInternshipConfirmation
};