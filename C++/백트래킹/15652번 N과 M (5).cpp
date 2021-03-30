#include <iostream>
#include <algorithm>

using namespace std;

const int MAX = 8;

int N, M;
int arr[MAX];
int result[MAX];
bool visited[MAX]; //중복 순열 방지  

void NandM(int idx){
	if(idx == M){
		for(int i=0; i<M; i++){
			cout<<result[i]<<" ";
		}
		cout<<"\n";
		return; //(1) 
	}

	for(int i=0; i<N; i++){
		//result 배열에 저장되지 않았다면  
		if(!visited[i]){ 
			result[idx] = arr[i];
			visited[i] = true;
			NandM(idx+1);
			visited[i] = false; //(2)
		}
	}
}

int main(){
	ios::sync_with_stdio(0);
	cin.tie(0);

	cin>>N>>M;
	
	for(int i=0; i<N; i++)
		cin>>arr[i];
	
	//사전 순으로 증가하는 순서로 출력하기 위해 정렬
	sort(arr, arr+N);   
	NandM(0);
		
	return 0;
}
