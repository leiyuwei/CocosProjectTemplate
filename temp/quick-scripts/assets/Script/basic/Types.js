(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/basic/Types.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'c28a3vRgx9Gs7DIaKiIjTcG', 'Types', __filename);
// Script/basic/Types.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unit = "Symbol_Unit";
function Action(typeName, value) {
    return { typeName: typeName, value: value };
}
exports.Action = Action;
function ActionUnit(typeName) {
    return { typeName: typeName, value: exports.unit };
}
exports.ActionUnit = ActionUnit;
exports.Cons = Action;
exports.ConsUnit = ActionUnit;
function mkPair(fst, snd) {
    return { fst: fst, snd: snd };
}
exports.mkPair = mkPair;

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=Types.js.map
        