import { Suspense, createContext, lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "flowbite";
import PageLoader from "@/components/PageLoader";
import React from "react";
import { persistStore } from "redux-persist";
import { store } from "./store/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { AppContextType } from "./global/contexts";

type Props = {
  assetMap?: {
    "styles.css": string;
    "main.js": string;
    manifest?: string;
    "vite-plugin-pwa:register-sw"?: string;
    "additional-styles": string[];
    "additional-jss": string[];
    initialContentMap: {
      title: string;
      description?: string;
      "hello-message"?: string;
    };
    baseUrl: string;
    initialI18nStore?: {}; //to be used with the middleware
    initialLanguage?: string;
    clientFirstAcceptLanguage?: string;
  };
};

//create a context to be used to pass app props down the component hierarcy, as the need arises.
export const AppContext = createContext<AppContextType>(null);

const App: React.FC<Props> = ({ assetMap }) => {
  // const { i18n } = useTranslation();

  // const changeI18nLanguageToClientPreferred = async () => {
  //   if (i18n.language != assetMap?.clientFirstAcceptLanguage)
  //     await i18n.changeLanguage(assetMap?.clientFirstAcceptLanguage);
  // };
  // useEffect(() => {
  //   //check if assetMap sent in production mode; if not, redirect to a proper ssr endpoint.
  //   console.log(assetMap)
  //   if (!DEV_MODE) {
  //     //attempt to change language here to locale
  //     changeI18nLanguageToClientPreferred();
  //     if (!assetMap) {
  //       window.location.href = "/"; //simulate a mouse click
  //     }
  //   }
  // });

  const appBody = () => {
    //can be used at DEV time and PROD time

    //Default settings on dev mode
    let baseUrl = "/";
    let title = "Hello World";

    if (assetMap) {
      //prod mode. Sent by ssr endpoint.
      baseUrl = assetMap.baseUrl;
      title = assetMap.initialContentMap.title!;
    }
    console.log(title, baseUrl);
    //console.log(`assetMap in AppWithNavDemo = ${JSON.stringify(assetMap)}`)

    //create a react query client at the top
    // Create a client
    // const queryClient = new QueryClient();

    let persister = persistStore(store);

    return (
      // <AppContext.Provider value={{ baseUrl }}>
      //   <QueryClientProvider client={queryClient}>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persister}>
              <Router>
                <Routes>
                  <Route
                    path="/"
                    element={
                      <Suspense fallback={<PageLoader />}>
                        {React.createElement(
                          lazy(() => import("@/pages/Home/HomePage"))
                        )}
                      </Suspense>
                    }
                  />
                  <Route
                    path="/login"
                    element={
                      <Suspense fallback={<PageLoader />}>
                        {React.createElement(
                          lazy(() => import("@/pages/Auth/Login"))
                        )}
                      </Suspense>
                    }
                  />
                   <Route
                    path="/registration"
                    element={
                      <Suspense fallback={<PageLoader />}>
                        {React.createElement(
                          lazy(() => import("@/pages/Auth/Registration"))
                        )}
                      </Suspense>
                    }
                  />
                  <Route
                    path="/dashboard"
                    element={
                      <Suspense fallback={<PageLoader />}>
                        {React.createElement(
                          lazy(
                            () =>
                              import("@/pages/Users/UserDashboard")
                          )
                        )}
                      </Suspense>
                    }
                  />
                  <Route
                    path="/pantry"
                    element={
                      <Suspense fallback={<PageLoader />}>
                        {React.createElement(
                          lazy(
                            () =>
                              import("@/pages/Users/Pantry")
                          )
                        )}
                      </Suspense>
                    }
                  />
                  <Route
                    path="/settings"
                    element={
                      <Suspense fallback={<PageLoader />}>
                        {React.createElement(
                          lazy(() => import("@/pages/Users/SettingsPage"))
                        )}
                      </Suspense>
                    }
                  />

                  <Route
                    path="*"
                    element={
                      <Suspense fallback={<PageLoader />}>
                        {React.createElement(
                          lazy(() => import("@/pages/Errors/NotFound"))
                        )}
                      </Suspense>
                    }
                  />
                </Routes>
              </Router>
            </PersistGate>
          </Provider>
      //   </QueryClientProvider>
      // </AppContext.Provider>
    );
  };

  //Prepare extra css if any
  const additionStyles = () => {
    if (assetMap) {
      let _additionStyles = assetMap["additional-styles"].map(
        (additionalStyle) => {
          return <link rel="stylesheet" href={additionalStyle} />;
        }
      );
      return _additionStyles;
    }
  };

  //Prepare extra Jss if any
  const additionalJss = () => {
    if (assetMap) {
      let _additionalJss = assetMap["additional-jss"].map((additionalJs) => {
        return <script src={additionalJs} />;
      });
      return _additionalJss;
    }
  };

  //compose conditional output
  const output = () => {
    if (assetMap) {
      //send whole document if ssr
      return (
        <html>
          <head>
            <link rel="stylesheet" href={assetMap["styles.css"]} />
            {/* additional Styles if any */}
            {additionStyles()}

            {assetMap["manifest"] && (
              <link rel="manifest" href={assetMap["manifest"]}></link>
            )}
            {assetMap["vite-plugin-pwa:register-sw"] && (
              <script
                id="vite-plugin-pwa:register-sw"
                src="/registerSW.js"
              ></script>
            )}
            {assetMap.initialContentMap && (
              <title>{assetMap.initialContentMap["title"]}</title>
            )}
          </head>
          {appBody()}
          {/* additional Jss if any*/}
          {additionalJss()}
        </html>
      );
    } else {
      return (
        <>
          {appBody()} 
          {/* //only the body in dev mode. CSS should be available at
          dev mode with createRoot */}
        </>
      );
    }
  };
  return <>{output()}</>;
};

export default App;
