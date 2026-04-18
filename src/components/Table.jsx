import React, { useEffect, useState } from 'react';


function Table({ initialStudents, onSelect }) {

    if (!initialStudents || initialStudents.length === 0) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                <p className="ml-4 text-gray-500">Loading student records...</p>
            </div>
        );
    }


    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            <div className="max-w-4xl mx-auto">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Student Attendance Dashboard</h1>
                    <p className="text-gray-600">Daily monitoring and performance overview</p>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-100 border-b border-gray-200">
                                    <th className="px-6 py-4 text-sm font-semibold text-gray-700 uppercase tracking-wider">Student Name</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-gray-700 uppercase tracking-wider text-center">Attendance %</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-gray-700 uppercase tracking-wider text-right">Current Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {initialStudents.map((student) => {
                                    // Determine attendance color: Green for >= 75%, Red for < 75%
                                    const isSafe = student.attendance >= 75;

                                    return (
                                        <tr key={student.id} onClick={() => onSelect(student.id)} className={`cursor-pointer transition-colors duration-150 ${student.selected
                                                ? 'bg-yellow-50 hover:bg-yellow-100'
                                                : 'bg-white hover:bg-gray-50'
                                            }`}>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center">
                                                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs mr-3">
                                                        {student.name.charAt(0)}
                                                    </div>
                                                    <span className="font-medium text-gray-900">{student.name}</span>
                                                </div>
                                            </td>

                                            <td className="px-6 py-4 text-center">
                                                <div className="flex items-center justify-center gap-2">
                                                    <span
                                                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-bold
                              ${isSafe ? 'text-green-700 bg-green-50' : 'text-red-700 bg-red-50'}`}
                                                    >
                                                        {student.attendance}%
                                                    </span>
                                                    {/* Progress bar visual */}
                                                    <div className="hidden sm:block w-24 bg-gray-200 rounded-full h-1.5 ml-2">
                                                        <div
                                                            className={`h-1.5 rounded-full ${isSafe ? 'bg-green-500' : 'bg-red-500'}`}
                                                            style={{ width: `${student.attendance}%` }}
                                                        ></div>
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="px-6 py-4 text-right">
                                                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold
                          ${student.isPresent
                                                        ? 'bg-green-100 text-green-800 border border-green-200'
                                                        : 'bg-gray-100 text-gray-600 border border-gray-200'}`}>
                                                    <span className={`h-1.5 w-1.5 rounded-full ${student.isPresent ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                                                    {student.isPresent ? 'Present' : 'Absent'}
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                        <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                            <div className="flex items-center">
                                <span className="h-3 w-3 rounded-full bg-green-500 mr-2"></span>
                                <span>Satisfactory (&ge;75%)</span>
                            </div>
                            <div className="flex items-center">
                                <span className="h-3 w-3 rounded-full bg-red-500 mr-2"></span>
                                <span>Low Attendance (&lt;75%)</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Table;