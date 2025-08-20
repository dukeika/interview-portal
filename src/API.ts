/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateCompanyInput = {
  id?: string | null,
  name: string,
  email: string,
  phone?: string | null,
  address?: string | null,
  website?: string | null,
  logo?: string | null,
  description?: string | null,
  isActive: boolean,
  createdAt?: string | null,
  updatedAt?: string | null,
};

export type ModelCompanyConditionInput = {
  name?: ModelStringInput | null,
  email?: ModelStringInput | null,
  phone?: ModelStringInput | null,
  address?: ModelStringInput | null,
  website?: ModelStringInput | null,
  logo?: ModelStringInput | null,
  description?: ModelStringInput | null,
  isActive?: ModelBooleanInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelCompanyConditionInput | null > | null,
  or?: Array< ModelCompanyConditionInput | null > | null,
  not?: ModelCompanyConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type Company = {
  __typename: "Company",
  id: string,
  name: string,
  email: string,
  phone?: string | null,
  address?: string | null,
  website?: string | null,
  logo?: string | null,
  description?: string | null,
  isActive: boolean,
  createdAt: string,
  updatedAt: string,
  admins?: ModelCompanyAdminConnection | null,
  jobs?: ModelJobConnection | null,
};

export type ModelCompanyAdminConnection = {
  __typename: "ModelCompanyAdminConnection",
  items:  Array<CompanyAdmin | null >,
  nextToken?: string | null,
};

export type CompanyAdmin = {
  __typename: "CompanyAdmin",
  id: string,
  cognitoId: string,
  email: string,
  firstName: string,
  lastName: string,
  phone?: string | null,
  isActive: boolean,
  companyId: string,
  company?: Company | null,
  createdAt: string,
  updatedAt: string,
};

export type ModelJobConnection = {
  __typename: "ModelJobConnection",
  items:  Array<Job | null >,
  nextToken?: string | null,
};

export type Job = {
  __typename: "Job",
  id: string,
  title: string,
  description: string,
  requirements?: string | null,
  location?: string | null,
  jobType?: string | null,
  salaryRange?: string | null,
  isActive: boolean,
  companyId: string,
  createdAt: string,
  updatedAt: string,
  company?: Company | null,
  applications?: ModelApplicationConnection | null,
  questions?: ModelQuestionConnection | null,
};

export type ModelApplicationConnection = {
  __typename: "ModelApplicationConnection",
  items:  Array<Application | null >,
  nextToken?: string | null,
};

export type Application = {
  __typename: "Application",
  id: string,
  candidateId: string,
  jobId: string,
  status: ApplicationStatus,
  currentStage: number,
  appliedAt: string,
  updatedAt: string,
  coverLetter?: string | null,
  resumeUrl?: string | null,
  writtenTestScore?: number | null,
  writtenTestSubmittedAt?: string | null,
  videoTestUrl?: string | null,
  videoTestSubmittedAt?: string | null,
  interviewLink?: string | null,
  interviewScheduledAt?: string | null,
  finalDecision?: string | null,
  candidate?: Candidate | null,
  job?: Job | null,
  testResponses?: ModelTestResponseConnection | null,
  createdAt: string,
};

export enum ApplicationStatus {
  APPLIED = "APPLIED",
  WRITTEN_TEST_PENDING = "WRITTEN_TEST_PENDING",
  WRITTEN_TEST_COMPLETED = "WRITTEN_TEST_COMPLETED",
  VIDEO_TEST_PENDING = "VIDEO_TEST_PENDING",
  VIDEO_TEST_COMPLETED = "VIDEO_TEST_COMPLETED",
  INTERVIEW_SCHEDULED = "INTERVIEW_SCHEDULED",
  INTERVIEW_COMPLETED = "INTERVIEW_COMPLETED",
  ACCEPTED = "ACCEPTED",
  REJECTED = "REJECTED",
  WITHDRAWN = "WITHDRAWN",
}


export type Candidate = {
  __typename: "Candidate",
  id: string,
  cognitoId: string,
  email: string,
  firstName: string,
  lastName: string,
  phone?: string | null,
  address?: string | null,
  linkedin?: string | null,
  portfolio?: string | null,
  bio?: string | null,
  skills?: Array< string | null > | null,
  experience?: string | null,
  education?: string | null,
  createdAt: string,
  applications?: ModelApplicationConnection | null,
  updatedAt: string,
};

export type ModelTestResponseConnection = {
  __typename: "ModelTestResponseConnection",
  items:  Array<TestResponse | null >,
  nextToken?: string | null,
};

export type TestResponse = {
  __typename: "TestResponse",
  id: string,
  applicationId: string,
  questionId: string,
  response?: string | null,
  videoUrl?: string | null,
  isCorrect?: boolean | null,
  submittedAt: string,
  application?: Application | null,
  question?: Question | null,
  createdAt: string,
  updatedAt: string,
};

export type Question = {
  __typename: "Question",
  id: string,
  jobId: string,
  stage: number,
  questionText: string,
  questionType: QuestionType,
  options?: Array< string | null > | null,
  correctAnswer?: string | null,
  timeLimit?: number | null,
  order: number,
  isActive: boolean,
  job?: Job | null,
  responses?: ModelTestResponseConnection | null,
  createdAt: string,
  updatedAt: string,
};

export enum QuestionType {
  MULTIPLE_CHOICE = "MULTIPLE_CHOICE",
  TEXT = "TEXT",
  VIDEO = "VIDEO",
}


export type ModelQuestionConnection = {
  __typename: "ModelQuestionConnection",
  items:  Array<Question | null >,
  nextToken?: string | null,
};

export type UpdateCompanyInput = {
  id: string,
  name?: string | null,
  email?: string | null,
  phone?: string | null,
  address?: string | null,
  website?: string | null,
  logo?: string | null,
  description?: string | null,
  isActive?: boolean | null,
  createdAt?: string | null,
  updatedAt?: string | null,
};

export type DeleteCompanyInput = {
  id: string,
};

export type CreateCompanyAdminInput = {
  id?: string | null,
  cognitoId: string,
  email: string,
  firstName: string,
  lastName: string,
  phone?: string | null,
  isActive: boolean,
  companyId: string,
};

export type ModelCompanyAdminConditionInput = {
  cognitoId?: ModelStringInput | null,
  email?: ModelStringInput | null,
  firstName?: ModelStringInput | null,
  lastName?: ModelStringInput | null,
  phone?: ModelStringInput | null,
  isActive?: ModelBooleanInput | null,
  companyId?: ModelIDInput | null,
  and?: Array< ModelCompanyAdminConditionInput | null > | null,
  or?: Array< ModelCompanyAdminConditionInput | null > | null,
  not?: ModelCompanyAdminConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type UpdateCompanyAdminInput = {
  id: string,
  cognitoId?: string | null,
  email?: string | null,
  firstName?: string | null,
  lastName?: string | null,
  phone?: string | null,
  isActive?: boolean | null,
  companyId?: string | null,
};

export type DeleteCompanyAdminInput = {
  id: string,
};

export type CreateSuperAdminInput = {
  id?: string | null,
  cognitoId: string,
  email: string,
  firstName: string,
  lastName: string,
  phone?: string | null,
};

export type ModelSuperAdminConditionInput = {
  cognitoId?: ModelStringInput | null,
  email?: ModelStringInput | null,
  firstName?: ModelStringInput | null,
  lastName?: ModelStringInput | null,
  phone?: ModelStringInput | null,
  and?: Array< ModelSuperAdminConditionInput | null > | null,
  or?: Array< ModelSuperAdminConditionInput | null > | null,
  not?: ModelSuperAdminConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type SuperAdmin = {
  __typename: "SuperAdmin",
  id: string,
  cognitoId: string,
  email: string,
  firstName: string,
  lastName: string,
  phone?: string | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdateSuperAdminInput = {
  id: string,
  cognitoId?: string | null,
  email?: string | null,
  firstName?: string | null,
  lastName?: string | null,
  phone?: string | null,
};

export type DeleteSuperAdminInput = {
  id: string,
};

export type CreateJobInput = {
  id?: string | null,
  title: string,
  description: string,
  requirements?: string | null,
  location?: string | null,
  jobType?: string | null,
  salaryRange?: string | null,
  isActive: boolean,
  companyId: string,
  createdAt?: string | null,
  updatedAt?: string | null,
};

export type ModelJobConditionInput = {
  title?: ModelStringInput | null,
  description?: ModelStringInput | null,
  requirements?: ModelStringInput | null,
  location?: ModelStringInput | null,
  jobType?: ModelStringInput | null,
  salaryRange?: ModelStringInput | null,
  isActive?: ModelBooleanInput | null,
  companyId?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelJobConditionInput | null > | null,
  or?: Array< ModelJobConditionInput | null > | null,
  not?: ModelJobConditionInput | null,
};

export type UpdateJobInput = {
  id: string,
  title?: string | null,
  description?: string | null,
  requirements?: string | null,
  location?: string | null,
  jobType?: string | null,
  salaryRange?: string | null,
  isActive?: boolean | null,
  companyId?: string | null,
  createdAt?: string | null,
  updatedAt?: string | null,
};

export type DeleteJobInput = {
  id: string,
};

export type CreateApplicationInput = {
  id?: string | null,
  candidateId: string,
  jobId: string,
  status: ApplicationStatus,
  currentStage: number,
  appliedAt: string,
  updatedAt?: string | null,
  coverLetter?: string | null,
  resumeUrl?: string | null,
  writtenTestScore?: number | null,
  writtenTestSubmittedAt?: string | null,
  videoTestUrl?: string | null,
  videoTestSubmittedAt?: string | null,
  interviewLink?: string | null,
  interviewScheduledAt?: string | null,
  finalDecision?: string | null,
};

export type ModelApplicationConditionInput = {
  candidateId?: ModelIDInput | null,
  jobId?: ModelIDInput | null,
  status?: ModelApplicationStatusInput | null,
  currentStage?: ModelIntInput | null,
  appliedAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  coverLetter?: ModelStringInput | null,
  resumeUrl?: ModelStringInput | null,
  writtenTestScore?: ModelFloatInput | null,
  writtenTestSubmittedAt?: ModelStringInput | null,
  videoTestUrl?: ModelStringInput | null,
  videoTestSubmittedAt?: ModelStringInput | null,
  interviewLink?: ModelStringInput | null,
  interviewScheduledAt?: ModelStringInput | null,
  finalDecision?: ModelStringInput | null,
  and?: Array< ModelApplicationConditionInput | null > | null,
  or?: Array< ModelApplicationConditionInput | null > | null,
  not?: ModelApplicationConditionInput | null,
  createdAt?: ModelStringInput | null,
};

export type ModelApplicationStatusInput = {
  eq?: ApplicationStatus | null,
  ne?: ApplicationStatus | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type ModelFloatInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type UpdateApplicationInput = {
  id: string,
  candidateId?: string | null,
  jobId?: string | null,
  status?: ApplicationStatus | null,
  currentStage?: number | null,
  appliedAt?: string | null,
  updatedAt?: string | null,
  coverLetter?: string | null,
  resumeUrl?: string | null,
  writtenTestScore?: number | null,
  writtenTestSubmittedAt?: string | null,
  videoTestUrl?: string | null,
  videoTestSubmittedAt?: string | null,
  interviewLink?: string | null,
  interviewScheduledAt?: string | null,
  finalDecision?: string | null,
};

export type DeleteApplicationInput = {
  id: string,
};

export type CreateCandidateInput = {
  id?: string | null,
  cognitoId: string,
  email: string,
  firstName: string,
  lastName: string,
  phone?: string | null,
  address?: string | null,
  linkedin?: string | null,
  portfolio?: string | null,
  bio?: string | null,
  skills?: Array< string | null > | null,
  experience?: string | null,
  education?: string | null,
  createdAt?: string | null,
};

export type ModelCandidateConditionInput = {
  cognitoId?: ModelStringInput | null,
  email?: ModelStringInput | null,
  firstName?: ModelStringInput | null,
  lastName?: ModelStringInput | null,
  phone?: ModelStringInput | null,
  address?: ModelStringInput | null,
  linkedin?: ModelStringInput | null,
  portfolio?: ModelStringInput | null,
  bio?: ModelStringInput | null,
  skills?: ModelStringInput | null,
  experience?: ModelStringInput | null,
  education?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  and?: Array< ModelCandidateConditionInput | null > | null,
  or?: Array< ModelCandidateConditionInput | null > | null,
  not?: ModelCandidateConditionInput | null,
  updatedAt?: ModelStringInput | null,
};

export type UpdateCandidateInput = {
  id: string,
  cognitoId?: string | null,
  email?: string | null,
  firstName?: string | null,
  lastName?: string | null,
  phone?: string | null,
  address?: string | null,
  linkedin?: string | null,
  portfolio?: string | null,
  bio?: string | null,
  skills?: Array< string | null > | null,
  experience?: string | null,
  education?: string | null,
  createdAt?: string | null,
};

export type DeleteCandidateInput = {
  id: string,
};

export type CreateQuestionInput = {
  id?: string | null,
  jobId: string,
  stage: number,
  questionText: string,
  questionType: QuestionType,
  options?: Array< string | null > | null,
  correctAnswer?: string | null,
  timeLimit?: number | null,
  order: number,
  isActive: boolean,
};

export type ModelQuestionConditionInput = {
  jobId?: ModelIDInput | null,
  stage?: ModelIntInput | null,
  questionText?: ModelStringInput | null,
  questionType?: ModelQuestionTypeInput | null,
  options?: ModelStringInput | null,
  correctAnswer?: ModelStringInput | null,
  timeLimit?: ModelIntInput | null,
  order?: ModelIntInput | null,
  isActive?: ModelBooleanInput | null,
  and?: Array< ModelQuestionConditionInput | null > | null,
  or?: Array< ModelQuestionConditionInput | null > | null,
  not?: ModelQuestionConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelQuestionTypeInput = {
  eq?: QuestionType | null,
  ne?: QuestionType | null,
};

export type UpdateQuestionInput = {
  id: string,
  jobId?: string | null,
  stage?: number | null,
  questionText?: string | null,
  questionType?: QuestionType | null,
  options?: Array< string | null > | null,
  correctAnswer?: string | null,
  timeLimit?: number | null,
  order?: number | null,
  isActive?: boolean | null,
};

export type DeleteQuestionInput = {
  id: string,
};

export type CreateTestResponseInput = {
  id?: string | null,
  applicationId: string,
  questionId: string,
  response?: string | null,
  videoUrl?: string | null,
  isCorrect?: boolean | null,
  submittedAt: string,
};

export type ModelTestResponseConditionInput = {
  applicationId?: ModelIDInput | null,
  questionId?: ModelIDInput | null,
  response?: ModelStringInput | null,
  videoUrl?: ModelStringInput | null,
  isCorrect?: ModelBooleanInput | null,
  submittedAt?: ModelStringInput | null,
  and?: Array< ModelTestResponseConditionInput | null > | null,
  or?: Array< ModelTestResponseConditionInput | null > | null,
  not?: ModelTestResponseConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type UpdateTestResponseInput = {
  id: string,
  applicationId?: string | null,
  questionId?: string | null,
  response?: string | null,
  videoUrl?: string | null,
  isCorrect?: boolean | null,
  submittedAt?: string | null,
};

export type DeleteTestResponseInput = {
  id: string,
};

export type ModelCompanyFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  email?: ModelStringInput | null,
  phone?: ModelStringInput | null,
  address?: ModelStringInput | null,
  website?: ModelStringInput | null,
  logo?: ModelStringInput | null,
  description?: ModelStringInput | null,
  isActive?: ModelBooleanInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelCompanyFilterInput | null > | null,
  or?: Array< ModelCompanyFilterInput | null > | null,
  not?: ModelCompanyFilterInput | null,
};

export type ModelCompanyConnection = {
  __typename: "ModelCompanyConnection",
  items:  Array<Company | null >,
  nextToken?: string | null,
};

export type ModelCompanyAdminFilterInput = {
  id?: ModelIDInput | null,
  cognitoId?: ModelStringInput | null,
  email?: ModelStringInput | null,
  firstName?: ModelStringInput | null,
  lastName?: ModelStringInput | null,
  phone?: ModelStringInput | null,
  isActive?: ModelBooleanInput | null,
  companyId?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelCompanyAdminFilterInput | null > | null,
  or?: Array< ModelCompanyAdminFilterInput | null > | null,
  not?: ModelCompanyAdminFilterInput | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelSuperAdminFilterInput = {
  id?: ModelIDInput | null,
  cognitoId?: ModelStringInput | null,
  email?: ModelStringInput | null,
  firstName?: ModelStringInput | null,
  lastName?: ModelStringInput | null,
  phone?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelSuperAdminFilterInput | null > | null,
  or?: Array< ModelSuperAdminFilterInput | null > | null,
  not?: ModelSuperAdminFilterInput | null,
};

export type ModelSuperAdminConnection = {
  __typename: "ModelSuperAdminConnection",
  items:  Array<SuperAdmin | null >,
  nextToken?: string | null,
};

export type ModelJobFilterInput = {
  id?: ModelIDInput | null,
  title?: ModelStringInput | null,
  description?: ModelStringInput | null,
  requirements?: ModelStringInput | null,
  location?: ModelStringInput | null,
  jobType?: ModelStringInput | null,
  salaryRange?: ModelStringInput | null,
  isActive?: ModelBooleanInput | null,
  companyId?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelJobFilterInput | null > | null,
  or?: Array< ModelJobFilterInput | null > | null,
  not?: ModelJobFilterInput | null,
};

export type ModelApplicationFilterInput = {
  id?: ModelIDInput | null,
  candidateId?: ModelIDInput | null,
  jobId?: ModelIDInput | null,
  status?: ModelApplicationStatusInput | null,
  currentStage?: ModelIntInput | null,
  appliedAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  coverLetter?: ModelStringInput | null,
  resumeUrl?: ModelStringInput | null,
  writtenTestScore?: ModelFloatInput | null,
  writtenTestSubmittedAt?: ModelStringInput | null,
  videoTestUrl?: ModelStringInput | null,
  videoTestSubmittedAt?: ModelStringInput | null,
  interviewLink?: ModelStringInput | null,
  interviewScheduledAt?: ModelStringInput | null,
  finalDecision?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  and?: Array< ModelApplicationFilterInput | null > | null,
  or?: Array< ModelApplicationFilterInput | null > | null,
  not?: ModelApplicationFilterInput | null,
};

export type ModelCandidateFilterInput = {
  id?: ModelIDInput | null,
  cognitoId?: ModelStringInput | null,
  email?: ModelStringInput | null,
  firstName?: ModelStringInput | null,
  lastName?: ModelStringInput | null,
  phone?: ModelStringInput | null,
  address?: ModelStringInput | null,
  linkedin?: ModelStringInput | null,
  portfolio?: ModelStringInput | null,
  bio?: ModelStringInput | null,
  skills?: ModelStringInput | null,
  experience?: ModelStringInput | null,
  education?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelCandidateFilterInput | null > | null,
  or?: Array< ModelCandidateFilterInput | null > | null,
  not?: ModelCandidateFilterInput | null,
};

export type ModelCandidateConnection = {
  __typename: "ModelCandidateConnection",
  items:  Array<Candidate | null >,
  nextToken?: string | null,
};

export type ModelQuestionFilterInput = {
  id?: ModelIDInput | null,
  jobId?: ModelIDInput | null,
  stage?: ModelIntInput | null,
  questionText?: ModelStringInput | null,
  questionType?: ModelQuestionTypeInput | null,
  options?: ModelStringInput | null,
  correctAnswer?: ModelStringInput | null,
  timeLimit?: ModelIntInput | null,
  order?: ModelIntInput | null,
  isActive?: ModelBooleanInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelQuestionFilterInput | null > | null,
  or?: Array< ModelQuestionFilterInput | null > | null,
  not?: ModelQuestionFilterInput | null,
};

export type ModelTestResponseFilterInput = {
  id?: ModelIDInput | null,
  applicationId?: ModelIDInput | null,
  questionId?: ModelIDInput | null,
  response?: ModelStringInput | null,
  videoUrl?: ModelStringInput | null,
  isCorrect?: ModelBooleanInput | null,
  submittedAt?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelTestResponseFilterInput | null > | null,
  or?: Array< ModelTestResponseFilterInput | null > | null,
  not?: ModelTestResponseFilterInput | null,
};

export type ModelSubscriptionCompanyFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  name?: ModelSubscriptionStringInput | null,
  email?: ModelSubscriptionStringInput | null,
  phone?: ModelSubscriptionStringInput | null,
  address?: ModelSubscriptionStringInput | null,
  website?: ModelSubscriptionStringInput | null,
  logo?: ModelSubscriptionStringInput | null,
  description?: ModelSubscriptionStringInput | null,
  isActive?: ModelSubscriptionBooleanInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionCompanyFilterInput | null > | null,
  or?: Array< ModelSubscriptionCompanyFilterInput | null > | null,
};

export type ModelSubscriptionIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
};

export type ModelSubscriptionCompanyAdminFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  cognitoId?: ModelSubscriptionStringInput | null,
  email?: ModelSubscriptionStringInput | null,
  firstName?: ModelSubscriptionStringInput | null,
  lastName?: ModelSubscriptionStringInput | null,
  phone?: ModelSubscriptionStringInput | null,
  isActive?: ModelSubscriptionBooleanInput | null,
  companyId?: ModelSubscriptionIDInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionCompanyAdminFilterInput | null > | null,
  or?: Array< ModelSubscriptionCompanyAdminFilterInput | null > | null,
};

export type ModelSubscriptionSuperAdminFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  cognitoId?: ModelSubscriptionStringInput | null,
  email?: ModelSubscriptionStringInput | null,
  firstName?: ModelSubscriptionStringInput | null,
  lastName?: ModelSubscriptionStringInput | null,
  phone?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionSuperAdminFilterInput | null > | null,
  or?: Array< ModelSubscriptionSuperAdminFilterInput | null > | null,
};

export type ModelSubscriptionJobFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  title?: ModelSubscriptionStringInput | null,
  description?: ModelSubscriptionStringInput | null,
  requirements?: ModelSubscriptionStringInput | null,
  location?: ModelSubscriptionStringInput | null,
  jobType?: ModelSubscriptionStringInput | null,
  salaryRange?: ModelSubscriptionStringInput | null,
  isActive?: ModelSubscriptionBooleanInput | null,
  companyId?: ModelSubscriptionIDInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionJobFilterInput | null > | null,
  or?: Array< ModelSubscriptionJobFilterInput | null > | null,
};

export type ModelSubscriptionApplicationFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  candidateId?: ModelSubscriptionIDInput | null,
  jobId?: ModelSubscriptionIDInput | null,
  status?: ModelSubscriptionStringInput | null,
  currentStage?: ModelSubscriptionIntInput | null,
  appliedAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  coverLetter?: ModelSubscriptionStringInput | null,
  resumeUrl?: ModelSubscriptionStringInput | null,
  writtenTestScore?: ModelSubscriptionFloatInput | null,
  writtenTestSubmittedAt?: ModelSubscriptionStringInput | null,
  videoTestUrl?: ModelSubscriptionStringInput | null,
  videoTestSubmittedAt?: ModelSubscriptionStringInput | null,
  interviewLink?: ModelSubscriptionStringInput | null,
  interviewScheduledAt?: ModelSubscriptionStringInput | null,
  finalDecision?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionApplicationFilterInput | null > | null,
  or?: Array< ModelSubscriptionApplicationFilterInput | null > | null,
};

export type ModelSubscriptionIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  in?: Array< number | null > | null,
  notIn?: Array< number | null > | null,
};

export type ModelSubscriptionFloatInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  in?: Array< number | null > | null,
  notIn?: Array< number | null > | null,
};

export type ModelSubscriptionCandidateFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  cognitoId?: ModelSubscriptionStringInput | null,
  email?: ModelSubscriptionStringInput | null,
  firstName?: ModelSubscriptionStringInput | null,
  lastName?: ModelSubscriptionStringInput | null,
  phone?: ModelSubscriptionStringInput | null,
  address?: ModelSubscriptionStringInput | null,
  linkedin?: ModelSubscriptionStringInput | null,
  portfolio?: ModelSubscriptionStringInput | null,
  bio?: ModelSubscriptionStringInput | null,
  skills?: ModelSubscriptionStringInput | null,
  experience?: ModelSubscriptionStringInput | null,
  education?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionCandidateFilterInput | null > | null,
  or?: Array< ModelSubscriptionCandidateFilterInput | null > | null,
};

export type ModelSubscriptionQuestionFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  jobId?: ModelSubscriptionIDInput | null,
  stage?: ModelSubscriptionIntInput | null,
  questionText?: ModelSubscriptionStringInput | null,
  questionType?: ModelSubscriptionStringInput | null,
  options?: ModelSubscriptionStringInput | null,
  correctAnswer?: ModelSubscriptionStringInput | null,
  timeLimit?: ModelSubscriptionIntInput | null,
  order?: ModelSubscriptionIntInput | null,
  isActive?: ModelSubscriptionBooleanInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionQuestionFilterInput | null > | null,
  or?: Array< ModelSubscriptionQuestionFilterInput | null > | null,
};

export type ModelSubscriptionTestResponseFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  applicationId?: ModelSubscriptionIDInput | null,
  questionId?: ModelSubscriptionIDInput | null,
  response?: ModelSubscriptionStringInput | null,
  videoUrl?: ModelSubscriptionStringInput | null,
  isCorrect?: ModelSubscriptionBooleanInput | null,
  submittedAt?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionTestResponseFilterInput | null > | null,
  or?: Array< ModelSubscriptionTestResponseFilterInput | null > | null,
};

export type CreateCompanyMutationVariables = {
  input: CreateCompanyInput,
  condition?: ModelCompanyConditionInput | null,
};

export type CreateCompanyMutation = {
  createCompany?:  {
    __typename: "Company",
    id: string,
    name: string,
    email: string,
    phone?: string | null,
    address?: string | null,
    website?: string | null,
    logo?: string | null,
    description?: string | null,
    isActive: boolean,
    createdAt: string,
    updatedAt: string,
    admins?:  {
      __typename: "ModelCompanyAdminConnection",
      nextToken?: string | null,
    } | null,
    jobs?:  {
      __typename: "ModelJobConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type UpdateCompanyMutationVariables = {
  input: UpdateCompanyInput,
  condition?: ModelCompanyConditionInput | null,
};

export type UpdateCompanyMutation = {
  updateCompany?:  {
    __typename: "Company",
    id: string,
    name: string,
    email: string,
    phone?: string | null,
    address?: string | null,
    website?: string | null,
    logo?: string | null,
    description?: string | null,
    isActive: boolean,
    createdAt: string,
    updatedAt: string,
    admins?:  {
      __typename: "ModelCompanyAdminConnection",
      nextToken?: string | null,
    } | null,
    jobs?:  {
      __typename: "ModelJobConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type DeleteCompanyMutationVariables = {
  input: DeleteCompanyInput,
  condition?: ModelCompanyConditionInput | null,
};

export type DeleteCompanyMutation = {
  deleteCompany?:  {
    __typename: "Company",
    id: string,
    name: string,
    email: string,
    phone?: string | null,
    address?: string | null,
    website?: string | null,
    logo?: string | null,
    description?: string | null,
    isActive: boolean,
    createdAt: string,
    updatedAt: string,
    admins?:  {
      __typename: "ModelCompanyAdminConnection",
      nextToken?: string | null,
    } | null,
    jobs?:  {
      __typename: "ModelJobConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type CreateCompanyAdminMutationVariables = {
  input: CreateCompanyAdminInput,
  condition?: ModelCompanyAdminConditionInput | null,
};

export type CreateCompanyAdminMutation = {
  createCompanyAdmin?:  {
    __typename: "CompanyAdmin",
    id: string,
    cognitoId: string,
    email: string,
    firstName: string,
    lastName: string,
    phone?: string | null,
    isActive: boolean,
    companyId: string,
    company?:  {
      __typename: "Company",
      id: string,
      name: string,
      email: string,
      phone?: string | null,
      address?: string | null,
      website?: string | null,
      logo?: string | null,
      description?: string | null,
      isActive: boolean,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateCompanyAdminMutationVariables = {
  input: UpdateCompanyAdminInput,
  condition?: ModelCompanyAdminConditionInput | null,
};

export type UpdateCompanyAdminMutation = {
  updateCompanyAdmin?:  {
    __typename: "CompanyAdmin",
    id: string,
    cognitoId: string,
    email: string,
    firstName: string,
    lastName: string,
    phone?: string | null,
    isActive: boolean,
    companyId: string,
    company?:  {
      __typename: "Company",
      id: string,
      name: string,
      email: string,
      phone?: string | null,
      address?: string | null,
      website?: string | null,
      logo?: string | null,
      description?: string | null,
      isActive: boolean,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteCompanyAdminMutationVariables = {
  input: DeleteCompanyAdminInput,
  condition?: ModelCompanyAdminConditionInput | null,
};

export type DeleteCompanyAdminMutation = {
  deleteCompanyAdmin?:  {
    __typename: "CompanyAdmin",
    id: string,
    cognitoId: string,
    email: string,
    firstName: string,
    lastName: string,
    phone?: string | null,
    isActive: boolean,
    companyId: string,
    company?:  {
      __typename: "Company",
      id: string,
      name: string,
      email: string,
      phone?: string | null,
      address?: string | null,
      website?: string | null,
      logo?: string | null,
      description?: string | null,
      isActive: boolean,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateSuperAdminMutationVariables = {
  input: CreateSuperAdminInput,
  condition?: ModelSuperAdminConditionInput | null,
};

export type CreateSuperAdminMutation = {
  createSuperAdmin?:  {
    __typename: "SuperAdmin",
    id: string,
    cognitoId: string,
    email: string,
    firstName: string,
    lastName: string,
    phone?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateSuperAdminMutationVariables = {
  input: UpdateSuperAdminInput,
  condition?: ModelSuperAdminConditionInput | null,
};

export type UpdateSuperAdminMutation = {
  updateSuperAdmin?:  {
    __typename: "SuperAdmin",
    id: string,
    cognitoId: string,
    email: string,
    firstName: string,
    lastName: string,
    phone?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteSuperAdminMutationVariables = {
  input: DeleteSuperAdminInput,
  condition?: ModelSuperAdminConditionInput | null,
};

export type DeleteSuperAdminMutation = {
  deleteSuperAdmin?:  {
    __typename: "SuperAdmin",
    id: string,
    cognitoId: string,
    email: string,
    firstName: string,
    lastName: string,
    phone?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateJobMutationVariables = {
  input: CreateJobInput,
  condition?: ModelJobConditionInput | null,
};

export type CreateJobMutation = {
  createJob?:  {
    __typename: "Job",
    id: string,
    title: string,
    description: string,
    requirements?: string | null,
    location?: string | null,
    jobType?: string | null,
    salaryRange?: string | null,
    isActive: boolean,
    companyId: string,
    createdAt: string,
    updatedAt: string,
    company?:  {
      __typename: "Company",
      id: string,
      name: string,
      email: string,
      phone?: string | null,
      address?: string | null,
      website?: string | null,
      logo?: string | null,
      description?: string | null,
      isActive: boolean,
      createdAt: string,
      updatedAt: string,
    } | null,
    applications?:  {
      __typename: "ModelApplicationConnection",
      nextToken?: string | null,
    } | null,
    questions?:  {
      __typename: "ModelQuestionConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type UpdateJobMutationVariables = {
  input: UpdateJobInput,
  condition?: ModelJobConditionInput | null,
};

export type UpdateJobMutation = {
  updateJob?:  {
    __typename: "Job",
    id: string,
    title: string,
    description: string,
    requirements?: string | null,
    location?: string | null,
    jobType?: string | null,
    salaryRange?: string | null,
    isActive: boolean,
    companyId: string,
    createdAt: string,
    updatedAt: string,
    company?:  {
      __typename: "Company",
      id: string,
      name: string,
      email: string,
      phone?: string | null,
      address?: string | null,
      website?: string | null,
      logo?: string | null,
      description?: string | null,
      isActive: boolean,
      createdAt: string,
      updatedAt: string,
    } | null,
    applications?:  {
      __typename: "ModelApplicationConnection",
      nextToken?: string | null,
    } | null,
    questions?:  {
      __typename: "ModelQuestionConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type DeleteJobMutationVariables = {
  input: DeleteJobInput,
  condition?: ModelJobConditionInput | null,
};

export type DeleteJobMutation = {
  deleteJob?:  {
    __typename: "Job",
    id: string,
    title: string,
    description: string,
    requirements?: string | null,
    location?: string | null,
    jobType?: string | null,
    salaryRange?: string | null,
    isActive: boolean,
    companyId: string,
    createdAt: string,
    updatedAt: string,
    company?:  {
      __typename: "Company",
      id: string,
      name: string,
      email: string,
      phone?: string | null,
      address?: string | null,
      website?: string | null,
      logo?: string | null,
      description?: string | null,
      isActive: boolean,
      createdAt: string,
      updatedAt: string,
    } | null,
    applications?:  {
      __typename: "ModelApplicationConnection",
      nextToken?: string | null,
    } | null,
    questions?:  {
      __typename: "ModelQuestionConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type CreateApplicationMutationVariables = {
  input: CreateApplicationInput,
  condition?: ModelApplicationConditionInput | null,
};

export type CreateApplicationMutation = {
  createApplication?:  {
    __typename: "Application",
    id: string,
    candidateId: string,
    jobId: string,
    status: ApplicationStatus,
    currentStage: number,
    appliedAt: string,
    updatedAt: string,
    coverLetter?: string | null,
    resumeUrl?: string | null,
    writtenTestScore?: number | null,
    writtenTestSubmittedAt?: string | null,
    videoTestUrl?: string | null,
    videoTestSubmittedAt?: string | null,
    interviewLink?: string | null,
    interviewScheduledAt?: string | null,
    finalDecision?: string | null,
    candidate?:  {
      __typename: "Candidate",
      id: string,
      cognitoId: string,
      email: string,
      firstName: string,
      lastName: string,
      phone?: string | null,
      address?: string | null,
      linkedin?: string | null,
      portfolio?: string | null,
      bio?: string | null,
      skills?: Array< string | null > | null,
      experience?: string | null,
      education?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    job?:  {
      __typename: "Job",
      id: string,
      title: string,
      description: string,
      requirements?: string | null,
      location?: string | null,
      jobType?: string | null,
      salaryRange?: string | null,
      isActive: boolean,
      companyId: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    testResponses?:  {
      __typename: "ModelTestResponseConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
  } | null,
};

export type UpdateApplicationMutationVariables = {
  input: UpdateApplicationInput,
  condition?: ModelApplicationConditionInput | null,
};

export type UpdateApplicationMutation = {
  updateApplication?:  {
    __typename: "Application",
    id: string,
    candidateId: string,
    jobId: string,
    status: ApplicationStatus,
    currentStage: number,
    appliedAt: string,
    updatedAt: string,
    coverLetter?: string | null,
    resumeUrl?: string | null,
    writtenTestScore?: number | null,
    writtenTestSubmittedAt?: string | null,
    videoTestUrl?: string | null,
    videoTestSubmittedAt?: string | null,
    interviewLink?: string | null,
    interviewScheduledAt?: string | null,
    finalDecision?: string | null,
    candidate?:  {
      __typename: "Candidate",
      id: string,
      cognitoId: string,
      email: string,
      firstName: string,
      lastName: string,
      phone?: string | null,
      address?: string | null,
      linkedin?: string | null,
      portfolio?: string | null,
      bio?: string | null,
      skills?: Array< string | null > | null,
      experience?: string | null,
      education?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    job?:  {
      __typename: "Job",
      id: string,
      title: string,
      description: string,
      requirements?: string | null,
      location?: string | null,
      jobType?: string | null,
      salaryRange?: string | null,
      isActive: boolean,
      companyId: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    testResponses?:  {
      __typename: "ModelTestResponseConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
  } | null,
};

export type DeleteApplicationMutationVariables = {
  input: DeleteApplicationInput,
  condition?: ModelApplicationConditionInput | null,
};

export type DeleteApplicationMutation = {
  deleteApplication?:  {
    __typename: "Application",
    id: string,
    candidateId: string,
    jobId: string,
    status: ApplicationStatus,
    currentStage: number,
    appliedAt: string,
    updatedAt: string,
    coverLetter?: string | null,
    resumeUrl?: string | null,
    writtenTestScore?: number | null,
    writtenTestSubmittedAt?: string | null,
    videoTestUrl?: string | null,
    videoTestSubmittedAt?: string | null,
    interviewLink?: string | null,
    interviewScheduledAt?: string | null,
    finalDecision?: string | null,
    candidate?:  {
      __typename: "Candidate",
      id: string,
      cognitoId: string,
      email: string,
      firstName: string,
      lastName: string,
      phone?: string | null,
      address?: string | null,
      linkedin?: string | null,
      portfolio?: string | null,
      bio?: string | null,
      skills?: Array< string | null > | null,
      experience?: string | null,
      education?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    job?:  {
      __typename: "Job",
      id: string,
      title: string,
      description: string,
      requirements?: string | null,
      location?: string | null,
      jobType?: string | null,
      salaryRange?: string | null,
      isActive: boolean,
      companyId: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    testResponses?:  {
      __typename: "ModelTestResponseConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
  } | null,
};

export type CreateCandidateMutationVariables = {
  input: CreateCandidateInput,
  condition?: ModelCandidateConditionInput | null,
};

export type CreateCandidateMutation = {
  createCandidate?:  {
    __typename: "Candidate",
    id: string,
    cognitoId: string,
    email: string,
    firstName: string,
    lastName: string,
    phone?: string | null,
    address?: string | null,
    linkedin?: string | null,
    portfolio?: string | null,
    bio?: string | null,
    skills?: Array< string | null > | null,
    experience?: string | null,
    education?: string | null,
    createdAt: string,
    applications?:  {
      __typename: "ModelApplicationConnection",
      nextToken?: string | null,
    } | null,
    updatedAt: string,
  } | null,
};

export type UpdateCandidateMutationVariables = {
  input: UpdateCandidateInput,
  condition?: ModelCandidateConditionInput | null,
};

export type UpdateCandidateMutation = {
  updateCandidate?:  {
    __typename: "Candidate",
    id: string,
    cognitoId: string,
    email: string,
    firstName: string,
    lastName: string,
    phone?: string | null,
    address?: string | null,
    linkedin?: string | null,
    portfolio?: string | null,
    bio?: string | null,
    skills?: Array< string | null > | null,
    experience?: string | null,
    education?: string | null,
    createdAt: string,
    applications?:  {
      __typename: "ModelApplicationConnection",
      nextToken?: string | null,
    } | null,
    updatedAt: string,
  } | null,
};

export type DeleteCandidateMutationVariables = {
  input: DeleteCandidateInput,
  condition?: ModelCandidateConditionInput | null,
};

export type DeleteCandidateMutation = {
  deleteCandidate?:  {
    __typename: "Candidate",
    id: string,
    cognitoId: string,
    email: string,
    firstName: string,
    lastName: string,
    phone?: string | null,
    address?: string | null,
    linkedin?: string | null,
    portfolio?: string | null,
    bio?: string | null,
    skills?: Array< string | null > | null,
    experience?: string | null,
    education?: string | null,
    createdAt: string,
    applications?:  {
      __typename: "ModelApplicationConnection",
      nextToken?: string | null,
    } | null,
    updatedAt: string,
  } | null,
};

export type CreateQuestionMutationVariables = {
  input: CreateQuestionInput,
  condition?: ModelQuestionConditionInput | null,
};

export type CreateQuestionMutation = {
  createQuestion?:  {
    __typename: "Question",
    id: string,
    jobId: string,
    stage: number,
    questionText: string,
    questionType: QuestionType,
    options?: Array< string | null > | null,
    correctAnswer?: string | null,
    timeLimit?: number | null,
    order: number,
    isActive: boolean,
    job?:  {
      __typename: "Job",
      id: string,
      title: string,
      description: string,
      requirements?: string | null,
      location?: string | null,
      jobType?: string | null,
      salaryRange?: string | null,
      isActive: boolean,
      companyId: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    responses?:  {
      __typename: "ModelTestResponseConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateQuestionMutationVariables = {
  input: UpdateQuestionInput,
  condition?: ModelQuestionConditionInput | null,
};

export type UpdateQuestionMutation = {
  updateQuestion?:  {
    __typename: "Question",
    id: string,
    jobId: string,
    stage: number,
    questionText: string,
    questionType: QuestionType,
    options?: Array< string | null > | null,
    correctAnswer?: string | null,
    timeLimit?: number | null,
    order: number,
    isActive: boolean,
    job?:  {
      __typename: "Job",
      id: string,
      title: string,
      description: string,
      requirements?: string | null,
      location?: string | null,
      jobType?: string | null,
      salaryRange?: string | null,
      isActive: boolean,
      companyId: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    responses?:  {
      __typename: "ModelTestResponseConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteQuestionMutationVariables = {
  input: DeleteQuestionInput,
  condition?: ModelQuestionConditionInput | null,
};

export type DeleteQuestionMutation = {
  deleteQuestion?:  {
    __typename: "Question",
    id: string,
    jobId: string,
    stage: number,
    questionText: string,
    questionType: QuestionType,
    options?: Array< string | null > | null,
    correctAnswer?: string | null,
    timeLimit?: number | null,
    order: number,
    isActive: boolean,
    job?:  {
      __typename: "Job",
      id: string,
      title: string,
      description: string,
      requirements?: string | null,
      location?: string | null,
      jobType?: string | null,
      salaryRange?: string | null,
      isActive: boolean,
      companyId: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    responses?:  {
      __typename: "ModelTestResponseConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateTestResponseMutationVariables = {
  input: CreateTestResponseInput,
  condition?: ModelTestResponseConditionInput | null,
};

export type CreateTestResponseMutation = {
  createTestResponse?:  {
    __typename: "TestResponse",
    id: string,
    applicationId: string,
    questionId: string,
    response?: string | null,
    videoUrl?: string | null,
    isCorrect?: boolean | null,
    submittedAt: string,
    application?:  {
      __typename: "Application",
      id: string,
      candidateId: string,
      jobId: string,
      status: ApplicationStatus,
      currentStage: number,
      appliedAt: string,
      updatedAt: string,
      coverLetter?: string | null,
      resumeUrl?: string | null,
      writtenTestScore?: number | null,
      writtenTestSubmittedAt?: string | null,
      videoTestUrl?: string | null,
      videoTestSubmittedAt?: string | null,
      interviewLink?: string | null,
      interviewScheduledAt?: string | null,
      finalDecision?: string | null,
      createdAt: string,
    } | null,
    question?:  {
      __typename: "Question",
      id: string,
      jobId: string,
      stage: number,
      questionText: string,
      questionType: QuestionType,
      options?: Array< string | null > | null,
      correctAnswer?: string | null,
      timeLimit?: number | null,
      order: number,
      isActive: boolean,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateTestResponseMutationVariables = {
  input: UpdateTestResponseInput,
  condition?: ModelTestResponseConditionInput | null,
};

export type UpdateTestResponseMutation = {
  updateTestResponse?:  {
    __typename: "TestResponse",
    id: string,
    applicationId: string,
    questionId: string,
    response?: string | null,
    videoUrl?: string | null,
    isCorrect?: boolean | null,
    submittedAt: string,
    application?:  {
      __typename: "Application",
      id: string,
      candidateId: string,
      jobId: string,
      status: ApplicationStatus,
      currentStage: number,
      appliedAt: string,
      updatedAt: string,
      coverLetter?: string | null,
      resumeUrl?: string | null,
      writtenTestScore?: number | null,
      writtenTestSubmittedAt?: string | null,
      videoTestUrl?: string | null,
      videoTestSubmittedAt?: string | null,
      interviewLink?: string | null,
      interviewScheduledAt?: string | null,
      finalDecision?: string | null,
      createdAt: string,
    } | null,
    question?:  {
      __typename: "Question",
      id: string,
      jobId: string,
      stage: number,
      questionText: string,
      questionType: QuestionType,
      options?: Array< string | null > | null,
      correctAnswer?: string | null,
      timeLimit?: number | null,
      order: number,
      isActive: boolean,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteTestResponseMutationVariables = {
  input: DeleteTestResponseInput,
  condition?: ModelTestResponseConditionInput | null,
};

export type DeleteTestResponseMutation = {
  deleteTestResponse?:  {
    __typename: "TestResponse",
    id: string,
    applicationId: string,
    questionId: string,
    response?: string | null,
    videoUrl?: string | null,
    isCorrect?: boolean | null,
    submittedAt: string,
    application?:  {
      __typename: "Application",
      id: string,
      candidateId: string,
      jobId: string,
      status: ApplicationStatus,
      currentStage: number,
      appliedAt: string,
      updatedAt: string,
      coverLetter?: string | null,
      resumeUrl?: string | null,
      writtenTestScore?: number | null,
      writtenTestSubmittedAt?: string | null,
      videoTestUrl?: string | null,
      videoTestSubmittedAt?: string | null,
      interviewLink?: string | null,
      interviewScheduledAt?: string | null,
      finalDecision?: string | null,
      createdAt: string,
    } | null,
    question?:  {
      __typename: "Question",
      id: string,
      jobId: string,
      stage: number,
      questionText: string,
      questionType: QuestionType,
      options?: Array< string | null > | null,
      correctAnswer?: string | null,
      timeLimit?: number | null,
      order: number,
      isActive: boolean,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetCompanyQueryVariables = {
  id: string,
};

export type GetCompanyQuery = {
  getCompany?:  {
    __typename: "Company",
    id: string,
    name: string,
    email: string,
    phone?: string | null,
    address?: string | null,
    website?: string | null,
    logo?: string | null,
    description?: string | null,
    isActive: boolean,
    createdAt: string,
    updatedAt: string,
    admins?:  {
      __typename: "ModelCompanyAdminConnection",
      nextToken?: string | null,
    } | null,
    jobs?:  {
      __typename: "ModelJobConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type ListCompaniesQueryVariables = {
  filter?: ModelCompanyFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListCompaniesQuery = {
  listCompanies?:  {
    __typename: "ModelCompanyConnection",
    items:  Array< {
      __typename: "Company",
      id: string,
      name: string,
      email: string,
      phone?: string | null,
      address?: string | null,
      website?: string | null,
      logo?: string | null,
      description?: string | null,
      isActive: boolean,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetCompanyAdminQueryVariables = {
  id: string,
};

export type GetCompanyAdminQuery = {
  getCompanyAdmin?:  {
    __typename: "CompanyAdmin",
    id: string,
    cognitoId: string,
    email: string,
    firstName: string,
    lastName: string,
    phone?: string | null,
    isActive: boolean,
    companyId: string,
    company?:  {
      __typename: "Company",
      id: string,
      name: string,
      email: string,
      phone?: string | null,
      address?: string | null,
      website?: string | null,
      logo?: string | null,
      description?: string | null,
      isActive: boolean,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListCompanyAdminsQueryVariables = {
  filter?: ModelCompanyAdminFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListCompanyAdminsQuery = {
  listCompanyAdmins?:  {
    __typename: "ModelCompanyAdminConnection",
    items:  Array< {
      __typename: "CompanyAdmin",
      id: string,
      cognitoId: string,
      email: string,
      firstName: string,
      lastName: string,
      phone?: string | null,
      isActive: boolean,
      companyId: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type CompanyAdminsByCognitoIdQueryVariables = {
  cognitoId: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelCompanyAdminFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type CompanyAdminsByCognitoIdQuery = {
  companyAdminsByCognitoId?:  {
    __typename: "ModelCompanyAdminConnection",
    items:  Array< {
      __typename: "CompanyAdmin",
      id: string,
      cognitoId: string,
      email: string,
      firstName: string,
      lastName: string,
      phone?: string | null,
      isActive: boolean,
      companyId: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type CompanyAdminsByCompanyIdQueryVariables = {
  companyId: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelCompanyAdminFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type CompanyAdminsByCompanyIdQuery = {
  companyAdminsByCompanyId?:  {
    __typename: "ModelCompanyAdminConnection",
    items:  Array< {
      __typename: "CompanyAdmin",
      id: string,
      cognitoId: string,
      email: string,
      firstName: string,
      lastName: string,
      phone?: string | null,
      isActive: boolean,
      companyId: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetSuperAdminQueryVariables = {
  id: string,
};

export type GetSuperAdminQuery = {
  getSuperAdmin?:  {
    __typename: "SuperAdmin",
    id: string,
    cognitoId: string,
    email: string,
    firstName: string,
    lastName: string,
    phone?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListSuperAdminsQueryVariables = {
  filter?: ModelSuperAdminFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListSuperAdminsQuery = {
  listSuperAdmins?:  {
    __typename: "ModelSuperAdminConnection",
    items:  Array< {
      __typename: "SuperAdmin",
      id: string,
      cognitoId: string,
      email: string,
      firstName: string,
      lastName: string,
      phone?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type SuperAdminsByCognitoIdQueryVariables = {
  cognitoId: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelSuperAdminFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type SuperAdminsByCognitoIdQuery = {
  superAdminsByCognitoId?:  {
    __typename: "ModelSuperAdminConnection",
    items:  Array< {
      __typename: "SuperAdmin",
      id: string,
      cognitoId: string,
      email: string,
      firstName: string,
      lastName: string,
      phone?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetJobQueryVariables = {
  id: string,
};

export type GetJobQuery = {
  getJob?:  {
    __typename: "Job",
    id: string,
    title: string,
    description: string,
    requirements?: string | null,
    location?: string | null,
    jobType?: string | null,
    salaryRange?: string | null,
    isActive: boolean,
    companyId: string,
    createdAt: string,
    updatedAt: string,
    company?:  {
      __typename: "Company",
      id: string,
      name: string,
      email: string,
      phone?: string | null,
      address?: string | null,
      website?: string | null,
      logo?: string | null,
      description?: string | null,
      isActive: boolean,
      createdAt: string,
      updatedAt: string,
    } | null,
    applications?:  {
      __typename: "ModelApplicationConnection",
      nextToken?: string | null,
    } | null,
    questions?:  {
      __typename: "ModelQuestionConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type ListJobsQueryVariables = {
  filter?: ModelJobFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListJobsQuery = {
  listJobs?:  {
    __typename: "ModelJobConnection",
    items:  Array< {
      __typename: "Job",
      id: string,
      title: string,
      description: string,
      requirements?: string | null,
      location?: string | null,
      jobType?: string | null,
      salaryRange?: string | null,
      isActive: boolean,
      companyId: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type JobsByCompanyIdQueryVariables = {
  companyId: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelJobFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type JobsByCompanyIdQuery = {
  jobsByCompanyId?:  {
    __typename: "ModelJobConnection",
    items:  Array< {
      __typename: "Job",
      id: string,
      title: string,
      description: string,
      requirements?: string | null,
      location?: string | null,
      jobType?: string | null,
      salaryRange?: string | null,
      isActive: boolean,
      companyId: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetApplicationQueryVariables = {
  id: string,
};

export type GetApplicationQuery = {
  getApplication?:  {
    __typename: "Application",
    id: string,
    candidateId: string,
    jobId: string,
    status: ApplicationStatus,
    currentStage: number,
    appliedAt: string,
    updatedAt: string,
    coverLetter?: string | null,
    resumeUrl?: string | null,
    writtenTestScore?: number | null,
    writtenTestSubmittedAt?: string | null,
    videoTestUrl?: string | null,
    videoTestSubmittedAt?: string | null,
    interviewLink?: string | null,
    interviewScheduledAt?: string | null,
    finalDecision?: string | null,
    candidate?:  {
      __typename: "Candidate",
      id: string,
      cognitoId: string,
      email: string,
      firstName: string,
      lastName: string,
      phone?: string | null,
      address?: string | null,
      linkedin?: string | null,
      portfolio?: string | null,
      bio?: string | null,
      skills?: Array< string | null > | null,
      experience?: string | null,
      education?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    job?:  {
      __typename: "Job",
      id: string,
      title: string,
      description: string,
      requirements?: string | null,
      location?: string | null,
      jobType?: string | null,
      salaryRange?: string | null,
      isActive: boolean,
      companyId: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    testResponses?:  {
      __typename: "ModelTestResponseConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
  } | null,
};

export type ListApplicationsQueryVariables = {
  filter?: ModelApplicationFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListApplicationsQuery = {
  listApplications?:  {
    __typename: "ModelApplicationConnection",
    items:  Array< {
      __typename: "Application",
      id: string,
      candidateId: string,
      jobId: string,
      status: ApplicationStatus,
      currentStage: number,
      appliedAt: string,
      updatedAt: string,
      coverLetter?: string | null,
      resumeUrl?: string | null,
      writtenTestScore?: number | null,
      writtenTestSubmittedAt?: string | null,
      videoTestUrl?: string | null,
      videoTestSubmittedAt?: string | null,
      interviewLink?: string | null,
      interviewScheduledAt?: string | null,
      finalDecision?: string | null,
      createdAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ApplicationsByCandidateIdQueryVariables = {
  candidateId: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelApplicationFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ApplicationsByCandidateIdQuery = {
  applicationsByCandidateId?:  {
    __typename: "ModelApplicationConnection",
    items:  Array< {
      __typename: "Application",
      id: string,
      candidateId: string,
      jobId: string,
      status: ApplicationStatus,
      currentStage: number,
      appliedAt: string,
      updatedAt: string,
      coverLetter?: string | null,
      resumeUrl?: string | null,
      writtenTestScore?: number | null,
      writtenTestSubmittedAt?: string | null,
      videoTestUrl?: string | null,
      videoTestSubmittedAt?: string | null,
      interviewLink?: string | null,
      interviewScheduledAt?: string | null,
      finalDecision?: string | null,
      createdAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ApplicationsByJobIdQueryVariables = {
  jobId: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelApplicationFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ApplicationsByJobIdQuery = {
  applicationsByJobId?:  {
    __typename: "ModelApplicationConnection",
    items:  Array< {
      __typename: "Application",
      id: string,
      candidateId: string,
      jobId: string,
      status: ApplicationStatus,
      currentStage: number,
      appliedAt: string,
      updatedAt: string,
      coverLetter?: string | null,
      resumeUrl?: string | null,
      writtenTestScore?: number | null,
      writtenTestSubmittedAt?: string | null,
      videoTestUrl?: string | null,
      videoTestSubmittedAt?: string | null,
      interviewLink?: string | null,
      interviewScheduledAt?: string | null,
      finalDecision?: string | null,
      createdAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetCandidateQueryVariables = {
  id: string,
};

export type GetCandidateQuery = {
  getCandidate?:  {
    __typename: "Candidate",
    id: string,
    cognitoId: string,
    email: string,
    firstName: string,
    lastName: string,
    phone?: string | null,
    address?: string | null,
    linkedin?: string | null,
    portfolio?: string | null,
    bio?: string | null,
    skills?: Array< string | null > | null,
    experience?: string | null,
    education?: string | null,
    createdAt: string,
    applications?:  {
      __typename: "ModelApplicationConnection",
      nextToken?: string | null,
    } | null,
    updatedAt: string,
  } | null,
};

export type ListCandidatesQueryVariables = {
  filter?: ModelCandidateFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListCandidatesQuery = {
  listCandidates?:  {
    __typename: "ModelCandidateConnection",
    items:  Array< {
      __typename: "Candidate",
      id: string,
      cognitoId: string,
      email: string,
      firstName: string,
      lastName: string,
      phone?: string | null,
      address?: string | null,
      linkedin?: string | null,
      portfolio?: string | null,
      bio?: string | null,
      skills?: Array< string | null > | null,
      experience?: string | null,
      education?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type CandidatesByCognitoIdQueryVariables = {
  cognitoId: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelCandidateFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type CandidatesByCognitoIdQuery = {
  candidatesByCognitoId?:  {
    __typename: "ModelCandidateConnection",
    items:  Array< {
      __typename: "Candidate",
      id: string,
      cognitoId: string,
      email: string,
      firstName: string,
      lastName: string,
      phone?: string | null,
      address?: string | null,
      linkedin?: string | null,
      portfolio?: string | null,
      bio?: string | null,
      skills?: Array< string | null > | null,
      experience?: string | null,
      education?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetQuestionQueryVariables = {
  id: string,
};

export type GetQuestionQuery = {
  getQuestion?:  {
    __typename: "Question",
    id: string,
    jobId: string,
    stage: number,
    questionText: string,
    questionType: QuestionType,
    options?: Array< string | null > | null,
    correctAnswer?: string | null,
    timeLimit?: number | null,
    order: number,
    isActive: boolean,
    job?:  {
      __typename: "Job",
      id: string,
      title: string,
      description: string,
      requirements?: string | null,
      location?: string | null,
      jobType?: string | null,
      salaryRange?: string | null,
      isActive: boolean,
      companyId: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    responses?:  {
      __typename: "ModelTestResponseConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListQuestionsQueryVariables = {
  filter?: ModelQuestionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListQuestionsQuery = {
  listQuestions?:  {
    __typename: "ModelQuestionConnection",
    items:  Array< {
      __typename: "Question",
      id: string,
      jobId: string,
      stage: number,
      questionText: string,
      questionType: QuestionType,
      options?: Array< string | null > | null,
      correctAnswer?: string | null,
      timeLimit?: number | null,
      order: number,
      isActive: boolean,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type QuestionsByJobIdQueryVariables = {
  jobId: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelQuestionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type QuestionsByJobIdQuery = {
  questionsByJobId?:  {
    __typename: "ModelQuestionConnection",
    items:  Array< {
      __typename: "Question",
      id: string,
      jobId: string,
      stage: number,
      questionText: string,
      questionType: QuestionType,
      options?: Array< string | null > | null,
      correctAnswer?: string | null,
      timeLimit?: number | null,
      order: number,
      isActive: boolean,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetTestResponseQueryVariables = {
  id: string,
};

export type GetTestResponseQuery = {
  getTestResponse?:  {
    __typename: "TestResponse",
    id: string,
    applicationId: string,
    questionId: string,
    response?: string | null,
    videoUrl?: string | null,
    isCorrect?: boolean | null,
    submittedAt: string,
    application?:  {
      __typename: "Application",
      id: string,
      candidateId: string,
      jobId: string,
      status: ApplicationStatus,
      currentStage: number,
      appliedAt: string,
      updatedAt: string,
      coverLetter?: string | null,
      resumeUrl?: string | null,
      writtenTestScore?: number | null,
      writtenTestSubmittedAt?: string | null,
      videoTestUrl?: string | null,
      videoTestSubmittedAt?: string | null,
      interviewLink?: string | null,
      interviewScheduledAt?: string | null,
      finalDecision?: string | null,
      createdAt: string,
    } | null,
    question?:  {
      __typename: "Question",
      id: string,
      jobId: string,
      stage: number,
      questionText: string,
      questionType: QuestionType,
      options?: Array< string | null > | null,
      correctAnswer?: string | null,
      timeLimit?: number | null,
      order: number,
      isActive: boolean,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListTestResponsesQueryVariables = {
  filter?: ModelTestResponseFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListTestResponsesQuery = {
  listTestResponses?:  {
    __typename: "ModelTestResponseConnection",
    items:  Array< {
      __typename: "TestResponse",
      id: string,
      applicationId: string,
      questionId: string,
      response?: string | null,
      videoUrl?: string | null,
      isCorrect?: boolean | null,
      submittedAt: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type TestResponsesByApplicationIdQueryVariables = {
  applicationId: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelTestResponseFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type TestResponsesByApplicationIdQuery = {
  testResponsesByApplicationId?:  {
    __typename: "ModelTestResponseConnection",
    items:  Array< {
      __typename: "TestResponse",
      id: string,
      applicationId: string,
      questionId: string,
      response?: string | null,
      videoUrl?: string | null,
      isCorrect?: boolean | null,
      submittedAt: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type TestResponsesByQuestionIdQueryVariables = {
  questionId: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelTestResponseFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type TestResponsesByQuestionIdQuery = {
  testResponsesByQuestionId?:  {
    __typename: "ModelTestResponseConnection",
    items:  Array< {
      __typename: "TestResponse",
      id: string,
      applicationId: string,
      questionId: string,
      response?: string | null,
      videoUrl?: string | null,
      isCorrect?: boolean | null,
      submittedAt: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateCompanySubscriptionVariables = {
  filter?: ModelSubscriptionCompanyFilterInput | null,
};

export type OnCreateCompanySubscription = {
  onCreateCompany?:  {
    __typename: "Company",
    id: string,
    name: string,
    email: string,
    phone?: string | null,
    address?: string | null,
    website?: string | null,
    logo?: string | null,
    description?: string | null,
    isActive: boolean,
    createdAt: string,
    updatedAt: string,
    admins?:  {
      __typename: "ModelCompanyAdminConnection",
      nextToken?: string | null,
    } | null,
    jobs?:  {
      __typename: "ModelJobConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type OnUpdateCompanySubscriptionVariables = {
  filter?: ModelSubscriptionCompanyFilterInput | null,
};

export type OnUpdateCompanySubscription = {
  onUpdateCompany?:  {
    __typename: "Company",
    id: string,
    name: string,
    email: string,
    phone?: string | null,
    address?: string | null,
    website?: string | null,
    logo?: string | null,
    description?: string | null,
    isActive: boolean,
    createdAt: string,
    updatedAt: string,
    admins?:  {
      __typename: "ModelCompanyAdminConnection",
      nextToken?: string | null,
    } | null,
    jobs?:  {
      __typename: "ModelJobConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type OnDeleteCompanySubscriptionVariables = {
  filter?: ModelSubscriptionCompanyFilterInput | null,
};

export type OnDeleteCompanySubscription = {
  onDeleteCompany?:  {
    __typename: "Company",
    id: string,
    name: string,
    email: string,
    phone?: string | null,
    address?: string | null,
    website?: string | null,
    logo?: string | null,
    description?: string | null,
    isActive: boolean,
    createdAt: string,
    updatedAt: string,
    admins?:  {
      __typename: "ModelCompanyAdminConnection",
      nextToken?: string | null,
    } | null,
    jobs?:  {
      __typename: "ModelJobConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type OnCreateCompanyAdminSubscriptionVariables = {
  filter?: ModelSubscriptionCompanyAdminFilterInput | null,
};

export type OnCreateCompanyAdminSubscription = {
  onCreateCompanyAdmin?:  {
    __typename: "CompanyAdmin",
    id: string,
    cognitoId: string,
    email: string,
    firstName: string,
    lastName: string,
    phone?: string | null,
    isActive: boolean,
    companyId: string,
    company?:  {
      __typename: "Company",
      id: string,
      name: string,
      email: string,
      phone?: string | null,
      address?: string | null,
      website?: string | null,
      logo?: string | null,
      description?: string | null,
      isActive: boolean,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateCompanyAdminSubscriptionVariables = {
  filter?: ModelSubscriptionCompanyAdminFilterInput | null,
};

export type OnUpdateCompanyAdminSubscription = {
  onUpdateCompanyAdmin?:  {
    __typename: "CompanyAdmin",
    id: string,
    cognitoId: string,
    email: string,
    firstName: string,
    lastName: string,
    phone?: string | null,
    isActive: boolean,
    companyId: string,
    company?:  {
      __typename: "Company",
      id: string,
      name: string,
      email: string,
      phone?: string | null,
      address?: string | null,
      website?: string | null,
      logo?: string | null,
      description?: string | null,
      isActive: boolean,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteCompanyAdminSubscriptionVariables = {
  filter?: ModelSubscriptionCompanyAdminFilterInput | null,
};

export type OnDeleteCompanyAdminSubscription = {
  onDeleteCompanyAdmin?:  {
    __typename: "CompanyAdmin",
    id: string,
    cognitoId: string,
    email: string,
    firstName: string,
    lastName: string,
    phone?: string | null,
    isActive: boolean,
    companyId: string,
    company?:  {
      __typename: "Company",
      id: string,
      name: string,
      email: string,
      phone?: string | null,
      address?: string | null,
      website?: string | null,
      logo?: string | null,
      description?: string | null,
      isActive: boolean,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateSuperAdminSubscriptionVariables = {
  filter?: ModelSubscriptionSuperAdminFilterInput | null,
};

export type OnCreateSuperAdminSubscription = {
  onCreateSuperAdmin?:  {
    __typename: "SuperAdmin",
    id: string,
    cognitoId: string,
    email: string,
    firstName: string,
    lastName: string,
    phone?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateSuperAdminSubscriptionVariables = {
  filter?: ModelSubscriptionSuperAdminFilterInput | null,
};

export type OnUpdateSuperAdminSubscription = {
  onUpdateSuperAdmin?:  {
    __typename: "SuperAdmin",
    id: string,
    cognitoId: string,
    email: string,
    firstName: string,
    lastName: string,
    phone?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteSuperAdminSubscriptionVariables = {
  filter?: ModelSubscriptionSuperAdminFilterInput | null,
};

export type OnDeleteSuperAdminSubscription = {
  onDeleteSuperAdmin?:  {
    __typename: "SuperAdmin",
    id: string,
    cognitoId: string,
    email: string,
    firstName: string,
    lastName: string,
    phone?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateJobSubscriptionVariables = {
  filter?: ModelSubscriptionJobFilterInput | null,
};

export type OnCreateJobSubscription = {
  onCreateJob?:  {
    __typename: "Job",
    id: string,
    title: string,
    description: string,
    requirements?: string | null,
    location?: string | null,
    jobType?: string | null,
    salaryRange?: string | null,
    isActive: boolean,
    companyId: string,
    createdAt: string,
    updatedAt: string,
    company?:  {
      __typename: "Company",
      id: string,
      name: string,
      email: string,
      phone?: string | null,
      address?: string | null,
      website?: string | null,
      logo?: string | null,
      description?: string | null,
      isActive: boolean,
      createdAt: string,
      updatedAt: string,
    } | null,
    applications?:  {
      __typename: "ModelApplicationConnection",
      nextToken?: string | null,
    } | null,
    questions?:  {
      __typename: "ModelQuestionConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type OnUpdateJobSubscriptionVariables = {
  filter?: ModelSubscriptionJobFilterInput | null,
};

export type OnUpdateJobSubscription = {
  onUpdateJob?:  {
    __typename: "Job",
    id: string,
    title: string,
    description: string,
    requirements?: string | null,
    location?: string | null,
    jobType?: string | null,
    salaryRange?: string | null,
    isActive: boolean,
    companyId: string,
    createdAt: string,
    updatedAt: string,
    company?:  {
      __typename: "Company",
      id: string,
      name: string,
      email: string,
      phone?: string | null,
      address?: string | null,
      website?: string | null,
      logo?: string | null,
      description?: string | null,
      isActive: boolean,
      createdAt: string,
      updatedAt: string,
    } | null,
    applications?:  {
      __typename: "ModelApplicationConnection",
      nextToken?: string | null,
    } | null,
    questions?:  {
      __typename: "ModelQuestionConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type OnDeleteJobSubscriptionVariables = {
  filter?: ModelSubscriptionJobFilterInput | null,
};

export type OnDeleteJobSubscription = {
  onDeleteJob?:  {
    __typename: "Job",
    id: string,
    title: string,
    description: string,
    requirements?: string | null,
    location?: string | null,
    jobType?: string | null,
    salaryRange?: string | null,
    isActive: boolean,
    companyId: string,
    createdAt: string,
    updatedAt: string,
    company?:  {
      __typename: "Company",
      id: string,
      name: string,
      email: string,
      phone?: string | null,
      address?: string | null,
      website?: string | null,
      logo?: string | null,
      description?: string | null,
      isActive: boolean,
      createdAt: string,
      updatedAt: string,
    } | null,
    applications?:  {
      __typename: "ModelApplicationConnection",
      nextToken?: string | null,
    } | null,
    questions?:  {
      __typename: "ModelQuestionConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type OnCreateApplicationSubscriptionVariables = {
  filter?: ModelSubscriptionApplicationFilterInput | null,
};

export type OnCreateApplicationSubscription = {
  onCreateApplication?:  {
    __typename: "Application",
    id: string,
    candidateId: string,
    jobId: string,
    status: ApplicationStatus,
    currentStage: number,
    appliedAt: string,
    updatedAt: string,
    coverLetter?: string | null,
    resumeUrl?: string | null,
    writtenTestScore?: number | null,
    writtenTestSubmittedAt?: string | null,
    videoTestUrl?: string | null,
    videoTestSubmittedAt?: string | null,
    interviewLink?: string | null,
    interviewScheduledAt?: string | null,
    finalDecision?: string | null,
    candidate?:  {
      __typename: "Candidate",
      id: string,
      cognitoId: string,
      email: string,
      firstName: string,
      lastName: string,
      phone?: string | null,
      address?: string | null,
      linkedin?: string | null,
      portfolio?: string | null,
      bio?: string | null,
      skills?: Array< string | null > | null,
      experience?: string | null,
      education?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    job?:  {
      __typename: "Job",
      id: string,
      title: string,
      description: string,
      requirements?: string | null,
      location?: string | null,
      jobType?: string | null,
      salaryRange?: string | null,
      isActive: boolean,
      companyId: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    testResponses?:  {
      __typename: "ModelTestResponseConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
  } | null,
};

export type OnUpdateApplicationSubscriptionVariables = {
  filter?: ModelSubscriptionApplicationFilterInput | null,
};

export type OnUpdateApplicationSubscription = {
  onUpdateApplication?:  {
    __typename: "Application",
    id: string,
    candidateId: string,
    jobId: string,
    status: ApplicationStatus,
    currentStage: number,
    appliedAt: string,
    updatedAt: string,
    coverLetter?: string | null,
    resumeUrl?: string | null,
    writtenTestScore?: number | null,
    writtenTestSubmittedAt?: string | null,
    videoTestUrl?: string | null,
    videoTestSubmittedAt?: string | null,
    interviewLink?: string | null,
    interviewScheduledAt?: string | null,
    finalDecision?: string | null,
    candidate?:  {
      __typename: "Candidate",
      id: string,
      cognitoId: string,
      email: string,
      firstName: string,
      lastName: string,
      phone?: string | null,
      address?: string | null,
      linkedin?: string | null,
      portfolio?: string | null,
      bio?: string | null,
      skills?: Array< string | null > | null,
      experience?: string | null,
      education?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    job?:  {
      __typename: "Job",
      id: string,
      title: string,
      description: string,
      requirements?: string | null,
      location?: string | null,
      jobType?: string | null,
      salaryRange?: string | null,
      isActive: boolean,
      companyId: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    testResponses?:  {
      __typename: "ModelTestResponseConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
  } | null,
};

export type OnDeleteApplicationSubscriptionVariables = {
  filter?: ModelSubscriptionApplicationFilterInput | null,
};

export type OnDeleteApplicationSubscription = {
  onDeleteApplication?:  {
    __typename: "Application",
    id: string,
    candidateId: string,
    jobId: string,
    status: ApplicationStatus,
    currentStage: number,
    appliedAt: string,
    updatedAt: string,
    coverLetter?: string | null,
    resumeUrl?: string | null,
    writtenTestScore?: number | null,
    writtenTestSubmittedAt?: string | null,
    videoTestUrl?: string | null,
    videoTestSubmittedAt?: string | null,
    interviewLink?: string | null,
    interviewScheduledAt?: string | null,
    finalDecision?: string | null,
    candidate?:  {
      __typename: "Candidate",
      id: string,
      cognitoId: string,
      email: string,
      firstName: string,
      lastName: string,
      phone?: string | null,
      address?: string | null,
      linkedin?: string | null,
      portfolio?: string | null,
      bio?: string | null,
      skills?: Array< string | null > | null,
      experience?: string | null,
      education?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    job?:  {
      __typename: "Job",
      id: string,
      title: string,
      description: string,
      requirements?: string | null,
      location?: string | null,
      jobType?: string | null,
      salaryRange?: string | null,
      isActive: boolean,
      companyId: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    testResponses?:  {
      __typename: "ModelTestResponseConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
  } | null,
};

export type OnCreateCandidateSubscriptionVariables = {
  filter?: ModelSubscriptionCandidateFilterInput | null,
};

export type OnCreateCandidateSubscription = {
  onCreateCandidate?:  {
    __typename: "Candidate",
    id: string,
    cognitoId: string,
    email: string,
    firstName: string,
    lastName: string,
    phone?: string | null,
    address?: string | null,
    linkedin?: string | null,
    portfolio?: string | null,
    bio?: string | null,
    skills?: Array< string | null > | null,
    experience?: string | null,
    education?: string | null,
    createdAt: string,
    applications?:  {
      __typename: "ModelApplicationConnection",
      nextToken?: string | null,
    } | null,
    updatedAt: string,
  } | null,
};

export type OnUpdateCandidateSubscriptionVariables = {
  filter?: ModelSubscriptionCandidateFilterInput | null,
};

export type OnUpdateCandidateSubscription = {
  onUpdateCandidate?:  {
    __typename: "Candidate",
    id: string,
    cognitoId: string,
    email: string,
    firstName: string,
    lastName: string,
    phone?: string | null,
    address?: string | null,
    linkedin?: string | null,
    portfolio?: string | null,
    bio?: string | null,
    skills?: Array< string | null > | null,
    experience?: string | null,
    education?: string | null,
    createdAt: string,
    applications?:  {
      __typename: "ModelApplicationConnection",
      nextToken?: string | null,
    } | null,
    updatedAt: string,
  } | null,
};

export type OnDeleteCandidateSubscriptionVariables = {
  filter?: ModelSubscriptionCandidateFilterInput | null,
};

export type OnDeleteCandidateSubscription = {
  onDeleteCandidate?:  {
    __typename: "Candidate",
    id: string,
    cognitoId: string,
    email: string,
    firstName: string,
    lastName: string,
    phone?: string | null,
    address?: string | null,
    linkedin?: string | null,
    portfolio?: string | null,
    bio?: string | null,
    skills?: Array< string | null > | null,
    experience?: string | null,
    education?: string | null,
    createdAt: string,
    applications?:  {
      __typename: "ModelApplicationConnection",
      nextToken?: string | null,
    } | null,
    updatedAt: string,
  } | null,
};

export type OnCreateQuestionSubscriptionVariables = {
  filter?: ModelSubscriptionQuestionFilterInput | null,
};

export type OnCreateQuestionSubscription = {
  onCreateQuestion?:  {
    __typename: "Question",
    id: string,
    jobId: string,
    stage: number,
    questionText: string,
    questionType: QuestionType,
    options?: Array< string | null > | null,
    correctAnswer?: string | null,
    timeLimit?: number | null,
    order: number,
    isActive: boolean,
    job?:  {
      __typename: "Job",
      id: string,
      title: string,
      description: string,
      requirements?: string | null,
      location?: string | null,
      jobType?: string | null,
      salaryRange?: string | null,
      isActive: boolean,
      companyId: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    responses?:  {
      __typename: "ModelTestResponseConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateQuestionSubscriptionVariables = {
  filter?: ModelSubscriptionQuestionFilterInput | null,
};

export type OnUpdateQuestionSubscription = {
  onUpdateQuestion?:  {
    __typename: "Question",
    id: string,
    jobId: string,
    stage: number,
    questionText: string,
    questionType: QuestionType,
    options?: Array< string | null > | null,
    correctAnswer?: string | null,
    timeLimit?: number | null,
    order: number,
    isActive: boolean,
    job?:  {
      __typename: "Job",
      id: string,
      title: string,
      description: string,
      requirements?: string | null,
      location?: string | null,
      jobType?: string | null,
      salaryRange?: string | null,
      isActive: boolean,
      companyId: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    responses?:  {
      __typename: "ModelTestResponseConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteQuestionSubscriptionVariables = {
  filter?: ModelSubscriptionQuestionFilterInput | null,
};

export type OnDeleteQuestionSubscription = {
  onDeleteQuestion?:  {
    __typename: "Question",
    id: string,
    jobId: string,
    stage: number,
    questionText: string,
    questionType: QuestionType,
    options?: Array< string | null > | null,
    correctAnswer?: string | null,
    timeLimit?: number | null,
    order: number,
    isActive: boolean,
    job?:  {
      __typename: "Job",
      id: string,
      title: string,
      description: string,
      requirements?: string | null,
      location?: string | null,
      jobType?: string | null,
      salaryRange?: string | null,
      isActive: boolean,
      companyId: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    responses?:  {
      __typename: "ModelTestResponseConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateTestResponseSubscriptionVariables = {
  filter?: ModelSubscriptionTestResponseFilterInput | null,
};

export type OnCreateTestResponseSubscription = {
  onCreateTestResponse?:  {
    __typename: "TestResponse",
    id: string,
    applicationId: string,
    questionId: string,
    response?: string | null,
    videoUrl?: string | null,
    isCorrect?: boolean | null,
    submittedAt: string,
    application?:  {
      __typename: "Application",
      id: string,
      candidateId: string,
      jobId: string,
      status: ApplicationStatus,
      currentStage: number,
      appliedAt: string,
      updatedAt: string,
      coverLetter?: string | null,
      resumeUrl?: string | null,
      writtenTestScore?: number | null,
      writtenTestSubmittedAt?: string | null,
      videoTestUrl?: string | null,
      videoTestSubmittedAt?: string | null,
      interviewLink?: string | null,
      interviewScheduledAt?: string | null,
      finalDecision?: string | null,
      createdAt: string,
    } | null,
    question?:  {
      __typename: "Question",
      id: string,
      jobId: string,
      stage: number,
      questionText: string,
      questionType: QuestionType,
      options?: Array< string | null > | null,
      correctAnswer?: string | null,
      timeLimit?: number | null,
      order: number,
      isActive: boolean,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateTestResponseSubscriptionVariables = {
  filter?: ModelSubscriptionTestResponseFilterInput | null,
};

export type OnUpdateTestResponseSubscription = {
  onUpdateTestResponse?:  {
    __typename: "TestResponse",
    id: string,
    applicationId: string,
    questionId: string,
    response?: string | null,
    videoUrl?: string | null,
    isCorrect?: boolean | null,
    submittedAt: string,
    application?:  {
      __typename: "Application",
      id: string,
      candidateId: string,
      jobId: string,
      status: ApplicationStatus,
      currentStage: number,
      appliedAt: string,
      updatedAt: string,
      coverLetter?: string | null,
      resumeUrl?: string | null,
      writtenTestScore?: number | null,
      writtenTestSubmittedAt?: string | null,
      videoTestUrl?: string | null,
      videoTestSubmittedAt?: string | null,
      interviewLink?: string | null,
      interviewScheduledAt?: string | null,
      finalDecision?: string | null,
      createdAt: string,
    } | null,
    question?:  {
      __typename: "Question",
      id: string,
      jobId: string,
      stage: number,
      questionText: string,
      questionType: QuestionType,
      options?: Array< string | null > | null,
      correctAnswer?: string | null,
      timeLimit?: number | null,
      order: number,
      isActive: boolean,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteTestResponseSubscriptionVariables = {
  filter?: ModelSubscriptionTestResponseFilterInput | null,
};

export type OnDeleteTestResponseSubscription = {
  onDeleteTestResponse?:  {
    __typename: "TestResponse",
    id: string,
    applicationId: string,
    questionId: string,
    response?: string | null,
    videoUrl?: string | null,
    isCorrect?: boolean | null,
    submittedAt: string,
    application?:  {
      __typename: "Application",
      id: string,
      candidateId: string,
      jobId: string,
      status: ApplicationStatus,
      currentStage: number,
      appliedAt: string,
      updatedAt: string,
      coverLetter?: string | null,
      resumeUrl?: string | null,
      writtenTestScore?: number | null,
      writtenTestSubmittedAt?: string | null,
      videoTestUrl?: string | null,
      videoTestSubmittedAt?: string | null,
      interviewLink?: string | null,
      interviewScheduledAt?: string | null,
      finalDecision?: string | null,
      createdAt: string,
    } | null,
    question?:  {
      __typename: "Question",
      id: string,
      jobId: string,
      stage: number,
      questionText: string,
      questionType: QuestionType,
      options?: Array< string | null > | null,
      correctAnswer?: string | null,
      timeLimit?: number | null,
      order: number,
      isActive: boolean,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};
