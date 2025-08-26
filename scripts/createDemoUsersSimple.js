#!/usr/bin/env node

// File: scripts/createDemoUsersSimple.js
// Simplified script to create demo accounts without custom attributes

const { CognitoIdentityProviderClient, AdminCreateUserCommand, AdminAddUserToGroupCommand, AdminSetUserPasswordCommand } = require('@aws-sdk/client-cognito-identity-provider');

const region = 'us-west-1';
const userPoolId = 'us-west-1_SIcVm4uiV';

// Initialize Cognito client
const cognitoClient = new CognitoIdentityProviderClient({ region });

// Demo users configuration (without custom attributes for now)
const demoUsers = [
  {
    email: 'admin@abhh.demo',
    firstName: 'Super',
    lastName: 'Admin',
    role: 'SUPER_ADMIN',
    group: 'superAdmins',
    password: 'AdminPass123!',
    phone: '+12345678901'
  },
  {
    email: 'company@techcorp.demo',
    firstName: 'Tech',
    lastName: 'Manager',
    role: 'COMPANY_ADMIN',
    group: 'companyAdmins',
    password: 'CompanyPass123!',
    phone: '+12345678902'
  },
  {
    email: 'candidate@demo.com',
    firstName: 'John',
    lastName: 'Candidate',
    role: 'CANDIDATE',
    group: 'candidates',
    password: 'CandidatePass123!',
    phone: '+12345678903'
  }
];

async function createCognitoUser(userConfig) {
  try {
    console.log(`Creating user: ${userConfig.email}`);
    
    // Create user with basic attributes only
    const createUserParams = {
      UserPoolId: userPoolId,
      Username: userConfig.email,
      MessageAction: 'SUPPRESS', // Don't send welcome email
      TemporaryPassword: userConfig.password,
      UserAttributes: [
        { Name: 'email', Value: userConfig.email },
        { Name: 'email_verified', Value: 'true' },
        { Name: 'given_name', Value: userConfig.firstName },
        { Name: 'family_name', Value: userConfig.lastName },
        { Name: 'phone_number', Value: userConfig.phone },
        { Name: 'phone_number_verified', Value: 'true' }
      ]
    };

    await cognitoClient.send(new AdminCreateUserCommand(createUserParams));
    
    // Set permanent password
    const setPasswordParams = {
      UserPoolId: userPoolId,
      Username: userConfig.email,
      Password: userConfig.password,
      Permanent: true
    };
    
    await cognitoClient.send(new AdminSetUserPasswordCommand(setPasswordParams));
    
    // Add user to group
    const addToGroupParams = {
      UserPoolId: userPoolId,
      Username: userConfig.email,
      GroupName: userConfig.group
    };
    
    await cognitoClient.send(new AdminAddUserToGroupCommand(addToGroupParams));
    
    console.log(`✅ Successfully created user: ${userConfig.email} in group: ${userConfig.group}`);
    
  } catch (error) {
    if (error.name === 'UsernameExistsException') {
      console.log(`⚠️  User ${userConfig.email} already exists, skipping...`);
    } else {
      console.error(`❌ Error creating user ${userConfig.email}:`, error.message);
    }
  }
}

async function main() {
  console.log('🚀 Creating demo user accounts for ABHH Interview Portal...\n');
  
  try {
    // Create Cognito users
    console.log('👥 Creating demo user accounts...');
    for (const user of demoUsers) {
      await createCognitoUser(user);
      // Add delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    console.log('\n🎉 Demo user creation completed!');
    console.log('\n📋 Demo Accounts Created:');
    console.log('┌─────────────────────────────┬─────────────────┬──────────────────┐');
    console.log('│ Email                       │ Role            │ Password         │');
    console.log('├─────────────────────────────┼─────────────────┼──────────────────┤');
    demoUsers.forEach(user => {
      const roleDisplay = user.role.replace('_', ' ');
      console.log(`│ ${user.email.padEnd(27)} │ ${roleDisplay.padEnd(15)} │ ${user.password.padEnd(16)} │`);
    });
    console.log('└─────────────────────────────┴─────────────────┴──────────────────┘');
    
    console.log('\n📌 Note: Users have been created in their respective Cognito groups.');
    console.log('🌐 Access the application at: http://localhost:3000');
    console.log('\n⚠️  The authentication system will still use mock mode until we update the AuthContext.');
    
  } catch (error) {
    console.error('❌ Failed to create demo users:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { main };