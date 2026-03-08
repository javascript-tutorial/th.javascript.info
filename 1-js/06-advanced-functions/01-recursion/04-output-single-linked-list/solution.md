# วิธีใช้ลูป

คำตอบแบบใช้ลูป:

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

function printList(list) {
  let tmp = list;

  while (tmp) {
    alert(tmp.value);
    tmp = tmp.next;
  }

}

printList(list);
```

สังเกตว่าเราใช้ตัวแปรชั่วคราว `tmp` ในการท่องผ่าน list ในทางเทคนิค เราใช้พารามิเตอร์ `list` โดยตรงก็ได้:

```js
function printList(list) {

  while(*!*list*/!*) {
    alert(list.value);
    list = list.next;
  }

}
```

...แต่นั่นไม่ใช่ความคิดที่ดี เพราะในอนาคตเราอาจต้องขยายฟังก์ชัน หรือทำอะไรอย่างอื่นกับ list ถ้าเปลี่ยนค่า `list` ไปแล้ว จะทำไม่ได้

ในแง่ชื่อตัวแปรที่ดี `list` ตรงนี้คือตัว list เอง คือสมาชิกตัวแรก ควรคงค่าไว้แบบนั้น เพื่อความชัดเจนและเชื่อถือได้

ส่วน `tmp` มีหน้าที่แค่ท่องผ่าน list เท่านั้น เหมือน `i` ในลูป `for`

# วิธีใช้การเรียกซ้ำ

คำตอบแบบเรียกซ้ำของ `printList(list)` ใช้หลักคิดง่ายๆ คือ แสดงสมาชิกปัจจุบัน `list` แล้วทำแบบเดียวกันกับ `list.next`:

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

function printList(list) {

  alert(list.value); // แสดงสมาชิกปัจจุบัน

  if (list.next) {
    printList(list.next); // ทำแบบเดียวกันกับสมาชิกที่เหลือ
  }

}

printList(list);
```

แล้วแบบไหนดีกว่ากัน?

ในทางเทคนิค ลูปมีประสิทธิภาพดีกว่า ทั้งสองวิธีทำงานเหมือนกัน แต่ลูปไม่เปลืองทรัพยากรในการเรียกฟังก์ชันซ้อน

อีกด้านหนึ่ง แบบเรียกซ้ำเขียนสั้นกว่า และบางครั้งก็เข้าใจง่ายกว่า
