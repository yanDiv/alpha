/**
 * Created by yanhai.wyh on 2014/4/16.
 */
(function(global,undefined){
    'use strict'
    var Alpha = {}
        ,util = {}
        ,_array_ = []
        ,_object_ = {}
        ,_hasOwn_ = _object_.hasOwnProperty
        ,_slice_ = _array_.slice
        ,_toString_ = _object_.toString
        ,_trim_ = ''.trim
        ,_indexOf_ = _array_.indexOf
        ,_type
        ,isBln
        ,isObj
        ,isFun
        ,isStr
        ,isArr
        ,isNum;

    _type = (function(){
        var typeList = "Boolean Number String Function Array Date RegExp Object Error".split(" ")
            ,pointer
            ,type = {}
            ,len = typeList.length;

        while(len--){
            pointer = typeList[len];
            type["[object " + pointer + "]"] = pointer.toLowerCase();
        }
        return function(object){
            return object == null ?
                object + '' :
                typeof object == 'object' ?
                    type[_toString_.call(object)] :
                    typeof object;
        }
    })();

    function _isWrap(type){
        return function(object){
            return _type(object) == type;
        }
    }

    isBln = _isWrap('boolean');
    isObj = _isWrap('object');
    isFun = _isWrap('function');
    isStr = _isWrap('string');
    isArr = _isWrap('array');
    isNum = _isWrap('number');

    function isEmptyObj(object){
        var i;
        for( i in  object){
            return false;
        }
        return true;
    }

    function toArr(object){
        return _slice_.call(object,0);
    }

    function inArr(val,arr){
        var len = arr.length;
        if(_indexOf_){
            return _indexOf_.call(arr,val);
        }

        while(len--){
            if(val === arr[len]){
                return len;
            }
        }
        return -1;
    }

    function unArr(arr){
        var ret = []
            ,p
            ,val
            ,index;
        if(arr.length == 1){
            return arr;
        }
        while(p = arr.shift()){
            index = inArr(p,ret);
            if(index == -1){
                ret.push(p);
            }
        }
        return ret;
    }

    function each(object,callback){
        var i,p;
        if(isArr(object)){
            i = object.length;
            while(i--){
                p = object[i];
                if(callback.call(p,i,p) === false){
                    break;
                }
            }
        }
    }

    function trim(object){
        if(isStr(object)){
            return _trim_ ? _trim_.call(object) :
                object.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,'');
        }
        return object;
    }

    function clone(deep,target,source){
        var args,deep,len, i,pointer;

        args = toArr(arguments);
        deep = args.shift();

        if(isBln(deep)){
            target = args.shift();
            deep = true;
        }
        else{
            target = deep;
            deep = false;
        }

        len = args.length;

        while(len--){
            source = args.shift();
            if(isArr(target) && isArr(source)){
                i = target.length;
                while(i--){
                    if(deep){
                        callee(deep,target[i] = [],source[i]);
                        continue;
                    }
                    target[i] = source[i];
                }
            }
            else{
                for(i in source){
                    pointer = source[i];
                    if(!_hasOwn_.call(source,i)){
                        continue
                    }
                    if(deep){
                        if(isArr(pointer)){
                            callee.call(deep,target[i] = [],source[len]);
                            continue;
                        }
                        if(isObj(pointer)){
                            callee(deep,target[i] = {},source[i]);
                            continue;
                        }
                        target[i] = source[i];
                    }
                    target[i] = source[i];
                }
            }
        }
        return target;
    }

    function setter(obj,list,after){
        var name
            ,desc = {};
        for(name in list){
            obj['_' + name] = list[name];
            (function(name){
                desc[name] = {
                    set: function(value){
                        obj['_' + name] = value;
                        if(after){
                            after.call(obj,name,value);
                        }
                    },
                    get: function(){
                        return this['_' + name];
                    }
                }
            })(name);
        }
        Object.defineProperties(obj,desc)
    }

    function cls(name){
        var clz = {
                prototype: {},
                _className: name,
                inhert: function(parent){
                    this.prototype = clone(_proto_(parent.prototype),this.prototype);
                    this.prototype.constructor = this;
                    this.Fn = this.prototype;
                    this._super = parent.prototype._init;
                    return this;
                },
                extend: function(proto){
                    if(isEmptyObj(proto)){
                        return;
                    }
                    clone(this.prototype,proto);
                    return this;
                },
                inst: function(){
                    var inst = _proto_(this.prototype);
                    inst._init.apply(inst,arguments);
                    return inst;
                }
            };
        clz.prototype.constructor = clz;
        function _proto_(object){
            var empty;
            eval('empty = function ' + name + '(){}');
            empty.prototype = object;
            return new empty;
        }
        return clz;
    }

    function toHex(dec){
        return global.Number(dec).toString(16);
    }

    function toRGB(hex){
        hex = global.parseInt(trim(hex).replace('#',''),16);
        return {
            r: (hex >> 16) & 255,
            g: (hex >> 8) & 255,
            b: hex & 255,
            toString: function(){
                return 'rgb(' + this.r + ',' + this.g + ',' + this.b + ')';
            }
        }
    }

    function toRGBA(hex,a){
        var rgb = toRGB(hex);
        return {
            r: rgb.r,
            g: rgb.g,
            b: rgb.b,
            a: a,
            toString: function(){
                return 'rgb(' + this.r + ',' + this.g + ',' + this.b + ','+ this.a + ')';
            }
        }
    }

    'isNum isStr isFun isArr inArr toArr unArr isEmptyObj isObj toHex toRGBA toRGB cls each clone trim setter'.replace(/\w+/gi,function(s){
        util[s] = eval(s);
    });

    Alpha.util = util;
    global.Alpha = Alpha;

})(this,undefined)
