/**
 * @fileoverview ���Ǹ�ѡ������3���ļ��е�һ������ʾ����һ���ڵ㡣
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
 * ��ѡ�����ڵ�Ĺ��췽��
 * ���밴��ȱ����ķ���������ӽڵ�
 * ���ڵ���img���Կ�����������Զ���ͼƬ��ͼƬ�����16*16
 * ���Ը��ڵ���һЩҵ����Ҫ���Զ�������ԣ��ýű��ĺô�^-^��
 *   ���ǲ����ǹ��췽���ﶨ�����parent��child��tree��
 * @class ����๹��һ����ѡ�����Ľڵ��ʵ��
 * @constructor
 * @param {String} name �ڵ����ƣ�����ʾ����Ļ��
 */
xyTree.Node = function(name) {
  /**
   * �ڵ����ʾ����
   * @type String
   */
  this.name = name ;        
  
  /**
   * �ڵ�ĸ��ڵ�
   * @type xyTree.Node
   */
  this.parent;

  /**
   * �ڵ��ǰһ���ڵ�
   * @type xyTree.Node
   */
  this.previous;

  /**
   * �ڵ����һ���ڵ�
   * @type xyTree.Node
   */
  this.next;

  /**
   * �ڵ���ӽڵ�
   * @type Array:xyTree.Node
   */
  this.child = [];

  /**
   * �ڵ�ļ��𣬸��ڵ�Ϊ0
   * @type int
   */
  this.level = 0;
  
  /**
   * �ڵ����������Ҫ���DivTree����Ҫ��tempNode.tree.divtree
   * @type int
   */
  this.tree;

  /**
   * �ڵ������е���ţ����ڵ�Ϊ0
   * @type int
   */
  this.xuhao = 0;

  /**
   * �ӽڵ�������ʾ�𣿱�ʾ��ǰ״̬
   * @type boolean
   */
  this.displaychild = false;
	
  /**
   * �ڵ�ĸ�ѡ��״̬��0:���У� 1��ѡ�У� 2������
   * @type int
   */
  this.checked = 0;

  /**
   * �ڵ�չ��������ʷ��¼��һ����true���޷��ı䣬���ǵ����ĸ���״����
   * @type boolean
   */
  this.zhankaiguo = false;

  /**
   * �ڵ���û�����ͼ�꣬��ѡ����
   * @type String
   */
  this.img;
  
  this.timecolor = 7;
}

/**
 * ������
 */
xyTree.Node.prototype.toString = function() {
  var s = '[' + this.id + ']=[' + this.name + ']';
  return s;
};


/*
<div>
  <img src="images/Lplus.png"  align="absbottom"  />
  <img src="images/foldericon.png"  align="absbottom"  style="margin-left:-6px;"  />
  <a href="javascript:void(0);">����־�</a>
  <div><img/><img/><a/>ĳĳ�ɳ���</div> 
</div>
*/
/**
 * �����ڵ��DOM����
 * ������߼�����ӵģ������У��ṹ������
 * @private
 * @return DOM������һ��div
 * @type HTMLElement:div
 */
