#include <iostream>
#include <cstring>
#include <algorithm>
#define MAX 101

using namespace std;

int n, m;
string arr[MAX][MAX];

string addNum(string num1, string num2){
	long long sum = 0;
	string result;
	
	//num1, num2, sum�� ��� �� ������ �ݺ�    
	while(!num1.empty() || !num2.empty() || sum){
		
		//���� �ڸ����� ���ϱ� ����  
		if(!num1.empty()){
			sum += num1.back() - '0'; 
			num1.pop_back();
		}
		if(!num2.empty()){
			sum += num2.back() - '0';
			num2.pop_back();
		}
		//�ٽ� string Ÿ������ �־���  
		result.push_back((sum%10) + '0');
		sum/=10;
	}
	//���� �ڸ����� �־������Ƿ� ��������  
	reverse(result.begin(), result.end());
	return result;
}

string combination(int n, int r){
	if(n==r || r==0)
		return "1";
	
	//�̹� ����� �Ǿ����� �ٷ� ��������  
	if(arr[n][r] != "")
		return arr[n][r];
		
	return arr[n][r] = addNum(combination(n-1, r), combination(n-1, r-1));
}

int main(){
	ios::sync_with_stdio(0);
	cin.tie(0);
	 
	cin>>n>>m;
	cout<<combination(n, m);

	return 0;
} 
