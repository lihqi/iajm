
const arr = ["vue", "插件"];

let newVal = "***";
const regs = [];
arr.forEach((item) => {
  const reg = new RegExp(item, "g");
  regs.push(reg);
});

const getNewText = (oldV) => {
  let str = oldV;
  regs.forEach((item) => {
    str = str.replace(item, newVal);
  });
  return str;
};
const BFS = {
  nodes: [],
  do(roots) {
    var children = [];
    for (let i = 0; i < roots.length; i++) {
      var root = roots[i];
      if (root.nodeType != 3 && root.nodeName != "SCRIPT") {
        if (root.childNodes.length) children.push(...root.childNodes);
        this.nodes.push(root);
      } else {
        if (root.nodeType === 3) {
          root.nodeValue = getNewText(root.nodeValue, newVal);
        }
      }
    }
    if (children.length) {
      var tmp = this.do(children);
    } else {
      return this.nodes;
    }
    return tmp;
  },
};

BFS.do(document.body.childNodes);
document.title = getNewText(document.title);
