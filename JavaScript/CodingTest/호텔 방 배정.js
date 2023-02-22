/**
 *
 * @param {*} k 전체 방 개수
 * @param {*} room_number 고객들이 원하는 방 번호가 순서대로 들어있는 배열
 * @returns 각 고객에게 배정되는 방 번호를 순서대로 담은 배열
 */

function solution(k, room_number) {
  var answer = [];
  const map = new Map();

  room_number.map((room) => {
    let assignedRoom = room;
    const tempArr = [];

    while (map.has(assignedRoom)) {
      const nextRoom = map.get(assignedRoom);
      tempArr.push(assignedRoom);
      assignedRoom = nextRoom;
    }

    tempArr.map((key) => map.set(key, assignedRoom + 1));
    map.set(assignedRoom, assignedRoom + 1);

    answer.push(assignedRoom);
  });

  return answer;
}
