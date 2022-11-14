import Message from "../model/messageModel.js";

export const addMessage = async (req, res) => {
  const { from, to, message } = req.body;
  try {
    const data = await Message.create({
      message: { text: message },
      users: [from, to],
      sender: from,
    });
    if (data) {
      res.status(201).json({ message: "Message sent successfully" });
      return;
    }
    res.json({ message: "User doesn't exist" });
  } catch (err) {
    res.json({ message: "Something went wrong", err });
  }
};

export const getAllMessage = async (req, res) => {
  try {
    const { from, to } = req.body;
    const messages = await Message.find({ users: { $all: [from, to] } }).sort({updatedAt: 1});
    const data = messages.map(msg=>{
      return {
        fromSelf: msg.sender.toString()===from,
        message: msg.message.text,
      }
    })
    res.status(200).json(data);
  } catch (e) {}
};
