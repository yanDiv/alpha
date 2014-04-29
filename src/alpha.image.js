/**
 * Created by yanhai.wyh on 2014/4/16.
 */
(function(global,undefined){
    'use strict'
    var Box
        ,Alpha = global.Alpha
        ,A = Alpha
        ,doc = global.document
        ,util = Alpha.util
        ,_properties_ = Object.defineProperties
        ,_property_ = Object.defineProperty;

    A.Image = A.NodeBox.extend('Image')
        .include({})
        .include({
            _init: function(config,_super){
                _super.call(this);
                this.nodeType = 'image';
                this._initImagePorp();
                util.clone(this,config || {});
            },
            _initImagePorp: function(){
                var _prop = _property_
                    ,storage = {
                        destLeft: undefined,
                        destTop: undefined,
                        destWidth: undefined,
                        destHeight: undefined,
                        sourceLeft: undefined,
                        sourceTop: undefined,
                        sourceWidth: undefined,
                        sourceHeight: undefined,
                        left: 0,
                        right: 0,
                        width: 0,
                        height: 0,
                        src:null
                    }
                _prop(this,'destLeft',{
                    get: function(){
                        return storage.destLeft
                    },
                    set: A.NodeBox._propWrap(storage,'destLeft')
                });
                _prop(this,'destTop',{
                    get: function(){
                        return storage.destTop;
                    },
                    set: A.NodeBox._propWrap(storage,'destTop')
                });
                _prop(this,'destWidth',{
                    get: function(){
                        return storage.destWidth
                    },
                    set: A.NodeBox._propWrap(storage,'destWidth')
                });
                _prop(this,'destHeight',{
                    get: function(){
                        return storage.destHeight;
                    },
                    set: A.NodeBox._propWrap(storage,'destHeight')
                });
                _prop(this,'sourceLeft',{
                    get: function(){
                        return storage.sourceLeft;
                    },
                    set: A.NodeBox._propWrap(storage,'sourceLeft')
                });
                _prop(this,'sourceTop',{
                    get: function(){
                        return storage.sourceTop;
                    },
                    set: A.NodeBox._propWrap(storage,'sourceTop')
                });
                _prop(this,'sourceWidth',{
                    get: function(){
                        return storage.sourceWidth;
                    },
                    set: A.NodeBox._propWrap(storage,'sourceWidth')
                });
                _prop(this,'sourceHeight',{
                    get: function(){
                        return storage.sourceHeight;
                    },
                    set: A.NodeBox._propWrap(storage,'sourceHeight')
                });
                _prop(this,'left',{
                    get: function(){
                        return storage.left;
                    },
                    set: A.NodeBox._propWrap(storage,'left')
                });
                _prop(this,'top',{
                    get: function(){
                        return storage.top;
                    },
                    set: A.NodeBox._propWrap(storage,'top')
                });
                _prop(this,'width',{
                    get: function(){
                        return storage.width;
                    },
                    set: A.NodeBox._propWrap(storage,'width')
                });
                _prop(this,'height',{
                    get: function(){
                        return storage.height;
                    },
                    set: A.NodeBox._propWrap(storage,'height')
                });
                _prop(this,'src',{
                    get: function(){
                        return storage.src;
                    },
                    set: A.NodeBox._propWrap(storage,'src')
                });
            },
            _paintWay: function(context){
                if(!this.src){
                    return;
                }
                context.scale(this.scaleX,this.scaleY);
                context.globalAlpha = this.alpha;
                context.rotate(this.rotate);
                context.drawImage(this.src,this.left,this.right,this.width,this.height);
                return this;
            }
        })

})(this,undefined)
