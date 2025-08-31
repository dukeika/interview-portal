# ABHH Interview Platform - User Management Guide

## Overview
This document outlines the complete user registration and access flow for the ABHH Interview Management Platform. The system has been redesigned to implement proper role-based access with clear separation of concerns.

## User Types and Registration Flow

### 1. Candidates (Self-Registration)
- **Registration**: Candidates can create their own accounts through the public registration page at `/register`
- **Process**: 
  - Fill out personal information (name, email, phone)
  - Verify email address with confirmation code
  - Account is created with `PENDING` approval status
  - Automatically assigned to `Candidates` Cognito group
- **Access**: After registration, candidates can search for jobs and apply for positions

### 2. Company Admins (Created by Application Admin)
- **Registration**: Company admins CANNOT self-register
- **Creation Process**: 
  - Created by Application Admin through the admin dashboard
  - Application Admin creates company AND assigns company admin in one flow
  - System generates temporary password
  - Admin receives login credentials
- **First Login Flow**:
  - Redirected to `/company/setup` to complete profile
  - Must change temporary password to secure password
  - Updates personal information (name, phone)
  - Redirected to company dashboard after setup

### 3. Application Admin (Created via CLI)
- **Registration**: Application admins CANNOT self-register
- **Creation Process**: Use CLI script to create super admin accounts
- **CLI Command**: 
  ```bash
  npm run create-admin <email> <firstName> <lastName> [phone]
  ```
- **Example**: 
  ```bash
  npm run create-admin admin@abhh.com John Smith "+1-555-123-4567"
  ```
- **Automatic Setup**: 
  - Creates user in Cognito with temporary password
  - Adds to `SuperAdmins` group
  - Creates database record with `APPROVED` status
  - Displays temporary password for first login

## Access Control Flow

### Company Admin Access
1. **Single Company Assignment**: Most company admins are assigned to one company
2. **Multi-Company Support**: System supports admins assigned to multiple companies
3. **Company Selection**: If assigned to multiple companies, dropdown selector appears in dashboard header
4. **Data Filtering**: All company data (jobs, applications, analytics) is filtered by selected company

### Application Filtering
- **Company Admins**: See only applications for jobs posted by their company(ies)
- **Candidates**: See only their own applications
- **Super Admins**: See all applications across all companies

## Key Features Implemented

### 1. Registration Page Restrictions ✅
- `/register` page only allows candidate registration
- Removed company registration option
- Clean, focused UI for job seekers

### 2. CLI Admin Creation ✅
- Secure CLI tool for creating application admins
- Generates strong temporary passwords
- Automatic Cognito group assignment
- Environment variable configuration support

### 3. Company & Admin Creation Flow ✅
- Enhanced admin dashboard with "Create Company & Admin" button
- Two-step wizard: Company details → Admin details
- Automatic user creation in Cognito and database
- Temporary password generation and display

### 4. First-Time Login Experience ✅
- Company admins redirected to `/company/setup` on first login
- Two-step setup process: Profile update → Password change
- Cannot access dashboard until setup is complete
- LastLoginAt tracking to determine first-time users

### 5. Multi-Company Support ✅
- Company selector dropdown in dashboard header
- Dynamic company switching without page reload
- Company-specific data filtering
- Single company users see company info without dropdown

### 6. Enhanced Job Search & Applications ✅
- Advanced job browser with search and filtering
- Real-time application tracking
- Job detail modal with full descriptions
- Application status tracking and updates

### 7. Company Application Portal ✅
- Applications filtered by company ownership
- Complete application lifecycle management
- Test and interview scheduling
- Application stage progression tracking

## File Structure Changes

### New Files Created:
```
scripts/create-admin.js                           # CLI tool for admin creation
src/components/admin/CreateCompanyWithAdminModal.tsx  # Enhanced company creation
src/services/companyAdminService.ts               # Company admin management
src/app/company/setup/page.tsx                   # First-time setup page
src/components/company/CompanySelector.tsx       # Multi-company dropdown
src/components/candidate/JobBrowser.tsx          # Enhanced job search
USER_MANAGEMENT_GUIDE.md                         # This documentation
```

### Modified Files:
```
src/components/auth/RegistrationForm.tsx         # Candidate-only registration
src/contexts/AuthContext.tsx                     # First-login detection
src/components/admin/AdminCompaniesTab.tsx       # Enhanced company management
src/services/applicationService.ts               # Company-filtered applications
src/app/company/dashboard/page.tsx               # Multi-company support
src/components/company/DashboardHeader.tsx       # Company selector integration
```

## Environment Setup

### Required Environment Variables:
```env
AMPLIFY_COGNITO_USER_POOL_ID=your_user_pool_id
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
```

## Usage Instructions

### Creating Your First Application Admin:
1. Set up environment variables
2. Run: `npm run create-admin admin@company.com Jane Doe`
3. Note the temporary password displayed
4. Login at your application URL
5. Change password on first login

### Creating Company & Admin:
1. Login as Application Admin
2. Navigate to Companies tab
3. Click "Create Company & Admin" 
4. Fill out company details
5. Fill out admin details
6. System creates both and displays admin credentials
7. Share credentials with company admin

### Company Admin First Login:
1. Login with provided credentials
2. Complete profile setup (name, phone)
3. Change temporary password
4. Access company dashboard

### Multi-Company Management:
- Company selector appears automatically if admin assigned to multiple companies
- Switch between companies using dropdown in header
- All data automatically filters by selected company

## Security Features

### Password Requirements:
- Minimum 8 characters
- Must contain uppercase, lowercase, number, and special character
- Temporary passwords must be changed on first login

### Access Control:
- Role-based permissions enforced at API level
- Company data isolation
- Automatic user record creation and validation

### Audit Trail:
- Login timestamps tracked
- Application status changes logged
- User approval workflow with notes

## Testing the System

### Test Candidate Registration:
1. Navigate to `/register`
2. Fill out candidate information
3. Verify email confirmation flow
4. Login and test job browsing/application

### Test Company Admin Creation:
1. Login as super admin
2. Create new company with admin
3. Test first-time login experience with generated credentials
4. Verify company data isolation

### Test Multi-Company Access:
1. Create admin with multiple company assignments
2. Verify company selector appears
3. Test data filtering when switching companies

## Support and Troubleshooting

### Common Issues:

**Admin Creation Fails:**
- Verify environment variables are set
- Check AWS credentials and permissions
- Ensure user pool ID is correct

**Company Admin Can't Login:**
- Verify admin was added to CompanyAdmins group
- Check temporary password wasn't changed
- Ensure user has companyId assigned

**Applications Not Showing:**
- Verify company admin has correct companyId
- Check job assignments to company
- Verify application filtering logic

For additional support, check the application logs and ensure all GraphQL permissions are properly configured.

## Future Enhancements

### Planned Features:
- Email notifications for new admin accounts
- Bulk company admin management
- Advanced user permissions and roles
- Integration with external HR systems
- Enhanced audit logging and reporting

---

This system provides a robust, secure foundation for managing users across the ABHH Interview Platform with proper separation of concerns and role-based access control.