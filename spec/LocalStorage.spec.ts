"use strict";

declare let beforeEach: any;
declare let afterEach: any;
declare let describe: any;
declare let it: any;
declare let expect: any;
declare let require: any;

import LocalStorageClass from "../lib/Storages/LocalStorage";
let LocalStorage = new LocalStorageClass();

describe("LocalStorage", () => {

  let test = () => {
    let now = (new Date()).getTime();
    let paramsValues = [undefined, false, true, 30, "value", "/", "test", location.hostname];
    let dataSet = [];
    for (let x1 of paramsValues) {
      for (let x2 of paramsValues) {
        for (let x3 of paramsValues) {

          if (
              [x2, x3].indexOf(x1) === -1 &&
              [x1, x3].indexOf(x2) === -1 &&
              [x1, x2].indexOf(x3) === -1
          ) {
            let params = [x1, x2, x3];
            let cond = (
                (
                    typeof x1 === "boolean" ||
                    x1 === undefined
                ) &&
                (
                    typeof x2 === "string" &&
                    LocalStorage.regValidKey.test(x2)
                ) &&
                (
                    typeof x3 === "string" &&
                    LocalStorage.regValidKey.test(x3)
                )
            );
            dataSet.push({
              params: params,
              result: cond
            });
          }
        }
      }
    }
    for (let set of dataSet) {
      /**
       * Set data
       */
      let setItem1 = LocalStorage.setItem.apply(LocalStorage, set.params);

      expect(typeof(setItem1)).toEqual("boolean");

      if (set.result) {
        expect(setItem1).toEqual(true);
      } else {
        expect(setItem1).toEqual(false);
      }

      if (setItem1) {
        /**
         * Get data
         */
        let getItem1 = LocalStorage.getItem.apply(LocalStorage, set.params.slice(0, 2));

        expect(typeof(getItem1)).toEqual("string");
        expect(getItem1).toEqual(set.params[2]);

        /**
         * Get keys
         */
        let getKeys1 = LocalStorage.getKeys.apply(LocalStorage, set.params.slice(0, 1));

        expect(getKeys1).toBeArray();

        expect(getKeys1).toContain(set.params[1]);

        /**
         * Remove item
         */
        let removeItem1 = LocalStorage.removeItem.apply(LocalStorage, set.params.slice(0, 2));

        getKeys1 = LocalStorage.getKeys.apply(LocalStorage, set.params.slice(0, 1));

        expect(typeof(removeItem1)).toEqual("boolean");

        expect(removeItem1).toEqual(true);
        expect(getKeys1).not.toContain(set.params[1]);

        /**
         * Clean items
         */
        setItem1 = LocalStorage.setItem.apply(LocalStorage, set.params);
        getKeys1 = LocalStorage.getKeys.apply(LocalStorage, set.params.slice(0, 1));

        let clear1 = LocalStorage.clear.apply(LocalStorage, set.params.slice(0, 1));

        let getKeys2 = LocalStorage.getKeys.apply(LocalStorage, set.params.slice(0, 1));

        expect(typeof(clear1)).toEqual("boolean");

        expect(clear1).toEqual(true);
        expect(getKeys2).not.toContain(set.params[1]);
      }
    }
  };

  it("LocalStorage", () => {
    expect(typeof(LocalStorageClass)).toEqual("function");
    expect(typeof(LocalStorage)).toEqual("object");
  });

  it([
    "LocalStorage.isSupported",
    "LocalStorage.setItem",
    "LocalStorage.getItem",
    "LocalStorage.removeItem",
    "LocalStorage.getKeys",
    "LocalStorage.clear"
  ].join("\r\n"), () => {
    let isSupported1 = LocalStorage.isSupported();

    expect(typeof(isSupported1)).toEqual("boolean");

    if (isSupported1) {
      test();
    }
  });
});