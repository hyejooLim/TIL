{
  // Omit Type
  // 기존의 타입에서 원하는 타입만 빼서 사용 가능 (선택하고자 하는 타입이 많을 경우 Pick 대신 사용)

  type Video = {
    id: string;
    title: string;
    url: string;
    data: string;
  };

  type VideoMetaData = Omit<Video, 'url' | 'data'>;
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
