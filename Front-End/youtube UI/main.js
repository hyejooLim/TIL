const moreBtn = document.querySelector('.info .metadata .moreBtn');
const title = document.querySelector('.info .metadata .title');
const result = document.getElementById('result');

moreBtn.addEventListener('click', () => {
    moreBtn.classList.toggle('clicked');

    /* title class에 'clamp'가 들어가 있어야함 */
    /* 사용자가 버튼을 클릭할 때마다 clamp를 빼고 더해줌 */ 
    title.classList.toggle('clamp');
});

let num = result.innerText;
function count(button) {
    if(button === 'plus')
        num = parseInt(num) + 1;

    result.innerText = num; 
}