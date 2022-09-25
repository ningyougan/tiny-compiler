import { tokenizer } from "./src/tokenizer";
import { parser } from "./src/parser";
import { transformer } from "./src/transformer";
import { codegen } from "./src/codegen";

export function compiler(code: string) {
  const tokens = tokenizer(code);
  const ast = parser(tokens);
  const transformedAst = transformer(ast);
  return codegen(transformedAst);
}
