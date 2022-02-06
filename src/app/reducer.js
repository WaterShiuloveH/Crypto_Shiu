export const UPDATE_LANG = "UPDATE_LANG";

export const Langs = {
  EN: "English",
  TW: "中文",
};

export const INITIAL_STATE = { lang: Langs.TW };

// action creators

export const updateLang = (payload) => ({
  type: UPDATE_LANG,
  payload,
});

export const langReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_LANG:
      return { ...state, lang: action.payload };
    default:
      return state;
  }
};
