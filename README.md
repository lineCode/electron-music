# electron-music
react16+electron架构的音乐播放器
自己没有音乐库，就爬了酷狗的wap库（wap的api直接可用，哈哈），因为不太稳定，后面将全面采用koa爬取网易云或者qq音乐的库

## 使用
````
// npm 或 cnpm, 使用到sass win用户npm安装失败请使用cnpm
// 自行安装electron-packager
$ npm i -g electron-packager

$ git clone https://github.com/sliwei/electron-music.git
$ cd electron-music && npm i
$ npm run start
$ npm run ele

// 打包(清除build文件夹里面的js/css)
$ npm run build
$ npm run package

// 生成exe可执行程序：会在client目录下生成electronMusic win可运行文件夹
// 打包exe安装程序：再使用Advanced Installer 类似exe打包软件打包
````
## 功能点

* 播放    90%
* 播放歌曲页面
* 登录注册
* 个人歌单（歌曲）
* 推荐    100%
* 榜单    100%
* 歌单    100%
* 歌手    50%
* 声音
* MV
* 播放列表
* 软件基本功能
* 搜索 10%
* 歌词 80%
* 分享
* 音乐库

### 主页图

![Alt text](http://bstu.oss-cn-shenzhen.aliyuncs.com/QQ%E6%88%AA%E5%9B%BE20171206194755.png?Expires=1515147532&OSSAccessKeyId=TMP.AQHg3iWxY6nweubBK0PX8Xq8G--CffjPsDrntVheQ5EG0PVSox5C0CpVXSOIADAtAhUAmU-6zniyTxU6j5SoVBo9PbQEue8CFHvvb-KsebyOT842wPemCCC-8jrs&Signature=yJsMEiz5b4ht3jFgnIVaVCpP7Cg%3D)

![Alt text](http://bstu.oss-cn-shenzhen.aliyuncs.com/QQ%E6%88%AA%E5%9B%BE20171208195939.png?Expires=1515147557&OSSAccessKeyId=TMP.AQHg3iWxY6nweubBK0PX8Xq8G--CffjPsDrntVheQ5EG0PVSox5C0CpVXSOIADAtAhUAmU-6zniyTxU6j5SoVBo9PbQEue8CFHvvb-KsebyOT842wPemCCC-8jrs&Signature=IEK70lrGuwGzWHcMmnJN6gG1HEY%3D)

### 流程图

![Alt text](http://bstu.oss-cn-shenzhen.aliyuncs.com/%E6%9C%AA%E5%91%BD%E5%90%8D%E6%96%87%E4%BB%B6.png?Expires=1515147583&OSSAccessKeyId=TMP.AQHg3iWxY6nweubBK0PX8Xq8G--CffjPsDrntVheQ5EG0PVSox5C0CpVXSOIADAtAhUAmU-6zniyTxU6j5SoVBo9PbQEue8CFHvvb-KsebyOT842wPemCCC-8jrs&Signature=5ZGlnwyNmwO3gjT%2BuWra4afCTj8%3D)
