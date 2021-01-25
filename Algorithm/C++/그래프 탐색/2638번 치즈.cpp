#include <bits/stdc++.h>
#define MAX 100

using namespace std;

int N, M;
int paper[MAX][MAX];
int visited[MAX][MAX]; // 방문 횟수  

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
				
	return cnt; // 남아있는 치즈 개수  
}

void meltingCheese() {
	for(int i=0; i<N; i++) {
		for(int j=0; j<M; j++) {
			// 치즈이고 2변 이상이 공기와 접촉했으면  
			if(paper[i][j] && visited[i][j] >= 2)
				paper[i][j] = 0; // 치즈 녹이기  
		}
	}
}

void relWithAir() {
	queue<pair<int, int>> q;
	q.push({0, 0}); // 가장자리는 무조건 공기 
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
				
			// 외부 공기이고 방문하지 않았다면
			if(paper[nx][ny] == 0 && visited[nx][ny] == 0) {
				q.push({nx, ny});
				visited[nx][ny] = 1; 
			}
			// 치즈이면  
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

	int time = 0; // 치즈가 녹는 데 걸리는 시간  
	
	while(1) {
		// 모든 치즈를 녹였다면  
		if(remain_cheese() == 0)
			break;

		init_visit(); // 방문 횟수 초기화
		time++; 
		relWithAir(); // 외부 공기와의 관계  
		meltingCheese(); // 치즈 녹이기  
	}
	
	cout<<time; 
	return 0;
}
