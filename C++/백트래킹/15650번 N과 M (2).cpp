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
	
	//idx가 0일 때는 1부터 삽입  
	if(idx == 0){
		for(int i=1; i<=N; i++){
			arr[idx] = i;
			NandM(idx + 1);
		}
	}
	//idx가 1 이상일 때는 전 배열값 + 1 부터 삽입    
	else{
		//오름차순과 중복 방지를 위해 
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
	NandM(0); //배열 0부터 시작  
	
	return 0;
}
