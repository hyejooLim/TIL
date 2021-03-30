#include <iostream>
#include <vector>

using namespace std;

int N; //���� ������ ���� 
vector<pair<int, int>> v;

void move(int num, int from, int to){
	
	v.push_back({from, to});
}

//������ ����, ������, ������, ������   
void hanoi(int num, int from, int to, int via){
	if(num == 1){ //������ ������ 1���̸�  
		move(1, from, to);
		return;
	}
	
	//��� ������ from -> to�� �ű�� ���ؼ���   
	//ũ�� �� �ܰ�� ���� �� ���� 	
	hanoi(num-1, from, via, to);
	move(num, from, to);
	hanoi(num-1, via, to, from);
}

int main(){
	
	ios::sync_with_stdio(0);
	cin.tie(0);
	
	cin>>N;
	    
	hanoi(N, 1, 3, 2);    
	
	cout<<v.size()<<"\n"; //�ּ� �̵� Ƚ��  
	for(int i=0; i<v.size(); i++){
		cout<<v[i].first<<" "<<v[i].second<<"\n";
	}
	
	return 0;
}
