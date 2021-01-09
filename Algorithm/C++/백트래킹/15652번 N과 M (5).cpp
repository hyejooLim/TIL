#include <iostream>
#include <algorithm>

using namespace std;

const int MAX = 8;

int N, M;
int arr[MAX];
int result[MAX];
bool visited[MAX]; //�ߺ� ���� ����  

void NandM(int idx){
	if(idx == M){
		for(int i=0; i<M; i++){
			cout<<result[i]<<" ";
		}
		cout<<"\n";
		return; //(1) 
	}

	for(int i=0; i<N; i++){
		//result �迭�� ������� �ʾҴٸ�  
		if(!visited[i]){ 
			result[idx] = arr[i];
			visited[i] = true;
			NandM(idx+1);
			visited[i] = false;	//(2)
		}
	}
}

int main(){
	ios::sync_with_stdio(0);
	cin.tie(0);

	cin>>N>>M;
	
	for(int i=0; i<N; i++)
		cin>>arr[i];
	
	//���� ������ �����ϴ� ������ ����ϱ� ���� ����
	sort(arr, arr+N);   
	NandM(0);
		
	return 0;
}
