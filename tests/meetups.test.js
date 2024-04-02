import assert from "assert";
import fetch from "node-fetch";
import mongoose from "mongoose";
// import chai from 'chai';
import { describe, it, before, after } from "mocha";
// import Meetup from "../server/models/meetup";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import Meetup from "../server/models/meetup.js";
import { expect } from "chai";
import { attendMeetup } from "../server/controllers/meetup.controller.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const path1 = path.join(__dirname, "../server/.env");
dotenv.config({ path: path1 });

const PORT = process.env.PORT;
// from any user in your db get user token and id and paste it here
let token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQ0NzQwZDQyNWFmMzMxNGViYzc1ODYiLCJpYXQiOjE3MDg0MjIxNTd9.kKGkVeMUorXs7QVUYvjTw1NJgJYJrygsdBMxWqIKpAE";
const ownerId = "65d4740d425af3314ebc7586";

describe("Create Meetup Test", () => {
  let createdMeetupId;
  it("should return a 201 status code", async function () {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);

    const body = {
      title: "Ai for developers",
      date: "2024-02-22",
      time: "16:00",
      location: "Jerusalem",
      owner: ownerId,
      description: "lorem ipsum dolor sit amet",
      price: "free",
    };

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(body),
    };

    const res = await fetch(
      `http://localhost:${PORT}/api/meetup/`,
      requestOptions
    );

    const responseData = await res.json();
    createdMeetupId = responseData.data.id;

    assert.strictEqual(res.status, 201);
  });
  // After all tests are finished, delete the created meetup

  describe("get all meeting from db test", () => {
    it("should GET All  meetings ", async function () {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${token}`);
      const requestOptions = {
        method: "GET",
        headers: myHeaders,
      };

      const res = await fetch(
        `http://localhost:${PORT}/api/meetup`,
        requestOptions
      );
      assert.equal(res.status, 200);
    });
  });

  after(async function () {
    if (createdMeetupId) {
      try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${token}`);
        const requestOptions = {
          method: "DELETE",
          headers: myHeaders,
        };
        const deleteResponse = await fetch(
          `http://localhost:${PORT}/api/meetup/${createdMeetupId}`,
          requestOptions
        );
        assert.strictEqual(deleteResponse.status, 200);
      } catch (error) {
        console.error("Error deleting meetup:", error);
        assert.fail(error);
      }
    }
  });
});

describe("Get Meeting from DB Test", () => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${token}`);
  let createdMeetupId;

  before(async function () {
    this.timeout(10000); // Set timeout for before hook
    const body = {
      title: "Ai for developers",
      date: "2024-02-22",
      time: "16:00",
      location: "Jerusalem",
      owner: ownerId,
      description: "lorem ipsum dolor sit amet",
      price: "free",
    };

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(body),
    };

    const res = await fetch(
      `http://localhost:${PORT}/api/meetup/`,
      requestOptions
    );
    const responseData = await res.json();
    createdMeetupId = responseData.data.id;
  });

  it("should GET the specific meeting by meetingId", async function () {
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
    };

    const url = `http://localhost:${PORT}/api/meetup/${createdMeetupId}`;
    const res = await fetch(url, requestOptions);

    assert.equal(res.status, 200);

    const responseData = await res.json();
    assert.equal(responseData.success, true);
    assert.notEqual(responseData.data, null);
    assert.equal(responseData.data.id, createdMeetupId);
  });
  after(async function () {
    if (createdMeetupId) {
      try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${token}`);
        const requestOptions = {
          method: "DELETE",
          headers: myHeaders,
        };
        const deleteResponse = await fetch(
          `http://localhost:${PORT}/api/meetup/${createdMeetupId}`,
          requestOptions
        );
        assert.strictEqual(deleteResponse.status, 200);
      } catch (error) {
        console.error("Error deleting meetup:", error);
        assert.fail(error);
      }
    }
  });
});

describe("Attend Meetup Test", () => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${token}`);
  let createdMeetupId;

  before(async function () {
    // Create a new meetup to attend
    const meetupData = {
      title: "AI for Developers",
      date: "2024-02-22",
      time: "16:00",
      location: "Jerusalem",
      owner: ownerId, // Assuming ownerId is defined somewhere in your code
      description: "Lorem ipsum dolor sit amet",
      price: "free",
    };

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(meetupData),
    };

    const res = await fetch(
      `http://localhost:${PORT}/api/meetup/`,
      requestOptions
    );
    const responseData = await res.json();
    createdMeetupId = responseData.data.id;
  });
  //attend meetup test

  it("should attend a meetup", async function () {
    const body = {
      userId: ownerId,
    };

    const requestOptions = {
      method: "PATCH",
      headers: myHeaders,
      body: JSON.stringify(body),
    };

    const url = `http://localhost:${PORT}/api/meetup/${createdMeetupId}/attend`;
    const res = await fetch(url, requestOptions);

    assert.equal(res.status, 200);

    const responseData = await res.json();
    assert.equal(responseData.success, true);
    assert.equal(responseData.data.attendees.includes(body.userId), true); // Check if the user is in the attendees list
  });

  after(async function () {
    // Clean up: Delete the created meetup
    if (createdMeetupId) {
      try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${token}`);
        const requestOptions = {
          method: "DELETE",
          headers: myHeaders,
        };
        const deleteResponse = await fetch(
          `http://localhost:${PORT}/api/meetup/${createdMeetupId}`,
          requestOptions
        );
        assert.strictEqual(deleteResponse.status, 200);
      } catch (error) {
        console.error("Error deleting meetup:", error);
        assert.fail(error);
      }
    }
  });
});
