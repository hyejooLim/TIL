#include <iostream>

using namespace std;

//gcd(a, b) 구하기  
int gcd(int a, int b){
	return b ? gcd(b, a%b) : a;
}

int K, C; 

int EEA(){  
	if(C == 1){ //봉지에 사탕이 하나만 있는 경우  
		if(1+K > 1e9) return 0;
		else return 1+K;
	}
    
    //사탕 하나를 더 구매할 수 없으면  
	if(gcd(K, C) != 1)
		return 0;
	
	int s1 = 1, t1 = 0, r1 = K;
	int s2 = 0, t2 = 1, r2 = C; 
	int q, r, s, t;
	
	while(1){
		q = r1/r2; 
		r = r1%r2; 
		
		if(r == 0) //나머지가 0이면 빠져나오기  
			break;
			
		r1 = r2; r2 = r; 
		
		s = s1 - s2*q; 
		t = t1 - t2*q; 
		
		s1 = s2; t1 = t2; 
		s2 = s; t2 = t; 
	}
	
	while(t < 0){ //음수인 경우, 나누어지는 수를 더해줌  
		t += K;
	}
	if(0<t && t<=1e9) //범위 확인  
		return t;
	else 
		return 0;
}

int main(){
	ios::sync_with_stdio(0);
	cin.tie(NULL);
	
	int TC;
	cin>>TC;
	
	while(TC--){
		cin>>K>>C;   
		
		int result = EEA();
		if(result == 0)
			cout<<"IMPOSSIBLE"<<"\n";
		else
			cout<<result<<"\n";
	}
	
	return 0;
}
