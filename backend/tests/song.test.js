import request from "supertest";
import app from "../server.js";

describe("GET /songs", () => {
  it("should return all songs", async () => {
    const res = await request(app).get("/songs");
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
