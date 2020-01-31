import * as dbUtil from '../../util/databaseUtil';
import { ERRORS } from '../../constant';
import uuidv4 from 'uuid/v4';

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

export const getUser = async (id, userId) => {
  const getUserSql = `
    SELECT u.id, u.username, u.name, u.avatar
    FROM users u
    WHERE u.id = ?
  `;
  const checkFollow = 'SELECT * FROM follow WHERE followerId = ? AND followingId = ?';
  const [dataUser, check] = await Promise.all([
    dbUtil.queryOne(getUserSql, [id]),
    dbUtil.execute(checkFollow, [id, userId]),
  ]);
  console.log({ check });
  if (check.length > 0) {
    dataUser.followed = true;
  } else {
    dataUser.followed = false;
  }
  return dataUser;
};

export const likePost = async (postId, userId) => {
  const postSql = `
    UPDATE posts SET likeNumber = likeNumber + 1
    WHERE id = ?
  `;
  const likePostSql = `
    INSERT INTO like_post(postId, userId)
    VALUES(?, ?)
  `;
  const transaction = await dbUtil.beginTransaction();
  try {
    await dbUtil.execute(postSql, [postId], transaction);
    await dbUtil.execute(likePostSql, [postId, userId], transaction);
    await dbUtil.commitTransaction(transaction);
  } catch (e) {
    await dbUtil.rollbackTransaction(transaction);
    return Promise.reject(ERRORS.NOTHING_CHANGED);
  }
};

export const comment = async (postId, userId, content) => {
  const sql = `
    INSERT INTO comments(id, userId, postId, content)
    VALUES (?,?,?,?)
  `;
  const id = uuidv4();
  await dbUtil.execute(sql, [id, userId, postId, content]);
};

export const unLikePost = async (postId, userId) => {
  const postSql = `
    UPDATE posts SET likeNumber = likeNumber - 1
    WHERE id = ?
  `;
  const unLikePostSql = `
    DELETE FROM like_post
    WHERE postId = ?
    AND userId = ?
  `;
  const transaction = await dbUtil.beginTransaction();
  try {
    const deleteResult = await dbUtil.execute(unLikePostSql, [postId, userId], transaction);
    if (deleteResult.affectedRows > 0) {
      await dbUtil.execute(postSql, [postId], transaction);
    }
    await dbUtil.commitTransaction(transaction);
  } catch (e) {
    await dbUtil.rollbackTransaction(transaction);
    return Promise.reject(ERRORS.NOTHING_CHANGED);
  }
};
