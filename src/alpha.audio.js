/**
 * Created by yanhai.wyh on 2014/4/25.
 */

(function(global,undefined){
    var Alpha = global.Alpha
        ,A = Alpha
        ,doc = global.document
        ,util = A.util;

    A.Audio = util.cls('Audio').inhert(A.Event);
    A.Audio.extend({
        _init: function(config){
            var self = this;

            A.Audio._super.call(this);
            this._audio = doc.createElement('audio');
            this._audio.setAttribute('preload','load');
            if(!this._audio.canPlayType){
                return;
            }
            this.state = 0;
            this.auto = config.auto || false;

            this.buffer = (config.buffer = global.Math.abs(config.buffer)) ?
                config.buffer > 30 ?
                    30 : config.buffer < 10 ? 10 :config.buffer : 10;

            this._bindAudioEvent();
            this._bindBuffering();

            if(this.auto){
                global.setTimeout(function(){
                    self.play();
                },0)
            }
        },
        _calculate: function(){
            var audio = this._audio
                ,buffered = audio.buffered
                ,current = audio.currentTime
                ,duration = audio.duration
                ,buffer = this.buffer
                ,start
                ,end
                ,len = buffered.length
                ,i = 0;
            if(!len){
                return false;
            }
            for(;i < len;i++){
                start = buffered.start(0);
                end = buffered.end(0);
                if(current >= start && current <= end){
                    break;
                }
            }

            return end === duration ?
                true : end - current >= buffer
                ?  true : false;
        },
        _bindAudioEvent: function(){
            var list = ['loadstart', 'progress', 'error', 'timeupdate', 'ended', 'loadedmetadata', 'canplaythrough']
                ,len = list.length
                ,self = this
                ,i = 0;
            while(len--){
                (function(name,self){
                    self._audio.addEventListener(name,function(){
                        var callback = self['_' + name];
                        if(callback){
                            callback.call(self);
                        }
                    },false);
                })(list[len],self);
            }
        },
        _bindBuffering: function(){
            this.once('bufferingEvent',function(){
                this.pause();
                this._bindBuffered();
            });
        },
        _bindBuffered: function(){
            this.once('bufferedEvent',function(){
                this.play();
                this.fire('buffered');
                this._bindBuffering();
            });
        },
        _progress: function(){
            if(this.state > 1){
                if(!this._calculate()){
                    this.fire('bufferingEvent');
                    this.fire('buffering');
                    return;
                }
                this.fire('bufferedEvent');
            }
        },
        _loadstart: function(){
        },
        _loadedmetadata: function(){
            this.state = 1;
            this.fire('connected');
            this.play();
        },
        play: function(){
            switch(this.state){
                case 0:
                    if(this.url){
                        this._audio.src = this.url;
                        this.fire('connecting');
                    }
                    break;
                case 3:
                case 1:
                    this._audio.play();
                    this.state = 2;
                    this.fire('play');
                    break;
                default :
                    break;
            }
            return this;
        },
        pause: function(){
            if(this.state === 2){
                this._audio.pause();
                this.state = 3;
                this.fire('pause');
            }
            return this;
        },
        stop: function(){
            switch(this.state){
                case 2:
                case 3:
                    this._audio.pause();
                    this._audio.dutation = 0;
                    this.state = 0;
                    this.fire('stop');
                    break;
            }
        },
        volume: function(value){
            if(util.isNum(value)){
                this._audio.volume = value;
                this.fire('volume');
            }
            return this;
        },
        choose:function(current){
            if(this.state){
                if(util.isNum(current)){
                    this._audio.pause();
                    this._audio.currentTime = current < 0 ?
                        0 : current > this._audio.duration ?
                        this._audio.duration : current;
                    this.fire('choose');
                    this.state = 1;
                    this._process();
                }
            }
            return this;
        },
        setCurrentTime: function(current){
            if(util.isNum(current)){
                this._audio.currentTime = current;
            }
            return this;
        },
        setVolume: function(volume){
            if(util.isNum(volume)){
                this._audio.volume = volume;
            }
            return this;
        },
        getCurrentTime: function(){
            return this._audio.currentTime;
        },
        getDuration: function(){
            return this._audio.duration;
        },
        getVolume: function(){
            return this._audio.volume;
        },
        getState: function(){
            return this.state;
        }
    })
})(this,undefined);
