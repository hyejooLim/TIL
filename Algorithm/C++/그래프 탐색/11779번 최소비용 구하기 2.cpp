#include <bits/stdc++.h>
#define MAX 1001
#define INF 987654321

using namespace std;

int n, m;
int dist[MAX];
int path[MAX]; // ��� ������ ���� �迭  
vector<pair<int, int>> v[MAX];

void dijkstra(int from) {
	queue<int> q;
	q.push(from);
	for(int i=1; i<=n; i++) 
		dist[i] = INF;
		
	dist[from] = 0; // ��� ���� 
	
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
			path[nxtNode] = node; // ���� ���� ���  
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
		
		// �ܹ��� ����  
		v[from].push_back({ to, cost });
	}
	
	int from, to;
	cin>>from>>to;
	
	dijkstra(from);  
	
	// �ּ� ���  
	cout<<dist[to]<<"\n";
	
	vector<int> route;
	int idx = to;
	while(idx) {
		route.push_back(idx);
		idx = path[idx];
	}
	
	// ��ο� ���Ե� ���� ����  
	cout<<route.size()<<"\n";
	reverse(route.begin(), route.end());
	
	for(int i=0; i<route.size(); i++)
		cout<<route[i]<<" "; // ����  
		
	return 0;
}
