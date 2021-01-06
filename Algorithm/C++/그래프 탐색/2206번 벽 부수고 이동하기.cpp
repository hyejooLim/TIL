#include <iostream>
#include <queue> 
#define MAX 1000

using namespace std;

int N, M;
int map[MAX][MAX];
//������ 2�� ���� �μ��� �̵��� ��ο� �׷��� ���� ��� ����  
bool visited[MAX][MAX][2]; 

typedef struct{
	int x, y;
}box;

//�� �� �� ��  
box moveD[4] = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};

int bfs(){  
	queue<pair<pair<int, int>, pair<int, int>>> q;
	q.push({{0, 0}, {0, 1}}); //�� ��° 0�� ���� �μ��� �ʾҴٴ� �ǹ�  
	visited[0][0][0] = true;
	 
	while(!q.empty()){
		int curX = q.front().first.first;
		int curY = q.front().first.second;
		int dontgo = q.front().second.first; 
		int cnt = q.front().second.second;
		q.pop();
		
		//������ ĭ�� �̵������� �ִܰ�� ��ȯ 
		if(curX == N-1 && curY == M-1)
			return cnt;  
		
		for(int i=0; i<4; i++){
			int nxtX = curX + moveD[i].x;
			int nxtY = curY + moveD[i].y;
			
			if(0<=nxtX && nxtX<N && 0<=nxtY && nxtY<M){
				//���� ���� �湮���� ���� ���   
				if(map[nxtX][nxtY] == 0 && !visited[nxtX][nxtY][dontgo]){
					q.push({{nxtX, nxtY}, {dontgo, cnt+1}});
					visited[nxtX][nxtY][dontgo] = true;
				}
				//���� �ְ� ���� ���� �μ��� ���� ���  
				else if(map[nxtX][nxtY] == 1 && dontgo == 0){
					q.push({{nxtX, nxtY}, {dontgo+1, cnt+1}});
					visited[nxtX][nxtY][dontgo+1] = true;	
				}
			}
		}
	}
	return -1;
}

int main(){
	ios::sync_with_stdio(0);
	cin.tie(0);
	cout.tie(0);
	
	cin>>N>>M;

	string str;
	for(int i=0; i<N; i++){
		cin>>str;
		for(int j=0; j<M; j++){
			map[i][j] = str[j] - '0';
		}
	}

	cout<<bfs(); 
	return 0;
}
