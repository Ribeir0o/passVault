const supertest = require("supertest");
const app = require("../../src/app");
const messages = require("../../src/constants/errorMessages");

describe("POST /login", () => {
  it("Should return an error saying that fields cannot be empty", async (done) => {
    const res = await supertest(app)
      .post("/api/v1/login")
      .expect(messages.emptyField.status);

    expect(res.body).toEqual(
      expect.objectContaining(messages.emptyField),
    );
    done();
  });

  it("Should return an error saying that failed to login", async (done) => {
    const res = await supertest(app)
      .post("/api/v1/login")
      .send({ email: "thiagogr71@gmail.com", password: "mypassword" })
      .expect(messages.loginFailed.status);

    expect(res.body).toEqual(
      expect.objectContaining(messages.loginFailed),
    );
    done();
  });

  it("Should return a Cookie with the jwt", async (done) => {
    const res = await supertest(app)
      .post("/api/v1/login")
      .send({ email: "thiagogr71@gmail.com", password: "strongPassword1" })
      .expect(200);
    expect(res.headers["set-cookie"]).toEqual(
      expect.arrayContaining([
        expect.stringMatching(/tkn=.*/),
      ]),
    );
    done();
  });
});
