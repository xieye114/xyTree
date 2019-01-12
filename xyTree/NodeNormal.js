(function() {
  if (!window.xyTree)
    window.xyTree = {};
})();

//xieyeע������������밴��˳��ӽڵ㣡��
//============================================
xyTree.NodeNormal = function(name) {
  this.name = name ;        //�ڵ������ϵ���ʾ
  this.id;
    
  this.parent;       //�ڵ�ĸ��ڵ�
  this.previous;     //�ڵ��ǰһ���ڵ�
  this.next;         //�ڵ����һ���ڵ�
  this.child = [];   //�ڵ���ӽڵ�
  
  this.level = 0;	   //�ڵ�ļ��𣬸��ڵ�Ϊ0
  this.tree;         //�ӽڵ���������
  this.xuhao = 0;    //�ڵ������е���ţ����ڵ�Ϊ0��
  this.displaychild = false; //�ӽڵ�������ʾ��
  this.zhankaiguo = false;  //��ʾ��ʷ��¼��һ����true���޷��ı�
  this.img;
}

//��ʾ�ڵ�����
xyTree.NodeNormal.prototype.toString = function() {
  var s = '[' + this.id + ']=[' + this.name + ']'
    + '[level=]' + this.level;
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
//xieye20070122��������߼�����ӵġ�
xyTree.NodeNormal.prototype.innerhtml = function() {
  var div = document.createElement('div');
  var qj = this.tree.objectname; //�õ�ȫ�ֶ��������
  //var qjlength = qj.length;
  //alert(aaaa);
  //���ڵ��div���id������������ţ�
  div.id = qj + this.xuhao; //�����
  div.className = 'qiguai'; //�����,���
  var current = this;
  //alert(div.id);
  var oFragment = document.createDocumentFragment();
  
  //xieye��������forѭ����ʾǰ��Ŀո������
  //�磺2���ڵ�ѭ��һ�Ρ�3���ڵ㣬ѭ������
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
    //xieye��״̬��ȫ�ֱ����ڵ��У�
    //xieye������Ҫ�жϣ�������ڵ����ӽڵ�
    var fu = this.parentNode;
    var childnodes = current.child;
  	
    if (childnodes.length == 0) {/*alert('���ӽڵ�');*/return;}
    var shimowei = current.next?false:true;
    if (!current.displaychild) { //����ڵ���ӽڵ�δ��
      current.displaychild = true;
      //�ӱ��������ӣ���Ҫ�����ǲ���ĩ�ڵ�
      this.src = current.getimgdianji(current.displaychild,shimowei);
      //alert(this.src);
      //�����Ѿ�֪����ţ�Ҫ�����ĸ��ڵ�����ӽڵ�
      if (!current.img)
        this.nextSibling.src = xyTree.TreeConfigNormal.openFolderIcon;

      if (!current.zhankaiguo) {
        //�����¼���	
        //alert('�¼���');
        current.zhankaiguo = true;
        //�ӱ��������ӣ���Ҫ�����ǲ���ĩ�ڵ�
        var oFragmentChildDiv = document.createDocumentFragment();
        for (var i = 0; i < childnodes.length; i++)
          oFragmentChildDiv.appendChild(childnodes[i].innerhtml());
        fu.appendChild(oFragmentChildDiv);	
      } else {
        //���ﲻ�¼���	
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
      //xieye��������ڵ��������е�div��Ϊ������ʾ
      for (var i = fu.childNodes.length - 1; 
          fu.childNodes[i].className == 'qiguai' && i >= 0; i--)
        fu.childNodes[i].style.display = 'none';
    }
  };
  oFragment.appendChild(img);
  
  img = document.createElement('img');
  img.id = qj + 'imgfold' + this.xuhao; //�����2007/06/15

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

//ͨ��ȫ�ֽڵ�õ��ļ���img����
xyTree.NodeNormal.prototype.getHtmlElementFoldImg = function() {
  var dd = this.tree.objectname + 'imgfold' + this.xuhao;
  return document.getElementById(dd); //���ǻ���е�div
}


//���ظ��ڵ㣨���¸��������ã�
xyTree.NodeNormal.prototype.getparent = function(int) {
  return this.getparentdigui(int,this);
}

//���ظ��ڵ㣨���ϸ��������ã�
xyTree.NodeNormal.prototype.getparentdigui = function(int,node) {
  var node = node.parent;
  int--;
  if (int == 0)
    return node;
  return this.getparentdigui(int,node);
}

//���ݸ��ڵ㷵�����߻��ǿո���һ��div����ǰ���ͼƬ
xyTree.NodeNormal.prototype.getimgkongge = function(node) {
  //(1)���ڵ㲻��ĩβ
  //(2)���ڵ���ĩβ
  var s;
  if (node.next)   //(1)���ڵ㲻��ĩβ
    s = xyTree.TreeConfigNormal.iIcon;
  else                      //(2)���ڵ���ĩβ
    s = xyTree.TreeConfigNormal.blankIcon;
  return s;
}

//���ؼӺ�λ�õ�ͼƬ�������ǵ�����ж�
xyTree.NodeNormal.prototype.getimgdianji = function(img1,mowei) {
  var s;
  if (mowei)                      //��ĩβ
    if (img1){                     //��Ϊ��
      s = xyTree.TreeConfigNormal.lMinusIcon;
    }
    else{                          //��Ϊ��    
      s = xyTree.TreeConfigNormal.lPlusIcon;  
    }
  else                            //����ĩβ
    if (img1){                     //��Ϊ��
      s = xyTree.TreeConfigNormal.tMinusIcon;
    }
    else {                         //��Ϊ��    
      s = xyTree.TreeConfigNormal.tPlusIcon;
    }
  return s;
}


//�����ļ���ͼƬ
xyTree.NodeNormal.prototype.getimgfold = function() {
  //xieye����3�֣����ļ��У����ļ��У�һ��ֽ
  if(this.img)
    return this.img;
  var s;
  if (this.child.length > 0) //���ӽڵ�
    if (this.displaychild)//�ӽڵ�����ʾ
      s = xyTree.TreeConfigNormal.openFolderIcon;
    else                  //�ӽڵ㲻����ʾ 
      s = xyTree.TreeConfigNormal.folderIcon;
  else                       //���ӽڵ�
    s = xyTree.TreeConfigNormal.fileIcon;  
  return s;
}

//���ؼӺ�λ�õ�ͼƬ
xyTree.NodeNormal.prototype.getimgjiahao = function() {
  //xieye����4�֣�
  //(1)���ӽڵ㣬����ĩβ
  //(2)���ӽڵ㣬��ĩβ
  //(3)���ӽڵ㣬����ĩβ
  //(4)���ӽڵ㣬��ĩβ
  var s;
  if (this.child.length > 0){ //���ӽڵ�
    if(this.next)  //����ĩβ
      s = xyTree.TreeConfigNormal.tPlusIcon;
    else           //��ĩβ   
      s = xyTree.TreeConfigNormal.lPlusIcon;
  }else{                      //���ӽڵ�
    if(this.next)  //����ĩβ
      s = xyTree.TreeConfigNormal.tIcon;
    else           //��ĩβ   
      s = xyTree.TreeConfigNormal.lIcon;
    }
  return s;
}

//�����ӽڵ����ӷ���
xyTree.NodeNormal.prototype.add = function (node){
  //(1)��������ģ� child�ӽڵ㣬
  var chang = this.child.length;
  this.child[chang] = node;
  	
  //(2)Ҫ����node�ģ�parent��level��tree����������һ���ڵ㣬�ӽڵ�
  node.parent = this;
  node.level = this.level + 1;
  node.tree = this.tree;
  	
  //(3)����node��ǰһ���ڵ�� ��next,     node��previous��
  if(chang > 0){
    node.previous = this.child[chang - 1];
    node.previous.next = node;
  } 
  	
  //(4)��������treeArray[],     node��xuhao��
  chang =  node.tree.treeArray.length;
  node.tree.treeArray[chang] = node;
  node.xuhao = chang;
  	
  //(5)��������maxlevel;
  if(node.level > this.tree.maxlevel)
    this.tree.maxlevel = node.level;
};

	//����ڵ�ķ������Է��� �����ӽڵ�ĸ�����ע��
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
//���������ʾ���ã��Ǳ����õķ���
xyTree.NodeNormal.prototype.display = function (){
  for (var i = 0; i < this.level; i++)
    this.tree.tempString += ' ';
  this.tree.tempString += '[' + this.id + ']=[' + this.name + ']' + '\n';
  for (var i = 0; i < this.child.length; i++)
    this.child[i].display();
};


