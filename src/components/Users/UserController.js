import * as dbAccess from './UserDAL';

export const getMe = async (req, res) => {
  const { userId } = req;
  const user = await dbAccess.getUserById(userId);
  res.send(user);
};

export const follow = async (req, res) => {
  const { id } = req.params;
  const { userId } = req;
  await dbAccess.follow(id, userId);
  res.ok();
};

export const unfollow = async (req, res) => {
  const { id } = req.params;
  const { userId } = req;
  await dbAccess.unfollow(id, userId);
  res.ok();
};

export const getUser = async (req, res) => {
  const { id } = req.params;
  const { userId } = req;
  const user = await dbAccess.getUser(id, userId);
  res.send(user);
};

export const like = async (req, res) => {
  const { id } = req.params;
  const { userId } = req;
  await dbAccess.likePost(id, userId);
  res.ok();
};

export const unlike = async (req, res) => {
  const { id } = req.params;
  const { userId } = req;
  await dbAccess.unLikePost(id, userId);
  res.ok();
};

export const comment = async (req, res) => {
  const { id } = req.params;
  const { userId } = req;
  const { content } = req.body;
  await dbAccess.comment(id, userId, content);
  res.ok();
};
