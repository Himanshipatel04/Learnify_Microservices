import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import path from "path";
import { promisify } from "util";

const contentProtoPath = path.join(__dirname, "../proto/content.proto");

const packageDef = protoLoader.loadSync(contentProtoPath);
const grpcObj = grpc.loadPackageDefinition(packageDef) as any;

export const contentClient = new grpcObj.content.ContentService(
    // `localhost:${process.env.CONTENT_GRPC_PORT}`,
    `content:${process.env.CONTENT_GRPC_PORT}`,
    grpc.credentials.createInsecure(),
);

export const getAllBlogsAsync = promisify(
    contentClient.GetAllBlogs.bind(contentClient),
);

export const getAllIdeasAsync = promisify(
    contentClient.GetAllIdeas.bind(contentClient),
);

export const getAllHackathonsAsync = promisify(
    contentClient.GetAllHackathons.bind(contentClient),
);

export const getAllMentorsAsync = promisify(
    contentClient.GetAllMentors.bind(contentClient),
);
