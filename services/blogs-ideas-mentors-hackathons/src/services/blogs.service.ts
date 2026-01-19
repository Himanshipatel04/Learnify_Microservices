

export const fetchAllBlogs = async () => {
    const blogs = [
        { id: 1, title: "First Blog", content: "This is the first blog post." },
        { id: 2, title: "Second Blog", content: "This is the second blog post." },
    ];
    return blogs;
}