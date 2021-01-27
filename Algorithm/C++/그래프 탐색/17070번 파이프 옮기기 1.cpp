#include <bits/stdc++.h>
#define MAX 16

using namespace std;

int N;
int cnt;
int house[MAX][MAX];

typedef struct {
	int x, y;
}box;

// ���� ���� �밢��  
box moveD[3] = { {0, 1}, {1, 0}, {1, 1} };

void movePipe() {
	queue<pair<pair<int, int>, int>> q;
	q.push({{0, 1}, 0}); // ó�� �������� �׻� ���� ������
	
	while(!q.empty()) {
		int x = q.front().first.first;
		int y = q.front().first.second;
		int dir = q.front().second; // �������� ����: 0 ���� 1 ���� 2 �밢�� 
		q.pop();
		
		// ���� ��ǥ�� (n-1, n-1)�� �����ϸ�   
		if(x == N-1 && y == N-1)
			cnt++;
		
		for(int i=0; i<3; i++) {
			// ���� -> ���� / ���� -> ���� �Ұ���  
			if((i == 0 && dir == 1) || (i == 1 && dir == 0))
				continue;
				
			int nx = x + moveD[i].x;
			int ny = y + moveD[i].y;
			
			if(N<=nx || N<=ny || house[nx][ny] == 1)
				continue;
			
			// �밢���� ��� �߰� Ȯ�� 
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
	
	movePipe(); // ������ �ű��  
	cout<<cnt;
			
	return 0;
}
