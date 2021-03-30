#include <bits/stdc++.h>
#define MAX 1000

using namespace std;

int N;
int arr[MAX];
int incre[MAX];
int decre[MAX];

void bitonic() {
	
	// ���� �� �����ϴ� �κ� ���� 
	for(int i=1; i<N; i++) {
		int curVal = arr[i];
		
		for(int j=0; j<i; j++) {
			if(arr[j] < curVal) 
				incre[i] = max(incre[i], incre[j] + 1);
		}
	}
	
	// ���� �� �����ϴ� �κ� ����  
	for(int i=N-2; i>=0; i--) {
		int curVal = arr[i];
		
		for(int j=N-1; j>i; j--) {
			if(arr[j] < curVal)
				decre[i] = max(decre[i], decre[j] + 1);
		}
	}
}

int main(){
	ios::sync_with_stdio(0);
	cin.tie(0);

	cin>>N;
	
	for(int i=0; i<N; i++)
		cin>>arr[i];
		
	// �ڱ� �ڽ��� �����ϴ� �κ� ���� ���̴� 1  
	fill_n(incre, N, 1);
	bitonic(); 
		
	int result = 0;
	for(int i=0; i<N; i++) {
		result = max(result, incre[i] + decre[i]);
	}
	cout<<result;
	return 0;
}
