window.addEventListener('load', () => {
  const path = document.querySelector('path');

  window.requestAnimationFrame(function loop(timestamp) {
    const thickness = 2.5;
    const size = 64;
    const range = 280; // deg
    const completness = Math.sin((timestamp / 1000) % Math.PI); // %

    const angle = range * (completness - .5);
    const startX = thickness + size + (size * Math.cos((angle - 90) * Math.PI / 180.0));
    const startY = thickness + size + (size * Math.sin((angle - 90) * Math.PI / 180.0));
    const endX = thickness + size + (size * Math.cos((-range / 2 - 90) * Math.PI / 180.0));
    const endY = thickness + size + (size * Math.sin((-range / 2 - 90) * Math.PI / 180.0));
    const largeArcFlag = angle + range / 2 <= 180 ? "0" : "1";
    path.setAttribute("d", `M ${startX} ${startY} A ${size} ${size} 0 ${largeArcFlag} 0 ${endX} ${endY}`);
    path.setAttribute("stroke-width", thickness);
    window.requestAnimationFrame(loop);
  });
});
