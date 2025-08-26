// File: src/services/userService.ts
import { generateClient } from 'aws-amplify/api';
import { listUsers, getUser } from '@/graphql/queries';
import { createUser, updateUser, deleteUser } from '@/graphql/mutations';
import { User, CreateUserInput, UpdateUserInput } from '@/API';
import { isMockMode, mockUserService } from '@/lib/mockServices';

const client = generateClient({
  authMode: 'userPool'
});

export const userService = {
  // Get user by ID
  async getUserById(id: string): Promise<User | null> {
    if (isMockMode()) {
      return mockUserService.getUserByEmail(`${id}@demo.com`) as any;
    }
    
    try {
      const result = await client.graphql({ 
        query: getUser,
        variables: { id }
      });
      return result.data.getUser as User;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  },

  // Get user by email
  async getUserByEmail(email: string): Promise<User | null> {
    if (isMockMode()) {
      return mockUserService.getUserByEmail(email) as any;
    }
    
    try {
      const result = await client.graphql({
        query: listUsers,
        variables: {
          filter: {
            email: { eq: email }
          }
        }
      });
      const users = result.data.listUsers.items;
      return users.length > 0 ? users[0] as User : null;
    } catch (error) {
      console.error('Error fetching user by email:', error);
      throw error;
    }
  },

  // Get user by Cognito sub
  async getUserBySub(sub: string): Promise<User | null> {
    if (isMockMode()) {
      return mockUserService.getUserBySub(sub) as any;
    }
    
    try {
      const result = await client.graphql({
        query: listUsers,
        variables: {
          filter: {
            sub: { eq: sub }
          }
        }
      });
      const users = result.data.listUsers.items;
      return users.length > 0 ? users[0] as User : null;
    } catch (error) {
      console.error('Error fetching user by sub:', error);
      throw error;
    }
  },

  // Create a new user
  async createUser(input: CreateUserInput): Promise<User> {
    if (isMockMode()) {
      return mockUserService.createUser(input) as any;
    }
    
    try {
      const result = await client.graphql({ 
        query: createUser,
        variables: { input }
      });
      return result.data.createUser as User;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  },

  // Update user profile
  async updateUser(input: UpdateUserInput): Promise<User> {
    try {
      const result = await client.graphql({ 
        query: updateUser,
        variables: { input }
      });
      return result.data.updateUser as User;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  },

  // Update user resume
  async updateUserResume(id: string, resumeKey: string): Promise<User> {
    return this.updateUser({ id, resume: resumeKey });
  },

  // Get all users (super admin only)
  async getAllUsers(): Promise<User[]> {
    try {
      const result = await client.graphql({ 
        query: listUsers 
      });
      return result.data.listUsers.items as User[];
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  },

  // Delete user (super admin only)
  async deleteUser(id: string): Promise<void> {
    try {
      await client.graphql({ 
        query: deleteUser,
        variables: { input: { id } }
      });
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  },

  // Toggle user active status
  async toggleUserStatus(id: string, isActive: boolean): Promise<User> {
    return this.updateUser({ id, isActive });
  }
};