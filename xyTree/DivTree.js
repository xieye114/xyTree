/**
 * @fileoverview ���Ǹ�ѡ������3���ļ��е�һ������ʾ����
 * @author xieye
 * @version 4.12  2007/07/25
 */
  
/*
 * �������ռ�xyTree
 */
(function() {
  if (!window.xyTree)
    window.xyTree = {};
})();

/*
 * ָ��ȱʡ��ͼƬ·�����û�Ҳ�����Լ��޸�
 */
xyTree.TreeConfig = {
  /*
   * ����5���ֱ��ǹرյĸ��ڵ㣬�򿪵ĸ��ڵ㣬�رյ��ļ��У�
   * �򿪵��ļ��У�Ҷ�ڵ�
   */
  rootIcon        : 'xyTree/images/foldericon.gif',
  openRootIcon    : 'xyTree/images/openfoldericon.gif',
  folderIcon      : 'xyTree/images/foldericon.gif',
  openFolderIcon  : 'xyTree/images/openfoldericon.gif',
  fileIcon        : 'xyTree/images/file.gif',
  iIcon           : 'xyTree/images/I.gif',
  lIcon           : 'xyTree/images/L.gif',
  lMinusIcon      : 'xyTree/images/Lminus.gif',
  lPlusIcon       : 'xyTree/images/Lplus.gif',
  tIcon           : 'xyTree/images/T.gif',
  tMinusIcon      : 'xyTree/images/Tminus.gif',
  tPlusIcon       : 'xyTree/images/Tplus.gif',
  blankIcon       : 'xyTree/images/blank.gif',
  buzhongIcon     : 'xyTree/images/buzhong.gif',
  quanzhongIcon   : 'xyTree/images/quanzhong.gif',
  jubuzhongIcon   : 'xyTree/images/jubuzhong.gif',
  loadingIcon     : 'xyTree/images/loading.gif',
  defaultText     : 'Tree Item',
  defaultAction   : 'javascript:void(0);',
  defaultBehavior : 'classic',
  usePersistence  : true,
  jianju1         : '5px',   /*���Ǹ�ѡ���ļ��еľ���*/
  jianju3         : '5px',   /*����ͷ����ѡ�򵽵�һͼ��ľ���*/
  jianju2         : '5px'   /*���Ǹ�ѡ�����ֵľ���*/
};

(function() {
  function findProperty(a,arr2){
  	var boo = false;
  	for(var i=0;i<arr2.length; i++)
  		if (arr2[i]==a){
  			boo = true;break;
  		}
  	return boo;
  };
  function jiazaiImg(img){
  	var imgObj = new Image();
  	imgObj.src = img;
  };
  //var arr = ['gif','jpg','jpeg','GIF','JPG','JPEG'];
  for (var j in xyTree.TreeConfig){
    if( j.substring(j.length-4,j.length)=='Icon'){
    	jiazaiImg(xyTree.TreeConfig[j]);
    }
  }
})();


/*
 * ����һЩ������2007/06/16
 */
xyTree.CONSTANT = {
  // defaultNodeClickAction : "xyTree.defaultNodeClickAction",
  treeObjectName         : 'xytreeid',
  
  /*����������DOM����ID����һ����*/
  treeHeadIDPostfix      : 'divhead',
  treeCheckBoxID         : 'imgfuxuan',
  treeJiahaoImgID        : 'imgjiahao',
  
  /*������������ʽ������css�ļ���*/
  treeUserImgStyle       : 'treeyangshiImg',
  treeStyle              : 'treeyangshi',
  
  /*���ǽڵ㱳��ɫ�Ľ�����ɫ*/
  color : ['#ffff00','#ffff33','#ffff66','#ffff99','#ffffcc','#ffffff'],
  colorNum : 6,
  
  /*���ǽڵ㱳��ɫ�Ľ���Ĭ��ʱ�䣬�û������Լ��ı䣬�ۿ�Ч������λ������*/
  timenum:150,
  
  /*���������������õı���*/
  trees : []   //0λ�ô����1
};

/*
 * ȫ�ֺ�����2007/06/16
 * �����˽ڵ�ı���ɫ��ν���
 */
