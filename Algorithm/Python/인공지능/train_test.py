# 필기 숫자 인식 
from sklearn import datasets
from sklearn import svm
from sklearn.model_selection import train_test_split # 훈련 테스트 집합
import numpy as np

digit = datasets.load_digits()
x_train, x_test, y_train, y_test = train_test_split(digit.data, digit.target, train_size=0.6)
                                                    
# svm의 분류 모델 SVC를 학습
s = svm.SVC(gamma=0.001)
s.fit(x_train, y_train)

result = s.predict(x_test)

# 혼동행렬 구하기
conf = np.zeros((10, 10))
for i in range(len(result)):
  conf[result[i]][y_test[i]] += 1
print(conf)

# 정확률 측정
no_correct = 0
for i in range(10):
  no_correct += conf[i][i]

accuracy = no_correct / len(result)
print("정확률은 ", accuracy*100, "%")