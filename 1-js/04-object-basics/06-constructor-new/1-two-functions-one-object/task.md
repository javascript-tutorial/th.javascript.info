importance: 2

---

# สองฟังก์ชัน แต่ออบเจ็กต์เดียวกัน

เราสร้างฟังก์ชัน `A` และ `B` ให้ `new A() == new B()` เป็นจริงได้ไหม

```js no-beautify
function A() { ... }
function B() { ... }

let a = new A();
let b = new B();

alert( a == b ); // true
```

ถ้าทำได้ ลองเขียนโค้ดของทั้งสองฟังก์ชัน
