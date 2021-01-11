#include <iostream>
#include <algorithm>
#define MAX 8

using namespace std;

int N, M;
int arr[MAX];
int result[MAX];

void NandM(int idx, int start){
	if(idx == M){
		for(int i=0; i<M; i++){
			cout<<arr[result[i]]<<" ";
		}
		cout<<"\n";
		return;
	}
	
	for(int i=start; i<N; i++){
		result[idx] = i;
		NandM(idx+1, i);
	}
}

int main(){
	ios::sync_with_stdio(0);
	cin.tie(0);

	cin>>N>>M;
	for(int i=0; i<N; i++)
		cin>>arr[i];
		
	sort(arr, arr+N);
	NandM(0, 0);
	
	return 0;
}
