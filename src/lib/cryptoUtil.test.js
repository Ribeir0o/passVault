const { encrypt, decrypt } = require("./cryptoUtil");

describe("Encryption and decryption", () => {
  it("Should return the iv and the message encrypted", () => {
    const text = "message to be encrypted";
    expect(encrypt(text).length).toBeGreaterThan(32);
  });

  it("Should return the message decrypted", () => {
    const text = "message";
    const encrypted = encrypt(text);

    expect(decrypt(encrypted)).toBe(text);
  });
});
