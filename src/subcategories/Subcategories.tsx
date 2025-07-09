import { RNSceneNode } from "../types/RNSceneTypes";
import * as React from "react";
import Benchmark from "./benchmark/Benchmark";

const Subcategories: Array<RNSceneNode> = [
  {
    title: "Benchmark",
    description: "性能基线场景",
    render: function (): React.Node {
      return <Benchmark />;
    },
  },
];

export default Subcategories;