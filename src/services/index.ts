// auth
import login from "./Auth/login.service";
import register from "./Auth/register.service";
import token from "./Auth/token.service";

// post
import getPost from "./Post/get-post.service";
import getAllPosts from "./Post/get-all-posts.service";
import handleVote from "./Post/handle-vote.service";
import createPost from "./Post/create-post.service";
import getUserVote from "./Post/get-user-vote.service";
import getPostByTitle from "./Post/get-post-by-title.service";

// Profile
import getProfile from "./Profile/get-profile.service";
import getUserPosts from "./Profile/get-user-posts.service";
import updateProfile from "./Profile/update-profile.service";
import updateProfileImage from "./Profile/update-profile-image.service";
//comment
import createComment from "./Comment/create-comment.service";
import getAllComments from "./Comment/get-all-comments.service";
import handleCommentVote from "./Comment/handle-comment-vote.service";
import getComment from "./Comment/get-comment.service";
import getUserCommentVote from "./Comment/get-user-comment-vote.service";
// notifications
import getUserNotifications from "./Notifications/get-user-notifications.service";
import updateNotification from "./Notifications/update-notification.service";

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
  getPostByTitle,
  // Profile
  getProfile,
  getUserPosts,
  updateProfile,
  updateProfileImage,
  //comment
  createComment,
  handleCommentVote,
  getComment,
  getAllComments,
  getUserCommentVote,
  // notifications,
  getUserNotifications,
  updateNotification,
};
