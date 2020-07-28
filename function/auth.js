const Bcrypt = require("bcrypt");
const saltRounds = 10;

exports.signup = async ctx => {
    const { username, password } = ctx.request.body;
    const checkUserExists = await ctx.db.collection('users').findOne({ username });
    if (checkUserExists) {
        ctx.body = "username already exists!"
    } else {
        const user = {
            username: username,
            password: await Bcrypt.hashSync(password, saltRounds)
        }

        const res = await ctx.db.collection('users').insertOne(user);
        if (res) {
            ctx.body = "Signup successfully";
        } else {
            ctx.body = "Please try again later";
        }
    }
}

exports.login = async ctx => {
    const { username, password } = ctx.request.body;
    const user = await ctx.db.collection('users').findOne({ username });
    if (user && Bcrypt.compareSync(password, user.password)) {
        ctx.session.login = user;
        ctx.body = "login successfully";
    }
    else {
        ctx.throw(401, 'Unauthorized')
    }
}

exports.logout = ctx => {
    ctx.session = null;
    ctx.redirect("/");
}

