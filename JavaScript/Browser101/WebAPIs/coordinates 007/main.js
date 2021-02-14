const target = document.querySelector('.target');
const horizontal = document.querySelector('.horizontal');
const vertical = document.querySelector('.vertical');
const coordinate = document.querySelector('.coordinate');

addEventListener('load', () => {
  const targetRect = target.getBoundingClientRect();
  const targetHalfWidth = targetRect.width / 2;
  const targetHalfHeight = targetRect.height / 2;

  document.addEventListener('mousemove', (e) => {
    const targetX = e.clientX;
    const targetY = e.clientY;

    target.style.transform = `translate(${targetX - targetHalfWidth}px, ${targetY - targetHalfHeight}px)`;
    vertical.style.transform = `translateX(${targetX}px)`;
    horizontal.style.transform = `translateY(${targetY}px)`;
    coordinate.style.transform = `translate(${targetX}px, ${targetY}px)`;
    coordinate.innerHTML = `${targetX}px, ${targetY}px`;
  });
});
