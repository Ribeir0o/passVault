const supertest = require("supertest");
const app = require("../../src/app");
const message = require("../../src/constants/errorMessages");

describe("POST /account", () => {
  it("Should return an error saying that this email already exists", async (done) => {
    const data = {
      email: "thiagogr71@gmail.com",
      password: "anotherStrongPass",
    };
    const res = await supertest(app)
      .post("/api/v1/account")
      .send(data)
      .expect(message.emailAlreadyExists.status);

    expect(res.body)
      .toEqual(
        expect.objectContaining(message.emailAlreadyExists),
      );
    done();
  });
  it("Should return a message saying that fields cannot be empty", async (done) => {
    const res = await supertest(app)
      .post("/api/v1/account")
      .expect(message.emptyField.status);

    expect(res.body).toEqual(
      expect.objectContaining(message.emptyField),
    );
    done();
  });
  it("Should return 201 if the user was created", async (done) => {
    const user = {
      email: "thiagog.r@hotmail.com",
      password: "123987",
    };
    await supertest(app)
      .post("/api/v1/account")
      .send(user)
      .expect(201);
    done();
  });
});
