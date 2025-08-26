// src/lib/amplify-config.ts
import { Amplify } from "aws-amplify";
import awsExports from "../aws-exports";

let isConfigured = false;

const configureAmplify = (): boolean => {
  if (isConfigured) return true;

  try {
    // Configure Amplify with User Pools as default authentication
    Amplify.configure(awsExports);
    isConfigured = true;
    console.log("Amplify configured successfully with Cognito User Pools authentication");
    return true;
  } catch (error) {
    console.error("Failed to configure Amplify:", error);
    return false;
  }
};

const isAmplifyConfigured = () => isConfigured;

// Export both named and default exports
export { configureAmplify, isAmplifyConfigured };
export default configureAmplify;
