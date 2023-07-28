export function generateUniqueId() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1; // Months are zero-based, so we add 1 to get the correct month
  const day = now.getDate();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const milliseconds = now.getMilliseconds();

  // Concatenate the date and time components to create the ID
  const uniqueId = `${year}${month}${day}${hours}${minutes}${seconds}${milliseconds}`;

  return uniqueId;
}
