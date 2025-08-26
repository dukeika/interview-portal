#!/usr/bin/env node

// Quick test to verify authentication and data access work
const { generateClient } = require('aws-amplify/api');
const { signIn } = require('aws-amplify/auth');
const { Amplify } = require('aws-amplify');
const awsconfig = require('../src/aws-exports.js');

// Configure Amplify with User Pools auth
Amplify.configure({
  ...awsconfig.default,
  aws_appsync_authenticationType: "AMAZON_COGNITO_USER_POOLS"
});

async function testAuthentication() {
  console.log('🧪 Testing authentication and data access...\n');
  
  try {
    // Test Super Admin
    console.log('🔐 Testing Super Admin login...');
    await signIn({
      username: 'admin@abhh.demo',
      password: 'AdminPass123!'
    });
    
    const client = generateClient({
      authMode: 'userPool'
    });
    
    // Test reading companies
    console.log('📋 Testing company data access...');
    const companiesResult = await client.graphql({
      query: `
        query ListCompanies {
          listCompanies {
            items {
              id
              name
              email
              isActive
            }
          }
        }
      `,
      authMode: 'userPool'
    });
    
    const companies = companiesResult.data.listCompanies.items;
    console.log(`✅ Found ${companies.length} companies:`);
    companies.forEach((company, index) => {
      console.log(`  ${index + 1}. ${company.name} (${company.email})`);
    });
    
    // Test reading jobs
    console.log('\n📝 Testing job data access...');
    const jobsResult = await client.graphql({
      query: `
        query ListJobs {
          listJobs {
            items {
              id
              title
              department
              location
              status
              company {
                name
              }
            }
          }
        }
      `,
      authMode: 'userPool'
    });
    
    const jobs = jobsResult.data.listJobs.items;
    console.log(`✅ Found ${jobs.length} jobs:`);
    jobs.forEach((job, index) => {
      console.log(`  ${index + 1}. ${job.title} at ${job.company.name} (${job.department})`);
    });
    
    console.log('\n🎉 All tests passed! Authentication and data access working correctly.');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    if (error.errors) {
      console.error('GraphQL errors:', error.errors);
    }
  }
}

testAuthentication().catch(console.error);