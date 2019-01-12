/**
 * @fileoverview 这是复选框树的3个文件中的一个，表示树。
 * @author xieye
 * @version 4.12  2007/07/25
 */
  
/*
 * 加命名空间xyTree
 */
(function() {
  if (!window.xyTree)
    window.xyTree = {};
})();

/*
 * 指定缺省的图片路径，用户也可以自己修改
 */
xyTree.TreeConfig = {
  /*
   * 以下5个分别是关闭的根节点，打开的根节点，关闭的文件夹，
   * 打开的文件夹，叶节点
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
  jianju1         : '5px',   /*这是复选框到文件夹的距离*/
  jianju3         : '5px',   /*这是头部复选框到第一图标的距离*/
  jianju2         : '5px'   /*这是复选框到文字的距离*/
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
 * 定义一些常量，2007/06/16
 */
xyTree.CONSTANT = {
  // defaultNodeClickAction : "xyTree.defaultNodeClickAction",
  treeObjectName         : 'xytreeid',
  
  /*下面两个是DOM对象ID名的一部分*/
  treeHeadIDPostfix      : 'divhead',
  treeCheckBoxID         : 'imgfuxuan',
  treeJiahaoImgID        : 'imgjiahao',
  
  /*下面两个是样式名，在css文件中*/
  treeUserImgStyle       : 'treeyangshiImg',
  treeStyle              : 'treeyangshi',
  
  /*这是节点背景色的渐变颜色*/
  color : ['#ffff00','#ffff33','#ffff66','#ffff99','#ffffcc','#ffffff'],
  colorNum : 6,
  
  /*这是节点背景色的渐变默认时间，用户可以自己改变，观看效果，单位：毫秒*/
  timenum:150,
  
  /*这是所有树的引用的保存*/
  trees : []   //0位置存代号1
};

/*
 * 全局函数，2007/06/16
 * 定义了节点的背景色如何渐变
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
    if(arguments.length == 2) //如果用户未定义时间
    setTimeout("xyTree.fun.slowChange("+ 
      treeXuhao +","+ nodeXuhao +")",xyTree.CONSTANT.timenum);
    else                      //如果用户定义了时间
    setTimeout("xyTree.fun.slowChange("+ 
      treeXuhao +","+ nodeXuhao +","+timenum +")",timenum);
  }
};

/**
 * 复选框树的构造方法
 * @class 这个类构造一个复选框树的实例
 * @constructor
 * @param {String} name 根节点名称
 * @param {String} img 可选，可以指定根节点图标
 */
xyTree.DivTree = function(name,img) {
  /**
   * 树的根节点图标
   * @type String
   */
  this.img;
  if (img) 
    this.img = img;
  var objectname = this.getName();

  /**
   * 树的节点数组对象
   * @type xyTree.Tree
   */
  this.tree = new xyTree.Tree(name, objectname);
  this.tree.divtree = this;

  /**
   * 树的DOM对象
   * @type HTMLElement:div
   */
  this.div = this.creatediv();

  /**
   * 树的一级节点
   * @type Array:Node
   * @private
   */
  this.yijiarr = [];
}

/*
 * 用类变量来确保每一个复选框树对象有个唯一的
 * 名称，不过是保存在tree属性对象中
 */
xyTree.DivTree.count = 0;

xyTree.DivTree.prototype.getName = function() {
  var s = xyTree.CONSTANT.treeObjectName;
  s += (window.xyTree.DivTree.count++);
  this.xuhao = window.xyTree.DivTree.count;
  xyTree.CONSTANT.trees.push(this); //0位置存代号1
  
  return s;
}

/**
 * 给树添加一级节点
 * @param {xyTree.Node} node 待添加的一级节点
 */
xyTree.DivTree.prototype.add = function(node) {
  this.tree.add(node);	
}

/**
 * 给树动态添加一级节点，页面上立刻显示
 * @param {xyTree.Node} node 动态添加的一级节点
 */
xyTree.DivTree.prototype.addDynamic = function(node) {
  this.tree.root.addDynamic(node);	
}


/**
 * 通常状况下用户会在网页初始化程序中调用
 * @param {Function} funClickNode 单击节点的回调函数，可选
 * @param {Function} funClickRootNode 单击根节点的回调函数，可选
 */
xyTree.DivTree.prototype.init = function(funClickNode, funClickRootNode) {
  var div = this.div.lastChild;
  //把所有的一级节点列出来
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
 * 给树清空选中的复选框，不影响形状
 */
xyTree.DivTree.prototype.initClearAllCheckBox = function() {
  var root = this.tree.root;
  if (root.checked != 0) {//说明有选择
    root.getHtmlElementfuxuanimg().onclick();
  }
}

/**
 * 给树的形状初始化，不影响复选框
 */
xyTree.DivTree.prototype.initTreeForm = function() {
  var div = this.div.lastChild;  //获得树干
  while (div.hasChildNodes()) {    //先清空DOM
    div.removeChild(div.firstChild);	
  }
  var treeArray = this.tree.treeArray;
  for (var i = 1; i < treeArray.length; i++) {
    var x = treeArray[i];
    x.displaychild = x.zhankaiguo = false;
  }                               //把节点的两个属性复位，除了根节点
  
  this.init(this.clickNode,this.clickRootNode);        //重新加载DOM对象
  this.showTreeBody();            //一定让树干显示
}

/**
 * 对复选框树完全复位
 */
xyTree.DivTree.prototype.initReset = function() {
  this.initClearAllCheckBox();         //先清空
  this.initTreeForm();                 //再形状复位
}


/**
 * 缺省的单击节点的行为，相当于单击复选框
 * @param {xyTree.Node} node 被单击的节点
 */
xyTree.DivTree.prototype.defaultClickNode = function(node) {
  node.getHtmlElementfuxuanimg().onclick();
}

/**
 * 缺省的单击根节点的行为，相当于单击根节点复选框
 */
xyTree.DivTree.prototype.defaultClickRootNode = function() {
  this.div.firstChild.firstChild.nextSibling.onclick();
}

/**
 * 创建树的DOM对象，包括头和树干
 * @private
 * @return DOM对象，是一个div
 * @type HTMLElement:div
 */
xyTree.DivTree.prototype.creatediv = function() {
  var div = document.createElement('div');
  div.className = xyTree.CONSTANT.treeStyle;
  var divhead = document.createElement('div');
  var divtree = this;
  var qjName = this.tree.objectname;             //得到全局对象的名称
  divhead.id = qjName + xyTree.CONSTANT.treeHeadIDPostfix;//指定头的ID
  
  //(1) 绘制文件夹图标，分两种情况
  var img = document.createElement('img');
  if (!this.img) {                     //如果用户没有指定图标
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
  } else {                             //如果用户指定了图标
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

  //(2) 绘制复选框的图标，有单击事件，复杂
  img = document.createElement('img');
  img.id = qjName + xyTree.CONSTANT.treeCheckBoxID + '0'; //做标记
  img.src = xyTree.TreeConfig.buzhongIcon; //初始化时根节点的图标自然空白
  img.align = "top";
  img.style.paddingTop = '3px';
  img.style.marginLeft = xyTree.TreeConfig.jianju3;
  img.onclick = function() {
    var current = divtree.tree.treeArray[0]; //current是全局节点
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
  
  //(3) 绘制根节点文字链接
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
 * 返回是否根节点状态
 * @return 返回是否根节点被完全选中
 * @type boolean  
 */
xyTree.DivTree.prototype.isSelectAll = function() {
  return (this.tree.root.checked == 1)?true:false;
}

/**
 * 得到被选中的节点，不含子节点
 * @return 得到被选中的节点，不含子节点
 * @type Array:xyTree.Node  
 */
xyTree.DivTree.prototype.getNodes = function (){
  function getNodesdigui(arr, node) {
    //xieye：决定采用树状遍历
    //如果节点的checked = 0,那么退出
    //如果节点的checked = 1,那么记录，退出
    //如果节点的checked = 2,那么跟进去
    if (node.checked == 0)
      /*空函数体*/ ;
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
 * 得到被选中的所有节点，
 * @return 得到被选中的所有节点
 * @type Array:xyTree.Node  
 */
xyTree.DivTree.prototype.getNodesAll = function (){
  function getNodesdiguiAll(arr, node){
    function getNodesdiguiAllSelected(node2){ //闭包
      arr.push(node2);
      for(var i = 0; i < node2.child.length ; i++)
        getNodesdiguiAllSelected(node2.child[i]);
    }
    if(node.checked == 0)
      /*空函数体*/ ;
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
 * 得到被选中的叶节点数组
 * @return 得到被选中的叶节点数组
 * @type Array:xyTree.Node  
 */
xyTree.DivTree.prototype.getNodesMoji = function() {
  function getNodesdiguiMoji(arr, node) {
    function getNodesdiguiMojiSelected(node2) { //闭包，arr相同
      if (node2.child.length == 0)
        arr.push(node2);
      else
        for (var i = 0; i < node2.child.length ; i++)
          getNodesdiguiMojiSelected(node2.child[i]);
    }
    //xieye：决定采用树状遍历
    //如果节点的checked = 0,那么退出
    //如果节点的checked = 1,那么记录，退出
    //如果节点的checked = 2,那么跟进去
    if(node.checked == 0)
      /*空函数体*/ ;
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
 * 得到正在显示的最末级节点
 * @return 得到正在显示的最末级节点
 * @type Array:xyTree.Node  
 */
xyTree.DivTree.prototype.getNodesDisplay = function (){
  function getNodesdiguiDisplay(arr, node) {
    //xieye：决定采用树状遍历
    //如果节点的checked = 0,那么退出
    //如果节点的checked = 1,那么记录，退出
    //如果节点的checked = 2,那么跟进去
    if (node.checked == 0)
      /*空函数体*/ ;
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
 * 隐藏树干
 */
xyTree.DivTree.prototype.hideTreeBody = function() {
  this.div.lastChild.style.display = 'none';
  if (!this.img) {
    this.div.firstChild.firstChild.src = xyTree.TreeConfig.rootIcon;
  }
  this.tree.root.displaychild = false;
}

/**
 * 显示树干
 */
xyTree.DivTree.prototype.showTreeBody = function() {
  this.div.lastChild.style.display = 'block';
  if (!this.img)
    this.div.firstChild.firstChild.src = xyTree.TreeConfig.openRootIcon;
  this.tree.root.displaychild = true;

}

/**
 * 展开某个节点
 * @param {xyTree.Node} node 待展开的节点 
 * @param timenum 可选参数，颜色渐变的时间，越大颜色保留越长，默认300
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
 * 展开某个节点并选中它
 * @param {xyTree.Node} node 待展开并选中的节点 
 * @param timenum 可选参数，颜色渐变的时间，越大颜色保留越长，默认300
 */
xyTree.DivTree.prototype.expandCheckedNode = function(node,timenum) {
  //alert(124);
  if(!node) return ;
  var arr = node.getNodeLink();
  //var s='';
  //this.showTreeBody();
  for (var i = 0; i < arr.length - 1; i++){
    arr[i].expandChilds();    //把自己展现就是父节点打开
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
 * 根据名称寻找一个节点，如果有同名的节点，就随便找一个
 * @param {String} name 待寻找节点的名称 
 * @return 想找的节点
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
 * 根据id寻找一个节点，用户必须给每个节点设id属性，并保证它的唯一性
 * @param {String || int} id 待寻找节点的id 
 * @return 想找的节点
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





