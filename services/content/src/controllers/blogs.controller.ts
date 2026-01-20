import { fetchAllBlogs } from "../services/blogs.service";

export const getAllBlogs = async () => {
  const blogs = await fetchAllBlogs();
  return blogs;
};
