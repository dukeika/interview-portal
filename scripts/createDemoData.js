#!/usr/bin/env node

// File: scripts/createDemoData.js
// Script to create demo accounts and data for the ABHH Interview Portal

const { CognitoIdentityProviderClient, AdminCreateUserCommand, AdminAddUserToGroupCommand, AdminSetUserPasswordCommand } = require('@aws-sdk/client-cognito-identity-provider');
const { generateClient } = require('aws-amplify/api');
const { Amplify } = require('aws-amplify');
const awsconfig = require('../src/aws-exports.js');

// Configure Amplify
Amplify.configure(awsconfig.default);

const region = 'us-west-1';
const userPoolId = 'us-west-1_SIcVm4uiV';

// Initialize Cognito client
const cognitoClient = new CognitoIdentityProviderClient({ region });

// Demo users configuration
const demoUsers = [
  {
    email: 'admin@abhh.demo',
    firstName: 'Super',
    lastName: 'Admin',
    role: 'SUPER_ADMIN',
    group: 'superAdmins',
    password: 'AdminPass123!',
    phone: '+1234567890'
  },
  {
    email: 'company@techcorp.demo',
    firstName: 'Tech',
    lastName: 'Manager',
    role: 'COMPANY_ADMIN',
    group: 'companyAdmins',
    password: 'CompanyPass123!',
    phone: '+1234567891',
    companyId: 'company-1' // Will be created
  },
  {
    email: 'candidate@demo.com',
    firstName: 'John',
    lastName: 'Candidate',
    role: 'CANDIDATE',
    group: 'candidates',
    password: 'CandidatePass123!',
    phone: '+1234567892'
  }
];

// Demo companies
const demoCompanies = [
  {
    id: 'company-1',
    name: 'TechCorp Solutions',
    email: 'hr@techcorp.demo',
    phone: '+1-555-TECH-123',
    address: '123 Innovation Drive, San Francisco, CA 94105',
    website: 'https://techcorp.demo',
    description: 'Leading technology solutions provider specializing in cloud infrastructure and AI-powered applications.',
    isActive: true
  }
];

// Demo jobs
const demoJobs = [
  {
    title: 'Senior Frontend Developer',
    department: 'Engineering',
    location: 'San Francisco, CA (Remote Available)',
    type: 'FULL_TIME',
    salary: '$120,000 - $160,000',
    description: 'Join our dynamic engineering team to build next-generation web applications using React, TypeScript, and modern cloud technologies. You\'ll work on challenging problems that impact thousands of users daily.',
    requirements: [
      '5+ years of professional React development experience',
      'Expert knowledge of TypeScript and modern JavaScript',
      'Experience with state management libraries (Redux, Zustand)',
      'Proficiency in modern CSS frameworks (Tailwind, Styled Components)',
      'Experience with testing frameworks (Jest, React Testing Library)',
      'Knowledge of GraphQL and REST API integration',
      'Familiarity with CI/CD pipelines and AWS services'
    ],
    responsibilities: [
      'Design and develop responsive web applications using React and TypeScript',
      'Collaborate with UX/UI designers to implement pixel-perfect designs',
      'Optimize application performance and ensure scalability',
      'Mentor junior developers and conduct code reviews',
      'Participate in architectural decisions and technical planning',
      'Write comprehensive unit and integration tests',
      'Contribute to our design system and component library'
    ],
    benefits: [
      'Comprehensive health, dental, and vision insurance',
      'Flexible work from home policy',
      '401(k) with company matching up to 6%',
      '$3,000 annual professional development budget',
      'Unlimited PTO policy',
      'Top-tier equipment and ergonomic home office setup',
      'Stock options with high growth potential'
    ],
    status: 'ACTIVE',
    companyId: 'company-1',
    closingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days from now
  },
  {
    title: 'Product Manager - AI Platform',
    department: 'Product',
    location: 'Remote (US timezone)',
    type: 'FULL_TIME',
    salary: '$140,000 - $180,000',
    description: 'Lead the development of our AI-powered platform products. Drive product strategy, work with cross-functional teams, and help shape the future of AI in enterprise applications.',
    requirements: [
      '3+ years of product management experience',
      'Experience with AI/ML products or platforms',
      'Strong analytical and data-driven decision making skills',
      'Experience with agile methodologies and product development lifecycle',
      'Excellent communication and stakeholder management skills',
      'Technical background with ability to work closely with engineering teams',
      'Experience with user research and product analytics tools'
    ],
    responsibilities: [
      'Define and execute product roadmap for AI platform features',
      'Collaborate with engineering, design, and data science teams',
      'Conduct market research and competitive analysis',
      'Gather and prioritize customer feedback and requirements',
      'Define and track key product metrics and KPIs',
      'Lead product launches and go-to-market strategies',
      'Present product updates to executive leadership and stakeholders'
    ],
    benefits: [
      'Comprehensive health and wellness benefits',
      'Equity package with significant upside potential',
      'Flexible PTO and sabbatical opportunities',
      'Remote work with quarterly team meetups',
      'Professional development and conference budget',
      'Latest MacBook Pro and premium accessories',
      'Wellness stipend for gym, mental health, or fitness apps'
    ],
    status: 'ACTIVE',
    companyId: 'company-1',
    closingDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString() // 45 days from now
  },
  {
    title: 'DevOps Engineer',
    department: 'Infrastructure',
    location: 'Austin, TX',
    type: 'FULL_TIME',
    salary: '$110,000 - $145,000',
    description: 'Build and maintain scalable cloud infrastructure. Automate deployment processes, ensure system reliability, and help our engineering teams ship faster with confidence.',
    requirements: [
      '4+ years of DevOps or infrastructure engineering experience',
      'Strong experience with AWS services (EC2, EKS, RDS, S3, etc.)',
      'Proficiency with Infrastructure as Code (Terraform, CloudFormation)',
      'Experience with containerization (Docker, Kubernetes)',
      'Knowledge of CI/CD pipelines (GitHub Actions, Jenkins, GitLab CI)',
      'Scripting experience with Python, Bash, or similar',
      'Understanding of monitoring and observability tools (Prometheus, Grafana, DataDog)'
    ],
    responsibilities: [
      'Design and maintain scalable AWS cloud infrastructure',
      'Implement and optimize CI/CD pipelines for multiple applications',
      'Automate deployment, scaling, and monitoring processes',
      'Ensure system security, reliability, and performance',
      'Collaborate with development teams to improve deployment processes',
      'Manage and optimize cloud costs and resource utilization',
      'Participate in on-call rotation for critical systems support'
    ],
    benefits: [
      'Competitive salary with performance bonuses',
      'Comprehensive insurance coverage',
      'Hybrid work model with flexible hours',
      'Professional certification reimbursement',
      'Conference and training budget',
      'Cutting-edge development tools and resources',
      'Company-sponsored team building events'
    ],
    status: 'ACTIVE',
    companyId: 'company-1',
    closingDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString() // 60 days from now
  }
];

