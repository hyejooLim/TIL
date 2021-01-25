#include <bits/stdc++.h>
#define MAX 500

using namespace std;

int n, m;
int result = -1; // 가장 넓은 그림의 넓이  
int paint[MAX][MAX];
int visited[MAX][MAX];

typedef struct {
	int x, y;
}box;

box moveD[4] = {{-1, 0}, {1, 0} ,{0, -1}, {0, 1}};

void bfs(int x, int y) {
	int area = 0;
	queue<pair<int, int>> q;
	q.push({x, y});
	visited[x][y] = true;
	
	while(!q.empty()) {
		int cx = q.front().first;
		int cy = q.front().second;
		q.pop();
		
		area++; //1
		
		for(int i=0; i<4; i++) {
			int nx = cx + moveD[i].x;
			int ny = cy + moveD[i].y;
			
			if(nx<0 || n<=nx || ny<0 || m<=ny)
				continue;
			
			if(paint[nx][ny] == 0 || visited[nx][ny])
				continue;
				
			q.push({nx, ny});
			visited[nx][ny] = true;
		}
	}
	
	result = max(result, area);	
}

int main(){
	ios::sync_with_stdio(0);
	cin.tie(0);
	
	cin>>n>>m;
	for(int i=0; i<n; i++)
		for(int j=0; j<m; j++)
			cin>>paint[i][j];
	
	int cnt = 0; // 그림의 개수  
	for(int i=0; i<n; i++)
		for(int j=0; j<m; j++)
			if(paint[i][j] && !visited[i][j]) {
				cnt++; //1
				bfs(i, j);
			}
	
	if(cnt == 0)
		cout<<cnt<<"\n"<<0;
	else 
		cout<<cnt<<"\n"<<result;			
				 
	return 0;
}
