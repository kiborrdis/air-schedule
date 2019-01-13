export default function objectToString(obj) {
  if (!(obj instanceof Object)) {
    return obj;
  } if (obj instanceof Function) {
    return 'f';
  }

  const keys = Object.keys(obj).sort();

  return keys.reduce((memo, key) => `${memo}/${key}|${objectToString(obj[key], key)}`, '');
}
