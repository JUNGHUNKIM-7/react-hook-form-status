import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { UseFormReducer } from "../helper/formReducer/FormReducer";
import { TState } from "../helper/formReducer/FormReducerInit";
import { EFORM } from "../helper/formReducer/FormReducerInit";
import StatusBar from "./StatusBar";

const utc = new Date().getTime() + new Date().getTimezoneOffset() * 60 * 1000;
const KR_TIME_DIFF = 9 * 60 * 60 * 1000;

export default function FormControl() {
  const { dispatch } = UseFormReducer();
  const [formStatus, setFormStatus] = useState<Partial<TState["status"]>>({});
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<TState["form"]>();

  // data
  // {name: "test", email: "test@gmail.com", date: "string"}
  const onSubmit: SubmitHandler<TState["form"]> = async (data) => {
    //* reducer way?
    dispatch({ type: EFORM.MODAL });
    dispatch({ type: EFORM.PENDING });
    dispatch({ type: EFORM.SETDATA, obj: data });
    //* direct way?
    try {
      const res = await fetch("/api/form", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(data),
      });
      dispatch({ type: EFORM.SUCCESS });
      //! Form Debugging
      const status = await res.json();
      setFormStatus(status);
    } catch (error) {
      dispatch({ type: EFORM.ERR });
      throw Error(error || "something is wrong");
    }
  };

  //! Form Debugging
  // console.log(watch("form"));

  return (
    <>
      <StatusBar status={formStatus} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("name", {
            required: "name is required",
            minLength: { value: 4, message: "length should be 4" },
          })}
          placeholder="name"
        />

        {errors.name && <p>{errors.name?.message}</p>}

        <input
          {...register("email", {
            required: "email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "double check your email",
            },
          })}
          placeholder="email"
        />

        {errors.email ? (
          <p>{errors.email?.message}</p>
        ) : (
          errors.email?.type === "pattern" && <p>{errors.email?.message}</p>
        )}

        <input
          className="hidden"
          defaultValue={new Date(utc + KR_TIME_DIFF).toString()}
          {...register("date")}
        />

        <input type="submit" />
      </form>
    </>
  );
}
