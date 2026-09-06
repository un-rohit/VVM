import planConfig from "../../../shared/schoolPlans.json";

export const FEATURES = planConfig.features;
export const PLAN_FEATURES = planConfig.plans;
export const PLANS = Object.keys(planConfig.plans);

export const featuresForPlan = (plan) => {
  const ids = PLAN_FEATURES[plan];
  if (!Array.isArray(ids)) return null;
  return Object.fromEntries(FEATURES.map(({ id }) => [id, ids.includes(id)]));
};

export const cleanFeatures = (features = {}) =>
  Object.fromEntries(FEATURES.map(({ id }) => [id, Boolean(features[id])]));