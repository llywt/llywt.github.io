//接口https://autumnfish.cn/search?keywords="五月天"
//音乐接口https://autumnfish.cn/song/url?id=
//封面接口https://autumnfish.cn/song/detail?ids=
//评论获取https://autumnfish.cn/comment/hot?type=0,id=
//mv接口  https://autumnfish.cn/mv/url?id=
var app = new Vue({
    el:"#app",
    data:{
        values:"大风吹",
        //相关歌曲数组
        searchList:[],
        //歌曲的src
        musicSrc:"",
        //封面的src
        imgcover:"",
        commentsList:[],
        commentscover:"",
        isShow:false,
        isShows:true,
        isMv:false,
        //歌曲名
        songs:"",
        //mv地址
        mvSrc:"",
        //播放暂停事件封面动画
        isPlaying:false,
        //li添加索引的
        indexs:null
    },
    methods:{
       //歌曲搜索
       keyupEnter:function () {
           //清空indexs防止切换列表的时候样式保留
           this.indexs = null;
           this.isShows=false;
           var that = this;
           axios.get("https://autumnfish.cn/search?keywords="+this.values)
           .then(function(response){
               //获取歌曲的id
                that.searchList=response.data.result.songs
           },function(err){})
       },
       //歌曲播放
       autoPlay:function(musicId,indexs,names){
           this.songs = names.name
           this.indexs = indexs
           //拿到歌曲musicId
            // console.log(musicId);
            this.isShow=true
            var that = this
            axios.get("https://autumnfish.cn/song/url?id="+musicId)
            .then(function(srcs){
                //console.log(srcs.data.data[0]);
                //获取歌曲的url
                that.musicSrc=srcs.data.data[0].url
            },function(err){})
            //封面获取
            axios.get("https://autumnfish.cn/song/detail?ids="+musicId)
            .then(function (bg) {
                that.imgcover = bg.data.songs[0].al.picUrl
            },function (err) {alert('获取封面失败')})

            //评论获取
            axios.get("https://autumnfish.cn/comment/hot?type=0&id="+musicId)
            .then(function(response){
                that.commentsList=response.data.hotComments;
            },function(err){})
       },
       //播放mv
       playMV:function(mvid){
           this.isMv=true
           var that = this
           //li加样式

           //播放mv暂停音乐

           axios.get("https://autumnfish.cn/mv/url?id="+mvid)
           .then(function (response) {
               that.mvSrc=response.data.data.url;
               console.log(that.mvSrc);
            },function(err){})
       },
       //关闭mv
       close:function(){
           this.isMv=false
       },
       //歌词封面旋转
       plays(){
           this.isPlaying=true
       },
       stops(){
           this.isPlaying=false
       }

    }
})