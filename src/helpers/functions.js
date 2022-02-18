export const debounced = (fn, delay) => {
  let timerId;
  return function (...args) {
    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(() => {
      fn(...args);
      timerId = null;
    }, delay);
  };
};

export const cutTime = (time) => time.slice(0, 5);

export const getSecond = (timer) => {
  return (
    Number(timer.substring(0, 2)) * 3600 +
    Number(timer.substring(3, 5)) * 60 +
    Number(timer.substring(6))
  );
};

export const selectPlace = (places, time) => {
  const reverse = places.slice().reverse();
  const place = reverse.find((p) => p.time_on <= time);
  return place;
};

const zeroPad = (num, places) => String(num).padStart(places, '0');

export const getHourFormat = (value) => {
  
  const hours = zeroPad(Math.floor(value / 3600), 2);
  value -= hours * 3600;
  const minutes = zeroPad(Math.floor(value / 60), 2);
  value -= minutes * 60;
  const seconds = zeroPad(value, 2);
  const result = `${hours}:${minutes}:${seconds}`;

  return result;
};