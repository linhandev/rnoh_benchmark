import * as React from "react";
import {
  BackHandler,
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";
import {
  RNSceneNavigationActionsType,
  RNSceneNavigationReducer,
} from "./utils/RNSceneNavigationReducer";
import { RNSceneNavigationState } from "./types/RNSceneTypes";
import Subcategories from "./subcategories/Subcategories";

const RNDiplomacyApp = (): React.Node => {
  const initialNavigationState: RNSceneNavigationState = {
    activeModuleTitle: null,
    levelNumber: 0,
  };

  const [state, dispatch] = React.useReducer(
    RNSceneNavigationReducer,
    initialNavigationState
  );

  const { activeModuleTitle, levelNumber } = state;

  const handleBackPress = React.useCallback(() => {
    if (levelNumber) {
      dispatch({
        type: RNSceneNavigationActionsType.BACK_BUTTON_PRESS,
      });
    }
  }, [dispatch, levelNumber]);

  //Setup hardware back button press listener
  React.useEffect(() => {
    const handleHardwareBackPress = () => {
      if (levelNumber) {
        handleBackPress();
        return true;
      }
      return false;
    };

    BackHandler.addEventListener("hardwareBackPress", handleHardwareBackPress);

    return () => {
      BackHandler.removeEventListener(
        "hardwareBackPress",
        handleHardwareBackPress
      );
    };
  }, [levelNumber, handleBackPress]);

  const activeSceneModule =
    levelNumber > 0
      ? Subcategories.find((e) => e.title === activeModuleTitle)
      : null;
  const activeLevelList = levelNumber == 0 ? Subcategories : null;
  const navigationTitle = levelNumber == 0 ? "场景列表" : null;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        {activeSceneModule != null ? (
          <activeSceneModule.render />
        ) : (
          <View>
            <View style={styles.navigationTitleCenter}>
              <Text style={styles.navigationTitle}>{navigationTitle}</Text>
            </View>
            <FlatList
              data={activeLevelList}
              renderItem={({ item }) => (
                <View style={styles.row}>
                  <TouchableHighlight
                    underlayColor={"#F7F7EC"}
                    onPress={() => {
                      switch (levelNumber) {
                        case 0:
                          dispatch({
                            type: RNSceneNavigationActionsType.MODULE_ITEM_PRESS,
                            data: { title: item.title },
                          });
                          break;
                        default:
                          break;
                      }
                    }}
                  >
                    <View>
                      <Text style={styles.titleText}>{item.title}</Text>
                      <Text style={styles.descriptionText}>
                        {item.description}
                      </Text>
                    </View>
                  </TouchableHighlight>
                </View>
              )}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default RNDiplomacyApp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    elevation: 5,
    backgroundColor: "#F3F8FF",
    marginVertical: 6,
    marginHorizontal: 15,
  },
  navigationTitleCenter: {
    alignItems: "center",
  },
  navigationTitle: {
    margin: 4,
    fontSize: 19,
    fontWeight: "600",
    textAlign: "center",
  },
  titleText: {
    fontSize: 20,
    fontWeight: "400",
    marginBottom: 5,
    marginTop: 10,
    marginHorizontal: 10,
  },
  descriptionText: {
    fontSize: 12,
    lineHeight: 15,
    marginBottom: 11,
    marginHorizontal: 10,
    color: "#3c3c4399",
  },
});
