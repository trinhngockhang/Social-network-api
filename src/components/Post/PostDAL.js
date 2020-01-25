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

export const getPost = async ({ limit, offset }, listUserFollow) => {
  const sql = `
    SELECT * FROM posts
    WHERE userId IN (?)
    ORDER BY createdAt DESC
    LIMIT ?
    OFFSET ?
  `;
  const posts = await dbUtil.query(sql, [listUserFollow, limit, offset]);
  return posts;
};
