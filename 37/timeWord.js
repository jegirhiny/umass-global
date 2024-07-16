function timeWord(time) {
  const [hours, minutes] = time.split(":").map(Number);

  const hourWords = [
    "twelve",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
    "ten",
    "eleven",
  ];

  const minuteWords = [
    "oh",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
    "ten",
    "eleven",
    "twelve",
    "thirteen",
    "fourteen",
    "fifteen",
    "sixteen",
    "seventeen",
    "eighteen",
    "nineteen",
  ];

  const tensWords = ["", "", "twenty", "thirty", "forty", "fifty"];

  if (time === "00:00") {
    return "midnight";
  }

  if (time === "12:00") {
    return "noon";
  }

  const period = hours < 12 ? "am" : "pm";
  const hour = hourWords[hours % 12];
  let minute;

  if (minutes === 0) {
    minute = "o'clock";
  } else if (minutes < 20) {
    minute = minuteWords[minutes];
  } else {
    minute = tensWords[Math.floor(minutes / 10)];

    if (minutes % 10 !== 0) {
      minute += ` ${minuteWords[minutes % 10]}`;
    }
  }

  if (minutes < 10 && minutes !== 0) {
    minute = `oh ${minuteWords[minutes]}`;
  }

  return `${hour} ${minute} ${period}`.trim();
}

module.exports = timeWord;
