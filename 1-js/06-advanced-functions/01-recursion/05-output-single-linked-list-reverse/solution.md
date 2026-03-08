# วิธีใช้การเรียกซ้ำ

หลักคิดแบบเรียกซ้ำตรงนี้ต้องคิดสักนิด

เราต้องแสดงผลสมาชิกที่เหลือของ list ก่อน *แล้วค่อย* แสดงสมาชิกปัจจุบัน:

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

# วิธีใช้ลูป

วิธีลูปก็ซับซ้อนกว่าการแสดงผลตามลำดับปกติเล็กน้อย

ไม่มีทางดึงค่าตัวสุดท้ายของ `list` ได้โดยตรง และไม่สามารถ "ย้อนกลับ" ได้

ดังนั้น สิ่งที่ทำได้คือท่องผ่านสมาชิกตามลำดับปกติก่อน แล้วเก็บไว้ในอาร์เรย์ จากนั้นค่อยแสดงผลจากท้ายมาหน้า:

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

สังเกตว่าวิธีเรียกซ้ำทำงานเหมือนกันทุกประการ — ท่องผ่าน list แล้วจำสมาชิกไว้ในสายการเรียกซ้อน (ใน execution context stack) จากนั้นค่อยแสดงผลออกมา
