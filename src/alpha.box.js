/**
 * Created by yanhai.wyh on 2014/4/16.
 */
(function(global,undefined){
    'use strict'
    var Box
        ,Alpha = global.Alpha
        ,A = Alpha
        ,doc = global.document
        ,util = Alpha.util;

    A.Log = {
        msg: function(msg){
            console.log(msg);
        },
        error: function(msg){
            throw msg;
        }
    }

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

    A.Canvas = util.cls('Canvas');
    A.Canvas.extend({
        _init: function(canvas){
            this._canvas = canvas;
            this._context = canvas.getContext('2d');
        },
        _initCanvas: function(){
            var u = util;
            u.setter(this,{
                shadow: '',
                type: 'fill'
            },function(name,value){
                this['_' + name] = value;
            })
        },
        clear: function(x,y,w,h){
            h === undefined ?
                this._context.clearRect(0,0,this.width || 0,this.height || 0) :
                this._context.clearRect(x || 0,y || 0,w || 0,h || 0);
        },
        setSize: function(width,height){
            this.width = width || 0;
            this.height = height || 0;
        },
        paint: function(node){
            this._context.save();
            node.way.call(node,this);
            this._context.restore();
        },
        path: function(width,callback){
            var i
                ,context = this._context
                ,list = callback
                ,len;
            if(list === undefined){
                list = width;
                width = 1;
            }
            if(util.isArr(list)){
                this.save();
                context.lineWidth = width;
                context.beginPath();
                context.moveTo(list.pop(),list.pop());
                len = list.length;
                i = 0;
                for(;i < len; i++){
                    context.lineTo(list[i],list[i++] || 0);
                }
                context.closePath();
                this.restore();
            }
            if(util.isFun(list)){
                callback.call(context,width);
            }
            return {
                fill: function(){
                    context.fill();
                },
                stroke: function(){
                    context.stroke();
                }
            }
        },
        restore: function(){
            this._context.restore();
            return this;
        },
        save: function(){
            this._context.save();
            return this;
        },
        image: function(){},
        rect: function(){},
        text: function(txt,config){
            var _defaultConfig = {


            }
        },
        createGradient: function(x0,y0,r0,x1,y1,r1){
            var gradient
                ,addColor;

            arguments.length > 4 ?
                gradient = this._context.createRadiaGradient(x0,y0,r0,x1,y1,r1) :
                gradient = this._context.createLinearGradient(x0 || 0,y0 || 0,r0 || this.width,x1 || this.height);

            addColor = function(location, color){
                    var list = location
                        ,pointer
                        ,len;
                    if(util.isArr(location)){
                        len = list.length;
                        while(len--){
                            pointer = list[0];
                            addColor(pointer.location,pointer.color);
                        }
                        return;
                    }
                    gradient.addColorStop(location || 0,color);
                }
            return addColor;
        }

    });

    A.Context = util.cls('Context');
    A.Context.extend({
        _init: function(context){
            this._context = context;
        },
        clear: function(x,y,width,height){
            this._context.clearRect(x || 0,y || 0,w || 0,h || 0);
            return this;
        },
        save: function(){
            this._context.save();
            return this;
        },
        restore: function(){
            this._context.restore();
            return this;
        },
        text: function(config){
            this
        },
        _textFactory: function(txt){
            var context = this._context;
            return {
                fill: function(){},
                stroke: function(){}
            }
        },
        fill: function(){

        },
        stroke: function(){

        }
    });

    A.Box = util.cls('Box').inhert(A.Event);
    A.Box.extend({
        _init: function(tag,type){
            A.Box._super.call(this);
            this._dom = this._createElement(tag,type);
            this.children = [];
            this._initBox();
        },
        _initBox: function(){
            var setter = util.setter;

            setter(this,{
                height: 0,
                width: 0
            },function(name,value){
                this._dom.style[name] = value + 'px';
                this._dom[name] = value;
            });

            setter(this,{
                display:'block'
            },function(name,value){
                this._dom.style[name] = value;
            });
        },
        _createElement: function(tag,type){
            var dom = doc.createElement(tag);

            dom.style.padding = '0px';
            dom.style.margin = '0px';
            dom.style.background = 'transport';
            dom.style.listStyle = 'none';
            dom.style.border = 'none';
            dom.style.position = 'absolute';
            dom.style.left = '0px';
            dom.style.top = '0px';
            dom.setAttribute('node-type',type);

            return dom;
        },
        del: function(child){
            var children = this.children
                ,index = util.inArr(child,children);

            if(index != -1){
                children.splice(index,1);
                child.parent = undefined;
                return true;
            }

        },
        add: function(child){
            var args = util.toArr(arguments)
                ,i = 0
                ,children
                ,len = args.length;

            if(len > 1){
                for(;i < len;i++){
                    this.add(arg[i]);
                }
                return;
            }

            if(child.parent){
                child.move(this);
                return;
            }

            child.parent = this;
            this.children.push(child);
            child.fire('add');

            return this;
        },
        setSize: function(width,height){
            this.width = width;
            this.height = height;
            return this;
        }
    });

    A.Stage = util.cls('Stage').inhert(A.Box);
    A.Stage.extend({
        _init: function(config){
            A.Stage._super.call(this,'div','stage');
            config.container.appendChild(this._dom);

            this.nodeType = 'stage';
            this.setSize(config.width,config.height);
        },
        add: function(child){
            var args = util.toArr(arguments)
                ,len = args.length
                ,i = 0;

            if(len > 1){
                for(;i < len;i++){
                    this.add(args[i]);
                }
                return;
            }

            A.Box.prototype.add.call(this,child);
            child.setSize(this.width,this.height);
            this._dom.appendChild(child._dom);

            return this;
        }
    });

    A.Layer = util.cls('Layer').inhert(A.Box);
    A.Layer.extend({
        _init: function(config){
            A.Layer._super.call(this,'canvas','layer');
            this.nodeType = 'layer';
            this._canvas = A.Canvas.inst(this._dom);
            this._bufferCanvas = A.Canvas.inst(doc.createElement('canvas'));
        },
        del: function(child){

            if(A.Box.prototype.del.call(this,child)){
                this._dom.removeChild(child._dom);
                return true;
            }

        },
        remove: function(){
            if(this.parent){
                this.parent.del(this);
                this.fire('reomve');
            }
        },
        move: function(parent){
            this.remove();
            parent.add(this);
            return this;
        },
        setSize: function(width,height){
            A.Box.prototype.setSize.apply(this,arguments);
            this._canvas.setSize(width,height);
            this._bufferCanvas.setSize(width,height);
            return this;
        }
    });

    A.Node = util.cls('Node').inhert(A.Event);
    A.Node.extend({
        _init: function(config){
            A.Node._super.call(this);
            this._context;
            this._initNode();
            this.scaleX = config.scaleX;
            this.scaleY = config.scaleY;
            this.rotate = config.rotate;
            this.opacity = config.opacity;
        },
        _initNode: function(){
            var setter = util.setter;

            setter(this,{
                shadow:{
                    color: '',
                    offsetX: 0,
                    offsetY: 0,
                    blur: 0
                },
                rotate: 0,
                scaleX: 0,
                scaleY: 0,
                opacity: 0
            },function(name,value){
                name = '_' + name;
                if(this[name] === value){
                    return;
                }
                this[name] = value;
                this.fire('change');
            });
            setter(this.shadow = {},{
                color: 'black',
                offsetX: 0,
                offsetY: 0,
                blur: 0
            },function(name,value){
                name = '_' + name;
                this.shadow[name] = value;
            });
        }

    });

    A.Text = util.cls('Text').inhert(A.Node);
    A.Text.extend({
        _init: function(config){
            A.Text._super.call(this,config);
            this._initText();
            this.text = config.text;
            this.fill = config.fill;
            this.stroke = config.stroke;
            this.font = config.font;
            this.size = config.size;
            this.align = config.align;
        },
        _initText: function(){
            var setter = util.setter;
            setter(this,{
                width: '',
                text: '',
                font: '',
                size: '',
                color:'',
                align: ''
            },function(name,value){
                name = '_' + name;
                this[name] = value;
                this.fire('change');
            });
        },
        _paintMethod: function(context){
            context.font = this.size + ' ' + this.font;
            context.li
        }

    })

    A.Image = util.cls('Image').inhert(A.Node);
    A.Image.extend({
        _init: function(config){
            A.Image._super.call(this,config);
            this.nodeType = 'Image';
            this.initImage();
            this.src = config.src;
        },
        _initImage: function(){
            var u = util;

            u.setter(this,{
                sourX: 0,
                sourY: 0,
                sourW: 0,
                sourH:0,
                destX: 0,
                destY: 0,
                destW: 0,
                destH:0,
                src : null
            },function(name,value){
                name = '_' + name;
                if(this[name] === value){
                    return;
                }
                this[name] = value;
                this.fire('change');
            });
        }
    });

    A.Shape = util.cls('Shape').inhert(A.Node);
    A.Shape.extend({
        _init: function(){
            A.Shape._super.call(this,config)
        },
        _initShape: function(){
            var setter = util.setter;
            setter(this,{
                fillStyle: '',
                strokeStyle: ''
            },function(name,value){
                name = '_' + name;

            });
        }
    });

    A.Rect = util.cls('Rect').inhert(A.Shape);
    A.Rect.extend({
        _init: function(config){
            A.Rect._super.call(this,config);
        }
    });



})(this,undefined)