xyTree.fun = {
  slowChange : function (treeXuhao,nodeXuhao,timenum){
    //alert(timenum);

  //alert(arguments.length+' =' + timenum);
    var node = xyTree.CONSTANT.trees[treeXuhao-1].tree.treeArray[nodeXuhao];
     if(node.level > 0)
    if (!node.parent.displaychild) return;
    
    node.timecolor--;
    //window.status = node.timecolor;
    if(node.timecolor < 0) {node.timecolor = 7; return;}
    var a = node.getHtmlElementfuxuanimg().nextSibling;
    a.style.backgroundColor = xyTree.CONSTANT.color[6-node.timecolor];
    if(arguments.length == 2) //����û�δ����ʱ��
    setTimeout("xyTree.fun.slowChange("+ 
      treeXuhao +","+ nodeXuhao +")",xyTree.CONSTANT.timenum);
    else                      //����û�������ʱ��
    setTimeout("xyTree.fun.slowChange("+ 
      treeXuhao +","+ nodeXuhao +","+timenum +")",timenum);
  }
};

/**
 * ��ѡ�����Ĺ��췽��
 * @class ����๹��һ����ѡ������ʵ��
 * @constructor
 * @param {String} name ���ڵ�����
 * @param {String} img ��ѡ������ָ�����ڵ�ͼ��
 */
xyTree.DivTree = function(name,img) {
  /**
   * ���ĸ��ڵ�ͼ��
   * @type String
   */
  this.img;
  if (img) 
    this.img = img;
  var objectname = this.getName();

  /**
   * ���Ľڵ��������
   * @type xyTree.Tree
   */
  this.tree = new xyTree.Tree(name, objectname);
  this.tree.divtree = this;

  /**
   * ����DOM����
   * @type HTMLElement:div
   */
  this.div = this.creatediv();

  /**
   * ����һ���ڵ�
   * @type Array:Node
   * @private
   */
  this.yijiarr = [];
}

/*
 * ���������ȷ��ÿһ����ѡ���������и�Ψһ��
 * ���ƣ������Ǳ�����tree���Զ�����
 */
xyTree.DivTree.count = 0;

xyTree.DivTree.prototype.getName = function() {
  var s = xyTree.CONSTANT.treeObjectName;
  s += (window.xyTree.DivTree.count++);
  this.xuhao = window.xyTree.DivTree.count;
  xyTree.CONSTANT.trees.push(this); //0λ�ô����1
  
  return s;
}

/**
 * �������һ���ڵ�
 * @param {xyTree.Node} node ����ӵ�һ���ڵ�
 */
xyTree.DivTree.prototype.add = function(node) {
  this.tree.add(node);	
}

/**
 * ������̬���һ���ڵ㣬ҳ����������ʾ
 * @param {xyTree.Node} node ��̬��ӵ�һ���ڵ�
 */
xyTree.DivTree.prototype.addDynamic = function(node) {
  this.tree.root.addDynamic(node);	
}


/**
 * ͨ��״�����û�������ҳ��ʼ�������е���
 * @param {Function} funClickNode �����ڵ�Ļص���������ѡ
 * @param {Function} funClickRootNode �������ڵ�Ļص���������ѡ
 */
xyTree.DivTree.prototype.init = function(funClickNode, funClickRootNode) {
  var div = this.div.lastChild;
  //�����е�һ���ڵ��г���
  var root = this.tree.root;
  var arr = root.child;
  var oFragment = document.createDocumentFragment();
  for (var i = 0; i < arr.length; i++) {
    oFragment.appendChild(arr[i].innerhtml());
  }
  div.appendChild(oFragment);
	
  this.clickNode = funClickNode ? funClickNode : this.defaultClickNode;
  this.clickRootNode = funClickRootNode ? funClickRootNode : this.defaultClickRootNode;
}

/**
 * �������ѡ�еĸ�ѡ�򣬲�Ӱ����״
 */
xyTree.DivTree.prototype.initClearAllCheckBox = function() {
  var root = this.tree.root;
  if (root.checked != 0) {//˵����ѡ��
    root.getHtmlElementfuxuanimg().onclick();
  }
}

/**
 * ��������״��ʼ������Ӱ�츴ѡ��
 */
