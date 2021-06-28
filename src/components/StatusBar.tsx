import { useEffect } from "react";
import { EFORM, UseFormReducer } from "../helper/FormReducer";

export default function StatusBar() {
  const { state, dispatch } = UseFormReducer();
  useEffect(() => {
    if (state.status.success || state.status.err) {
      const closeModal = setTimeout(() => {
        dispatch({ type: EFORM.MODAL });
      }, 2000);
      return () => clearTimeout(closeModal);
    }
  }, [state.status.success, state.status.err, dispatch]);

  return (
    <>
      {state.showModal ? (
        state.status.pending ? (
          <div className="bg-yellow-500">pending</div>
        ) : state.status.success ? (
          <div className="bg-green-500">success</div>
        ) : (
          <div className="bg-red-500">err</div>
        )
      ) : null}
    </>
  );
}
