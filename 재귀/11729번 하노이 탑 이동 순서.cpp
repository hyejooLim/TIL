#include <iostream>
#include <vector>

using namespace std;

int N; //쌓인 원판의 개수 
vector<pair<int, int>> v;

void move(int num, int from, int to){
	
	v.push_back({from, to});
}

//원판의 개수, 시작점, 도착점, 경유점   
void hanoi(int num, int from, int to, int via){
	if(num == 1){ //원판의 개수가 1개이면  
		move(1, from, to);
		return;
	}
	
	//모든 원판을 from -> to로 옮기기 위해서는   
	//크게 세 단계로 나눌 수 있음 	
	hanoi(num-1, from, via, to);
	move(num, from, to);
	hanoi(num-1, via, to, from);
}

int main(){
	
	ios::sync_with_stdio(0);
	cin.tie(0);
	
	cin>>N;
	    
	hanoi(N, 1, 3, 2);    
	
	cout<<v.size()<<"\n"; //최소 이동 횟수  
	for(int i=0; i<v.size(); i++){
		cout<<v[i].first<<" "<<v[i].second<<"\n";
	}
	
	return 0;
}
