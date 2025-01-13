import { useEnrollmentContext } from "./EnrollmentContext";

export default function ClassSchedule() {
  const {enrollment, setEnrollment} = useEnrollmentContext();
  const dropCourse = (droppedCourse) => {
    const newEnrollment = enrollment.filter((course) => course !== droppedCourse);
    setEnrollment(newEnrollment);
  }
  return (
    <div className="class-schedule">
      <h1>Class Schedule</h1>
      <table>
        <thead>
          <tr>
            <th>Course Number</th>
            <th>Course Name</th>
            <th>Drop</th>
          </tr>
        </thead>
        <tbody>
          {enrollment.map(course => <tr key={course.courseNumber}>
            <td>{course.courseNumber}</td>
            <td>{course.courseName}</td>
            <td>
              <button onClick={() => dropCourse(course)}>Drop</button>
            </td>
            </tr>)}
        </tbody>
      </table>
    </div>
  );
}
