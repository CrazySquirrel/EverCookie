"use strict";

declare let describe: any;
declare let it: any;
declare let expect: any;
declare let require: any;

import GlobalStorageClass from "../lib/Storages/GlobalStorage";
let GlobalStorage = new GlobalStorageClass();

describe("GlobalStorage", () => {

  let test = () => {
    let paramsValues: any = [undefined, false, true, 30, "value", "/", "test", location.hostname];
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
                    GlobalStorage.regValidKey.test(x2)
                ) &&
                (
                    typeof x3 === "string" &&
                    GlobalStorage.regValidKey.test(x3)
                )
            );
            dataSet.push({
              result: cond,
              params,
            });
          }
        }
      }
    }
    for (let set of dataSet) {
      /**
       * Set data
       */
      let setItem1 = GlobalStorage.setItem.apply(GlobalStorage, set.params);

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
        let getItem1 = GlobalStorage.getItem.apply(GlobalStorage, set.params.slice(0, 2));

        expect(typeof(getItem1)).toEqual("string");
        expect(getItem1).toEqual(set.params[2]);

        /**
         * Get keys
         */
        let getKeys1 = GlobalStorage.getKeys.apply(GlobalStorage, set.params.slice(0, 1));

        expect(getKeys1).toBeArray();

        expect(getKeys1).toContain(set.params[1]);

        /**
         * Remove item
         */
        let removeItem1 = GlobalStorage.removeItem.apply(GlobalStorage, set.params.slice(0, 2));

        getKeys1 = GlobalStorage.getKeys.apply(GlobalStorage, set.params.slice(0, 1));

        expect(typeof(removeItem1)).toEqual("boolean");

        expect(removeItem1).toEqual(true);
        expect(getKeys1).not.toContain(set.params[1]);

        /**
         * Clean items
         */
        setItem1 = GlobalStorage.setItem.apply(GlobalStorage, set.params);
        getKeys1 = GlobalStorage.getKeys.apply(GlobalStorage, set.params.slice(0, 1));

        let clear1 = GlobalStorage.clear.apply(GlobalStorage, set.params.slice(0, 1));

        let getKeys2 = GlobalStorage.getKeys.apply(GlobalStorage, set.params.slice(0, 1));

        expect(typeof(clear1)).toEqual("boolean");

        expect(clear1).toEqual(true);
        expect(getKeys2).not.toContain(set.params[1]);
      }
    }
  };

  it("GlobalStorage", () => {
    expect(typeof(GlobalStorageClass)).toEqual("function");
    expect(typeof(GlobalStorage)).toEqual("object");
  });

  it([
    "GlobalStorage.isSupported",
    "GlobalStorage.setItem",
    "GlobalStorage.getItem",
    "GlobalStorage.removeItem",
    "GlobalStorage.getKeys",
    "GlobalStorage.clear",
  ].join("\r\n"), () => {
    let isSupported1 = GlobalStorage.isSupported();

    expect(typeof(isSupported1)).toEqual("boolean");

    if (isSupported1) {
      test();
    }
  });
});
