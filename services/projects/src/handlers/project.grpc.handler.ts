import { getAllProjects } from "../controllers/project.controller";

export const getAllProjectsGrpc = async (call: any, callback: any) => {
    try {
        const result = await getAllProjects();
        callback(null, result);
    } catch (err: any) {
        callback(err, null);
    }
};
