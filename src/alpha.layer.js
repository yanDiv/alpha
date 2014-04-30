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

    A.Layer = util.cls('Layer').inhert(A.PackBox);
    A.Layer.extend({
        _init: function(id,width,height){
            A.Layer._super.call(this,width,height);
            this._div = doc.createElement('canvas');
            this._
        },
        setSize: function(width,height){
            this.width = width;
            this.height = height;
            this
        }
    });
})(this,undefined)
