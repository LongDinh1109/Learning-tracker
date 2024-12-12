export function formatDate(date: Date, format: string = "DD/MM/YYYY"): string {
  if (typeof date === "string") {
    date = new Date(date);
  }
  const day = String(date.getDate()).padStart(2, "0"); // Add leading zero for day
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Add leading zero for month
  const year = date.getFullYear();

  return format
    .replace(/DD/, day)
    .replace(/MM/, month)
    .replace(/YYYY/, String(year));
}
