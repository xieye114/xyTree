//������ʹ���������ռ�
var treeFenju3 = new xyTree.DivTreeNormal('�й�����3');

//��5����������ʱʹ�õģ���������ν
var node1,node2,node3,node4,node5;

//����ڵ�ҲҪʹ�������ռ䣬ʹ����ȱ��������������
node1 = new xyTree.NodeNormal('�¹ط־�');
node1.id=1;
treeFenju3.add(node1);

node2 = new xyTree.NodeNormal('�¹��ɳ���1');
node2.id=2;
node1.add(node2);

node2 = new xyTree.NodeNormal('�¹��ɳ���2');
node2.id=3;
node1.add(node2);

node2 = new xyTree.NodeNormal('�¹��ɳ���3');
node2.id=4;
node1.add(node2);

node2 = new xyTree.NodeNormal('�¹��ɳ���4');
node2.id=5;
node1.add(node2);

node3 = new xyTree.NodeNormal('�¹��ɳ���4-1');
node3.id=6;
node2.add(node3);

node4 = new xyTree.NodeNormal('�¹��ɳ���4-1-1');
node4.id=7;
node3.add(node4);

node5 = new xyTree.NodeNormal('�¹��ɳ���4-1-1-1');
node5.id=77;
node4.add(node5);


node1 = new xyTree.NodeNormal('����־�');
node1.id=8;
treeFenju3.add(node1);

node1 = new xyTree.NodeNormal('��ϼ�־�');
node1.id=9;
treeFenju3.add(node1);

node2 = new xyTree.NodeNormal('��ϼ�ɳ���1');
node2.id=10;
node1.add(node2);

node2 = new xyTree.NodeNormal('��ϼ�ɳ���2');
node2.id=11;
node1.add(node2);


