#include <iostream>

using namespace std;

int prefix[1025][1025];

int main(){
	ios::sync_with_stdio(0);
	cin.tie(0);
	
	int N, M;
	cin>>N>>M;
	
	for(int i=0; i<N; i++){
		for(int j=0; j<N; j++){
			int num;
			cin>>num;
			
			//교집합을 빼줘야 함   
			prefix[i+1][j+1] = prefix[i+1][j] + prefix[i][j+1] - prefix[i][j] + num;
		}
	}
	
	for(int i=0; i<M; i++){
		int x1, y1, x2, y2;
		cin>>x1>>y1>>x2>>y2;
		
		//교집합을 더해줘야 함  
		cout<<prefix[x2][y2] - prefix[x2][y1-1] - prefix[x1-1][y2] + prefix[x1-1][y1-1]<<"\n";
	}
	
	return 0;
}
