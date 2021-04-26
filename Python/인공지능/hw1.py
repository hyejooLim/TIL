import numpy as np
import tensorflow as tf
import matplotlib.pyplot as plt
from tensorflow.keras.datasets import fashion_mnist
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense
from tensorflow.keras.optimizers import Adam, SGD

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
batch_s = 128
epoch = 30

# 모델 설계 함수
def build_model():
    model = Sequential()
    model.add(Dense(units=n_hidden1, activation='tanh', input_shape=(n_input,)))
    model.add(Dense(units=n_hidden2, activation='tanh'))
    model.add(Dense(units=n_hidden3, activation='tanh'))
    model.add(Dense(units=n_hidden4, activation='tanh'))
    model.add(Dense(units=n_output, activation='softmax'))
    return model

# adam 옵티마이저와 손실함수로 평균제곱오차를 사용한 모델
dmlp_adam_mse = build_model()
dmlp_adam_mse.compile(loss='mean_squared_error', optimizer=Adam(learning_rate=0.0001), metrics=['accuracy'])
hist_adam_mse = dmlp_adam_mse.fit(x_train, y_train, batch_size=batch_s, epochs=epoch, validation_data=(x_test, y_test), verbose=2)

# adam 옵티마이저와 손실함수로 교차 엔트로피를 사용한 모델
dmlp_adam_ce = build_model()
dmlp_adam_ce.compile(loss='categorical_crossentropy', optimizer=Adam(learning_rate=0.0001), metrics=['accuracy'])
hist_adam_ce = dmlp_adam_ce.fit(x_train, y_train, batch_size=batch_s, epochs=epoch, validation_data=(x_test, y_test), verbose=2)

# sgd 옵티마이저와 손실함수로 평균제곱오차를 사용한 모델
dmlp_sgd_mse = build_model()
dmlp_sgd_mse.compile(loss='mean_squared_error', optimizer=SGD(learning_rate=0.0001), metrics=['accuracy'])
hist_sgd_mse = dmlp_sgd_mse.fit(x_train, y_train, batch_size=batch_s, epochs=epoch, validation_data=(x_test, y_test), verbose=2)

# sgd 옵티마이저와 손실함수로 교차 엔트로피를 사용한 모델
dmlp_sgd_ce = build_model()
dmlp_sgd_ce.compile(loss='categorical_crossentropy', optimizer=SGD(learning_rate=0.0001), metrics=['accuracy'])
hist_sgd_ce = dmlp_sgd_ce.fit(x_train, y_train, batch_size=batch_s, epochs=epoch, validation_data=(x_test, y_test), verbose=2)

# 네 모델의 정확률 비교
print('adam 옵티마이저와 평균제곱오차의 정확률은 ', dmlp_adam_mse.evaluate(x_test, y_test, verbose=0)[1]*100, '% 입니다.')
print('adam 옵티마이저와 교차 엔트로피의 정확률은 ', dmlp_adam_ce.evaluate(x_test, y_test, verbose=0)[1]*100, '% 입니다.')
print('sgd 옵티마이저와 평균제곱오차의 정확률은 ', dmlp_sgd_mse.evaluate(x_test, y_test, verbose=0)[1]*100, '% 입니다.')
print('sgd 옵티마이저와 교차 엔트로피의 정확률은 ', dmlp_sgd_ce.evaluate(x_test, y_test, verbose=0)[1]*100, '% 입니다.')

# 하나의 그래프에서 네 모델을 비교
plt.plot(hist_adam_mse.history['accuracy'])
plt.plot(hist_adam_mse.history['val_accuracy'])
plt.plot(hist_adam_ce.history['accuracy'])
plt.plot(hist_adam_ce.history['val_accuracy'])
plt.plot(hist_sgd_mse.history['accuracy'])
plt.plot(hist_sgd_mse.history['val_accuracy'])
plt.plot(hist_sgd_ce.history['accuracy'])
plt.plot(hist_sgd_ce.history['val_accuracy'])
plt.title('Model accuracy comparsion among four models')
plt.xlabel('Epoch')
plt.ylabel('Accuracy')
plt.legend(['Train_adam_mse', 'val_adam_mse', 'Train_adam_ce', 'val_adam_ce', 'Train_sgd_mse', 'val_sgd_mse', 
            'Train_sgd_ce', 'val_sgd_ce'], loc='best')
plt.grid()
plt.show()