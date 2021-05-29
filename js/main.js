//接口https://autumnfish.cn/search?keywords="五月天"
//音乐接口https://autumnfish.cn/song/url?id=
//封面接口https://autumnfish.cn/song/detail?ids=
//评论获取https://autumnfish.cn/comment/hot?type=0,id=
//mv接口  https://autumnfish.cn/mv/url?id=
window.onload = function () {
    //sconsole.log(document.documentElement.clientHeight);
    $('#app').css('height', document.documentElement.clientHeight)
    //全局组件定义
    Vue.component('com1', {
        template: '#temp2',
        data() {
            return {
                songname: "汪苏泷",
                num: 1,
                //lis[]中包含歌名 和id
                list: [],
                musicUrl: '',
                songsname: '',
                picUrl: '',
                mv: "",
                index: null
            }
        },
        methods: {
            cominput() {
                //通过组件绑定属性来调用实例中的方法
                this.$emit('func')
            },
            keyup() {
                axios.get('https://autumnfish.cn/search?keywords=' + this.songname).then(
                    (res) => {
                        this.list = res.data.result.songs
                        localStorage.setItem('list1', JSON.stringify(this.list))
                    })
            },
            clickSongName(a, index) {
                //用item.id拿到歌曲的id
                axios.get('https://autumnfish.cn/song/url?id=' + a).then(
                    (res) => {
                        this.musicUrl = res.data.data[0].url
                        this.$emit('fun')
                    })
                this.index = index
                axios.get("https://autumnfish.cn/song/detail?ids=" + a).then(
                    (res) => {
                        var list1 = JSON.parse(localStorage.getItem('list1'))
                        this.songsname = list1[this.index].name
                        //歌曲封面
                        this.picUrl = res.data.songs[0].al.picUrl
                        this.$emit('fun')
                        // console.log(res.data.songs[0].mv);
                    }
                )

            },
            playmv(a) {
                //console.log(a);
                axios.get('https://autumnfish.cn/mv/url?id=' + a).then((res) => {
                    //console.log(res.data.data.url);
                    this.mv = res.data.data.url
                    this.$root.mv = this.mv
                    this.$root.page5 = true
                    this.$root.page4 = false
                    this.$root.footer = false
                    this.$root.coms2 = false
                })

            }
        }
    })

    // com2 
    var box = {
        template: '#temp3',
        data() {
            return {
                //播放器的url地址
                url: "",
                songname: "",
                picUrl: './img/cover.jpg',
                play: true,
                oldurl: ''
            }
        },
        methods: {
            stop() {
                this.play = !this.play
                var a = this.play
                if (a) {
                    this.url = ''
                } else if (this.oldurl == '') {
                    this.play = true
                    this.$root.clickpic(this.$root.list[0].id, this.songname, 0)
                } else {
                    this.url = this.oldurl
                }
            },
            lastsong() {
                //下一去 只需要修改com1里面的musicUrl和index就行了
                this.$emit('func')
            }
        },
        watch: {
            url(news, old) {
                //console.log(news);
                //console.log(old);
                this.oldurl = old
            }
        },
        created() {
            this.songname = this.$root.list[0].name
        }
    }
    var app = new Vue({
        el: '#app',
        data: {
            page1: true,
            page2: false,
            page3: false,
            page4: false,
            page5: false,
            footer: true,
            coms2: true,
            musicSrc: '',
            cover: "img/cover.jpg",
            mv: '',
            list: [],
            //首页歌单封面
            picurl: [],
            fade: true
        },
        methods: {
            changepage1() {
                this.page1 = true
                this.page3 = this.page2 = this.page4 = false
                this.$refs.com1.list = []
                this.$refs.com1.$el.style.display = "block"
            },
            changepage2() {
                this.page2 = true
                this.page3 = this.page1 = this.page4 = false
                this.$refs.com1.list = []
                this.$refs.com1.$el.style.display = "block"
            },
            changepage3() {
                this.page3 = true
                this.page2 = this.page1 = this.page4 = false
                this.$refs.com1.list = []
                //console.log(this.$refs.com1.musicUrl);
                this.$refs.com1.$el.style.display = "none"
            },
            abc() {
                this.page5 = false
                this.footer = this.coms2 = this.page4 = true
            },
            //数据传递
            changepage4() {
                this.page1 = this.page2 = this.page3 = false
                this.page4 = true
            },
            musicUrl() {
                //将com1中的url赋值给com2的url
                this.$refs.com2.songname = this.$refs.com1.songsname
                //播放器的url是歌曲列表的musicUrl
                this.$refs.com2.url = this.$refs.com1.musicUrl
                //console.log(this.$refs.com1.musicUrl);
                this.$refs.com2.picUrl = this.$refs.com1.picUrl
                this.$refs.com2.play = false
                this.cover = this.$refs.com1.picUrl
            },
            lastsongs() {
                var list1 = JSON.parse(localStorage.getItem('list1'))
                this.list = list1
                var len = list1.length
                if (this.$refs.com1.index < len - 1) {
                    this.$refs.com1.index++
                } else {
                    this.$refs.com1.index = 0
                }
                this.$refs.com1.clickSongName(list1[this.$refs.com1.index].id, this.$refs.com1.index)
                this.$refs.com2.songname = list1[this.$refs.com1.index].name
            },
            clickpic(id, name, i) {
                axios.get('https://autumnfish.cn/song/url?id=' + id).then(
                    (res) => {
                        console.log(res);
                        console.log(res.data.data[0].url);
                        this.$refs.com2.url = res.data.data[0].url
                        this.$refs.com2.songname = name
                        this.$refs.com2.play = false
                    })
                axios.get("https://autumnfish.cn/song/detail?ids=" + id).then(
                    (res) => {
                        this.cover = res.data.songs[0].al.picUrl
                        this.$refs.com2.picUrl = res.data.songs[0].al.picUrl
                    }
                )
            }
        },
        components: {
            com2: box
        },
        created() {
            var list1 = JSON.parse(localStorage.getItem('list1'))
            this.list = list1
            //console.log(this.list.length);
            for (var i = 0; i < this.list.length; i++) {
                //console.log(this.list[i].id);
                //console.log(this.list[i].name);
                var ids = this.list[i].id
                axios.get("https://autumnfish.cn/song/detail?ids=" + ids).then(
                    (res) => {
                        //var list1 = JSON.parse(localStorage.getItem('list1'))
                        //this.songsname = list1[this.index].name
                        //歌曲封面
                        this.picurl.push(res.data.songs[0].al.picUrl)
                    }
                )
            }
        }
    })



    //轮播图
    var mySwiper = new Swiper('.swiper-container', {
        direction: 'vertical', // 垂直切换选项
        loop: true,
        autoplay: true,
        // 如果需要分页器
        pagination: {
            el: '.swiper-pagination',
        },

        // 如果需要前进后退按钮
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },

        // 如果需要滚动条
        scrollbar: {
            el: '.swiper-scrollbar',
        },
    })
}