xyTree.DivTree.prototype.initTreeForm = function() {
  var div = this.div.lastChild;  //�������
  while (div.hasChildNodes()) {    //�����DOM
    div.removeChild(div.firstChild);	
  }
  var treeArray = this.tree.treeArray;
  for (var i = 1; i < treeArray.length; i++) {
    var x = treeArray[i];
    x.displaychild = x.zhankaiguo = false;
  }                               //�ѽڵ���������Ը�λ�����˸��ڵ�
  
  this.init(this.clickNode,this.clickRootNode);        //���¼���DOM����
  this.showTreeBody();            //һ����������ʾ
}

/**
 * �Ը�ѡ������ȫ��λ
 */
xyTree.DivTree.prototype.initReset = function() {
  this.initClearAllCheckBox();         //�����
  this.initTreeForm();                 //����״��λ
}


/**
 * ȱʡ�ĵ����ڵ����Ϊ���൱�ڵ�����ѡ��
 * @param {xyTree.Node} node �������Ľڵ�
 */
xyTree.DivTree.prototype.defaultClickNode = function(node) {
  node.getHtmlElementfuxuanimg().onclick();
}

/**
 * ȱʡ�ĵ������ڵ����Ϊ���൱�ڵ������ڵ㸴ѡ��
 */
xyTree.DivTree.prototype.defaultClickRootNode = function() {
  this.div.firstChild.firstChild.nextSibling.onclick();
}

/**
 * ��������DOM���󣬰���ͷ������
 * @private
 * @return DOM������һ��div
 * @type HTMLElement:div
 */
xyTree.DivTree.prototype.creatediv = function() {
  var div = document.createElement('div');
  div.className = xyTree.CONSTANT.treeStyle;
  var divhead = document.createElement('div');
  var divtree = this;
  var qjName = this.tree.objectname;             //�õ�ȫ�ֶ��������
  divhead.id = qjName + xyTree.CONSTANT.treeHeadIDPostfix;//ָ��ͷ��ID
  
  //(1) �����ļ���ͼ�꣬���������
  var img = document.createElement('img');
  if (!this.img) {                     //����û�û��ָ��ͼ��
    img.src = xyTree.TreeConfig.openRootIcon;
    img.align = "absbottom";
    img.onclick = function() {
      var divbody = this.parentNode.parentNode.lastChild;
      if (divbody.style.display == 'block') {
        divbody.style.display = 'none';
        this.src = xyTree.TreeConfig.rootIcon;
        
        divtree.tree.root.displaychild = false;
      }
      else{
        divbody.style.display = 'block';
        this.src = xyTree.TreeConfig.openRootIcon;
        divtree.tree.root.displaychild = true;
      }
    }
  } else {                             //����û�ָ����ͼ��
    img.src = this.img;
    img.className = xyTree.CONSTANT.treeUserImgStyle;
    img.align = "absbottom";
    img.onclick = function() {
      var divbody = this.parentNode.parentNode.lastChild;
      divbody.style.display = (divbody.style.display == 'block')?'none':'block';
      divtree.tree.root.displaychild =(divbody.style.display == 'block')?false:true;
    }
  }
  divhead.appendChild(img);

  //(2) ���Ƹ�ѡ���ͼ�꣬�е����¼�������
  img = document.createElement('img');
  img.id = qjName + xyTree.CONSTANT.treeCheckBoxID + '0'; //�����
  img.src = xyTree.TreeConfig.buzhongIcon; //��ʼ��ʱ���ڵ��ͼ����Ȼ�հ�
  img.align = "top";
  img.style.paddingTop = '3px';
  img.style.marginLeft = xyTree.TreeConfig.jianju3;
  img.onclick = function() {
    var current = divtree.tree.treeArray[0]; //current��ȫ�ֽڵ�
    if (current.checked == 1 || current.checked == 2) {
      current.checked = 0;
      this.src = xyTree.TreeConfig.buzhongIcon;
    } else {
      current.checked = 1;
      this.src = xyTree.TreeConfig.quanzhongIcon;
    }
    current.downDigui(current);
  }
  divhead.appendChild(img);
  
  //(3) ���Ƹ��ڵ���������
  var a = document.createElement('a');
  //a.href = 'javascript:void 0';
  a.appendChild(document.createTextNode(this.tree.treename));
  a.style.marginLeft = xyTree.TreeConfig.jianju2;
  a.onclick = function() {
    divtree.clickRootNode(divtree.tree.root);
  };
  a.onfocus = function(){this.blur();}
  a.onmouseover = function (){this.style.color='blue';}
  a.onmouseout  = function (){this.style.color='black';}
  
  divhead.appendChild(a);
  div.appendChild(divhead);

  var divbody = document.createElement('div');
  divbody.style.display = 'block';
  div.appendChild(divbody);
  
  return div;
}

