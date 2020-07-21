const Router = require('koa-router');
const { crawlEmployees, getEmployees } = require("../function/employee.js");
const  loginMiddleware  = require("../middleware/loginMiddleware.js").loginMiddleware;

const EmployeeRouter = new Router({ prefix: "/employees" });

EmployeeRouter.get("/", loginMiddleware, ctx => getEmployees(ctx));
EmployeeRouter.post("/crawl", loginMiddleware, ctx => crawlEmployees(ctx));

module.exports = EmployeeRouter;