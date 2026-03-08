import { getAllIdeasAsync } from "../grpc/content.grpc.client";

export const fetchAllIdeas = async () => {
    const response = await getAllIdeasAsync({});
    return response.ideas
};