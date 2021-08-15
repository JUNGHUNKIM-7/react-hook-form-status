import { createContext, ReactNode, useReducer, useContext } from "react";
import { TState, TAction, EFORM, INIT } from "./FormReducerInit";

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

export const ProviderFormContext = ({ children }: { children: ReactNode }) => (
  <formContext.Provider value={FormReducer()}>{children}</formContext.Provider>
);

export const UseFormReducer = () => useContext(formContext)!;
