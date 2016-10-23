# EverCookie
Versatile storage.

## Build
The repository contains pre-compiled files, but if you want to add your files and compile, then run the following commands in the repository folder.
* npm install
* npm run production

or

* npm run development

The build required NodeJs version 6 or higher.

## Usage

```TypeScript
import EverCookie from "EverCookie.ts";

let LocalEverCookie = new EverCookie(uid);

LocalEverCookie.setItem(checkSupport, key, value);
LocalEverCookie.getItem(checkSupport, key);
LocalEverCookie.removeItem(checkSupport, key);
LocalEverCookie.getKeys(checkSupport);
LocalEverCookie.clear(checkSupport);
LocalEverCookie.destroy();
```

or

```JavaScript
let EverCookie = required("EverCookie.js");

let LocalEverCookie = new EverCookie(uid);

LocalEverCookie.setItem(checkSupport, key, value);
LocalEverCookie.getItem(checkSupport, key);
LocalEverCookie.removeItem(checkSupport, key);
LocalEverCookie.getKeys(checkSupport);
LocalEverCookie.clear(checkSupport);
LocalEverCookie.destroy();
```