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
	
	//�켱���� ť �̿� 	
	priority_queue<int, vector<int>, greater<int>> q;
	
	for(int i=0; i<K; i++) 
		q.push(arr[i]);
		 
	for(int i=0; i<N-K; i++){   
		q.push(arr[i+K]); //������ ���ҵ� ����
		arr[i] = q.top();
		q.pop();
	}
	
	for(int i=0; i<N-K; i++){
		cout<<arr[i]<<" ";
	}
	
	//ť�� ���� �ִ� ���� ���  
	while(!q.empty()){
		cout<<q.top()<<" ";
		q.pop();
	}
	
	return 0;
}
