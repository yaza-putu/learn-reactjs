import AdminLayout from "../layouts/AdminLayout.jsx";
import Input from "../components/Input.jsx";
import Card from "../components/Card.jsx";
import NavLink from "../components/Link.jsx";
import {PATH_TODO} from "../routes/path.jsx";
import Button from "../components/Button.jsx";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";


export default function TodoForm() {
    const {id} = useParams()

    const [loading, setLoading] = useState(false)

    const [formData, setFormData] = useState({
        todo : "",
        done : false,
    })

    const [errors, setErrors] = useState({
        todo : [],
        done : [],
    })

    const submitForm = (e) => {
        e.preventDefault()

        setLoading(true)
        fetch(id ? `/api/todos/${id}` : "/api/todos", {
            method: id ? "PUT" :"POST",
            body:JSON.stringify(formData),
            headers: {
                "Content-Type": "application/json"
            },
        })
        .then(res => res.json())
        .then((res) => {
            if (res.code == 422) {
                let errs = res.errors
                for (let i in errs) {
                    setErrors(errors => ({
                        ...errors,
                        [i] : errs[i]
                    }))
                }
            }

            if (res.code == 200) {
                setFormData({
                    todo : "",
                    done: false
                })
               alert(res.message)
            }
        }).finally(() => {
            setLoading(false)
        })
    }

    const inputChange = (inputName, inputValue) => {
        setFormData(formData => ({
            ...formData,
            [inputName] : inputValue
        }))

        setErrors(errors => ({
            ...errors,
            [inputName] : [],
        }))
    }

    useEffect(() => {
        console.log(id)

        if (id) {
            fetch(`/api/todos/${id}`, {
                method: "GET"
            })
                .then((res) => res.json())
                .then((res) => {
                    setFormData(res.data)
                })
        }

    }, [id]);

    return (
      <AdminLayout>
          <form onSubmit={submitForm}>
              <Card>
                  <Card.Head className="flex justify-between items-center">
                      <h1 className="font-bold">{id ? "Edit" : "Add"} Todo</h1>
                      <NavLink to={PATH_TODO.index}>Back</NavLink>
                  </Card.Head>
                  <Card.Body>
                      <div className="grid grid-cols-1 gap-3">
                          <Input value={formData.todo} name="todo" onChange={(e) => inputChange(e.target.name, e.target.value) } errors={errors.todo} placeholder="type anyting..." label="Todo"></Input>
                          <select value={formData.done} name="done" onChange={(e) => inputChange(e.target.name, JSON.parse(e.target.value))}>
                              <option value="false">False</option>
                              <option value="true">True</option>
                          </select>
                      </div>
                  </Card.Body>
                  <Card.Footer>
                      <Button loading={loading} type="submit">Save</Button>
                  </Card.Footer>
              </Card>
          </form>
      </AdminLayout>
    )
}