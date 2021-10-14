import * as Lint from "tslint";
import * as ts from "typescript";
import { UnderscorePrivatesRuleWalk } from "./utils/underscorePrivatesRuleWalk";

export class Rule extends Lint.Rules.AbstractRule {

    public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
        return this.applyWithFunction(sourceFile, new UnderscorePrivatesRuleWalk().walk);
    }
}
