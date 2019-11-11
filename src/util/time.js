export const unixToText = unixTime => {
  const date = new Date(unixTime * 1000);
  const arr = [
    date.getFullYear(),
    "-",
    date.getMonth() + 1,
    "-",
    date.getDate(),
    " ",
    date.getHours(),
    ":",
    date.getMinutes()
  ];
  return arr.reduce((result, value) => {
    if (typeof value === "number" && value < 10) {
      value = "0" + value;
    }
    return result + value;
  });
};
