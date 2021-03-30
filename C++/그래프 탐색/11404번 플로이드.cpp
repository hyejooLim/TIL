#include <bits/stdc++.h>
#define INF 987654321

using namespace std;

int n, m;
int graph[101][101];

// i->i �� ���� ��δ� 0  
void initial() {
	for(int i=1; i<=n; i++)
		for(int j=1; j<=n; j++)
			graph[i][j] = i == j ? 0 : INF;
}

void floyd() {
	// ������ ���İ��� ���� �� �����ٸ� ����  
	for(int via=1; via<=n; via++) 
		for(int from=1; from<=n; from++) 
			for(int to=1; to<=n; to++) 
				graph[from][to] = min(graph[from][to], graph[from][via] + graph[via][to]);
}

int main(){
	ios::sync_with_stdio(0);
	cin.tie(0);
	
	cin>>n>>m;
	initial();
	
	for(int i=0; i<m; i++) {
		int a, b, c;
		cin>>a>>b>>c;
		
		graph[a][b] = min(graph[a][b], c);
	}
	
	floyd(); // �÷��̵�-����  
	
	for(int i=1; i<=n; i++) {
		for(int j=1; j<=n; j++) {
			// i->j ��ΰ� ������  
			if(graph[i][j] == INF)
				cout<<"0"<<" ";
			else
				cout<<graph[i][j]<<" ";
		}
		cout<<"\n";
	}
	
	return 0;
}
