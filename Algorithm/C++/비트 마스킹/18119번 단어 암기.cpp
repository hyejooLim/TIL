#include <bits/stdc++.h>

using namespace std;

int word[10000];

int main(){
	ios::sync_with_stdio(0);
	cin.tie(0);

	int N, M;
	cin>>N>>M;
	
	int remember = 0;
	
	// ó������ ��� ���ĺ��� ����ϴ� ����  
	for(int i=0; i<26; i++) {
		remember += (1 << i);
	}

	for(int i=0; i<N; i++) {
		string s;
		cin>>s;
		
		// �迭�� ���ڿ� ��� 
		// ex) apple 1000 1000 0001 0001   
		for(int j=0; j<s.length(); j++) {
			word[i] |= (1 << (s[j] - 'a'));
		}
	}
	
	int o;
	char x;
	
	for(int i=0; i<M; i++) {
		int cnt = 0;
		cin>>o>>x;
		
		// o: 1 -> x�� �ر�
		// o: 2 -> x�� ����ϱ�    
		remember ^= (1 << (x - 'a'));
		
		for(int j=0; j<N; j++) {
			
			// remember AND �ܾ� 
			if((remember & word[j]) != word[j])
				continue;
			
			cnt++;
		}
		cout<<cnt<<"\n";
	}
	
	return 0;
}
