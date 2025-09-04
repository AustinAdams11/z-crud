import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function GuestPage() {
    const [items, setItems] = useState([]);

    useEffect(() => {
    fetch("http://localhost:8000/coffee")
        .then(res => res.json())
        .then(data => {
            console.log("data", data)
            setItems(data);
    })
}, []);

    return (
    <div>
        <h1>All Coffee Items</h1>

        <table border="1">
        <thead>
            <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Details</th>
            </tr>
        </thead>
        <tbody>
            {items.map(item => (
            <tr key={item.id}>
                <td>{item.item_name}</td>
                <td>{item.description}</td>
                <td><Link to={`/coffee/${item.id}`}>View Details</Link></td>
            </tr>
            ))}
            {items.length === 0 && (
            <tr>
                <td colSpan="3">No items available</td>
            </tr>
            )}
        </tbody>
        </table>
        <p><Link to="/">Back to Home</Link></p>
    </div>
    );
}