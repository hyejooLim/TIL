# CIFAR-10으로 학습한 컨볼루션 신경망의 커널 시각화

import numpy as np
import tensorflow as tf
import matplotlib.pyplot as plt
from tensorflow.keras.datasets import cifar10
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Conv2D, MaxPooling2D, Flatten, Dense, Dropout
from tensorflow.keras.optimizers import Adam

# MNIST 데이터셋을 읽고 신경망에 입력할 형태로 변환
(x_train, y_train), (x_test, y_test) = cifar10.load_data()
x_train = x_train.astype(np.float32)/255.0
x_test = x_test.astype(np.float32)/255.0
y_train = tf.keras.utils.to_categorical(y_train, 10)
y_test = tf.keras.utils.to_categorical(y_test, 10)

# LeNet-5 신경망 모델 설계
cnn = Sequential()
cnn.add(Conv2D(32, (3,3), activation='relu', input_shape=(32,32,3)))
cnn.add(Conv2D(32, (3,3), activation='relu'))
cnn.add(MaxPooling2D(pool_size=(2,2)))
cnn.add(Dropout(0.25))
cnn.add(Conv2D(64, (3,3), activation='relu'))
cnn.add(Conv2D(64, (3,3), activation='relu'))
cnn.add(MaxPooling2D(pool_size=(2,2)))
cnn.add(Dropout(0.25))
cnn.add(Flatten()) # Dense 층에 입력하기 위해 1차원 구조로 변환
cnn.add(Dense(512, activation='relu'))
cnn.add(Dropout(0.5))
cnn.add(Dense(10, activation='softmax'))

# 신경망 모델 학습
cnn.compile(loss='categorical_crossentropy', optimizer=Adam(), metrics=['accuracy'])
cnn.fit(x_train, y_train, batch_size=128, epochs=30, validation_data=(x_test, y_test), verbose=2)
cnn.summary() # cnn 모델의 정보 출력

# 컨볼루션층에 대해 커널의 텐서 모양 출력 
for layer in cnn.layers:
  if 'conv' in layer.name:
    kernel, biases = layer.get_weights()
    print(layer.name, kernel.shape)

# 0번째 컨볼루션층의 커널 정보 추출
kernel, biases = cnn.layers[0].get_weights()
minv, maxv = kernel.min(), kernel.max()
kernel = (kernel-minv)/(maxv-minv)
n_kernel = 32

plt.figure(figsize=(20,3))
plt.suptitle('Kernels of conv2d_4')
for i in range(n_kernel):
  f = kernel[:,:,:,i]
  for j in range(3):
    plt.subplot(3, n_kernel, j*n_kernel+i+1)
    plt.imshow(f[:,:,j], cmap='gray')
    plt.xticks([]); plt.yticks([])
    plt.title(str(i)+'_'+str(j))

plt.show()