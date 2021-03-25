from sklearn import datasets
from sklearn import svm

d = datasets.load_iris() # iris data 읽기

s = svm.SVC(gamma=0.1, C=10) # 모델 생성
s.fit(d.data, d.target) # iris 데이터로 학습
new_d = [[5.2, 3.4, 1.3, 0.1], [7.1, 3.2, 4.6, 1.5]] # 0번 뷰류 샘플과 1번 부류 샘플을 변형하여 새로운 데이터 생성

result = s.predict(new_d) # 부류 예측하기
print("새로운 2개 샘플의 부류는 ", result)