#include <iostream>
#include <queue>

using namespace std;

typedef long long ll; // int ������ ����Ƿ�  

ll transform(int from, int to) {
	queue<pair<ll, ll>> q;
	q.push({from, 0});
	
	while(!q.empty()) {
		ll curVal = q.front().first;
		ll cnt = q.front().second;
		q.pop();
		
		// ���簪�� B�� ������ ����Ƚ�� + 1 ��ȯ   
		if(curVal == to){
			return cnt + 1;
		}
		
		// ���簪�� B���� ũ�� ���̻� �������� ����  
		if(curVal > to)
			continue;
		
		// ť�� ������ ������ ����Ƚ�� + 1	
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
