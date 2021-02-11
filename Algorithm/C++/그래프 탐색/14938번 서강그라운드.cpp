#include <bits/stdc++.h>
#define MAX 101
#define INF 987654321

using namespace std;

int n, m;
int arr[MAX];  
int dist[MAX];
vector<pair<int, int>> v[MAX]; // ���� �� ���� ����   

void dijkstra(int start) {    
	queue<int> q;
	for(int i=1; i<=n; i++)
		dist[i] = INF;
	
	// ���� ������ �Ÿ��� 0  
	dist[start] = 0;
	q.push(start);
	
	while(!q.empty()) {
		int node = q.front();
		q.pop();
		
		for(int i=0; i<v[node].size(); i++) {
			int nxtNode = v[node][i].first;
			int weight = v[node][i].second;
			
			// �ִܰ�ζ��  
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
		
		// ����� ����  
		v[a].push_back({ b, l });
		v[b].push_back({ a, l });
	}
	
	int result = 0;
	for(int i=1; i<=n; i++) {
		dijkstra(i); // ���ͽ�Ʈ�� 
		
		int sum = 0;
		for(int i=1; i<=n; i++) 
		  // ���� �������� �۰ų� ���ٸ�  
			if(dist[i] <= m)
				sum += arr[i]; // ������ ���� ���ϱ�  
	
		result = max(result, sum);
	}
	cout<<result;
	return 0;
}
