#include <iostream>
#define MOD 1000000007;

using namespace std;

int n, k; //k번의 합으로 n 만드는 경우의 수 
int dp[301][25];

int countWay() {
  for (int i=1; i<301; i++) 
    dp[i][1] = 1;

    return dp[n][k] % MOD;
}

int main() {
  ios::sync_with_stdio(0);
  cin.tie(0);

  cin>>n>>k;
  int result = countWay();
  cout<<result;

  return 0;
}