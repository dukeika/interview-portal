# AWS Account Migration Guide

## Complete Migration Checklist for Interview SaaS Platform

### Current Configuration (to replicate)
- **Region:** us-west-1
- **Cognito User Pool ID:** us-west-1_SIcVm4uiV
- **AppSync Endpoint:** https://4pz36wwojfhijdsnbkzmvmmmfu.appsync-api.us-west-1.amazonaws.com/graphql
- **S3 Bucket:** interview-saas-storage-bucket1fa42-abbhsaas

---

## Step 1: Create Cognito User Pool

### 1.1 Basic Setup
```bash
# Navigate to Amazon Cognito in your new AWS account console
# Choose "Create User Pool"
```

**Configuration:**
- **Pool Name:** `InterviewSaaS-UserPool`
- **Provider types:** 
  - ✅ Cognito user pool
  - ❌ Federated identity providers
- **Cognito user pool sign-in options:**
  - ✅ Email
  - ❌ Phone number
  - ❌ Username

### 1.2 Security Requirements
- **Password policy:**
  - Minimum length: 8 characters
  - ✅ Contains at least 1 number
  - ✅ Contains at least 1 special character
  - ✅ Contains at least 1 uppercase letter  
  - ✅ Contains at least 1 lowercase letter
  - ❌ Temporary passwords set by administrators expire in 7 days

- **Multi-factor authentication:** 
  - ✅ Optional MFA
  - MFA methods: ✅ SMS, ❌ TOTP

### 1.3 Required Attributes
- ✅ email (Required)
- ✅ given_name (Required) 
- ✅ family_name (Required)
- ✅ phone_number (Optional)

### 1.4 Email Configuration
- **Email provider:** ✅ Send email with Amazon SES
- **SES Region:** us-west-1 (same as your new account region)
- **FROM email address:** noreply@yourdomain.com
- **Reply-to email address:** support@yourdomain.com

### 1.5 User Pool Groups (Create after pool creation)
```bash
# Create these groups in Cognito > User pools > Your pool > Groups
```

1. **SuperAdmins**
   - Description: "System administrators with full access"
   - Precedence: 1

2. **CompanyAdmins** 
   - Description: "Company administrators managing their organization"
   - Precedence: 2

3. **Candidates**
   - Description: "Job candidates applying for positions"
   - Precedence: 3

### 1.6 App Client Configuration
- **App client name:** `InterviewSaaS-WebClient`
- **Client secret:** ❌ Don't generate (for web clients)
- **Auth flows:** 
  - ✅ ALLOW_USER_SRP_AUTH
  - ✅ ALLOW_USER_PASSWORD_AUTH
  - ✅ ALLOW_REFRESH_TOKEN_AUTH

---

## Step 2: Create DynamoDB Tables

### 2.1 Table Creation Commands
Run these in AWS CLI or create via console:

