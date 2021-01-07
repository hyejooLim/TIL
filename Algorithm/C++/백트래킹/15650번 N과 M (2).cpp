#include <iostream>

using namespace std;

int N, M;
int arr[8];

void NandM(int idx){
	if(idx == M){
		for(int i=0; i<M; i++){
			cout<<arr[i]<<" ";
		}
		cout<<"\n";
	}
	
	//idx�� 0�� ���� 1���� ����  
	if(idx == 0){
		for(int i=1; i<=N; i++){
			arr[idx] = i;
			NandM(idx + 1);
		}
	}
	//idx�� 1 �̻��� ���� �� �迭�� + 1 ���� ����    
	else{
		//���������� �ߺ� ������ ���� 
		for(int i=arr[idx-1]+1; i<=N; i++){   
			arr[idx] = i;  
			NandM(idx + 1);
		}
	}
}

int main(){
	ios::sync_with_stdio(0);
	cin.tie(0);
	
	cin>>N>>M;
	NandM(0); //�迭 0���� ����  
	
	return 0;
}
