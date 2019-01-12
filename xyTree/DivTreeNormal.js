(function() {
  if (!window.xyTree)
    window.xyTree = {};
})();

xyTree.TreeConfigNormal = {
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
  defaultText     : 'Tree Item',
  defaultAction   : 'javascript:void(0);',
  defaultBehavior : 'classic',
  usePersistence	: true,
  jianju1         : '4px'
};
//���һ��ȫ�ֱ���2007/06/15
xyTree.defaultNodeClickAction ="xyTree.defaultNodeClickAction";//����ȡֵ



//div����
//=====================================================================
xyTree.DivTreeNormal = function(name,img) {
  this.img;
  if(img) 
    this.img = img;
  
  var objectname = this.getName();
  this.tree = new xyTree.TreeNormal(name, objectname);
  this.tree.divtree = this;
  this.div = this.creatediv();
}

xyTree.DivTreeNormal.count = 0;

xyTree.DivTreeNormal.prototype.getName = function() {
  var s = "xytreenormalid" ;
  s += (window.xyTree.DivTreeNormal.count++);
  return s;
}


xyTree.DivTreeNormal.prototype.add = function(node) {
  this.tree.add(node);	
}

xyTree.DivTreeNormal.prototype.init = function(funClickNode, funClickRootNode) {
  var div = this.div.lastChild;
  //�����е�һ���ڵ��г���
  //���ȵõ����е�һ���ڵ�
  var root = this.tree.root;
  var arr = root.child;
  for(var i = 0; i < arr.length; i++ )
    div.appendChild(arr[i].innerhtml());
  
  this.clickNode = funClickNode ? funClickNode : this.defaultClickNode;
  this.clickRootNode = funClickRootNode ? funClickRootNode : this.defaultClickRootNode;
}

xyTree.DivTreeNormal.prototype.creatediv = function (){
  var divtree = this;
  var div = document.createElement('div');
  div.className = 'treeyangshi';
  
  var divhead = document.createElement('div');
  var img = document.createElement('img');
  
  if (!this.img) {
    img.src = xyTree.TreeConfigNormal.openRootIcon;
    img.onclick = function() {
      var divbody = this.parentNode.parentNode.lastChild;
      if (divbody.style.display == 'block') {
        divbody.style.display = 'none';
        img.src = xyTree.TreeConfigNormal.rootIcon;
      } else {
        divbody.style.display = 'block';
        img.src = xyTree.TreeConfigNormal.openRootIcon;
      }
    }
  } else {
    img.src = this.img;
    img.className = 'treeyangshiImg';
    img.onclick = function() {
      var divbody = this.parentNode.parentNode.lastChild;
      if (divbody.style.display == 'block') {
        divbody.style.display = 'none';
        //img.src = xyTree.TreeConfigNormal.rootIcon;
      } else {
        divbody.style.display = 'block';
        //img.src = xyTree.TreeConfigNormal.openRootIcon;
      }
    }
  }
  
  img.align = "absbottom";
  divhead.appendChild(img);

  var qj = this.tree.objectname; //�õ�ȫ�ֶ��������
  var a = document.createElement('a');
  a.href = 'javascript:void(0);';
  a.onclick = function() {
    divtree.clickRootNode();
  };
  a.onfocus = function() {this.blur();}
  a.appendChild(document.createTextNode(this.tree.treename));
  a.style.marginLeft = xyTree.TreeConfigNormal.jianju1;
  
  divhead.appendChild(a);
  div.appendChild(divhead);

  var divbody = document.createElement('div');
  divbody.style.display = 'block';
  div.appendChild(divbody);
  
  return div;
}



xyTree.DivTreeNormal.prototype.hideTreeBody = function() {
  this.div.lastChild.style.display = 'none';
  if (!this.img) {
    this.div.firstChild.firstChild.src = xyTree.TreeConfigNormal.rootIcon;
  }	  
}

xyTree.DivTreeNormal.prototype.showTreeBody = function() {
  this.div.lastChild.style.display = 'block';
  if (!this.img) {
    this.div.firstChild.firstChild.src = xyTree.TreeConfigNormal.openRootIcon;
  }	  
}


/**
 * ȱʡ�ĵ����ڵ����Ϊ���൱�ڵ����ļ���
 * @param {xyTree.Node} node �������Ľڵ�
 */
xyTree.DivTreeNormal.prototype.defaultClickNode = function(node) {
  node.getHtmlElementFoldImg().onclick();
}

/**
 * ȱʡ�ĵ������ڵ����Ϊ���൱�ڵ������ڵ㸴ѡ��
 */
xyTree.DivTreeNormal.prototype.defaultClickRootNode = function() {
  this.div.firstChild.firstChild.onclick();
}
