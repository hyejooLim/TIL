#include <bits/stdc++.h>
#define MAX 1000000

using namespace std;

char result[MAX];

int main(){
	ios::sync_with_stdio(0);
	cin.tie(0);
	
	string str, bomb;
	cin>>str>>bomb;
	
	int idx = 0;
	int len = bomb.length(); // ��ź ���ڿ��� ����  
	
	for(int i=0; i<str.length(); i++) {
		result[idx++] = str[i];
		
		// ��ź ���ڿ��� ���� ���ɼ�  
		if(result[idx - 1] == bomb[len - 1]) {
			bool flag = true;
			
			for(int j=0; j<len; j++) {
				if(result[idx - j - 1] == bomb[len - j - 1])
					continue;
				
				flag = false;
				break;
			}
			if(flag)
				idx -= len; // ��ź ���ڿ� ����  
		}
	}

	if(idx == 0)
		cout<<"FRULA";
	else {
		for(int i=0; i<idx; i++)
			cout<<result[i];
	}
	
	return 0;
}
