#include <bits/stdc++.h>

using namespace std;

int Z(int n, int r, int c) {
	if(n == 0)
		return 0;
	
	int half = 1 << (n-1); // 2^(n-1) 
	if(r<half && c<half) // 1 사분면  
		return Z(n-1, r, c);
		
	if(r<half && c>=half) // 2 사분면  
		return half*half + Z(n-1, r, c-half);
		
	if(r>=half && c<half) // 3 사분면  
		return 2*half*half + Z(n-1, r-half, c); 
		
	if(r>=half && c>=half) // 4 사분면  
		return 3*half*half + Z(n-1, r-half, c-half); 
}

int main(){
	ios::sync_with_stdio(0);
	cin.tie(0);
	
	int N, r, c;	
	cin>>N>>r>>c;
	
	cout<<Z(N, r, c); 
	return 0;
}
