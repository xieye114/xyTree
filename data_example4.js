//������ʹ���������ռ䣬���˵�2��������ʾ���ڵ�ͼ�꣬�̶���
var myPC = new xyTree.DivTreeNormal('����','userImages/035.gif');

//��5����������ʱʹ�õģ���������ν
var node1,node2,node3,node4,node5;

//����ڵ�ҲҪʹ�������ռ䣬ʹ����ȱ��������������
node1 = new xyTree.NodeNormal('�ҵ��ĵ�');
//img�����ǹ涨�ģ�Ҫ��ͼƬ����img
node1.img = 'userImages/127.gif';
myPC.add(node1);

node2 = new xyTree.NodeNormal('�ҵ���Ƶ');
node2.img = 'userImages/130.gif';
node1.add(node2);

node2 = new xyTree.NodeNormal('�ҵ�ͼ��');
node2.img = 'userImages/128.gif';
node1.add(node2);

node1 = new xyTree.NodeNormal('�ҵĵ���');
node1.img = 'userImages/016.gif';
myPC.add(node1);

node2 = new xyTree.NodeNormal('3.5����(A:)');
node2.img = 'userImages/007.gif';
node1.add(node2);

node2 = new xyTree.NodeNormal('C��(C:)');
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

node2 = new xyTree.NodeNormal('D��(D:)');
node2.img = 'userImages/009.gif';
node1.add(node2);

node2 = new xyTree.NodeNormal('E��(E:)');
node2.img = 'userImages/009.gif';
node1.add(node2);

node2 = new xyTree.NodeNormal('DVD������(F:)');
node2.img = 'userImages/012.gif';
node1.add(node2);

node2 = new xyTree.NodeNormal('�������');
node2.img = 'userImages/022.gif';
node1.add(node2);

node3 = new xyTree.NodeNormal('��ӡ���ʹ���');
node3.img = 'userImages/059.gif';
node2.add(node3);

node3 = new xyTree.NodeNormal('������');
node3.img = 'userImages/036.gif';
node2.add(node3);

node3 = new xyTree.NodeNormal('����ƻ�');
node3.img = 'userImages/218.gif';
node2.add(node3);

node3 = new xyTree.NodeNormal('ɨ���Ǻ������');
node3.img = 'userImages/203.gif';
node2.add(node3);

node3 = new xyTree.NodeNormal('��������');
node3.img = 'userImages/089.gif';
node2.add(node3);

node3 = new xyTree.NodeNormal('����');
node3.img = 'userImages/039.gif';
node2.add(node3);

node1 = new xyTree.NodeNormal('�����ھ�');
node1.img = 'userImages/018.gif';
myPC.add(node1);

node2 = new xyTree.NodeNormal('��������');
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

node1 = new xyTree.NodeNormal('����վ');
node1.img = 'userImages/033.gif';
myPC.add(node1);

