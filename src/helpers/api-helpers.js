import Model from '../model-view';

const test = (model) => {
  model.data = JSON.stringify(['HI']);
  console.log('model.data is', model.data);
  return model;
};

const helpers = {
  test,
};

export default helpers;
