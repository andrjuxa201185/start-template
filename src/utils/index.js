export const trimField = field => typeof(field) === 'string' ? field.trim() : field;

export const trimFieldsData = data => {
  const newData = {};
  for (let field in data) {
    if (typeof data[field] === 'string') {
      newData[field] = data[field].trim();
    } else {
      newData[field] = data[field];
    }
  }
  return newData;
};

export const splitStringMainLetter = (str, separator = '_') => {
  const arr = str.split(separator);
  arr.forEach((word, index) => {
    arr[index] = word[0].toUpperCase() + word.slice(1);
  });
  return arr.join(' ');
};

