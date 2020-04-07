import action from '../../utils/action';

export const actionTypes = {
  SHOW_ALERT: 'SHOW_ALERT',
  HIDE_ALERT: 'HIDE_ALERT',
};

export const showAlert = payload => action(actionTypes.SHOW_ALERT, {payload});
export const hideAlert = () => {
  return action(actionTypes.HIDE_ALERT);
};
