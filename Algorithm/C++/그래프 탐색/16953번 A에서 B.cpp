#include <iostream>
#include <queue>

using namespace std;

typedef long long ll; // int 범위를 벗어나므로  

ll transform(int from, int to) {
	queue<pair<ll, ll>> q;
	q.push({from, 0});
	
	while(!q.empty()) {
		ll curVal = q.front().first;
		ll cnt = q.front().second;
		q.pop();
		
		// 현재값이 B와 같으면 연산횟수 + 1 반환   
		if(curVal == to){
			return cnt + 1;
		}
		
		// 현재값이 B보다 크면 더이상 삽입하지 않음  
		if(curVal > to)
			continue;
		
		// 큐에 삽입할 때마다 연산횟수 + 1	
		q.push({curVal * 2, cnt + 1});
		q.push({curVal * 10 + 1, cnt + 1});
	}
	
	return -1;
}

int main() {
	ios::sync_with_stdio(0);
	cin.tie(0);
	
	int A, B;
	cin>>A>>B;
	cout<<transform(A, B);
	
	return 0;
}
