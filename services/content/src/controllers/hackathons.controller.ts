import { fetchAllHackathons } from "../services/hackathons.service";

export const getAllHackathons = async () => {
    const hackathons = await fetchAllHackathons();
    return hackathons;
};
