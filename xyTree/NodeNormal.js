(function() {
  if (!window.xyTree)
    window.xyTree = {};
})();

//xieye注：这个方法必须按照顺序加节点！！
//============================================
xyTree.NodeNormal = function(name) {
  this.name = name ;        //节点在树上的显示
  this.id;
    
  this.parent;       //节点的父节点
  this.previous;     //节点的前一个节点
  this.next;         //节点的下一个节点
  this.child = [];   //节点的子节点
  
  this.level = 0;	   //节点的级别，根节点为0
  this.tree;         //从节点获得树对象
  this.xuhao = 0;    //节点在树中的序号，根节点为0；
  this.displaychild = false; //子节点正在显示吗？
  this.zhankaiguo = false;  //表示历史记录，一旦变true，无法改变
  this.img;
}

//显示节点自身
xyTree.NodeNormal.prototype.toString = function() {
  var s = '[' + this.id + ']=[' + this.name + ']'
    + '[level=]' + this.level;
  return s;
};


/*
<div>
  <img src="images/Lplus.png"  align="absbottom"  />
  <img src="images/foldericon.png"  align="absbottom"  style="margin-left:-6px;"  />
  <a href="javascript:void(0);">玄武分局</a>
  <div><img/><img/><a/>某某派出所</div> 
</div>
*/
//xieye20070122：这里的逻辑是最复杂的。
xyTree.NodeNormal.prototype.innerhtml = function() {
  var div = document.createElement('div');
  var qj = this.tree.objectname; //得到全局对象的名称
  //var qjlength = qj.length;
  //alert(aaaa);
  //给节点的div添加id，＝树名＋序号；
  div.id = qj + this.xuhao; //做标记
  div.className = 'qiguai'; //做标记,奇怪
  var current = this;
  //alert(div.id);
  var oFragment = document.createDocumentFragment();
  
  //xieye：这里用for循环表示前面的空格或竖线
  //如：2级节点循环一次。3级节点，循环两次
  for (var i = this.level - 1; i > 0; i--) {
    //alert(this.level);
    var img = document.createElement('img');
    var qq = this.getparent(i);
    //alert(i+' = '+qq);
    img.src = this.getimgkongge(qq);
    //alert(img.src);
    img.align = "absbottom";
    oFragment.appendChild(img);
  }
  
  var img = document.createElement('img');
  img.src = this.getimgjiahao();
  img.align = "absbottom";
  
  img.onclick = function() { 
    //xieye：状态在全局变量节点中，
    //xieye：这里要判断，如果本节点无子节点
    var fu = this.parentNode;
    var childnodes = current.child;
  	
    if (childnodes.length == 0) {/*alert('无子节点');*/return;}
    var shimowei = current.next?false:true;
    if (!current.displaychild) { //如果节点的子节点未打开
      current.displaychild = true;
      //加变减，减变加，但要考虑是不是末节点
      this.src = current.getimgdianji(current.displaychild,shimowei);
      //alert(this.src);
      //现在已经知道序号，要求他的父节点添加子节点
      if (!current.img)
        this.nextSibling.src = xyTree.TreeConfigNormal.openFolderIcon;

      if (!current.zhankaiguo) {
        //这里新加行	
        //alert('新加行');
        current.zhankaiguo = true;
        //加变减，减变加，但要考虑是不是末节点
        var oFragmentChildDiv = document.createDocumentFragment();
        for (var i = 0; i < childnodes.length; i++)
          oFragmentChildDiv.appendChild(childnodes[i].innerhtml());
        fu.appendChild(oFragmentChildDiv);	
      } else {
        //这里不新加行	
        for (var i = fu.childNodes.length - 1; 
            fu.childNodes[i].className == 'qiguai' && i >= 0; i--)
          fu.childNodes[i].style.display = 'block';
      }

    } else {
      current.displaychild = false;
      this.src = current.getimgdianji(current.displaychild,shimowei);
      if (!current.img)
        this.nextSibling.src = xyTree.TreeConfigNormal.folderIcon;
      //while(fu.lastChild.className == 'qiguai')
      //fu.removeChild(fu.lastChild);
      //xieye：把这个节点下面所有的div设为隐藏显示
      for (var i = fu.childNodes.length - 1; 
          fu.childNodes[i].className == 'qiguai' && i >= 0; i--)
        fu.childNodes[i].style.display = 'none';
    }
  };
  oFragment.appendChild(img);
  
  img = document.createElement('img');
  img.id = qj + 'imgfold' + this.xuhao; //做标记2007/06/15

  img.src = this.getimgfold();
  if(this.img)
    img.className = 'treeyangshiImg';
  	  
  img.onclick = function() {
    this.previousSibling.onclick();	
  }
  
  img.align = "absbottom";
  oFragment.appendChild(img);
  
  var a = document.createElement('a');
  a.href = 'javascript:void(0)';
  //var xuhao = this.xuhao;
  a.onclick = function() {
    current.tree.divtree.clickNode(current);
  };
  a.onfocus = function() {this.blur();}

  a.appendChild(document.createTextNode(this.name));
  a.style.marginLeft = xyTree.TreeConfigNormal.jianju1;
  
  oFragment.appendChild(a);
  div.appendChild(oFragment);
  return div;
}

