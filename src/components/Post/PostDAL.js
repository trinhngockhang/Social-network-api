import * as dbUtil from '../../util/databaseUtil';
import uuidv4 from 'uuid/v4';

export const createPost = async ({ content, title, userId }) => {
  const id = uuidv4();
  const sql = `
    INSERT INTO posts(id, content,title,userId)
    VALUES (?, ?, ?, ?)
  `;
  await dbUtil.execute(sql, [id, content, title, userId]);
};

export const getPost = async ({ limit, offset }, listUserFollow, userId) => {
  const sql = `
    SELECT p.*, u.id "author.id", u.username "author.username",
    u.name "author.name",u.avatar "author.avatar" FROM posts p, users u
    WHERE p.userId IN (?)
    AND p.userId = u.id
    ORDER BY createdAt DESC
    LIMIT ?
    OFFSET ?
  `;
  const posts = await dbUtil.query(sql, [listUserFollow, limit, offset]);
  const listPosts = posts.map((data) => dbUtil.nested(data));
  const listId = listPosts.map(data => data.id);
  if (userId) {
    const checkSql = `
      SELECT postId FROM like_post
      WHERE userId = ?
      AND postId IN (?)
    `;
    const listCheck = await dbUtil.query(checkSql, [userId, listId]);
    const listIdLiked = listCheck.map((doc) => doc.postId);
    const lastPosts = listPosts.map((doc) => {
      if (listIdLiked.includes(doc.id)) return { ...doc, liked: true };
      return { ...doc, liked: false };
    });
    return lastPosts;
  }
  return listPosts;
};

export const getPostByUserId = async (authorId, userId, { limit, offset }) => {
  const sql = `
    SELECT p.*, u.id "author.id", u.username "author.username",
    u.name "author.name",u.avatar "author.avatar" FROM posts p, users u
    WHERE p.userId = ?
    AND p.userId = u.id
    ORDER BY createdAt DESC
    LIMIT ?
    OFFSET ?
  `;
  const posts = await dbUtil.query(sql, [authorId, limit, offset]);
  const listPosts = posts.map((data) => dbUtil.nested(data));
  const listId = listPosts.map(data => data.id);
  if (userId) {
    const checkSql = `
      SELECT postId FROM like_post
      WHERE userId = ?
      AND postId IN (?)
    `;
    const listCheck = await dbUtil.query(checkSql, [userId, listId]);
    const listIdLiked = listCheck.map((doc) => doc.postId);
    const lastPosts = listPosts.map((doc) => {
      if (listIdLiked.includes(doc.id)) return { ...doc, liked: true };
      return { ...doc, liked: false };
    });
    return lastPosts;
  }
  return listPosts;
};
