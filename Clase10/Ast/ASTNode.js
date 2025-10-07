class ASTNode {
    constructor(label) {
      this.label = label;
      this.children = [];
    }
  
    addChild(node) {
      this.children.push(node);
    }
  }
  
export { ASTNode };  