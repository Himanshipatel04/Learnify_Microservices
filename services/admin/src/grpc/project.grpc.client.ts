import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import path from "path";
import { promisify } from "util";

const projectProtoPath = path.join(__dirname, "../proto/project.proto");
const packageDef = protoLoader.loadSync(projectProtoPath);
const grpcObj = grpc.loadPackageDefinition(packageDef) as any;

export const projectClient = new grpcObj.project.ProjectService(
  // `localhost:${process.env.PROJECT_GRPC_PORT}`,
  `projects:${process.env.PROJECT_GRPC_PORT}`,
  grpc.credentials.createInsecure(),
);

export const getAllProjectsAsync = promisify(
  projectClient.GetAllProjects.bind(projectClient),
);
