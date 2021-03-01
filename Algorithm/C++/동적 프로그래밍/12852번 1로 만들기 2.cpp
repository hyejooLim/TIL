#include <bits/stdc++.h>
#define MAX 1000001

using namespace std;

int n;
int dp[MAX], before[MAX];

void makeOne() {
	dp[1] = 0;
	before[1] = -1; // ��� ���� 
	
	for(int i=2; i<=n; i++) {
		// 1�� ���� ����  
		dp[i] = dp[i - 1] + 1;
		before[i] = i - 1;
		
		// 2�� ������ ��������  
		if(i % 2 == 0 && dp[i / 2] + 1 < dp[i]) {
			dp[i] = dp[i / 2] + 1;
			before[i] = i / 2;
		}
		
		// 3���� ������ �������� 
		if(i % 3 == 0 && dp[i / 3] + 1 < dp[i]) {
			dp[i] = dp[i / 3] + 1;
			before[i] = i / 3;
		} 
	} 
}

int main(){
	ios::sync_with_stdio(0);
	cin.tie(0);
	
	cin>>n;
	makeOne();
	
	// ���� Ƚ���� �ּڰ�  
	cout<<dp[n]<<"\n";
	
	int idx = n;
	while(idx != -1) {
		cout<<idx<<" ";
		idx = before[idx];
	}
	return 0;
}
