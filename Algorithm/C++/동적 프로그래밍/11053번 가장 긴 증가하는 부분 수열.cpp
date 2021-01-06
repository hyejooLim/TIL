#include <iostream>
#include <cstring>
#define MAX 1000

using namespace std;

int arr[MAX];  
int cnt[MAX]; 

int main(){
	ios::sync_with_stdio(0);
	cin.tie(0);

	int N;
	cin>>N;
	
	for(int i=0; i<N; i++)
		cin>>arr[i]; 
	
	//��� 1�� �ʱ�ȭ  
	//�ڱ� �ڽ��� �����ϴ� �κ� ������ ���̴� 1 
	fill_n(cnt, N, 1);
	
	int result = 1;
	for(int i=1; i<N; i++){
		int curVal = arr[i];
		
		for(int j=0; j<i; j++){
			if(arr[j] < curVal) //�ڱ� �ڽ��� �� ũ��  
				cnt[i] = max(cnt[i], cnt[j] + 1);
		}
		result = max(result, cnt[i]); //����� ����  
	}
	
	cout<<result<<"/n";
	return 0;
}
