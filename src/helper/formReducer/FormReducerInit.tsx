export const INIT = {
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

export type TAction =
  | { type: EFORM.SETDATA; obj: TState["form"] }
  | { type: EFORM.PENDING }
  | { type: EFORM.SUCCESS }
  | { type: EFORM.ERR }
  | { type: EFORM.MODAL };