import SchoolCatalog from "./SchoolCatalog";
import Header from "./Header";
import ClassSchedule from "./ClassSchedule";
import {EnrollmentContextProvider} from './EnrollmentContext';
import { useState } from "react";

export default function App() {
  return (
    <div>
      <EnrollmentContextProvider>
        <Header />
        <SchoolCatalog />
        <ClassSchedule />
      </EnrollmentContextProvider>
    </div>
  );
}
