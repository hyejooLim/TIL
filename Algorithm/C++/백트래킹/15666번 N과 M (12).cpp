#include <iostream>
#include <vector>
#include <set>
#include <algorithm>

using namespace std;

int N, M;
int arr[8];
vector<int> v;
	
void NandM(int idx, int start) {
	if(idx == M) {
		for(int i=0; i<M; i++) {
			cout<<v[arr[i]]<<" ";
		}
		cout<<"\n";
		return;
	}

	for(int i=start; i<v.size(); i++) {
		arr[idx] = i;
		NandM(idx + 1, i);
	}
}

int main(){
	ios::sync_with_stdio(0);
	cin.tie(0);
	
	cin>>N>>M;
	set<int> s; // 중복 순열 방지  
	
	for(int i=0; i<N; i++) {
		int num;
		cin>>num;
		
		if(s.find(num) == s.end()) {
			s.insert(num);
			v.push_back(num);	
		}
	}
	
	// 비내림차순 위해 정렬  
	sort(v.begin(), v.end());
	NandM(0, 0);
	
	return 0;
}
