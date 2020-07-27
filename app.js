const Koa = require('koa');
const KoaBody = require('koa-body');
const Mongo = require('koa-mongo');
const Session = require('koa-session')
const AuthRouter = require("./router/auth.js");
const HomeRouter = require("./router/home.js");
const EmployeeRouter = require("./router/employee.js");
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const app = new Koa();
app.keys = ["KoaJS"];

app
    .use(Mongo({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        db: process.env.DB_NAME,
    }))
    .use(Session(app))
    .use(KoaBody({ multipart: true }))
    .use(AuthRouter.routes())
    .use(HomeRouter.routes())
    .use(EmployeeRouter.routes());

app.listen(process.env.PORT, () => { console.log(`running on port ${process.env.PORT}`) });