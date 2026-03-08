import { getAllMentors } from "../../controllers/mentors.controller";

export const getAllMentorsGrpc = async (call: any, callback: any) => {
    try {
        const mentors = await getAllMentors();
        callback(null, {mentors});
    } catch (err) {
        callback(err, null);
    }
};