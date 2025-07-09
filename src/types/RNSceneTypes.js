import * as React from "react";

export type RNSceneNode = $ReadOnly<{|
  title: string,
  description?: string,
  render: () => React.Node,
  pages: Array<RNSceneNode>,
|}>;

export type RNSceneNavigationState = {
  activeModuleTitle: null | string,
  levelNumber: null | number,
};
