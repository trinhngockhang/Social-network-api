/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MariaDB
 Source Server Version : 100313
 Source Host           : localhost:3306
 Source Schema         : social_network

 Target Server Type    : MariaDB
 Target Server Version : 100313
 File Encoding         : 65001

 Date: 27/02/2020 22:13:37
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for comments
-- ----------------------------
DROP TABLE IF EXISTS `comments`;
CREATE TABLE `comments` (
  `id` varchar(36) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `userId` varchar(36) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `postId` varchar(36) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `content` text DEFAULT NULL,
  `createdAt` timestamp(6) NULL DEFAULT current_timestamp(6),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of comments
-- ----------------------------
BEGIN;
INSERT INTO `comments` VALUES ('8fa71396-17a6-4ae1-b0b7-f42aead3dc12', 'fd2d165d-91a2-4bd5-b038-85d20d1b502d', '037f068a-9b57-42fb-8095-23b2970fa042', 'Raat hay', '2020-01-31 02:53:27.600639');
INSERT INTO `comments` VALUES ('d992dfde-a5bf-43c8-b415-d1d4bf26d74a', 'fd2d165d-91a2-4bd5-b038-85d20d1b502d', '037f468a-9b57-42fb-8095-23b2970fa042', 'Rất hay!', '2020-01-31 02:49:50.404046');
COMMIT;

-- ----------------------------
-- Table structure for follow
-- ----------------------------
DROP TABLE IF EXISTS `follow`;
CREATE TABLE `follow` (
  `followerId` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `followingId` varchar(36) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`followerId`,`followingId`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of follow
-- ----------------------------
BEGIN;
INSERT INTO `follow` VALUES ('b31eba36-69df-40a8-9289-d4141c8febb5', 'fd2d165d-91a2-4bd5-b038-85d20d1b502d');
COMMIT;

-- ----------------------------
-- Table structure for like_post
-- ----------------------------
DROP TABLE IF EXISTS `like_post`;
CREATE TABLE `like_post` (
  `userId` varchar(36) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `postId` varchar(36) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`userId`,`postId`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of like_post
-- ----------------------------
BEGIN;
INSERT INTO `like_post` VALUES ('fd2d165d-91a2-4bd5-b038-85d20d1b502d', '037f468a-9b57-42fb-8095-23b2970fa042');
COMMIT;

-- ----------------------------
-- Table structure for posts
-- ----------------------------
DROP TABLE IF EXISTS `posts`;
CREATE TABLE `posts` (
  `id` varchar(36) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `content` text CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `userId` varchar(36) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  `title` varchar(255) DEFAULT NULL,
  `featureImage` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `likeNumber` int(6) DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `userId` (`userId`),
  CONSTRAINT `userId` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of posts
-- ----------------------------
BEGIN;
INSERT INTO `posts` VALUES ('037f468a-9b57-42fb-8095-23b2970fa042', 'Happy new year', 'fd2d165d-91a2-4bd5-b038-85d20d1b502d', '2020-01-25 09:34:04', '2020-01-31 02:54:21', 'Chúc mừng năm mới', NULL, 1);
INSERT INTO `posts` VALUES ('226a4641-2049-4627-aae6-1761e23e1132', 'Happy new year', '037f068a-9b57-42fb-8095-23b2970fa042', '2020-01-25 09:39:45', '2020-01-25 11:15:23', 'Chúc mừng năm mới', NULL, 0);
INSERT INTO `posts` VALUES ('cdefdcce-40eb-4398-98e1-f440a96e518e', 'Happy new year 3', 'fd2d165d-91a2-4bd5-b038-85d20d1b502d', '2020-01-25 09:39:10', '2020-01-31 03:00:27', 'Chúc mừng năm mới', NULL, 0);
COMMIT;

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` varchar(36) COLLATE utf8_unicode_ci NOT NULL,
  `username` varchar(72) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(128) COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(128) COLLATE utf8_unicode_ci DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `avatar` varchar(255) COLLATE utf8_unicode_ci DEFAULT 'https://www.fourthwallevents.com/wp-content/uploads/2016/04/default-avatar.png',
  `numberFollower` int(4) NOT NULL DEFAULT 0,
  `numberFollowing` int(4) DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of users
-- ----------------------------
BEGIN;
INSERT INTO `users` VALUES ('00b98da2-1837-4087-8c5b-bd3c18efd812', 'khang1', '$2b$12$5neAOFoZ/M/vMA0jax3UV.sWM0Hx/VDAu/5a36BKl8J1GTDxSQSEC', 'Trịnh Khang', '2020-01-25 08:49:58', 'https://www.fourthwallevents.com/wp-content/uploads/2016/04/default-avatar.png', 0, 0);
INSERT INTO `users` VALUES ('037f068a-9b57-42fb-8095-23b2970fa042', 'khang4', '$2b$12$DwJ8jdKkHzt/.NoSFreoPOyDwoa7GcheuQYSjLGCGa/rmAzqD0CFG', 'Trịnh Khang', '2020-01-25 08:57:19', 'https://www.fourthwallevents.com/wp-content/uploads/2016/04/default-avatar.png', 0, 0);
INSERT INTO `users` VALUES ('805609d6-e189-42dd-9fda-a695b5ae0626', 'khang2', '$2b$12$m6R6JC2GFpPsHfQCBV1r7e/Db6SnkrTtUxHKOJ1R4qzaA14aXR9n2', 'Trịnh Khang', '2020-01-25 08:50:03', 'https://www.fourthwallevents.com/wp-content/uploads/2016/04/default-avatar.png', 0, 0);
INSERT INTO `users` VALUES ('b31eba36-69df-40a8-9289-d4141c8febb5', 'khang5', '$2b$12$ScVfjsqpzuS.dUwG0wRNxeGuyIuWtDOhc2cUsWtFLsgxZmiNQnKuG', 'Trịnh Khang', '2020-01-25 09:00:57', 'https://www.fourthwallevents.com/wp-content/uploads/2016/04/default-avatar.png', 1, 0);
INSERT INTO `users` VALUES ('fd2d165d-91a2-4bd5-b038-85d20d1b502d', 'khang', '$2b$12$wX8ZL/6AO9GvE7U.K2ATmen0Qh271FCWiv/5dSLTvLbpeIQbBAWFa', 'Trịnh Khang', '2020-01-25 08:47:07', 'https://www.fourthwallevents.com/wp-content/uploads/2016/04/default-avatar.png', 0, 1);
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
