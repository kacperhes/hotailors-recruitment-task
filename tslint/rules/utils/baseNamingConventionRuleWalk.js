"use strict";
exports.__esModule = true;
var ts = require("typescript");
var tsutils_1 = require("tsutils");
var BaseNamingConventionRuleWalk = /** @class */ (function () {
    function BaseNamingConventionRuleWalk() {
        var _this = this;
        this.walk = function (ctx) {
            var traverse = function (node) {
                _this.checkNodeForViolations(ctx, node);
                return ts.forEachChild(node, traverse);
            };
            traverse(ctx.sourceFile);
        };
    }
    BaseNamingConventionRuleWalk.prototype.memberIsPrivate = function (node) {
        return tsutils_1.hasModifier(node.modifiers, ts.SyntaxKind.PrivateKeyword);
    };
    BaseNamingConventionRuleWalk.prototype.memberIsStatic = function (node) {
        return tsutils_1.hasModifier(node.modifiers, ts.SyntaxKind.StaticKeyword);
    };
    BaseNamingConventionRuleWalk.prototype.memberIsReadonly = function (node) {
        return tsutils_1.hasModifier(node.modifiers, ts.SyntaxKind.ReadonlyKeyword);
    };
    BaseNamingConventionRuleWalk.prototype.nameIsIdentifier = function (node) {
        return node.kind === ts.SyntaxKind.Identifier;
    };
    BaseNamingConventionRuleWalk.prototype.checkNodeForViolations = function (ctx, node) {
        if (!this.isRelevantClassMember(node)) {
            return;
        }
        // The declaration might have a computed property name or a numeric name.
        var name = node.name;
        if (!this.nameIsIdentifier(name)) {
            return;
        }
        if (!this.nameIsCorrect(name.text) && this.shouldNameBeChecked(node)) {
            ctx.addFailureAtNode(name, this.failureString);
        }
    };
    return BaseNamingConventionRuleWalk;
}());
exports.BaseNamingConventionRuleWalk = BaseNamingConventionRuleWalk;
