// Q1 make a string out of an array 
const fruits = ['apple', 'banana', 'orange'];
console.log(fruits.toString());

const result = fruits.join('^'); // seperator
console.log(result);

// Q2 make an array out of a string
// string -> array 변환 
const fruits2 = '🍉, 🍋, 🥝, 🍇';
const words = fruits2.split(',', 2); // seperator, limit
console.log(words); // ["🍉", "🍋"]

// Q3 make this array look like this: [5, 4, 3, 2, 1]
const array = [1, 2, 3, 4, 5];
console.log(array.reverse()); // 배열 자체를 변환 

// Q4 make new array without the first two elements
const array2 = [1, 2, 3, 4, 5];
console.log(array2.slice(2, 5));
console.log(array2); // 배열 자체 변환 x 

class Student {
    constructor(name, age, enrolled, score) {
        this.name = name;
        this.age = age;
        this.enrolled = enrolled;
        this.score = score;
    }
}

const student = [
    new Student('A', 29, true, 45),
    new Student('B', 28, false, 80),
    new Student('C', 30, true, 90),
    new Student('D', 40, false, 66),
    new Student('E', 18, true, 88)
];

// Q5 find a student with the score 90 
// 처음으로 true가 나오면 해당 요소를 리턴하고 종료 
{
    const result = student.find(student => student.score === 90);
    console.log(result);
}

// Q6 make an array of enrolled students
// 해당 조건을 만족하는 배열 반환 
{
    const result = student.filter(student => student.enrolled);
    console.log(result);
}

// Q7 make an array containing only the student's scores
// 배열의 모든 요소 각각에 주어진 함수를 적용한 배열 반환 
{
    const result = student.map(student => student.score);
    console.log(result);
}

// Q8 check if there is a student with the score lower than 50
{
    const result = student.some(student => student.score < 50);
    console.log(result);
}

// Q9 compute student's average score
// 배열을 돌면서 누적값을 구할 경우 사용 
{
    const result = student.reduce((prev, curr) => prev + curr.score, 0);
    console.log(result / student.length);
}

// Q10 make a string containing all the scores
{
    const result = student.map(student => student.score).join(', ');
    console.log(result);
}

// do Q10 sorted in ascending order
{
    const result = student.map(student => student.score).sort((a, b) => a - b).join(', ');
    console.log(result); 
}