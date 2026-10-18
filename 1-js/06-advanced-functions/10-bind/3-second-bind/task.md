importance: 5

---

# bind ซ้ำ

ถ้าเรียก `bind` กับฟังก์ชัน (function) ที่ผูกไว้แล้วอีกครั้ง จะเปลี่ยนค่า `this` ได้ไหม?

โค้ดนี้จะแสดงอะไร?

```js no-beautify
function f() {
  alert(this.name);
}

f = f.bind( {name: "John"} ).bind( {name: "Ann" } );

f();
```

