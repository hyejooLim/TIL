#include <iostream>
#include <vector>
#include <queue>
#define MAX 100001

using namespace std;

bool visited[MAX];

int hiding(int from, int to) {
	priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> q;
	q.push({0, from}); // ����ð��� ª�� ������ ����   
	visited[from] = true;
	
	while(!q.empty()) {
		int time = q.top().first;
		int loc = q.top().second;
		q.pop();
		
		// ������ġ�� �����ϸ� ����ð� ��ȯ  
		if(loc == to)
			return time;
			
		if(loc*2 < MAX && !visited[loc*2]) {
			q.push({time, loc*2}); // �����̵��� ��� 0��  
			visited[loc*2] = true;
		}	
		if(loc+1 < MAX && !visited[loc+1]) {
			q.push({time+1, loc+1});
			visited[loc+1] = true;
		}
		if(0 <= loc-1 && !visited[loc-1]) {
			q.push({time+1, loc-1});
			visited[loc-1] = true;	
		}
	}
}

int main(){
	ios::sync_with_stdio(0);
	cin.tie(0);

	int N, K;
	cin>>N>>K;
	cout<<hiding(N, K);
	
	return 0;
}
