var Koa = require('koa');
var Router = require('koa-router')();
var views = require('koa-views');
var common = require('./module/common.js');
var app = new Koa();

app.use(views('views', {
    extension:'ejs'
}))
app.use(async(ctx,next)=>{
    ctx.state.userinfo='songting'
    await next()
})
Router.post('/doAdd',async (ctx)=>{
    //原生
    // var data =  await common.getPostData(ctx)
    // console.log(data);
    // ctx.body=data
    // 使用 bodyparser
})



Router.get('/',async (ctx)=>{
    let title ='sonttingshigou'
    await ctx.render('index',{
        title:title
    })
})
Router.get('/title',async (ctx)=>{
    let arr=[111,222,333]
    let content ='<h2>songtingshigou</h2>'
    let num =123
    await ctx.render('title',{
         list:arr,
        content:content,
        num:num
    })
})

// router.get('/',async (ctx)=>{
//     await ctx.render('index')
// }).get('/news',async(ctx,next)=>{
//    ctx.body='新闻'
// })
// router.get('/newscontent/:aid/:cid',async (ctx)=>{
//    // console.log(ctx.query)
//    // console.log(ctx.querystring)
//    // console.log(ctx.url)
//    // console.log(ctx.request)
//    console.log(ctx.params)
//    ctx.body='新闻详情'
// })
// router.get('/title',async (ctx)=>{
//    ctx.body='标题'
// })
app
    .use(Router.routes())
    .use(Router.allowedMethods()); //
app.listen(3000)

//中间件
// app.use(async (ctx,next)=>{
//     console.log('this is a mid');
//      next()
//     if(ctx.status==404){
//         ctx.body='404'
//     }else{
//         console.log(ctx.url)
//     }
// })