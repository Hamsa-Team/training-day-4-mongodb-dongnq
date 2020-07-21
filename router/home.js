const Router = require('koa-router');
const { home } = require('../function/home.js');

const HomeRouter = new Router();

HomeRouter.get("/", ctx => home(ctx));

module.exports = HomeRouter;