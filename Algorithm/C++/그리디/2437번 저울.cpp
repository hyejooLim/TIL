#include <iostream>
#include <algorithm>
#define MAX 1000

using namespace std;

int weight[MAX];

int main(){
	ios::sync_with_stdio(0);
	cin.tie(0);
	
	int N;
	cin>>N;
	
	for(int i=0; i<N; i++)
		cin>>weight[i];
		
	sort(weight, weight+N); //�������� ����  
	
	//1�� ���ٸ�  
	if(weight[0] != 1)
		cout<<1;
	else{
		int sum = 1; //��������� �� 
		
		for(int i=1; i<N; i++){ 
			//���� �ε����� ����� ���� ������+1 ���� ũ�ٸ�  
			//������ �ߵ�� ���Ը� ������ �� ����  
			if(sum+1 < weight[i])
				break;
			sum += weight[i]; 
		}
		cout<<sum+1; 
	}

	return 0;
}
