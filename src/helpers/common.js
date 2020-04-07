export const phoneMask = val => {
  let arr = String(val).trim().split('');
  const num = Number(arr[arr.length - 1]);
  if (!Number.isInteger(+num)) {
    arr.pop();
  }
  arr = arr.filter(item => Number.isInteger(+item) && item !== ' ');
  arr.length && arr.splice(0, 0, '(');
  arr.length > 4 && arr.splice(4, 0, ') ');
  arr.length > 8 && arr.splice(8, 0, '-');
  return arr.join('').slice(0, 14);
};

export const getAllNum = string => {
  if (!string) return '';
  return string.replace(/\D+/g, "");
};
