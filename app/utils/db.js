import Dexie from "dexie";

const db = new Dexie("JustKeepWalking");
db.version(1).stores({ walks: "++id" });

/* */
db.on("populate", function() {
  let testData = [
    {id: 1, start: new Date(2016, 11, 15, 12), end: new Date(2016, 11, 15, 13, 45)},
    {id: 2, start: new Date(2016, 11, 16, 12), end: new Date(2016, 11, 16, 12, 45)},
    {id: 3, start: new Date(2016, 11, 17, 12), end: new Date(2016, 11, 17, 14)},
    {id: 4, start: new Date(2017, 1, 18, 12), end: new Date(2017, 1, 18, 13, 15)},
    {id: 5, start: new Date(2017, 1, 19, 12), end: new Date(2017, 1, 19, 13, 10)},
    {id: 6, start: new Date(2017, 1, 20, 12), end: new Date(2017, 1, 20, 13)},
    {id: 7, start: new Date(2017, 2, 21, 12), end: new Date(2017, 2, 21, 12, 45)},
    {id: 8, start: new Date(2017, 2, 22, 12), end: new Date(2017, 2, 22, 13, 10)},
    {id: 9, start: new Date(2017, 2, 23, 12), end: new Date(2017, 2, 23, 12, 25)},
    {id: 10, start: new Date(2017, 3, 24, 12), end: new Date(2017, 3, 24, 12, 55)},
    {id: 11, start: new Date(2017, 3, 25, 12), end: new Date(2017, 3, 25, 12, 30)},
    {id: 12, start: new Date(2017, 3, 26, 12), end: new Date(2017, 3, 26, 12, 45)}
  ];
  testData.forEach(item => db.walks.add(item));
});
/* */

export default db;
