#include <iostream>
#include <cstring>
#include <stack>
 
using namespace std;

int main(){
	ios::sync_with_stdio(0);
	cin.tie(0);
	cout.tie(0);
	
	string str;
	cin>>str;
	
	string result;
	stack<char> s;
	
	for(int i=0; i<str.length(); i++){
		//피연산자일 경우
		if('A' <= str[i] && str[i] <= 'Z') 
			result += str[i];
			
		//연산자일 경우	
		else{   
			if(str[i] == '(')
				s.push(str[i]);
		
			//우선순위가 가장 높음  
			else if(str[i] == '*' || str[i] == '/'){
				//s.top()이 '*' 또는 '/' 일 때만 결과에 추가  
				while(!s.empty() && (s.top() == '*' || s.top() == '/')){
					result += s.top();
					s.pop();
				}
				s.push(str[i]);
			}
			else if(str[i] == '+' || str[i] == '-'){
				while(!s.empty() && s.top() != '('){
					result += s.top();
					s.pop();
				}
				s.push(str[i]);
			}
			else if(str[i] == ')'){
				while(!s.empty() && s.top() != '('){
					result += s.top();
					s.pop();
				}
				s.pop(); //'(' 꺼내기  
			}
		}	
	}
	
	//나머지 결과에 추가  
	while(!s.empty()){
		result += s.top();
		s.pop();
	}
	
	cout<<result;	
	return 0;
} 
