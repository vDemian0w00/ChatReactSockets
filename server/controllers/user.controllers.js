import userModel from "../model/userModel.js"

export const createUser = async (req, res) => {
  const { username, email, password } = req.body;
  const usernameExisting = await userModel.findOne({ email });
  if (usernameExisting) {
    return res.json({ message: "User email already exists", success: false });
  }
  const user = await userModel.create({
    username,
    email,
    password,
  })

  delete user.password;

  res.status(201).json({ message: "User Registration Successful", user, success:true});
}

export const getUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (!user) {
    return res.json({ message: "User not found", success: false });
  }
  if (user.password !== password) {
    return res.json({ message: "Incorrect password", success: false });
  }
  delete user.password;
  res.status(200).json({ message: "User Login Successful", user, success: true });
}

export const getContacts = async (req, res)=>{
  const users = await userModel.find({_id: {$ne: req.params.id}}).select([
    "username",
    "email",
    "_id",
  ]);
  res.status(200).json({users, success: true})
}