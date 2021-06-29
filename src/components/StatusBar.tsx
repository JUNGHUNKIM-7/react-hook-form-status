import { useEffect } from "react";
import { EFORM, UseFormReducer } from "../helper/FormReducer";
import { useRouter } from "next/router";

export default function StatusBar() {
  const { state, dispatch } = UseFormReducer();
  const router = useRouter();

  useEffect(() => {
    if (state.status.success || state.status.err) {
      const closeModal = setTimeout(() => {
        dispatch({ type: EFORM.MODAL });
      }, 2000);
      return () => clearTimeout(closeModal);
    }
  }, [state.status.success, state.status.err, dispatch]);

  useEffect(() => {
    if (state.status.success || state.status.err) {
      const redirect = setTimeout(() => {
        router.push({
          pathname: "/",
        });
      }, 3000);
      return () => clearTimeout(redirect);
    }
  }, [state.status.success, state.status.err, router]);

  return (
    <>
      {state.showModal ? (
        state.status.pending ? (
          <div className="bg-yellow-500">{state.form.name} is pending</div>
        ) : state.status.success ? (
          <div className="bg-green-500">success</div>
        ) : (
          state.status.err && <div className="bg-red-500">err</div>
        )
      ) : null}
    </>
  );
}