xyTree.Node.prototype.innerhtml = function() {
  var div = document.createElement('div');
  var qj = this.tree.objectname; //�õ�ȫ�ֶ��������
  //���ڵ��div���id������������ţ�
  div.id = qj + this.xuhao; 
  div.className = 'qiguai'; //����ǣ�Ѱ�ҷ���
  var current = this;

  //xieye(1)����forѭ������ǰ��Ŀո�����ߵ�ͼ��
  //�磺2���ڵ�ѭ��һ�Ρ�3���ڵ㣬ѭ������
  var oFragment = document.createDocumentFragment();
  for (var i = this.level - 1; i > 0; i--) {
    var img = document.createElement('img');
    img.src = this.getimgkongge(this.getparent(i));
    img.align = "absbottom";
    oFragment.appendChild(img);
  }
  //  div.appendChild(oFragment);
  
  //xieye(2)�����ƼӺźͼ��Ż�T��L��ͼ�꣬�е����¼�������
  var img = document.createElement('img');
  img.src = this.getimgjiahao();
  img.id = qj + xyTree.CONSTANT.treeJiahaoImgID + this.xuhao; //��ID
  img.align = "absbottom";
  img.onclick = function() { 
    //xieye��״̬��ȫ�ֱ����ڵ��У�
    //xieye������Ҫ�жϣ�������ڵ����ӽڵ�
    var fu = this.parentNode;
    var childnodes = current.child;
  	
    if (childnodes.length == 0) {/*alert('���ӽڵ�');*/return;}
    var shimowei = current.next?false:true; //�ж��Ƿ�ĩβ
    if (!current.displaychild) { //����ڵ���ӽڵ�δ��
    
      
      //alert('׼����');
      current.displaychild = true;
      this.src = current.getimgdianji(current.displaychild, shimowei);
      //�����Ѿ�֪����ţ�Ҫ�����ĸ��ڵ�����ӽڵ�
      if (!current.img)                //����ļ���ͼ��ȱʡ�����仯
        this.nextSibling.src = xyTree.TreeConfig.openFolderIcon;
			
      if (!current.zhankaiguo) { //��νչ������ָ�����ӽڵ㣡
        //�����¼���	
      //alert('�����¼���');
        current.zhankaiguo = true;
        //�ӱ��������ӣ���Ҫ�����ǲ���ĩ�ڵ�
        var oFragmentChildDiv = document.createDocumentFragment();
        for (var i = 0; i < childnodes.length; i++)
          oFragmentChildDiv.appendChild(childnodes[i].innerhtml());
        fu.appendChild(oFragmentChildDiv);	
      } else {
        //���ﲻ�¼���	
      //alert('���ﲻ�¼���');

        for (var i = fu.childNodes.length - 1; 
            fu.childNodes[i].className == 'qiguai' && i >= 0; i--)
          fu.childNodes[i].style.display = 'block';
      }
    } else {                           //����ڵ���ӽڵ���ˣ�׼������
      //alert('׼������');
      current.displaychild = false;
      //current.clickbyJiahaoimg();
      this.src = current.getimgdianji(current.displaychild, shimowei);
      if (!current.img)                //����ļ���ͼ��ȱʡ�����仯
        this.nextSibling.src = xyTree.TreeConfig.folderIcon;
      //xieye��������ڵ��������е�div��Ϊ������ʾ
      for (var i = fu.childNodes.length - 1; 
          fu.childNodes[i].className == 'qiguai' && i >= 0; i--)
        fu.childNodes[i].style.display = 'none';
    }
  };
  
  oFragment.appendChild(img);
  //  div.appendChild(img);
  
  //xieye(3)�������ļ���ͼ�꣬�����û��Զ���
  img = document.createElement('img');
  img.src = this.getimgfold();
  //2007/06/15,���ڿ��Լӵ�����ͼƬ��
  if (this.img)                        //����û��Զ��壬������ʽ����
    img.className = xyTree.CONSTANT.treeUserImgStyle;
  img.align = "absbottom";
  img.onclick = function() {           //�ļ��е����¼�ָ����˭����׼������
    this.previousSibling.onclick();
  };
  oFragment.appendChild(img);
  
  //xieye(4)�����Ƹ�ѡ���ͼ�꣬�е����¼�������
  img = document.createElement('img');
  img.id = qj + xyTree.CONSTANT.treeCheckBoxID + this.xuhao; //�����
  img.src = this.getfuxuanimg();
  img.align = "top";
  img.style.paddingTop = '3px';
  img.style.marginLeft = xyTree.TreeConfig.jianju1;
  img.onclick = function() { 
    //����Ӱ����˫��ģ�
    //���ڵײ���ȫ��ѡ��
    //�����Ϸ���Ҫ�����ǲ���ѡ�л���ȫ��ѡ�У����������������Բ�����
    var fu = this.parentNode;
    if (current.checked == 1 || current.checked == 2) {
      current.checked = 0;
      this.src = xyTree.TreeConfig.buzhongIcon;
    } else {
      current.checked = 1;
      this.src = xyTree.TreeConfig.quanzhongIcon;
    }
    current.upDigui(current);
    current.downDigui(current);
  }
  oFragment.appendChild(img);

  //xieye(5)���������ֳ�����
  var a = document.createElement('a');
  //a.href = 'javascript:void(0)';
  //var xuhao = this.xuhao;
  a.onclick = function() {
    //current.slowChange();
    current.tree.divtree.clickNode(current);
  };
  a.onfocus = function() {this.blur();}
  a.onmouseover = function (){this.style.color='blue';}
  a.onmouseout  = function (){this.style.color='black';}
  a.appendChild(document.createTextNode(this.name));
  a.style.marginLeft = xyTree.TreeConfig.jianju2;
  oFragment.appendChild(a);
  
  div.appendChild(oFragment);
  return div;
}

