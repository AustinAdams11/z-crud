import { useState, useEffect, useContext } from "react"
import { AppContext } from "./App"

export default function Inventory() {
    const { userId } = useContext(AppContext)

    const [items, setItems] = useState([])
    const [newItem, setNewItem] = useState({ item_name: "", description: "", quantity: "" })
    const [editItemId, setEditItemId] = useState(null)
    const [editName, setEditName] = useState("")
    const [editDesc, setEditDesc] = useState("")
    const [editQty, setEditQty] = useState("")


    useEffect(() => {
    fetch("http://localhost:8000/coffee")
        .then(res => res.json())
        .then(data => {
            console.log("data", data)
            setItems(data)
        })
            .catch(error => console.error("error", error))
        }, [])

    function addItem(e) {
    e.preventDefault()
    console.log("new item", newItem)
    if (!newItem.item_name || !newItem.quantity) {
        alert("Enter Information!")
        return
    }

    fetch("http://localhost:8000/coffee", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...newItem, quantity: Number(newItem.quantity), UsersId: userId })
    })
        .then(res => res.json())
        .then(data => {
            console.log("returned item", data)
        setItems([...items, data])
        setNewItem({ item_name: "", description: "", quantity: "" })
        })
    }

    function startEdit(item) {
        console.log("item editing", item)
        setEditItemId(item.id)
        setEditName(item.item_name)
        setEditDesc(item.description)
        setEditQty(item.quantity)
    }

    function saveEdit(item) {
        console.log("item saving", item)
    const updatedItem = { ...item, item_name: editName, description: editDesc, quantity: Number(editQty) }
        console.log("updated item", updatedItem)

    fetch(`http://localhost:8000/coffee/${item.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedItem)
    }).then(() => {
        setItems(items.map(i => i.id === item.id ? updatedItem : i))
        setEditItemId(null)
            console.log("saved items", items)
    })
    }

    function deleteItem(id) {
    fetch(`http://localhost:8000/coffee/${id}`, { method: "DELETE" })
        .then(() => {
            setItems(items.filter(i => i.id !== id))
            console.log("items left", items.filter(i => i.id !== id))
        })
    }
    return (
    <div>
        <h1>Adams Coffee Supply</h1>

        <h2>Add Item</h2>
        <form onSubmit={addItem}>
        <input placeholder="Name" value={newItem.item_name} onChange={e => setNewItem({ ...newItem, item_name: e.target.value })} />
        <input placeholder="Description" value={newItem.description} onChange={e => setNewItem({ ...newItem, description: e.target.value })} />
        <input placeholder="Quantity" type="number" value={newItem.quantity} onChange={e => setNewItem({ ...newItem, quantity: e.target.value })} />
        <button type="submit">Add</button>
        </form>

        <h2>Inventory</h2>
        <div className="coffee-table">
        <table border="1">
        <thead>
            <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Qty</th>
            <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            {items.length === 0}
            {items.map(item => (
            <tr key={item.id}>
                <td>
                {editItemId === item.id ? (
                    <input value={editName} onChange={e => setEditName(e.target.value)} />
                ) : item.item_name}
                </td>
                <td>
                {editItemId === item.id ? (
                    <input value={editDesc} onChange={e => setEditDesc(e.target.value)} />
                ) : item.description}
                </td>
                <td>
                {editItemId === item.id ? (
                    <input type="number" value={editQty} onChange={e => setEditQty(e.target.value)} />
                ) : item.quantity}
                </td>
                <td>
                {editItemId === item.id ? (
                    <>
                    <button onClick={() => saveEdit(item)}>Save</button>
                    <button onClick={() => setEditItemId(null)}>Cancel</button>
                    </>
                ) : (
                    <button onClick={() => startEdit(item)}>Edit</button>
                )}
                <button onClick={() => deleteItem(item.id)}>Delete</button>
                </td>
            </tr>
            ))}
        </tbody>
        </table>
        </div>
    </div>
    )
}
