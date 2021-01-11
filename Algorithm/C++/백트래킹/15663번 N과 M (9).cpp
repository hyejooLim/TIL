#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

int N, M;
vector<int> v;
int result[8];
int cnt[10000];

void NandM(int idx){
	if(idx == M){
		for(int i=0; i<M; i++){
			cout<<v[result[i]]<<" ";
		}
		cout<<"\n";
		return;
	}
	
	for(int i=0; i<N; i++){
		if(cnt[v[i]]){ //0이 아니라면  
			result[idx] = i;
			cnt[v[i]]--;
			NandM(idx+1);
			cnt[v[i]]++; //재귀호출 후 다시 증가  
		}
	}
}

int main(){
	ios::sync_with_stdio(0);
	cin.tie(0);

	cin>>N>>M;
	
	for(int i=0; i<N; i++){
		int num;
		cin>>num;
		
		if(cnt[num] == 0){ //0이라면  
			cnt[num] = 1;
			v.push_back(num);
		}
		else{ //0이 아니라면 벡터에 저장하지 않음  
			cnt[num]++;
		}
	}
	
	sort(v.begin(), v.end());
	NandM(0);
		
	return 0;
}
