#include <bits/stdc++.h>
#define MAX 16

using namespace std;

int N;
int cnt;
int house[MAX][MAX];

void movePipe() {
	queue<pair<pair<int, int>, int>> q;
	q.push({{0, 1}, 1}); // ó�� �������� �׻� ���� ������
	
	while(!q.empty()) {
		int x = q.front().first.first;
		int y = q.front().first.second;
		int dir = q.front().second; // �������� ����: 1 ���� 2 ���� 3 �밢�� 
		q.pop();
		
		// ���� ��ǥ�� (n-1, n-1)�� �����ϸ�   
		if(x == N-1 && y == N-1)
			cnt++;
		
		// ���� �������̸�  
		if(dir == 1) {
			// ���� �������� ���� �� �ִ��� Ȯ�� 
			if(y+1<N && house[x][y+1] == 0)   
				q.push({{x, y+1}, 1});
			
			// �밢�� �������� ���� �� �ִ��� Ȯ��
			if(x+1<N && y+1<N) { 
				if(house[x][y+1] == 1 || house[x+1][y] == 1 || house[x+1][y+1] == 1)
					continue;
			 
				q.push({{x+1, y+1}, 3});
			}  
		}
		
		// ���� �������̸� 
		else if(dir == 2) {
			// ���� �������� ���� �� �ִ��� Ȯ��  
			if(x+1<N && house[x+1][y] == 0)
				q.push({{x+1, y}, 2}); 
			
			// �밢�� �������� ���� �� �ִ��� Ȯ�� 
			if(x+1<N && y+1<N) { 
				if(house[x+1][y] == 1 || house[x+1][y+1] == 1 || house[x][y+1] == 1)
					continue;
			
				q.push({{x+1, y+1}, 3});  	
			}
		}
		
		// �밢�� �������̸�  
		else if(dir == 3) {
			// ���� �������� ���� �� �ִ��� Ȯ�� 
			if(y+1<N && house[x][y+1] == 0)
				q.push({{x, y+1}, 1}); 
		
			// ���� �������� ���� �� �ִ��� Ȯ�� 
			if(x+1<N && house[x+1][y] == 0)
				q.push({{x+1, y}, 2}); 
			
			// �밢�� �������� ���� �� �ִ��� Ȯ�� 
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
	
	movePipe(); // ������ �ű��  
	cout<<cnt;
			
	return 0;
}
