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
