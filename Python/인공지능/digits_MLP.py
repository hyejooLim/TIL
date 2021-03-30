# 필기 숫자 데이터에 다층 퍼셉트론 적용

from sklearn import datasets
from sklearn.model_selection import train_test_split
from sklearn.neural_network import MLPClassifier
import numpy as np

digit = datasets.load_digits();
x_train,x_test,y_train,y_test = train_test_split(digit.data, digit.target, train_size=0.6)

# MLP 분류기 모델을 학습
mlp = MLPClassifier(hidden_layer_sizes=(100), learning_rate_init=0.001, batch_size=32, max_iter=300, solver="sgd", verbose=True)
mlp.fit(x_train, y_train)

res = mlp.predict(x_test)

# 혼동 행렬 
conf = np.zeros((10, 10))
for i in range(len(res)):
    conf[res[i]][y_test[i]] += 1

print(conf)

# 정확률 계산
correct = 0
for i in range(10):
    correct += conf[i][i]

accuracy = correct / len(res)
print("정확률은 ", accuracy * 100, "% 입니다.")
 