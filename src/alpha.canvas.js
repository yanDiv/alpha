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

    A.Canvas = util.cls('Canvas');
    A.Canvas.extend({
        _init: function(id,width,height){
            this._canvas = doc.createElement('canvas');

        },
        _initCanvas: function(){

        },
        setSize: function(width,height){
            this.width = width;
            this.height = height;
        }
    });
})(this,undefined)
