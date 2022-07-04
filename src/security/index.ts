// auth
import login from "./services/Auth/login.service";
import register from "./services/Auth/register.service";
import token from "./services/Auth/token.service";
import updateProfile from "./services/Auth/update-profile.service";
import handleVote from "./services/Post/handleVote.service";

// post
import createPost from "./services/Post/create-post.service";

export { login, register, token, updateProfile, createPost, handleVote };
