#include <iostream>
#include <vector>
#define MAX 100001

using namespace std;

int arr[MAX]; // 부모 노드 번호가 담긴 배열  
vector<int> v[MAX];
bool visited[MAX];

void findParent(int node) {
	visited[node] = true;
	
	for(int i=0; i<v[node].size(); i++) {
		int linkNode = v[node][i]; 
		
		// 방문하지 않았다면 	
		if(!visited[linkNode]) {
			arr[linkNode] = node;
			findParent(linkNode);
		}			
	}
}

int main(){
	ios::sync_with_stdio(0);
	cin.tie(0);

	int N;
	cin>>N;
	
	for(int i=1; i<N; i++) {
		int node1;
		int node2;
		cin>>node1>>node2;
		
		// 양방향 연결  
		v[node1].push_back(node2);
		v[node2].push_back(node1);
	}

	findParent(1);
	
	for(int i=2; i<=N; i++)
		cout<<arr[i]<<"\n";
		
	return 0;
}
