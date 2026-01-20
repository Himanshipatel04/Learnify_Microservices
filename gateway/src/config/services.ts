interface Service {
  admin: string;
  user: string;
  project: string;
  content: string;
}

const PORT = "3000";
const HOST = `http://localhost:${PORT}/admin`;

export const services: Service = {
  admin: process.env.ADMIN_SERVICE || HOST, 
  user: process.env.USER_SERVICE || HOST,
  project: process.env.PROJECT_SERVICE || HOST,
  content: process.env.CONTENT_SERVICE || HOST,
};
