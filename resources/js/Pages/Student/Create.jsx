import InputError from '@/Components/InputError';
import Pagination from '@/Components/Pagination';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, useForm } from '@inertiajs/react';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';

export default function create({ auth, classes }) {
    const [sections, setSections] = useState([]);

    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        class_id: '',
        section_id: '',
    })

    useEffect(() => {
        if(data.class_id) {
            axios.get(
                route("sections.index", {
                    class_id: data.class_id,
            })).then((response) => {
                setSections(response.data.data);
            })
        }
    }, [data.class_id]);

    function submit(e) {
        e.preventDefault()
        post(route('students.store'))
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Create Student
                </h2>
            }
        >
            <Head title="Create Students" />

            <div className="py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="lg:grid lg:grid-cols-12 lg:gap-x-5">
                    <div className="space-y-6 sm:px-6 lg:px-0 lg:col-span-12">
                        <form onSubmit= {submit}>
                            <div className="shadow sm:rounded-md sm:overflow-hidden">
                                <div className="px-4 py-6 space-y-6 bg-white sm:p-6">
                                    <div>
                                        <h3 className="text-lg font-medium leading-6 text-gray-900">
                                            Student Information
                                        </h3>
                                        <p className="mt-1 text-sm text-gray-500">
                                            Use this form to create a new
                                            student.
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-6 gap-6">
                                        <div className="col-span-6 sm:col-span-3">
                                            <label
                                                htmlFor="name"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Name
                                            </label>
                                            <input
                                                type="text"
                                                value={data.name}
                                                onChange={e => setData('name', e.target.value)}
                                                id="name"
                                                className={`block w-full px-3 py-2 mt-1 text-red-900 border border-gray-300 border-red-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm
                                                    ${errors.name
                                                        ? "focus:ring-red-500 focus:border-red-500"
                                                        : " "
                                                    }`}
                                            />
                                            <InputError message={errors.name}/>
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label
                                                htmlFor="email"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Email Address
                                            </label>
                                            <input
                                                type="email"
                                                value={data.email}
                                                onChange={e => setData('email', e.target.value)}
                                                id="email"
                                                autoComplete="email"
                                                className={`block w-full px-3 py-2 mt-1 text-red-900 border border-gray-300 border-red-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm
                                                    ${errors.name
                                                        ? "focus:ring-red-500 focus:border-red-500"
                                                        : " "
                                                    }`}                                            />
                                            <InputError message={errors.email}/>
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label
                                                htmlFor="className_id"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Class
                                            </label>
                                            <select
                                                id="class_id"
                                                value={data.class_id}
                                                onChange={e => setData('class_id', e.target.value)}
                                                className={`block w-full px-3 py-2 mt-1 text-red-900 border border-gray-300 border-red-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm
                                                    ${errors.name
                                                        ? "focus:ring-red-500 focus:border-red-500"
                                                        : " "
                                                    }`}                                            >
                                                <option value="">
                                                    Select a Class
                                                </option>
                                                {classes.data.map((item)=> {
                                                    return(
                                                        <option
                                                            value={item.id}
                                                            key={item.id}
                                                        >
                                                            {item.name}
                                                        </option>
                                                    )
                                                })}

                                            </select>
                                            <InputError message={errors.class_id}/>
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label
                                                htmlFor="section_id"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Section
                                            </label>
                                            <select
                                                id="section_id"
                                                value={data.section_id}
                                                onChange={e => setData('section_id', e.target.value)}
                                                className={`block w-full px-3 py-2 mt-1 text-red-900 border border-gray-300 border-red-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm
                                                    ${errors.name
                                                        ? "focus:ring-red-500 focus:border-red-500"
                                                        : " "
                                                    }`}                                            >
                                                <option value="">
                                                    Select a Section
                                                </option>
                                                {sections.map((section)=> {
                                                    return(
                                                        <option value={section.id} key={section.id}>
                                                            {section.name}
                                                        </option>
                                                    )
                                                })}

                                            </select>
                                            <InputError message={errors.section_id}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="px-4 py-3 text-right bg-gray-50 sm:px-6">
                                    <Link
                                        href={route("students.index")}
                                        className="inline-flex items-center px-4 py-2 mr-4 text-sm font-medium text-indigo-700 bg-indigo-100 border border-transparent rounded-md hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Cancel
                                    </Link>
                                    <button
                                        type="submit"
                                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    );
}
