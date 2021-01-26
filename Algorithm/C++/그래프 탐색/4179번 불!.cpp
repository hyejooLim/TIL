#include <bits/stdc++.h>
#define MAX 1000

using namespace std;

int r, c;
string maze[MAX]; 
int dist1[MAX][MAX]; // ���� ���� �ð�  
int dist2[MAX][MAX]; // �������� Ż�� �ð�  
queue<pair<int, int>> q1; // ���� bfs�� ����   
queue<pair<int, int>> q2; // �������� bfs�� ����    

typedef struct {
	int x, y;
}box;

// �� �� �� ��  
box moveD[4] = { {-1, 0}, {1, 0}, {0, -1}, {0, 1} };

void fire() {
	while(!q1.empty()) {
		int x = q1.front().first;
		int y = q1.front().second;
		q1.pop();
		
		for(int i=0; i<4; i++) {
			int nx = x + moveD[i].x;
			int ny = y + moveD[i].y;
			
			if(nx<0 || r<=nx || ny<0 || c<=ny)
				continue;
			 
			 // ���̰ų� �̹� ���� Ȯ��ƴٸ�  
			if(maze[nx][ny] == '#' || dist1[nx][ny] != -1)   
				continue;
      
      // ���� ���� Ȯ����� �ʾҴٸ�  
			dist1[nx][ny] = dist1[x][y] + 1;
      q1.push({nx, ny});
		}	
	} 	                  
} 

void escape() {
	while(!q2.empty()) {
		int x = q2.front().first;
		int y = q2.front().second;
		q2.pop();
		
		for(int i=0; i<4; i++) {
			int nx = x + moveD[i].x;
			int ny = y + moveD[i].y;
			
			// �����̰� Ż���ߴٸ�  
			if(nx<0 || r<=nx || ny<0 || c<=ny) {
				cout<<dist2[x][y] + 1;
				return;
			}
			
			// ���̰ų� �̹� �湮�ߴٸ�  
			if(maze[nx][ny] == '#' || dist2[nx][ny] != -1)   
				continue;
			
			// ���� Ȯ����� �ʾҰų� �����̰� �� ���� �̵��� �� �ִٸ�  
			if(dist1[nx][ny] == -1 || dist2[x][y] + 1 < dist1[nx][ny]) {
				dist2[nx][ny] = dist2[x][y] + 1;
				q2.push({nx, ny});
			}
		}
	}
	cout<<"IMPOSSIBLE";
}

int main(){
	ios::sync_with_stdio(0);
	cin.tie(0);
	
	cin>>r>>c;
	for(int i=0; i<r; i++)
		cin>>maze[i];
	
	// -1�� �ʱ�ȭ  
	for(int i=0; i<r; i++) {
		fill(dist1[i], dist1[i]+c, -1);
		fill(dist2[i], dist2[i]+c, -1);
	}
		
	for(int i=0; i<r; i++) {
		for(int j=0; j<c; j++) {
			if(maze[i][j] == 'F') {
				q1.push({i, j});
				dist1[i][j] = 0;
			}
			if(maze[i][j] == 'J') {
				q2.push({i, j});
				dist2[i][j] = 0;
			}
		}
	}
		
	fire(); // ���� ���� �ð� ���ϱ� 			
	escape(); // �������� Ż��  
	
	return 0;
}
