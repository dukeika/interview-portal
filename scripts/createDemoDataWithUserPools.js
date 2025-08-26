#!/usr/bin/env node

// File: scripts/createDemoDataWithUserPools.js
// Script to create demo companies and jobs using Cognito User Pools authentication

const { generateClient } = require('aws-amplify/api');
const { signIn } = require('aws-amplify/auth');
const { Amplify } = require('aws-amplify');
const awsconfig = require('../src/aws-exports.js');

// Configure Amplify with User Pools as default auth
Amplify.configure({
  ...awsconfig.default,
  aws_appsync_authenticationType: "AMAZON_COGNITO_USER_POOLS"
});

// Demo companies
const demoCompanies = [
  {
    name: 'TechCorp Solutions',
    email: 'hr@techcorp.demo',
    phone: '+1-555-TECH-123',
    address: '123 Innovation Drive, San Francisco, CA 94105',
    website: 'https://techcorp.demo',
    description: 'Leading technology solutions provider specializing in cloud infrastructure and AI-powered applications.',
    isActive: true
  },
  {
    name: 'InnovateLabs',
    email: 'careers@innovatelabs.demo',
    phone: '+1-555-INNOV-8',
    address: '456 Startup Blvd, Austin, TX 78701',
    website: 'https://innovatelabs.demo',
    description: 'Fast-growing startup focused on revolutionary AI and machine learning solutions for enterprise clients.',
    isActive: true
  }
];

// Demo jobs (will be associated with companies after they're created)
const demoJobs = [
  {
    title: 'Senior Frontend Developer',
    department: 'Engineering',
    location: 'San Francisco, CA (Remote Available)',
    type: 'FULL_TIME',
    salary: '$120,000 - $160,000',
    description: 'Join our dynamic engineering team to build next-generation web applications using React, TypeScript, and modern cloud technologies.',
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
      'Participate in architectural decisions and technical planning'
    ],
    benefits: [
      'Comprehensive health, dental, and vision insurance',
      'Flexible work from home policy',
      '401(k) with company matching up to 6%',
      '$3,000 annual professional development budget',
      'Unlimited PTO policy'
    ],
    status: 'ACTIVE',
    companyIndex: 0
  },
  {
    title: 'Product Manager - AI Platform',
    department: 'Product',
    location: 'Remote (US timezone)',
    type: 'FULL_TIME',
    salary: '$140,000 - $180,000',
    description: 'Lead the development of our AI-powered platform products. Drive product strategy and work with cross-functional teams.',
    requirements: [
      '3+ years of product management experience',
      'Experience with AI/ML products or platforms',
      'Strong analytical and data-driven decision making skills',
      'Experience with agile methodologies and product development lifecycle'
    ],
    responsibilities: [
      'Define and execute product roadmap for AI platform features',
      'Collaborate with engineering, design, and data science teams',
      'Conduct market research and competitive analysis',
      'Gather and prioritize customer feedback and requirements'
    ],
    benefits: [
      'Comprehensive health and wellness benefits',
      'Equity package with significant upside potential',
      'Flexible PTO and sabbatical opportunities',
      'Remote work with quarterly team meetups'
    ],
    status: 'ACTIVE',
    companyIndex: 0
  },
  {
    title: 'DevOps Engineer',
    department: 'Infrastructure',
    location: 'Austin, TX',
    type: 'FULL_TIME',
    salary: '$110,000 - $145,000',
    description: 'Build and maintain scalable cloud infrastructure. Automate deployment processes and ensure system reliability.',
    requirements: [
      '4+ years of DevOps or infrastructure engineering experience',
      'Strong experience with AWS services (EC2, EKS, RDS, S3, etc.)',
      'Proficiency with Infrastructure as Code (Terraform, CloudFormation)',
      'Experience with containerization (Docker, Kubernetes)'
    ],
    responsibilities: [
      'Design and maintain scalable AWS cloud infrastructure',
      'Implement and optimize CI/CD pipelines for multiple applications',
      'Automate deployment, scaling, and monitoring processes',
      'Ensure system security, reliability, and performance'
    ],
    benefits: [
      'Competitive salary with performance bonuses',
      'Comprehensive insurance coverage',
      'Hybrid work model with flexible hours',
      'Professional certification reimbursement'
    ],
    status: 'ACTIVE',
    companyIndex: 1
  }
];

