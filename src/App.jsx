import { BrowserRouter, Routes, Route } from 'react-router-dom'
import StudentRegisterForm from './registerform'
import StudentTable from "./tableregisterform"
import { useState } from "react";

function App() {
  const [students, setstudents] = useState([])
  const [edit, setedit] = useState(null)

  const addstudent = (student) => {
    setstudents([...students, student])
  }

  const deletedstudent = (id) => {
    setstudents(students.filter((student) => student.id !== id))
  }

  const editedstudent = (index) => {
    setedit(index)
  }

  const updatedstudent = (student) => {
    const updatestudent = [...students]
    updatestudent[edit] = student
    setstudents(updatestudent)
    setedit(null)
  }

  const canceledit = () => {
    setedit(null)
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<StudentRegisterForm addstudent={addstudent} students={students} edit={edit} updatedstudent={updatedstudent} canceledit={canceledit} />} />
          <Route path='/table' element={<StudentTable students={students} deletedstudent={deletedstudent} edit={edit} editedstudent={editedstudent} />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
