var Koa = require('koa'),
    Router = require('koa-router')(),
    render = require('koa-art-template'),
    path=require('path'),
    session = require('koa-session'),
    DB=require('./module/db.js')
var app = new Koa();

app.keys = ['some secret hurr'];

const CONFIG = {
    key: 'koa:sess', /** (string) cookie key (default is koa:sess) */
    /** (number || 'session') maxAge in ms (default is 1 days) */
    /** 'session' will result in a cookie that expires when session/browser is closed */
    /** Warning: If a session cookie is stolen, this cookie will never expire */
    maxAge: 86400000,
    autoCommit: true, /** (boolean) automatically commit headers (default true) */
    overwrite: true, /** (boolean) can overwrite or not (default true) */
    httpOnly: true, /** (boolean) httpOnly or not (default true) */
    signed: true, /** (boolean) signed or not (default true) */
    rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
    renew: true, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
};
app.use(session(CONFIG, app));


render(app,{
    root:path.join(__dirname,'views'),
    extname:'.html',
    debug:process.env.NODE_ENV!=='production'
})
Router.get('/',async (ctx)=>{
    var res = await DB.find('admin',{})
    let content='<h5>我是html字段</h5>'
    await ctx.render('index',{
        list:res,
        content:content
    })
})
Router.get('/news',async (ctx)=>{
    await ctx.render('news',{
        content:ctx.cookies.get('userinfo'),
        session:ctx.session.username
    })
})
Router.get('/add',async (ctx)=>{
    let newadd =await DB.insert('article', {
        'username': '测试一下',
        'age': 50,
        'sex': '男'
    })
    console.log(newadd);
    ctx.body='新增一个'
})
Router.get('/edit',async (ctx)=>{
    let newadd =await DB.update('article', {
        'username': '测试一下',
    },{
        'username':'我修改了'
    })
    console.log(newadd);
    ctx.body='修改一下'
})
Router.get('/delete',async (ctx)=>{
    let newadd =await DB.remove('article',{
        'username':'我修改了'
    })
    console.log(newadd);
    ctx.body='删除一下'
})
app
    .use(Router.routes())
    .use(Router.allowedMethods());
app.listen(3000)

