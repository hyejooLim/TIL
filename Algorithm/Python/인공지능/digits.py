from sklearn import datasets
from sklearn import svm

digit = datasets.load_digits() # digits data 읽기

s = svm.SVC(gamma=0.1, C=10) # 모델 객체 생성
s.fit(digit.data, digit.target) # 모델 학습 

new_d = [digit.data[0], digit.data[1], digit.data[2]] # 훈련 집합의 샘플로 새로운 데이터 생성
result = s.predict(new_d) # 샘플로 부류 예측
print("예측값은 ", result)
print("정답은 ", digit.target[0], digit.target[1], digit.target[2])

# 훈련 집합을 테스트 집합으로 간주했을 경우 정확률 측정
result = s.predict(digit.data)
correct = [i for i in range(len(result)) if result[i] == digit.target[i]]
accuracy = len(correct) / len(result)
print("정확률은 ", accuracy * 100, "%")