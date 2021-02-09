const supertest = require("supertest");
const app = require("../../src/app");
const messages = require("../../src/constants/errorMessages");
const { sign } = require("../../src/lib/jwt");

describe("POST /password", () => {
  const token = sign("thiagogr71@gmail.com");
  it("Should return an error saying that fields cannot be empty", async (done) => {
    const res = await supertest(app).post("/api/v1/password")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(messages.emptyField.status);
    expect(res.body).toMatchObject(messages.emptyField);
    done();
  });

  it("Should return 201", async (done) => {
    const payload = {
      password: "1234",
      site: "facebook.com",
    };
    await supertest(app).post("/api/v1/password")
      .set("Authorization", `Bearer ${token}`)
      .send(payload)
      .expect(201);
    done();
  });
});
