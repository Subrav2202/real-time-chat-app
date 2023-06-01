const { ObjectId } = require("mongoose").Types;
const bcrypt = require("bcrypt");
const { NotFound } = require("../../common/errors");
const {
  save,
  getById,
  searchOne,
  dynamicSearch,
  updateAll,
  update,
} = require("../../core/repository");

const { Model, name: ModelName } = require("./model");

const changePassword = async (user, newPassword) => {
  const id = user._id;
  const model = await Model.findById(id);
  if (model) {
    await Model.setPassword(model, newPassword);
    model.updatedAt = Date.now().toString();
    model.save();
    return model._id;
  }

  throw new NotFound(`User not found by the id: ${id}`);
};


const checkUser = async (username, password) => {
  const user = await Model.findOne({ username }).lean(); // status: "Active"
  if (user) {
    const match = await bcrypt.compare(password, user.passwordHash);
    const { __v, passwordHash, ...rest } = user;
    return match ? rest : undefined;
  }

  return undefined;
};

async function getPasswordHash(password) {
  const hash = await bcrypt.hash(password, 10);
  return hash;
}

const createUser = async (user) => {
  const passwordHash = await getPasswordHash(user.password);
  const { _id } = await save({ passwordHash, ...user }, ModelName);
  return _id;
};

const tryCreateUser = async (user) => {
  const item = await Model.findOne({ email: user.email });
  if (item) {
    return false;
  }
  const id = await createUser(user);
  return id;
};


module.exports = {
  save,
  getById,
  searchOne,
  changePassword,
  checkUser,
  createUser,
  tryCreateUser,
  updateAll,
  update,
  ModelName,
};
