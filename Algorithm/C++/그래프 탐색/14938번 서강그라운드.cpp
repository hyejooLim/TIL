#include <bits/stdc++.h>
#define MAX 101
#define INF 987654321

using namespace std;

int n, m;
int arr[MAX];  
int dist[MAX];
vector<pair<int, int>> v[MAX]; // 지역 간 연결 정보   

void dijkstra(int start) {    
	queue<int> q;
	for(int i=1; i<=n; i++)
		dist[i] = INF;
	
	// 낙하 지역의 거리는 0  
	dist[start] = 0;
	q.push(start);
	
	while(!q.empty()) {
		int node = q.front();
		q.pop();
		
		for(int i=0; i<v[node].size(); i++) {
			int nxtNode = v[node][i].first;
			int weight = v[node][i].second;
			
			// 최단경로라면  
			if(dist[node] + weight < dist[nxtNode]) {
				dist[nxtNode] = dist[node] + weight;
				q.push(nxtNode);
			}
		}
	}
}

int main(){
	ios::sync_with_stdio(0);
	cin.tie(0);
	
	int r; 
	cin>>n>>m>>r;   
	for(int i=1; i<=n; i++) 
		cin>>arr[i];   
	
	for(int i=0; i<r; i++) {
		int a, b, l; 
		cin>>a>>b>>l; 
		
		// 양방향 연결  
		v[a].push_back({ b, l });
		v[b].push_back({ a, l });
	}
	
	int result = 0;
	for(int i=1; i<=n; i++) {
		dijkstra(i); // 다익스트라 
		
		int sum = 0;
		for(int i=1; i<=n; i++) 
		  	// 수색 범위보다 작거나 같다면  
			if(dist[i] <= m)
				sum += arr[i]; // 아이템 개수 더하기  
	
		result = max(result, sum);
	}
	cout<<result;
	return 0;
}