/**
 * ͨ��ȫ�ֽڵ�õ��ڵ�div����
 * @return DOM������һ��div
 * @type HTMLElement:div
 */
xyTree.Node.prototype.getHtmlElement = function() {
  var dd = this.tree.objectname + this.xuhao;
  return document.getElementById(dd); 
}

/**
 * ͨ��ȫ�ֽڵ�õ��ڵ�ĸ�ѡ��img����
 * @return DOM������һ��img
 * @type HTMLElement:img
 */
xyTree.Node.prototype.getHtmlElementfuxuanimg = function() {
  var dd = this.tree.objectname + xyTree.CONSTANT.treeCheckBoxID + this.xuhao;
  return document.getElementById(dd);
}

/**
 * ͨ��ȫ�ֽڵ�õ��ڵ�ļӺ�img����
 * @return DOM������һ��img
 * @type HTMLElement:img
 */
xyTree.Node.prototype.getHtmlElementjiahaoimg = function() {
  var dd = this.tree.objectname + xyTree.CONSTANT.treeJiahaoImgID + this.xuhao;
  return document.getElementById(dd);
}

/**
 * ȷ����ѡ���״̬�������µݹ�
 * @param {xyTree.Node} node ����������ڵ�ݹ飬���ö���ڵ�û��
 */
xyTree.Node.prototype.downDigui = function(node) {
  function downDigui2(node2) {
    node2.checked = node2.parent.checked;
    node2.getHtmlElementfuxuanimg().src = node2.getimgbyyangshi(node2.parent.checked);
    if (node2.level == node2.tree.maxlevel) return;
   	
    if (!node2.displaychild  && !node2.zhankaiguo) return;//ע�⵽���ﲻͬ�ĵط���
    for (var i = 0; i < node2.child.length; i++)
      downDigui2(node2.child[i]);
  }
  
  if (node.level == node.tree.maxlevel) return;
  //����ӽڵ㲻����ʾ�����ӽڵ㲻�����ڴ� �ͷ���
  if (!node.displaychild && !node.zhankaiguo) return;//ע����仰��
  for (var j = 0; j < node.child.length; j++)
    downDigui2(node.child[j]);
}

/**
 * ȷ����ѡ���״̬�������ϵݹ�
 * @param {xyTree.Node} node ����������ڵ�ݹ飬���ö���ڵ�û��
 */
xyTree.Node.prototype.upDigui = function(node) {
  if (node.level == 0) return;
  var boo = true;  //�ȼٶ��ڵ�״̬ȫ��һ��
  var boo2 = false;
  var parentyangshi = node.parent.checked;            //���ڵ���ʽ��������0��1��2
  var yangshi = node.checked;          //��õ�ǰ�ڵ����ʽ,��ס�������Ǿֲ���ֻ����0��1
  	
  var arr = node.parent.child;
  for (var i = 0; i < arr.length; i++) {
    var tempyangshi = arr[i].checked;
    if (tempyangshi != yangshi) {
      boo = false;
      break;	
    }	
  }
  //���boo=false��˵���в�ͬ�����ڵ�ѡ2����һ����һ�����������Ƿ�ݹ�
  //���boo=true,˵������ͬ�����ڵ�ѡ��ǰ��ʽ����һ����һ�����������Ƿ�ݹ�
  if (!boo) {
    node.parent.checked = 2;
  } else {
    node.parent.checked = yangshi;
  }
  node.parent.getHtmlElementfuxuanimg().src = 
    this.getimgbyyangshi(node.parent.checked); //���Ǹ�html��ʽ
  if (node.parent.checked != parentyangshi)	//�ж��Ƿ�ݹ�
    this.upDigui(node.parent);
}


