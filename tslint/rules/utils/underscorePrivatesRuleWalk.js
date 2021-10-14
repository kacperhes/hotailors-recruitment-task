"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var baseNamingConventionRuleWalk_1 = require("./baseNamingConventionRuleWalk");
var ts = require("typescript");
var UnderscorePrivatesRuleWalk = /** @class */ (function (_super) {
    __extends(UnderscorePrivatesRuleWalk, _super);
    function UnderscorePrivatesRuleWalk() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.failureString = "private member's name must be prefixed with an underscore";
        return _this;
    }
    UnderscorePrivatesRuleWalk.prototype.nameIsCorrect = function (name) {
        return name.charCodeAt(0) === UnderscorePrivatesRuleWalk.UNDESCORE_CODE;
    };
    UnderscorePrivatesRuleWalk.prototype.shouldNameBeChecked = function (node) {
        return this.memberIsPrivate(node)
            && (!this.memberIsReadonly(node) || !this.memberIsStatic(node));
    };
    UnderscorePrivatesRuleWalk.prototype.isRelevantClassMember = function (node) {
        switch (node.kind) {
            case ts.SyntaxKind.PropertyDeclaration:
            case ts.SyntaxKind.GetAccessor:
            case ts.SyntaxKind.SetAccessor:
                return true;
            default:
                return false;
        }
    };
    UnderscorePrivatesRuleWalk.UNDESCORE_CODE = "_".charCodeAt(0);
    return UnderscorePrivatesRuleWalk;
}(baseNamingConventionRuleWalk_1.BaseNamingConventionRuleWalk));
exports.UnderscorePrivatesRuleWalk = UnderscorePrivatesRuleWalk;
