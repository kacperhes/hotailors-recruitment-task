import { BaseNamingConventionRuleWalk } from "./baseNamingConventionRuleWalk";
import * as ts from "typescript";
import * as Lint from "tslint";

type RelevantClassMember =
    | ts.PropertyDeclaration
    | ts.GetAccessorDeclaration
    | ts.SetAccessorDeclaration;

export class UppercaseStaticReadonlyRuleWalk extends BaseNamingConventionRuleWalk {
    protected readonly failureString: string = "static readonly member's name must be UPPERCASE";

    protected nameIsCorrect(name: string): boolean {
        return name === name.toUpperCase();
    }
    protected shouldNameBeChecked(node: ts.Declaration): boolean {
        return this.memberIsStatic(node) 
            && this.memberIsReadonly(node);
    }
    protected isRelevantClassMember(node: ts.Node): node is RelevantClassMember {
        switch (node.kind) {
            case ts.SyntaxKind.PropertyDeclaration:
            case ts.SyntaxKind.GetAccessor:
            case ts.SyntaxKind.SetAccessor:
                return true;
            default:
                return false;
        }
    }
}
