//������ʹ���������ռ�
var treeFenju2 = new xyTree.DivTree('�й�����2');

//��5����������ʱʹ�õģ���������ν
var node1,node2,node3,node4,node5;

//����ڵ�ҲҪʹ�������ռ䣬ʹ����ȱ��������������
node1 = new xyTree.Node('�¹ط־�');
node1.id=1;
treeFenju2.add(node1);

node2 = new xyTree.Node('�¹��ɳ���1');
node2.id=2;
node1.add(node2);

node2 = new xyTree.Node('�¹��ɳ���2');
node2.id=3;
node1.add(node2);

node2 = new xyTree.Node('�¹��ɳ���3');
node2.id=4;
node1.add(node2);

node2 = new xyTree.Node('�¹��ɳ���4');
node2.id=5;
node1.add(node2);

node3 = new xyTree.Node('�¹��ɳ���4-1');
node3.id=6;
node2.add(node3);

node4 = new xyTree.Node('�¹��ɳ���4-1-1');
node4.id=7;
node3.add(node4);

node5 = new xyTree.Node('�¹��ɳ���4-1-1-1');
node5.id=77;
node4.add(node5);


node1 = new xyTree.Node('����־�');
node1.id=8;
treeFenju2.add(node1);

node1 = new xyTree.Node('��ϼ�־�');
node1.id=9;
treeFenju2.add(node1);

node2 = new xyTree.Node('��ϼ�ɳ���1');
node2.id=10;
node1.add(node2);

node2 = new xyTree.Node('��ϼ�ɳ���2');
node2.id=11;
node1.add(node2);


