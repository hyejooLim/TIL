#include <iostream>
#include <vector>
#include <cstring>

#define MAX 501
#define INF 987654321

using namespace std;

int N, M, W; //������ ��, ������ ��, ��Ȧ�� ��  
int dist[MAX];
string result; 
typedef pair<pair<int, int>, int> ins;
vector<ins> v;

void bellman(){
	dist[1] = 0; //�������� 
	
	for(int i=1; i<=N-1; i++){
		for(int j=0; j<v.size(); j++){
			int from = v[j].first.first;
			int to = v[j].first.second;
			int cost = v[j].second;
			
			if(dist[from] + cost < dist[to])   
				dist[to] = dist[from] + cost; //�ִܰ�� ����
		}
	}
	
	for(int i=0; i<v.size(); i++){
		int from = v[i].first.first;
		int to = v[i].first.second;
		int cost = v[i].second;
			
		if(dist[from] + cost < dist[to]){ //���� ����Ŭ ���� Ȯ��  
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
		
		v.clear(); //���ο� �׽�Ʈ ���̽��� ���� 
		 
		for(int j=0; j<M; j++){ //������ ����  
			int S, E, T;
			cin>>S>>E>>T;
			v.push_back({{S, E}, T});
			v.push_back({{E, S}, T});
		}
		
		for(int k=0; k<W; k++){ //��Ȧ�� ����  
			int S, E, T;
			cin>>S>>E>>T;
			v.push_back({{S, E}, -T});
		}
		
		memset(dist, INF, sizeof(dist)); //��� ��� ���Ѵ�� �ʱ�ȭ  
		bellman(); 
		cout<<result<<"\n";
	}
	
	return 0;
}

