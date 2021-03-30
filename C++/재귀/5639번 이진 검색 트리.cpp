#include <iostream>

using namespace std;

int tree[10000]; //�ִ� ��� ��   

void postOrder(int left, int right){
	if(left > right)  
		return;
	
	int root = tree[left]; //���� ���� ��尡 �׻� ��Ʈ ���  
	int last = right;
	
	//�ڿ������� root ������ ���� ���� ã�� ������ �ݺ�  
	while(root < tree[last]){
		last--;
	}
	
	postOrder(left+1, last); //��Ʈ����� ���� ���� Ʈ��  
	postOrder(last+1, right); //��Ʈ����� ������ ���� Ʈ��  
	
	cout<<tree[left]<<"\n";
}

int main(){
	ios::sync_with_stdio(0);
	cin.tie(0);
	
	int val;
	int i = 0;
	
	//�Է¹޴� ���ȿ� �迭�� val �� ����  
	while(cin>>val)
		tree[i++] = val;
	
	postOrder(0, i-1);
	return 0;
}
