import { useState, useEffect } from "react";


export default function SchoolCatalog() {
  const [classes, setClasses] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredClasses, setFilteredClasses] = useState([]);
  const getData = () => {
    fetch('api/courses.json',
      {headers:{
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }}
    )
    .then((res) => res.json())
    .then((data) => {
      setClasses(data);
      setFilteredClasses(data);
    })
  }
  useEffect(() => {
    getData();
  }, []);
  const handleSearchInput = (e) => {

    const searchVal = e.target.value;
    setSearch(searchVal);

    const filteredItems = classes.filter((item) => 
      item.courseName.toLowerCase().includes(searchVal.toLowerCase()) || item.courseNumber.toLowerCase().includes(searchVal.toLowerCase())
    )
    setFilteredClasses(filteredItems);
  }
  return (
    <div className="school-catalog">
      <h1>School Catalog</h1>
      <input type="text" value={search} onChange={handleSearchInput} placeholder="Search" />
      <table>
        <thead>
          <tr>
            <th>Trimester</th>
            <th>Course Number</th>
            <th>Courses Name</th>
            <th>Semester Credits</th>
            <th>Total Clock Hours</th>
            <th>Enroll</th>
          </tr>
        </thead>
        <tbody>
          {filteredClasses.map(course => <tr key={course.courseNumber}>
            <td>{course.trimester}</td>
            <td>{course.courseNumber}</td>
            <td>{course.courseName}</td>
            <td>{course.semesterCredits}</td>
            <td>{course.totalClockHours}</td>
            <td>
              <button>Enroll</button>
            </td>
            </tr>)}

        </tbody>
      </table>
      <div className="pagination">
        <button>Previous</button>
        <button>Next</button>
      </div>
    </div>
  );
}
