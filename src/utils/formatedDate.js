export function getIndonesianMonthName(monthIndex) {
  const indonesianMonths = [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember',
  ];
  return indonesianMonths[monthIndex];
}

export function getIndonesianFormattedDate(date) {
  const day = date.getDate().toString().padStart(2, '0');
  const monthIndex = date.getMonth();
  const monthName = getIndonesianMonthName(monthIndex);
  const year = date.getFullYear().toString();

  return `${day} ${monthName} ${year}`;
}
