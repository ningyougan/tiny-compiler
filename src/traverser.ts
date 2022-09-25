import { NodeTypes, RootNode, ChildNode, CallExpressionNode } from "./ast";

type ParentNode = RootNode | CallExpressionNode | undefined;
type MethodFn = (node: RootNode | ChildNode, parent: ParentNode) => void;
interface VisitorOption {
  enter: MethodFn;
  exit?: MethodFn;
}
export interface Visitor {
  Program?: VisitorOption;
  CallExpression?: VisitorOption;
  NumberLiteral?: VisitorOption;
  StringLiteral?: VisitorOption;
}

export function traverser(rootNode: RootNode, visitor: Visitor) {
  // 1.深度优先搜索
  // 2. visitor

  function traverArray(array: ChildNode[], parent?: ParentNode) {
    array.forEach((node) => {
      traverseNode(node, parent);
    });
  }

  function traverseNode(node: ChildNode | RootNode, parent?: ParentNode) {
    const visitorObj = visitor[node.type];

    // enter
    const methods = visitor[node.type];
    if (methods) {
      methods.enter(node, parent);
    }

    switch (node.type) {
      case NodeTypes.NumberLiteral:
        break;
      case NodeTypes.CallExpression:
        traverArray(node.params, node);
        break;
      case NodeTypes.Program:
        traverArray(node.body, node);
        break;
    }

    // exit
    if (visitorObj && visitorObj.exit) {
      visitorObj.exit(node, parent);
    }
  }

  traverseNode(rootNode);
}
