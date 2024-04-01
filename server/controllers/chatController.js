import ChatCollection from "../models/chat.js";
import {
  controllerLogger,
  successLogger,
  errorLogger,
  timingLogger,
  databaseLogger,
  eventLogger,
} from "../middleware/logger.js";
import { STATUS_CODES } from "../constants/constants.js";
import { latestMessage } from "../utils/chat.utils.js";
import userCollection from "../models/user.js";
import { CheckAndTranslateMsg } from "../utils/chat_socketIo.js";

//$ @desc    create new Chat (between 2 users)
//$ @route   POST /api/chat/
//! @access  NOT SET YET
export const createChat = async (req, res, next) => {
  try {
    let user1Id = req.body.user1Id;
    let user2Id = req.body.user2Id;
    let hub = req.body.hub;
    let message = req.body.message;
    if (user1Id !== req.user.id && user2Id !== req.user.id) {
      console.log(user1Id === req.user.id);
      console.log(user2Id === req.user.id);
      console.log("token owner id", req.user.id);
      res.status(STATUS_CODES.UNAUTHORIZED);
      throw new Error("User is not authorized for this operation");
    }
    if (!user1Id || !user2Id) {
      res.status(404);
      throw new Error("User ID is missing");
    }
    if (!hub) {
      res.status(STATUS_CODES.VALIDATION_ERROR);
      throw new Error("Chat Must Belong To A Hub");
    }
    if (!message) {
      res.status(STATUS_CODES.FORBIDDEN);
      throw new Error("Must contain message content");
    }

    //find the chat between these two users or make a new one
    let foundChat = await ChatCollection.findOne({
      $or: [{ users: [user1Id, user2Id] }, { users: [user2Id, user1Id] }],
      hub,
    });

    //if there's no existing chat with the given hub, then make a new one
    if (foundChat && foundChat.hub !== hub) {
      foundChat = undefined;
    }
    if (!foundChat) {
      const sender = await userCollection.findById(user1Id);
      const receiver = await userCollection.findById(user2Id);
      const { translatedMsg } = await CheckAndTranslateMsg(
        message,
        sender.userDetails.nativeLanguage,
        receiver.userDetails.nativeLanguage
      );
      console.log("the translated msg in chat controller  ", translatedMsg);
      foundChat = new ChatCollection();
      foundChat.users = [user1Id, user2Id];
      foundChat.hub = hub;
      foundChat.messages = [];
      let newMessage = {
        sender: req.user.id,
        originalContent: message,
        date: new Date(),
        translatedContent: translatedMsg,
      };
      foundChat.messages.push(newMessage);
      await foundChat.save();
    }
    return res.status(200).json({ chat: foundChat.toJSON() });
  } catch (error) {
    errorLogger(error, req, res, next);
  }
};

//$ @desc    get chat by  users id's
//$ @route   GET /api/chat/chat-by-users-ids/?sender='senderId&receiver='receiverId&hub='hub'
//! @access  NOT SET YET
export const GetChatByUsersIds = async (req, res, next) => {
  try {
    console.log("in GetChatByUsersIds");
    const user1Id = req.query.sender;
    const user2Id = req.query.receiver;
    const hub = req.query.hub;
    console.log(user1Id);
    if (user1Id !== req.user.id && user2Id !== req.user.id) {
      res.status(STATUS_CODES.UNAUTHORIZED);
      throw new Error("User not authorized");
    }
    //find the chat between these two users or make a new one
    let foundChat = await ChatCollection.findOne({
      $or: [{ users: [user1Id, user2Id] }, { users: [user2Id, user1Id] }],
      hub,
    }).populate("users");
    if (!foundChat) {
      res.send("Chat not found");
      return;
      // throw new Error("No Chat Yet");
    }

    const receiverUser = foundChat.users.find(
      (user) => !user._id.equals(req.user.id)
    );

    res.send({ chat: foundChat, receiverUser });
  } catch (error) {
    next(error);
  }
};

