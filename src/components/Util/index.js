import * as dbUtil from '../../util/databaseUtil';

export const getListUserFollowing = async (userId) => {
  const sql = 'SELECT followerId FROM follow WHERE followingId = ?';
  const users = await dbUtil.query(sql, [userId]);
  console.log(users);
  return users.map(data => data.followerId);
};