async function createCognitoUser(userConfig) {
  try {
    console.log(`Creating user: ${userConfig.email}`);
    
    // Create user
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
        { Name: 'phone_number_verified', Value: 'true' },
        { Name: 'custom:role', Value: userConfig.role },
        ...(userConfig.companyId ? [{ Name: 'custom:companyId', Value: userConfig.companyId }] : [])
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
    
    console.log(`✅ Successfully created user: ${userConfig.email}`);
    
  } catch (error) {
    if (error.name === 'UsernameExistsException') {
      console.log(`⚠️  User ${userConfig.email} already exists, skipping...`);
    } else {
      console.error(`❌ Error creating user ${userConfig.email}:`, error.message);
    }
  }
}

async function createGraphQLData() {
  try {
    const client = generateClient();
    
    console.log('\n📊 Creating demo companies...');
    
    // Create companies
    for (const company of demoCompanies) {
      try {
        const createCompanyMutation = `
          mutation CreateCompany($input: CreateCompanyInput!) {
            createCompany(input: $input) {
              id
              name
              email
            }
          }
        `;
        
        const result = await client.graphql({
          query: createCompanyMutation,
          variables: {
            input: {
              id: company.id,
              name: company.name,
              email: company.email,
              phone: company.phone,
              address: company.address,
              website: company.website,
              description: company.description,
              isActive: company.isActive
            }
          }
        });
        
        console.log(`✅ Created company: ${company.name}`);
        
      } catch (error) {
        console.error(`❌ Error creating company ${company.name}:`, error.message);
      }
    }
    
    console.log('\n📝 Creating demo job postings...');
    
    // Create jobs
    for (const job of demoJobs) {
      try {
        const createJobMutation = `
          mutation CreateJob($input: CreateJobInput!) {
            createJob(input: $input) {
              id
              title
              company {
                name
              }
            }
          }
        `;
        
        const result = await client.graphql({
          query: createJobMutation,
          variables: {
            input: {
              title: job.title,
              department: job.department,
              location: job.location,
              type: job.type,
              salary: job.salary,
              description: job.description,
              requirements: job.requirements,
              responsibilities: job.responsibilities,
              benefits: job.benefits,
              status: job.status,
              companyId: job.companyId,
              closingDate: job.closingDate
            }
          }
        });
        
        console.log(`✅ Created job: ${job.title}`);
        
      } catch (error) {
        console.error(`❌ Error creating job ${job.title}:`, error.message);
      }
    }
    
  } catch (error) {
    console.error('❌ Error creating GraphQL data:', error);
  }
}

async function main() {
  console.log('🚀 Creating demo data for ABHH Interview Portal...\n');
  
  try {
    // Create Cognito users
    console.log('👥 Creating demo user accounts...');
    for (const user of demoUsers) {
      await createCognitoUser(user);
      // Add delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    // Create GraphQL data
    await createGraphQLData();
    
    console.log('\n🎉 Demo data creation completed!');
    console.log('\n📋 Demo Accounts Created:');
    console.log('┌─────────────────────────────┬─────────────────┬──────────────────┐');
    console.log('│ Email                       │ Role            │ Password         │');
    console.log('├─────────────────────────────┼─────────────────┼──────────────────┤');
    demoUsers.forEach(user => {
      console.log(`│ ${user.email.padEnd(27)} │ ${user.role.replace('_', ' ').padEnd(15)} │ ${user.password.padEnd(16)} │`);
    });
    console.log('└─────────────────────────────┴─────────────────┴──────────────────┘');
    
    console.log('\n🏢 Demo Company: TechCorp Solutions');
    console.log('📝 Demo Jobs: 3 job postings created');
    console.log('\n🌐 Access the application at: http://localhost:3000');
    
  } catch (error) {
    console.error('❌ Failed to create demo data:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { main };