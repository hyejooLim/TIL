#include <bits/stdc++.h>
#define MAX 16

using namespace std;

int N;
int cnt;
int house[MAX][MAX];

typedef struct {
	int x, y;
}box;

// 가로 세로 대각선  
box moveD[3] = { {0, 1}, {1, 0}, {1, 1} };

void movePipe() {
	queue<pair<pair<int, int>, int>> q;
	q.push({{0, 1}, 0}); // 처음 파이프는 항상 가로 파이프
	
	while(!q.empty()) {
		int x = q.front().first.first;
		int y = q.front().first.second;
		int dir = q.front().second; // 파이프의 방향: 0 가로 1 세로 2 대각선 
		q.pop();
		
		// 현재 좌표가 (n-1, n-1)에 도달하면   
		if(x == N-1 && y == N-1)
			cnt++;
		
		for(int i=0; i<3; i++) {
			// 가로 -> 세로 / 세로 -> 가로 불가능  
			if((i == 0 && dir == 1) || (i == 1 && dir == 0))
				continue;
				
			int nx = x + moveD[i].x;
			int ny = y + moveD[i].y;
			
			if(N<=nx || N<=ny || house[nx][ny] == 1)
				continue;
			
			// 대각선인 경우 추가 확인 
			if(i == 2 && (house[nx][ny-1] == 1 || house[nx-1][ny] == 1))
				continue;

			q.push({{nx, ny}, i});
		}
	}
}

int main(){
	ios::sync_with_stdio(0);
	cin.tie(0);
	
	cin>>N;
	for(int i=0; i<N; i++)
		for(int j=0; j<N; j++)
			cin>>house[i][j];
	
	movePipe(); // 파이프 옮기기  
	cout<<cnt;
			
	return 0;
}
