import React from "react";
import RootNavigator from "./src/navigation/RootNavigator";
import Toast from "./src/components/Toast";
import './global.css';
import { CustomConfirmAlertProvider } from "./src/components/Alert";

export default function App() {
  return (
    <>
      <RootNavigator />
      <Toast />
      <CustomConfirmAlertProvider />
    </>
  );
}
