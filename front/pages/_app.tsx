import { AppProps } from "next/app";
import Apollo from "../src/components/apollo";
import Layout from "../src/components/layout";

export default function App({ Component }: AppProps) {



  return (
    <div>
      <Apollo>
        <>
          <Layout>
            <Component />
          </Layout>
        </>
      </Apollo>
    </div>
  )
}
