import { getAllBlogs } from "../../controllers/blogs.controller";

export const getAllBlogsGrpc = async (call: any, callback: any) => {
  try {
    const blogs = await getAllBlogs();
    callback(null, {blogs});
  } catch (err) {
    callback(err, null);
  }
};