#!/usr/bin/env node

// File: scripts/createDemoGraphQLData.js
// Script to create demo companies and jobs using GraphQL

const { generateClient } = require('aws-amplify/api');
const { Amplify } = require('aws-amplify');
const awsconfig = require('../src/aws-exports.js');

// Configure Amplify
Amplify.configure(awsconfig.default);

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
    companyIndex: 0,
    closingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
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
    companyIndex: 0,
    closingDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString()
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
    companyIndex: 1,
    closingDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    title: 'UX Designer',
    department: 'Design',
    location: 'Austin, TX (Hybrid)',
    type: 'FULL_TIME',
    salary: '$85,000 - $115,000',
    description: 'Create exceptional user experiences for our AI-powered applications. Work with a talented team to solve complex design challenges and shape the future of human-AI interaction.',
    requirements: [
      'Portfolio showcasing UX design work and process',
      'Proficiency in design tools (Figma, Sketch, Adobe Creative Suite)',
      'User research and usability testing experience',
      'Understanding of design systems and accessibility principles',
      'Strong communication and presentation skills',
      'Experience with prototyping tools and methods',
      '3+ years of professional UX design experience'
    ],
    responsibilities: [
      'Create wireframes, prototypes, and high-fidelity designs',
      'Conduct user research and usability testing sessions',
      'Collaborate closely with product and engineering teams',
      'Design and maintain our comprehensive design system',
      'Present design solutions to stakeholders and clients',
      'Stay current with design trends and best practices',
      'Mentor junior designers and interns'
    ],
    benefits: [
      'Health, dental, and vision insurance',
      'Creative workspace with state-of-the-art tools',
      'Design conference and workshop budget',
      'Flexible schedule and hybrid work options',
      'Collaborative and inspiring work environment',
      'Professional development opportunities',
      'Equity participation program'
    ],
    status: 'ACTIVE',
    companyIndex: 1,
    closingDate: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000).toISOString()
  }
];

async function createGraphQLData() {
  const client = generateClient();
  const createdCompanies = [];

  console.log('🚀 Creating demo GraphQL data for ABHH Interview Portal...\n');
  
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
          }
        });
        
        createdCompanies.push(result.data.createCompany);
        console.log(`✅ Created company: ${company.name} (ID: ${result.data.createCompany.id})`);
        
      } catch (error) {
        console.error(`❌ Error creating company ${company.name}:`, error.errors?.[0]?.message || error.message);
      }
    }
    
    console.log('\n📝 Creating demo job postings...');
    
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
              closingDate: job.closingDate
            }
          }
        });
        
        console.log(`✅ Created job: ${job.title} at ${result.data.createJob.company.name}`);
        
      } catch (error) {
        console.error(`❌ Error creating job ${job.title}:`, error.errors?.[0]?.message || error.message);
      }
    }
    
    console.log('\n🎉 Demo GraphQL data creation completed!');
    console.log('\n📊 Summary:');
    console.log(`🏢 Companies created: ${createdCompanies.length}`);
    console.log(`📝 Job postings created: ${demoJobs.length}`);
    
    console.log('\n📋 Created Companies:');
    createdCompanies.forEach((company, index) => {
      console.log(`  ${index + 1}. ${company.name} (ID: ${company.id})`);
    });
    
  } catch (error) {
    console.error('❌ Failed to create GraphQL data:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  createGraphQLData();
}

module.exports = { createGraphQLData };