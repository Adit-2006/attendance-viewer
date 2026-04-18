import React, { useState } from "react";
import axios from 'axios'
import { useEffect } from "react";
import Table from "./Table";
import Filters from "./Filters";

function Students() {
    const [studentList, setStudentList] = useState(JSON.parse(localStorage.getItem("DisplayList"))) || useState([])
    const [filter, setFilter] = useState(JSON.parse(localStorage.getItem('Filter'))) || useState("all")
    const [sortOrder, setSortOrder] = useState(JSON.parse(localStorage.getItem("SortOrder"))) || useState('none')



    useEffect(() => {
        async function getStudents() {
            if (studentList.length == 0) {
                let response = await axios.get('https://jsonplaceholder.typicode.com/users')
                const modifiedList = response.data.map(student => ({
                    ...student,
                    isPresent: Math.random() > 0.6,
                    attendance: Math.floor(Math.random() * (50)) + 50,
                    selected: false
                }))
                setStudentList(modifiedList)
            }
            else{
                return
            }
        }

        getStudents()
    }, [])

    function filterChange(filter) {
        setFilter(filter)
    }
    const displayList = studentList.filter((student) => {
        if (filter === 'present') {
            return student.isPresent === true
        }
        if (filter === 'absent') {
            return student.isPresent === false
        }
        if (filter === 'low') {
            return student.attendance < 75
        }
        if (filter === 'selected') {
            return student.selected === true
        }
        return true
    }).sort((a, b) => {
        if (sortOrder === 'asc') {
            return a.attendance - b.attendance
        }
        if (sortOrder === 'desc') {
            return b.attendance - a.attendance
        }
        return 0
    })

    function selected(id) {
        setStudentList(prevList =>
            prevList.map(student =>
                student.id === id
                    ? { ...student, selected: !student.selected }
                    : student
            )
        );
    }

    localStorage.setItem("Filter", JSON.stringify(filter))
    localStorage.setItem("SortOrder", JSON.stringify(sortOrder))
    localStorage.setItem("DisplayList", JSON.stringify(studentList))

    return (
        <div className="max-w-5xl mx-auto p-4 md:p-8">
            {/* Controls Container: Stacked Vertically */}
            <div className="flex flex-col gap-4 mb-8">

                {/* Row 1: Filters */}
                <div className="w-full">
                    <Filters onFilterChange={filterChange} activeFilter={filter} />
                </div>

                {/* Row 2: Sort (Aligned to the right, or remove 'self-end' to align left) */}
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

            {/* Table Section */}
            <Table initialStudents={displayList} onSelect={selected} />
        </div>
    );
}

export default Students