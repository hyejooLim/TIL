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

// �� �� �� ��  
box moveD[4] = { {-1, 0}, {1, 0}, {0, -1}, {0, 1} };
  
int cw[4] = { 3, 1, 2, 0 }; // �ð� ���� 
int ccw[4] = { 3, 0, 2, 1 }; // �ݽð� ����

void spreadDust() {
	while(!q.empty()) {
		int curX = q.front().first;
		int curY = q.front().second;
		q.pop();
		
		int cnt = 0; // �̼����� Ȯ�� ������ ����    
		int amount = copyRoom[curX][curY] / 5; // �̼����� Ȯ��� 
		
		for(int i=0; i<4; i++) {
			int nxtX = curX + moveD[i].x;
			int nxtY = curY + moveD[i].y;
			
			if(nxtX<0 || R<=nxtX || nxtY<0 || C<=nxtY)
				continue;
			
			// ���� û���Ⱑ ������  
			if(copyRoom[nxtX][nxtY] == -1)
				continue;
			
			// �̼����� Ȯ��
			room[nxtX][nxtY] += amount;   
			cnt++;
		}
		// ���� ĭ�� �̼����� �� ����  
		room[curX][curY] -= amount*cnt; 
	}
	
	// �̼������� Ȯ��� �迭 ����   
	for(int i=0; i<R; i++)
		for(int j=0; j<C; j++)
			copyRoom[i][j] = room[i][j];
}

void workMachine() {
	int curX = airX; 
	int curY = airY + 1; 
	room[curX][curY] = 0; // �з����� 0�� �� 
	
	for(int i=0; i<4; i++) {
		while(1) {
			int nxtX = curX + moveD[ccw[i]].x;
			int nxtY = curY + moveD[ccw[i]].y;
			
			// ���� �̼������� ��� �̵��ߴٸ�   
			if(nxtX == airX && nxtY == airY)
				break;
			
			if(nxtX<0 || R<=nxtX || nxtY<0 || C<=nxtY)
				break;
			
			// �̼����� �̵�  
			room[nxtX][nxtY] = copyRoom[curX][curY];
			curX = nxtX;
			curY = nxtY; 
		}
	}
	
	curX = airX2;
	curY = airY2 + 1;
	room[curX][curY] = 0; // �з����� 0�� ��
	
	for(int i=0; i<4; i++) {
		while(1) {
			int nxtX = curX + moveD[cw[i]].x;
			int nxtY = curY + moveD[cw[i]].y;
			
			// �Ʒ��� �̼������� ��� �̵��ߴٸ�  
			if(nxtX == airX2 && nxtY == airY2)
				break;
				
			if(nxtX<0 || R<=nxtX || nxtY<0 || C<=nxtY)
				break;
			
			// �̼����� �̵�  
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
			
			// ����û���Ⱑ �ִٸ�  
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
	
	// T�� ���� ����  
	for(int i=0; i<T; i++) {
		for(int j=0; j<R; j++)
			for(int k=0; k<C; k++)
				if(0 < room[j][k])
					q.push({j, k}); 
				
		for(int j=0; j<R; j++)
			for(int k=0; k<C; k++)
				copyRoom[j][k] = room[j][k];
	
		spreadDust();	// �̼����� Ȯ��  
		workMachine(); // ����û���� �۵�  
	}	
	
	int result = 0;
	for(int i=0; i<R; i++)
		for(int j=0; j<C; j++)
			if(0 < room[i][j])
				result += room[i][j];
				
	cout<<result;
	return 0;
}
