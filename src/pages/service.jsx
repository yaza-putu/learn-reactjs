import AdminLayout from "../layouts/AdminLayout.jsx";
import Button from "../components/Button.jsx";
import {useDispatch} from "react-redux";
import {add, remove} from '../store/reducers/todoSlice.jsx'
import {useContext} from "react";
import {TexForwardContext} from "../context/TextForward.jsx";
import Input from "../components/Input.jsx";

export default function Service() {
    const dispatch = useDispatch()
    const addTodo = () => {
        dispatch(add())
    }

    const removeTodo = () => {
        dispatch(remove())
    }

    const {text,setText} = useContext(TexForwardContext)
    return (
       <AdminLayout>
           <h1>Carts</h1>

           <div className="flex gap-2">
               <Button onClick={(e) => addTodo()}>Add Cart</Button>
               <Button onClick={(e) => removeTodo()}>Remove Cart</Button>
           </div>
            <div>
                <label>Text</label>
                <Input onChange={e => setText(e.target.value)}></Input>
            </div>
       </AdminLayout>
    )
}