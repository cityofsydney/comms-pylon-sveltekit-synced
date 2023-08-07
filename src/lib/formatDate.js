function isToday(date) {
  const today = new Date();
  return date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();
}

export function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    //const year = date.getFullYear();
    const checkedDate = (isToday(date)) ? 'Today' :   `${day} ${month}`;
    return checkedDate;
  }