/**
 * �������Ƚڵ�
 * @param {int} i ��Ŀ��ڵ�ļ����
 * @return �������Ƚڵ�
 * @type xyTree.Node
 */
xyTree.Node.prototype.getparent = function(i) {
  function getparentdigui(i,node) {
    var node = node.parent;
    i--;
    if (i == 0)
      return node;
    return getparentdigui(i, node);
  }
  return getparentdigui(i, this);
}

/**
 * ���ݸ��ڵ㷵�����߻��ǿո���һ��div����ǰ���ͼƬ
 * @param {xyTree.Node} node ��ǰ�ڵ�
 * @return �������߻��ǿո��ͼƬ
 * @type String
 */
xyTree.Node.prototype.getimgkongge = function(node) {
  //���ڵ㲻��ĩβ ? ͼƬ1 : ͼƬ2
  return (node.next) ? xyTree.TreeConfig.iIcon : xyTree.TreeConfig.blankIcon;
}

/**
 * ���ؼӺ�λ�õ�ͼƬ��4�����
 * (1)���ӽڵ㣬����ĩβ
 * (2)���ӽڵ㣬��ĩβ
 * (3)���ӽڵ㣬����ĩβ
 * (4)���ӽڵ㣬��ĩβ
 * @return ���ؼӺ�λ�õ�ͼƬ
 * @type String
 */
xyTree.Node.prototype.getimgjiahao = function() {
  var s;
  if (this.child.length > 0) { //���ӽڵ�
    if (this.next)  //����ĩβ
      s = xyTree.TreeConfig.tPlusIcon;
    else           //��ĩβ   
      s = xyTree.TreeConfig.lPlusIcon;
  } else {                      //���ӽڵ�
    if (this.next)  //����ĩβ
      s = xyTree.TreeConfig.tIcon;
    else           //��ĩβ   
      s = xyTree.TreeConfig.lIcon;
  }
  return s;
}

/**
 * ���ؼӺ�λ�õ�ͼƬ�������ǵ�����ж�,ע����4��ͼ��
 * @param {boolean} img1 �ڵ���ӽڵ��Ƿ�������ʾ
 * @param {boolean} node �ڵ��Ƿ���ĩβ
 * @return ���ؼӺ�λ��ͼƬ
 * @type String
 */
xyTree.Node.prototype.getimgdianji = function(img1, mowei) {
  var s;
  if (mowei)                      //��ĩβ
    //����չ�� ? ��Ϊ�� : ��Ϊ��
    s = img1 ? xyTree.TreeConfig.lMinusIcon : xyTree.TreeConfig.lPlusIcon;
  else                            //����ĩβ
    //����չ�� ? ��Ϊ�� : ��Ϊ��
    s = img1 ? xyTree.TreeConfig.tMinusIcon : xyTree.TreeConfig.tPlusIcon;
  return s;
}

/**
 * ����ȱʡ�ļ���ͼƬ
 * @return �����ļ���ͼƬ
 * @type String
 */
xyTree.Node.prototype.getimgfold = function() {
  //xieye����3�֣����ļ��У����ļ��У�һ��ֽ
  if (this.img)
    return this.img;
  var s;
  if(this.level != 0){
	  if (this.child.length > 0) //���ӽڵ�
	    if (this.displaychild)//�ӽڵ�����ʾ
	      s = xyTree.TreeConfig.openFolderIcon;
	    else                  //�ӽڵ㲻����ʾ 
	      s = xyTree.TreeConfig.folderIcon;
	  else                       //���ӽڵ�
	    s = xyTree.TreeConfig.fileIcon;  
  }else{
	      s = xyTree.TreeConfig.openFolderIcon;
  }
  return s;
}

