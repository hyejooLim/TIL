#include <iostream>
#include <algorithm>
#define MAX 1000

using namespace std;

int weight[MAX];

int main(){
	ios::sync_with_stdio(0);
	cin.tie(0);
	
	int N;
	cin>>N;
	
	for(int i=0; i<N; i++)
		cin>>weight[i];
		
	sort(weight, weight+N); //오름차순 정렬  
	
	//1이 없다면  
	if(weight[0] != 1)
		cout<<1;
	else{
		int sum = 1; //현재까지의 합 
		
		for(int i=1; i<N; i++){ 
			//현재 인덱스에 저장된 값이 누적합+1 보다 크다면  
			//이전의 추들로 무게를 측정할 수 없음  
			if(sum+1 < weight[i])
				break;
			sum += weight[i]; 
		}
		cout<<sum+1; 
	}

	return 0;
}
