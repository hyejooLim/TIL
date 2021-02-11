#include <bits/stdc++.h>
#define MAX 101

using namespace std;

int m, sum;
int arr[MAX];   
bool visited[MAX];
vector<pair<int, int>> node[MAX]; // 지역 간 연결 정보   

void getItems(int area, int dist) {    
	for(int i=0; i<node[area].size(); i++) {
		int nxtArea = node[area][i].first; 
		int nxtDist = node[area][i].second; 
	  int item = arr[nxtArea]; // 다음 지역의 아이템 개수  
	
		// 거리가 수색 범위보다 작다면   
		if(dist + nxtDist <= m) {
			if(!visited[nxtArea]) {
				visited[nxtArea] = true;
				sum += item;
			}
			getItems(nxtArea, dist + nxtDist); 
		}
	}
}

int main(){
	ios::sync_with_stdio(0);
	cin.tie(0);
	
	int n, r; 
	cin>>n>>m>>r;   
	for(int i=1; i<=n; i++) 
		cin>>arr[i];   
	
	for(int i=0; i<r; i++) {
		int a, b, l; 
		cin>>a>>b>>l; 
		
		// 양방향 연결  
		node[a].push_back({ b, l });
		node[b].push_back({ a, l });
	}
	
	int result = 0;
	for(int i=1; i<=n; i++) {
		// 자기 영역의 아이템 획득
		sum = arr[i];   
		memset(visited, false, sizeof(visited));
		visited[i] = true;
		getItems(i, 0); 
		result = max(result, sum);
	}
	
	cout<<result;
	return 0;
}
