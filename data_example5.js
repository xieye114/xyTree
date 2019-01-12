//定义树使用了命名空间
var treeFenju2 = new xyTree.DivTree('市公安局2');

//这5个变量是临时使用的，名字无所谓
var node1,node2,node3,node4,node5;

//定义节点也要使用命名空间，使用深度遍历方法逐个定义
node1 = new xyTree.Node('下关分局');
node1.id=1;
treeFenju2.add(node1);

node2 = new xyTree.Node('下关派出所1');
node2.id=2;
node1.add(node2);

node2 = new xyTree.Node('下关派出所2');
node2.id=3;
node1.add(node2);

node2 = new xyTree.Node('下关派出所3');
node2.id=4;
node1.add(node2);

node2 = new xyTree.Node('下关派出所4');
node2.id=5;
node1.add(node2);

node3 = new xyTree.Node('下关派出所4-1');
node3.id=6;
node2.add(node3);

node4 = new xyTree.Node('下关派出所4-1-1');
node4.id=7;
node3.add(node4);

node5 = new xyTree.Node('下关派出所4-1-1-1');
node5.id=77;
node4.add(node5);


node1 = new xyTree.Node('玄武分局');
node1.id=8;
treeFenju2.add(node1);

node1 = new xyTree.Node('栖霞分局');
node1.id=9;
treeFenju2.add(node1);

node2 = new xyTree.Node('栖霞派出所1');
node2.id=10;
node1.add(node2);

node2 = new xyTree.Node('栖霞派出所2');
node2.id=11;
node1.add(node2);


