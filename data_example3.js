//������ʹ���������ռ�
var Content = new xyTree.DivTreeNormal('����ͨCSS��');

//��5����������ʱʹ�õģ���������ν
var node1,node2,node3,node4,node5;

//����ڵ�ҲҪʹ�������ռ䣬ʹ����ȱ��������������
node1 = new xyTree.NodeNormal('��1�� ����֪ʶ');
//page��zishu�����Զ������ԣ�Ȼ���ڻص�������ʹ��
node1.page=1;
node1.zishu=10000;
Content.add(node1);

node2 = new xyTree.NodeNormal('1.1 ��ƴ���Ľṹ');
node2.page = 2;
node2.zishu=1000;
node1.add(node2);

node3 = new xyTree.NodeNormal('1.1.1 ʹ��������ı��');
node3.page = 2;
node3.zishu=100;
node2.add(node3);

node3 = new xyTree.NodeNormal('1.1.2 �ĵ����͡�DOCTYPE�л��������ģʽ');
node3.page = 7;
node3.zishu=100;
node2.add(node3);

node2 = new xyTree.NodeNormal('1.2 Ϊ��ʽ�ҵ�Ŀ��');
node2.page = 9;
node2.zishu=1000;
node1.add(node2);

node3 = new xyTree.NodeNormal('1.2.1 ���õ�ѡ����');
node3.page = 10;
node3.zishu=100;
node2.add(node3);

node3 = new xyTree.NodeNormal('1.2.2 ͨ��ѡ����');
node3.page = 11;
node3.zishu=100;
node2.add(node3);

node3 = new xyTree.NodeNormal('1.2.3 �߼�ѡ����');
node3.page = 11;
node3.zishu=100;
node2.add(node3);

node3 = new xyTree.NodeNormal('1.2.4 �����������');
node3.page = 14;
node3.zishu=100;
node2.add(node3);

node3 = new xyTree.NodeNormal('1.2.5 �̳�');
node3.page = 16;
node3.zishu=100;
node2.add(node3);

node2 = new xyTree.NodeNormal('1.3 �滮����֯��ά����ʽ��');
node2.page = 17;
node2.zishu=1000;
node1.add(node2);

node3 = new xyTree.NodeNormal('1.3.1 ���ĵ�Ӧ����ʽ');
node3.page = 17;
node3.zishu=100;
node2.add(node3);

node3 = new xyTree.NodeNormal('1.3.2 �Դ������ע��');
node3.page = 18;
node3.zishu=100;
node2.add(node3);

node3 = new xyTree.NodeNormal('1.3.3 ��ʽָ��');
node3.page = 20;
node3.zishu=100;
node2.add(node3);

node3 = new xyTree.NodeNormal('1.3.4 ��֯��ʽ���Ա��ά��');
node3.page = 21;
node3.zishu=100;
node2.add(node3);



node1 = new xyTree.NodeNormal('��2�� ���ӻ���ʽģ��');
node1.page=23;
node1.zishu=10000;
Content.add(node1);

node2 = new xyTree.NodeNormal('2.1 ��ģ�͸���');
node2.page = 23;
node2.zishu=1000;
node1.add(node2);

node3 = new xyTree.NodeNormal('2.1.1 IE/Win�Ϳ�ģ��');
node3.page = 25;
node3.zishu=100;
node2.add(node3);

node3 = new xyTree.NodeNormal('2.1.2 �հױߵ���');
node3.page = 25;
node3.zishu=100;
node2.add(node3);

node2 = new xyTree.NodeNormal('2.2 ��λ����');
node2.page = 27;
node2.zishu=1000;
node1.add(node2);

node3 = new xyTree.NodeNormal('2.2.1 �Ӿ���ʽ��ģ��');
node3.page = 27;
node3.zishu=100;
node2.add(node3);

node3 = new xyTree.NodeNormal('2.2.2 ��Զ�λ');
node3.page = 28;
node3.zishu=100;
node2.add(node3);

node3 = new xyTree.NodeNormal('2.2.3 ���Զ�λ');
node3.page = 29;
node3.zishu=100;
node2.add(node3);

node3 = new xyTree.NodeNormal('2.2.4 ����');
node3.page = 36;
node3.zishu=100;
node2.add(node3);






node1 = new xyTree.NodeNormal('��3�� ����ͼ���ͼ���滻');
node1.page=37;
node1.zishu=10010;
Content.add(node1);

node2 = new xyTree.NodeNormal('3.1 ����ͼ�����');
node2.page = 37;
node2.zishu=1001;
node1.add(node2);

node2 = new xyTree.NodeNormal('3.2 Բ�ǿ�');
node2.page = 39;
node2.zishu=1011;
node1.add(node2);

node2 = new xyTree.NodeNormal('3.3 ��Ӱ');
node2.page = 46;
node2.zishu=1002;
node1.add(node2);

node2 = new xyTree.NodeNormal('3.3 ͼ���滻');
node2.page = 54;
node2.zishu=1003;
node1.add(node2);











