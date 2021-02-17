#include <bits/stdc++.h>
#define MAX 1001
#define INF 987654321

using namespace std;

int n, m;
int dist[MAX];
int path[MAX]; // 경로 추적을 위한 배열  
vector<pair<int, int>> v[MAX];

void dijkstra(int from) {
	queue<int> q;
	q.push(from);
	for(int i=1; i<=n; i++) 
		dist[i] = INF;
		
	dist[from] = 0; // 출발 도시 
	
	while(!q.empty()) {
		int node = q.front();
		q.pop();
		
		for(int i=0; i<v[node].size(); i++) {
			int nxtNode = v[node][i].first;
			int cost = v[node][i].second;
			
			if(dist[node] + cost >= dist[nxtNode])
				continue;
			
			dist[nxtNode] = dist[node] + cost;
			q.push(nxtNode);
			path[nxtNode] = node; // 이전 도시 기록  
		}
	}
}

int main(){
	ios::sync_with_stdio(0);
	cin.tie(0);
		
	cin>>n>>m;
	
	for(int i=0; i<m; i++) {
		int from, to, cost;
		cin>>from>>to>>cost;
		
		// 단방향 연결  
		v[from].push_back({ to, cost });
	}
	
	int from, to;
	cin>>from>>to;
	
	dijkstra(from);  
	
	// 최소 비용  
	cout<<dist[to]<<"\n";
	
	vector<int> route;
	int idx = to;
	while(idx) {
		route.push_back(idx);
		idx = path[idx];
	}
	
	// 경로에 포함된 도시 개수  
	cout<<route.size()<<"\n";
	reverse(route.begin(), route.end());
	
	for(int i=0; i<route.size(); i++)
		cout<<route[i]<<" "; // 도시  
		
	return 0;
}
