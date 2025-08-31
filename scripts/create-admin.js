#!/usr/bin/env node

// Load environment variables from .env.local file
require('dotenv').config({ path: '.env.local' });

const { AdminCreateUserCommand, CognitoIdentityProviderClient, AdminSetUserPasswordCommand, AdminAddUserToGroupCommand } = require('@aws-sdk/client-cognito-identity-provider');

// Configuration - try multiple environment variable names
const COGNITO_USER_POOL_ID = 
  process.env.AMPLIFY_COGNITO_USER_POOL_ID || 
  process.env.NEXT_PUBLIC_AWS_USER_POOLS_ID ||
  process.env.AWS_USER_POOLS_ID;
const AWS_REGION = 
  process.env.AWS_REGION || 
  process.env.NEXT_PUBLIC_AWS_REGION || 
  'us-east-1';

if (!COGNITO_USER_POOL_ID) {
  console.error('❌ Error: Cognito User Pool ID environment variable is not set');
  console.error('   Please set one of these in your .env.local file:');
  console.error('   - NEXT_PUBLIC_AWS_USER_POOLS_ID');
  console.error('   - AMPLIFY_COGNITO_USER_POOL_ID');
  console.error('   - AWS_USER_POOLS_ID');
  console.error('');
  console.error('💡 To get your User Pool ID:');
  console.error('   1. Go to AWS Console → Cognito');
  console.error('   2. Select your User Pool');
  console.error('   3. Copy the Pool ID from the General settings tab');
  console.error('');
  console.error('📝 Example .env.local entry:');
  console.error('   NEXT_PUBLIC_AWS_USER_POOLS_ID=us-east-1_ABC123DEF');
  process.exit(1);
}

// Create Cognito client with automatic credential detection
const cognitoClient = new CognitoIdentityProviderClient({ 
  region: AWS_REGION,
  // AWS SDK will automatically detect credentials from:
  // 1. Environment variables (AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY)
  // 2. AWS credentials file (~/.aws/credentials)
  // 3. IAM roles (if running on EC2)
  // 4. AWS CLI profile
});

async function createSuperAdmin(email, firstName, lastName, phone = '') {
  try {
    console.log('🔄 Creating super admin user in Cognito...');
    
    // Generate a temporary password
    const tempPassword = Math.random().toString(36).slice(-12) + 'A1!';
    
    // Create user
    const createUserCommand = new AdminCreateUserCommand({
      UserPoolId: COGNITO_USER_POOL_ID,
      Username: email,
      UserAttributes: [
        { Name: 'email', Value: email },
        { Name: 'email_verified', Value: 'true' },
        { Name: 'given_name', Value: firstName },
        { Name: 'family_name', Value: lastName },
        ...(phone ? [{ Name: 'phone_number', Value: phone }] : [])
      ],
      TemporaryPassword: tempPassword,
      MessageAction: 'SUPPRESS', // Don't send welcome email
      ForceAliasCreation: false
    });

    const createResult = await cognitoClient.send(createUserCommand);
    console.log('✅ Super admin user created successfully');

    // Set permanent password
    console.log('🔄 Setting permanent password...');
    const setPasswordCommand = new AdminSetUserPasswordCommand({
      UserPoolId: COGNITO_USER_POOL_ID,
      Username: email,
      Password: tempPassword,
      Permanent: true
    });

    await cognitoClient.send(setPasswordCommand);
    console.log('✅ Permanent password set');

    // Add user to SuperAdmins group
    console.log('🔄 Adding user to SuperAdmins group...');
    const addToGroupCommand = new AdminAddUserToGroupCommand({
      UserPoolId: COGNITO_USER_POOL_ID,
      Username: email,
      GroupName: 'SuperAdmins'
    });

    await cognitoClient.send(addToGroupCommand);
    console.log('✅ User added to SuperAdmins group');

    console.log('\n🎉 Super admin created successfully!');
    console.log('📧 Email:', email);
    console.log('🔑 Temporary Password:', tempPassword);
    console.log('\n⚠️  Important: The admin should change this password on first login');
    console.log('📝 The admin can now log in at your application URL');
    
    return {
      email,
      tempPassword,
      userId: createResult.User.Username
    };

  } catch (error) {
    console.error('❌ Error creating super admin:', error.message);
    
    if (error.name === 'UsernameExistsException') {
      console.error('   This email address is already registered in the system');
    } else if (error.name === 'InvalidPasswordException') {
      console.error('   Password does not meet requirements');
    } else if (error.name === 'ResourceNotFoundException') {
      console.error('   User pool not found - check your User Pool ID');
      console.error('   Current User Pool ID:', COGNITO_USER_POOL_ID);
    } else if (error.name === 'UnauthorizedOperation' || error.name === 'AccessDenied') {
      console.error('   AWS credentials do not have permission to create users');
      console.error('   Required permissions: cognito-idp:AdminCreateUser, cognito-idp:AdminSetUserPassword, cognito-idp:AdminAddUserToGroup');
    } else if (error.name === 'CredentialsError' || error.message.includes('credentials')) {
      console.error('   AWS credentials not found. Please configure one of:');
      console.error('   1. AWS CLI: run `aws configure`');
      console.error('   2. Environment variables: AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY');
      console.error('   3. AWS credentials file: ~/.aws/credentials');
    }
    
    process.exit(1);
  }
}

// CLI Interface
async function main() {
  const args = process.argv.slice(2);
  
  if (args.length < 3) {
    console.log('📝 Usage: node create-admin.js <email> <firstName> <lastName> [phone]');
    console.log('\n📄 Examples:');
    console.log('   node create-admin.js admin@abhh.com John Smith');
    console.log('   node create-admin.js admin@abhh.com John Smith "+1-555-123-4567"');
    console.log('\n🔧 Prerequisites:');
    console.log('   - Set AMPLIFY_COGNITO_USER_POOL_ID in environment variables');
    console.log('   - Ensure AWS credentials are configured');
    console.log('   - SuperAdmins group must exist in Cognito User Pool');
    process.exit(1);
  }

  const [email, firstName, lastName, phone] = args;

  // Validate email
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    console.error('❌ Error: Invalid email address format');
    process.exit(1);
  }

  console.log('🚀 ABHH Interview Platform - Super Admin Creation Tool');
  console.log('================================================');
  console.log('📧 Email:', email);
  console.log('👤 Name:', firstName, lastName);
  if (phone) console.log('📞 Phone:', phone);
  console.log('🏢 User Pool ID:', COGNITO_USER_POOL_ID);
  console.log('🌍 Region:', AWS_REGION);
  console.log('================================================\n');

  await createSuperAdmin(email, firstName, lastName, phone);
}

// Handle script execution
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { createSuperAdmin };