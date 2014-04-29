/**
 * Created by yanhai.wyh on 2014/4/16.
 */
(function(global,undefined){
    'use strict'
    var Box
        ,Alpha = global.Alpha
        ,A = Alpha
        ,util = Alpha.util;

    A.Event = util.cls('Event');
    A.Event.extend({
        _init: function(){
            this._eventCache = {};
        },
        on: function(type,callback){
            var list;

            if(util.isFun(callback)){
                list = this._eventCache[type];

                if(list === undefined){
                    list = this._eventCache[type] = [];
                }

                list.push(callback);
            }

            return this;
        },
        off: function(type,callback){
            var list
                ,index;

            if(callback === undefined){
                delete this._eventCache[type];
                return this;
            }

            if(util.isFun(callback)){
                list = this._eventCache[type];

                if(list === undefined){
                    return this;
                }

                index = util.inArr(callback,list);

                if(index == -1){
                    return this;
                }

                list.splice(index,1);

                if(list.length == 0){
                    delete this._eventCache[type];
                }
            }
            return this;
        },
        once: function(type,callback){
            var self = this
                ,_cback = function(){
                    callback.apply(self,arguments);
                    self.off(type,_cback);
                }
            return this.on(type,_cback);
        },
        fire: function(type,args){
            var list
                ,callback
                ,i
                ,args = util.toArr(arguments).slice(1)
                ,len;

            if(type){
                list = this._eventCache[type];

                if(list === undefined){
                    return this;
                }

                i = 0
                len = list.length;
                while(i < len){
                    callback = list[i++].apply(this,args);
                }

            }
            return this;
        }
    });


})(this,undefined)
