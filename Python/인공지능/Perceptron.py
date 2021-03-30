# 퍼셉트론: 이진분류기 (+1 || -1)

# 퍼셉트론의 구조
# 입력층 d+1개의 노드(첫번째 노드는 1), 출력층 1개의 노드
# x = (x_1, x_2,..., x_d)

from sklearn.linear_model import Perceptron

# 훈련 집합 구축
X = [[0, 0], [0, 1], [1, 0], [1, 1]]
y = [-1, 1, 1, 1]

# fit 함수로 Perceptron 학습
p = Perceptron()
p.fit(X, y)

print("학습된 퍼셉트론의 매개변수: ", p.coef_, p.intercept_)
print("훈련집합에 대한 예측: ", p.predict(X))
print("정확률 측정: ", p.score(X, y) * 100, "%")