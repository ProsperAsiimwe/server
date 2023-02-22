const mongoose = require("mongoose");
const Profile = require("../models/profile");

/**
 *
 * @param {*} profileData
 * @returns
 */
exports.createProfile = async (profileData) => {
  try {
    const profile = new Profile(profileData);

    const newProfile = await profile.save();

    return newProfile;
  } catch (error) {
    throw new Error(error.message);
  }
};

/**
 *
 * @returns
 */
exports.getAllProfiles = async () => {
  try {
    const profiles = await Profile.find();

    return profiles;
  } catch (error) {
    throw new Error(error.message);
  }
};

/**
 *
 * @param {*} id
 * @returns
 */
exports.getProfileById = async (id) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid profile ID");
    }

    const profile = await Profile.findById(id);
    if (!profile) {
      throw new Error("Profile not found");
    }

    return profile;
  } catch (error) {
    throw new Error(error.message);
  }
};
