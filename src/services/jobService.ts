// File: src/services/jobService.ts
import { generateClient } from 'aws-amplify/api';
import { listJobs, getJob } from '@/graphql/queries';
import { createJob, updateJob, deleteJob } from '@/graphql/mutations';
import { Job, CreateJobInput, UpdateJobInput, JobStatus } from '@/API';

const client = generateClient({
  authMode: 'userPool'
});

export const jobService = {
  // Get all active jobs for candidates
  async getActiveJobs(): Promise<Job[]> {
    try {
      const result = await client.graphql({ 
        query: listJobs,
        variables: {
          filter: {
            status: { eq: JobStatus.ACTIVE }
          }
        }
      });
      return result.data.listJobs.items as Job[];
    } catch (error) {
      console.error('Error fetching active jobs:', error);
      throw error;
    }
  },

  // Get jobs for a specific company
  async getJobsByCompany(companyId: string): Promise<Job[]> {
    try {
      const result = await client.graphql({ 
        query: listJobs,
        variables: {
          filter: {
            companyId: { eq: companyId }
          }
        }
      });
      return result.data.listJobs.items as Job[];
    } catch (error) {
      console.error('Error fetching company jobs:', error);
      throw error;
    }
  },

  // Get a single job
  async getJobById(id: string): Promise<Job | null> {
    try {
      const result = await client.graphql({ 
        query: getJob,
        variables: { id }
      });
      return result.data.getJob as Job;
    } catch (error) {
      console.error('Error fetching job:', error);
      throw error;
    }
  },

  // Create a new job (company admin only)
  async createJob(input: CreateJobInput): Promise<Job> {
    try {
      const result = await client.graphql({ 
        query: createJob,
        variables: { input }
      });
      return result.data.createJob as Job;
    } catch (error) {
      console.error('Error creating job:', error);
      throw error;
    }
  },

  // Update a job (company admin only)
  async updateJob(input: UpdateJobInput): Promise<Job> {
    try {
      const result = await client.graphql({ 
        query: updateJob,
        variables: { input }
      });
      return result.data.updateJob as Job;
    } catch (error) {
      console.error('Error updating job:', error);
      throw error;
    }
  },

  // Delete a job (company admin only)
  async deleteJob(id: string): Promise<void> {
    try {
      await client.graphql({ 
        query: deleteJob,
        variables: { input: { id } }
      });
    } catch (error) {
      console.error('Error deleting job:', error);
      throw error;
    }
  }
};