{
  // Pick Type
  // 기존의 타입에서 원하는 타입만 뽑아서 사용 가능

  type Video = {
    id: string;
    title: string;
    url: string;
    data: string;
  };

  type VideoMetaData = Pick<Video, 'id' | 'title'>;
  function getVideo(id: string): Video {
    return {
      id,
      title: 'video',
      url: 'http://...',
      data: 'byte-data...',
    };
  }

  function getVideoMetaData(id: string): VideoMetaData {
    return {
      id,
      title: 'video',
    };
  }
}
