import { getAllHackathons } from "../../controllers/hackathons.controller";

export const getAllHackathonsGrpc = async (call: any, callback: any) => {
  try {
    const hackathons = await getAllHackathons();
    callback(null, {hackathons});
  } catch (err) {
    callback(err, null);
  }
};