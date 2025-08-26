# ABHH Interview Portal - Complete Testing Guide

This guide will walk you through testing all the features we've implemented across all user roles.

## 🚀 Quick Start Testing

### 1. Start the Application
```bash
cd C:\Users\akabo\OneDrive\Documents\abhh
npm run dev
```

Visit: http://localhost:3000

### 2. Demo Accounts (Already Created)
```
🔑 Super Admin:
Email: admin@abhh.demo
Password: AdminPass123!

🏢 Company Admin:
Email: company@techcorp.demo  
Password: CompanyPass123!

👤 Candidate:
Email: candidate@demo.com
Password: CandidatePass123!
```

---

## 📋 Feature Testing Checklist

### **Phase 1: Authentication & User Management**

#### ✅ Login System
- [ ] Go to `/login`
- [ ] Test login with demo accounts above
- [ ] Verify role-based redirects:
  - Super Admin → `/admin/dashboard`
  - Company Admin → `/company/dashboard` 
  - Candidate → `/candidate/dashboard`
- [ ] Test "Remember me" functionality
- [ ] Test logout from each dashboard

#### ✅ Registration System
- [ ] Go to `/register`
- [ ] Test candidate registration:
  - Fill out form with new email
  - Verify form validation (password requirements, email format)
  - Submit form (will require email confirmation in real AWS)
- [ ] Test company registration:
  - Select "Employer" option
  - Fill company information
  - Test validation for company fields
- [ ] Test form error handling and user experience

---

### **Phase 2: Candidate Features**

#### ✅ Candidate Dashboard
Login as: `candidate@demo.com`

**Browse Jobs Tab:**
- [ ] View available job listings
- [ ] See job details (title, company, location, salary)
- [ ] Apply to jobs (click "Apply" button)
- [ ] Verify "Applied" status appears after applying

**My Applications Tab:**
- [ ] View submitted applications
- [ ] Check application status and current stage
- [ ] See stage progress (Application → Written Test → Video Test → Interview)
- [ ] View next action items

**Profile Tab:**
- [ ] Edit personal information (name, phone)
- [ ] Upload resume (test with PDF/DOC files)
- [ ] Verify file upload progress and completion
- [ ] Test file validation (wrong format, too large)
- [ ] Download uploaded resume

**Notifications Tab:**
- [ ] View notification list
- [ ] Filter notifications (All, Unread, Read)
- [ ] Mark notifications as read
- [ ] Delete notifications
- [ ] Test notification actions (click "View Application")

**Tests Tab:**
- [ ] See available written tests
- [ ] Start a test (if configured)
- [ ] Test timer functionality
- [ ] Submit test answers

**Video Tests Tab:**
- [ ] Access video interview questions
- [ ] Test camera/microphone permissions
- [ ] Record video answers
- [ ] Review recordings before submission
- [ ] Submit video test

**Interviews Tab:**
- [ ] View scheduled interviews
- [ ] See interview details (date, time, type)
- [ ] Access meeting links for video interviews

---

### **Phase 3: Company Admin Features**

#### ✅ Company Dashboard
Login as: `company@techcorp.demo`

**Overview Tab:**
- [ ] View company statistics
- [ ] See recent applications
- [ ] Monitor hiring pipeline metrics

**Jobs Tab:**
- [ ] View existing job postings
- [ ] Create new job posting
- [ ] Edit existing jobs
- [ ] Toggle job active/inactive status
- [ ] Delete job postings

**Applications Tab:**
- [ ] View all applications for company jobs
- [ ] Filter applications by status
- [ ] Update application status
- [ ] Move candidates through hiring stages
- [ ] Add notes and feedback

**Interviews Tab:**
- [ ] Schedule interviews with candidates
- [ ] Set interview type (video, phone, in-person)
- [ ] Add meeting URLs or locations
- [ ] View upcoming interviews
- [ ] Manage interview schedules

**Analytics Tab:**
- [ ] View hiring analytics
- [ ] See application conversion rates
- [ ] Monitor time-to-hire metrics
- [ ] Export data if available

---

### **Phase 4: Super Admin Features**

#### ✅ Admin Dashboard
Login as: `admin@abhh.demo`

**Overview Tab:**
- [ ] View platform-wide statistics
- [ ] Monitor system health
- [ ] See recent activity

**Users Tab:**
- [ ] View all users in the system
- [ ] Filter users by role
- [ ] Activate/deactivate user accounts
- [ ] View user details and activity

**Companies Tab:**
- [ ] View all registered companies
- [ ] Approve/reject company registrations
- [ ] Edit company information
- [ ] View company statistics

**Video Review Tab:**
- [ ] View video interview submissions
- [ ] Play candidate video recordings
- [ ] Score individual answers (1-10 scale)
- [ ] Add review notes for each question
- [ ] Provide overall feedback
- [ ] Make hiring recommendations
- [ ] Filter reviews by status

---

### **Phase 5: Email & Notifications**

#### ✅ Email System Testing
Since we're in development mode, emails are logged to console.

**Check Console Logs:**
- [ ] Apply to a job → Check for "application submitted" email log
- [ ] Change application status → Check for "status update" email log
- [ ] Schedule interview → Check for "interview scheduled" email log
- [ ] Register new user → Check for "welcome" email log

