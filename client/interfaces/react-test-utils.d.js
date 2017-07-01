import React from 'react';

declare type shallowRenderer = {
  render(el:React.Element):void;
  getRenderOutput():React.Element;
};

declare type Simulate = {
  change(el:HTMLElement): void;
  click(el:HTMLElement): void;
};

declare module 'react-addons-test-utils' {
  declare function createRenderer():shallowRenderer;
  declare function renderIntoDocument(el:React.Element):HTMLElement;
  declare var Simulate:Simulate;
}