//$ @desc    get chat by  id
//$ @route   POST /api/chat/:chatId
//! @access  NOT SET YET
export const getChatById = async (req, res, next) => {
  try {
    const chat = await ChatCollection.findById(req.params.chatId).populate(
      "users"
    );

    if (!chat) {
      res.status(404);
      throw new Error("No chat with this Id");
    }
    if (
      chat.users.every((user) => {
        return !user._id.equals(req.user.id);
      })
    ) {
      res.status(STATUS_CODES.UNAUTHORIZED);
      throw new Error("User not authorized");
    }
    const receiverUser = chat.users.find(
      (user) => !user._id.equals(req.user.id)
    );
    return res.status(200).json({ chat: chat.toJSON(), receiverUser });
  } catch (error) {
    errorLogger(error, req, res, next);
    // next(error);
  }
};

//$ @desc    get user Chats list with names and last message
//$ @route   GET /api/chat/open-conversations/?hub="work"||"hobbies"
//! @access  NOT SET YET
export const getUserChatsList = async (req, res, next) => {
  console.log("entering");
  try {
    const userId = req.user.id;
    const hub = req.query.hub;
    console.log("my hub" + hub);
    if (!userId || !hub) {
      res.status(STATUS_CODES.VALIDATION_ERROR);
      throw new Error("Must Provide userId and hub");
    }
    //* const {userLang}=req.body
    // Logging controller event
    controllerLogger(
      "getUserChatsList",
      { userId },
      "Retrieving user chats list"
    );
    const startTime = Date.now();
    // Logging database query
    databaseLogger(
      "Service: getUserChatsList, Find chat by user name",
      { userId },
      "Getting chats list"
    );
    let userChats = await ChatCollection.find({
      users: { $all: [userId] },
      hub: hub,
    })
      .populate("users")
      .sort({ updatedAt: -1 })
      .lean();
    if (!userChats) {
      res.status(STATUS_CODES.NOT_FOUND);
      throw new Error("failed retrieving no chats were found");
    }
    if (userChats.length > 0) {
      console.log("userChats", userChats);
      userChats = await Promise.all(
        userChats.map(async (chat) => {
          const { users, messages } = chat;
          const receiverUser = users.find((user) => !user._id.equals(userId));
          const senderUser = users.find((user) => user._id.equals(userId));
          // const senderLang = senderUser.userDetails.nativeLanguage;
          const lastMessageContent = latestMessage(messages)?.sender.equals(
            userId
          )
            ? latestMessage(messages)?.originalContent
            : latestMessage(messages)?.translatedContent;
          //   currently no translation return original message
          // latestMessage(messages)?.translated_Content[senderLang];
          console.log("chat info", chat);
          return {
            chatId: chat._id,
            chatHub: chat.hub,
            receiver: receiverUser,
            sender: senderUser,
            lastMessageContent,
          };
        })
      ).catch((err) => {
        console.log("err in finding chat msg", err);
      });
    }

    // Logging timing
    timingLogger("getUserChatsList", startTime);

    res.status(200).json(userChats);
  } catch (error) {
    // Logging error
    errorLogger(error, req, res, next);

    next(error);
  }
};

// @desc add new message to chat
// @route PATCH api/chat/:chatId
export const addMessage = async (req, res, next) => {
  try {
    const chatId = req.params.chatId;
    if (!chatId) {
      res.status(STATUS_CODES.VALIDATION_ERROR);
      throw new Error("Must Provide Chat ID");
    }
    const chat = await ChatCollection.findById(chatId);
    if (!chat) {
      res.status(STATUS_CODES.NOT_FOUND);
      throw new Error(`No Chat With this Chat ID`);
    }
    let sender = req.user.id;
    let originalContent = req.body.content;
    if (!originalContent) {
      res.status(STATUS_CODES.VALIDATION_ERROR);
      throw new Error("Missing Content");
    }
    console.log("add message req body", req.body);
    let newMessage = {
      sender,
      originalContent,
      date: new Date(),
      translatedContent: {},
    };
    chat.messages.push(newMessage);
    await chat.save();
    res.send(newMessage);
  } catch (error) {
    errorLogger(error, req, res, next);
  }
};

// @desc delete chat
// @route DELETE api/chat/:chatId
export const removeChat = async (req, res, next) => {
  try {
    const chatId = req.params.chatId;
    const deletedChat = await ChatCollection.findByIdAndDelete(chatId);
    if (!deletedChat) {
      res.status(404);
      throw new Error("Could not find and delete the chat");
    }
    res.json({
      data: deletedChat,
      success: true,
      message: `Deleted chat with id ${chatId}`,
    });
  } catch (error) {
    errorLogger(error, req, res, next);
  }
};
