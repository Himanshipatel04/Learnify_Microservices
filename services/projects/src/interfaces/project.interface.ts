export interface Project {
  id: string;
  title: string;
  abstract: string;
  description: string;
  domain: string;
  collegeName: string;
  githubLink: string;
  liveLink: string;
  videoLink: string;
  image: string;
  likeCount: number;
  commentCount: number;
  postedByUserId: string;
  postedByName: string;
  postedByProfilePicture: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}
