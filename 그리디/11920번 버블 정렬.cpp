#include <iostream>
#include <queue>
#define MAX 100000

using namespace std;

int N, K;
int arr[MAX];

int main(){
	ios::sync_with_stdio(0);
	cin.tie(0);
	
	cin>>N>>K;
	for(int i=0; i<N; i++)
		cin>>arr[i];
	
	//우선순위 큐 이용 	
	priority_queue<int, vector<int>, greater<int>> q;
	
	for(int i=0; i<K; i++) 
		q.push(arr[i]);
		 
	for(int i=0; i<N-K; i++){   
		q.push(arr[i+K]); //나머지 원소들 삽입
		arr[i] = q.top();
		q.pop();
	}
	
	for(int i=0; i<N-K; i++){
		cout<<arr[i]<<" ";
	}
	
	//큐에 남아 있는 원소 출력  
	while(!q.empty()){
		cout<<q.top()<<" ";
		q.pop();
	}
	
	return 0;
}
