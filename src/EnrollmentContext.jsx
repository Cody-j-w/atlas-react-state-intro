import { createContext, useContext, useState } from "react";

const EnrollmentContext = createContext([]);

export const useEnrollmentContext = () => useContext(EnrollmentContext);

export function EnrollmentContextProvider({children}) {
    const [enrollment, setEnrollment] = useState([]);
    return <EnrollmentContext.Provider value={{enrollment, setEnrollment}}>{children}</EnrollmentContext.Provider>
}