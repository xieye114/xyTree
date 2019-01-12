//定义树使用了命名空间
var myLove = new xyTree.DivTree('xieye的最爱');

//这5个变量是临时使用的，名字无所谓
var node1,node2,node3,node4,node5;

//定义节点也要使用命名空间，使用深度遍历方法逐个定义
node1 = new xyTree.Node('食物');
myLove.add(node1);

node2 = new xyTree.Node('水果');
node1.add(node2);

node3 = new xyTree.Node('西红柿');
node2.add(node3);

node3 = new xyTree.Node('香蕉');
node2.add(node3);

node3 = new xyTree.Node('荔枝');
node2.add(node3);

node3 = new xyTree.Node('桂圆');
node2.add(node3);


node2 = new xyTree.Node('肉');
node1.add(node2);

node3 = new xyTree.Node('猪肉');
node2.add(node3);

node4 = new xyTree.Node('炒猪肉');
node3.add(node4);

node4 = new xyTree.Node('烤猪肉');
node3.add(node4);

node3 = new xyTree.Node('羊肉');
node2.add(node3);

node3 = new xyTree.Node('狗肉');
node2.add(node3);

node2 = new xyTree.Node('奶制品');
node1.add(node2);

node3 = new xyTree.Node('卫岗牛奶');
node2.add(node3);

node3 = new xyTree.Node('光明牛奶');
node2.add(node3);

node3 = new xyTree.Node('只要是牛奶！');
node2.add(node3);

node1 = new xyTree.Node('玩具');
myLove.add(node1);

node2 = new xyTree.Node('个人电脑');
node1.add(node2);

node2 = new xyTree.Node('FC');
node1.add(node2);

node2 = new xyTree.Node('SFC');
node1.add(node2);

node3 = new xyTree.Node('最终幻想系列(史克威尔)');
node2.add(node3);

node3 = new xyTree.Node('机器人大战系列(百代)');
node2.add(node3);

node3 = new xyTree.Node('火焰纹章系列(任天堂)');
node2.add(node3);

node2 = new xyTree.Node('MD');
node1.add(node2);

node2 = new xyTree.Node('PS');
node1.add(node2);

node2 = new xyTree.Node('PS2');
node1.add(node2);

node1 = new xyTree.Node('语言');
myLove.add(node1);

node2 = new xyTree.Node('Java');
node1.add(node2);

node2 = new xyTree.Node('JavaScript');
node1.add(node2);

node1 = new xyTree.Node('书');
myLove.add(node1);

node2 = new xyTree.Node('《Java编程思想》');
node1.add(node2);

node2 = new xyTree.Node('《JavaScript权威指南》');
node1.add(node2);

node2 = new xyTree.Node('《精通CSS》');
node1.add(node2);

node2 = new xyTree.Node('《Ajax基础教程》');
node1.add(node2);



