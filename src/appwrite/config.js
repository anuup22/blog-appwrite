import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service{
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteURL)
            .setProject(conf.appwriteProjectID)

        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    //create
    async createPost({title, slug, content, featuredImage, status, userId}) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionID,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }   
            )
        }
        catch(error) {
            console.log("Appwrite Service :: createPost :: error ", error);
            return false;
        }
    }

    //read
    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionID,
                slug,
            )
        }
        catch(error) {
            console.log("Appwrite Service :: getPost :: error ", error);
            return false;
        }
    }    

    //update
    async updatePost(slug, {title, content, featuredImage, status}) { 
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionID,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }   
            )
        }
        catch(error) {
            console.log("Appwrite Service :: updatePost :: error ", error);
            return false;
        }
    }

    //delete
    async deletePost(slug) { 
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionID,
                slug,
            )
            return true;
        }
        catch(error) {
            console.log("Appwrite Service :: deletePost :: error ", error);
            return false;
        }
    }

    //we need indexes in database for using queries
    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionID,
                queries,
            )
        }
        catch(error) {
            console.log("Appwrite Service :: getPosts :: error ", error);
            return false;
        }
    }

    //********* Upload Service *********/

    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketID,
                ID.unique(),
                file
            )
        }
        catch(error) {
            console.log("Appwrite Service :: uploadFile :: error ", error);
            return false;
        }
    }

    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketID,
                fileId
            )
            return true;
        }
        catch(error) {
            console.log("Appwrite Service :: deleteFile :: error ", error);
            return false;
        }
    }

    getFilePreview(fileId) {
        return this.bucket.getFilePreview(
            conf.appwriteBucketID,
            fileId
        )
    }
}

const service = new Service();
export default service;