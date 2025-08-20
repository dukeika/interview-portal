/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getCompany = /* GraphQL */ `query GetCompany($id: ID!) {
  getCompany(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetCompanyQueryVariables,
  APITypes.GetCompanyQuery
>;
export const listCompanies = /* GraphQL */ `query ListCompanies(
  $filter: ModelCompanyFilterInput
  $limit: Int
  $nextToken: String
) {
  listCompanies(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListCompaniesQueryVariables,
  APITypes.ListCompaniesQuery
>;
export const getCompanyAdmin = /* GraphQL */ `query GetCompanyAdmin($id: ID!) {
  getCompanyAdmin(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetCompanyAdminQueryVariables,
  APITypes.GetCompanyAdminQuery
>;
export const listCompanyAdmins = /* GraphQL */ `query ListCompanyAdmins(
  $filter: ModelCompanyAdminFilterInput
  $limit: Int
  $nextToken: String
) {
  listCompanyAdmins(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      cognitoId
      email
      firstName
      lastName
      phone
      isActive
      companyId
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListCompanyAdminsQueryVariables,
  APITypes.ListCompanyAdminsQuery
>;
export const companyAdminsByCognitoId = /* GraphQL */ `query CompanyAdminsByCognitoId(
  $cognitoId: String!
  $sortDirection: ModelSortDirection
  $filter: ModelCompanyAdminFilterInput
  $limit: Int
  $nextToken: String
) {
  companyAdminsByCognitoId(
    cognitoId: $cognitoId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      cognitoId
      email
      firstName
      lastName
      phone
      isActive
      companyId
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.CompanyAdminsByCognitoIdQueryVariables,
  APITypes.CompanyAdminsByCognitoIdQuery
>;
export const companyAdminsByCompanyId = /* GraphQL */ `query CompanyAdminsByCompanyId(
  $companyId: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelCompanyAdminFilterInput
  $limit: Int
  $nextToken: String
) {
  companyAdminsByCompanyId(
    companyId: $companyId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      cognitoId
      email
      firstName
      lastName
      phone
      isActive
      companyId
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.CompanyAdminsByCompanyIdQueryVariables,
  APITypes.CompanyAdminsByCompanyIdQuery
>;
export const getSuperAdmin = /* GraphQL */ `query GetSuperAdmin($id: ID!) {
  getSuperAdmin(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetSuperAdminQueryVariables,
  APITypes.GetSuperAdminQuery
>;
export const listSuperAdmins = /* GraphQL */ `query ListSuperAdmins(
  $filter: ModelSuperAdminFilterInput
  $limit: Int
  $nextToken: String
) {
  listSuperAdmins(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListSuperAdminsQueryVariables,
  APITypes.ListSuperAdminsQuery
>;
export const superAdminsByCognitoId = /* GraphQL */ `query SuperAdminsByCognitoId(
  $cognitoId: String!
  $sortDirection: ModelSortDirection
  $filter: ModelSuperAdminFilterInput
  $limit: Int
  $nextToken: String
) {
  superAdminsByCognitoId(
    cognitoId: $cognitoId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.SuperAdminsByCognitoIdQueryVariables,
  APITypes.SuperAdminsByCognitoIdQuery
>;
export const getJob = /* GraphQL */ `query GetJob($id: ID!) {
  getJob(id: $id) {
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
` as GeneratedQuery<APITypes.GetJobQueryVariables, APITypes.GetJobQuery>;
export const listJobs = /* GraphQL */ `query ListJobs($filter: ModelJobFilterInput, $limit: Int, $nextToken: String) {
  listJobs(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<APITypes.ListJobsQueryVariables, APITypes.ListJobsQuery>;
export const jobsByCompanyId = /* GraphQL */ `query JobsByCompanyId(
  $companyId: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelJobFilterInput
  $limit: Int
  $nextToken: String
) {
  jobsByCompanyId(
    companyId: $companyId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.JobsByCompanyIdQueryVariables,
  APITypes.JobsByCompanyIdQuery
>;
export const getApplication = /* GraphQL */ `query GetApplication($id: ID!) {
  getApplication(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetApplicationQueryVariables,
  APITypes.GetApplicationQuery
>;
export const listApplications = /* GraphQL */ `query ListApplications(
  $filter: ModelApplicationFilterInput
  $limit: Int
  $nextToken: String
) {
  listApplications(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListApplicationsQueryVariables,
  APITypes.ListApplicationsQuery
>;
export const applicationsByCandidateId = /* GraphQL */ `query ApplicationsByCandidateId(
  $candidateId: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelApplicationFilterInput
  $limit: Int
  $nextToken: String
) {
  applicationsByCandidateId(
    candidateId: $candidateId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ApplicationsByCandidateIdQueryVariables,
  APITypes.ApplicationsByCandidateIdQuery
>;
export const applicationsByJobId = /* GraphQL */ `query ApplicationsByJobId(
  $jobId: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelApplicationFilterInput
  $limit: Int
  $nextToken: String
) {
  applicationsByJobId(
    jobId: $jobId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ApplicationsByJobIdQueryVariables,
  APITypes.ApplicationsByJobIdQuery
>;
export const getCandidate = /* GraphQL */ `query GetCandidate($id: ID!) {
  getCandidate(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetCandidateQueryVariables,
  APITypes.GetCandidateQuery
>;
export const listCandidates = /* GraphQL */ `query ListCandidates(
  $filter: ModelCandidateFilterInput
  $limit: Int
  $nextToken: String
) {
  listCandidates(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListCandidatesQueryVariables,
  APITypes.ListCandidatesQuery
>;
export const candidatesByCognitoId = /* GraphQL */ `query CandidatesByCognitoId(
  $cognitoId: String!
  $sortDirection: ModelSortDirection
  $filter: ModelCandidateFilterInput
  $limit: Int
  $nextToken: String
) {
  candidatesByCognitoId(
    cognitoId: $cognitoId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.CandidatesByCognitoIdQueryVariables,
  APITypes.CandidatesByCognitoIdQuery
>;
export const getQuestion = /* GraphQL */ `query GetQuestion($id: ID!) {
  getQuestion(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetQuestionQueryVariables,
  APITypes.GetQuestionQuery
>;
export const listQuestions = /* GraphQL */ `query ListQuestions(
  $filter: ModelQuestionFilterInput
  $limit: Int
  $nextToken: String
) {
  listQuestions(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListQuestionsQueryVariables,
  APITypes.ListQuestionsQuery
>;
export const questionsByJobId = /* GraphQL */ `query QuestionsByJobId(
  $jobId: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelQuestionFilterInput
  $limit: Int
  $nextToken: String
) {
  questionsByJobId(
    jobId: $jobId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.QuestionsByJobIdQueryVariables,
  APITypes.QuestionsByJobIdQuery
>;
export const getTestResponse = /* GraphQL */ `query GetTestResponse($id: ID!) {
  getTestResponse(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetTestResponseQueryVariables,
  APITypes.GetTestResponseQuery
>;
export const listTestResponses = /* GraphQL */ `query ListTestResponses(
  $filter: ModelTestResponseFilterInput
  $limit: Int
  $nextToken: String
) {
  listTestResponses(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      applicationId
      questionId
      response
      videoUrl
      isCorrect
      submittedAt
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListTestResponsesQueryVariables,
  APITypes.ListTestResponsesQuery
>;
export const testResponsesByApplicationId = /* GraphQL */ `query TestResponsesByApplicationId(
  $applicationId: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelTestResponseFilterInput
  $limit: Int
  $nextToken: String
) {
  testResponsesByApplicationId(
    applicationId: $applicationId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      applicationId
      questionId
      response
      videoUrl
      isCorrect
      submittedAt
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.TestResponsesByApplicationIdQueryVariables,
  APITypes.TestResponsesByApplicationIdQuery
>;
export const testResponsesByQuestionId = /* GraphQL */ `query TestResponsesByQuestionId(
  $questionId: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelTestResponseFilterInput
  $limit: Int
  $nextToken: String
) {
  testResponsesByQuestionId(
    questionId: $questionId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      applicationId
      questionId
      response
      videoUrl
      isCorrect
      submittedAt
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.TestResponsesByQuestionIdQueryVariables,
  APITypes.TestResponsesByQuestionIdQuery
>;
