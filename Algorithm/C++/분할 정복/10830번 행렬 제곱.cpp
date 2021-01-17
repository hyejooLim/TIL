#include <iostream>
#include <vector>

using namespace std;

int N;
typedef long long ll;
typedef vector<vector<int>> matrix;

matrix operator * (const matrix &a, const matrix &b) {
	matrix res(N, vector<int>(N));
	
	for(int i=0; i<N; i++) {
		for(int j=0; j<N; j++) {
			for(int k=0; k<N; k++) {
				res[i][j] += a[i][k] * b[k][j]; 
			}
			res[i][j] %= 1000;
		}
	}
	return res;
}

matrix calc(matrix a, ll exp) {
	matrix res(N, vector<int>(N));
	
	for(int i=0; i<N; i++)
		res[i][i] = 1; // 단위 행렬  
	
	if(exp == 0) 
		return res;
	 	
	if(exp % 2) // 지수가 홀수인 경우 
		res = res * a;
		
	return res * calc(a * a, exp / 2);
} 

int main(){
	ios::sync_with_stdio(0);
	cin.tie(0);

	ll B;
	cin>>N>>B;
	
	// N*N 크기의 2차원 벡터  
	matrix A(N, vector<int>(N));
	
	for(int i=0; i<N; i++)
		for(int j=0; j<N; j++)
			cin>>A[i][j];
	
	matrix res = calc(A, B); // 행렬 A의 B제곱   
	
	for(int i=0; i<N; i++) {
		for(int j=0; j<N; j++) {
			cout<<res[i][j]<<" ";
		}
		cout<<"\n";
	}
		
	return 0;
}
