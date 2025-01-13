import logo from "./assets/logo.png";
import { useEnrollmentContext } from "./EnrollmentContext";

export default function Header() {
  const {enrollment, setEnrollment} = useEnrollmentContext()
  return (
    <div className="header">
      <img src={logo} alt="logo" className="logo" />
      <div className="enrollment">Classes Enrolled: {enrollment.length}</div>
    </div>
  );
}
