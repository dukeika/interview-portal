/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateCompany = /* GraphQL */ `subscription OnCreateCompany($filter: ModelSubscriptionCompanyFilterInput) {
  onCreateCompany(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateCompanySubscriptionVariables,
  APITypes.OnCreateCompanySubscription
>;
export const onUpdateCompany = /* GraphQL */ `subscription OnUpdateCompany($filter: ModelSubscriptionCompanyFilterInput) {
  onUpdateCompany(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateCompanySubscriptionVariables,
  APITypes.OnUpdateCompanySubscription
>;
export const onDeleteCompany = /* GraphQL */ `subscription OnDeleteCompany($filter: ModelSubscriptionCompanyFilterInput) {
  onDeleteCompany(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteCompanySubscriptionVariables,
  APITypes.OnDeleteCompanySubscription
>;
export const onCreateCompanyAdmin = /* GraphQL */ `subscription OnCreateCompanyAdmin(
  $filter: ModelSubscriptionCompanyAdminFilterInput
) {
  onCreateCompanyAdmin(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateCompanyAdminSubscriptionVariables,
  APITypes.OnCreateCompanyAdminSubscription
>;
export const onUpdateCompanyAdmin = /* GraphQL */ `subscription OnUpdateCompanyAdmin(
  $filter: ModelSubscriptionCompanyAdminFilterInput
) {
  onUpdateCompanyAdmin(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateCompanyAdminSubscriptionVariables,
  APITypes.OnUpdateCompanyAdminSubscription
>;
export const onDeleteCompanyAdmin = /* GraphQL */ `subscription OnDeleteCompanyAdmin(
  $filter: ModelSubscriptionCompanyAdminFilterInput
) {
  onDeleteCompanyAdmin(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteCompanyAdminSubscriptionVariables,
  APITypes.OnDeleteCompanyAdminSubscription
>;
export const onCreateSuperAdmin = /* GraphQL */ `subscription OnCreateSuperAdmin(
  $filter: ModelSubscriptionSuperAdminFilterInput
) {
  onCreateSuperAdmin(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateSuperAdminSubscriptionVariables,
  APITypes.OnCreateSuperAdminSubscription
>;
export const onUpdateSuperAdmin = /* GraphQL */ `subscription OnUpdateSuperAdmin(
  $filter: ModelSubscriptionSuperAdminFilterInput
) {
  onUpdateSuperAdmin(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateSuperAdminSubscriptionVariables,
  APITypes.OnUpdateSuperAdminSubscription
>;
export const onDeleteSuperAdmin = /* GraphQL */ `subscription OnDeleteSuperAdmin(
  $filter: ModelSubscriptionSuperAdminFilterInput
) {
  onDeleteSuperAdmin(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteSuperAdminSubscriptionVariables,
  APITypes.OnDeleteSuperAdminSubscription
>;
export const onCreateJob = /* GraphQL */ `subscription OnCreateJob($filter: ModelSubscriptionJobFilterInput) {
  onCreateJob(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateJobSubscriptionVariables,
  APITypes.OnCreateJobSubscription
>;
export const onUpdateJob = /* GraphQL */ `subscription OnUpdateJob($filter: ModelSubscriptionJobFilterInput) {
  onUpdateJob(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateJobSubscriptionVariables,
  APITypes.OnUpdateJobSubscription
>;
export const onDeleteJob = /* GraphQL */ `subscription OnDeleteJob($filter: ModelSubscriptionJobFilterInput) {
  onDeleteJob(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteJobSubscriptionVariables,
  APITypes.OnDeleteJobSubscription
>;
export const onCreateApplication = /* GraphQL */ `subscription OnCreateApplication(
  $filter: ModelSubscriptionApplicationFilterInput
) {
  onCreateApplication(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateApplicationSubscriptionVariables,
  APITypes.OnCreateApplicationSubscription
>;
export const onUpdateApplication = /* GraphQL */ `subscription OnUpdateApplication(
  $filter: ModelSubscriptionApplicationFilterInput
) {
  onUpdateApplication(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateApplicationSubscriptionVariables,
  APITypes.OnUpdateApplicationSubscription
>;
export const onDeleteApplication = /* GraphQL */ `subscription OnDeleteApplication(
  $filter: ModelSubscriptionApplicationFilterInput
) {
  onDeleteApplication(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteApplicationSubscriptionVariables,
  APITypes.OnDeleteApplicationSubscription
>;
export const onCreateCandidate = /* GraphQL */ `subscription OnCreateCandidate($filter: ModelSubscriptionCandidateFilterInput) {
  onCreateCandidate(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateCandidateSubscriptionVariables,
  APITypes.OnCreateCandidateSubscription
>;
export const onUpdateCandidate = /* GraphQL */ `subscription OnUpdateCandidate($filter: ModelSubscriptionCandidateFilterInput) {
  onUpdateCandidate(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateCandidateSubscriptionVariables,
  APITypes.OnUpdateCandidateSubscription
>;
export const onDeleteCandidate = /* GraphQL */ `subscription OnDeleteCandidate($filter: ModelSubscriptionCandidateFilterInput) {
  onDeleteCandidate(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteCandidateSubscriptionVariables,
  APITypes.OnDeleteCandidateSubscription
>;
export const onCreateQuestion = /* GraphQL */ `subscription OnCreateQuestion($filter: ModelSubscriptionQuestionFilterInput) {
  onCreateQuestion(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateQuestionSubscriptionVariables,
  APITypes.OnCreateQuestionSubscription
>;
export const onUpdateQuestion = /* GraphQL */ `subscription OnUpdateQuestion($filter: ModelSubscriptionQuestionFilterInput) {
  onUpdateQuestion(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateQuestionSubscriptionVariables,
  APITypes.OnUpdateQuestionSubscription
>;
export const onDeleteQuestion = /* GraphQL */ `subscription OnDeleteQuestion($filter: ModelSubscriptionQuestionFilterInput) {
  onDeleteQuestion(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteQuestionSubscriptionVariables,
  APITypes.OnDeleteQuestionSubscription
>;
export const onCreateTestResponse = /* GraphQL */ `subscription OnCreateTestResponse(
  $filter: ModelSubscriptionTestResponseFilterInput
) {
  onCreateTestResponse(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateTestResponseSubscriptionVariables,
  APITypes.OnCreateTestResponseSubscription
>;
export const onUpdateTestResponse = /* GraphQL */ `subscription OnUpdateTestResponse(
  $filter: ModelSubscriptionTestResponseFilterInput
) {
  onUpdateTestResponse(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateTestResponseSubscriptionVariables,
  APITypes.OnUpdateTestResponseSubscription
>;
export const onDeleteTestResponse = /* GraphQL */ `subscription OnDeleteTestResponse(
  $filter: ModelSubscriptionTestResponseFilterInput
) {
  onDeleteTestResponse(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteTestResponseSubscriptionVariables,
  APITypes.OnDeleteTestResponseSubscription
>;
