import * as dbUtil from '../../util/databaseUtil';
import { ERRORS } from '../../constant';

export const getUserById = async (userId) => {
  const sql = 'SELECT username, name,avatar, createdAt, numberFollower,numberFollowing FROM users WHERE id = ?';
  const user = await dbUtil.queryOne(sql, [userId]);
  return user;
};

export const follow = async (id, userId) => {
  if (id === userId) {
    return Promise.reject(ERRORS.UNAUTHORIZED_ERROR);
  }
  const transaction = await dbUtil.beginTransaction();
  try {
    const follow = { followerId: id, followingId: userId };
    const insertFollowSql = 'INSERT IGNORE INTO follow SET ?';
    const insertResult = await dbUtil.execute(insertFollowSql, follow, transaction);
    if (insertResult.affectedRows > 0) {
      const increaseFollowerSql = 'UPDATE users SET numberFollower = numberFollower + 1 WHERE id = ?';
      const increaseFollowingSql = 'UPDATE users SET numberFollowing = numberFollowing + 1 WHERE id = ?';
      await Promise.all([
        dbUtil.execute(increaseFollowerSql, [id], transaction),
        dbUtil.execute(increaseFollowingSql, [userId], transaction),
      ]);
      await dbUtil.commitTransaction(transaction);
      return;
    }
    dbUtil.rollbackTransaction(transaction);
    return Promise.reject(ERRORS.NOTHING_CHANGED);
  } catch (e) {
    dbUtil.rollbackTransaction(transaction);
    return Promise.reject(ERRORS.USER_NOTFOUND_ERROR);
  }
};

export const unfollow = async (id, userId) => {
  if (id === userId) {
    return Promise.reject(ERRORS.UNAUTHORIZED_ERROR);
  }
  const transaction = await dbUtil.beginTransaction();
  try {
    const deleteFollowSql = 'DELETE FROM follow WHERE followingId = ? AND followerId = ?';
    const deleteResult = await dbUtil.execute(deleteFollowSql, [userId, id], transaction);
    if (deleteResult.affectedRows > 0) {
      const decreaseFollowerSql = 'UPDATE users SET numberFollower = numberFollower - 1 WHERE id = ? AND numberFollower > 0';
      const decreaseFollowingSql = 'UPDATE users SET numberFollowing = numberFollowing - 1 WHERE id = ? AND numberFollowing >0';
      await Promise.all([
        dbUtil.execute(decreaseFollowerSql, [id], transaction),
        dbUtil.execute(decreaseFollowingSql, [userId], transaction),
      ]);
      await dbUtil.commitTransaction(transaction);
      return;
    }
    dbUtil.rollbackTransaction(transaction);
    return Promise.reject(ERRORS.NOTHING_CHANGED);
  } catch (e) {
    dbUtil.rollbackTransaction(transaction);
    return Promise.reject(ERRORS.USER_NOTFOUND_ERROR);
  }
};
