import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "flowbite";
import PageLoader from "@/components/PageLoader";
import React from "react";
import { persistStore } from "redux-persist";
import { store } from "./store/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { HelmetProvider } from "react-helmet-async";

const App: React.FC = () => {
  
    let persister = persistStore(store);
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persister}>
          <HelmetProvider>
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
                  path="/pantry"
                  element={
                    <Suspense fallback={<PageLoader />}>
                      {React.createElement(
                        lazy(() => import("@/pages/Pantry/Pantry"))
                      )}
                    </Suspense>
                  }
                />
                <Route
                  path="/dashboard"
                  element={
                    <Suspense fallback={<PageLoader />}>
                      {React.createElement(
                        lazy(() => import("@/pages/Users/UserDashboard"))
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
          </HelmetProvider>
        </PersistGate>
      </Provider>
    );
  };


export default App;
