import * as grpc from "@grpc/grpc-js";
const protoLoader = require("@grpc/proto-loader");
import path from "path";
import { getAllBlogsGrpc } from "../handlers/blogs/blogs.grpc.handler";
import { getAllIdeasGrpc } from "../handlers/ideas/ideas.grpc.handler";
import { getAllHackathonsGrpc } from "../handlers/hackathons/hackathons.grpc.handler";
import { getAllMentorsGrpc } from "../handlers/mentors/mentors.grpc.handler";
import { grpcLogger } from "../utils/grpcLogger";

const PROTO_PATH = path.join(__dirname, "../proto/content.proto");
const packageDef = protoLoader.loadSync(PROTO_PATH);
const grpcObj = grpc.loadPackageDefinition(packageDef) as any;

const server = new grpc.Server();

server.addService(grpcObj.content.ContentService.service, {
  GetAllBlogs: grpcLogger(getAllBlogsGrpc),
  GetAllIdeas: grpcLogger(getAllIdeasGrpc),
  GetAllHackathons: grpcLogger(getAllHackathonsGrpc),
  GetAllMentors: grpcLogger(getAllMentorsGrpc),
});

server.bindAsync(
  `0.0.0.0:${process.env.GRPC_PORT}`,
  grpc.ServerCredentials.createInsecure(),
  () => {
    console.log("Content gRPC Service running on port " + process.env.GRPC_PORT);
  }
);
