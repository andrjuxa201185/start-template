export default (type, payload = {}) => {
  return {type, ...payload};
};

export const REQUEST = 'REQUEST';
export const SUCCESS = 'SUCCESS';
export const FAILURE = 'FAILURE';

export const createRequestActionTypes = (group, actions) =>
  Object.keys(actions).reduce((action, name) => {
    action[name] = [REQUEST, SUCCESS, FAILURE].reduce((act, type) => {
      act[type] = `${group}/${name}_${type}`;
      return act;
    }, {});
    return action;
  }, {});
