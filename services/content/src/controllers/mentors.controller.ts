import { fetchAllMentors } from "../services/mentors.service";

export const getAllMentors = async () => {

    const mentors = await fetchAllMentors();
    return mentors;

}