#include <iostream>
#include <cstring>
 
using namespace std;

int main(){
	ios::sync_with_stdio(0);
	cin.tie(0);
	
	string s;
	cin>>s;
	
	bool pell = false;
	bool pellnot = false;
	
	int size = s.length();
	for(int i=0; i<size/2; i++){
		
		//팰린드롬이 아닌 경우
		if(s[i] != s[size-1-i]){   
			pellnot = true;
			break;
		}
		//팰린드롬인 경우 => 모두 같은 문자인지 확인   
		else if(s[i] != s[i+1])
			pell = true;
	}
	
	if(pellnot) //팰린드롬이 아니면 문자열 전체 사이즈  
		cout<<size;
	else{ //팰린드롬이고    
		if(pell) //문자가 모두 같지 않으면  
			cout<<size - 1;
		else //문자가 모두 같으면  
			cout<<-1;
	}
	
	return 0;
}
