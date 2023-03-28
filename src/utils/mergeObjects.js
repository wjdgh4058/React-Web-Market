export function mergeObjects(arr1, arr2) {
  const map = new Map();
  for (let obj of [...arr1, ...arr2]) {
    if (map.has(obj.name)) {
      const prevObj = map.get(obj.name);
      if (prevObj.count < obj.count) {
        map.set(obj.name, obj);
      }
    } else {
      map.set(obj.name, obj);
    }
  }
  return Array.from(map.values());
}
