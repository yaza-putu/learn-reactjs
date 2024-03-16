import * as React from "react";
import { RouterProvider} from "react-router-dom";
import route from "./routes/index.jsx";
import {Provider} from "react-redux";
import {store, persist} from "./store/index.jsx";
import {PersistGate} from 'redux-persist/integration/react'
import TextForwardProvider from "./context/TextForward.jsx";
function App() {
  return (
      <Provider store={store}>
        <PersistGate persistor={persist}>
            <TextForwardProvider>
                <RouterProvider router={route}></RouterProvider>
            </TextForwardProvider>
        </PersistGate>
      </Provider>
  )
}

export default App
