#include <iostream>
#include <cstring>

using namespace std;

int n, k;
int coinValue[100], dp[10001];

// 가치의 합이 k원이 될 수 있는 경우의 수 구하기 
int countWayK() {
    memset(dp, 0, sizeof(dp));
    dp[0] = 1;
    for (int i=0; i<n; i++) {
        for (int j=coinValue[i]; j<=k; j++) {
            dp[j] += dp[j - coinValue[i]]; // (현재의 가치 - 자신의 가치)가치를 만들 수 있는 경우의 수를 합해줌  
        }
    }
    return dp[k];
}

int main() {
    ios::sync_with_stdio(0);
	cin.tie(0);

    cin>>n>>k;
    for (int i=0; i<n; i++) {
        cin>>coinValue[i];
    }

    int result = countWayK();
    cout<<result;
    return 0;
}