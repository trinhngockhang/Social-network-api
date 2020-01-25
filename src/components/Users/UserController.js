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