async function authenticateAsAdmin() {
  console.log('🔐 Authenticating as Super Admin...');
  
  try {
    const result = await signIn({
      username: 'admin@abhh.demo',
      password: 'AdminPass123!'
    });
    
    console.log('✅ Authentication successful!');
    return true;
  } catch (error) {
    console.error('❌ Authentication failed:', error);
    return false;
  }
}

async function createGraphQLData() {
  // Create client with explicit Cognito User Pools auth mode
  const client = generateClient({
    authMode: 'userPool'
  });
  const createdCompanies = [];

  console.log('🚀 Creating demo GraphQL data with User Pools authentication...\\n');
  
  try {
    console.log('🏢 Creating demo companies...');
    
    // Create companies
    for (const company of demoCompanies) {
      try {
        const createCompanyMutation = `
          mutation CreateCompany($input: CreateCompanyInput!) {
            createCompany(input: $input) {
              id
              name
              email
              isActive
              createdAt
            }
          }
        `;
        
        const result = await client.graphql({
          query: createCompanyMutation,
          variables: {
            input: {
              name: company.name,
              email: company.email,
              phone: company.phone,
              address: company.address,
              website: company.website,
              description: company.description,
              isActive: company.isActive
            }
          },
          authMode: 'userPool'
        });
        
        createdCompanies.push(result.data.createCompany);
        console.log(`✅ Created company: ${company.name} (ID: ${result.data.createCompany.id})`);
        
      } catch (error) {
        console.error(`❌ Error creating company ${company.name}:`, error.errors?.[0]?.message || error.message);
        console.error('Full error:', JSON.stringify(error, null, 2));
      }
    }
    
    if (createdCompanies.length === 0) {
      console.log('⚠️ No companies created, skipping job creation');
      return;
    }
    
    console.log('\\n📝 Creating demo job postings...');
    
    // Create jobs
    for (const job of demoJobs) {
      try {
        const companyId = createdCompanies[job.companyIndex]?.id;
        if (!companyId) {
          console.error(`❌ Company not found for job: ${job.title}`);
          continue;
        }

        const createJobMutation = `
          mutation CreateJob($input: CreateJobInput!) {
            createJob(input: $input) {
              id
              title
              company {
                name
              }
              status
              createdAt
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
              companyId: companyId,
              closingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
            }
          },
          authMode: 'userPool'
        });
        
        console.log(`✅ Created job: ${job.title} at ${result.data.createJob.company.name}`);
        
      } catch (error) {
        console.error(`❌ Error creating job ${job.title}:`, error.errors?.[0]?.message || error.message);
      }
    }
    
    console.log('\\n🎉 Demo GraphQL data creation completed!');
    console.log('\\n📊 Summary:');
    console.log(`🏢 Companies created: ${createdCompanies.length}`);
    console.log(`📝 Job postings attempted: ${demoJobs.length}`);
    
    console.log('\\n📋 Created Companies:');
    createdCompanies.forEach((company, index) => {
      console.log(`  ${index + 1}. ${company.name} (ID: ${company.id})`);
    });
    
  } catch (error) {
    console.error('❌ Failed to create GraphQL data:', error);
  }
}

async function main() {
  console.log('🚀 Creating demo data for ABHH Interview Portal...\\n');
  
  // Authenticate first
  const authenticated = await authenticateAsAdmin();
  if (!authenticated) {
    console.error('❌ Failed to authenticate, cannot create demo data');
    process.exit(1);
  }
  
  // Wait a moment for auth to settle
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Create the demo data
  await createGraphQLData();
  
  console.log('\\n🌐 Demo data creation completed!');
  console.log('🔗 Access the application at: http://localhost:3000');
  console.log('\\n🔑 Demo Login Credentials:');
  console.log('Super Admin: admin@abhh.demo / AdminPass123!');
  console.log('Company Admin: company@techcorp.demo / CompanyPass123!');
  console.log('Candidate: candidate@demo.com / CandidatePass123!');
}

if (require.main === module) {
  main().catch(error => {
    console.error('Script failed:', error);
    process.exit(1);
  });
}

module.exports = { main };