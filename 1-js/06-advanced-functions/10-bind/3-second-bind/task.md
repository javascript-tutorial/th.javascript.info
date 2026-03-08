importance: 5

---

# bind ซ้ำ

เราสามารถเปลี่ยน `this` ด้วยการ bind ซ้ำอีกครั้งได้ไหม?

ผลลัพธ์จะเป็นอะไร?

```js no-beautify
function f() {
  alert(this.name);
}

f = f.bind( {name: "John"} ).bind( {name: "Ann" } );

f();
```

