// grpcLogger.ts
export const grpcLogger = (handler: Function) => {
  return async (call: any, callback: Function) => {
    const method = call.call.handler.path; // e.g. "/project.ProjectService/GetAllProjects"
    const start = Date.now();

    console.log(`[gRPC REQ] ${method}`);

    try {
      await handler(call, (error: any, response: any) => {
        const duration = Date.now() - start;

        let status = error ? "ERROR" : "OK";
        const color = error
          ? "\x1b[31m"
          : "\x1b[32m";

        console.log(
          `[gRPC RES] ${method} ${color}[${status}]\x1b[0m - ${duration}ms`
        );

        callback(error, response);
      });
    } catch (err: any) {
      const duration = Date.now() - start;

      console.log(
        `[gRPC RES] ${method} \x1b[31m[ERROR]\x1b[0m - ${duration}ms`
      );

      callback(err);
    }
  };
};
