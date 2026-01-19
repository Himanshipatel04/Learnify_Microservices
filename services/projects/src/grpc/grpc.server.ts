import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";
import path from "path";

import { grpcLogger } from "./../utils/grpcLogger";
import { getAllProjectsGrpc } from "../handlers/project.grpc.handler";

const PROTO_PATH = path.join(__dirname, "../proto/project.proto");

const packageDef = protoLoader.loadSync(PROTO_PATH);
const grpcObj = grpc.loadPackageDefinition(packageDef) as any;
const projectPackage = grpcObj.project;

const server = new grpc.Server();

server.addService(projectPackage.ProjectService.service, {
  GetAllProjects: grpcLogger(getAllProjectsGrpc),
});

const PORT = process.env.GRPC_PORT || 40001;

server.bindAsync(
  `0.0.0.0:${PORT}`,
  grpc.ServerCredentials.createInsecure(),
  (err, port) => {
    if (err) return console.error(err);
    console.log(`gRPC ProjectService running on port ${port}`);
  },
);
