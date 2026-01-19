import { getAllHackathonsAsync } from "../grpc/content.grpc.client";

export const fetchAllHackathons = async () => {
    const response = await getAllHackathonsAsync({});
    return response.hackathons;
};