**View Email Templates:**
```bash
# Generate email previews
node scripts/testEmailNotifications.js

# View generated HTML emails in browser:
# - email-previews/application-status.html
# - email-previews/interview-scheduled.html
```

---

### **Phase 6: File Upload System**

#### ✅ S3 Storage Testing

**Resume Upload (Candidate Profile):**
- [ ] Upload PDF resume (test various sizes up to 5MB)
- [ ] Upload DOC/DOCX resume
- [ ] Test file type validation (try uploading image → should fail)
- [ ] Test file size validation (try >5MB file → should fail)
- [ ] Verify upload progress indicator
- [ ] Download uploaded resume
- [ ] Replace existing resume

**Company Logo Upload:**
- [ ] Upload company logo (PNG, JPG, GIF, WebP)
- [ ] Test image size validation (up to 2MB)
- [ ] Test file type validation
- [ ] Verify image preview after upload
- [ ] Replace existing logo

---

## 🧪 Advanced Testing Scenarios

### **End-to-End Application Flow**
1. **As Candidate:**
   - [ ] Register new account
   - [ ] Complete profile and upload resume
   - [ ] Browse and apply to jobs
   - [ ] Complete written test
   - [ ] Record video interview
   - [ ] Check application status

2. **As Company Admin:**
   - [ ] Create job posting
   - [ ] Review incoming applications
   - [ ] Move candidate through stages
   - [ ] Schedule interview
   - [ ] Update application status

3. **As HR Admin:**
   - [ ] Review video submissions
   - [ ] Score candidate responses
   - [ ] Make hiring recommendations
   - [ ] Manage user accounts

### **Error Handling & Edge Cases**
- [ ] Test with slow internet (file uploads)
- [ ] Test with invalid file formats
- [ ] Test form submission with missing required fields
- [ ] Test authentication with invalid credentials
- [ ] Test access to unauthorized pages
- [ ] Test browser back/forward navigation
- [ ] Test page refresh during operations

### **Responsive Design Testing**
- [ ] Test on mobile devices (Chrome DevTools)
- [ ] Test on tablets
- [ ] Test on different screen sizes
- [ ] Verify all features work on mobile

---

## 🔧 Development Testing Tools

### **Database Testing**
```bash
# Test user service
node scripts/testAuth.js

# Test demo data creation
node scripts/createDemoDataWithUserPools.js

# View current data
node scripts/testAuth.js
```

### **Check Application Status**
```bash
# View compilation status
npm run dev

# Check for TypeScript errors
npm run build

# Run linting (if configured)
npm run lint
```

### **Browser Developer Tools**
- [ ] Check Console for errors
- [ ] Monitor Network tab for failed requests
- [ ] Verify localStorage/sessionStorage usage
- [ ] Test with different browsers (Chrome, Firefox, Safari)

---

## 📊 Performance Testing

### **Load Testing**
- [ ] Test with multiple browser tabs
- [ ] Upload large files simultaneously
- [ ] Test rapid navigation between pages
- [ ] Monitor memory usage during video playback

### **Security Testing**
- [ ] Test unauthorized access to different role dashboards
- [ ] Verify JWT token expiration handling
- [ ] Test file upload security (malicious files)
- [ ] Check CORS configuration
- [ ] Verify API rate limiting (if implemented)

---

## 🐛 Bug Reporting Template

When you find issues, document them like this:

```
**Bug Description:** Brief description of the issue

**Steps to Reproduce:**
1. Go to [page]
2. Click on [element]
3. Enter [data]
4. See error

**Expected Behavior:** What should happen

**Actual Behavior:** What actually happens

**Browser:** Chrome/Firefox/Safari version

**User Role:** Super Admin/Company Admin/Candidate

**Screenshot:** (if applicable)

**Console Errors:** (copy from browser console)
```

---

## ✅ Testing Completion Checklist

### **Core Functionality**
- [ ] Authentication works for all roles
- [ ] Role-based access control enforced
- [ ] File uploads work properly
- [ ] Database operations succeed
- [ ] Email notifications trigger correctly

### **User Experience**
- [ ] Intuitive navigation
- [ ] Clear error messages
- [ ] Responsive design works
- [ ] Loading states are visible
- [ ] Forms validate properly

### **Business Logic**
- [ ] Application workflow functions correctly
- [ ] Interview scheduling works
- [ ] Video review process is complete
- [ ] Status updates propagate properly
- [ ] Notifications reach users

---

## 🎯 Next Steps After Testing

1. **Document Issues:** Create a list of bugs/improvements
2. **Prioritize Fixes:** Critical → Important → Nice-to-have
3. **Performance Optimization:** Address any slow operations
4. **Security Review:** Ensure all endpoints are secured
5. **Production Deployment:** Prepare for AWS deployment

---

## 🚨 Critical Test Cases

**Must work perfectly before production:**
- [ ] User registration and login
- [ ] Job application submission
- [ ] File upload (resume/logo)
- [ ] Application status updates
- [ ] Video interview recording
- [ ] HR video review process
- [ ] Email notifications

Happy testing! 🎉

Let me know what issues you find and I'll help fix them immediately.