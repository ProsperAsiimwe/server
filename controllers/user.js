const UserService = require("../services/user");

/**
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
exports.createUser = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      throw new Error("Invalid request payload: name field is required");
    }

    const user = await UserService.createUser({ name: name });
    return res.status(201).json({ data: user });
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
exports.getAllUsers = async (req, res) => {
  try {
    const users = await UserService.getAllUsers();

    return res.status(200).json({ data: users });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
