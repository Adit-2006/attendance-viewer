import React, { useState, useEffect } from "react";
import axios from 'axios';
import Table from "./Table";
import Filters from "./Filters";

function Students() {
    
    const [studentList, setStudentList] = useState(() => {
        const saved = localStorage.getItem("DisplayList");
        return saved ? JSON.parse(saved) : []; 
    });

    const [filter, setFilter] = useState(() => {
        const saved = localStorage.getItem('Filter');
        return saved ? JSON.parse(saved) : "all";
    });

    const [sortOrder, setSortOrder] = useState(() => {
        const saved = localStorage.getItem("SortOrder");
        return saved ? JSON.parse(saved) : 'none';
    });

    useEffect(() => {
        async function getStudents() {
            
            if (!studentList || studentList.length === 0) {
                try {
                    let response = await axios.get('https://jsonplaceholder.typicode.com/users');
                    const modifiedList = response.data.map(student => ({
                        ...student,
                        isPresent: Math.random() > 0.6,
                        attendance: Math.floor(Math.random() * 50) + 50,
                        selected: false
                    }));
                    setStudentList(modifiedList);
                } catch (error) {
                    console.error("Failed to fetch students:", error);
                }
            }
        }
        getStudents();
    }, []); 

    
    useEffect(() => {
        localStorage.setItem("Filter", JSON.stringify(filter));
        localStorage.setItem("SortOrder", JSON.stringify(sortOrder));
        localStorage.setItem("DisplayList", JSON.stringify(studentList));
    }, [filter, sortOrder, studentList]);

    function filterChange(newFilter) {
        setFilter(newFilter);
    }

    function selected(id) {
        setStudentList(prevList =>
            prevList.map(student =>
                student.id === id
                    ? { ...student, selected: !student.selected }
                    : student
            )
        );
    }

  
    const displayList = (studentList || []).filter((student) => {
        if (filter === 'present') return student.isPresent === true;
        if (filter === 'absent') return student.isPresent === false;
        if (filter === 'low') return student.attendance < 75;
        if (filter === 'selected') return student.selected === true;
        return true;
    }).sort((a, b) => {
        if (sortOrder === 'asc') return a.attendance - b.attendance;
        if (sortOrder === 'desc') return b.attendance - a.attendance;
        return 0;
    });

    return (
        <div className="max-w-5xl mx-auto p-4 md:p-8">
            <div className="flex flex-col gap-4 mb-8">
                <div className="w-full">
                    <Filters onFilterChange={filterChange} activeFilter={filter} />
                </div>
                <div className="flex items-center gap-3 self-end bg-white p-2 px-4 rounded-lg border border-gray-100 shadow-sm">
                    <label className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                        Sort By Attendance:
                    </label>
                    <select
                        className="bg-transparent text-gray-700 font-medium text-sm outline-none cursor-pointer hover:text-blue-600 transition-colors"
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                    >
                        <option value="none">None</option>
                        <option value="desc">Descending</option>
                        <option value="asc">Ascending</option>
                    </select>
                </div>
            </div>
            <Table initialStudents={displayList} onSelect={selected} />
        </div>
    );
}

export default Students;
