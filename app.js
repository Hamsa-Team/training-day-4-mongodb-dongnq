const Koa = require('koa');
const KoaBody = require('koa-body');
const Mongo = require('koa-mongo');
const Session = require('koa-session')
const AuthRouter = require("./router/auth.js");
const HomeRouter = require("./router/home.js");
const EmployeeRouter = require("./router/employee.js");

const app = new Koa();
app.keys = ["KoaJS"];

app
    .use(Mongo({
        host: 'localhost',
        port: 27017,
        db: 'training',
    }))
    .use(Session(app))
    .use(KoaBody({ multipart: true }))
    .use(AuthRouter.routes())
    .use(HomeRouter.routes())
    .use(EmployeeRouter.routes());


app.listen(3000, () => { console.log('running on port 3000') });