/**
 * ����״̬����ͼƬ����ѡ��
 * @param {int} checked �ڵ�״̬
 * @return ����״̬����ͼƬ����ѡ��
 * @type String
 */
xyTree.Node.prototype.getimgbyyangshi = function(checked) {
  if (checked == 0) return xyTree.TreeConfig.buzhongIcon;
  if (checked == 1) return xyTree.TreeConfig.quanzhongIcon;
  if (checked == 2) return xyTree.TreeConfig.jubuzhongIcon;
}

/**
 * ���ظ�ѡ��ͼƬ�������ã��ı�ڵ�״̬����
 * @return ���ظ�ѡ��ͼƬ
 * @type String
 */
xyTree.Node.prototype.getfuxuanimg = function() {
  if (this.parent.checked == 2)
    return this.getimgbyyangshi(this.checked);
  var s;
  if (this.parent.checked == 1) {
    this.checked = 1;
    s = xyTree.TreeConfig.quanzhongIcon;
  } else {
    this.checked = 0;
    s = xyTree.TreeConfig.buzhongIcon;
  }
  return s;
}

/**
 * ���䱳��
 */
xyTree.Node.prototype.slowChange = function(timenum) {
  if(arguments.length == 1)
  xyTree.fun.slowChange(this.tree.divtree.xuhao,this.xuhao,timenum);
  else
  xyTree.fun.slowChange(this.tree.divtree.xuhao,this.xuhao);
  
}

/**
 * ҳ������ʾ�ڵ�
 */
xyTree.Node.prototype.expand = function() {
  this.tree.divtree.expandNode(this);
}

/**
 * ҳ������ʾ�ڵ㲢��
 */
xyTree.Node.prototype.expandChecked = function() {
  this.tree.divtree.expandCheckedNode(this);
}

/**
 * ҳ����չ���ӽڵ�,����ʹ��
 * @private
 */
xyTree.Node.prototype.expandChilds = function() {
  //���������Ҷ�ڵ㣬���ҽڵ��״̬��this.displaychild = false;
  //��ô�͵���
  if(this.level == 0)
    this.tree.divtree.showTreeBody();
  else
    if(this.level != this.tree.maxlevel
       && (!this.displaychild)){
      this.getHtmlElementjiahaoimg().onclick();
    }
}

/**
 * ���ؽڵ�����0�Ǹ��ڵ㣬������Լ�
 * @return һ���ڵ����飬�Ӹ��ڵ㿪ʼ�����ڵ��һ���ӽڵ㣬
 *         ���ڵ��һ���ӽڵ���ӽڵ㡭��ֱ���Լ�
 * @type Ayyay:xyTree.Node
 */
xyTree.Node.prototype.getNodeLink = function() {
  if(this.level == 0) return [this];
  
  var s = [];
  var node = this;
  s.unshift(node);
  ee(node);
  return s;
  //�ݹ�
  function ee(node){
    var parent = node.parent;
    s.unshift(parent);
    if (parent == node.tree.root) return;
    ee(parent);
  };
}

/**
 * ���ڵ�����ӽڵ�
 * @param {xyTree.Node} node �ӽڵ�
 */
xyTree.Node.prototype.add = function (node){
  //(1)��������ģ� child�ӽڵ㣬
  var chang = this.child.length;
  this.child[chang] = node;
  	
  //(2)Ҫ����node�ģ�parent��level��tree����������һ���ڵ㣬�ӽڵ�
  node.parent = this;
  node.level = this.level + 1;
  node.tree = this.tree;
  	
  //(3)����node��ǰһ���ڵ�� ��next,     node��previous��
  if (chang > 0) {
    node.previous = this.child[chang - 1];
    node.previous.next = node;
  } 
  	
  //(4)��������treeArray[],     node��xuhao��
  chang =  node.tree.treeArray.length;
  node.tree.treeArray[chang] = node;
  node.xuhao = chang;
  	
  //(5)��������maxlevel;
  if (node.level > this.tree.maxlevel)
    this.tree.maxlevel = node.level;
};

