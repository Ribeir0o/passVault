module.exports = {
  emptyField: { status: 400, message: "Nenhum campo pode estar vazio" },
  emailAlreadyExists: { status: 422, message: "O email já está cadastrado na base de dados" },
  loginFailed: { status: 401, message: "O email ou a senha estão incorretos. Tente novamente" },
  invalidToken: { status: 401, message: "Token inválido" },
  idMustBeNumber: { status: 400, message: "O id tem que ser um número" },
  idNotFound: { status: 404, message: "Não existe nenhuma senha com esse id para esse usuário" },
};
