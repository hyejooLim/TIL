def sum_num(n): 
	s = 0  
	for i in range(1, n + 1):  
		s = s + i 
	return s 

print(sum_num(10)) # 1부터 10까지 합
print(sum_num(100)) # 1부터 100까지 합
