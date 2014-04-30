/**
 * Created by yanhai.wyh on 2014/4/25.
 */

(function(global,undefined){
    var Alpha = global.Alpha
        ,A = Alpha
        ,doc = global.document
        ,util = A.util
        ,_splite_time_reg = /\[\d{2}:\d{2}(\.|\:)\d{2}\]/g
        ,_get_time_reg = /\d{2}:\d{2}(\.|\:)\d{2}/g
        ,_art_reg = /\[ar:(.*)\]/g
        ,_title_reg = /\[ti:(.*)\]/g
        ,_album_reg = /\[al:(.*)\]/g
        ,_by_reg = /\[by:(.*)\]/g;

    A.Lyric = util.cls('Lyric');
    A.Lyric.extend({
        _init: function(config){
            this.lyric = config.lyric || '';
            this.format = config.format || 'lrc';
            this.enter = '\n';
        },
        decompose: function(){
            var i = 0
                ,lyric = this.lyric.split(this.enter)
                ,len = lyric.length
                ,head = {}
                ,body = [];

            for(;i < len;i++){
                if(/\[\d{2}:\d{2}(\.|\:)\d{2}/g.test(lyric[i])){

                }
            }
        },
        parse: function(){
            var i = 0
                ,lyric = this.lyric
                ,length = lyric.length
                ,key = []
                ,value = {}
                ,pointer
                ,self = this;

            for(;i < len;i++){
                pointer = lyric[i];

                (function(){
                    var i = 0
                })()
            }
            var i, len, t, l, e, self, v, k;
            self = this;
            i = 0;
            len = data.length;
            k = [];
            v = {};
            for (; i < len; i++) {
                l = data[i];
                t = l.match(/\d{2}:\d{2}((\.|\:)\d{2})/g);
                e = l.split(l.match(/\[\d{2}:\d{2}((\.|\:)\d{2})\]/g).join(''))[1];
                (function (t, e) {
                    var i, len, c, s, p;
                    i = 0;
                    len = t.length;
                    for (; i < len; i++) {
                        p = t[i].split(':');
                        c = (((p[0] - 0) * 60) + (p[1] - 0));
                        k.push(c);
                        v[c] = e;
                    }
                })(t, e)
            }
            return [k, v];
        }
    })
})(this,undefined);
