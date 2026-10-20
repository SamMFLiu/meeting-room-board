// 預約時段衝突判斷（以一般 script 載入，不使用 ES module，雙擊 index.html 即可使用）
'use strict';

// "HH:MM" 轉成當天的分鐘數（index.html 其他地方也會用到）
const toMin = (hhmm) => { const [h, m] = hhmm.split(':').map(Number); return h * 60 + m; };

// 兩段時間是否重疊（首尾相接不算重疊）
const overlaps = (a, b) => toMin(a.start) < toMin(b.end) && toMin(b.start) < toMin(a.end);

// 在預約清單中找出與 data 衝突的第一筆預約（同會議室、同日期、時段重疊），沒有則回傳 undefined
// ignoreId：修改預約時要排除自己那一筆
function findConflict(bookingList, data, ignoreId) {
  return bookingList.find((b) =>
    b.id !== ignoreId && b.roomId === data.roomId && b.date === data.date && overlaps(b, data));
}
