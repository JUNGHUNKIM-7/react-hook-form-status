import type { NextApiRequest, NextApiResponse } from "next";
import { TState } from "../../../src/helper/FormReducer";
import { insertObj } from "../../../src/utils/Mongodb";

// type RecursivePartial<T> = {
//   [P in keyof T]?: RecursivePartial<T[P]>;
// };

export default async function formHandler(
  req: NextApiRequest,
  res: NextApiResponse<Partial<TState["status"]>>
) {
  if (req.method === "POST") {
    const { name, email, date } = req.body;
    const dbObj = {
      name,
      email,
      date,
    };
    try {
      await insertObj("form", dbObj);
      res.status(201).json({ success: true, err: false });
    } catch (error) {
      res.status(500).json({ success:false, err: true });
    }
  }
}
