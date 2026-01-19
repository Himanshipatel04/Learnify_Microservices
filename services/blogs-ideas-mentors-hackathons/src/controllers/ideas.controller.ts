
import { fetchAllIdeas } from "../services/ideas.service";

export const getAllIdeas = async () => {
    const ideas = await fetchAllIdeas();
    return ideas;
};
