const router = require('koa-router')()
const axios = require('axios');

router.prefix('/api');

router.post('/op', async(ctx, next) => {
    let dat = ctx.request.body;
    let userinfo = await axios.get(dat.url);
    ctx.body = {data: userinfo.data}
});

module.exports = router
