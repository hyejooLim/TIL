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
	int len = bomb.length(); // 폭탄 문자열의 길이  
	
	for(int i=0; i<str.length(); i++) {
		result[idx++] = str[i];
		
		// 폭탄 문자열의 존재 가능성  
		if(result[idx - 1] == bomb[len - 1]) {
			bool flag = true;
			
			for(int j=0; j<len; j++) {
				if(result[idx - j - 1] == bomb[len - j - 1])
					continue;
				
				flag = false;
				break;
			}
			if(flag)
				idx -= len; // 폭탄 문자열 제거  
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