/**
 * �����Ƿ���ڵ�״̬
 * @return �����Ƿ���ڵ㱻��ȫѡ��
 * @type boolean  
 */
xyTree.DivTree.prototype.isSelectAll = function() {
  return (this.tree.root.checked == 1)?true:false;
}

/**
 * �õ���ѡ�еĽڵ㣬�����ӽڵ�
 * @return �õ���ѡ�еĽڵ㣬�����ӽڵ�
 * @type Array:xyTree.Node  
 */
xyTree.DivTree.prototype.getNodes = function (){
  function getNodesdigui(arr, node) {
    //xieye������������״����
    //����ڵ��checked = 0,��ô�˳�
    //����ڵ��checked = 1,��ô��¼���˳�
    //����ڵ��checked = 2,��ô����ȥ
    if (node.checked == 0)
      /*�պ�����*/ ;
    else if (node.checked == 1 && node.level != 0)
      arr.push(node);
    else if (node.checked == 1 && node.level == 0)
      for (var i = 0; i < node.child.length ; i++)
        getNodesdigui(arr, node.child[i]);
    else
      for (var i = 0; i < node.child.length ; i++)
        getNodesdigui(arr, node.child[i]);
  }
  var resultArr = [];
  getNodesdigui(resultArr, this.tree.root);
  return resultArr;
}

/**
 * �õ���ѡ�е����нڵ㣬
 * @return �õ���ѡ�е����нڵ�
 * @type Array:xyTree.Node  
 */
xyTree.DivTree.prototype.getNodesAll = function (){
  function getNodesdiguiAll(arr, node){
    function getNodesdiguiAllSelected(node2){ //�հ�
      arr.push(node2);
      for(var i = 0; i < node2.child.length ; i++)
        getNodesdiguiAllSelected(node2.child[i]);
    }
    if(node.checked == 0)
      /*�պ�����*/ ;
    else if(node.checked == 1 ){
      arr.push(node);
      for (var i = 0; i < node.child.length ; i++)
      getNodesdiguiAllSelected(node.child[i]);
    }
    else
      for (var i = 0; i < node.child.length ; i++)
        getNodesdiguiAll(arr, node.child[i]);
  }
  var resultArr = [];
  getNodesdiguiAll(resultArr, this.tree.root);
  return resultArr;
}



/**
 * �õ���ѡ�е�Ҷ�ڵ�����
 * @return �õ���ѡ�е�Ҷ�ڵ�����
 * @type Array:xyTree.Node  
 */
xyTree.DivTree.prototype.getNodesMoji = function() {
  function getNodesdiguiMoji(arr, node) {
    function getNodesdiguiMojiSelected(node2) { //�հ���arr��ͬ
      if (node2.child.length == 0)
        arr.push(node2);
      else
        for (var i = 0; i < node2.child.length ; i++)
          getNodesdiguiMojiSelected(node2.child[i]);
    }
    //xieye������������״����
    //����ڵ��checked = 0,��ô�˳�
    //����ڵ��checked = 1,��ô��¼���˳�
    //����ڵ��checked = 2,��ô����ȥ
    if(node.checked == 0)
      /*�պ�����*/ ;
    else if (node.checked == 1) {
      if (node.child.length == 0)
        arr.push(node);
      else
        for (var i = 0; i < node.child.length ; i++)
          getNodesdiguiMojiSelected(node.child[i]);
    }
    else
      for (var i = 0; i < node.child.length ; i++)
        getNodesdiguiMoji(arr, node.child[i]);
  }	
  var resultArr = [];
  getNodesdiguiMoji(resultArr, this.tree.root);
  return resultArr;
}

/**
 * �õ�������ʾ����ĩ���ڵ�
 * @return �õ�������ʾ����ĩ���ڵ�
 * @type Array:xyTree.Node  
 */
