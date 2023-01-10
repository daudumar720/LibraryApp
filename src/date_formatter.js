export function formatDate(date) {
  date = new Date(date);
  let year = date.getFullYear();
  let month = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ][date.getMonth()];
  let day = date.getDate();

  return `${day} ${month}, ${year}`;
}