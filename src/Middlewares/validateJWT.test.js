const errorMessages = require("../constants/errorMessages");
const { sign } = require("../lib/jwt");
const validateMiddleware = require("./validateJWT");

describe("JWT Autentication", () => {
  const resMock = {
    status: jest.fn(),
    json: jest.fn(),
  };
  const nextMock = jest.fn();
  it("Should call json method with invalid token error message when token is undefined", () => {
    const req = { headers: {} };
    validateMiddleware(req, resMock, nextMock);
    expect(resMock.status).toBeCalledWith(errorMessages.invalidToken.status);
    expect(resMock.json).toBeCalledWith(errorMessages.invalidToken);
  });

  it("Should call json method with invalid token error message when token is invalid", () => {
    const req = { headers: { authorization: "invalidToken" } };
    validateMiddleware(req, resMock, nextMock);
    expect(resMock.status).toBeCalledWith(errorMessages.invalidToken.status);
    expect(resMock.json).toBeCalledWith(errorMessages.invalidToken);
  });

  it("Should call next and add property email to req", () => {
    const email = "thiagogr71@gmail.com";
    const token = sign(email);
    const req = { headers: { authorization: `Bearer ${token}` } };
    validateMiddleware(req, resMock, nextMock);

    expect(nextMock).toBeCalled();
    expect(req).toHaveProperty("email", email);
  });
});
