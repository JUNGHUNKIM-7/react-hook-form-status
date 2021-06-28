import { GetStaticProps } from "next";
import CustomForm from "../src/components/CustomForm";
import { FormProvider } from "../src/helper/FormReducer";
import { connected } from "../src/utils/Mongodb";

export default function Home({ isConnected }) {
  //! db connected check
  // console.log(isConnected);
  return (
    <FormProvider>
      <CustomForm />
    </FormProvider>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  // const data = await (await fetch("http://localhost:3000/api/hello")).json();
  const { client } = await connected();
  const isConnected = (await client).isConnected();

  return {
    props: {
      isConnected,
    },
    //revalidate:
  };
};
