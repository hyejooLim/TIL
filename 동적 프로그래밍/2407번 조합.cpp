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
	
	//num1, num2, sum이 모두 빌 때까지 반복    
	while(!num1.empty() || !num2.empty() || sum){
		
		//일의 자리부터 더하기 시작  
		if(!num1.empty()){
			sum += num1.back() - '0'; 
			num1.pop_back();
		}
		if(!num2.empty()){
			sum += num2.back() - '0';
			num2.pop_back();
		}
		//다시 string 타입으로 넣어줌  
		result.push_back((sum%10) + '0');
		sum/=10;
	}
	//일의 자리부터 넣어줬으므로 뒤집어줌  
	reverse(result.begin(), result.end());
	return result;
}

string combination(int n, int r){
	if(n==r || r==0)
		return "1";
	
	//이미 계산이 되었으면 바로 리턴해줌  
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
