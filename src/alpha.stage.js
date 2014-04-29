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

    A.Stage = util.cls('Stage').inhert(A.Box);
    A.Stage.extend({
        _init: function(container,width,height){
            A.Stage._super.call(this,width,height);
            container.appendChild(this._div);
            this._currentScene = undefined;
        },
        _initStage: function(){
            util.setter(this,{

            })
        },
        add: function(scene){
            var index;

            if(scene && scene.nodeType == 'scene' && scene.parent){
                index = util.inArr(scene,this.children);

                if(index == -1){
                    this.children.push(scene);
                    this._div.appendChild(scene._div);
                    scene.parent = this;
                }
            }
            return this;
        },
        del: function(scene){
            var index = util.inArr(scene,this.children);

            if(index != -1){
                this.children.splice(index,1);
                this._div.removeChild(scene);
                scene.parent = null;
            }
        }
    });

})(this,undefined)
