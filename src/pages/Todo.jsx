import {PATH_TODO} from "../routes/path.jsx";
import AdminLayout from "../layouts/AdminLayout.jsx";
import NavLink from "../components/Link.jsx";
import Table from "../components/Table.jsx";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

export default function Todo() {
    const [loading, setLoading] = useState(true)
    const [todos, setTodos] = useState([])
    const [keyword, setKeyword] = useState("")
    let no = 0
    const [pagination, setPagination] = useState({
        page :0,
        total_page:0,
        total_rows:0,
        perpage:0,
    })

    const fetchTodo = (page = 1, take = 10, q = "") => {
        fetch(`/api/todos?page=${page}&take=${take}&q=${q}`)
            .then(res => res.json())
            .then((res) => {
                setLoading(false)
                setTodos(res.data.rows)
                setPagination({
                    page: res.data.page,
                    perpage: res.data.take,
                    total_page: res.data.total_page,
                    total_rows: res.data.total_rows
                })
            });
    }

    const deleteTodo = (id) => {
       if (confirm("you can remove this todo ?")) {
           fetch(`/api/todos/${id}`, {
               method: "DELETE",
           })
               .then((res) => res.json())
               .then((res) => {
                   alert(res.message)
                   fetchTodo()
               })
       }
    }

    const changePage = (nextPage) => {
        fetchTodo(nextPage, 10, keyword)
    }


    useEffect(() => {
        setLoading(true)
       fetchTodo()
    }, []);

    return (
        <AdminLayout>
            <NavLink to={PATH_TODO.form}>Add</NavLink>
            <Table onChange={(e) => { fetchTodo(1,10,e.target.value); setKeyword(e.target.value)}} className="mt-4">
                <Table.Head>
                    <tr>
                        <th scope="col" className="p-4">
                            <div className="flex items-center">
                                <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                    <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
                            </div>
                        </th>
                        <th scope="col" className="px-6 py-3">
                           No
                        </th>
                        <th scope="col" className="px-6 py-3">
                           Todo
                        </th>
                        <th scope="col" className="px-6 py-3">
                           Is Done?
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Action
                        </th>
                    </tr>
                </Table.Head>

                <Table.Body loading={loading}>
                    {todos.length > 0 ? todos.map((e) => { no++; return  (
                        <tr key={e.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td className="w-4 p-4">
                                <div className="flex items-center">
                                    <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    <label htmlFor="checkbox-table-search-1" className="sr-only">checkbox</label>
                                </div>
                            </td>
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {(pagination.page - 1) * pagination.perpage + no}
                            </th>
                            <td className="px-6 py-4">
                                {e.todo}
                            </td>
                            <td className="px-6 py-4">
                                {e.done ? "Yes" : "No"}
                            </td>
                            <td className="px-6 py-4">
                                <Link to={PATH_TODO.formEdit.replace(":id", e.id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</Link>
                                <a href="javascript:void(0)" onClick={(t) => deleteTodo(e.id)} className="font-medium text-blue-600 dark:text-red-500 hover:underline ml-2">Delete</a>
                            </td>
                        </tr>
                    )}) : <span>Empty</span>}
                </Table.Body>
                <tfoot>
                <div className="flex flex-col p-2 mb-3">
                        <span className="text-sm text-gray-700">
                              Showing <span className="font-semibold text-gray-900">{todos.length == 0 ? 0 :(pagination.page - 1) * pagination.perpage + 1}</span> to <span className="font-semibold text-gray-900">{ pagination.page > 1 ? (pagination.page * pagination.perpage ) - todos.length : todos.length}</span> of <span className="font-semibold text-gray-900">{ pagination.total_rows}</span> Entries
                          </span>
                    <div className="inline-flex mt-2 xs:mt-0 gap-2">
                        <button onClick={()=> changePage(pagination.page > 1 ? pagination.page - 1 : 1)} className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 rounded-s hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                            <svg className="w-3.5 h-3.5 me-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5H1m0 0 4 4M1 5l4-4"/>
                            </svg>
                            Prev
                        </button>
                        <button onClick={() => changePage(1)} className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 rounded-s hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                            <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M5 18L5 6M19 6V18L9 12L19 6Z" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                            Begin
                        </button>
                        <button onClick={() => changePage(pagination.total_page)} className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 rounded-s hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                            End
                            <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#fbf9f9"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M17 5V19M7 7.329V16.671C7 17.7367 7 18.2695 7.21846 18.5432C7.40845 18.7812 7.69654 18.9197 8.00108 18.9194C8.35125 18.919 8.76734 18.5861 9.59951 17.9204L13.8765 14.4988C14.9442 13.6446 15.4781 13.2176 15.6713 12.7016C15.8408 12.2492 15.8408 11.7508 15.6713 11.2984C15.4781 10.7824 14.9442 10.3554 13.8765 9.50122L9.59951 6.07961C8.76734 5.41387 8.35125 5.081 8.00108 5.08063C7.69654 5.0803 7.40845 5.21876 7.21846 5.45677C7 5.73045 7 6.2633 7 7.329Z" stroke="#fcfcfc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                        </button>
                        <button onClick={() => changePage(pagination.page < pagination.total_page && todos.length > 0 ? pagination.page + 1 : pagination.total_page)} className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 border-0 border-s border-gray-700 rounded-e hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                            Next
                            <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                            </svg>
                        </button>
                    </div>
                </div>
                </tfoot>
            </Table>

        </AdminLayout>
    )
}