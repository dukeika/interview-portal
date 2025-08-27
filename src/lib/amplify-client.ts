// src/lib/amplify-client.ts
"use client";

import { Amplify } from "aws-amplify";

// AWS configuration from aws-exports
const awsconfig = {
  aws_project_region: "us-west-1",
  aws_appsync_graphqlEndpoint: "https://4pz36wwojfhijdsnbkzmvmmmfu.appsync-api.us-west-1.amazonaws.com/graphql",
  aws_appsync_region: "us-west-1",
  aws_appsync_authenticationType: "AMAZON_COGNITO_USER_POOLS",
  aws_appsync_apiKey: "da2-h3ps5lhgdvd37cl7vnb6btj3wi",
  aws_cognito_identity_pool_id: "us-west-1:dc6a1bc8-8963-43cd-9276-c584f903b28b",
  aws_cognito_region: "us-west-1",
  aws_user_pools_id: "us-west-1_SIcVm4uiV",
  aws_user_pools_web_client_id: "o85glfsigcbn1e91icouo8r69",
  oauth: {},
  aws_cognito_username_attributes: ["EMAIL"],
  aws_cognito_social_providers: [],
  aws_cognito_signup_attributes: ["EMAIL"],
  aws_cognito_mfa_configuration: "OFF",
  aws_cognito_mfa_types: ["SMS"],
  aws_cognito_password_protection_settings: {
    passwordPolicyMinLength: 8,
    passwordPolicyCharacters: []
  },
  aws_cognito_verification_mechanisms: ["EMAIL"],
  aws_user_files_s3_bucket: "interview-saas-storage-bucket1fa42-abbhsaas",
  aws_user_files_s3_bucket_region: "us-west-1"
};

let isConfigured = false;

export function configureAmplifyClient() {
  if (typeof window === 'undefined' || isConfigured) return;
  
  try {
    Amplify.configure(awsconfig);
    isConfigured = true;
    console.log("✅ Amplify configured successfully");
  } catch (error) {
    console.error("❌ Failed to configure Amplify:", error);
  }
}

// Auto-configure on import in browser
if (typeof window !== 'undefined') {
  configureAmplifyClient();
}