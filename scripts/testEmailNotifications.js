#!/usr/bin/env node

// Script to test email notification templates
const fs = require('fs');
const path = require('path');

// Mock email service for testing templates
class EmailServiceTest {
  static getApplicationStatusTemplate(data) {
    const subject = `Application Status Update: ${data.jobTitle} at ${data.companyName}`;
    
    const htmlBody = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Application Status Update</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #0D9488; color: white; padding: 20px; text-align: center; }
            .content { padding: 30px 20px; background-color: #f9f9f9; }
            .status-badge { 
              display: inline-block; 
              padding: 8px 16px; 
              border-radius: 20px; 
              font-weight: bold; 
              text-transform: uppercase;
              margin: 10px 0;
            }
            .status-active { background-color: #D1FAE5; color: #065F46; }
            .button { 
              display: inline-block; 
              padding: 12px 24px; 
              background-color: #0D9488; 
              color: white; 
              text-decoration: none; 
              border-radius: 5px; 
              margin: 20px 0;
            }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>ABHH Interview Portal</h1>
              <p>Application Status Update</p>
            </div>
            
            <div class="content">
              <h2>Hello ${data.candidateName},</h2>
              
              <p>We have an update regarding your application for the <strong>${data.jobTitle}</strong> position at <strong>${data.companyName}</strong>.</p>
              
              <p>Your application status has been updated to:</p>
              <div class="status-badge status-active">${data.newStatus}</div>
              
              <p><strong>Next Steps:</strong></p>
              <p>${data.nextSteps}</p>
              
              <p>
                <a href="${data.applicationUrl}" class="button">View Your Application</a>
              </p>
              
              <p>Thank you for your interest in joining our team.</p>
              
              <p>Best regards,<br>
              The ${data.companyName} Recruitment Team</p>
            </div>
            
            <div class="footer">
              <p>This is an automated message from ABHH Interview Portal.</p>
              <p>Please do not reply to this email.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    return { subject, htmlBody };
  }

  static getInterviewScheduleTemplate(data) {
    const subject = `Interview Scheduled: ${data.jobTitle} at ${data.companyName}`;
    
    const htmlBody = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Interview Scheduled</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #0D9488; color: white; padding: 20px; text-align: center; }
            .content { padding: 30px 20px; background-color: #f9f9f9; }
            .interview-details { 
              background-color: white; 
              padding: 20px; 
              border-left: 4px solid #0D9488; 
              margin: 20px 0; 
            }
            .detail-row { 
              display: flex; 
              justify-content: space-between; 
              padding: 8px 0; 
              border-bottom: 1px solid #eee; 
            }
            .detail-label { font-weight: bold; color: #666; }
            .button { 
              display: inline-block; 
              padding: 12px 24px; 
              background-color: #0D9488; 
              color: white; 
              text-decoration: none; 
              border-radius: 5px; 
              margin: 20px 0;
            }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>ABHH Interview Portal</h1>
              <p>Interview Scheduled</p>
            </div>
            
            <div class="content">
              <h2>Hello ${data.candidateName},</h2>
              
              <p>Your interview has been scheduled for the <strong>${data.jobTitle}</strong> position at <strong>${data.companyName}</strong>.</p>
              
              <div class="interview-details">
                <h3>Interview Details:</h3>
                
                <div class="detail-row">
                  <span class="detail-label">Date:</span>
                  <span>${data.interviewDate}</span>
                </div>
                
                <div class="detail-row">
                  <span class="detail-label">Time:</span>
                  <span>${data.interviewTime}</span>
                </div>
                
                <div class="detail-row">
                  <span class="detail-label">Duration:</span>
                  <span>${data.duration} minutes</span>
                </div>
                
                <div class="detail-row">
                  <span class="detail-label">Type:</span>
                  <span>${data.interviewType}</span>
                </div>
                
                <div class="detail-row">
                  <span class="detail-label">Interviewer:</span>
                  <span>${data.interviewerName}</span>
                </div>
                
                <div class="detail-row">
                  <span class="detail-label">Meeting Link:</span>
                  <span><a href="${data.meetingUrl}">${data.meetingUrl}</a></span>
                </div>
              </div>
              
              <p>We look forward to speaking with you!</p>
              
              <p>Best regards,<br>
              The ${data.companyName} Recruitment Team</p>
            </div>
            
            <div class="footer">
              <p>This is an automated message from ABHH Interview Portal.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    return { subject, htmlBody };
  }
}

async function testEmailTemplates() {
  console.log('🧪 Testing Email Notification Templates...\n');

  try {
    // Test application status email
    console.log('1️⃣ Testing Application Status Email Template...');
    const statusEmailData = {
      candidateName: 'John Smith',
      jobTitle: 'Senior Frontend Developer',
      companyName: 'TechCorp Solutions',
      newStatus: 'Under Review',
      nextSteps: 'Your application is currently being reviewed by our technical team. We will contact you within 5 business days with next steps.',
      applicationUrl: 'http://localhost:3000/candidate/dashboard?tab=applications'
    };

    const statusEmail = EmailServiceTest.getApplicationStatusTemplate(statusEmailData);
    
    // Save email template to file for preview
    const statusOutputPath = path.join(__dirname, '..', 'email-previews', 'application-status.html');
    fs.mkdirSync(path.dirname(statusOutputPath), { recursive: true });
    fs.writeFileSync(statusOutputPath, statusEmail.htmlBody);
    
    console.log('✅ Application status email template generated');
    console.log('📧 Subject:', statusEmail.subject);
    console.log('📄 HTML preview saved to:', statusOutputPath);

    // Test interview schedule email
    console.log('\n2️⃣ Testing Interview Schedule Email Template...');
    const interviewEmailData = {
      candidateName: 'Jane Doe',
      interviewerName: 'Sarah Johnson',
      jobTitle: 'Product Manager',
      companyName: 'InnovateLabs',
      interviewDate: 'Friday, January 15, 2024',
      interviewTime: '2:00 PM PST',
      interviewType: 'Video Call',
      meetingUrl: 'https://zoom.us/j/1234567890',
      duration: 60
    };

    const interviewEmail = EmailServiceTest.getInterviewScheduleTemplate(interviewEmailData);
    
    // Save email template to file for preview
    const interviewOutputPath = path.join(__dirname, '..', 'email-previews', 'interview-scheduled.html');
    fs.writeFileSync(interviewOutputPath, interviewEmail.htmlBody);
    
    console.log('✅ Interview schedule email template generated');
    console.log('📧 Subject:', interviewEmail.subject);
    console.log('📄 HTML preview saved to:', interviewOutputPath);

    console.log('\n🎉 All email templates generated successfully!');
    console.log('\n📋 Summary:');
    console.log(`- Application Status Email: ${statusOutputPath}`);
    console.log(`- Interview Schedule Email: ${interviewOutputPath}`);
    console.log('\nOpen these HTML files in your browser to preview the email templates.');

  } catch (error) {
    console.error('❌ Error testing email templates:', error);
  }
}

async function main() {
  console.log('🚀 Running Email Notification Tests...\n');
  await testEmailTemplates();
}

if (require.main === module) {
  main().catch(error => {
    console.error('Script failed:', error);
    process.exit(1);
  });
}

module.exports = { testEmailTemplates };