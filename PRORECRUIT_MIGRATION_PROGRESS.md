# ProRecruit Migration Progress

## ✅ Completed Resources

### AWS Account Configuration
- **Account ID:** 624914081304
- **Region:** eu-west-2 (London)
- **Profile:** ProRecruit-Production

### Cognito User Pool
- **User Pool ID:** eu-west-2_FpwJJthe4
- **User Pool Name:** ProRecruit-UserPool
- **Client ID:** 3juansb0jr3s3b8qouon7nr9gn
- **Client Name:** ProRecruit-WebClient

### User Pool Groups
- ✅ SuperAdmins (Precedence: 1)
- ✅ CompanyAdmins (Precedence: 2) 
- ✅ Candidates (Precedence: 3)

### S3 Storage
- **Bucket Name:** prorecruit-storage-eu-west-2-624914081304
- **Region:** eu-west-2

### AppSync GraphQL API
- **API ID:** j5cbrk6dtrhvfbev33gcvp5x5i
- **API Name:** ProRecruit-API
- **GraphQL Endpoint:** https://54ofumz56bfh3kozn2qrd55ih4.appsync-api.eu-west-2.amazonaws.com/graphql
- **API Key ID:** da2-2ottpnk4ejdarf3moy2nzq2adu
- **Realtime Endpoint:** wss://54ofumz56bfh3kozn2qrd55ih4.appsync-realtime-api.eu-west-2.amazonaws.com/graphql

### DynamoDB Tables
- ✅ ProRecruit-User-prod (with GSI indexes)
- ✅ ProRecruit-Company-prod (basic table created)
- 🔄 Remaining tables need to be created via AWS Console

## 🔄 In Progress
- Complete DynamoDB tables creation (via AWS Console)
- Upload GraphQL schema to AppSync
- Application code migration

## 📋 Next Steps
1. ✅ AWS Infrastructure (mostly complete)
2. 🔄 Complete DynamoDB setup via Console
3. 📝 Update application code with ProRecruit branding
4. 🚀 Deploy to new account
5. 🧹 Clean up old ABBH resources

## 🔑 Complete Environment Variables
```bash
NEXT_PUBLIC_AWS_REGION=eu-west-2
NEXT_PUBLIC_AWS_USER_POOLS_ID=eu-west-2_FpwJJthe4  
NEXT_PUBLIC_AWS_USER_POOLS_WEB_CLIENT_ID=3juansb0jr3s3b8qouon7nr9gn
NEXT_PUBLIC_AWS_APPSYNC_GRAPHQL_ENDPOINT=https://54ofumz56bfh3kozn2qrd55ih4.appsync-api.eu-west-2.amazonaws.com/graphql
NEXT_PUBLIC_AWS_APPSYNC_REGION=eu-west-2
NEXT_PUBLIC_AWS_APPSYNC_API_KEY=da2-2ottpnk4ejdarf3moy2nzq2adu
AWS_USER_FILES_S3_BUCKET=prorecruit-storage-eu-west-2-624914081304
```