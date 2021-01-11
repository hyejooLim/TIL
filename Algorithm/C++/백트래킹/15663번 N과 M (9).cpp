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
		if(cnt[v[i]]){ //0�� �ƴ϶��  
			result[idx] = i;
			cnt[v[i]]--;
			NandM(idx+1);
			cnt[v[i]]++; //���ȣ�� �� �ٽ� ����  
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
		
		if(cnt[num] == 0){ //0�̶��  
			cnt[num] = 1;
			v.push_back(num);
		}
		else{ //0�� �ƴ϶�� ���Ϳ� �������� ����  
			cnt[num]++;
		}
	}
	
	sort(v.begin(), v.end());
	NandM(0);
		
	return 0;
}
