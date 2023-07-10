export function sumRegistries(time1: string, time2: string) {
  const [hours1, minutes1] = time1.split(':').map(Number);
  const [hours2, minutes2] = time2.split(':').map(Number);

  let totalHours = hours1 + hours2;
  let totalMinutes = minutes1 + minutes2;

  if (totalMinutes >= 60) {
    totalHours += Math.floor(totalMinutes / 60);
    totalMinutes %= 60;
  }

  const hoursResult = totalHours % 24;
  const minutesResult = totalMinutes;

  let formattedHours = String(hoursResult);
  if (formattedHours.length < 2) {
    formattedHours = '0' + formattedHours;
  }

  const formattedMinutes = String(minutesResult).padStart(2, '0');

  return `${formattedHours}:${formattedMinutes}`;
}

export function subtractRegistries(time1: string, time2: string) {
  const [hours1, minutes1] = time1.split(':');
  const [hours2, minutes2] = time2.split(':');

  const totalMinutes1 = Number(hours1) * 60 + Number(minutes1);
  const totalMinutes2 = Number(hours2) * 60 + Number(minutes2);

  let difference = totalMinutes1 - totalMinutes2;

  if (difference < 0) {
    difference += 24 * 60; // Adiciona 24 horas em minutos para obter a diferença correta
  }

  const hoursResult = String(Math.floor(difference / 60)).padStart(2, '0');
  const minutesResult = String(difference % 60).padStart(2, '0');

  return `${hoursResult}:${minutesResult}`;
}
