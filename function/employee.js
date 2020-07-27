const fetch = require('node-fetch');

exports.crawlEmployees = async ctx => {
    try {
        const response = await fetch('http://dummy.restapiexample.com/api/v1/employees');
        const employees = await response.json();
        const result = await ctx.db.collection('employees').insertMany(employees.data);
        if (result) {
            ctx.body = "crawl successfully";
        }
    } catch (err) {
        ctx.body = "crawl failed, please try again";
        console.log(err);
    }
}

exports.getEmployees = async ctx => {
    const { name } = ctx.request.query;
    const result = name
        ? await ctx.db.collection('employees').findOne({ employee_name: name })
        : await ctx.db.collection('employees').find();
    ctx.body = result;
}