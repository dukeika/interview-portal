/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createCompany = /* GraphQL */ `mutation CreateCompany(
  $input: CreateCompanyInput!
  $condition: ModelCompanyConditionInput
) {
  createCompany(input: $input, condition: $condition) {
    id
    name
    email
    phone
    address
    website
    logo
    description
    isActive
    createdAt
    updatedAt
    admins {
      nextToken
      __typename
    }
    jobs {
      nextToken
      __typename
    }
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateCompanyMutationVariables,
  APITypes.CreateCompanyMutation
>;
export const updateCompany = /* GraphQL */ `mutation UpdateCompany(
  $input: UpdateCompanyInput!
  $condition: ModelCompanyConditionInput
) {
  updateCompany(input: $input, condition: $condition) {
    id
    name
    email
    phone
    address
    website
    logo
    description
    isActive
    createdAt
    updatedAt
    admins {
      nextToken
      __typename
    }
    jobs {
      nextToken
      __typename
    }
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateCompanyMutationVariables,
  APITypes.UpdateCompanyMutation
>;
export const deleteCompany = /* GraphQL */ `mutation DeleteCompany(
  $input: DeleteCompanyInput!
  $condition: ModelCompanyConditionInput
) {
  deleteCompany(input: $input, condition: $condition) {
    id
    name
    email
    phone
    address
    website
    logo
    description
    isActive
    createdAt
    updatedAt
    admins {
      nextToken
      __typename
    }
    jobs {
      nextToken
      __typename
    }
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteCompanyMutationVariables,
  APITypes.DeleteCompanyMutation
>;
export const createCompanyAdmin = /* GraphQL */ `mutation CreateCompanyAdmin(
  $input: CreateCompanyAdminInput!
  $condition: ModelCompanyAdminConditionInput
) {
  createCompanyAdmin(input: $input, condition: $condition) {
    id
    cognitoId
    email
    firstName
    lastName
    phone
    isActive
    companyId
    company {
      id
      name
      email
      phone
      address
      website
      logo
      description
      isActive
      createdAt
      updatedAt
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateCompanyAdminMutationVariables,
  APITypes.CreateCompanyAdminMutation
>;
export const updateCompanyAdmin = /* GraphQL */ `mutation UpdateCompanyAdmin(
  $input: UpdateCompanyAdminInput!
  $condition: ModelCompanyAdminConditionInput
) {
  updateCompanyAdmin(input: $input, condition: $condition) {
    id
    cognitoId
    email
    firstName
    lastName
    phone
    isActive
    companyId
    company {
      id
      name
      email
      phone
      address
      website
      logo
      description
      isActive
      createdAt
      updatedAt
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateCompanyAdminMutationVariables,
  APITypes.UpdateCompanyAdminMutation
>;
export const deleteCompanyAdmin = /* GraphQL */ `mutation DeleteCompanyAdmin(
  $input: DeleteCompanyAdminInput!
  $condition: ModelCompanyAdminConditionInput
) {
  deleteCompanyAdmin(input: $input, condition: $condition) {
    id
    cognitoId
    email
    firstName
    lastName
    phone
    isActive
    companyId
    company {
      id
      name
      email
      phone
      address
      website
      logo
      description
      isActive
      createdAt
      updatedAt
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteCompanyAdminMutationVariables,
  APITypes.DeleteCompanyAdminMutation
>;
export const createSuperAdmin = /* GraphQL */ `mutation CreateSuperAdmin(
  $input: CreateSuperAdminInput!
  $condition: ModelSuperAdminConditionInput
) {
  createSuperAdmin(input: $input, condition: $condition) {
    id
    cognitoId
    email
    firstName
    lastName
    phone
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateSuperAdminMutationVariables,
  APITypes.CreateSuperAdminMutation
>;
export const updateSuperAdmin = /* GraphQL */ `mutation UpdateSuperAdmin(
  $input: UpdateSuperAdminInput!
  $condition: ModelSuperAdminConditionInput
) {
  updateSuperAdmin(input: $input, condition: $condition) {
    id
    cognitoId
    email
    firstName
    lastName
    phone
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateSuperAdminMutationVariables,
  APITypes.UpdateSuperAdminMutation
>;
export const deleteSuperAdmin = /* GraphQL */ `mutation DeleteSuperAdmin(
  $input: DeleteSuperAdminInput!
  $condition: ModelSuperAdminConditionInput
) {
  deleteSuperAdmin(input: $input, condition: $condition) {
    id
    cognitoId
    email
    firstName
    lastName
    phone
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteSuperAdminMutationVariables,
  APITypes.DeleteSuperAdminMutation
>;
export const createJob = /* GraphQL */ `mutation CreateJob(
  $input: CreateJobInput!
  $condition: ModelJobConditionInput
) {
  createJob(input: $input, condition: $condition) {
    id
    title
    description
    requirements
    location
    jobType
    salaryRange
    isActive
    companyId
    createdAt
    updatedAt
    company {
      id
      name
      email
      phone
      address
      website
      logo
      description
      isActive
      createdAt
      updatedAt
      __typename
    }
    applications {
      nextToken
      __typename
    }
    questions {
      nextToken
      __typename
    }
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateJobMutationVariables,
  APITypes.CreateJobMutation
>;
export const updateJob = /* GraphQL */ `mutation UpdateJob(
  $input: UpdateJobInput!
  $condition: ModelJobConditionInput
) {
  updateJob(input: $input, condition: $condition) {
    id
    title
    description
    requirements
    location
    jobType
    salaryRange
    isActive
    companyId
    createdAt
    updatedAt
    company {
      id
      name
      email
      phone
      address
      website
      logo
      description
      isActive
      createdAt
      updatedAt
      __typename
    }
    applications {
      nextToken
      __typename
    }
    questions {
      nextToken
      __typename
    }
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateJobMutationVariables,
  APITypes.UpdateJobMutation
>;
export const deleteJob = /* GraphQL */ `mutation DeleteJob(
  $input: DeleteJobInput!
  $condition: ModelJobConditionInput
) {
  deleteJob(input: $input, condition: $condition) {
    id
    title
    description
    requirements
    location
    jobType
    salaryRange
    isActive
    companyId
    createdAt
    updatedAt
    company {
      id
      name
      email
      phone
      address
      website
      logo
      description
      isActive
      createdAt
      updatedAt
      __typename
    }
    applications {
      nextToken
      __typename
    }
    questions {
      nextToken
      __typename
    }
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteJobMutationVariables,
  APITypes.DeleteJobMutation
>;
export const createApplication = /* GraphQL */ `mutation CreateApplication(
  $input: CreateApplicationInput!
  $condition: ModelApplicationConditionInput
) {
  createApplication(input: $input, condition: $condition) {
    id
    candidateId
    jobId
    status
    currentStage
    appliedAt
    updatedAt
    coverLetter
    resumeUrl
    writtenTestScore
    writtenTestSubmittedAt
    videoTestUrl
    videoTestSubmittedAt
    interviewLink
    interviewScheduledAt
    finalDecision
    candidate {
      id
      cognitoId
      email
      firstName
      lastName
      phone
      address
      linkedin
      portfolio
      bio
      skills
      experience
      education
      createdAt
      updatedAt
      __typename
    }
    job {
      id
      title
      description
      requirements
      location
      jobType
      salaryRange
      isActive
      companyId
      createdAt
      updatedAt
      __typename
    }
    testResponses {
      nextToken
      __typename
    }
    createdAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateApplicationMutationVariables,
  APITypes.CreateApplicationMutation
>;
export const updateApplication = /* GraphQL */ `mutation UpdateApplication(
  $input: UpdateApplicationInput!
  $condition: ModelApplicationConditionInput
) {
  updateApplication(input: $input, condition: $condition) {
    id
    candidateId
    jobId
    status
    currentStage
    appliedAt
    updatedAt
    coverLetter
    resumeUrl
    writtenTestScore
    writtenTestSubmittedAt
    videoTestUrl
    videoTestSubmittedAt
    interviewLink
    interviewScheduledAt
    finalDecision
    candidate {
      id
      cognitoId
      email
      firstName
      lastName
      phone
      address
      linkedin
      portfolio
      bio
      skills
      experience
      education
      createdAt
      updatedAt
      __typename
    }
    job {
      id
      title
      description
      requirements
      location
      jobType
      salaryRange
      isActive
      companyId
      createdAt
      updatedAt
      __typename
    }
    testResponses {
      nextToken
      __typename
    }
    createdAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateApplicationMutationVariables,
  APITypes.UpdateApplicationMutation
>;
export const deleteApplication = /* GraphQL */ `mutation DeleteApplication(
  $input: DeleteApplicationInput!
  $condition: ModelApplicationConditionInput
) {
  deleteApplication(input: $input, condition: $condition) {
    id
    candidateId
    jobId
    status
    currentStage
    appliedAt
    updatedAt
    coverLetter
    resumeUrl
    writtenTestScore
    writtenTestSubmittedAt
    videoTestUrl
    videoTestSubmittedAt
    interviewLink
    interviewScheduledAt
    finalDecision
    candidate {
      id
      cognitoId
      email
      firstName
      lastName
      phone
      address
      linkedin
      portfolio
      bio
      skills
      experience
      education
      createdAt
      updatedAt
      __typename
    }
    job {
      id
      title
      description
      requirements
      location
      jobType
      salaryRange
      isActive
      companyId
      createdAt
      updatedAt
      __typename
    }
    testResponses {
      nextToken
      __typename
    }
    createdAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteApplicationMutationVariables,
  APITypes.DeleteApplicationMutation
>;
export const createCandidate = /* GraphQL */ `mutation CreateCandidate(
  $input: CreateCandidateInput!
  $condition: ModelCandidateConditionInput
) {
  createCandidate(input: $input, condition: $condition) {
    id
    cognitoId
    email
    firstName
    lastName
    phone
    address
    linkedin
    portfolio
    bio
    skills
    experience
    education
    createdAt
    applications {
      nextToken
      __typename
    }
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateCandidateMutationVariables,
  APITypes.CreateCandidateMutation
>;
export const updateCandidate = /* GraphQL */ `mutation UpdateCandidate(
  $input: UpdateCandidateInput!
  $condition: ModelCandidateConditionInput
) {
  updateCandidate(input: $input, condition: $condition) {
    id
    cognitoId
    email
    firstName
    lastName
    phone
    address
    linkedin
    portfolio
    bio
    skills
    experience
    education
    createdAt
    applications {
      nextToken
      __typename
    }
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateCandidateMutationVariables,
  APITypes.UpdateCandidateMutation
>;
export const deleteCandidate = /* GraphQL */ `mutation DeleteCandidate(
  $input: DeleteCandidateInput!
  $condition: ModelCandidateConditionInput
) {
  deleteCandidate(input: $input, condition: $condition) {
    id
    cognitoId
    email
    firstName
    lastName
    phone
    address
    linkedin
    portfolio
    bio
    skills
    experience
    education
    createdAt
    applications {
      nextToken
      __typename
    }
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteCandidateMutationVariables,
  APITypes.DeleteCandidateMutation
>;
export const createQuestion = /* GraphQL */ `mutation CreateQuestion(
  $input: CreateQuestionInput!
  $condition: ModelQuestionConditionInput
) {
  createQuestion(input: $input, condition: $condition) {
    id
    jobId
    stage
    questionText
    questionType
    options
    correctAnswer
    timeLimit
    order
    isActive
    job {
      id
      title
      description
      requirements
      location
      jobType
      salaryRange
      isActive
      companyId
      createdAt
      updatedAt
      __typename
    }
    responses {
      nextToken
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateQuestionMutationVariables,
  APITypes.CreateQuestionMutation
>;
export const updateQuestion = /* GraphQL */ `mutation UpdateQuestion(
  $input: UpdateQuestionInput!
  $condition: ModelQuestionConditionInput
) {
  updateQuestion(input: $input, condition: $condition) {
    id
    jobId
    stage
    questionText
    questionType
    options
    correctAnswer
    timeLimit
    order
    isActive
    job {
      id
      title
      description
      requirements
      location
      jobType
      salaryRange
      isActive
      companyId
      createdAt
      updatedAt
      __typename
    }
    responses {
      nextToken
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateQuestionMutationVariables,
  APITypes.UpdateQuestionMutation
>;
export const deleteQuestion = /* GraphQL */ `mutation DeleteQuestion(
  $input: DeleteQuestionInput!
  $condition: ModelQuestionConditionInput
) {
  deleteQuestion(input: $input, condition: $condition) {
    id
    jobId
    stage
    questionText
    questionType
    options
    correctAnswer
    timeLimit
    order
    isActive
    job {
      id
      title
      description
      requirements
      location
      jobType
      salaryRange
      isActive
      companyId
      createdAt
      updatedAt
      __typename
    }
    responses {
      nextToken
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteQuestionMutationVariables,
  APITypes.DeleteQuestionMutation
>;
export const createTestResponse = /* GraphQL */ `mutation CreateTestResponse(
  $input: CreateTestResponseInput!
  $condition: ModelTestResponseConditionInput
) {
  createTestResponse(input: $input, condition: $condition) {
    id
    applicationId
    questionId
    response
    videoUrl
    isCorrect
    submittedAt
    application {
      id
      candidateId
      jobId
      status
      currentStage
      appliedAt
      updatedAt
      coverLetter
      resumeUrl
      writtenTestScore
      writtenTestSubmittedAt
      videoTestUrl
      videoTestSubmittedAt
      interviewLink
      interviewScheduledAt
      finalDecision
      createdAt
      __typename
    }
    question {
      id
      jobId
      stage
      questionText
      questionType
      options
      correctAnswer
      timeLimit
      order
      isActive
      createdAt
      updatedAt
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateTestResponseMutationVariables,
  APITypes.CreateTestResponseMutation
>;
export const updateTestResponse = /* GraphQL */ `mutation UpdateTestResponse(
  $input: UpdateTestResponseInput!
  $condition: ModelTestResponseConditionInput
) {
  updateTestResponse(input: $input, condition: $condition) {
    id
    applicationId
    questionId
    response
    videoUrl
    isCorrect
    submittedAt
    application {
      id
      candidateId
      jobId
      status
      currentStage
      appliedAt
      updatedAt
      coverLetter
      resumeUrl
      writtenTestScore
      writtenTestSubmittedAt
      videoTestUrl
      videoTestSubmittedAt
      interviewLink
      interviewScheduledAt
      finalDecision
      createdAt
      __typename
    }
    question {
      id
      jobId
      stage
      questionText
      questionType
      options
      correctAnswer
      timeLimit
      order
      isActive
      createdAt
      updatedAt
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateTestResponseMutationVariables,
  APITypes.UpdateTestResponseMutation
>;
export const deleteTestResponse = /* GraphQL */ `mutation DeleteTestResponse(
  $input: DeleteTestResponseInput!
  $condition: ModelTestResponseConditionInput
) {
  deleteTestResponse(input: $input, condition: $condition) {
    id
    applicationId
    questionId
    response
    videoUrl
    isCorrect
    submittedAt
    application {
      id
      candidateId
      jobId
      status
      currentStage
      appliedAt
      updatedAt
      coverLetter
      resumeUrl
      writtenTestScore
      writtenTestSubmittedAt
      videoTestUrl
      videoTestSubmittedAt
      interviewLink
      interviewScheduledAt
      finalDecision
      createdAt
      __typename
    }
    question {
      id
      jobId
      stage
      questionText
      questionType
      options
      correctAnswer
      timeLimit
      order
      isActive
      createdAt
      updatedAt
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteTestResponseMutationVariables,
  APITypes.DeleteTestResponseMutation
>;
