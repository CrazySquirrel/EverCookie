"use strict";

declare let beforeEach: any;
declare let afterEach: any;
declare let describe: any;
declare let it: any;
declare let expect: any;
declare let require: any;

const URL = require("url");

import CookiesClass from "../lib/Storages/Cookies";
let Cookies = new CookiesClass();

describe("Cookies", () => {

  let test = () => {
    let now = (new Date()).getTime();
    let paramsValues = [undefined, false, true, 30, "value", "/", "test", location.hostname];
    let dataSet = [];
    for (let x1 of paramsValues) {
      for (let x2 of paramsValues) {
        for (let x3 of paramsValues) {
          for (let x4 of paramsValues) {
            for (let x5 of paramsValues) {
              for (let x6 of paramsValues) {
                for (let x7 of paramsValues) {
                  if (
                      [x2, x3, x4, x5, x6, x7].indexOf(x1) === -1 &&
                      [x1, x3, x4, x5, x6, x7].indexOf(x2) === -1 &&
                      [x1, x2, x4, x5, x6, x7].indexOf(x3) === -1 &&
                      [x1, x2, x3, x5, x6, x7].indexOf(x4) === -1 &&
                      [x1, x2, x3, x4, x6, x7].indexOf(x5) === -1 &&
                      [x1, x2, x3, x4, x5, x7].indexOf(x6) === -1 &&
                      [x1, x2, x3, x4, x5, x6].indexOf(x7) === -1
                  ) {
                    let params = [x1, x2, x3, x4, x5, x6, x7];
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
                      let u = URL.parse("http://" + (!!x6 ? x6 : location.hostname) + (!!x5 ? x5 : "/"));
                      if (
                          (u.hostname !== x6 && u.hostname !== location.hostname) ||
                          (u.path !== x5 && u.path !== "/")
                      ) {
                        cond = false;
                      }
                    }
                    dataSet.push({
                      params: params,
                      result: cond
                    });
                  }
                }
              }
            }
          }
        }
      }
    }
    for (let set of dataSet) {
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
        let getItem1 = Cookies.getItem.apply(Cookies, set.params.slice(0, 2));

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
        let removeItem1 = Cookies.removeItem.apply(Cookies, set.params.slice(0, 2));

        getKeys1 = Cookies.getKeys.apply(Cookies, set.params.slice(0, 1));

        expect(typeof(removeItem1)).toEqual("boolean");

        expect(removeItem1).toEqual(true);
        expect(getKeys1).not.toContain(set.params[1]);

        /**
         * Clean items
         */
        setItem1 = Cookies.setItem.apply(Cookies, set.params);
        getKeys1 = Cookies.getKeys.apply(Cookies, set.params.slice(0, 1));

        let clear1 = Cookies.clear.apply(Cookies, set.params.slice(0, 1));

        let getKeys2 = Cookies.getKeys.apply(Cookies, set.params.slice(0, 1));

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
    "Cookies.clear"
  ].join("\r\n"), () => {
    let isSupported1 = Cookies.isSupported();

    expect(typeof(isSupported1)).toEqual("boolean");

    if (isSupported1) {
      test();
    }
  });
});