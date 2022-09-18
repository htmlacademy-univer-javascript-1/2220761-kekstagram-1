const getRandomNumber = (start, end) => {

  if(end < start){
    throw new Error('Начало диапазона не может быть больше конца');
  }

  if(start === end){
    return start;
  }

  if(start < 0){
    throw new Error('Диапазон не может быть отрицательным');
  }

  return Math.floor(Math.random() * (end - start + 1)) + start; //формула с сайта https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
};

const getCommentLength = (newComment, maxLength) => newComment.length <= maxLength;

getRandomNumber(2, 7);
getCommentLength('Комментарий', 20);

