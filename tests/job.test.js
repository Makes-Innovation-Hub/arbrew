import assert from "assert";
import { describe, it } from "mocha";
import fetch from "node-fetch";
const baseURL = "http://localhost:5001/api/job";

// from any user in your db get user token and id and paste it here
let token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQ0NzQwZDQyNWFmMzMxNGViYzc1ODYiLCJpYXQiOjE3MDg0MjIxNTd9.kKGkVeMUorXs7QVUYvjTw1NJgJYJrygsdBMxWqIKpAE";
const userId = "65d4740d425af3314ebc7586";

// this id will be generated automatically once you start running the tests
let globalJobId = "";

describe("Job Tests", async () => {
  describe("Job Creation", async () => {
    it("Should create new job post and save to database should return 201", async () => {
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append("Authorization", `Bearer ${token}`);
      const body = {
        title: "Junior Web Developer",
        company: "Amdocs",
        city: "Jerusalem",
        model: "On-Site",
        description: "full time junior Web Developer Position.",
        postedBy: userId,
      };
      const requestOptions = {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      };
      const result = await fetch(baseURL, requestOptions);

      assert.strictEqual(result.status, 201);
      const response = await result.json();
      globalJobId = response.newJob.id;
    });
  });
  describe("GET Job Posts", async () => {
    it("Should Get my job posts and return 200 ", async () => {
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append("Authorization", `Bearer ${token}`);
      const requestOptions = {
        method: "GET",
        headers: headers,
      };
      const result = await fetch(baseURL + "/my-job-posts", requestOptions);
      assert.strictEqual(result.status, 200);
    });
    it("Should Get All job posts and return 200 ", async () => {
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append("Authorization", `Bearer ${token}`);
      const requestOptions = {
        method: "GET",
        headers: headers,
      };
      const result = await fetch(baseURL, requestOptions);
      assert.strictEqual(result.status, 200);
    });
    it("Should Get job by id post and return 200 ", async () => {
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append("Authorization", `Bearer ${token}`);
      const jobId = "65d1cf417a3d8bd3ec5898b7";
      const requestOptions = {
        method: "GET",
        headers: headers,
      };
      const result = await fetch(baseURL + `/${globalJobId}`, requestOptions);
      assert.strictEqual(result.status, 200);
    });
    it("Should Get job by id post with wrong job id and return 404 ", async () => {
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append("Authorization", `Bearer ${token}`);
      const jobId = "65d1cf417a3d8bd3ec5898b9";
      const requestOptions = {
        method: "GET",
        headers: headers,
      };
      const result = await fetch(baseURL + `/${jobId}`, requestOptions);
      assert.strictEqual(result.status, 404);
    });
  });
  describe("Update Job", async () => {
    it("Update Job info valid should return 200", async () => {
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append("Authorization", `Bearer ${token}`);
      const jobId = "65d1cf417a3d8bd3ec5898b7";
      const body = {
        title: "Junior FullStack Developer NEW NEW NEW",
        company: "Makes",
        city: "Ramleh",
        model: "Hybrid",
      };
      const requestOptions = {
        method: "PATCH",
        headers: headers,
        body: JSON.stringify(body),
      };
      const result = await fetch(baseURL + `/${globalJobId}`, requestOptions);
      assert.strictEqual(result.status, 200);
    });
    it("Update Job info invalid job id should return 404", async () => {
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append("Authorization", `Bearer ${token}`);
      const jobId = "65d1cf417a3d8bd3ec5898b8";
      const body = {
        title: "Junior FullStack Developer NEW NEW NEW",
        company: "Makes",
        city: "Ramleh",
        model: "Hybrid",
      };
      const requestOptions = {
        method: "PATCH",
        headers: headers,
        body: JSON.stringify(body),
      };
      const result = await fetch(baseURL + `/${jobId}`, requestOptions);
      assert.strictEqual(result.status, 404);
    });
  });
  describe("Apply to Job", async () => {
    it("Apply user to job with valid info should return 200", async () => {
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append("Authorization", `Bearer ${token}`);
      const body = {
        userId: "65d5ba984b29b94ea90f595c",
        resume: "someUrl",
        jobId: globalJobId,
      };
      const requestOptions = {
        method: "PATCH",
        headers: headers,
        body: JSON.stringify(body),
      };
      const result = await fetch(baseURL + `/apply`, requestOptions);
      assert.strictEqual(result.status, 200);
    });
    it("Apply user to job with invalid jobId info should return 404", async () => {
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append("Authorization", `Bearer ${token}`);
      const body = {
        userId: "65d1cfa07a3d8bd3ec5898c1",
        resume: "someUrl",
        jobId: "65d1cf417a3d8bd3ec5898b8",
      };
      const requestOptions = {
        method: "PATCH",
        headers: headers,
        body: JSON.stringify(body),
      };
      const result = await fetch(baseURL + `/apply`, requestOptions);
      assert.strictEqual(result.status, 404);
    });
  });
  describe("UnAuthorized User", async () => {
    it("UnAuthorized User job request", async () => {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQxY2ZhMDdhM2Q4YmQzZWM1ODk4YzEiLCJpYXQiOjE3MDgyNDg5OTJ9.KwHArm7MhF2npt3wzcwTQcMtXGFR-eiyhQrf1OZ5jM5";
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append("Authorization", `Bearer ${token}`);
      const body = {
        title: "Junior Web Developer",
        company: "Amdocs",
        city: "Jerusalem",
        model: "On-Site",
        description: "full time junior Web Developer Position.",
        postedBy: "65d1c737f75e79f9bd020c58",
      };
      const requestOptions = {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      };
      const result = await fetch(baseURL, requestOptions);
      assert.strictEqual(result.status, 401);
    });
  });
  describe("delete job with given id", async () => {
    it(`delete job with id ${globalJobId}`, async () => {
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append("Authorization", `Bearer ${token}`);
      const requestOptions = {
        method: "DELETE",
        headers: headers,
      };
      const result = await fetch(baseURL + `/${globalJobId}`, requestOptions);
      assert.strictEqual(result.status, 200);
    });
  });
});
