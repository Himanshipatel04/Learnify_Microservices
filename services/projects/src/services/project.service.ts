import type { Project } from "../interfaces/project.interface";

// Dummy data
const projects: Project[] = [
  {
    id: "1",
    title: "AI Driven Chatbot",
    abstract: "AI chatbot",
    description: "A chatbot using GPT technology",
    domain: "AI",
    collegeName: "IES College",
    githubLink: "https://github.com/example",
    liveLink: "https://example.com",
    videoLink: "",
    image: "",
    likeCount: 10,
    commentCount: 2,
    postedByUserId: "user1",
    postedByName: "Himanshi",
    postedByProfilePicture: "",
    tags: ["AI", "Chatbot"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const fetchAllProjects = () => {
  return projects
};
