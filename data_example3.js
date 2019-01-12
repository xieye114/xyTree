//定义树使用了命名空间
var Content = new xyTree.DivTreeNormal('《精通CSS》');

//这5个变量是临时使用的，名字无所谓
var node1,node2,node3,node4,node5;

//定义节点也要使用命名空间，使用深度遍历方法逐个定义
node1 = new xyTree.NodeNormal('第1章 基础知识');
//page，zishu都是自定义属性，然后在回调函数中使用
node1.page=1;
node1.zishu=10000;
Content.add(node1);

node2 = new xyTree.NodeNormal('1.1 设计代码的结构');
node2.page = 2;
node2.zishu=1000;
node1.add(node2);

node3 = new xyTree.NodeNormal('1.1.1 使用有意义的标记');
node3.page = 2;
node3.zishu=100;
node2.add(node3);

node3 = new xyTree.NodeNormal('1.1.2 文档类型、DOCTYPE切换和浏览器模式');
node3.page = 7;
node3.zishu=100;
node2.add(node3);

node2 = new xyTree.NodeNormal('1.2 为样式找到目标');
node2.page = 9;
node2.zishu=1000;
node1.add(node2);

node3 = new xyTree.NodeNormal('1.2.1 常用的选择器');
node3.page = 10;
node3.zishu=100;
node2.add(node3);

node3 = new xyTree.NodeNormal('1.2.2 通用选择器');
node3.page = 11;
node3.zishu=100;
node2.add(node3);

node3 = new xyTree.NodeNormal('1.2.3 高级选择器');
node3.page = 11;
node3.zishu=100;
node2.add(node3);

node3 = new xyTree.NodeNormal('1.2.4 层叠和特殊性');
node3.page = 14;
node3.zishu=100;
node2.add(node3);

node3 = new xyTree.NodeNormal('1.2.5 继承');
node3.page = 16;
node3.zishu=100;
node2.add(node3);

node2 = new xyTree.NodeNormal('1.3 规划、组织和维护样式表');
node2.page = 17;
node2.zishu=1000;
node1.add(node2);

node3 = new xyTree.NodeNormal('1.3.1 对文档应用样式');
node3.page = 17;
node3.zishu=100;
node2.add(node3);

node3 = new xyTree.NodeNormal('1.3.2 对代码进行注释');
node3.page = 18;
node3.zishu=100;
node2.add(node3);

node3 = new xyTree.NodeNormal('1.3.3 样式指南');
node3.page = 20;
node3.zishu=100;
node2.add(node3);

node3 = new xyTree.NodeNormal('1.3.4 组织样式表以便简化维护');
node3.page = 21;
node3.zishu=100;
node2.add(node3);



node1 = new xyTree.NodeNormal('第2章 可视化格式模型');
node1.page=23;
node1.zishu=10000;
Content.add(node1);

node2 = new xyTree.NodeNormal('2.1 框模型概述');
node2.page = 23;
node2.zishu=1000;
node1.add(node2);

node3 = new xyTree.NodeNormal('2.1.1 IE/Win和框模型');
node3.page = 25;
node3.zishu=100;
node2.add(node3);

node3 = new xyTree.NodeNormal('2.1.2 空白边叠加');
node3.page = 25;
node3.zishu=100;
node2.add(node3);

node2 = new xyTree.NodeNormal('2.2 定位概述');
node2.page = 27;
node2.zishu=1000;
node1.add(node2);

node3 = new xyTree.NodeNormal('2.2.1 视觉格式化模型');
node3.page = 27;
node3.zishu=100;
node2.add(node3);

node3 = new xyTree.NodeNormal('2.2.2 相对定位');
node3.page = 28;
node3.zishu=100;
node2.add(node3);

node3 = new xyTree.NodeNormal('2.2.3 绝对定位');
node3.page = 29;
node3.zishu=100;
node2.add(node3);

node3 = new xyTree.NodeNormal('2.2.4 浮动');
node3.page = 36;
node3.zishu=100;
node2.add(node3);






node1 = new xyTree.NodeNormal('第3章 背景图像和图像替换');
node1.page=37;
node1.zishu=10010;
Content.add(node1);

node2 = new xyTree.NodeNormal('3.1 背景图像基础');
node2.page = 37;
node2.zishu=1001;
node1.add(node2);

node2 = new xyTree.NodeNormal('3.2 圆角框');
node2.page = 39;
node2.zishu=1011;
node1.add(node2);

node2 = new xyTree.NodeNormal('3.3 阴影');
node2.page = 46;
node2.zishu=1002;
node1.add(node2);

node2 = new xyTree.NodeNormal('3.3 图像替换');
node2.page = 54;
node2.zishu=1003;
node1.add(node2);











