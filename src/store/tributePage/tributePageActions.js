import action, {
  createRequestActionTypes,
  REQUEST, SUCCESS, FAILURE,
} from '../../utils/action';

export const actionTypes = {
  CLEAR_TRIBUTE: 'CLEAR_TRIBUTE',
  ...createRequestActionTypes('TRIBUTE_PAGE', {
    GET: 'GET',
    GET_GENERAL: 'GET_GENERAL',
    IS_PUBLISHED: 'IS_PUBLISHED',
    CREATE: 'CREATE',
    UPDATE_GENERAL: 'UPDATE_GENERAL',
    SAVE_PHOTO: 'SAVE_PHOTO',
    GET_PHOTO: 'GET_PHOTO',
    GET_URL: 'GET_URL',
    SET_URL: 'SET_URL',
    GET_TAB_HOME: 'GET_TAB_HOME',
    SET_TABS_TITLES: 'SET_TABS_TITLES',
    UPDATE_SETTING: 'UPDATE_SETTING',
    SET_PASSWORD: 'SET_PASSWORD',
    GET_AUTHOR: 'GET_AUTHOR',
    GET_EDITORS: 'GET_EDITORS',
    ADD_EDITOR: 'ADD_EDITOR',
    DELETE_EDITOR: 'DELETE_EDITOR',
    SET_DESIGN: 'SET_DESIGN',
    SHARE_SMS: 'SHARE_SMS',
    SHARE_EMAIL: 'SHARE_EMAIL',
  }),
};

export const getTributePage = {
  request: data => action(actionTypes.GET[REQUEST], {data}),
  success: payload => action(actionTypes.GET[SUCCESS], {payload}),
  failure: () => action(actionTypes.GET[FAILURE]),
};

export const clearTributePage = () => action(actionTypes.CLEAR_TRIBUTE);

export const getGeneralData = {
  request: data => action(actionTypes.GET_GENERAL[REQUEST], {data}),
  success: payload => action(actionTypes.GET_GENERAL[SUCCESS], {payload}),
  failure: () => action(actionTypes.GET_GENERAL[FAILURE]),
};

export const setDesign = {
  request: data => action(actionTypes.SET_DESIGN[REQUEST], {data}),
  success: payload => action(actionTypes.SET_DESIGN[SUCCESS], {payload}),
  failure: () => action(actionTypes.SET_DESIGN[FAILURE]),
};

export const setIsPublished = {
  request: data => action(actionTypes.IS_PUBLISHED[REQUEST], {data}),
  success: payload => action(actionTypes.IS_PUBLISHED[SUCCESS], {payload}),
  failure: () => action(actionTypes.IS_PUBLISHED[FAILURE]),
};

export const createTributePage = {
  request: data => action(actionTypes.CREATE[REQUEST], {data}),
  success: payload => action(actionTypes.CREATE[SUCCESS], {payload}),
  failure: () => action(actionTypes.CREATE[FAILURE]),
};

export const updateTributePage = {
  request: (data, onSuccess) => action(actionTypes.UPDATE_GENERAL[REQUEST], {
    data,
    onSuccess,
  }),
  success: payload => action(actionTypes.UPDATE_GENERAL[SUCCESS], {payload}),
  failure: () => action(actionTypes.UPDATE_GENERAL[FAILURE]),
};

export const savePhoto = {
  request: data => action(actionTypes.SAVE_PHOTO[REQUEST], {data}),
  success: payload => action(actionTypes.SAVE_PHOTO[SUCCESS], {payload}),
  failure: () => action(actionTypes.SAVE_PHOTO[FAILURE]),
};

export const getPhoto = {
  request: data => action(actionTypes.GET_PHOTO[REQUEST], {data}),
  success: payload => action(actionTypes.GET_PHOTO[SUCCESS], {payload}),
  failure: () => action(actionTypes.GET_PHOTO[FAILURE]),
};

export const getTabHome = {
  request: data => action(actionTypes.GET_TAB_HOME[REQUEST], {data}),
  success: payload => action(actionTypes.GET_TAB_HOME[SUCCESS], {payload}),
  failure: () => action(actionTypes.GET_TAB_HOME[FAILURE]),
};

export const setTabsTitles = {
  request: (data, onSuccess) => action(actionTypes.SET_TABS_TITLES[REQUEST], {
    data,
    onSuccess,
  }),
  success: payload => action(actionTypes.SET_TABS_TITLES[SUCCESS], {payload}),
  failure: () => action(actionTypes.SET_TABS_TITLES[FAILURE]),
};

export const getUrl = {
  request: data => action(actionTypes.GET_URL[REQUEST], {data}),
  success: payload => action(actionTypes.GET_URL[SUCCESS], {payload}),
  failure: () => action(actionTypes.GET_URL[FAILURE]),
};

export const setUrl = {
  request: (data, onSuccess) => action(actionTypes.SET_URL[REQUEST], {
    data,
    onSuccess,
  }),
  success: payload => action(actionTypes.SET_URL[SUCCESS], {payload}),
  failure: () => action(actionTypes.SET_URL[FAILURE]),
};

export const updateSetting = {
  request: data => action(actionTypes.UPDATE_SETTING[REQUEST], {data}),
  success: payload => action(actionTypes.UPDATE_SETTING[SUCCESS], {payload}),
  failure: () => action(actionTypes.UPDATE_SETTING[FAILURE]),
};

export const setPagePassword = {
  request: data => action(actionTypes.SET_PASSWORD[REQUEST], {data}),
  success: payload => action(actionTypes.SET_PASSWORD[SUCCESS], {payload}),
  failure: () => action(actionTypes.SET_PASSWORD[FAILURE]),
};

export const getTributeAuthor = {
  request: data => action(actionTypes.GET_AUTHOR[REQUEST], {data}),
  success: payload => action(actionTypes.GET_AUTHOR[SUCCESS], {payload}),
  failure: () => action(actionTypes.GET_AUTHOR[FAILURE]),
};

export const getTributeEditors = {
  request: data => action(actionTypes.GET_EDITORS[REQUEST], {data}),
  success: payload => action(actionTypes.GET_EDITORS[SUCCESS], {payload}),
  failure: () => action(actionTypes.GET_EDITORS[FAILURE]),
};

export const addPageEditor = {
  request: (data, onSuccess) => action(actionTypes.ADD_EDITOR[REQUEST], {
    data,
    onSuccess,
  }),
  success: payload => action(actionTypes.ADD_EDITOR[SUCCESS], {payload}),
  failure: () => action(actionTypes.ADD_EDITOR[FAILURE]),
};

export const deletePageEditor = {
  request: (data, onSuccess) => action(actionTypes.DELETE_EDITOR[REQUEST], {
    data,
    onSuccess,
  }),
  success: payload => action(actionTypes.DELETE_EDITOR[SUCCESS], {payload}),
  failure: () => action(actionTypes.DELETE_EDITOR[FAILURE]),
};

export const shareSms = {
  request: (data, onSuccess) => action(actionTypes.SHARE_SMS[REQUEST], {
    data,
    onSuccess,
  }),
  success: payload => action(actionTypes.SHARE_SMS[SUCCESS], {payload}),
  failure: () => action(actionTypes.SHARE_SMS[FAILURE]),
};

export const shareEmail = {
  request: (data, onSuccess) => action(actionTypes.SHARE_EMAIL[REQUEST], {
    data,
    onSuccess,
  }),
  success: payload => action(actionTypes.SHARE_EMAIL[SUCCESS], {payload}),
  failure: () => action(actionTypes.SHARE_EMAIL[FAILURE]),
};

