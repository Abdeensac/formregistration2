import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import './App.css';

function StudentTable({
    students,
    deletedstudent,
    editedstudent
}) {
    const [search, setsearch] = useState("");
    const [filterevent, setfilterevent] = useState("");
    const [filterdepartment, setfilterdepartment] = useState("");
    const navigate = useNavigate();

    const filteredStudents = students
        .filter((student) => student.studentname.toLowerCase().includes(search.toLowerCase()))
        .filter((student) => filterevent === "" || student.event === filterevent)
        .filter((student) => student.department.toLowerCase().includes(filterdepartment.toLowerCase()));

    return (
        <>
            <h1>Registered Students</h1>

            <div className="search-container">
                <input
                    type="text"
                    value={search}
                    placeholder="🔍 Search student by name..."
                    onChange={(e) => setsearch(e.target.value)}
                />
            </div>

            <div className="filter-container">
                <label className="filter-label">Filter by Event:</label>
                <select value={filterevent} onChange={(e) => setfilterevent(e.target.value)}>
                    <option value="">All Events</option>
                    <option value="code contest">Code Contest</option>
                    <option value="Ui Design">UI Design</option>
                    <option value="Debugging challange">Debugging Challenge</option>
                </select>

                <label className="filter-label">Filter by Department:</label>
                <input
                    type="text"
                    placeholder="Search department..."
                    value={filterdepartment}
                    onChange={(e) => setfilterdepartment(e.target.value)}
                />
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Student Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Department</th>
                        <th>Year</th>
                        <th>Event</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredStudents.length === 0 ? (
                        <tr>
                            <td colSpan="8" style={{ textAlign: 'center', padding: '2rem', color: '#9ca3af' }}>
                                📋 No registrations found
                            </td>
                        </tr>
                    ) : (
                        filteredStudents.map((student, index) => (
                            <tr key={student.id}>
                                <td><strong>{student.studentname}</strong></td>
                                <td>{student.email}</td>
                                <td>{student.phonenumber}</td>
                                <td>{student.department}</td>
                                <td><span style={{ background: 'var(--accent-bg)', padding: '0.25rem 0.75rem', borderRadius: '4px' }}>{student.year}</span></td>
                                <td>{student.event}</td>
                                <td>
                                    <span style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)', padding: '0.4rem 0.8rem', borderRadius: '6px', fontWeight: '600', fontSize: '0.85rem' }}>
                                        ✓ Registered
                                    </span>
                                </td>
                                <td>
                                    <button
                                        className="edit-btn action-btn"
                                        onClick={() => {
                                            editedstudent(index);
                                            navigate('/');
                                        }}
                                    >
                                        ✎ Edit
                                    </button>
                                    <button
                                        className="delete-btn action-btn"
                                        onClick={() => deletedstudent(student.id)}
                                    >
                                        🗑 Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
                <button onClick={() => navigate('/')} className="add-btn">
                    + Add New Student
                </button>
            </div>

            <div className="stats-section">
                <h2 style={{ gridColumn: '1 / -1', marginTop: 0 }}>📊 Registration Statistics</h2>

                <div className="stat-card">
                    <h3>Total Registrations</h3>
                    <p>{students.length}</p>
                </div>

                <div className="stat-card">
                    <h3>Code Contest</h3>
                    <p>{students.filter((student) => student.event === "code contest").length}</p>
                </div>

                <div className="stat-card">
                    <h3>UI Design</h3>
                    <p>{students.filter((student) => student.event === "Ui Design").length}</p>
                </div>

                <div className="stat-card">
                    <h3>Debugging Challenge</h3>
                    <p>{students.filter((student) => student.event === "Debugging challange").length}</p>
                </div>
            </div>
        </>
    );
}

export default StudentTable;