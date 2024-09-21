// import { useEffect, useState } from 'react'
// import './App.css'

// function App() {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     fetch(`https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json`)
//       .then((response) => response.json())
//       .then((dataReceived) => {
//         setData(dataReceived);
//       })
//       .catch((error) => alert("failed to fetch data" + error.message));
//   }, [])

//   return (
//     <div className='App'>
//       <h1>Employee Data Table</h1>
//       <div className='Table'>
//         <table>
//           <thead>
//             <th>ID</th>
//             <th>Name</th>
//             <th>Email</th>
//             <th>Role</th>
//           </thead>
//           <tbody>
//             {
//               data.map((employee) => (
//                 <tr key={employee.id}>
//                   <td>{employee.id}</td>
//                   <td>{employee.name}</td>
//                   <td>{employee.email}</td>
//                   <td>{employee.role}</td>
//                 </tr>
//               ))
//             }
//           </tbody>
//         </table>
//       </div>
//     </div>
//   )
// }

// export default App

import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

  useEffect(() => {
    fetch(
      `https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json`
    )
      .then((response) => response.json())
      .then((dataReceived) => {
        setData(dataReceived);
      })
      .catch((error) => alert("Failed to fetch data: " + error.message));
  }, []);

  // Calculate the total number of pages
  const totalPages = Math.ceil(data.length / recordsPerPage);

  // Get the records for the current page
  const currentRecords = data.slice(
    (currentPage - 1) * recordsPerPage, currentPage * recordsPerPage
  );

  // Handle page change
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="App">
      <h1>Employee Data Table</h1>
      {/* Records shown in the table format */}
      <div className="Table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {currentRecords.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.id}</td>
                <td>{employee.name}</td>
                <td>{employee.email}</td>
                <td>{employee.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination Controls added below */}
      <div className="pagination">
        <button onClick={goToPreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span className="pageNumber">{currentPage}</span>
        <button onClick={goToNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}

export default App;
