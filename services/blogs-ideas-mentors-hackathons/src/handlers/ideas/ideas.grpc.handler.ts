import { getAllIdeas } from "../../controllers/ideas.controller";

export const getAllIdeasGrpc = async (call: any, callback: any) => {
    try {
        const ideas = await getAllIdeas();
        callback(null, { ideas });
    } catch (err) {
        callback(err, null);
    }
};