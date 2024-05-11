import config from "../configureEnvVars/config.js";
import { Client, Databases, Query, ID, Storage } from "appwrite";

export class postService {
  constructor() {
    this.client = new Client();

    this.client
      .setEndpoint(config.appwriteURL)
      .setProject(config.appwriteProjectID);

    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  // post services for the front end

  async createPost({ title, slug, content, featuredImage, status, userID }) {
    try {
      return await this.databases.createDocument(
        config.appwriteDatabaseID,
        config.appwriteCollectionID,
        slug,
        {
          title,
          content,
          status,
          featuredImage,
          userID,
        }
      );
    } catch (error) {
      throw error;
    }
  }

  async updatePost(slug, { title, content, featuredImage, status, userID }) {
    try {
      return await this.databases.updateDocument(
        config.appwriteDatabaseID,
        config.appwriteCollectionID,
        slug,
        { title, content, featuredImage, status, userID }
      );
    } catch (error) {
      throw error;
    }
  }

  async deletePost(slug) {
    try {
      return await this.databases.deleteDocument(
        config.appwriteDatabaseID,
        config.appwriteCollectionID,
        slug
      );
    } catch (error) {
      throw error;
    }
  }

  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        config.appwriteDatabaseID,
        config.appwriteCollectionID,
        slug
      );
    } catch (error) {
      throw error;
    }
  }

  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        config.appwriteDatabaseID,
        config.appwriteCollectionID,
        queries
      );
    } catch (error) {
      throw error;
    }
  }

  // file upload services on the backend

  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        config.appwriteBucketID,
        ID.unique(),
        file
      );
    } catch (error) {
      throw error;
    }
  }

  async deleteFile(fileID) {
    try {
      return await this.bucket.deleteFile(config.appwriteBucketID, fileID);
    } catch (error) {
      throw error;
    }
  }

  async filePreview(fileID) {
    try {
      return this.bucket.getFilePreview(config.appwriteBucketID, fileID);
    } catch (error) {
      throw error;
    }
  }
}

export const service = new postService();
export default service;
