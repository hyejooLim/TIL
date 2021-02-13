const target = document.querySelector('.target');
const horizontal = document.querySelector('.horizontal');
const vertical = document.querySelector('.vertical');
const coordinate = document.querySelector('.coordinate');

document.addEventListener('mousemove', (e) => {
  const targetX = e.clientX + 'px';
  const targetY = e.clientY + 'px';

  target.style.left = targetX;
  target.style.top = targetY;
  vertical.style.left = targetX;
  horizontal.style.top = targetY;
  coordinate.style.left = targetX;
  coordinate.style.top = targetY;
  coordinate.innerHTML = `${targetX}, ${targetY}`;
});
