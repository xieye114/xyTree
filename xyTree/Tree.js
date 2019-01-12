/**
 * @fileoverview 这是复选框树的3个文件中的一个，表示树的数据结构。
 * @author xieye
 * @version 4.1  2007/06/17
 */
  
/*
 * 加命名空间xyTree
 */
(function() {
  if (!window.xyTree)
    window.xyTree = {};
})();


/**
 * 复选框树的构造方法，这是一个私有类，但用户可以读其属性
 * 本身是DvTree对象的一个属性
 * @class 这个类构造一个复选框树的节点数组的实例
 * @constructor
 * @param {String} name 根节点名称
 * @param {String} objectname 如果页面有多棵复选框树，这个属性的值不同，
 *                            由程序自动生成
 */
xyTree.Tree = function(name, objectname) {
  var rootnode = new xyTree.Node();
  rootnode.name = name;
  rootnode.tree = this;
  rootnode.displaychild = true;
  rootnode.zhankaiguo = true;
  
  /**
   * 树的名称，意义不大，先留着
   * @type String
   */
  this.treename = name ;     //名称

  /**
   * 树的最大层数，也就是最深的叶节点位于第几层，根节点算第0层
   * @type int
   */
  this.maxlevel = 0;  //最大级别              

  /**
   * 树的根节点，通过它也能访问整棵树，形式一
   * @type xyTree.Node
   */
  this.root = rootnode;      
 
  /**
   * 树的所有节点的数组，通过它也能访问整棵树，形式二
   * 有两种形式写程序好写，用客户端的内存空间换取运行效率
   * 根节点下标是0
   * @type Array:xyTree.Node
   */
  this.treeArray = [];
  this.treeArray[0] = this.root;                
  
  /**
   * 写程序时可能有用
   * @type int
   */
  this.current = 0;                
  
  /**
   * 写程序时可能有用
   * @type String
   */
  this.tempString = ''; //存放显示树字符串的地方
  
  /**
   * 树的特定名称，意义重要，形如treediv1，treediv2等
   * @type String
   */
  this.objectname = objectname; 
  
  /**
   * 得到包含自己的DivTree对象
   * @type xyTree.DivTree
   */
  this.divtree;
}

/**
 * 给树添加一级节点，实际起一个中转作用，象接力棒传给根节点
 * @param {xyTree.Node} node 待添加的一级节点
 */
xyTree.Tree.prototype.add = function(node) {
  this.root.add(node);	
}

/**
 * 调试用
 */
xyTree.Tree.prototype.toString = function() {
  //alert('进入方法内部');
  this.tempString = '';
  this.rootnode.display();
  return this.tempString;
};


