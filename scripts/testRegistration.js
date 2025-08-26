#!/usr/bin/env node

// Script to test the registration and user creation flow
const { signUp, confirmSignUp, signIn } = require('aws-amplify/auth');
const { Amplify } = require('aws-amplify');
const { userService } = require('../src/services/userService.ts');
const awsconfig = require('../src/aws-exports.js');

// Configure Amplify with User Pools auth
Amplify.configure({
  ...awsconfig.default,
  aws_appsync_authenticationType: "AMAZON_COGNITO_USER_POOLS"
});

const testData = {
  email: 'test-candidate@example.com',
  password: 'TestPass123!',
  firstName: 'Test',
  lastName: 'Candidate',
  phone: '+1-555-TEST-123'
};

async function testRegistrationFlow() {
  console.log('🧪 Testing complete registration flow...\n');

  try {
    // Step 1: Sign up
    console.log('1️⃣ Creating Cognito user...');
    await signUp({
      username: testData.email,
      password: testData.password,
      options: {
        userAttributes: {
          email: testData.email,
          given_name: testData.firstName,
          family_name: testData.lastName,
          phone_number: testData.phone
        }
      }
    });
    console.log('✅ Cognito user created successfully');

    // For testing, we'd need to manually confirm the user in the AWS Console
    // or use admin APIs. For now, let's test the user service directly
    
    console.log('\n2️⃣ Testing user service...');
    
    // Test creating user record
    const mockCognitoUser = {
      id: 'test-sub-id-123',
      email: testData.email,
      firstName: testData.firstName,
      lastName: testData.lastName,
      phone: testData.phone
    };

    console.log('\n📊 Testing database user creation...');
    const createdUser = await userService.createUser({
      sub: mockCognitoUser.id,
      email: mockCognitoUser.email,
      firstName: mockCognitoUser.firstName,
      lastName: mockCognitoUser.lastName,
      phone: mockCognitoUser.phone,
      role: 'CANDIDATE',
      isActive: true
    });
    
    console.log('✅ User record created in database:', {
      id: createdUser.id,
      email: createdUser.email,
      role: createdUser.role
    });

    // Test retrieving user
    console.log('\n📋 Testing user retrieval...');
    const retrievedUser = await userService.getUserBySub(mockCognitoUser.id);
    
    if (retrievedUser) {
      console.log('✅ User successfully retrieved from database');
      
      // Test updating user
      console.log('\n✏️ Testing user update...');
      const updatedUser = await userService.updateUser({
        id: retrievedUser.id,
        phone: '+1-555-UPDATED'
      });
      
      console.log('✅ User updated successfully');
      
      // Clean up - delete test user
      console.log('\n🧹 Cleaning up test user...');
      await userService.deleteUser(retrievedUser.id);
      console.log('✅ Test user deleted');
    }

    console.log('\n🎉 All registration flow tests passed!');
    
  } catch (error) {
    console.error('❌ Test failed:', error);
    if (error.errors) {
      console.error('GraphQL errors:', error.errors);
    }
  }
}

async function testUserServiceOnly() {
  console.log('🧪 Testing user service operations only...\n');

  try {
    // Test creating user record
    const testUserData = {
      sub: `test-sub-${Date.now()}`,
      email: `test-${Date.now()}@example.com`,
      firstName: 'Test',
      lastName: 'User',
      phone: '+1-555-TEST-123',
      role: 'CANDIDATE',
      isActive: true
    };

    console.log('1️⃣ Creating user record...');
    const createdUser = await userService.createUser(testUserData);
    console.log('✅ User created:', {
      id: createdUser.id,
      email: createdUser.email,
      role: createdUser.role
    });

    // Test retrieving user
    console.log('\n2️⃣ Retrieving user by sub...');
    const retrievedUser = await userService.getUserBySub(testUserData.sub);
    if (retrievedUser) {
      console.log('✅ User retrieved successfully');
    }

    // Test retrieving user by email
    console.log('\n3️⃣ Retrieving user by email...');
    const userByEmail = await userService.getUserByEmail(testUserData.email);
    if (userByEmail) {
      console.log('✅ User retrieved by email successfully');
    }

    // Test updating user
    console.log('\n4️⃣ Updating user...');
    const updatedUser = await userService.updateUser({
      id: createdUser.id,
      phone: '+1-555-UPDATED-123'
    });
    console.log('✅ User updated successfully');

    // Clean up
    console.log('\n5️⃣ Cleaning up...');
    await userService.deleteUser(createdUser.id);
    console.log('✅ Test user deleted');

    console.log('\n🎉 All user service tests passed!');

  } catch (error) {
    console.error('❌ User service test failed:', error);
    if (error.errors) {
      console.error('GraphQL errors:', error.errors);
    }
  }
}

async function main() {
  console.log('🚀 Running registration and user management tests...\n');
  
  // Start with user service tests (safer)
  await testUserServiceOnly();
  
  console.log('\n' + '='.repeat(60) + '\n');
  
  // Full registration flow test (requires manual confirmation)
  console.log('ℹ️ Skipping full Cognito registration test (requires manual confirmation)');
  console.log('ℹ️ To test full flow: run this script, then confirm email in AWS Console, then re-run');
}

if (require.main === module) {
  main().catch(error => {
    console.error('Script failed:', error);
    process.exit(1);
  });
}