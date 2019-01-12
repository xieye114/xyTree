//定义树使用了命名空间，带了第2个参数表示根节点图标，固定了
var myPC = new xyTree.DivTreeNormal('桌面','userImages/035.gif');

//这5个变量是临时使用的，名字无所谓
var node1,node2,node3,node4,node5;

//定义节点也要使用命名空间，使用深度遍历方法逐个定义
node1 = new xyTree.NodeNormal('我的文档');
//img属性是规定的，要加图片就用img
node1.img = 'userImages/127.gif';
myPC.add(node1);

node2 = new xyTree.NodeNormal('我的视频');
node2.img = 'userImages/130.gif';
node1.add(node2);

node2 = new xyTree.NodeNormal('我的图像');
node2.img = 'userImages/128.gif';
node1.add(node2);

node1 = new xyTree.NodeNormal('我的电脑');
node1.img = 'userImages/016.gif';
myPC.add(node1);

node2 = new xyTree.NodeNormal('3.5软盘(A:)');
node2.img = 'userImages/007.gif';
node1.add(node2);

node2 = new xyTree.NodeNormal('C盘(C:)');
node2.img = 'userImages/009.gif';
node1.add(node2);

node3 = new xyTree.NodeNormal('Documents and Settings');
node3.img = 'userImages/004.gif';
node2.add(node3);

node3 = new xyTree.NodeNormal('Program Files');
node3.img = 'userImages/004.gif';
node2.add(node3);

node3 = new xyTree.NodeNormal('Recycled');
node3.img = 'userImages/032.gif';
node2.add(node3);

node3 = new xyTree.NodeNormal('WINDOWS');
node3.img = 'userImages/004.gif';
node2.add(node3);

node2 = new xyTree.NodeNormal('D盘(D:)');
node2.img = 'userImages/009.gif';
node1.add(node2);

node2 = new xyTree.NodeNormal('E盘(E:)');
node2.img = 'userImages/009.gif';
node1.add(node2);

node2 = new xyTree.NodeNormal('DVD驱动器(F:)');
node2.img = 'userImages/012.gif';
node1.add(node2);

node2 = new xyTree.NodeNormal('控制面板');
node2.img = 'userImages/022.gif';
node1.add(node2);

node3 = new xyTree.NodeNormal('打印机和传真');
node3.img = 'userImages/059.gif';
node2.add(node3);

node3 = new xyTree.NodeNormal('管理工具');
node3.img = 'userImages/036.gif';
node2.add(node3);

node3 = new xyTree.NodeNormal('任务计划');
node3.img = 'userImages/218.gif';
node2.add(node3);

node3 = new xyTree.NodeNormal('扫描仪和照相机');
node3.img = 'userImages/203.gif';
node2.add(node3);

node3 = new xyTree.NodeNormal('网络连接');
node3.img = 'userImages/089.gif';
node2.add(node3);

node3 = new xyTree.NodeNormal('字体');
node3.img = 'userImages/039.gif';
node2.add(node3);

node1 = new xyTree.NodeNormal('网上邻居');
node1.img = 'userImages/018.gif';
myPC.add(node1);

node2 = new xyTree.NodeNormal('整个网络');
node2.img = 'userImages/014.gif';
node1.add(node2);

node3 = new xyTree.NodeNormal('Microsoft Terminal Services');
node3.img = 'userImages/015.gif';
node2.add(node3);

node3 = new xyTree.NodeNormal('Microsoft Windows Network');
node3.img = 'userImages/015.gif';
node2.add(node3);

node4 = new xyTree.NodeNormal('Mshome');
node4.img = 'userImages/019.gif';
node3.add(node4);

node3 = new xyTree.NodeNormal('Web Client Network');
node3.img = 'userImages/015.gif';
node2.add(node3);

node1 = new xyTree.NodeNormal('回收站');
node1.img = 'userImages/033.gif';
myPC.add(node1);

