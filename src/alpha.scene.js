/**
 * Created by yanhai.wyh on 2014/4/16.
 */
(function(global,undefined){
    'use strict'
    var Alpha = global.Alpha
        ,doc = global.document
        ,crtElem = doc.createElement
        ,A = Alpha
        ,util = Alpha.util
        ,_properties_ = Object.defineProperties
        ,_property_ = Object.defineProperty;

    A.Scene = util.cls('Scene').inhert(A.PackBox);
    A.Scene.extend({
        _init: function(id,width,height){
            A.Scene._super.call(this,width,height);
        },
        add: function(layer){
            var index;
            if(layer && layer.nodeType == 'layer'&& layer.parent){
                index = util.inArr(layer,this.children);
                if(index == -1){
                    this.children.push(layer);
                    this._div.appendChild(layer._div);
                    layer.parent = this;
                }
            }
            return this;
        },
        del: function(layer){
            var index = util.inArr(layer,this.children);
            if(index != -1){
                this.children.splice(index,1);
                this._div.removeChild(layer);
                layer.parent = null;
            }
        }
    });


})(this,undefined)
