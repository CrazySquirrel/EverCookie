"use strict";

declare let describe: any;
declare let it: any;
declare let expect: any;
declare let require: any;

import DOMStorageClass from "../lib/Storages/DOMStorage";
const DOMStorage = new DOMStorageClass();

describe("DOMStorage", () => {

  const test = () => {
    const paramsValues: any = [undefined, false, true, 30, "value", "/", "test", location.hostname];
    const dataSet = [];

    for (let i1 = 0; i1 < paramsValues.length; i1++) {
      const x1 = paramsValues[i1];

      for (let i2 = 0; i2 < paramsValues.length; i2++) {
        const x2 = paramsValues[i2];

        for (let i3 = 0; i3 < paramsValues.length; i3++) {
          const x3 = paramsValues[i3];

          if (
              [x2, x3].indexOf(x1) === -1 &&
              [x1, x3].indexOf(x2) === -1 &&
              [x1, x2].indexOf(x3) === -1
          ) {
            const params = [x1, x2, x3];
            const cond = (
                (
                    typeof x1 === "boolean" ||
                    x1 === undefined
                ) &&
                (
                    typeof x2 === "string" &&
                    DOMStorage.regValidKey.test(x2)
                ) &&
                (
                    typeof x3 === "string" &&
                    DOMStorage.regValidKey.test(x3)
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
    for (let j = 0; j < dataSet.length; j++) {
      const set = dataSet[j];
      /**
       * Set data
       */
      let setItem1 = DOMStorage.setItem.apply(DOMStorage, set.params);

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
        const getItem1 = DOMStorage.getItem.apply(DOMStorage, set.params.slice(0, 2));

        expect(typeof(getItem1)).toEqual("string");
        expect(getItem1).toEqual(set.params[2]);

        /**
         * Get keys
         */
        let getKeys1 = DOMStorage.getKeys.apply(DOMStorage, set.params.slice(0, 1));

        expect(getKeys1).toBeArray();

        expect(getKeys1).toContain(set.params[1]);

        /**
         * Remove item
         */
        const removeItem1 = DOMStorage.removeItem.apply(DOMStorage, set.params.slice(0, 2));

        getKeys1 = DOMStorage.getKeys.apply(DOMStorage, set.params.slice(0, 1));

        expect(typeof(removeItem1)).toEqual("boolean");

        expect(removeItem1).toEqual(true);
        expect(getKeys1).not.toContain(set.params[1]);

        /**
         * Clean items
         */
        setItem1 = DOMStorage.setItem.apply(DOMStorage, set.params);
        getKeys1 = DOMStorage.getKeys.apply(DOMStorage, set.params.slice(0, 1));

        const clear1 = DOMStorage.clear.apply(DOMStorage, set.params.slice(0, 1));

        const getKeys2 = DOMStorage.getKeys.apply(DOMStorage, set.params.slice(0, 1));

        expect(typeof(clear1)).toEqual("boolean");

        expect(clear1).toEqual(true);
        expect(getKeys2).not.toContain(set.params[1]);
      }
    }
  };

  it("DOMStorage", () => {
    expect(typeof(DOMStorageClass)).toEqual("function");
    expect(typeof(DOMStorage)).toEqual("object");
  });

  it([
    "DOMStorage.isSupported",
    "DOMStorage.setItem",
    "DOMStorage.getItem",
    "DOMStorage.removeItem",
    "DOMStorage.getKeys",
    "DOMStorage.clear",
  ].join("\r\n"), () => {
    const isSupported1 = DOMStorage.isSupported();

    expect(typeof(isSupported1)).toEqual("boolean");

    if (isSupported1) {
      test();
    }
  });
});
