const ProfileService = require("../services/profile");

/**
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
exports.createProfile = async (req, res) => {
  try {
    const {
      name,
      description,
      mbti,
      enneagram,
      variant,
      tritype,
      socionics,
      sloan,
      psyche,
      image,
    } = req.body;

    if (
      !name ||
      !description ||
      !mbti ||
      !enneagram ||
      !variant ||
      !tritype ||
      !socionics ||
      !sloan ||
      !psyche ||
      !image
    ) {
      throw new Error("Invalid request payload");
    }

    const profile = await ProfileService.createProfile({
      name: name,
      description: description,
      mbti: mbti,
      enneagram: enneagram,
      variant: variant,
      tritype: tritype,
      socionics: socionics,
      sloan: sloan,
      psyche: psyche,
      image: image,
    });
    return res.status(201).json({ data: profile });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

/**
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
exports.getAllProfiles = async (req, res) => {
  try {
    const profiles = await ProfileService.getAllProfiles();

    return res.status(200).json({ data: profiles });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

/**
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
exports.getProfileById = async (req, res) => {
  try {
    const { id } = req.params;

    const profile = await ProfileService.getProfileById(id);

    res.render("profile_template", {
      profile: profile,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
