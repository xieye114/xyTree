(function() {
  if (!window.xyTree)
    window.xyTree = {};
})();



//����
//=====================================================================
xyTree.TreeNormal = function(name,objectname) {
//function TreeNormal(name,objectname){
  var rootnode = new xyTree.NodeNormal();
  rootnode.name = name;
  rootnode.tree = this;
  
  this.treename = name ;     //����
  this.maxlevel = 0;  //��󼶱�              
  this.root = rootnode;      //���Ǹ��ڵ� �����������ݽṹ��һ����ʽ
  this.treeArray = []; //��������Ӧ��һ���򵥵����飬Ϊ�˿��ٷ�����
                  //�ÿͻ��˵Ŀռ任ȡʱ�䣬���������ݽṹ�ڶ�����ʽ�����ڵ�
                  //�±�Ϊ0��
  this.treeArray[0] = this.root;                
  this.current = 0;                
  this.tempString = ''; //�����ʾ���ַ����ĵط�
  
  this.objectname = objectname; 
  this.divtree;
}

xyTree.TreeNormal.prototype.add = function(node) {
  this.root.add(node);	
}

xyTree.TreeNormal.prototype.toString = function() {
  //alert('���뷽���ڲ�');
  this.tempString = '';
  this.rootnode.display();
  return this.tempString;
};


