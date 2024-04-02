import Meetup from "../models/meetup.js";
import User from "../models/user.js";
import {
  controllerLogger,
  timingLogger,
  successLogger,
  errorLogger,
} from "../middleware/logger.js";
import { STATUS_CODES } from "../constants/constants.js";

/**
 * @description get all meetups
 * @route   GET /api/meetup/
 * ! @access  NOT SET YET
 */
export const getAllMeetups = async (req, res, next) => {
  controllerLogger("getMeetups", {}, "starting to fetch all meetups");
  const startTime = Date.now();
  try {
    const meetups = await Meetup.find();
    // if no meetups found
    if (!meetups) {
      res.status(404);
      throw new Error("Db is Empty, or minor Error");
    }
    // sort meetups by date
    meetups.sort((a, b) => {
      return new Date(a.date) - new Date(b.date);
    });
    // populate owner details
    await Meetup.populate(meetups, { path: "owner" });
    // populate attendees details
    await Meetup.populate(meetups, { path: "attendees" });
    successLogger("getMeetups", "Meetups retrieval succeeded");
    timingLogger("getMeetups", startTime);
    return res.status(200).json({
      success: true,
      data: meetups,
    });
  } catch (error) {
    errorLogger(error, req, res, next);
  }
};

/**
 * @description Create meetup
 * @route   POST /api/meetup/
 * ! @access  NOT SET YET
 */
export const createMeetup = async (req, res, next) => {
  controllerLogger("createMeetup", req.body, "starting to create new meetup");
  const startTime = Date.now();
  // retrieve meetup data from request body
  const meetup = req.body;
  // empty meetup object
  if (!meetup) {
    res.status(409);
    throw new Error("No meetup data");
  }

  const newMeetup = new Meetup(meetup);
  try {
    await newMeetup.save();
    // populate owner details
    await Meetup.populate(newMeetup, { path: "owner" });
    successLogger("createMeetup", "Meetup creation succeeded");
    timingLogger("createMeetup", startTime);
    return res.status(201).json({
      success: true,
      data: newMeetup,
    });
  } catch (error) {
    errorLogger(error, req, res, next);
  }
};

/**
 * @description get meetup by id
 * @route   GET /api/meetup/:id
 * ! @access  NOT SET YET
 */
export const getMeetupById = async (req, res, next) => {
  controllerLogger(
    "getMeetupById",
    req.params,
    "starting to fetch meetup by id"
  );
  const startTime = Date.now();
  const { id } = req.params;
  try {
    const meetup = await Meetup.findById(id);
    if (!meetup) {
      res.status(STATUS_CODES.NOT_FOUND);
      throw new Error(`No meetup with id ${id}`);
    }
    // populate owner details
    await Meetup.populate(meetup, { path: "owner" });
    // populate attendees details
    await Meetup.populate(meetup, { path: "attendees" });
    successLogger("getMeetupById", "Meetup retrieval succeeded");
    timingLogger("getMeetupById", startTime);
    return res.status(200).json({
      success: true,
      data: meetup,
    });
  } catch (error) {
    errorLogger(error, req, res, next);
  }
};

/**
 * @description user attend meetup by id
 * @route   POST /api/meetup/:id/attend
 * ! @access  NOT SET YET
 */
export const attendMeetup = async (req, res, next) => {
  controllerLogger(
    "attendMeetup",
    req.params,
    "starting to attend meetup by id"
  );
  const startTime = Date.now();
  const { id } = req.params;
  try {
    const meetup = await Meetup.findById(id);
    const user = await User.findById(req.user._id);
    // check if meetup exists
    if (!meetup) {
      res.status(STATUS_CODES.NOT_FOUND);
      throw new Error("No meetup found with this id");
    }

    // toggle whether user is attending or not
    const userIndex = meetup.attendees.indexOf(user.id);

    if (userIndex === -1) {
      // User hasn't attended the meeting yet, add user
      meetup.attendees.push(user);
    } else {
      // User has already attended the meeting, remove like
      meetup.attendees.splice(userIndex, 1);
    }
    await meetup.save();
    //todo: add meetup to attending user's meetups

    successLogger("attendMeetup", "Toggling meetup attendance successful");
    timingLogger("attendMeetup", startTime);
    return res.status(200).json({
      success: true,
      data: meetup,
    });
  } catch (error) {
    errorLogger(error, req, res, next);
  }
};

/**
 * @description delete meetup by id
 * @route   DELETE /api/meetup/:id
 * ! @access  NOT SET YET
 */
export const deleteMeetup = async (req, res, next) => {
  controllerLogger(
    "deleteMeetup",
    req.params,
    "starting to delete meetup by id"
  );
  const startTime = Date.now();
  const { id } = req.params;
  try {
    const meetup = await Meetup.findByIdAndDelete(id);
    if (!meetup) {
      res.status(STATUS_CODES.NOT_FOUND);
      throw new Error("No meetup found with this id");
    }
    successLogger("deleteMeetup", "Meetup deletion succeeded");
    timingLogger("deleteMeetup", startTime);
    return res.status(200).json({
      success: true,
      data: meetup,
    });
  } catch (error) {
    errorLogger(error, req, res, next);
  }
};

/**
 * @description get user meetups by userId
 * @route   GET /api/meetup/my-meetups * ! @access  NOT SET YET
 */
export const getUserMeetups = async (req, res, next) => {
  controllerLogger(
    "get user meetups",
    req.params,
    "starting to get user meetups by user id"
  );
  const startTime = Date.now();
  try {
    const meetups = await Meetup.find().where({
      owner: req.user._id,
    });
    if (!meetups || meetups.length < 1) {
      res.status(STATUS_CODES.NOT_FOUND);
      throw new Error("No meetups found with this user id");
    }
    // populate owner details
    await Meetup.populate(meetups, { path: "owner" });
    // populate attendees details
    await Meetup.populate(meetups, { path: "attendees" });
    successLogger("getMyMeetups", "get my meetups succeeded");
    timingLogger("getMyMeetups", startTime);
    return res.status(200).json({
      success: true,
      data: meetups,
    });
  } catch (error) {
    errorLogger(error, req, res, next);
  }
};

/**
 * @description update a meetup by id
 * @route   PATCH /api/meetup/:id
 * ! @access  NOT SET YET
 */
export const updateMeetup = async (req, res, next) => {
  controllerLogger("update meetup data", req.params, "updating meetup...");
  const startTime = Date.now();
  try {
    const meetupId = req.params.id;
    const meetup = await Meetup.findOneAndUpdate(
      {
        _id: meetupId,
        owner: req.user._id,
      },
      {
        ...req.body,
      },
      { new: true }
    );
    if (!meetup) {
      res.status(STATUS_CODES.NOT_FOUND);
      throw new Error("Meetup couldn't be found");
    }

    successLogger("getMyMeetups", "Updating meetup succeeded");
    timingLogger("updateMeetup", startTime);
    return res.status(200).json({
      success: true,
      data: meetup,
    });
  } catch (error) {
    errorLogger(error, req, res, next);
  }
};
