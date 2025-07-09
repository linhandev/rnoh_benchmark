import { RNSceneNavigationState } from "../types/RNSceneTypes";

export const RNSceneNavigationActionsType = {
  BACK_BUTTON_PRESS: "BACK_BUTTON_PRESS",
  MODULE_ITEM_PRESS: "MODULE_ITEM_PRESS",
};

export const RNSceneNavigationReducer = (
  state: RNSceneNavigationState,
  action: { type: $Keys<typeof RNSceneNavigationActionsType>; data?: any }
): RNSceneNavigationState => {
  const { data: { title = null } = {} } = action;
  switch (action.type) {
    case RNSceneNavigationActionsType.MODULE_ITEM_PRESS:
      return { ...state, levelNumber: 1, activeModuleTitle: title };
    case RNSceneNavigationActionsType.BACK_BUTTON_PRESS:
      const tempLevelNumber = state.levelNumber;
      return {
        ...state,
        levelNumber: tempLevelNumber > 0 ? tempLevelNumber - 1 : 0,
        activeModuleTitle: null,
      };
    default:
      throw new Error(`Invalid action type ${action.type}`);
  }
};
