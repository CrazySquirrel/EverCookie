"use strict";

declare let beforeEach: any;
declare let afterEach: any;
declare let describe: any;
declare let it: any;
declare let expect: any;
declare let require: any;

import EverCookieClass from "../lib/EverCookie";
let EverCookie = new EverCookieClass();

describe("EverCookie", () => {

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
                    EverCookie.regValidKey.test(x2)
                ) &&
                (
                    typeof x3 === "string" &&
                    EverCookie.regValidKey.test(x3)
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
      let setItem1 = EverCookie.setItem.apply(EverCookie, set.params);

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
        let getItem1 = EverCookie.getItem.apply(EverCookie, set.params.slice(0, 2));

        expect(typeof(getItem1)).toEqual("string");
        expect(getItem1).toEqual(set.params[2]);

        /**
         * Get keys
         */
        let getKeys1 = EverCookie.getKeys.apply(EverCookie, set.params.slice(0, 1));

        expect(getKeys1).toBeArray();

        expect(getKeys1).toContain(set.params[1]);

        /**
         * Remove item
         */
        let removeItem1 = EverCookie.removeItem.apply(EverCookie, set.params.slice(0, 2));

        getKeys1 = EverCookie.getKeys.apply(EverCookie, set.params.slice(0, 1));

        expect(typeof(removeItem1)).toEqual("boolean");

        expect(removeItem1).toEqual(true);
        expect(getKeys1).not.toContain(set.params[1]);

        /**
         * Clean items
         */
        setItem1 = EverCookie.setItem.apply(EverCookie, set.params);
        getKeys1 = EverCookie.getKeys.apply(EverCookie, set.params.slice(0, 1));

        let clear1 = EverCookie.clear.apply(EverCookie, set.params.slice(0, 1));

        let getKeys2 = EverCookie.getKeys.apply(EverCookie, set.params.slice(0, 1));

        expect(typeof(clear1)).toEqual("boolean");

        expect(clear1).toEqual(true);
        expect(getKeys2).not.toContain(set.params[1]);
      }
    }
  };

  it("EverCookie", () => {
    expect(typeof(EverCookieClass)).toEqual("function");
    expect(typeof(EverCookie)).toEqual("object");
  });

  it([
    "EverCookie.isSupported",
    "EverCookie.setItem",
    "EverCookie.getItem",
    "EverCookie.removeItem",
    "EverCookie.getKeys",
    "EverCookie.clear"
  ].join("\r\n"), () => {
    let isSupported1 = EverCookie.isSupported();

    expect(typeof(isSupported1)).toEqual("boolean");

    if (isSupported1) {
      test();
    }
  });
});