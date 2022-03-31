import type { AppProps } from 'next/app';
import { ThemeProvider } from "styled-components";
import { Theme } from "@/styled/theme"; 
import { Layout } from '@/page-components/layout';
import { Provider } from '@/store/tracked';
import { MotionConfig } from "framer-motion"; 
import { AnimatePresence } from 'framer-motion';


function MyApp({ Component, pageProps, router }: AppProps) {
  
  return (
    <ThemeProvider theme={Theme}>
      <MotionConfig reducedMotion="user">
        <Layout>
          <Provider>
            <AnimatePresence exitBeforeEnter>
              <Component {...pageProps} key={router.route}/>
            </AnimatePresence>
          </Provider>
        </Layout>
      </MotionConfig>
    </ThemeProvider>
  );
}


export default MyApp
