export const convertNote = (
  note: string,
  shift: number,
  fifth: number
): string => {
  const order = [
    "C",
    "Db",
    "D",
    "Eb",
    "E",
    "F",
    "Gb",
    "G",
    "Ab",
    "A",
    "Bb",
    "B",
  ];
  let [_, name, octave] = note.match(/([A-Gb#]+)(\d+)/i) ?? [];
  let oct = Number(octave);
  if (name.indexOf("#") !== -1) {
    const [n, _] = name.split("#");
    if (n === "B") {
      name = "C";
      oct++;
    } else if (n === "E") name = "F";
    else {
      name = `${String.fromCharCode(n.charCodeAt(0) + 1)}b`;
    }
  }
  if (fifth < 0 && name === "B") name = "Bb";
  if (fifth < -1 && name === "E") name = "Eb";
  if (fifth < -2 && name === "A") name = "Ab";
  if (fifth < -3 && name === "D") name = "Db";
  if (fifth < -4 && name === "G") name = "Gb";
  if (fifth < -5 && name === "C") name = "B";
  if (fifth < -6 && name === "F") name = "E";
  if (fifth > 0 && name === "F") name = "Gb";
  if (fifth > 1 && name === "C") name = "Db";
  if (fifth > 2 && name === "G") name = "Ab";
  if (fifth > 3 && name === "D") name = "Eb";
  if (fifth > 4 && name === "A") name = "Bb";
  if (fifth > 5 && name === "E") name = "F";
  if (fifth > 6 && name === "B") name = "C";
  const index = order.indexOf(name);
  let newIndex = index + shift;
  while (newIndex < 0) {
    newIndex += order.length;
    oct--;
  }
  while (newIndex >= order.length) {
    newIndex -= order.length;
    oct++;
  }
  return `${order[newIndex]}${oct}`;
};
