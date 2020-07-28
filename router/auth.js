const Router = require('koa-router');
const { login, logout, signup } = require('../function/auth.js');

const AuthRouter = new Router();

AuthRouter.post("/signup", ctx => signup(ctx));
AuthRouter.post("/login", ctx => login(ctx));
AuthRouter.get("/logout", ctx => logout(ctx));

module.exports = AuthRouter;