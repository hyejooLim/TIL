#include <iostream>
#include <algorithm>
#include <vector>
#define MAX 100

using namespace std;

int m, n, k, cnt;
int left_x, left_y, right_x, right_y;
int graph_paper[MAX][MAX];
bool visited[MAX][MAX];

typedef struct {
  int x, y;
}box;

box moveD[4] = { {-1, 0}, {1, 0}, {0, -1}, {0, 1} };

// 직사각형을 그리는 함수 
void drawRectangle(int lx, int ly, int rx, int ry) {
  for (int i=m-ry; i<=m-ly-1; i++) {
    for (int j=lx; j<=rx-1; j++) {
      if (graph_paper[i][j] == -1) continue;
      graph_paper[i][j] = -1;
    }
  }
}

// 각 영역의 넓이를 구하는 함수 
void getArea(int x, int y) { 
  visited[x][y] = true;
  cnt++;

  for (int i=0; i<4; i++) {
    int nx = x + moveD[i].x; 
    int ny = y + moveD[i].y; 

    if (nx < 0 || m <= nx || ny < 0 || n <= ny) continue; // 범위를 벗어나면
    if (graph_paper[nx][ny] == -1 || visited[nx][ny]) continue; // 직사각형이 그려져 있거나 이미 방문했다면
    getArea(nx, ny); 
  }
}

int main() {
  ios::sync_with_stdio(0);
	cin.tie(0);

  cin>>m>>n>>k;
  for(int i=0; i<k; i++) {
    cin>>left_x>>left_y>>right_x>>right_y;
    drawRectangle(left_x, left_y, right_x, right_y);
  }

  vector<int> area; // 각 영역의 넓이를 담을 벡터

  for (int i=0; i<m; i++) {
    for (int j=0; j<n; j++) {
      if (graph_paper[i][j] == 0 && !visited[i][j]) {
        cnt = 0; // 각 영역의 개수를 세기 위한 변수
        getArea(i, j);
        area.push_back(cnt); 
      }
    }
  }
  sort(area.begin(), area.end());
  
  cout<<area.size()<<"\n";
  for (int i=0; i<area.size(); i++) 
    cout<<area[i]<<" ";
  
  return 0;
}