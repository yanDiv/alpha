/**
 * Created by yanhai.wyh on 2014/4/25.
 */

(function(global,undefined){
    var Alpha = global.Alpha
        ,A = Alpha
        ,doc = global.document
        ,util = A.util;

    A.Music = util.cls('Music').inhert(A.Audio);
    A.Music.extend({
        _init: function(config){
            A.Music._super.call(this,config);
            this.current = config.current || 0;
            this.loop = config.loop || false;
            this.list = config.list || [];
            this.name = config.name || 'music-control';
        },
        play: function(){
            this.url = this.list[this.current];
            if(this.url){
                A.Audio.Fn.play.call(this);
            }
            return this;
        },
        next: function(){
            this.stop();
            if(!this.loop){
                this.current++;
                if(this.current > this.list.length -1){
                    this.current = 0;
                }
            }
            this.play();
            return this;
        },
        prev: function(){
            this.stop();
            if(this.loop){
                this.current--;
                if(this.currrent < 0){
                    this.current = this.list.length - 1;
                }
            }
            this.play();
            return this;
        },
        listen: function(object){
            var self = this;
            if(util.isStr(object)){
                object = doc.getElementById(object);
            }
            if(object){
                object.addEventListener('click',function(e){
                    var name = e.target.getAttribute(self.name)
                        ,callback = self[name];
                    if(callback){
                        callback.call(self);
                    }
                },false);
            }
            return this;
        }
    })
})(this,undefined);
