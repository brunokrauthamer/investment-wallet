export default function parseDateString(dateString) {
  const [day, month, year] = dateString.split("/");
  return new Date(`${month}/${day}/${year}`);
}