```bash
# Replace {ENVIRONMENT_ID} with your new environment ID (e.g., dev, prod, etc.)

# User Table
aws dynamodb create-table \
  --table-name User-{ENVIRONMENT_ID} \
  --attribute-definitions \
    AttributeName=id,AttributeType=S \
    AttributeName=sub,AttributeType=S \
    AttributeName=email,AttributeType=S \
    AttributeName=companyId,AttributeType=S \
    AttributeName=approvalStatus,AttributeType=S \
  --key-schema AttributeName=id,KeyType=HASH \
  --global-secondary-indexes \
    IndexName=bySub,KeySchema=[{AttributeName=sub,KeyType=HASH}],Projection={ProjectionType=ALL},ProvisionedThroughput={ReadCapacityUnits=5,WriteCapacityUnits=5} \
    IndexName=byEmail,KeySchema=[{AttributeName=email,KeyType=HASH}],Projection={ProjectionType=ALL},ProvisionedThroughput={ReadCapacityUnits=5,WriteCapacityUnits=5} \
    IndexName=byCompany,KeySchema=[{AttributeName=companyId,KeyType=HASH}],Projection={ProjectionType=ALL},ProvisionedThroughput={ReadCapacityUnits=5,WriteCapacityUnits=5} \
    IndexName=byApprovalStatus,KeySchema=[{AttributeName=approvalStatus,KeyType=HASH}],Projection={ProjectionType=ALL},ProvisionedThroughput={ReadCapacityUnits=5,WriteCapacityUnits=5} \
  --provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5

# Company Table
aws dynamodb create-table \
  --table-name Company-{ENVIRONMENT_ID} \
  --attribute-definitions \
    AttributeName=id,AttributeType=S \
    AttributeName=email,AttributeType=S \
  --key-schema AttributeName=id,KeyType=HASH \
  --global-secondary-indexes \
    IndexName=byEmail,KeySchema=[{AttributeName=email,KeyType=HASH}],Projection={ProjectionType=ALL},ProvisionedThroughput={ReadCapacityUnits=5,WriteCapacityUnits=5} \
  --provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5

# Job Table  
aws dynamodb create-table \
  --table-name Job-{ENVIRONMENT_ID} \
  --attribute-definitions \
    AttributeName=id,AttributeType=S \
    AttributeName=companyId,AttributeType=S \
  --key-schema AttributeName=id,KeyType=HASH \
  --global-secondary-indexes \
    IndexName=byCompany,KeySchema=[{AttributeName=companyId,KeyType=HASH}],Projection={ProjectionType=ALL},ProvisionedThroughput={ReadCapacityUnits=5,WriteCapacityUnits=5} \
  --provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5

# Application Table
aws dynamodb create-table \
  --table-name Application-{ENVIRONMENT_ID} \
  --attribute-definitions \
    AttributeName=id,AttributeType=S \
    AttributeName=candidateId,AttributeType=S \
    AttributeName=jobId,AttributeType=S \
  --key-schema AttributeName=id,KeyType=HASH \
  --global-secondary-indexes \
    IndexName=byCandidate,KeySchema=[{AttributeName=candidateId,KeyType=HASH}],Projection={ProjectionType=ALL},ProvisionedThroughput={ReadCapacityUnits=5,WriteCapacityUnits=5} \
    IndexName=byJob,KeySchema=[{AttributeName=jobId,KeyType=HASH}],Projection={ProjectionType=ALL},ProvisionedThroughput={ReadCapacityUnits=5,WriteCapacityUnits=5} \
  --provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5

# Test Table
aws dynamodb create-table \
  --table-name Test-{ENVIRONMENT_ID} \
  --attribute-definitions \
    AttributeName=id,AttributeType=S \
    AttributeName=jobId,AttributeType=S \
  --key-schema AttributeName=id,KeyType=HASH \
  --global-secondary-indexes \
    IndexName=byJob,KeySchema=[{AttributeName=jobId,KeyType=HASH}],Projection={ProjectionType=ALL},ProvisionedThroughput={ReadCapacityUnits=5,WriteCapacityUnits=5} \
  --provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5

# VideoTest Table
aws dynamodb create-table \
  --table-name VideoTest-{ENVIRONMENT_ID} \
  --attribute-definitions \
    AttributeName=id,AttributeType=S \
    AttributeName=jobId,AttributeType=S \
  --key-schema AttributeName=id,KeyType=HASH \
  --global-secondary-indexes \
    IndexName=byJob,KeySchema=[{AttributeName=jobId,KeyType=HASH}],Projection={ProjectionType=ALL},ProvisionedThroughput={ReadCapacityUnits=5,WriteCapacityUnits=5} \
  --provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5

# TestAttempt Table
aws dynamodb create-table \
  --table-name TestAttempt-{ENVIRONMENT_ID} \
  --attribute-definitions \
    AttributeName=id,AttributeType=S \
    AttributeName=testId,AttributeType=S \
    AttributeName=candidateId,AttributeType=S \
    AttributeName=applicationId,AttributeType=S \
  --key-schema AttributeName=id,KeyType=HASH \
  --global-secondary-indexes \
    IndexName=byTest,KeySchema=[{AttributeName=testId,KeyType=HASH}],Projection={ProjectionType=ALL},ProvisionedThroughput={ReadCapacityUnits=5,WriteCapacityUnits=5} \
    IndexName=byCandidate,KeySchema=[{AttributeName=candidateId,KeyType=HASH}],Projection={ProjectionType=ALL},ProvisionedThroughput={ReadCapacityUnits=5,WriteCapacityUnits=5} \
    IndexName=byApplication,KeySchema=[{AttributeName=applicationId,KeyType=HASH}],Projection={ProjectionType=ALL},ProvisionedThroughput={ReadCapacityUnits=5,WriteCapacityUnits=5} \
  --provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5

# VideoTestAttempt Table  
aws dynamodb create-table \
  --table-name VideoTestAttempt-{ENVIRONMENT_ID} \
  --attribute-definitions \
    AttributeName=id,AttributeType=S \
    AttributeName=videoTestId,AttributeType=S \
    AttributeName=candidateId,AttributeType=S \
    AttributeName=applicationId,AttributeType=S \
  --key-schema AttributeName=id,KeyType=HASH \
  --global-secondary-indexes \
    IndexName=byVideoTest,KeySchema=[{AttributeName=videoTestId,KeyType=HASH}],Projection={ProjectionType=ALL},ProvisionedThroughput={ReadCapacityUnits=5,WriteCapacityUnits=5} \
    IndexName=byCandidate,KeySchema=[{AttributeName=candidateId,KeyType=HASH}],Projection={ProjectionType=ALL},ProvisionedThroughput={ReadCapacityUnits=5,WriteCapacityUnits=5} \
    IndexName=byApplication,KeySchema=[{AttributeName=applicationId,KeyType=HASH}],Projection={ProjectionType=ALL},ProvisionedThroughput={ReadCapacityUnits=5,WriteCapacityUnits=5} \
  --provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5

# Interview Table
aws dynamodb create-table \
  --table-name Interview-{ENVIRONMENT_ID} \
  --attribute-definitions \
    AttributeName=id,AttributeType=S \
    AttributeName=candidateId,AttributeType=S \
    AttributeName=applicationId,AttributeType=S \
  --key-schema AttributeName=id,KeyType=HASH \
  --global-secondary-indexes \
    IndexName=byCandidate,KeySchema=[{AttributeName=candidateId,KeyType=HASH}],Projection={ProjectionType=ALL},ProvisionedThroughput={ReadCapacityUnits=5,WriteCapacityUnits=5} \
    IndexName=byApplication,KeySchema=[{AttributeName=applicationId,KeyType=HASH}],Projection={ProjectionType=ALL},ProvisionedThroughput={ReadCapacityUnits=5,WriteCapacityUnits=5} \
  --provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5
```

