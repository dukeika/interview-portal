#!/usr/bin/env node

// Debug authentication and authorization
const { generateClient } = require('aws-amplify/api');
const { signIn, getCurrentUser, fetchAuthSession } = require('aws-amplify/auth');
const { Amplify } = require('aws-amplify');
const awsconfig = require('../src/aws-exports.js');

// Configure Amplify
Amplify.configure(awsconfig.default);

async function debugAuth() {
  console.log('🔍 Debugging Authentication & Authorization...\n');
  
  try {
    // Sign in
    console.log('🔐 Signing in as admin...');
    const signInResult = await signIn({
      username: 'admin@abhh.demo',
      password: 'AdminPass123!'
    });
    console.log('✅ Sign in successful');
    
    // Get current user
    console.log('\n👤 Getting current user...');
    const user = await getCurrentUser();
    console.log('User:', JSON.stringify(user, null, 2));
    
    // Get auth session
    console.log('\n🎟️ Getting auth session...');
    const session = await fetchAuthSession();
    console.log('Session tokens available:', {
      idToken: !!session.tokens?.idToken,
      accessToken: !!session.tokens?.accessToken
    });
    
    // Decode JWT to see claims
    if (session.tokens?.idToken) {
      const idTokenPayload = JSON.parse(
        Buffer.from(session.tokens.idToken.toString().split('.')[1], 'base64').toString()
      );
      console.log('\n🆔 ID Token Claims:');
      console.log(JSON.stringify(idTokenPayload, null, 2));
    }
    
    if (session.tokens?.accessToken) {
      const accessTokenPayload = JSON.parse(
        Buffer.from(session.tokens.accessToken.toString().split('.')[1], 'base64').toString()
      );
      console.log('\n🔑 Access Token Claims:');
      console.log(JSON.stringify(accessTokenPayload, null, 2));
    }
    
    // Try a simple GraphQL query first
    console.log('\n📊 Testing simple GraphQL query...');
    const client = generateClient();
    
    const listUsersQuery = `
      query ListUsers {
        listUsers {
          items {
            id
            email
            role
          }
        }
      }
    `;
    
    try {
      const result = await client.graphql({
        query: listUsersQuery
      });
      console.log('✅ Query successful:', result.data.listUsers);
    } catch (error) {
      console.log('❌ Query failed:', error.errors?.[0]?.message || error.message);
    }
    
    // Try creating a company
    console.log('\n🏢 Testing company creation...');
    const createCompanyMutation = `
      mutation CreateCompany($input: CreateCompanyInput!) {
        createCompany(input: $input) {
          id
          name
          email
        }
      }
    `;
    
    try {
      const result = await client.graphql({
        query: createCompanyMutation,
        variables: {
          input: {
            name: 'Test Company',
            email: 'test@company.com',
            isActive: true
          }
        }
      });
      console.log('✅ Company creation successful:', result.data.createCompany);
    } catch (error) {
      console.log('❌ Company creation failed:', error.errors?.[0]?.message || error.message);
      console.log('Full error:', JSON.stringify(error, null, 2));
    }
    
  } catch (error) {
    console.error('❌ Debug failed:', error);
  }
}

debugAuth().catch(console.error);