export function addOffset(map) {
  const offsetY = map.getSize().y * 0.25;
  map.panBy([0, -offsetY], { animate: false });
}