/**
 * ���ڵ㶯̬����ӽڵ�,����������������
 * @param {xyTree.Node} node �ӽڵ�
 */
xyTree.Node.prototype.addDynamic = function (node){
 // this.
  if(this.level == 0){ //����Ǹ��ڵ�
    moxingtianjia(this,node);
    var tree = this.tree.divtree; //�����
    tree.showTreeBody();          //չ��
    var div = tree.div.lastChild; //�������
    if(node instanceof Array){
      for(var i=0;i<node.length;i++){ 
        panduan(node[i]);
        div.appendChild(node[i].innerhtml());
        node[i].expand();
      }
    }
    else{ 
      panduan(node);
      div.appendChild(node.innerhtml());
      node.expand();
    }
  } else {  //�����ǰ�ڵ㲻�Ǹ��ڵ�
    //�����Լ�һ��Ҫ��ʾ��������
    /* 
     * 1��û�ӽڵ�
     * ��Ӻţ�ע�⵽���ܲ���һ���ڵ㣩
     * �������ļ��л�ָ��ͼƬ
     * Ȼ���Լ�onclick()
     * 2��3�����ӽڵ㵫������ʾ,�Ǿ����ӽڵ�����ʾ
     * ����ӽڵ�����һ���ǲ����ӽڵ��
     * ����ӽڵ�������һ�����ӽڵ����������ʾ��
     * ��ӵ�ģ��tree
     * Ȼ�󸸽ڵ��innerHTML()
     * */
    this.expand();
    if(this.child.length == 0){ //�Լ�û�ӽڵ�
      moxingtianjia(this,node); //ģ�����
      var jiahaoDOM = this.getHtmlElementjiahaoimg();
      if(this.next){     //����������һ��
        jiahaoDOM.src = xyTree.TreeConfig.tPlusIcon;
      } else
        jiahaoDOM.src = xyTree.TreeConfig.lPlusIcon;
      if(!this.img)
        jiahaoDOM.nextSibling.src =   
          xyTree.TreeConfig.folderIcon;
      jiahaoDOM.onclick();    
      for(var j=0;j<this.child.length; j++)
        this.child[j].expand();
    }else{                      //�Լ����ӽڵ�
      if(!this.displaychild)
        this.expandChilds();
      var lastNode = this.child[this.child.length - 1];
      var lastNodejiahaoDOM = lastNode.getHtmlElementjiahaoimg();
      if(lastNode.child.length == 0) //���ĩβ�ǲ����ӽڵ��
        lastNodejiahaoDOM.src = xyTree.TreeConfig.tIcon;
      else{
        if(lastNode.zhankaiguo){   //���չ������Ҫ�ݹ�
       //�ݹ�ǰ�ȴ����Լ�
          if(lastNode.displaychild) {     //������ʾ
            //alert('ok222222');
              lastNodejiahaoDOM.src = xyTree.TreeConfig.tMinusIcon;    
          }
          else {                      //������ʾ
            //alert('ok');
              lastNodejiahaoDOM.src = xyTree.TreeConfig.tPlusIcon;
          }
          var arr = lastNode.child; //�ݹ�
          for(var i=0; i<arr.length; i++)
            arr[i].chonghui2(lastNode.level-1);
        }else  //����ĩβδչ������Ҳ��
           lastNodejiahaoDOM.src = xyTree.TreeConfig.tPlusIcon;
        
      }
     
      moxingtianjia(this,node); //ģ�����
      var div = this.getHtmlElement();
      //������,Ҫ��
      if(node instanceof Array){
        for(var i=0;i<node.length;i++){ 
          div.appendChild(node[i].innerhtml());
          node[i].expand();
        }
      }
      else{ 
        div.appendChild(node.innerhtml());
        node.expand();
      }
    }//�Լ����ӽڵ�
  }//�����ǰ�ڵ㲻�Ǹ��ڵ�
  //�Ӻ����������ǰ���ڵ㣬ǰ���ڵ��ػ�
  function panduan(node2){
    if(node2.previous)node2.previous.chonghui();
  }
  //���ڴ��е�����ĳ�ڵ�����ӽڵ�
  function moxingtianjia(node3,node4){
    if(node4 instanceof Array){
      for(var i2=0;i2<node4.length;i2++) node3.add(node4[i2]);
    }
    else node3.add(node4);
  }
  
};

