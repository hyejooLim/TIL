import numpy as np
import tensorflow as tf
import matplotlib.pyplot as plt
from tensorflow.keras.datasets import fashion_mnist
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense
from tensorflow.keras.optimizers import SGD, Adam, Adagrad, RMSprop
from sklearn.model_selection import KFold

# fashion MNIST 데이터셋 읽어와서 신경망에 입력할 형태로 변환
(x_train, y_train), (x_test, y_test) = fashion_mnist.load_data()
x_train = x_train.reshape(60000, 784)
x_test = x_test.reshape(10000, 784)
x_train = x_train.astype(np.float32) / 255.0
x_test = x_test.astype(np.float32) / 255.0
y_train = tf.keras.utils.to_categorical(y_train, 10)
y_test = tf.keras.utils.to_categorical(y_test, 10)

# 신경망 구조 설정
n_input = 784
n_hidden1 = 1024
n_hidden2 = 512
n_hidden3 = 512
n_hidden4 = 512
n_output = 10

# 하이퍼 매개변수 설정
batch_s = 256
epoch = 20
k = 5

# 모델을 설계하는 함수
def build_model():
    model = Sequential()
    model.add(Dense(units=n_hidden1, activation='relu', input_shape=(n_input,)))
    model.add(Dense(units=n_hidden2, activation='relu'))
    model.add(Dense(units=n_hidden3, activation='relu'))
    model.add(Dense(units=n_hidden4, activation='relu'))
    model.add(Dense(units=n_output, activation='softmax'))
    return model

# 교차 검증을 수행하는 함수
def cross_validation(opt):
    accuracy = []
    for train_idx, val_idx in KFold(k).split(x_train):
        xTrain, xVal = x_train[train_idx], x_train[val_idx]
        yTrain, yVal = y_train[train_idx], y_train[val_idx]
        model = build_model()
        model.compile(loss='categorical_crossentropy', optimizer=opt, metrics=['accuracy'])
        model.fit(xTrain, yTrain, batch_size=batch_s, epochs=epoch, verbose=0)
        accuracy.append(model.evaluate(xVal, yVal, verbose=0)[1])
        
    return accuracy

# 4개의 옵티마이저에 대해 교차 검증 실행
dmlp_sgd = cross_validation(SGD())
dmlp_adam = cross_validation(Adam())
dmlp_adagrad = cross_validation(Adagrad())
dmlp_rmsprop = cross_validation(RMSprop())

# 4개의 옵티마이저의 정확률 비교
print('SGD 옵티마이저의 정확률은 ', np.array(dmlp_sgd).mean())
print('Adam 옵티마이저의 정확률은 ', np.array(dmlp_adam).mean())
print('Adagrad 옵티마이저의 정확률은 ', np.array(dmlp_adagrad).mean())
print('RMSprop 옵티마이저의 정확률은 ', np.array(dmlp_rmsprop).mean())

# 4개의 옵티마이저의 정확률을 박스 플롯으로 비교
plt.boxplot([dmlp_sgd, dmlp_adam, dmlp_adagrad, dmlp_rmsprop], labels=['SGD', 'Adam', 'Adagrad', 'RMSprop'])
plt.grid()