/**
 * @fileoverview ���Ǹ�ѡ������3���ļ��е�һ������ʾ�������ݽṹ��
 * @author xieye
 * @version 4.1  2007/06/17
 */
  
/*
 * �������ռ�xyTree
 */
(function() {
  if (!window.xyTree)
    window.xyTree = {};
})();


/**
 * ��ѡ�����Ĺ��췽��������һ��˽���࣬���û����Զ�������
 * ������DvTree�����һ������
 * @class ����๹��һ����ѡ�����Ľڵ������ʵ��
 * @constructor
 * @param {String} name ���ڵ�����
 * @param {String} objectname ���ҳ���ж�ø�ѡ������������Ե�ֵ��ͬ��
 *                            �ɳ����Զ�����
 */
xyTree.Tree = function(name, objectname) {
  var rootnode = new xyTree.Node();
  rootnode.name = name;
  rootnode.tree = this;
  rootnode.displaychild = true;
  rootnode.zhankaiguo = true;
  
  /**
   * �������ƣ����岻��������
   * @type String
   */
  this.treename = name ;     //����

  /**
   * ������������Ҳ���������Ҷ�ڵ�λ�ڵڼ��㣬���ڵ����0��
   * @type int
   */
  this.maxlevel = 0;  //��󼶱�              

  /**
   * ���ĸ��ڵ㣬ͨ����Ҳ�ܷ�������������ʽһ
   * @type xyTree.Node
   */
  this.root = rootnode;      
 
  /**
   * �������нڵ�����飬ͨ����Ҳ�ܷ�������������ʽ��
   * ��������ʽд�����д���ÿͻ��˵��ڴ�ռ任ȡ����Ч��
   * ���ڵ��±���0
   * @type Array:xyTree.Node
   */
  this.treeArray = [];
  this.treeArray[0] = this.root;                
  
  /**
   * д����ʱ��������
   * @type int
   */
  this.current = 0;                
  
  /**
   * д����ʱ��������
   * @type String
   */
  this.tempString = ''; //�����ʾ���ַ����ĵط�
  
  /**
   * �����ض����ƣ�������Ҫ������treediv1��treediv2��
   * @type String
   */
  this.objectname = objectname; 
  
  /**
   * �õ������Լ���DivTree����
   * @type xyTree.DivTree
   */
  this.divtree;
}

/**
 * �������һ���ڵ㣬ʵ����һ����ת���ã���������������ڵ�
 * @param {xyTree.Node} node ����ӵ�һ���ڵ�
 */
xyTree.Tree.prototype.add = function(node) {
  this.root.add(node);	
}

/**
 * ������
 */
xyTree.Tree.prototype.toString = function() {
  //alert('���뷽���ڲ�');
  this.tempString = '';
  this.rootnode.display();
  return this.tempString;
};


