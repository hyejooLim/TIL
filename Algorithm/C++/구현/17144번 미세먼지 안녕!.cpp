#include <bits/stdc++.h>
#define MAX 50

using namespace std;

int R, C;
int airX, airY, airX2, airY2;
int room[MAX][MAX];
int copyRoom[MAX][MAX];
queue<pair<int, int>> q;

typedef struct {
	int x, y;
}box;

// 상 하 좌 우  
box moveD[4] = { {-1, 0}, {1, 0}, {0, -1}, {0, 1} };
  
int cw[4] = { 3, 1, 2, 0 }; // 시계 방향 
int ccw[4] = { 3, 0, 2, 1 }; // 반시계 방향

void spreadDust() {
	while(!q.empty()) {
		int curX = q.front().first;
		int curY = q.front().second;
		q.pop();
		
		int cnt = 0; // 미세먼지 확산 방향의 개수    
		int amount = copyRoom[curX][curY] / 5; // 미세먼지 확산양 
		
		for(int i=0; i<4; i++) {
			int nxtX = curX + moveD[i].x;
			int nxtY = curY + moveD[i].y;
			
			if(nxtX<0 || R<=nxtX || nxtY<0 || C<=nxtY)
				continue;
			
			// 공기 청정기가 있으면  
			if(copyRoom[nxtX][nxtY] == -1)
				continue;
			
			// 미세먼지 확산
			room[nxtX][nxtY] += amount;   
			cnt++;
		}
		// 현재 칸의 미세먼지 양 감소  
		room[curX][curY] -= amount*cnt; 
	}
	
	// 미세먼지가 확산된 배열 복사   
	for(int i=0; i<R; i++)
		for(int j=0; j<C; j++)
			copyRoom[i][j] = room[i][j];
}

void workMachine() {
	int curX = airX; 
	int curY = airY + 1; 
	room[curX][curY] = 0; // 밀려나서 0이 됨 
	
	for(int i=0; i<4; i++) {
		while(1) {
			int nxtX = curX + moveD[ccw[i]].x;
			int nxtY = curY + moveD[ccw[i]].y;
			
			// 위쪽 미세먼지가 모두 이동했다면   
			if(nxtX == airX && nxtY == airY)
				break;
			
			if(nxtX<0 || R<=nxtX || nxtY<0 || C<=nxtY)
				break;
			
			// 미세먼지 이동  
			room[nxtX][nxtY] = copyRoom[curX][curY];
			curX = nxtX;
			curY = nxtY; 
		}
	}
	
	curX = airX2;
	curY = airY2 + 1;
	room[curX][curY] = 0; // 밀려나서 0이 됨
	
	for(int i=0; i<4; i++) {
		while(1) {
			int nxtX = curX + moveD[cw[i]].x;
			int nxtY = curY + moveD[cw[i]].y;
			
			// 아래쪽 미세먼지가 모두 이동했다면  
			if(nxtX == airX2 && nxtY == airY2)
				break;
				
			if(nxtX<0 || R<=nxtX || nxtY<0 || C<=nxtY)
				break;
			
			// 미세먼지 이동  
			room[nxtX][nxtY] = copyRoom[curX][curY];
			curX = nxtX;
			curY = nxtY;
		}
	}
}

int main(){
	ios::sync_with_stdio(0);
	cin.tie(0);
		
 	int T;
	cin>>R>>C>>T;
	
	for(int i=0; i<R; i++) {
		for(int j=0; j<C; j++) {
			cin>>room[i][j];
			
			// 공기청정기가 있다면  
			if(room[i][j] == -1) {
				if(airX == 0) {
					airX = i;
					airY = j;	
				}
				else {
					airX2 = i;
					airY2 = j;
				}
			}
		}
	}
	
	// T초 동안 수행  
	for(int i=0; i<T; i++) {
		for(int j=0; j<R; j++)
			for(int k=0; k<C; k++)
				if(0 < room[j][k])
					q.push({j, k}); 
				
		for(int j=0; j<R; j++)
			for(int k=0; k<C; k++)
				copyRoom[j][k] = room[j][k];
	
		spreadDust(); // 미세먼지 확산  
		workMachine(); // 공기청정기 작동  
	}	
	
	int result = 0;
	for(int i=0; i<R; i++)
		for(int j=0; j<C; j++)
			if(0 < room[i][j])
				result += room[i][j];
				
	cout<<result;
	return 0;
}
