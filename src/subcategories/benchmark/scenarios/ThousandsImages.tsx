import React from "react";
import { Image } from "react-native";
import MeasureComponent from "../MeasureComponent";
export default function ThousandsImages(props: {
  markerName: string;
  count: number;
}): JSX.Element {
  const views = Array.from(Array(props.count).keys()).map((element, index) => {
    return (
      <Image
        style={{ width: 100, height: 100, margin: 5 }}
        source={{
          uri: "https://res6.vmallres.com/pimages/uomcdn/CN/pms/202309/gbom/6942103109584/800_800_D5053BB8A6FECB4906EC5869E78CEEC5mp.png",
        }}
      />
    );
  });
  return (
    <MeasureComponent
      title={`${props.count} <Image />`}
      markerName={props.markerName}
    >
      {views}
    </MeasureComponent>
  );
}