//通过全局节点得到文件夹img对象
xyTree.NodeNormal.prototype.getHtmlElementFoldImg = function() {
  var dd = this.tree.objectname + 'imgfold' + this.xuhao;
  return document.getElementById(dd); //这是获得行的div
}


//返回父节点（与下个方法连用）
xyTree.NodeNormal.prototype.getparent = function(int) {
  return this.getparentdigui(int,this);
}

//返回父节点（与上个方法连用）
xyTree.NodeNormal.prototype.getparentdigui = function(int,node) {
  var node = node.parent;
  int--;
  if (int == 0)
    return node;
  return this.getparentdigui(int,node);
}

//根据父节点返回竖线还是空格，是一行div中最前面的图片
xyTree.NodeNormal.prototype.getimgkongge = function(node) {
  //(1)父节点不是末尾
  //(2)父节点是末尾
  var s;
  if (node.next)   //(1)父节点不是末尾
    s = xyTree.TreeConfigNormal.iIcon;
  else                      //(2)父节点是末尾
    s = xyTree.TreeConfigNormal.blankIcon;
  return s;
}

//返回加号位置的图片，不过是点击后判断
xyTree.NodeNormal.prototype.getimgdianji = function(img1,mowei) {
  var s;
  if (mowei)                      //在末尾
    if (img1){                     //变为加
      s = xyTree.TreeConfigNormal.lMinusIcon;
    }
    else{                          //变为减    
      s = xyTree.TreeConfigNormal.lPlusIcon;  
    }
  else                            //不在末尾
    if (img1){                     //变为加
      s = xyTree.TreeConfigNormal.tMinusIcon;
    }
    else {                         //变为减    
      s = xyTree.TreeConfigNormal.tPlusIcon;
    }
  return s;
}


//返回文件夹图片
xyTree.NodeNormal.prototype.getimgfold = function() {
  //xieye：有3种，开文件夹，闭文件夹，一张纸
  if(this.img)
    return this.img;
  var s;
  if (this.child.length > 0) //有子节点
    if (this.displaychild)//子节点在显示
      s = xyTree.TreeConfigNormal.openFolderIcon;
    else                  //子节点不在显示 
      s = xyTree.TreeConfigNormal.folderIcon;
  else                       //无子节点
    s = xyTree.TreeConfigNormal.fileIcon;  
  return s;
}

//返回加号位置的图片
xyTree.NodeNormal.prototype.getimgjiahao = function() {
  //xieye：有4种，
  //(1)有子节点，不是末尾
  //(2)有子节点，是末尾
  //(3)无子节点，不是末尾
  //(4)无子节点，是末尾
  var s;
  if (this.child.length > 0){ //有子节点
    if(this.next)  //不是末尾
      s = xyTree.TreeConfigNormal.tPlusIcon;
    else           //是末尾   
      s = xyTree.TreeConfigNormal.lPlusIcon;
  }else{                      //无子节点
    if(this.next)  //不是末尾
      s = xyTree.TreeConfigNormal.tIcon;
    else           //是末尾   
      s = xyTree.TreeConfigNormal.lIcon;
    }
  return s;
}

//这是子节点的添加方法
xyTree.NodeNormal.prototype.add = function (node){
  //(1)设置自身的： child子节点，
  var chang = this.child.length;
  this.child[chang] = node;
  	
  //(2)要设置node的：parent，level，tree，不设置下一个节点，子节点
  node.parent = this;
  node.level = this.level + 1;
  node.tree = this.tree;
  	
  //(3)设置node的前一个节点的 ：next,     node的previous，
  if(chang > 0){
    node.previous = this.child[chang - 1];
    node.previous.next = node;
  } 
  	
  //(4)设置树的treeArray[],     node的xuhao，
  chang =  node.tree.treeArray.length;
  node.tree.treeArray[chang] = node;
  node.xuhao = chang;
  	
  //(5)设置树的maxlevel;
  if(node.level > this.tree.maxlevel)
    this.tree.maxlevel = node.level;
};

	//这个节点的方法可以返回 所有子节点的个数，注：
xyTree.NodeNormal.prototype.getAllChildsNum = function (){
  var num = this.xuhao;
  var j = 0;
  var level = this.level;
  num++;
  while(num < this.tree.nodeArray.length){
    if (this.tree.treeArray[num++].level <= level)
      break;
    j++;
  }
  return j;
}
//这个方法显示树用，是被调用的方法
xyTree.NodeNormal.prototype.display = function (){
  for (var i = 0; i < this.level; i++)
    this.tree.tempString += ' ';
  this.tree.tempString += '[' + this.id + ']=[' + this.name + ']' + '\n';
  for (var i = 0; i < this.child.length; i++)
    this.child[i].display();
};


