import * as Lint from "tslint";
import * as ts from "typescript";

import { PropertyName } from "typescript";
import { hasModifier } from "tsutils";

type RelevantClassMember =
    | ts.PropertyDeclaration
    | ts.GetAccessorDeclaration
    | ts.SetAccessorDeclaration;

export abstract class BaseNamingConventionRuleWalk {
    protected readonly abstract failureString: string;

    public walk = (ctx: Lint.WalkContext<void>): void => {
        const traverse: (node: ts.Node) => void = (node: ts.Node): void => {
            this.checkNodeForViolations(ctx, node);
            return ts.forEachChild(node, traverse);
        };

        traverse(ctx.sourceFile);
    }

    protected abstract isRelevantClassMember(node: ts.Node): node is RelevantClassMember;
    protected abstract nameIsCorrect(name: string): boolean;
    protected abstract shouldNameBeChecked(node: ts.Declaration): boolean;

    protected memberIsPrivate(node: ts.Declaration): boolean {
        return hasModifier(node.modifiers, ts.SyntaxKind.PrivateKeyword);
    }
    
    protected memberIsStatic(node: ts.Declaration): boolean {
        return hasModifier(node.modifiers, ts.SyntaxKind.StaticKeyword);
    }
    
    protected memberIsReadonly(node: ts.Declaration): boolean {
        return hasModifier(node.modifiers, ts.SyntaxKind.ReadonlyKeyword);
    }

    private nameIsIdentifier(node: PropertyName): node is ts.Identifier {
        return node.kind === ts.SyntaxKind.Identifier;
    }

    private checkNodeForViolations(ctx: Lint.WalkContext<void>, node: ts.Node): void {
        if (!this.isRelevantClassMember(node)) {
            return;
        }

        // The declaration might have a computed property name or a numeric name.
        const name: PropertyName = node.name;
        if (!this.nameIsIdentifier(name)) {
            return;
        }

        if (!this.nameIsCorrect(name.text) && this.shouldNameBeChecked(node)) {
            ctx.addFailureAtNode(name, this.failureString);
        }
    }
}
