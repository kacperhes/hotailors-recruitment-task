import { BaseNamingConventionRuleWalk } from "./baseNamingConventionRuleWalk";
import * as ts from "typescript";
import * as Lint from "tslint";

type RelevantClassMember =
    | ts.PropertyDeclaration
    | ts.GetAccessorDeclaration
    | ts.SetAccessorDeclaration;

export class UnderscorePrivatesRuleWalk extends BaseNamingConventionRuleWalk {
    private static readonly UNDESCORE_CODE: number = "_".charCodeAt(0);
    protected failureString: string = "private member's name must be prefixed with an underscore";
    
    protected nameIsCorrect(name: string): boolean {
        return name.charCodeAt(0) === UnderscorePrivatesRuleWalk.UNDESCORE_CODE;
    }
    
    protected shouldNameBeChecked(node: ts.Declaration): boolean {
        return this.memberIsPrivate(node)
            && (!this.memberIsReadonly(node) || !this.memberIsStatic(node));
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
