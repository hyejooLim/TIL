#include <iostream>
#include <queue>
#define MAX 100001

using namespace std;

int cnt;
int result;
bool visited[MAX];

void hiding(int from, int to) {
	queue<pair<int, int>> q;
	q.push({from, 0});    
	visited[from] = true;
	
	while(!q.empty()) {
		int loc = q.front().first;
		int time = q.front().second;
		q.pop();
		
		visited[loc] = true;
		
		// 이전에 동생위치에 도달한적이 있는 경우  
		if(result == time && loc == to)
			cnt++;
		
		// 최초로 동생위치에 도달한 경우   
		if(!result && loc == to) {
			result = time;
			cnt = 1;
		}
		
		if(0 <= loc-1 && !visited[loc-1]) 
			q.push({loc-1, time+1});	
			
		if(loc+1 < MAX && !visited[loc+1]) 
			q.push({loc+1, time+1});
	
		if(loc*2 < MAX && !visited[loc*2]) 
			q.push({loc*2, time+1});   		
	}
}

int main(){
	ios::sync_with_stdio(0);
	cin.tie(0);

	int N, K;
	cin>>N>>K;
	hiding(N, K);
	cout<<result<<"\n"<<cnt;
	
	return 0;
}
