(function() {
  if (!window.xyTree)
    window.xyTree = {};
})();



//树类
//=====================================================================
xyTree.TreeNormal = function(name,objectname) {
//function TreeNormal(name,objectname){
  var rootnode = new xyTree.NodeNormal();
  rootnode.name = name;
  rootnode.tree = this;
  
  this.treename = name ;     //名称
  this.maxlevel = 0;  //最大级别              
  this.root = rootnode;      //这是根节点 ，是树的数据结构第一种形式
  this.treeArray = []; //这是树对应的一个简单的数组，为了快速访问树
                  //用客户端的空间换取时间，是树的数据结构第二种形式，根节点
                  //下标为0；
  this.treeArray[0] = this.root;                
  this.current = 0;                
  this.tempString = ''; //存放显示树字符串的地方
  
  this.objectname = objectname; 
  this.divtree;
}

xyTree.TreeNormal.prototype.add = function(node) {
  this.root.add(node);	
}

xyTree.TreeNormal.prototype.toString = function() {
  //alert('进入方法内部');
  this.tempString = '';
  this.rootnode.display();
  return this.tempString;
};


