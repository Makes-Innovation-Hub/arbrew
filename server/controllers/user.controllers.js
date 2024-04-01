import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/user.js";
import {
  controllerLogger,
  databaseLogger,
  timingLogger,
  successLogger,
  errorLogger,
  eventLogger,
} from "../middleware/logger.js";
import jwt from "jsonwebtoken";
Array.prototype.sortByMatching = function () {
  return this.sort((a, b) => b.sortBy - a.sortBy);
};

//$ @desc    register new User
//$ @route   POST /api/user/register
//! @access  NOT SET YET
export const registerUser = asyncHandler(async (req, res, next) => {
  const userInfo = req.body;
  controllerLogger("registerUser", { userInfo }, "Registering new user");

  const startTime = Date.now();
  try {
    const newUser = await User.create(userInfo);
    if (!newUser) {
      errorLogger("error registering user", req, res, next);
      return next(new Error("error registering user", newUser));
    }
    newUser.token = generateAccessToken(newUser._id);
    await newUser.save();
    successLogger("registerUser", "User registration succeeded");

    console.log(newUser);
    timingLogger("registerUser", startTime);
    return res.status(201).json({
      success: true,
      data: newUser,
    });
  } catch (err) {
    errorLogger(err, req, res, next);
    next(err);
  }
});

//$ @desc    GET user by subId
//$ @route   GET /api/user/:subId
//! @access  NOT SET YET
export const getUser = asyncHandler(async (req, res, next) => {
  controllerLogger("GetUser", req.params, "starting to fetch user");
  const { subId } = req.params;
  try {
    const user = await User.findOne({ subId: subId });
    if (!user) {
      eventLogger(`user not found`);
      return res.status(200).json({
        success: false,
        data: {},
      });
    }

    eventLogger(`user found in db`);
    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.log("error", error);
  }
});

//$ @desc    GET user by Id
//$ @route   GET /api/user/get-by-id/:Id
//! @access  NOT SET YET
export const getUserById = asyncHandler(async (req, res, next) => {
  controllerLogger("GetUserById", req.params, "starting to fetch user");
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      eventLogger(`user not found`);
      return res.status(200).json({
        success: false,
        data: {},
      });
    }
    eventLogger(`user found in db`);
    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.log("error", error);
  }
});

//$ @desc    find friends by interests Array, (user id to execlude him )
//$ @route   GET /api/user/:subId/get-users?interests=Dancing,Gaming...
//! @access  NOT SET YET
export const getUsersByInterests = asyncHandler(async (req, res, next) => {
  if (!req.interests) return next();
  const { subId } = req.params;
  const interests = req.interests || null;
  const usersInterests = interests
    ? { "userDetails.interests": { $in: interests } }
    : {};
  const matchingUsers = await User.find({
    subId: { $ne: subId },
    ...usersInterests,
  }).lean();
  if (!matchingUsers || matchingUsers.length < 1) return next();

  let sorted_matchingUsers = matchingUsers
    .map((user) => {
      const { userDetails } = user;
      const matching_interests_number = interests.reduce((total, current) => {
        return userDetails.interests.includes(current)
          ? (total += 1)
          : total + 0;
      }, 0);

      return {
        sortBy: matching_interests_number,
        ...user,
      };
    })
    .sortByMatching();
  sorted_matchingUsers.forEach((user) => {
    delete user.sortBy;
  });
  res.status(200).json(sorted_matchingUsers);
});

//$ @desc    get all users in the same work field (execlude the logged user)
//$ @route   GET /api/user/get-work-users
//! @access  NOT SET YET
export const getWorkUsers = async (req, res, next) => {
  try {
    let workUsers = await User.find({
      _id: { $ne: req.user._id },
      "userDetails.workField": {
        $regex: new RegExp(
          "^" + req.user.userDetails.workField.toLowerCase(),
          "i"
        ),
      },
    })
      .select("-token")
      .lean();
    if (!workUsers || workUsers.length < 0) {
      res.status(404);
      throw new Error("No Users found!");
    }
    res.send({ data: workUsers, success: true });
  } catch (error) {
    errorLogger(error, req, res, next);
  }
};

//$ @desc    get all users in random order (execlude the logged user)
//$ @route   GET /api/user/:subId/get-users
//! @access  NOT SET YET
export const getAllUsers = asyncHandler(async (req, res, next) => {
  const { subId } = req.params;
  let allUsers = await User.find({
    subId: { $ne: subId },
  }).lean();
  if (!allUsers || allUsers.length < 1)
    return next(new Error("Db is Empty, or minor Error"));
  allUsers = allUsers.map((user) => {
    delete user._id;
    return user;
  });
  allUsers = allUsers.sort(() => Math.random() - 0.5);
  res.status(200).json(allUsers);
});

//$ @desc    get user by name
//$ @route   GET /api/user/:userName
export const getUserByName = asyncHandler(async (req, res, next) => {
  const { userName } = req.params;

  const user = await User.findOne({ name: userName });

  if (!user) {
    return next(new Error("User not found"));
  }

  return res.status(200).json({
    success: true,
    data: user,
  });
});

//$ @desc    Update user
//$ @route   PUT/api/user/update/:id
export const updateUser = async (req, res, next) => {
  controllerLogger("update user data", req.params, "updating user...");
  const startTime = Date.now();
  try {
    // const userId = req.user._id;
    const userId = req.params.id;
    // const updateData = req.body;
    const updatedUser = await User.findOneAndUpdate(
      {
        _id: userId,
      },
      {
        ...req.body,
      },
      { new: true }
    );
    if (!updatedUser) {
      res.status(STATUS_CODES.NOT_FOUND);
      throw new Error("User couldn't be found");
    }

    successLogger("updateUser", "Updating user succeeded");
    timingLogger("updateUser", startTime);
    return res.status(200).json({
      success: true,
      data: updatedUser,
    });
  } catch (error) {
    errorLogger(error, req, res, next);
  }
};

function generateAccessToken(userId) {
  const token = jwt.sign(
    { _id: userId.toString() },
    process.env.ACCESS_TOKEN_SECRET
  );
  return token;
}
