import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function CoffeeDetails() {
    const { id } = useParams();
    const [item, setItem] = useState(null);

    useEffect(() => {
    fetch(`http://localhost:8000/coffee/${id}`)
        .then(res => res.json())
        .then(data => setItem(data));
    }, [id]);

    if (!item) return <p>Loading...</p>;

    return (
    <div>
        <h1>{item.item_name}</h1>
        <p>{item.description}</p>
        
    </div>
    );
}