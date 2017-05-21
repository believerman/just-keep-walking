import Dexie from "dexie";

const db = new Dexie("JustKeepWalking");
db.version(1).stores({ walks: "++id" });

/* *
db.on("populate", function() {
  const range = (a, b) => {
    let range = [];
    for (let i = a; i <= b; i++) {
      range.push(i);
    }
    return range;
  };

  const years = [2016, 2017];
  const months = range(0, 11);
  const days = range(1,30);

  let i = 1;
  years.forEach(year => {
    months.forEach(month => {
      days.forEach(day => {
        let start = Math.floor(Math.random() * 10 + 10);
        let duration = Math.random() + 0.5;
        let endHours = start + duration;
        let end = {
          hours: Math.floor(endHours),
          minutes: endHours * 60 % 60
        };

        db.walks.add({
          id: i,
          start: new Date(year, month, day, start),
          end: new Date(year, month, day, end.hours, end.minutes)
        });
        i++;
      });
    });
  });
});
/* */

export default db;
