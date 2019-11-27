var Koa = require('koa');
var Router = require('koa-router');

var app = new Koa();
var router = new Router();

router.get('/',async (ctx)=>{
    ctx.body='首页'
}).get('/news',async(ctx)=>{
   ctx.body='新闻'
})
router.get('/newscontent',async (ctx)=>{
   console.log(ctx.query)
   console.log(ctx.querystring)
   console.log(ctx.url)
   console.log(ctx.request)
   ctx.body='新闻详情'
})
router.get('/title',async (ctx)=>{
   ctx.body='标题'
})
app
    .use(router.routes())
    .use(router.allowedMethods()); //
app.listen(3000)