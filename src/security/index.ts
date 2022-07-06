// auth
import login from "./services/Auth/login.service";
import register from "./services/Auth/register.service";
import token from "./services/Auth/token.service";
import updateProfile from "./services/Auth/update-profile.service";

// post
import getPost from "./services/Post/get-post.service";
import getAllPosts from "./services/Post/get-all-posts.service";
import handleVote from "./services/Post/handle-vote.service";
import createPost from "./services/Post/create-post.service";
import getUserVote from "./services/Post/get-user-vote.service";

// Profile
import getProfile from "./services/Profile/get-profile.service";

export {
  // Auth
  login,
  register,
  token,
  updateProfile,
  //Post
  createPost,
  handleVote,
  getPost,
  getAllPosts,
  getUserVote,
  // Profile
  getProfile,
};
