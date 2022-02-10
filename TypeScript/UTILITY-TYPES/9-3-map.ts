// Map Type

type Optional<T> = {
  [P in keyof T]?: T[P];
};

type ReadOnly<T> = {
  readonly [P in keyof T]: T[P];
};

type Nullable<T> = {
  [P in keyof T]: T[P] | null;
};

type Video = {
  title: string;
  author: string;
};

// video 변수를 Optional 타입으로 설정했기 때문에 모든 속성들은 선택적으로 작성
const video: Optional<Video> = {
  title: 'king',
  author: 'rabbit',
};

const video2: ReadOnly<Video> = {
  title: 'king',
  author: 'rabbit',
};
// video.title = 'queen'; // 변경 불가

// Nullable type을 사용했으므로 null로 작성 가능
const video3: Nullable<Video> = {
  title: 'king',
  author: null,
};

