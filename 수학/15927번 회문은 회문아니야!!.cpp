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
		
		//�Ӹ������ �ƴ� ���
		if(s[i] != s[size-1-i]){   
			pellnot = true;
			break;
		}
		//�Ӹ������ ��� => ��� ���� �������� Ȯ��   
		else if(s[i] != s[i+1])
			pell = true;
	}
	
	if(pellnot) //�Ӹ������ �ƴϸ� ���ڿ� ��ü ������  
		cout<<size;
	else{ //�Ӹ�����̰�    
		if(pell) //���ڰ� ��� ���� ������  
			cout<<size - 1;
		else //���ڰ� ��� ������  
			cout<<-1;
	}
	
	return 0;
}
