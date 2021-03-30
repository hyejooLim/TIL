#include <bits/stdc++.h>

using namespace std;

int dp[100][100001];

int main(){
	ios::sync_with_stdio(0);
	cin.tie(0);
	
	int N, K;
	cin>>N>>K;
	
	vector<pair<int, int>> v;
	for(int i=0; i<N; i++) {
		int weight, value;
		cin>>weight>>value;
		
		// ������ ���Կ� ��ġ ���� ����  
		v.push_back({ weight, value });
	}
	
	// dp �ʱ�ȭ  
	for(int i=v[0].first; i<=K; i++)
		dp[0][i] = v[0].second;
		
	for(int i=1; i<N; i++) {
		int weight = v[i].first;
		int value = v[i].second;
		
		for(int j=0; j<=K; j++) {
			
			// �ش� ���԰� �������� ������ ���Ժ��� ������  
			if(j < weight)
				dp[i][j] = dp[i - 1][j];
			else 
				dp[i][j] = max(dp[i - 1][j], dp[i - 1][j - weight] + value);
		}
	}

	cout<<dp[N-1][K]; // ���ǵ��� ��ġ���� �ִ�  
	return 0;
}
