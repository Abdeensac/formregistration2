import { useNavigate } from "react-router-dom";
import { useState,useEffect} from "react";
function StudentRegisterForm({students,addstudent,edit,updatedstudent,canceledit}){
    const[studentname,setstudentname]= useState("")
    const[email,setemail]= useState("")
    const[phonenumber,setphonenumber]=useState("")
    const[department,setdepartment]=useState("")
    const [year,setyear]= useState("")
    const[event,setevent]= useState("")
    const[error,seterror]=useState({})

    const navigate = useNavigate()

    useEffect (() => {
    if (edit!==null){
        const student = students[edit]
        setstudentname ( student.studentname)
        setemail (student.email)
        setphonenumber (student.phonenumber)
        setdepartment(student.department)
        setyear (student.year)
        setevent (student.event) 

    }},[edit,students])


    const handlecancel=()=>{
        canceledit()
        navigate('/table')
    }


    const handleclick = (e)=>{
        e.preventDefault()

        let newerror ={}

     if (!studentname){
        newerror.studentname = "studentname cant be empty"
     }

     if (!email){
        newerror.email = "email is cant be empty "
     }
     else if (! /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
            newerror.email = "invalid email"
        }

        const alreadyexist = students.find((student,index)=>{
           return student.email == email && index!==edit
        })
        if (alreadyexist){
            newerror.email = "already exists"
        }
     if (!phonenumber){
        newerror.phonenumber = " phone number cant be empty"
     }

     else if (phonenumber.length!==10){
        newerror.phonenumber = "phonenumber must contain 10 numbers"
     }
     if (!department){
        newerror.department = "department cant be empty"
     }
     if(!year){
        newerror.year = "choose a year "
     }
     if (!event){
        newerror.event = "select a event"
     }
     seterror (newerror)

     if (Object.keys (newerror).length==0){
        const newstudent = { id: Date.now(), studentname, email, phonenumber, department, year, event }
        if (edit!==null){
          updatedstudent(newstudent)
        }
        else{
            addstudent(newstudent)
        }
        navigate('/table')

    }
}
    return(
        <>
        <h1> Student Register Form </h1>
        <br/>
        <form >
            <div>
                <label> StudentName </label>
                <input type="text"value={studentname}placeholder="enter a student name "onChange={(e)=>{
                  setstudentname(e.target.value)
                }}/> 
                <p style={{color :"red",fontSize:"12px",fontStyle:"italic"}}> {error.studentname}</p>
    
                </div>
                <br/>

                <div>
                    <label> Email </label>
                    <input type="email"value={email} placeholder="enter a email"onChange={(e)=>{
                        setemail(e.target.value)
                    }} />
                    <p  style={{color :"red",fontSize:"12px",fontStyle:"italic"}}> {error.email}</p>
                </div>
                <br/>
                <div>
                    <label> phone number </label>
                    <input type="number"value={phonenumber} placeholder="enter a phone number"onChange={(e)=>{
                        setphonenumber(e.target.value)
                    }}/> 
                    <p  style={{color :"red",fontSize:"12px",fontStyle:"italic"}}>{error.phonenumber} </p>
                    
                </div>
                <br/>
                <div>
                    <label> Department </label>
                    <input type="text"value={department} placeholder="enter a department" onChange={(e)=>{
                        setdepartment(e.target.value)
                    }}/>
                  <p  style={{color :"red",fontSize:"12px",fontStyle:"italic"}}>   {error.department} </p>
                    
                </div>
                <br/>
                <div>
                    <label> Year </label>
                    <input type="radio" name="year" value={"1st"} checked={year=="1st"} onChange={(e)=>{
                        setyear(e.target.value)
                    }}/> 1st

                    
                    <input type="radio" name="year" value={"2nd"} checked = {year=="2nd"}  onChange={(e)=>{
                        setyear (e.target.value)
                    }}/> 2nd 

                    <input type="radio" value={"3rd"} name="year" checked={year=="3rd"} onChange={(e)=>{
                        setyear(e.target.value)
                    }}/> 3rd
                    
                    <input type="radio" name="year" value={"4th"} checked={year=="4th"} onChange={(e)=>{
                        setyear(e.target.value)
                    }}/> 4rd
                   <p  style={{color :"red",fontSize:"12px",fontStyle:"italic"}}> {error.year} </p>
                    </div>
                    <br/>
                    <div>
                        <label> Event </label>
                        <select value={event} name="year" onChange={(e)=> setevent(e.target.value)}>
                            <option value={""}> select option </option>
                            <option value="code contest"> CodeContest</option>
                            <option value="Ui Design"> Ui Design </option>
                            <option value="Debugging challange"> Debugging Challange </option>
                        </select>
                       <p  style={{color :"red",fontSize:"12px",fontStyle:"italic"}}> {error.event} </p>
                    </div>
                    <br/>
                    <button type="submit" onClick={handleclick}> {edit!==null?"update":"registration"} </button>

                    {edit!==null ?(
                    <button type="button" onClick={handlecancel}> cancel </button>): null
}

                
        </form>
        </>
    )
}

export default StudentRegisterForm
