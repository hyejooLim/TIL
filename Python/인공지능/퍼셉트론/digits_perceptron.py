# 필기 숫자 데이터에 퍼셉트론 적용

from sklearn import datasets
from sklearn.linear_model import Perceptron
from sklearn.model_selection import train_test_split
import numpy as np

# 데이터 읽기
digit = datasets.load_digits()
x_train, x_test, y_train, y_test = train_test_split(digit.data, digit.target, train_size=0.6)

p = Perceptron(max_iter=100, eta0=0.001, verbose=0)
p.fit(x_train, y_train)

result = p.predict(x_test)

# 혼동행렬 구하기
conf = np.zeros((10, 10))
for i in range(len(result)):
  conf[result[i]][y_test[i]] += 1
print(conf)

# 정확률 계산
no_correct = 0
for i in range(10):
  no_correct += conf[i][i]

accuracy = no_correct / len(result)
print("정확률은 ", accuracy*100, "% 입니다.")