xyTree.DivTree.prototype.getNodesDisplay = function (){
  function getNodesdiguiDisplay(arr, node) {
    //xieye������������״����
    //����ڵ��checked = 0,��ô�˳�
    //����ڵ��checked = 1,��ô��¼���˳�
    //����ڵ��checked = 2,��ô����ȥ
    if (node.checked == 0)
      /*�պ�����*/ ;
    else if (node.checked == 1 && !node.displaychild)
      arr.push(node);
    else if (node.checked == 1 && node.displaychild)
      for (var i = 0; i < node.child.length ; i++)
        getNodesdiguiDisplay(arr, node.child[i]);
    else
      for (var i = 0; i < node.child.length ; i++)
        getNodesdiguiDisplay(arr, node.child[i]);
  }
  var resultArr = [];
  getNodesdiguiDisplay(resultArr, this.tree.root);
  return resultArr;
}



/**
 * ��������
 */
xyTree.DivTree.prototype.hideTreeBody = function() {
  this.div.lastChild.style.display = 'none';
  if (!this.img) {
    this.div.firstChild.firstChild.src = xyTree.TreeConfig.rootIcon;
  }
  this.tree.root.displaychild = false;
}

/**
 * ��ʾ����
 */
xyTree.DivTree.prototype.showTreeBody = function() {
  this.div.lastChild.style.display = 'block';
  if (!this.img)
    this.div.firstChild.firstChild.src = xyTree.TreeConfig.openRootIcon;
  this.tree.root.displaychild = true;

}

/**
 * չ��ĳ���ڵ�
 * @param {xyTree.Node} node ��չ���Ľڵ� 
 * @param timenum ��ѡ��������ɫ�����ʱ�䣬Խ����ɫ����Խ����Ĭ��300
 */
xyTree.DivTree.prototype.expandNode = function(node,timenum) {
  if(!node) return ;
  var arr = node.getNodeLink();
  for (var i = 0; i < arr.length - 1; i++){
    arr[i].expandChilds();    
  }
  arr[i].getHtmlElementfuxuanimg().nextSibling.focus();
  if (arguments.length == 2)
    arr[i].slowChange(timenum);
  else
    arr[i].slowChange();
}

/**
 * չ��ĳ���ڵ㲢ѡ����
 * @param {xyTree.Node} node ��չ����ѡ�еĽڵ� 
 * @param timenum ��ѡ��������ɫ�����ʱ�䣬Խ����ɫ����Խ����Ĭ��300
 */
xyTree.DivTree.prototype.expandCheckedNode = function(node,timenum) {
  //alert(124);
  if(!node) return ;
  var arr = node.getNodeLink();
  //var s='';
  //this.showTreeBody();
  for (var i = 0; i < arr.length - 1; i++){
    arr[i].expandChilds();    //���Լ�չ�־��Ǹ��ڵ��
  }
  
  var fuxuan = arr[i].getHtmlElementfuxuanimg();
  if(arr[i].checked == 0)
    fuxuan.onclick();
  else if(arr[i].checked == 2){
    fuxuan.onclick();
    fuxuan.onclick();
  }
  arr[i].getHtmlElementfuxuanimg().nextSibling.focus();
  if (arguments.length == 2)
    arr[i].slowChange(timenum);
  else
    arr[i].slowChange();
  
  //return true;
}

/**
 * ��������Ѱ��һ���ڵ㣬�����ͬ���Ľڵ㣬�������һ��
 * @param {String} name ��Ѱ�ҽڵ������ 
 * @return ���ҵĽڵ�
 * @type xyTree.Node
 */
xyTree.DivTree.prototype.findOneNodeByName = function(name) {
  var arr = this.tree.treeArray;
  for(var i=0;i<arr.length;i++){
    if(arr[i].name == name)
      return arr[i];
    
  }
  return null;
}

/**
 * ����idѰ��һ���ڵ㣬�û������ÿ���ڵ���id���ԣ�����֤����Ψһ��
 * @param {String || int} id ��Ѱ�ҽڵ��id 
 * @return ���ҵĽڵ�
 * @type xyTree.Node
 */
xyTree.DivTree.prototype.findOneNodeById = function(id) {
  var arr = this.tree.treeArray;
  for(var i=0;i<arr.length;i++){
    if(arr[i].id)
      if(arr[i].id == id)
        return arr[i];
    
  }
  return null;
}





