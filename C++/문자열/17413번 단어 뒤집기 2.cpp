#include <iostream>
#include <cstring>
#include <stack>
#include <queue>

using namespace std;

int main() {
  ios_base::sync_with_stdio(0);
  cin.tie(0);

  string s;
  getline(cin, s);
  
  string result; // 결과 문자열
  stack<char> st; // 태그 밖의 단어 순서를 거꾸로 출력
  queue<char> q; // 태그 안의 단어 순서를 그대로 출력
  bool tag = false; // 태그 안팎 여부 검사

  for (int i=0; i<s.length(); i++) {
    if (s[i] == '<') { // 열린 태그이면 
      q.push('<');
      tag = true;
      while (!st.empty()) {
        result += st.top(); // 스택에 있는 모든 문자 더해줌
        st.pop();
      }
    } else if (s[i] == '>') { // 닫힌 태그이면
        tag = false;
        while (!q.empty()) {
          result += q.front(); // 큐에 있는 모든 문자 더해줌
          q.pop();
        }
        result += '>';
    } else if (s[i] == ' ') {
        if (tag) { // 태그 안의 공백이면
          while (!q.empty()) {
            result += q.front(); // 큐에 있는 모든 문자 더해줌
            q.pop();
          }
          result += " ";
        } else { // 태그 밖의 공백이면
          while (!st.empty()) {
            result += st.top(); // 스택에 있는 모든 문자 더해줌
            st.pop();
          }
          result += " ";
        }
    } else { 
      if (tag) { // 태그 안의 문자이면
        q.push(s[i]); // 큐에 삽입
      } else { // 태그 밖의 문자이면
        st.push(s[i]); // 스택에 삽입
      }
    }
  }
  // 스택에 남아있는 문자 출력
  while (!st.empty()) {
    result += st.top();
    st.pop();
  }
  
  cout<<result;
  return 0;
}