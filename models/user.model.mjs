import mongoose from 'mongoose';
// import APIError from '../helpers/APIError.mjs';
/**
 * User Schema
 */
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  mobileNumber: {
    type: String,
    required: true,
    match: [/^[1-9][0-9]{9}$/, 'The value of path {PATH} ({VALUE}) is not a valid mobile number.']
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
  password: String
});

/**
 * Methods
 */
UserSchema.method({
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
      return await this.findById(id);
    } catch (err) {
      throw err;
    }
    // let user = await this.findById(id);
    // return this.findById(id)
    //   .exec()
    //   .then((user) => {
    //     if (user) {
    //       return user;
    //     }
    //     const err = new APIError('No such user exists!', httpStatus.NOT_FOUND);
    //     return Promise.reject(err);
    //   });
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
