#include <bits/stdc++.h>
#define MAX 1000

using namespace std;

int arr[MAX];
int cnt[MAX];
vector<int> update[MAX]; // �κ� ���� ������ ���� ����  
vector<int> result;

int main(){
	ios::sync_with_stdio(0);
	cin.tie(0);
	
	int N;
	cin>>N;
	
	for(int i=0; i<N; i++) 
		cin>>arr[i];
	
	// �ڽ��� �����ϴ� �κ� ������ ���̴� 1  
	fill_n(cnt, N, 1);
		
	for(int i=0; i<N; i++) {
		int curVal = arr[i];
		update[i].push_back(curVal);  
		
		for(int j=0; j<i; j++) {
			
			// ���� ���� �� ũ�� ������ �����ϴٸ�  
			if(arr[j] < curVal && cnt[i] < cnt[j] + 1) {
				update[i].clear();
				update[i] = update[j]; // �ڽ��� ������ �κ� ���� ����  
				update[i].push_back(curVal); // �ڽ� ����  
				cnt[i] = cnt[j] + 1;
			}
		}
		// �κ� ���� �����ϱ�  
		if(result.size() < update[i].size())
			result = update[i];
	}
	
	int size = result.size();
	cout<<size<<"\n"; // ���� �� �����ϴ� �κ� ������ ����  
	for(int i=0; i<size; i++)
		cout<<result[i]<<" "; // ���� �� �����ϴ� �κ� ����
		
	return 0;
}
