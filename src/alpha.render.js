/**
 * Created by yanhai.wyh on 2014/4/16.
 */
(function(global,undefined){
    'use strict'
    var Alpha = global.Alpha
        ,doc = global.document
        ,A = Alpha
        ,util = Alpha.util
        ,_properties_ = Object.defineProperties
        ,_property_ = Object.defineProperty;

    (function(){

    })();
    A.Render = util.cls('Stage');
    A.Render.include('static',{
            renderWrap: function(key){
                return function(){
                    var list = this['_'+key]
                        ,pointer
                        ,len = list.length
                        ,i = 0;
                    for(;i < len;i++){
                        pointer = list.shift();
                        pointer['_'+key].call(pointer);
                    }
                    return this;
                }
            }
        })
        .include({
            _init: function(stage){
                stage.render = this;
                this._paint = [];
                this._animate = [];
                this._sprite = [];
                this._order = {
                    paint: null,
                    animate: null,
                    sprite: null
                };
                this._frame =  global.requestAnimationFrame
                    || global.mozRequestAnimationFrame
                    || global.webkitRequestAnimationFrame
                    || global.msRequestAnimationFrame
                    || global.oRequestAnimationFrame
                    || function(callback) {
                        global.setTimeout(callback, 1000 / 60);
                    };
            },
            _paint_: A.Render.renderWrap('paint'),
            _animate_: A.Render.renderWrap('animate'),
            _sprite_: A.Render.renderWrap('sprite'),
            push: function(key,value){
                var list
                    ,self = this
                    ,index;
                if(value === undefined){
                    return this;
                }
                list = this['_' + key];
                index = util.inArr(value,list);
                if(index == -1){
                    list.push(value);
                    key == 'paint' ?
                        this._order.paint = this._paint_ :
                        key == 'animate' ?
                            this._order.animate = this._animate_ :
                            this._order.sprite = this._sprite_;
                    if(!this._timer){
                        this._timer = this._frame.call(global,function(){
                            var _that = self
                                ,order = _that._order;
                            if(order.animate){
                                order.animate.call(_that);
                                order.animate = null;
                            }
                            if(order.sprite){
                                order.sprite.call(_that);
                                order.sprite = null;
                            }
                            if(order.paint){
                                order.paint.call(_that);
                                order.paint = null;
                            }
                            _that._timer = null;
                        })
                    }
                }
                return this;
            }
        });
})(this,undefined)
