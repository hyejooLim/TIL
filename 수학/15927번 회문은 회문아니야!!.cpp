#include <iostream>
#include <cstring>
 
using namespace std;

int main(){
	ios::sync_with_stdio(0);
	cin.tie(0);
	
	string s;
	cin>>s;
	
<<<<<<< HEAD
	bool pell = false;
	bool pellnot = false;
=======
	bool pellnot = false;
	bool pell = false;
>>>>>>> 8ad5f26c3d494248f4e4d0b204b947083f1af17e
	
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
<<<<<<< HEAD
=======


>>>>>>> 8ad5f26c3d494248f4e4d0b204b947083f1af17e
