#include <bits/stdc++.h>
#define MAX 1000

using namespace std;

int M, N;
int box[MAX][MAX];
int dist[MAX][MAX]; // 토마토가 익기까지의 일수  
queue<pair<int, int>> q;

typedef struct {
	int x, y;
}loc;

// 상 하 좌 우  
loc moveD[4] = { {-1, 0}, {1, 0}, {0, -1}, {0, 1} };
	
void ripenTomato() {
	while(!q.empty()) {
		int x = q.front().first;
		int y = q.front().second;
		q.pop();
		
		for(int i=0; i<4; i++) {
			int nx = x + moveD[i].x;
			int ny = y + moveD[i].y;
			
			if(nx<0 || N<=nx || ny<0 || M<=ny)
				continue;
			
			// 익지 않은 토마토라면  
			if(dist[nx][ny] == -1) {
				dist[nx][ny] = dist[x][y] + 1; // 일수 1 증가  
				q.push({nx, ny});
			}
		}
	}
}

int main(){
	ios::sync_with_stdio(0);
	cin.tie(0);
	
	cin>>M>>N;
	for(int i=0; i<N; i++) {
		for(int j=0; j<M; j++) {
			cin>>box[i][j];
			
			// 익은 토마토라면
			if(box[i][j] == 1)  
				 q.push({i, j});
			
			// 익지 않은 토마토라면
			if(box[i][j] == 0)  
				dist[i][j] = -1; 
		}		 
	}
	ripenTomato(); // 토마토 익히기  
	
	int result = 0;
	for(int i=0; i<N; i++) {
		for(int j=0; j<M; j++) {
			
			// 익지 않은 토마토가 남아있다면  
			if(dist[i][j] == -1) {
				cout<<-1;
				return 0;
			} 
			result = max(result, dist[i][j]);
		}
	}
	cout<<result;
}
