import { createContext, ReactNode, useReducer, useContext } from "react";

const INIT = {
  form: {
    name: "",
    email: "",
    date: "",
  },
  status: {
    pending: false,
    success: false,
    err: false,
  },
  showModal: false,
};

export type TState = typeof INIT;

export enum EFORM {
  SETDATA = "setData",
  PENDING = "pending",
  SUCCESS = "success",
  ERR = "err",
  MODAL = "show Modal",
}

type TAction =
  | { type: EFORM.SETDATA; obj: TState["form"] }
  | { type: EFORM.PENDING }
  | { type: EFORM.SUCCESS }
  | { type: EFORM.ERR }
  | { type: EFORM.MODAL };

const formReducer = (state: TState, action: TAction) => {
  switch (action.type) {
    case EFORM.SETDATA:
      return {
        ...state,
        form: action.obj,
      };
    case EFORM.PENDING:
      return {
        ...state,
        status: {
          pending: !state.status.pending,
        },
      };
    case EFORM.SUCCESS:
      return {
        ...state,
        status: {
          pending: !state.status.pending,
          success: !state.status.success,
        },
      };
    case EFORM.ERR:
      return {
        ...state,
        status: {
          pending: !state.status.pending,
          err: !state.status.err,
        },
      };
    case EFORM.MODAL:
      return {
        ...state,
        showModal: !state.showModal,
      };

    default:
      return state;
  }
};

const FormReducer = () => {
  const [state, dispatch] = useReducer(formReducer, INIT);
  return {
    state,
    dispatch,
  };
};

const formContext = createContext<ReturnType<typeof FormReducer> | null>(null);

export const FormProvider = ({ children }: { children: ReactNode }) => (
  <formContext.Provider value={FormReducer()}>{children}</formContext.Provider>
);

export const UseFormReducer = () => useContext(formContext)!;
