/* eslint-disable */

declare type to = {
  equal(val:string|bool|number|null):void,
  have: {
    property(name: string, val: string):void,
    string(str:string): void;
  }
}

declare type expect = {
  not: {
    to: to
  },
  to: to
};

declare function describe (description:string, spec:Function): void;
declare function xit (description:string, test:Function): void;
declare function it (description:string, test:Function): void;

declare module 'chai' {
  declare function expect(val:string):expect;
}
