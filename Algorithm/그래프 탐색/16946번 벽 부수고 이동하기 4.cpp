#include <iostream>
#include <cstring>
#include <queue>
#include <vector>
#include <set>
#define MAX 1000

using namespace std;

int N, M;
int groupNum = 0; //���Ϳ� �����ϱ� ���� 0���� ����

vector<int> v;
int map[MAX][MAX];  
int answer[MAX][MAX]; 
int areaNum[MAX][MAX]; //0�� �׷��� ���� �迭  
bool visited[MAX][MAX];  

typedef struct{
	int x, y;
}box;

//�� �� �� ��  
box moveD[4] = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};

void bfs(int a, int b){
	queue<pair<int, int>> q;
	q.push({a, b});
	visited[a][b] = true;
	int cnt = 1; //0�� ������ ���� ���� ���� 
	areaNum[a][b] = groupNum;  
	
	while(!q.empty()){
		int cx = q.front().first;
		int cy = q.front().second;
		q.pop();
		
		for(int i=0; i<4; i++){
			int nx = cx + moveD[i].x;
			int ny = cy + moveD[i].y;
				
			if(0<=nx && nx<N && 0<=ny && ny<M){
				if(map[nx][ny] == 0 && !visited[nx][ny]){
					visited[nx][ny] = true;
					areaNum[nx][ny] = groupNum;
					q.push({nx, ny});
					cnt++; //�湮���� ���� 0�� ���� ����  
				}
			}
		}
	}
	//i �׷��� ������ �ε��� i�� �����   
	v.push_back(cnt); 
} 

int main(){
	ios::sync_with_stdio(0);
	cin.tie(0);
	
	cin>>N>>M;
	for(int i=0; i<N; i++){
		string str;
		cin>>str; 
	
		for(int j=0; j<M; j++)
			map[i][j] = str[j] - '0';
	}
	memset(areaNum, -1, sizeof(areaNum));  
	 
	for(int i=0; i<N; i++){
		for(int j=0; j<M; j++){
			if(map[i][j] == 0 && !visited[i][j]){
				bfs(i, j);
				groupNum++;
			}			
		}
	}
	
	for(int i=0; i<N; i++){
		for(int j=0; j<M; j++){
			if(map[i][j] == 1){
				set<int> s; //���� �׷� ���� ����  
				
				for(int k=0; k<4; k++){
					int nx = i + moveD[k].x;
					int ny = j + moveD[k].y;
					
					if(0<=nx && nx<N && 0<=ny && ny<M){
						if(map[nx][ny] == 0){
							//���� �湮���� ���� �׷��̶��  
							if(s.find(areaNum[nx][ny]) == s.end()){
								s.insert(areaNum[nx][ny]);
								answer[i][j] += v[areaNum[nx][ny]];
							}
						}
					}
				}
				answer[i][j] += 1;
				answer[i][j] = answer[i][j] % 10;
			}
		}
	}
	
	for(int i=0; i<N; i++){
		for(int j=0; j<M; j++){
			cout<<answer[i][j];
		}
		cout<<"\n";
	}
	
	return 0;
}
