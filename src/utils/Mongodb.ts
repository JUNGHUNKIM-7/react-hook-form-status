import { MongoClient } from "mongodb";
import { TState } from "../helper/formReducer/FormReducerInit";

const client = MongoClient.connect(`${process.env.URL}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export const connected = async () => {
  if (!(await client).isConnected()) {
    await (await client).connect();
  }
  try {
    const db = (await client).db(`${process.env.DB}`);
    return { db, client };
  } catch (error) {
    throw Error(error || "connection Err");
  }
};

export const insertObj = async (collection: string, obj: TState["form"]) => {
  try {
    const { db } = await connected();
    await db.collection(collection).insertOne(obj);
  } catch (error) {
    throw Error(error || "insert data Failed");
  }
};
