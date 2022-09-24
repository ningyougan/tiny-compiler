import { NodeTypes, RootNode, ChildNode } from "./ast";

interface VisitorOption {
  enter(node, parent);
  exit(node, parent);
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

  function traverseNode(
    node: ChildNode | RootNode,
    parent?: RootNode | ChildNode
  ) {
    const visitorObj = visitor[node.type];

    // enter

    if (visitorObj) {
      visitorObj.enter(node, parent);
    }

    switch (node.type) {
      case NodeTypes.NumberLiteral:
        break;
      case NodeTypes.CallExpression:
        traverseArray(node.params, node);
        break;
      case NodeTypes.Program:
        traverseArray(node.body, node);
        break;
    }

    function traverseArray(
      array: ChildNode[],
      parent?: RootNode | ChildNode | undefined
    ) {
      array.forEach((node) => {
        traverseNode(node, parent);
      });
    }
    // exit
    if (visitorObj) {
      visitorObj.exit(node, parent);
    }
  }

  traverseNode(rootNode);
}
