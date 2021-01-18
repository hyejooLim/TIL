#include <iostream>

using namespace std;

int N;
int cnt = 0;
int chess[16];

bool possible(int cur) {
	int prev = 1; // 이전 행  
	bool flag = true;
	
	while(prev < cur && flag) {
		// 같은 열이거나 대각선이면  
		if(chess[cur]==chess[prev] || abs(chess[cur]-chess[prev]) == cur-prev)
			flag = false;
		prev++;
	}
	return flag;
}

void queen(int row) {
	if(possible(row)) {
		if(row == N) // 체스판에 N개의 퀸을 놓았다면   
			cnt++;
		else {
			for(int i=1; i<=N; i++) {
				chess[row + 1] = i;
				queen(row + 1);
			}
		}
	} 
}

int main(){
	ios::sync_with_stdio(0);
	cin.tie(0);

	cin>>N;
	queen(0);
	cout<<cnt;
	
	return 0;
}
