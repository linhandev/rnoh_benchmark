import React from "react";
import { useState } from "react";
import { ScrollView } from "react-native";
import ThousandViews from "./scenarios/ThousandsViews";
import ThousandsTexts from "./scenarios/ThousandsTexts";
import Button from "./Button";
import ThousandsImages from "./scenarios/ThousandsImages";
enum Scenarios {
  Views1500,
  Text1500,
  Image1500,
}
function Benchmark(): JSX.Element {
  const [scenario, setScenario] = useState<Scenarios | null>(null);
  let perfTest = null;
  if (scenario != null) {
    switch (scenario) {
      case Scenarios.Views1500:
        perfTest = <ThousandViews markerName="views1500" count={1500} />;
        break;
      case Scenarios.Text1500:
        perfTest = <ThousandsTexts markerName="texts1500" count={1500} />;
        break;
      case Scenarios.Image1500:
        perfTest = <ThousandsImages markerName="images1500" count={1500} />;
        break;
    }
  }
  return (
    <ScrollView
      contentContainerStyle={{ alignItems: "center" }}
      automaticallyAdjustContentInsets={true}
      removeClippedSubviews={true}
    >
      {scenario === null ? (
        <>
          <Button
            onPress={(timestamp) => {
              setScenario(Scenarios.Views1500);
            }}
            title="Render 1500 <View />"
          />
          <Button
            onPress={(timestamp) => {
              setScenario(Scenarios.Text1500);
            }}
            title="Render 1500 <Text />"
          />
          <Button
            onPress={(timestamp) => {
              setScenario(Scenarios.Image1500);
            }}
            title="Render 1500 <Image />"
          />
        </>
      ) : null}
      {scenario != null ? (
        <>
          <Button
            onPress={() => {
              setScenario(null);
            }}
            title="Reset"
          />
          {perfTest}
        </>
      ) : null}
    </ScrollView>
  );
}
export default Benchmark;
