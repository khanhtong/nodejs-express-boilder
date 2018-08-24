import mongoose from 'mongoose';
import crypto from 'crypto';
// import APIError from '../helpers/APIError.mjs';
/**
 * User Schema
 */
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  email: {
    type: String,
    require: true
  },
  role: {
    type: String,
    default: 'user'
  },
  salt: String,
  password: {
    type: String,
    required: true
  }
});

UserSchema.pre('save', async function (next) {
  try {
    this.salt = await this.makeSalt();
    this.password = await this.encryptPassword(this.password);
    return next();
  } catch (error) {
    return next(error);
  }
});

/**
 * Methods
 */
UserSchema.method({
  async authenticate(password) {
    try {
      const encryptPassword = await this.encryptPassword(password);
      if (this.password === encryptPassword) {
        return true;
      }
      return false;
    } catch (err) {
      throw err;
    }
  },

  async makeSalt() {
    const defaultByteSize = 16;
    try {
      const salt = crypto.randomBytes(defaultByteSize).toString('base64');
      return salt;
    } catch (err) {
      throw err;
    }
  },

  async encryptPassword(password) {
    if (!password || !this.salt) {
      return null;
    }

    const defaultIterations = 10000;
    const defaultKeyLength = 512;
    const defaultDigest = 'sha512';
    const salt = new Buffer(this.salt, 'base64');
    try {
      const encryptedPassword = crypto.pbkdf2Sync(password, salt, defaultIterations, defaultKeyLength, defaultDigest).toString('base64');
      return encryptedPassword;
    } catch (err) {
      throw err;
    }
  }
});

/**
 * Statics
 */
UserSchema.statics = {
  /**
   * Get user
   * @param {ObjectId} id - The objectId of user.
   * @returns {Promise<User, APIError>}
   */
  async get(id) {
    try {
      return await this.findById(id).select('-password -salt').exec();
    } catch (err) {
      throw err;
    }
  },

  /**
   * List users in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of users to be skipped.
   * @param {number} limit - Limit number of users to be returned.
   * @returns {Promise<User[]>}
   */
  async list({ skip = 0, limit = 50 } = {}) {
    try {
      const users = await this.find()
        .sort({ createdAt: -1 })
        .select('-password -salt')
        .skip(+skip)
        .limit(+limit)
        .exec();
      return users;
    } catch (err) {
      throw err;
    }
  }
};

/**
 * @typedef User
 */
const UserModel = mongoose.model('User', UserSchema);
export default UserModel;