/*
 * ���ýڵ���ļ���ͼ��Ϊloading.gif
 * ���ڽڵ���ʾʱ��Ч
 */
xyTree.Node.prototype.loadingGif = function (node){
	var img = this.getHtmlElementfuxuanimg().previousSibling;
  if(this.level == 0){ //����Ǹ��ڵ�
  		img.src = xyTree.TreeConfig.loadingIcon;
  } else {  //�����ǰ�ڵ㲻�Ǹ��ڵ�
  	//���ȣ�Ҫ�жϣ������ǰ�ڵ㲻����ʾ����ʲô������
  	if(this.parent.displaychild){
  		img.src = xyTree.TreeConfig.loadingIcon;
  	}else{
  	 /*alert("�ýڵ㲻����ʾ")*/;
  	}
  }
} 
 
/*
 * �ָ��ڵ���ļ���ͼ��Ϊ��׼��ʽ 
 * ���ǽ��ڽڵ���ʾʱ��Ч
 */
xyTree.Node.prototype.loadingGifRenew = function (node){
	var img = this.getHtmlElementfuxuanimg().previousSibling;
  if(!img)return;
  if(this.level == 0){ //����Ǹ��ڵ�
  		img.src = this.getimgfold();
  } else {  //�����ǰ�ڵ㲻�Ǹ��ڵ�
  	//���ȣ�Ҫ�жϣ������ǰ�ڵ㲻����ʾ����ʲô������
  	if(this.parent.displaychild){
  		img.src = this.getimgfold();
  	}else{
  	 /*alert("�ýڵ㲻����ʾ")*/;
  	 img.src = this.getimgfold(); //�ȴպ����ã��������
  	}
  }
} 
 



//�ػ�����
xyTree.Node.prototype.chonghui2 = function (num){
  
  if(this.parent.displaychild){
    var img = this.getHtmlElement().firstChild;
    for(var i=0;i<num; i++)
      img = getimg();
    img.src = xyTree.TreeConfig.iIcon;
    
    for(var j=0;j<this.child.length; j++)
      this.child[j].chonghui2(num);
  }
  
  function getimg(){
    img = img.nextSibling;
    return img;
  }
  
}


/**
 * ���ڵ��ػ��һ����
 * @private
 */
xyTree.Node.prototype.chonghuifirstimg = function (){
//    alert(this.level);
  var img = this.getHtmlElement().firstChild;
   // alert(img.src);
  if(this.level == 1){
    if (this.child.length == 0 ) //���û���ӽڵ�
      img.src = xyTree.TreeConfig.tIcon;
    else{                        //���ӽڵ�
      if(this.displaychild)      //������ʾ
        img.src = xyTree.TreeConfig.tMinusIcon;    
      else                       //������ʾ
        img.src = xyTree.TreeConfig.tPlusIcon;
    }
  }
  else
    img.src = xyTree.TreeConfig.iIcon;
}

/**
 * ���ڵ��Լ������ӽڵ��ػ��һ����
 * @private
 */
xyTree.Node.prototype.chonghui = function (){
  if(this.parent.zhankaiguo){
    //alert('chonghui');
    this.chonghuifirstimg();
    var arr = this.child;
    for(var i=0; i<arr.length; i++)
      arr[i].chonghui();
  }
}





/**
 * ������
 */
xyTree.Node.prototype.display = function() {
  for (var i = 0; i <this.level; i++)
    this.tree.tempString += ' ';
  this.tree.tempString += '[' + this.id + ']=[' + this.name + ']' + '\n';
  for (var i = 0; i < this.child.length; i++)
    this.child[i].display();
};


