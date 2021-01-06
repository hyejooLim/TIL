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
		//�ǿ������� ���
		if('A' <= str[i] && str[i] <= 'Z') 
			result += str[i];
			
		//�������� ���	
		else{   
			if(str[i] == '(')
				s.push(str[i]);
		
			//�켱������ ���� ����  
			else if(str[i] == '*' || str[i] == '/'){
				//s.top()�� '*' �Ǵ� '/' �� ���� ����� �߰�  
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
				s.pop(); //'(' ������  
			}
		}	
	}
	
	//������ ����� �߰�  
	while(!s.empty()){
		result += s.top();
		s.pop();
	}
	
	cout<<result;	
	return 0;
} 
