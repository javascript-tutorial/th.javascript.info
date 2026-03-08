คำตอบ: **John**

```js run no-beautify
function f() {
  alert(this.name);
}

f = f.bind( {name: "John"} ).bind( {name: "Pete"} );

f(); // John
```

[bound function](https://tc39.github.io/ecma262/#sec-bound-function-exotic-objects) (exotic object) ที่ `f.bind(...)` คืนมา จะจำ context (และอาร์กิวเมนต์ถ้ามี) เฉพาะตอนที่สร้างเท่านั้น

ฟังก์ชันที่ผูกแล้วจะผูกซ้ำอีกไม่ได้
