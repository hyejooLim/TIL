#include <iostream>

using namespace std;

int tree[10000]; //최대 노드 수   

void postOrder(int left, int right){
	if(left > right)  
		return;
	
	int root = tree[left]; //가장 왼쪽 노드가 항상 루트 노드  
	int last = right;
	
	//뒤에서부터 root 값보다 작은 값을 찾을 때까지 반복  
	while(root < tree[last]){
		last--;
	}
	
	postOrder(left+1, last); //루트노드의 왼쪽 서브 트리  
	postOrder(last+1, right); //루트노드의 오른쪽 서브 트리  
	
	cout<<tree[left]<<"\n";
}

int main(){
	ios::sync_with_stdio(0);
	cin.tie(0);
	
	int val;
	int i = 0;
	
	//입력받는 동안에 배열에 val 값 저장  
	while(cin>>val)
		tree[i++] = val;
	
	postOrder(0, i-1);
	return 0;
}
