s = input()

rotate_s = []
cnt = 0

for i in range(len(s)):
    slice_s = s[i+1:] + s[:i+1]
    rotate_s.append(slice_s)

for i in range(len(rotate_s)):
    stack = []
    for j in range(len(rotate_s[i])):
        stack.append(rotate_s[i][j])
        
        if len(stack) <= 1:
            continue
        if ((stack[-2] == '[' and stack[-1] == ']') or (stack[-2] == '(' and stack[-1] == ')') or (stack[-2] == '{' and stack[-1] == '}')):
            stack.pop()
            stack.pop()
    if len(stack) == 0:
        cnt += 1
   
print(cnt)