import * as dbAccess from './PostDAL';
import { getListUserFollowing } from '../Util';

export const createPost = async (req, res) => {
  const { title, content } = req.body;
  const { userId } = req;
  await dbAccess.createPost({ title, content, userId });
  res.ok();
};

export const getPost = async (req, res) => {
  const listUserFollow = await getListUserFollowing(req.userId);
  listUserFollow.push(req.userId);
  const posts = await dbAccess.getPost(req.pagination, listUserFollow, req.userId);
  res.send(posts);
};

export const getPostByUserId = async (req, res) => {
  const { id } = req.params;
  const { userId } = req;
  const posts = await dbAccess.getPostByUserId(id, userId, req.pagination);
  res.send(posts);
};
