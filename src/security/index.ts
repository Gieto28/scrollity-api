// auth
import login from "./services/Auth/login.service";
import register from "./services/Auth/register.service";
import token from "./services/Auth/token.service";

// post
import getPost from "./services/Post/get-post.service";
import getAllPosts from "./services/Post/get-all-posts.service";
import handleVote from "./services/Post/handle-vote.service";
import createPost from "./services/Post/create-post.service";
import getUserVote from "./services/Post/get-user-vote.service";

// Profile
import getProfile from "./services/Profile/get-profile.service";
import getUserPosts from "./services/Profile/get-user-posts.service";
import updateProfile from "./services/Profile/update-profile.service";

//comment
import createComment from "./services/Comment/create-comment.service";
import getAllComments from "./services/Comment/get-all-comments.service";
import handleCommentVote from "./services/Comment/handle-comment-vote.service";
import getComment from "./services/Comment/get-comment.service";
import getUserCommentVote from "./services/Comment/get-user-comment-vote.service";

export {
  // Auth
  login,
  register,
  token,
  //Post
  createPost,
  handleVote,
  getPost,
  getAllPosts,
  getUserVote,
  // Profile
  getProfile,
  getUserPosts,
  updateProfile,
  //comment
  createComment,
  handleCommentVote,
  getComment,
  getAllComments,
  getUserCommentVote,
};
