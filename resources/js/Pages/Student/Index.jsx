import MagnifyingGlass from '@/Components/icons/MagnifyingGlass';
import Pagination from '@/Components/Pagination';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { useEffect, useMemo } from 'react';
import { useRef } from 'react';

export default function Index({ auth, students }) {

    const page = usePage();

    const isInitialRender = useRef(true);

    const [searchTerm, setSearchTerm] = useState("");
    const [pageNumber, setPageNumber] = useState("");

    const updatePageNumber = (link) => {
        setPageNumber(link.url.split('=')[1]);
    }

    let studentsUrl = useMemo(() => {
        const url = new URL(route('students.index'));

        url.searchParams.append("page", pageNumber);

        if(searchTerm){
            url.searchParams.append("search", searchTerm);
        }

        return url;
    }, [searchTerm, pageNumber]);

    useEffect(() => {
        if(isInitialRender.current) {
            isInitialRender.current = false;
            return;
        }

        router.visit(studentsUrl, {
            preserveScroll: true,
            preserveState: true,
            // refresh: true
        })
    }, [studentsUrl])

    function deleteStudent(id)
    {
        if(confirm('Are you sure you want to delete this student record?')){
            router.delete(route('students.destroy',id),{
            preserveScroll:true,
        })
        }
    }
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Students List
                </h2>
            }
        >
            <Head title="Students List" />

            <div className="py-10 bg-gray-100">
                <div className="mx-auto max-w-7xl">
                    <div className="px-4 sm:px-6 lg:px-8">
                        <div className="sm:flex sm:items-center">
                            <div className="sm:flex-auto">
                                <h1 className="text-xl font-semibold text-gray-900">
                                    Students
                                </h1>
                                <p className="mt-2 text-sm text-gray-700">
                                    A list of all the Students.
                                </p>
                            </div>

                            <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                                <Link
                                    href={route("students.create")}
                                    className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                                >
                                    Add Student
                                </Link>
                            </div>
                        </div>

                        <div className="flex flex-col justify-start mt-6 sm:flex-row">
                            <div className="relative col-span-3 text-sm text-gray-800">
                                <div className="absolute top-0 bottom-0 left-0 flex items-center pl-2 text-gray-500 pointer-events-none">
                                    <MagnifyingGlass />
                                </div>

                                <input
                                    onChange = {(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                    value={searchTerm}
                                    type="text"
                                    autoComplete="off"
                                    placeholder="Search students data..."
                                    id="search"
                                    className="block py-2 pl-10 text-gray-900 border-0 rounded-lg ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                            <select
                                // value={classId}
                                onChange={(e) => setClassId(e.target.value)}
                                className="block py-2 ml-5 text-gray-900 border-0 rounded-lg ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                            >
                                <option value="">Filter By Class</option>
                                {/* {classes.data.map((classItem) => {
                                    return (
                                        <option
                                            key={classItem.id}
                                            value={classItem.id}
                                        >
                                            {classItem.name}
                                        </option>
                                    );
                                })} */}
                            </select>
                        </div>

                        <div className="flex flex-col mt-8">
                            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                                    <div className="relative overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                                        <table className="min-w-full divide-y divide-gray-300">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th
                                                        scope="col"
                                                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                                                    >
                                                        ID
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                                                    >
                                                        Name
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                                                    >
                                                        Email
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                                    >
                                                        Class
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                                    >
                                                        Section
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                                    >
                                                        Created At
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                                                    />
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {students.data.map(
                                                    (student) => {
                                                        return (
                                                            <tr key={student.id}>
                                                                <td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 whitespace-nowrap sm:pl-6">
                                                                    {student.id}
                                                                </td>
                                                                <td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 whitespace-nowrap sm:pl-6">
                                                                    {student.name}
                                                                </td>
                                                                <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
                                                                    {student.email}
                                                                </td>
                                                                <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
                                                                    {student.class.name}
                                                                </td>
                                                                <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
                                                                    {student.section.name}
                                                                </td>
                                                                <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
                                                                    {student.created_at}
                                                                </td>

                                                                <td className="relative py-4 pl-3 pr-4 text-sm font-medium text-right whitespace-nowrap sm:pr-6">
                                                                    <Link
                                                                        href={route("students.edit", student.id)}
                                                                        className="text-indigo-600 hover:text-indigo-900"
                                                                    >
                                                                        Edit
                                                                    </Link>
                                                                    <button
                                                                        onClick={()=> deleteStudent(student.id) }
                                                                        className="ml-2 text-indigo-600 hover:text-indigo-900">
                                                                        Delete
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        )
                                                    }
                                                )}

                                            </tbody>
                                        </table>

                                    </div>
                                    <div>
                                        <Pagination updatePageNumber={updatePageNumber} meta={students.meta} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
