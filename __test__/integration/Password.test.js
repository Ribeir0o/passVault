const supertest = require("supertest");
const app = require("../../src/app");
const messages = require("../../src/constants/errorMessages");
const { sign } = require("../../src/lib/jwt");
const passwords = require("../../src/constants/passwords");
const Password = require("../../src/Models/Password");
const { decrypt } = require("../../src/lib/cryptoUtil");

const token = sign("thiagogr71@gmail.com");

describe("GET /password/:id", () => {
  it("Should return an error saying that the id must be number", async (done) => {
    const res = await supertest(app)
      .get("/api/v1/password/passId")
      .set("Authorization", `Bearer ${token}`)
      .expect(messages.idMustBeNumber.status);

    expect(res.body).toMatchObject(messages.idMustBeNumber);
    done();
  });

  it("Should return an error saying that the id was not found", async (done) => {
    const res = await supertest(app)
      .get("/api/v1/password/3")
      .set("Authorization", `Bearer ${token}`)
      .expect(messages.idNotFound.status);

    expect(res.body).toMatchObject(messages.idNotFound);
    done();
  });

  it("Should return a json with the site and the respective decrypted password", async (done) => {
    const res = await supertest(app)
      .get("/api/v1/password/2")
      .set("Authorization", `Bearer ${token}`)
      .expect(200);
    const { site } = passwords[1];
    expect(res.body).toMatchObject({
      site,
      password: "facebookPassUser1",
    });
    done();
  });
});
describe("POST /password", () => {
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

describe("DELETE /password/:id", () => {
  it("Should return an error saying that the id must be number", async (done) => {
    const res = await supertest(app)
      .delete("/api/v1/password/passId")
      .set("Authorization", `Bearer ${token}`)
      .expect(messages.idMustBeNumber.status);

    expect(res.body).toMatchObject(messages.idMustBeNumber);
    done();
  });

  it("Should return an error saying that the id was not found", async (done) => {
    const res = await supertest(app)
      .delete("/api/v1/password/3")
      .set("Authorization", `Bearer ${token}`)
      .expect(messages.idNotFound.status);

    expect(res.body).toMatchObject(messages.idNotFound);
    done();
  });

  it("Should return 200 and delete password", async (done) => {
    await supertest(app)
      .delete("/api/v1/password/2")
      .set("Authorization", `Bearer ${token}`)
      .expect(200);

    const pass = await Password.findById(2);
    expect(pass).toBeUndefined();
    done();
  });
});
describe("PUT /password/:id", () => {
  it("Should return an error saying that the id must be number", async (done) => {
    const res = await supertest(app)
      .put("/api/v1/password/passId")
      .set("Authorization", `Bearer ${token}`)
      .expect(messages.idMustBeNumber.status);

    expect(res.body).toMatchObject(messages.idMustBeNumber);
    done();
  });

  it("Should return an error saying that the id was not found", async (done) => {
    const payload = {
      newPassword: "novaSenha",
      site: "https://facebook.com",
    };
    const res = await supertest(app)
      .put("/api/v1/password/3")
      .set("Authorization", `Bearer ${token}`)
      .send(payload)
      .expect(messages.idNotFound.status);

    expect(res.body).toMatchObject(messages.idNotFound);
    done();
  });

  it("Should return 200 and delete password", async (done) => {
    const payload = {
      newPassword: "novaSenha",
      site: "https://facebook.com",
    };

    await supertest(app)
      .put("/api/v1/password/1")
      .set("Authorization", `Bearer ${token}`)
      .send(payload)
      .expect(200);

    const { password } = await Password.findById(1);
    expect(decrypt(password)).toEqual(payload.newPassword);
    done();
  });
});
