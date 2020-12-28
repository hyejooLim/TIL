#include <iostream>
#include <vector>
#include <cstring>

#define MAX 501
#define INF 987654321

using namespace std;

int N, M, W; //지점의 수, 도로의 수, 웜홀의 수  
int dist[MAX];
string result; 
typedef pair<pair<int, int>, int> ins;
vector<ins> v;

void bellman(){
	dist[1] = 0; //시작정점 
	
	for(int i=1; i<=N-1; i++){
		for(int j=0; j<v.size(); j++){
			int from = v[j].first.first;
			int to = v[j].first.second;
			int cost = v[j].second;
			
			if(dist[from] + cost < dist[to])   
				dist[to] = dist[from] + cost; //최단경로 갱신
		}
	}
	
	for(int i=0; i<v.size(); i++){
		int from = v[i].first.first;
		int to = v[i].first.second;
		int cost = v[i].second;
			
		if(dist[from] + cost < dist[to]){ //음의 사이클 여부 확인  
			result = "YES";
			return;
		}
	}
	result = "NO";
}

int main(){
	ios::sync_with_stdio(0);
	cin.tie(0);
	cout.tie(0);
	
	int TC;
	cin>>TC;
	
	for(int i=0; i<TC; i++){
		cin>>N>>M>>W;
		
		v.clear(); //새로운 테스트 케이스를 위해 
		 
		for(int j=0; j<M; j++){ //도로의 정보  
			int S, E, T;
			cin>>S>>E>>T;
			v.push_back({{S, E}, T});
			v.push_back({{E, S}, T});
		}
		
		for(int k=0; k<W; k++){ //웜홀의 정보  
			int S, E, T;
			cin>>S>>E>>T;
			v.push_back({{S, E}, -T});
		}
		
		memset(dist, INF, sizeof(dist)); //모든 노드 무한대로 초기화  
		bellman(); 
		cout<<result<<"\n";
	}
	
	return 0;
}

