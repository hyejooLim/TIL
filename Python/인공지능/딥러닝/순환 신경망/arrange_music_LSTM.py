import music21
import numpy as np
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, LSTM

# "작은 별" 악보를 ABC 표기법으로 표현
little_star = "tinynotation: 4/4 c4 c4 g4 g4 a4 a4 g2 f4 f4 e4 e4 d4 d4 c2 g4 g4 f4 f4 e4 e4 d2 g4 g4 f4 f4 e4 e4 d2 c4 c4 g4 g4 a4 a4 g2 f4 f4 e4 e4 d4 d4 c2"

music21.converter.parse(little_star).show('mid') # 스피커로 연주를 들려줌

# 계이름과 숫자를 상호 변환하는 표
note2num = { 'c':1, 'd':2, 'e':3, 'f':4, 'g':5, 'a':6, 'b':7 }
num2note = { 1:'c', 2:'d', 3:'e', 4:'f', 5:'g', 6:'a', 7:'b' }

# ABC 표기를 시계열 데이터로 변환
def abc2timeseries(s):
  notes = s.split(' ')[2:]
  seq = []
  for i in notes:
    seq.apeend([note2num[i[0]], int(i[1])])
  return seq

# 시계열 데이터를 ABC 표기로 변환
def timeseries2abc(t):
  s = 'tinynotation: 4/4'
  for i in t:
    s = s + num2note[i[0]] + str(i[1])
  return s

# 원핫 코드로 변환하는 표
onehot = [[1, 2], [2, 2], [3, 2], [4, 2], [5, 2], [6, 2], [7, 2], [1, 4], [2, 4], [3, 4], [4, 4], [5, 4], [6, 4], [7, 4], [1, 8], [2, 8], [3, 8], [4, 8], [5, 8], [6, 8], [7, 8]]

# 레이블을 원핫 코드로 변환
def to_onehot(l):
  t = []
  for i in range(len(l)):
    a = np.zeros(len(onehot))
    a[onehot.index(list(l[i]))] = 1.0
    t.append(a)
  return np.array(t)

# 시계열 데이터를 훈련 집합으로 자름
def seq2dataset(seq, window, horizon):
  X = []; Y = []
  for i in range(len(seq)-(window+horizon)+1):
    x = seq[i:(i + window)]
    y = (seq[i+window+horizon-1])
    X.append(x); Y.append(y)
  return np.array(X), np.array(Y)

w = 8 # 윈도우 크기
h = 1 # 수평선 계수

seq = abc2timeseries(little_star)
X, Y = seq2dataset(seq, w, h)
print(X.shape, Y.shape)
print(X[0], Y[0])

# 훈련 집합 구축
split = int(len(X)*1.0)
x_train = X[0:split]
y_train = Y[0:split]
y_train = to_onehot(y_train)

# LSTM 모델 설계와 학습
model = Sequential()
model.add(LSTM(units=128, activation='relu', input_shape=x_train[0].shape))
model.add(Dense(y_train.shape[1], activation='softmax'))
model.complie(loss='categorical_crossentropy', optimizer='Adam', metrics=['accuracy'])
model.fit(x_train, y_train, epochs=200, batch_size=1, verbose=2)

# 학습된 모델로 편곡을 하는 함수
def arranging_music(model, first_measure, duration):
  music = first_measure
  for i in range(duration):
    p = model.predict(np.float32(np.expand_dims(music[-w:], axis=0)))
    music = np.append(music, [onehot[np.argmax(p)]], axis=0)
  return timeseries2abc(music)

new_song = arranging_music(model, x_train[0], 50)

print(new_song)
music21.converter.parse(new_song).show('mid')