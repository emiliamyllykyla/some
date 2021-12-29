const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const formatDate = (number) => {
  const date = new Date(number);
  const day = date.getDate();
  const moIndex = date.getMonth();
  const year = date.getFullYear();
  return `${months[moIndex]} ${day}, ${year}`;
};
