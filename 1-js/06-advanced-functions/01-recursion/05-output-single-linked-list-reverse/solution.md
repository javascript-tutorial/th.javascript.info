# วิธีใช้การเรียกซ้ำ (recursion)

จุดสำคัญของวิธีนี้อยู่ที่ลำดับการแสดงค่า

ให้ฟังก์ชัน (function) เรียกตัวเองเพื่อแสดงค่าของสมาชิกที่เหลือใน linked list ก่อน *แล้วค่อย* แสดงค่าของสมาชิกปัจจุบัน:

```js run
let list = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3,
      next: {
        value: 4,
        next: null
      }
    }
  }
};

function printReverseList(list) {

  if (list.next) {
    printReverseList(list.next);
  }

  alert(list.value);
}

printReverseList(list);
```

# วิธีใช้ลูป (loop)

แบบใช้ลูปต้องมีขั้นตอนเพิ่มจากการแสดงค่าตามลำดับปกติ

`list` นี้เข้าถึงสมาชิกตัวสุดท้ายโดยตรงไม่ได้ และแต่ละสมาชิกก็ไม่มีข้อมูลที่ใช้ย้อนกลับไปหาตัวก่อนหน้า

เราจึงไล่สมาชิกจากหน้าไปหลังก่อน แล้วเก็บค่าของแต่ละตัวไว้ในอาร์เรย์ (array) จากนั้นวนอ่านอาร์เรย์จากท้ายมาหน้าเพื่อแสดงค่า:

```js run
let list = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3,
      next: {
        value: 4,
        next: null
      }
    }
  }
};

function printReverseList(list) {
  let arr = [];
  let tmp = list;

  while (tmp) {
    arr.push(tmp.value);
    tmp = tmp.next;
  }

  for (let i = arr.length - 1; i >= 0; i--) {
    alert( arr[i] );
  }
}

printReverseList(list);
```

วิธีเรียกซ้ำก็เริ่มจากไล่ไปจนถึงท้ายรายการ โดยเก็บข้อมูลของสมาชิกแต่ละตัวไว้ใน execution context ของการเรียกนั้น ๆ ซึ่งเรียงซ้อนกันอยู่ในสแต็ก (stack) เมื่อถึงสมาชิกสุดท้ายก็แสดงค่าของตัวนั้น แล้วกลับมาทำงานในการเรียกก่อนหน้าเพื่อแสดงค่าของตัวก่อนหน้า จึงได้ค่าจากท้ายมาหน้าเช่นกัน
