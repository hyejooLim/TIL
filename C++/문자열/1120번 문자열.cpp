#include <bits/stdc++.h>

using namespace std;

int main(){
	ios::sync_with_stdio(0);
	cin.tie(0);
	
	string A, B;
	cin>>A>>B;
	
	int Alen = A.length();
	int Blen = B.length();
	int def = Blen - Alen;
	
	// A�� B�� �ִ� ���̴� 50 
	int result = 50;
	for(int i=0; i<=def; i++) {
		int cnt = 0;
		
		for(int j=0; j<Alen; j++) {
			if(A[j] != B[j + i])
				cnt++;
		}
		// �ּڰ� ����  
		result = min(result, cnt);
	}
	 
	cout<<result;
	return 0;
}
