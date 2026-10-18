importance: 5

---

# Spy decorator

สร้าง decorator `spy(func)` ที่รับฟังก์ชัน (function) แล้วคืน wrapper ซึ่งเป็นฟังก์ชันที่ครอบการเรียกฟังก์ชันเดิม โดยให้ wrapper บันทึกข้อมูลของทุกการเรียกไว้ในพร็อพเพอร์ตี้ (property) ชื่อ `calls`

ข้อมูลของแต่ละครั้งต้องเป็นอาร์เรย์ (array) ที่เก็บอาร์กิวเมนต์ (argument) ทั้งหมดของการเรียกครั้งนั้น

ตัวอย่างการใช้งาน:

```js
function work(a, b) {
  alert( a + b ); // work เป็นฟังก์ชันหรือเมธอดอะไรก็ได้
}

*!*
work = spy(work);
*/!*

work(1, 2); // 3
work(4, 5); // 9

for (let args of work.calls) {
  alert( 'call:' + args.join() ); // "call:1,2", "call:4,5"
}
```

Decorator แบบนี้ใช้ช่วยทดสอบการทำงานแต่ละส่วนของโปรแกรม หรือ unit testing ได้ หากต้องการเครื่องมือที่รองรับการตรวจสอบได้มากขึ้น ลองดู `sinon.spy` ในไลบรารี (library) [Sinon.JS](http://sinonjs.org/)
