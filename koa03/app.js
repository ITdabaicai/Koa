var Koa = require('koa'),
    Router = require('koa-router')(),
    views = require('koa-views'),
    bodyParser=require('koa-bodyparser'),
    static = require('koa-static'),
    render = require('koa-art-template')
var app = new Koa();
app.use(views('views', {
    extension:'ejs'
}))
app.use(bodyParser())
//配置静态资源
app.use(static(__dirname+'/static'));

Router.get('/',async (ctx)=>{
    await ctx.render('index')
})

Router.post('/doAdd',async (ctx)=>{
    console.log(ctx.request.body);
    ctx.body=ctx.request.body
})
app
    .use(Router.routes())
    .use(Router.allowedMethods());
app.listen(3000)

