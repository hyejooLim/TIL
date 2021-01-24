#include <iostream>
#include <queue>
#define MAX 8

using namespace std;

int N, M;
int result = -1;
int lab[MAX][MAX]; 
int map[MAX][MAX];  
int secureArea[MAX][MAX];

typedef struct {
	int x, y;
}box;

// �� �� �� ��  
box moveD[4] = { {-1, 0}, {1, 0}, {0, -1}, {0, 1} }; 

void spreadVirus() {
	queue<pair<int, int>> q;
	
	for(int i=0; i<N; i++)
		for(int j=0; j<M; j++)	
			secureArea[i][j] = map[i][j];
	
	for(int i=0; i<N; i++) {
		for(int j=0; j<M; j++) {
			// ���� ��ġ�� ���̷����� �ִٸ�   
			if(secureArea[i][j] == 2) { 
				q.push({i, j});
			}
		}
	}

	while(!q.empty()) {
		int curX = q.front().first;
		int curY = q.front().second;
		q.pop();
		
		for(int i=0; i<4; i++) {
			int nxtX = curX + moveD[i].x;
			int nxtY = curY + moveD[i].y;
			
			if(0<=nxtX && nxtX<N && 0<=nxtY && nxtY<M) {
				if(secureArea[nxtX][nxtY] == 0) {
					secureArea[nxtX][nxtY] = 2; // ���̷��� ����  
					q.push({nxtX, nxtY});
				}
			}
		}	
	}			
	int cnt = 0;
	// ���� ���� ī��Ʈ  
	for(int i=0; i<N; i++) {
		for(int j=0; j<M; j++) {
			if(secureArea[i][j] == 0)
				cnt++;
		}
	}
	// ���� ������ �ִ� ����  
	result = max(result, cnt);
}

void makeWall(int wallCnt) {
	if(wallCnt == 3) {
		spreadVirus();
		return;
	}
	
	for(int i=0; i<N; i++) {
		for(int j=0; j<M; j++) {
			if(map[i][j] == 0) {
				map[i][j] = 1;
				makeWall(wallCnt + 1);
				map[i][j] = 0;
			}
		}
	}
}

int main(){
	ios::sync_with_stdio(0);
	cin.tie(0);
	
	cin>>N>>M;

	for(int i=0; i<N; i++) 
		for(int j=0; j<M; j++) 
			cin>>lab[i][j];

	for(int i=0; i<N; i++) {
		for(int j=0; j<M; j++) {
			
			// ��ĭ�̸� ������ ����  
			if(lab[i][j] == 0) {
				for(int k=0; k<N; k++)
					for(int l=0; l<M; l++)
						map[k][l] = lab[k][l];
				
				map[i][j] = 1; // ���� ���� 
				makeWall(1);
				map[i][j] = 0;	// ���� �㹳  
			}
		}
	}
	cout<<result;
	return 0;
}