---

## Step 3: Create AppSync GraphQL API

### 3.1 API Creation
1. **Go to AWS AppSync Console**
2. **Create API > Build from scratch**
3. **API Name:** `InterviewSaaS`
4. **Authorization modes:**
   - **Default:** API Key (for server operations)
   - **Additional:** Amazon Cognito User Pool

### 3.2 Upload Schema
Copy the schema from `amplify/backend/api/interviewsaas/schema.graphql` to your new AppSync API.

### 3.3 Configure Data Sources
Link each model to its corresponding DynamoDB table:
- User → User-{ENVIRONMENT_ID}
- Company → Company-{ENVIRONMENT_ID}  
- Job → Job-{ENVIRONMENT_ID}
- Application → Application-{ENVIRONMENT_ID}
- Test → Test-{ENVIRONMENT_ID}
- VideoTest → VideoTest-{ENVIRONMENT_ID}
- TestAttempt → TestAttempt-{ENVIRONMENT_ID}
- VideoTestAttempt → VideoTestAttempt-{ENVIRONMENT_ID}
- Interview → Interview-{ENVIRONMENT_ID}

---

## Step 4: Create S3 Bucket

### 4.1 Bucket Setup
```bash
# Create bucket (name must be globally unique)
aws s3 mb s3://interview-saas-storage-{YOUR_UNIQUE_SUFFIX}

# Configure CORS
aws s3api put-bucket-cors \
  --bucket interview-saas-storage-{YOUR_UNIQUE_SUFFIX} \
  --cors-configuration file://cors.json
```

### 4.2 CORS Configuration (cors.json)
```json
{
    "CORSRules": [
        {
            "AllowedHeaders": ["*"],
            "AllowedMethods": ["GET", "HEAD", "PUT", "POST", "DELETE"],
            "AllowedOrigins": ["*"],
            "ExposeHeaders": ["ETag"]
        }
    ]
}
```

---

## Step 5: Set up Amazon SES

### 5.1 Domain/Email Verification
1. **Navigate to Amazon SES Console**
2. **Verify email addresses:**
   - `noreply@yourdomain.com`
   - `support@yourdomain.com`
3. **Request production access** if sending to unverified emails

### 5.2 SMTP Configuration
Note your SMTP credentials for email sending functionality.

---

## Step 6: Update Application Configuration

