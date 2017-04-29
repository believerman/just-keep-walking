function zeroFill(number, digits) {
  number = number.toString();
  digits -= number.length;
  while (digits > 0) {
    number = "0" + number;
    digits--;
  }
  return number;
}

function secondsToTime(secs) {
  secs = Math.round(secs);
  let minutes = zeroFill(Math.floor(secs / 60), 2),
      seconds = zeroFill(Math.ceil(secs % 60), 2);

  return `${minutes}:${seconds}`;
}

export default secondsToTime;
