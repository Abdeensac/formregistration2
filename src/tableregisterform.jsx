import { useNavigate } from "react-router-dom"
import {useState} from 'react'
function StudentTable({
  students,
  deletedstudent,
  editedstudent
}) {
     const[search,setsearch]=useState("")
     const[filterevent,setfilterevent]=useState("")
     const[filterdepartment,setfilterdepartment]=useState("")
     const navigate = useNavigate()

  return (
    <>
      <h1>Registration Table</h1>

      <input type="text"value={search} placeholder="Search a student" onChange={(e) => setsearch(e.target.value)}/>
      
      <label> Event </label>
      <select value={filterevent} onChange={(e) => setfilterevent(e.target.value)}>
        <option value="">ALL EVENT</option>
        <option value="code contest">Code Contest</option>
        <option value="Ui Design">UI Design</option>
        <option value="Debugging challange">Debugging Challange</option>
      </select>
      <input type="text" placeholder="Search by department" value={filterdepartment} onChange={(e) => setfilterdepartment(e.target.value)}/>
      <br/>
      <table border={1}>
          <tr>
            <th>Student Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Department</th>
            <th>Year</th>
            <th>Event</th>
            <th>Status</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        <tbody>
          {students.length === 0 ? (
            <tr>
              <td colSpan={9}>No Registration Available</td>
            </tr> ) :
             (
            students.filter((student) =>student.studentname.includes(search))
              .filter((student) => filterevent === "" || student.event === filterevent)
              .filter((student) => student.department.includes(filterdepartment))
              .map((student, index) => (
                <tr key={student.id}>
                  <td>{student.studentname}</td>
                  <td>{student.email}</td>
                  <td>{student.phonenumber}</td>
                  <td>{student.department}</td>
                  <td>{student.year}</td>
                  <td>{student.event}</td>
                  <td>Registered</td>
                  <td><button type="button" onClick={() =>{
                     editedstudent(index)
                    navigate ('/')}}> Edit
                    </button>
                  </td>
                  <td>
                    <button type="button" onClick={() => deletedstudent(student.id)}>Delete
                    </button>
                  </td>
                </tr>
              ))
          )}
          <br/>
          <button onClick={()=>navigate('/')}> ADD NEW USER </button>
        </tbody>
      </table>

      <br/>

        <h1> Statatics </h1>
        <br/>
        <p> TOTAL REGISTRATION : {students.length} </p>
        <p> CODING CONTEST : 
            {students.filter((student)=> student.event === "code contest").length}
        </p>
        <p> UI DESIGN :
            {students.filter((student)=> student.event ==="Ui Design").length}
        </p>
        <p> DEBUGGING CHALLANGE : 
            {students.filter((student)=>student.event === "Debugging Challange").length}
        </p>
        </>
  );
}

export default StudentTable;