const router = require('koa-router')()

router.get('/', async (ctx, next) => {
    await ctx.render('index', {
        title: 'Hello Koa 2!'
    })
})

router.get('/string', async (ctx, next) => {
    ctx.body = 'koa2 string'
})

router.get('/userSinger', async (ctx, next) => {
    ctx.body = {
        state: true,
        result: {
            singer: [
                // {
                //     fileHead: 0,
                //     q: 0,
                //     extra: {
                //         '320filesize': 11712329,
                //         sqfilesize: 31881928,
                //         sqhash: "038E0EE74CEA491E6B30C8722B7F68B3",
                //         '128hash': "4FE953B3697A0181B1ECCD5CA952E063",
                //         '320hash': "01E53F77CDB2F036ACA7B27E28D253CD",
                //         '128filesize': 4684032
                //     },
                //     fileSize: 1201915,
                //     hash: "4FE953B3697A0181B1ECCD5CA952E063",
                //     choricSinger: "姜玉阳、南宫嘉骏",
                //     error: "",
                //     topic_remark: "",
                //     imgUrl: "http://singerimg.kugou.com/uploadpic/softhead/{size}/20150914/20150914180903401926.jpg",
                //     url: "http://fs.open.kugou.com/7ab0b637d9cd63f17fbf29506b954eaa/5a2fd7dd/G120/M01/19/11/uA0DAFodJruIYdhXAASSikkSlXoAAAeGAM_SIwABJKi871.m4a",
                //     time: 1512726540,
                //     bitRate: 32,
                //     songName: "回忆总想哭",
                //     req_hash: "4FE953B3697A0181B1ECCD5CA952E063",
                //     singerHead: "",
                //     album_img: "http://imge.kugou.com/stdmusic/{size}/20170620/20170620120059286480.jpg",
                //     privilege: 0,
                //     status: 1,
                //     stype: 11323,
                //     singerId: 1423,
                //     singerName: "姜玉阳",
                //     ctype: 1009,
                //     fileName: "姜玉阳、南宫嘉骏 - 回忆总想哭",
                //     topic_url: "",
                //     intro: "",
                //     mvhash: "57B2940A3C14D9A04303B1355BBAFD1C",
                //     extName: "m4a",
                //     errcode: 0,
                //     timeLength: 292
                // }
            ],
            play: {
                hash: '',
                currentTime: 85,
                volume: 1,
                playType: 1
            }
        }
    }
})

module.exports = router
