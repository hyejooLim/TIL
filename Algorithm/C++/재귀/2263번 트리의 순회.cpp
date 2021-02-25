#include <bits/stdc++.h>
#define MAX 100001

using namespace std;

int n;
int inOrder[MAX], postOrder[MAX];
int idx[MAX]; 

void preOrder(int inBegin, int inEnd, int postBegin, int postEnd) {
	// Prevent infinite output
	if (inEnd < inBegin || postEnd < postBegin)
		return;
	
	// End of the post order is root node 
	int root = postOrder[postEnd];
	cout<<root<<" ";
	
	// left 
	preOrder(inBegin, idx[root] -1, postBegin, postBegin + (idx[root] - inBegin) - 1);
	// right
	preOrder(idx[root] + 1, inEnd, postBegin + (idx[root] - inBegin), postEnd - 1);
	
}

int main(){
	ios::sync_with_stdio(0);
	cin.tie(0);
	
	cin>>n;
	
	for(int i=0; i<n; i++) 
		cin>>inOrder[i];
	
	for(int i=0; i<n; i++) 
		cin>>postOrder[i];
	
	// store the index of inOrder array 
	for(int i=0; i<n; i++)
		idx[inOrder[i]] = i;
		
	preOrder(0, n-1, 0, n-1);
	return 0;
}
