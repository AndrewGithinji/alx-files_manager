const redisClient = require('./redis');
const dbClient = require('./db');

async function getAuthToken(request) {
  const token = request.headers['x-token'];
  return `auth_${token}`;
}

async function findUserIdByToken(request) {
  const key = await getAuthToken(request);
  const userId = await redisClient.get(key);
  return userId || null;
}

async function findUserById(userId) {
  const userExistsArray = await dbClient.users.find({ _id: ObjectId(userId) }).toArray();
  return userExistsArray[0] || null;
}

module.exports = {
  findUserIdByToken,
  findUserById,
};
