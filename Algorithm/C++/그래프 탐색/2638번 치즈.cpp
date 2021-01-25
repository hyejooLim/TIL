#include <bits/stdc++.h>
#define MAX 100

using namespace std;

int N, M;
int paper[MAX][MAX];
int visited[MAX][MAX]; // �湮 Ƚ��  

typedef struct {
	int x, y;
}box;

box moveD[4] = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};

void init_visit() {
	for(int i=0; i<N; i++)
		for(int j=0; j<M; j++)
			visited[i][j] = 0;
}

int remain_cheese() {
	int cnt = 0;
	
	for(int i=0; i<N; i++)
		for(int j=0; j<M; j++)
			if(paper[i][j])
				cnt++;
				
	return cnt; // �����ִ� ġ�� ����  
}

void meltingCheese() {
	for(int i=0; i<N; i++) {
		for(int j=0; j<M; j++) {
			// ġ���̰� 2�� �̻��� ����� ����������  
			if(paper[i][j] && visited[i][j] >= 2)
				paper[i][j] = 0; // ġ�� ���̱�  
		}
	}
}

void relWithAir() {
	queue<pair<int, int>> q;
	q.push({0, 0}); // �����ڸ��� ������ ���� 
	visited[0][0] = 1; 	
	
	while(!q.empty()) {
		int cx = q.front().first;
		int cy = q.front().second;
		q.pop();
		
		for(int i=0; i<4; i++) {
			int nx = cx + moveD[i].x;
			int ny = cy + moveD[i].y;
			
			if(nx<0 || N<=nx || ny<0 || M<=ny)
				continue;
				
			// �ܺ� �����̰� �湮���� �ʾҴٸ�
			if(paper[nx][ny] == 0 && visited[nx][ny] == 0) {
				q.push({nx, ny});
				visited[nx][ny] = 1; 
			}
			// ġ���̸�  
			else if(paper[nx][ny] == 1) {
				visited[nx][ny]++;
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
			cin>>paper[i][j];

	int time = 0; // ġ� ��� �� �ɸ��� �ð�  
	
	while(1) {
		// ��� ġ� �쿴�ٸ�  
		if(remain_cheese() == 0)
			break;

		init_visit(); // �湮 Ƚ�� �ʱ�ȭ
		time++; 
		relWithAir(); // �ܺ� ������� ����  
		meltingCheese(); // ġ�� ���̱�  
	}
	
	cout<<time; 
	return 0;
}
