const config = require("../../shared/schoolPlans.json");

const FEATURE_IDS = config.features.map((feature) => feature.id);
const PLAN_IDS = Object.keys(config.plans);

const featuresFromIds = (ids = []) =>
  FEATURE_IDS.reduce((features, id) => {
    features[id] = ids.includes(id);
    return features;
  }, {});

const defaultFeatures = () => featuresFromIds(config.plans.basic);

const presetFeatures = (plan) =>
  Array.isArray(config.plans[plan]) ? featuresFromIds(config.plans[plan]) : null;

const cleanFeatures = (features = {}) =>
  FEATURE_IDS.reduce((clean, id) => {
    clean[id] = Boolean(features[id]);
    return clean;
  }, {});

const cleanPlanPayload = (body = {}, current = {}) => {
  let plan = PLAN_IDS.includes(body.plan) ? body.plan : current.plan || "basic";
  let features =
    body.features !== undefined
      ? cleanFeatures(body.features)
      : cleanFeatures(current.features || defaultFeatures());

  if (body.features !== undefined && body.plan === undefined) plan = "custom";

  const preset = presetFeatures(plan);
  if (preset) features = preset;

  return { plan, features };
};

module.exports = {
  FEATURE_IDS,
  PLAN_IDS,
  cleanFeatures,
  cleanPlanPayload,
  defaultFeatures,
  presetFeatures,
};
