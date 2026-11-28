/**
 * A single shared value the feature demos write and the scene reads: how
 * urgent the thing on screen is, 0 to 1. The disk spins faster and burns
 * brighter as it rises, so the scene answers the demo instead of sitting
 * behind it.
 */
export const sceneEnergy = { value: 0 };

export function setSceneEnergy(value: number) {
  sceneEnergy.value = Math.min(1, Math.max(0, value));
}

/**
 * Wide screens: the ring that frames the pinned demo. The features section
 * measures its own layout and writes it here; the scene draws the hole to it.
 */
export const sceneStage = { on: false, cx: 0, cy: 0, r: 0, guardX: 0 };
