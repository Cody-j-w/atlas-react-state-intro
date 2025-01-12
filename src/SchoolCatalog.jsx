import { useState, useEffect } from "react";


export default function SchoolCatalog() {
  const [classes, setClasses] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredClasses, setFilteredClasses] = useState([]);
  const [sort, setSort] = useState('Trimester');
  const [direction, setDirection] = useState('asc');
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

  const handleSorting = (field) => {
    const sortOrder = sort === field && direction === 'asc' ? 'desc' : 'asc';
    setSort(field);
    setDirection(sortOrder);
  }

  const sortedData = filteredClasses.sort((a, b) => {
    if (sort === 'courseName' || sort === 'courseNumber') {
      return a[sort].localeCompare(b[sort]) * (direction === "desc" ? -1 : 1);
    } else {
      return a[sort] - b[sort] * (direction === "desc" ? -1 : 1);
    }
  })

  return (
    <div className="school-catalog">
      <h1>School Catalog</h1>
      <input type="text" value={search} onChange={handleSearchInput} placeholder="Search" />
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSorting('trimester')}>Trimester</th>
            <th onClick={() => handleSorting('courseNumber')}>Course Number</th>
            <th onClick={() => handleSorting('courseName')}>Courses Name</th>
            <th onClick={() => handleSorting('semesterCredits')}>Semester Credits</th>
            <th onClick={() => handleSorting('totalClockHours')}>Total Clock Hours</th>
            <th>Enroll</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map(course => <tr key={course.courseNumber}>
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
