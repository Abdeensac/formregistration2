import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import './App.css';

function StudentRegisterForm({ students, addstudent, edit, updatedstudent, canceledit }) {
    const [studentname, setstudentname] = useState("");
    const [email, setemail] = useState("");
    const [phonenumber, setphonenumber] = useState("");
    const [department, setdepartment] = useState("");
    const [year, setyear] = useState("");
    const [event, setevent] = useState("");
    const [error, seterror] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        if (edit !== null) {
            const student = students[edit];
            setstudentname(student.studentname);
            setemail(student.email);
            setphonenumber(student.phonenumber);
            setdepartment(student.department);
            setyear(student.year);
            setevent(student.event);
        }
    }, [edit, students]);

    const handlecancel = () => {
        canceledit();
        navigate('/table');
    };

    const handleclick = (e) => {
        e.preventDefault();

        let newerror = {};

        if (!studentname) {
            newerror.studentname = "Student name is required";
        }

        if (!email) {
            newerror.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newerror.email = "Invalid email format";
        }

        const alreadyexist = students.find((student, index) => {
            return student.email === email && index !== edit;
        });
        if (alreadyexist) {
            newerror.email = "Email already exists";
        }

        if (!phonenumber) {
            newerror.phonenumber = "Phone number is required";
        } else if (phonenumber.length !== 10) {
            newerror.phonenumber = "Phone number must be 10 digits";
        }

        if (!department) {
            newerror.department = "Department is required";
        }

        if (!year) {
            newerror.year = "Please select a year";
        }

        if (!event) {
            newerror.event = "Please select an event";
        }

        seterror(newerror);

        if (Object.keys(newerror).length === 0) {
            const newstudent = { id: Date.now(), studentname, email, phonenumber, department, year, event };
            if (edit !== null) {
                updatedstudent(newstudent);
            } else {
                addstudent(newstudent);
            }
            navigate('/table');
        }
    };

    return (
        <>
            <h1>{edit !== null ? "Update Student Registration" : "Student Registration Form"}</h1>
            <form>
                <div>
                    <label htmlFor="studentname">Student Name</label>
                    <input
                        id="studentname"
                        type="text"
                        value={studentname}
                        placeholder="Enter your full name"
                        onChange={(e) => {
                            setstudentname(e.target.value);
                        }}
                    />
                    {error.studentname && <p className="error-message">{error.studentname}</p>}
                </div>

                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        placeholder="Enter your email address"
                        onChange={(e) => {
                            setemail(e.target.value);
                        }}
                    />
                    {error.email && <p className="error-message">{error.email}</p>}
                </div>

                <div>
                    <label htmlFor="phonenumber">Phone Number</label>
                    <input
                        id="phonenumber"
                        type="number"
                        value={phonenumber}
                        placeholder="Enter 10-digit phone number"
                        onChange={(e) => {
                            setphonenumber(e.target.value);
                        }}
                    />
                    {error.phonenumber && <p className="error-message">{error.phonenumber}</p>}
                </div>

                <div>
                    <label htmlFor="department">Department</label>
                    <input
                        id="department"
                        type="text"
                        value={department}
                        placeholder="Enter your department"
                        onChange={(e) => {
                            setdepartment(e.target.value);
                        }}
                    />
                    {error.department && <p className="error-message">{error.department}</p>}
                </div>

                <div>
                    <label>Year of Study</label>
                    <div className="radio-group">
                        <div className="radio-item">
                            <input
                                id="year1"
                                type="radio"
                                name="year"
                                value="1st"
                                checked={year === "1st"}
                                onChange={(e) => {
                                    setyear(e.target.value);
                                }}
                            />
                            <label htmlFor="year1" style={{ marginBottom: 0 }}>1st</label>
                        </div>
                        <div className="radio-item">
                            <input
                                id="year2"
                                type="radio"
                                name="year"
                                value="2nd"
                                checked={year === "2nd"}
                                onChange={(e) => {
                                    setyear(e.target.value);
                                }}
                            />
                            <label htmlFor="year2" style={{ marginBottom: 0 }}>2nd</label>
                        </div>
                        <div className="radio-item">
                            <input
                                id="year3"
                                type="radio"
                                name="year"
                                value="3rd"
                                checked={year === "3rd"}
                                onChange={(e) => {
                                    setyear(e.target.value);
                                }}
                            />
                            <label htmlFor="year3" style={{ marginBottom: 0 }}>3rd</label>
                        </div>
                        <div className="radio-item">
                            <input
                                id="year4"
                                type="radio"
                                name="year"
                                value="4th"
                                checked={year === "4th"}
                                onChange={(e) => {
                                    setyear(e.target.value);
                                }}
                            />
                            <label htmlFor="year4" style={{ marginBottom: 0 }}>4th</label>
                        </div>
                    </div>
                    {error.year && <p className="error-message">{error.year}</p>}
                </div>

                <div>
                    <label htmlFor="event">Event</label>
                    <select
                        id="event"
                        value={event}
                        onChange={(e) => setevent(e.target.value)}
                    >
                        <option value="">Select an event</option>
                        <option value="code contest">Code Contest</option>
                        <option value="Ui Design">UI Design</option>
                        <option value="Debugging challange">Debugging Challenge</option>
                    </select>
                    {error.event && <p className="error-message">{error.event}</p>}
                </div>

                <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                    <button type="submit" onClick={handleclick} style={{ flex: 1 }}>
                        {edit !== null ? "Update Registration" : "Register Now"}
                    </button>
                    {edit !== null && (
                        <button type="button" onClick={handlecancel} className="secondary-btn" style={{ flex: 1 }}>
                            Cancel
                        </button>
                    )}
                </div>
            </form>
        </>
    );
}

export default StudentRegisterForm;
