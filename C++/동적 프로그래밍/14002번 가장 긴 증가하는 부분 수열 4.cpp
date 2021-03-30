#include <bits/stdc++.h>
#define MAX 1000

using namespace std;

int arr[MAX];
int cnt[MAX];
vector<int> update[MAX]; // 부분 수열 갱신을 위한 벡터  
vector<int> result;

int main(){
	ios::sync_with_stdio(0);
	cin.tie(0);
	
	int N;
	cin>>N;
	
	for(int i=0; i<N; i++) 
		cin>>arr[i];
	
	// 자신의 증가하는 부분 수열의 길이는 1  
	fill_n(cnt, N, 1);
		
	for(int i=0; i<N; i++) {
		int curVal = arr[i];
		update[i].push_back(curVal);  
		
		for(int j=0; j<i; j++) {
			
			// 현재 값이 더 크고 갱신이 가능하다면  
			if(arr[j] < curVal && cnt[i] < cnt[j] + 1) {
				update[i].clear();
				update[i] = update[j]; // 자신을 제외한 부분 수열 삽입  
				update[i].push_back(curVal); // 자신 삽입  
				cnt[i] = cnt[j] + 1;
			}
		}
		// 부분 수열 갱신하기  
		if(result.size() < update[i].size())
			result = update[i];
	}
	
	int size = result.size();
	cout<<size<<"\n"; // 가장 긴 증가하는 부분 수열의 길이  
	for(int i=0; i<size; i++)
		cout<<result[i]<<" "; // 가장 긴 증가하는 부분 수열
		
	return 0;
}
