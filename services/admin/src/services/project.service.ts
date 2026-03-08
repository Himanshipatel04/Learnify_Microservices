import { getAllProjectsAsync } from "../grpc/project.grpc.client";

export const fetchAllProjects = async () => {
  const response = await getAllProjectsAsync({});
  return response.projects;
};
