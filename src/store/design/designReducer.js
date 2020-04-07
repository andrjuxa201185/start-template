import {actionTypes} from './designActions';
import {REQUEST, SUCCESS, FAILURE} from '../../utils/action';
import Api from "../../service/api";

const {
  GET_DESIGN,
  GET_ALL_DESIGN,
  CLEAR_DESIGNS,
  SET_DESIGN,
  CLEAR_DESIGN,
} = actionTypes;

const initialState = {
  data: {
    id: undefined,
    name: '',
    preview: '',
    design: {
      background: {
        color: "",
        image: "",
      },
      tribute_header: {
        background: {
          color: "",
          image: "",
        },
        photo: {
          background: {
            color: "",
          },
          shadow: {
            color: "",
          },
        },
        general_data: {
          text: {
            color: "",
          },
        },
        tab_link: {
          text: {
            color: "",
          },
          underline: {
            color: "",
          },
        },
        social_link: {
          icon: {
            color: "",
          },
          background: {
            color: "",
          },
        },
      },
      tribute_body: {
        background: {
          color: "",
          image: "",
        },

        tab_header: {
          background: {
            color: "",
          },
          title: {
            text: {
              color: "",
            },
          },
          description: {
            text: {
              color: "",
            },
          },
        },
        tab_body: {
          section: {
            background: {
              color: "",
            },
            text: {
              color: "",
            },
            title: {
              text: {
                color: "",
              },
              background: {
                color: '',
              },
            },
            button: {
              active: {
                text: {
                  color: "",
                },
                background: {
                  color: "",
                },
              },
              inactive: {
                text: {
                  color: "",
                },
                background: {
                  color: "",
                },
              },
            },
            tile: {
              background: {
                color: '',
              },
              title: {
                text: {
                  color: '',
                },
                background: {
                  color: '',
                },
              },
            },
          },
        },
      },
      tribute_footer: {
        text: {
          color: "",
        },
        background: {
          color: "",
          image: '',
        },
      },
    },
  },
  designs: [],
  currentPage: null,
  countPage: null,
  prevPage: null,
  nextPage: null,
  dataStatus: Api.initialStatus,
};

export default function tributePage(state = initialState, action) {
  const {type, payload} = action;
  switch (type) {
    case GET_DESIGN[REQUEST]:
    case GET_ALL_DESIGN[REQUEST]:
      return {
        ...state,
        dataStatus: Api.requestStatus,
      };
    case GET_DESIGN[SUCCESS]:
    case SET_DESIGN:
      return {
        ...state,
        data: {
          ...state.data,
          id: payload.id,
          name: payload.name,
          preview: payload.preview,
          design: payload.object.tribute_page,
        },
        dataStatus: Api.successStatus,
      };
    case GET_ALL_DESIGN[SUCCESS]: {
      const {response, loadMore} = payload;
      const data = loadMore ? [...state.designs, ...response.data] : response.data;
      return {
        ...state,
        currentPage: response.current_page,
        countPage: response.last_page,
        prevPage: response.prev_page_url,
        nextPage: response.next_page_url,
        designs: data,
        dataStatus: Api.successStatus,
      };
    }
    case CLEAR_DESIGNS:
      return {
        ...state,
        designs: [],
        nextPage: null,
      };
    case CLEAR_DESIGN:
      return {
        ...initialState,
      };
    case GET_DESIGN[FAILURE]:
    case GET_ALL_DESIGN[FAILURE]:
      return {
        ...state,
        dataStatus: Api.failStatus,
      };
    default:
      return state;
  }
}
