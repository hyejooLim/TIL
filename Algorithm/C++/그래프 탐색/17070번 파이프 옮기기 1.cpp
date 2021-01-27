#include <bits/stdc++.h>
#define MAX 16

using namespace std;

int N;
int cnt;
int house[MAX][MAX];

void movePipe() {
	queue<pair<pair<int, int>, int>> q;
	q.push({{0, 1}, 1}); // 처음 파이프는 항상 가로 파이프
	
	while(!q.empty()) {
		int x = q.front().first.first;
		int y = q.front().first.second;
		int dir = q.front().second; // 파이프의 방향: 1 가로 2 세로 3 대각선 
		q.pop();
		
		// 현재 좌표가 (n-1, n-1)에 도달하면   
		if(x == N-1 && y == N-1)
			cnt++;
		
		// 가로 파이프이면  
		if(dir == 1) {
			// 가로 파이프로 놓을 수 있는지 확인 
			if(y+1<N && house[x][y+1] == 0)   
				q.push({{x, y+1}, 1});
			
			// 대각선 파이프로 놓을 수 있는지 확인
			if(x+1<N && y+1<N) { 
				if(house[x][y+1] == 1 || house[x+1][y] == 1 || house[x+1][y+1] == 1)
					continue;
			 
				q.push({{x+1, y+1}, 3});
			}  
		}
		
		// 세로 파이프이면 
		else if(dir == 2) {
			// 세로 파이프로 놓을 수 있는지 확인  
			if(x+1<N && house[x+1][y] == 0)
				q.push({{x+1, y}, 2}); 
			
			// 대각선 파이프로 놓을 수 있는지 확인 
			if(x+1<N && y+1<N) { 
				if(house[x+1][y] == 1 || house[x+1][y+1] == 1 || house[x][y+1] == 1)
					continue;
			
				q.push({{x+1, y+1}, 3});  	
			}
		}
		
		// 대각선 파이프이면  
		else if(dir == 3) {
			// 가로 파이프로 놓을 수 있는지 확인 
			if(y+1<N && house[x][y+1] == 0)
				q.push({{x, y+1}, 1}); 
		
			// 세로 파이프로 놓을 수 있는지 확인 
			if(x+1<N && house[x+1][y] == 0)
				q.push({{x+1, y}, 2}); 
			
			// 대각선 파이프로 놓을 수 있는지 확인 
			if(x+1<N && y+1<N) {
				if(house[x+1][y] == 1 || house[x+1][y+1] == 1 || house[x][y+1] == 1)
					continue;
				
				q.push({{x+1, y+1}, 3});  
			}
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
