"use strict";

declare let describe: any;
declare let it: any;
declare let expect: any;
declare let require: any;

const URL = require("url");

import CookiesClass from "../lib/Storages/Cookies";
const Cookies = new CookiesClass();

describe("Cookies", () => {

  const test = () => {
    const paramsValues: any = [undefined, false, true, 30, "value", "/", "test", location.hostname];
    const dataSet = [];

    for (let i1 = 0; i1 < paramsValues.length; i1++) {
      const x1 = paramsValues[i1];

      for (let i2 = 0; i2 < paramsValues.length; i2++) {
        const x2 = paramsValues[i2];

        for (let i3 = 0; i3 < paramsValues.length; i3++) {
          const x3 = paramsValues[i3];

          for (let i4 = 0; i4 < paramsValues.length; i4++) {
            const x4 = paramsValues[i4];

            for (let i5 = 0; i5 < paramsValues.length; i5++) {
              const x5 = paramsValues[i5];

              for (let i6 = 0; i6 < paramsValues.length; i6++) {
                const x6 = paramsValues[i6];

                for (let i7 = 0; i7 < paramsValues.length; i7++) {
                  const x7 = paramsValues[i7];

                  if (
                      [x2, x3, x4, x5, x6, x7].indexOf(x1) === -1 &&
                      [x1, x3, x4, x5, x6, x7].indexOf(x2) === -1 &&
                      [x1, x2, x4, x5, x6, x7].indexOf(x3) === -1 &&
                      [x1, x2, x3, x5, x6, x7].indexOf(x4) === -1 &&
                      [x1, x2, x3, x4, x6, x7].indexOf(x5) === -1 &&
                      [x1, x2, x3, x4, x5, x7].indexOf(x6) === -1 &&
                      [x1, x2, x3, x4, x5, x6].indexOf(x7) === -1
                  ) {
                    const params = [x1, x2, x3, x4, x5, x6, x7];
                    let cond = (
                        (
                            typeof x1 === "boolean" ||
                            x1 === undefined
                        ) &&
                        (
                            typeof x2 === "string" &&
                            Cookies.regValidKey.test(x2)
                        ) &&
                        (
                            typeof x3 === "string" &&
                            Cookies.regValidKey.test(x3)
                        ) &&
                        (
                            (
                                typeof x4 === "number" &&
                                x4 < 365
                            ) || x4 === undefined
                        ) &&
                        (
                            typeof x5 === "string" ||
                            x5 === undefined
                        ) &&
                        (
                            (
                                typeof x6 === "string" &&
                                x6.indexOf(location.hostname) !== -1
                            ) || x6 === undefined
                        ) &&
                        (
                            (
                                typeof x7 === "boolean" &&
                                x7 === (location.protocol === "https:")
                            ) || x7 === undefined
                        )
                    );
                    if (cond) {
                      const u = URL.parse("http://" + (!!x6 ? x6 : location.hostname) + (!!x5 ? x5 : "/"));
                      if (
                          (u.hostname !== x6 && u.hostname !== location.hostname) ||
                          (u.path !== x5 && u.path !== "/")
                      ) {
                        cond = false;
                      }
                    }
                    dataSet.push({
                      result: cond,
                      params,
                    });
                  }
                }
              }
            }
          }
        }
      }
    }
    for (let j = 0; j < dataSet.length; j++) {
      const set = dataSet[j];
      /**
       * Set data
       */
      let setItem1 = Cookies.setItem.apply(Cookies, set.params);

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
        const getItem1 = Cookies.getItem.apply(Cookies, set.params.slice(0, 2));

        expect(typeof(getItem1)).toEqual("string");
        expect(getItem1).toEqual(set.params[2]);

        /**
         * Get keys
         */
        let getKeys1 = Cookies.getKeys.apply(Cookies, set.params.slice(0, 1));

        expect(getKeys1).toBeArray();

        expect(getKeys1).toContain(set.params[1]);

        /**
         * Remove item
         */
        const removeItem1 = Cookies.removeItem.apply(Cookies, set.params.slice(0, 2));

        getKeys1 = Cookies.getKeys.apply(Cookies, set.params.slice(0, 1));

        expect(typeof(removeItem1)).toEqual("boolean");

        expect(removeItem1).toEqual(true);
        expect(getKeys1).not.toContain(set.params[1]);

        /**
         * Clean items
         */
        setItem1 = Cookies.setItem.apply(Cookies, set.params);
        getKeys1 = Cookies.getKeys.apply(Cookies, set.params.slice(0, 1));

        const clear1 = Cookies.clear.apply(Cookies, set.params.slice(0, 1));

        const getKeys2 = Cookies.getKeys.apply(Cookies, set.params.slice(0, 1));

        expect(typeof(clear1)).toEqual("boolean");

        expect(clear1).toEqual(true);
        expect(getKeys2).not.toContain(set.params[1]);
      }
    }
  };

  it("Cookies", () => {
    expect(typeof(CookiesClass)).toEqual("function");
    expect(typeof(Cookies)).toEqual("object");
  });

  it([
    "Cookies.isSupported",
    "Cookies.setItem",
    "Cookies.getItem",
    "Cookies.removeItem",
    "Cookies.getKeys",
    "Cookies.clear",
  ].join("\r\n"), () => {
    const isSupported1 = Cookies.isSupported();

    expect(typeof(isSupported1)).toEqual("boolean");

    if (isSupported1) {
      test();
    }
  });
});
