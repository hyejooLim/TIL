# k-겹 교차검증
from sklearn import datasets
from sklearn import svm
from sklearn.model_selection import cross_val_score

digit = datasets.load_digits()
s = svm.SVC(gamma=0.001)
accuracies = cross_val_score(s, digit.data, digit.target, cv=5) # 5-겹 교차검증 

print(accuracies)
print("평균(정확률)=%0.3f, 표준편차=%0.3f" %(accuracies.mean() * 100, accuracies.std()))