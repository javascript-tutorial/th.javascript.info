# การแปลงชนิดของข้อมูล

ในจาวาสคริปต์มีหลายครั้งที่ ฟังชั่นก์และตัวดำเนินการ (operators) จะแปลงข้อมูลจากชนิดหนึ่ง เป็นอีกชนิดโดยอัตโนมัติ

ตัวอย่างเช่น `alert` จะแปลงค่าชนิดใดๆก็ตาม ให้เป็นสตริง และ ตัวดำเนินการทางคณิตศาสตร์ (Mathematical operations) ก็จะแปลงค่าชนิดใดๆก็ตามเป็นตัวเลข

There are also cases when we need to explicitly convert a value to the expected type.

```smart header="เรายังไม่พูดถึงออบเจ็กต์"
ในบทนี้ เราพูดแค่ชนิดของข้อมูลแบบ primitives ก่อน เมื่อเราผ่านการเรียนออบเจ็กต์มาแล้ว เราจะค่อยพูดถึงการแปลงออบเจ็กต์ เป็นข้อมูลชนิดอื่นๆต่อไป <info:object-toprimitive>
```

## การแปลงเป็นสตริง

การแปลงสตริงสามารถทำได้ง่ายๆ เราสามารถแปลงข้อมูลชนิดใดๆ เป็นสตริงก็ได้

ตัวอย่างเช่น `alert(value)` จะแสดงค่าที่เก็บอยู่ในตัวแปร `value` ออกมาเป็นสตริง

เรายังสามารถใช้ `String(value)` ซึ่งเป็นฟังชั่นก์ที่จะแปลงข้อมูลชนิดใดๆก็ตามให้เป็นสตริง

```js run
let value = true;
alert(typeof value); // บูลีน

*!*
value = String(value); // ทีนี้เป็นสตริง "true" แล้ว
alert(typeof value); // จะได้ว่าสตริง
*/!*
```

เมื่อข้อมูลชนิดใดๆ ถูกแปลงเป็นสตริงแล้ว เราสังเกตเห็นได้อย่างชัดเจน ว่าค่าจะรายล้อมด้วยเครื่องหมาย `quotes` เช่น `false` เป็น `"false"`, `null` เป็น `"null"` เป็นต้น

## การแปลงเป็นตัวเลข

ฟังชั่นก์หรือนิพจน์ (expressions) ทางคณิตศาสตร์ จะแปลงข้อมูลชนิดใดๆ เป็นตัวเลขโดยอัตโนมัติ 

ตัวอย่างเช่น, การหาร `/` เราสามารถหารข้อมูลที่ไม่ใช่ตัวเลขได้ด้วย

```js run
alert( "6" / "2" ); // 3, สตริงจะถูกแปลงเป็นตัวเลข
```

เรายังสามาถใช้ `Number(value)` ซึ่งเป็นฟังชั่นก์ที่จะแปลงข้อมูลชนิดใดๆก็ตามให้เป็นตัวเลข

```js run
let str = "123";
alert(typeof str); // ได้สตริง

let num = Number(str); // กลายเป็นตัวเลข 123

alert(typeof num); // ได้ตัวเลข
```

Explicit conversion is usually required when we read a value from a string-based source like a text form but expect a number to be entered.

If the string is not a valid number, the result of such a conversion is `NaN`. For instance:

```js run
let age = Number("an arbitrary string instead of a number");

alert(age); // NaN, conversion failed
```

Numeric conversion rules:

| Value |  Becomes... |
|-------|-------------|
|`undefined`|`NaN`|
|`null`|`0`|
|<code>true&nbsp;and&nbsp;false</code> | `1` and `0` |
| `string` | Whitespaces from the start and end are removed. If the remaining string is empty, the result is `0`. Otherwise, the number is "read" from the string. An error gives `NaN`. |

Examples:

```js run
alert( Number("   123   ") ); // 123
alert( Number("123z") );      // NaN (error reading a number at "z")
alert( Number(true) );        // 1
alert( Number(false) );       // 0
```

Please note that `null` and `undefined` behave differently here: `null` becomes zero while `undefined` becomes `NaN`.

Most mathematical operators also perform such conversion, we'll see that in the next chapter.

## Boolean Conversion

Boolean conversion is the simplest one.

It happens in logical operations (later we'll meet condition tests and other similar things) but can also be performed explicitly with a call to `Boolean(value)`.

The conversion rule:

- Values that are intuitively "empty", like `0`, an empty string, `null`, `undefined`, and `NaN`, become `false`.
- Other values become `true`.

For instance:

```js run
alert( Boolean(1) ); // true
alert( Boolean(0) ); // false

alert( Boolean("hello") ); // true
alert( Boolean("") ); // false
```

````warn header="Please note: the string with zero `\"0\"` is `true`"
Some languages (namely PHP) treat `"0"` as `false`. But in JavaScript, a non-empty string is always `true`.

```js run
alert( Boolean("0") ); // true
alert( Boolean(" ") ); // spaces, also true (any non-empty string is true)
```
````

## Summary

The three most widely used type conversions are to string, to number, and to boolean.

**`String Conversion`** -- Occurs when we output something. Can be performed with `String(value)`. The conversion to string is usually obvious for primitive values.

**`Numeric Conversion`** -- Occurs in math operations. Can be performed with `Number(value)`.

The conversion follows the rules:

| Value |  Becomes... |
|-------|-------------|
|`undefined`|`NaN`|
|`null`|`0`|
|<code>true&nbsp;/&nbsp;false</code> | `1 / 0` |
| `string` | The string is read "as is", whitespaces from both sides are ignored. An empty string becomes `0`. An error gives `NaN`. |

**`Boolean Conversion`** -- Occurs in logical operations. Can be performed with `Boolean(value)`.

Follows the rules:

| Value |  Becomes... |
|-------|-------------|
|`0`, `null`, `undefined`, `NaN`, `""` |`false`|
|any other value| `true` |


Most of these rules are easy to understand and memorize. The notable exceptions where people usually make mistakes are:

- `undefined` is `NaN` as a number, not `0`.
- `"0"` and space-only strings like `"   "` are true as a boolean.

Objects aren't covered here. We'll return to them later in the chapter <info:object-toprimitive> that is devoted exclusively to objects after we learn more basic things about JavaScript.
