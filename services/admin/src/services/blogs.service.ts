import { getAllBlogsAsync } from "../grpc/content.grpc.client";

export const fetchAllBlogs = async () => {
    const response = await getAllBlogsAsync({});
    return response.blogs;
};