### 6.1 Environment Variables
Create/update `.env.local`:
```bash
# New AWS Account Configuration
NEXT_PUBLIC_AWS_REGION=us-west-1
NEXT_PUBLIC_AWS_USER_POOLS_ID=YOUR_NEW_USER_POOL_ID
NEXT_PUBLIC_AWS_USER_POOLS_WEB_CLIENT_ID=YOUR_NEW_CLIENT_ID
NEXT_PUBLIC_AWS_APPSYNC_GRAPHQL_ENDPOINT=YOUR_NEW_APPSYNC_ENDPOINT
NEXT_PUBLIC_AWS_APPSYNC_REGION=us-west-1
NEXT_PUBLIC_AWS_APPSYNC_API_KEY=YOUR_NEW_API_KEY

# Server-side credentials (keep private)
AWS_ACCESS_KEY_ID=YOUR_ACCESS_KEY
AWS_SECRET_ACCESS_KEY=YOUR_SECRET_KEY
```

### 6.2 Update aws-exports.js
Replace the contents with your new configuration:
```javascript
const awsmobile = {
    "aws_project_region": "us-west-1",
    "aws_appsync_graphqlEndpoint": "YOUR_NEW_APPSYNC_ENDPOINT",
    "aws_appsync_region": "us-west-1", 
    "aws_appsync_authenticationType": "API_KEY",
    "aws_appsync_apiKey": "YOUR_NEW_API_KEY",
    "aws_cognito_identity_pool_id": "YOUR_NEW_IDENTITY_POOL_ID",
    "aws_cognito_region": "us-west-1",
    "aws_user_pools_id": "YOUR_NEW_USER_POOL_ID",
    "aws_user_pools_web_client_id": "YOUR_NEW_CLIENT_ID",
    "aws_user_files_s3_bucket": "YOUR_NEW_S3_BUCKET",
    "aws_user_files_s3_bucket_region": "us-west-1"
};
```

---

## Step 7: Deploy to New Account

### 7.1 GitHub Repository Update
1. Update environment variables in GitHub repository settings
2. Configure GitHub Actions/workflows for new AWS account
3. Update any deployment scripts

### 7.2 AWS Amplify (if using)
1. **Create new Amplify app** connected to your GitHub repo
2. **Configure build settings** with new environment variables
3. **Deploy application**

---

## Step 8: Data Migration (if needed)

### 8.1 Export Current Data
```bash
# Export users
aws dynamodb scan --table-name User-{OLD_ENV_ID} > users_backup.json

# Export companies  
aws dynamodb scan --table-name Company-{OLD_ENV_ID} > companies_backup.json

# Export jobs
aws dynamodb scan --table-name Job-{OLD_ENV_ID} > jobs_backup.json

# Continue for other tables...
```

### 8.2 Import to New Account
```bash
# Import users (after processing the JSON format)
aws dynamodb batch-write-item --request-items file://users_import.json

# Continue for other tables...
```

---

## Step 9: Testing & Verification

### 9.1 Functionality Tests
- [ ] User registration works
- [ ] Login/authentication works
- [ ] Company admin can create jobs
- [ ] Test creation works
- [ ] Email notifications work
- [ ] File uploads to S3 work
- [ ] All GraphQL operations work

### 9.2 Security Validation  
- [ ] Proper IAM roles and policies
- [ ] Cognito groups configured correctly
- [ ] S3 bucket permissions secure
- [ ] API authorization working

---

## Step 10: Cleanup Old Account

### 10.1 Backup Verification
- [ ] All data successfully migrated
- [ ] New environment fully functional
- [ ] All stakeholders notified of new URLs

### 10.2 Resource Deletion Order
1. **Delete Amplify App**
2. **Delete AppSync API**
3. **Delete DynamoDB Tables** 
4. **Delete S3 Buckets** (after emptying)
5. **Delete Cognito User Pool**
6. **Delete IAM Roles** (created by Amplify)
7. **Cancel any unused services**

---

## Troubleshooting

### Common Issues
1. **CORS errors:** Check S3 bucket CORS configuration
2. **Authentication errors:** Verify Cognito configuration matches app config
3. **GraphQL errors:** Ensure schema matches table structure
4. **Email delivery:** Check SES configuration and limits

### Support Contacts
- AWS Support (if you have support plan)
- Check CloudWatch logs for detailed error information

---

**⚠️ Important Notes:**
- Test thoroughly before deleting old resources
- Keep backups until new system is proven stable  
- Update DNS records if using custom domain
- Notify all users of any service interruption