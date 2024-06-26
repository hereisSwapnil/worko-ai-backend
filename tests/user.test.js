const request = require("supertest");
const app = require("../server");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

beforeAll(async () => {
  await mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe("User API", () => {
  it("should create a new user", async () => {
    const res = await request(app).post("/api/worko/user").send({
      email: "test@example.com",
      name: "Test User",
      age: 25,
      city: "Test City",
      zipCode: "12345",
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("email", "test@example.com");
  });

  it("should get list of users", async () => {
    const res = await request(app).get("/api/worko/user");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  // Add more tests as needed
});
