window.addEventListener('load', () => {
  const svg = document.querySelector('svg');
  const path = document.querySelector('path');
  const text = document.querySelector('text');
  const percentText = document.querySelector('#percentText');

  // Calculate the width based on the viewport size (take body margin into an account)
  const length = document.body.clientWidth / 2;

  const thickness = Math.max(length / 50, 1);
  const size = (length - thickness * 2) / 2;
  const range = 280; // deg

  svg.setAttribute('width', thickness + size * 2 + thickness);
  svg.setAttribute('height', thickness + size * 2 + thickness);
  path.setAttribute("stroke-width", thickness);
  text.setAttribute('x', size);
  text.setAttribute('y', size * 1.15);
  text.setAttribute('font-size', size);
  percentText.setAttribute('x', size);
  percentText.setAttribute('y', size * 1.75);
  percentText.setAttribute('font-size', size * .5);

  window.requestAnimationFrame(function loop(timestamp) {
    const completeness = Math.sin((timestamp / 5000) % Math.PI);
    text.textContent = Math.round(completeness * 100);

    const angle = range * (completeness - .5);
    const startX = thickness + size + (size * Math.cos((angle - 90) * Math.PI / 180.0));
    const startY = thickness + size + (size * Math.sin((angle - 90) * Math.PI / 180.0));
    const endX = thickness + size + (size * Math.cos((-range / 2 - 90) * Math.PI / 180.0));
    const endY = thickness + size + (size * Math.sin((-range / 2 - 90) * Math.PI / 180.0));
    const largeArcFlag = angle + range / 2 <= 180 ? "0" : "1";
    path.setAttribute("d", `M ${startX} ${startY} A ${size} ${size} 0 ${largeArcFlag} 0 ${endX} ${endY}`);
    path.setAttribute("stroke", completeness < .45 ? 'maroon' : (completeness < .75 ? 'orange' : 'green'));
    window.requestAnimationFrame(loop);
  });
});
