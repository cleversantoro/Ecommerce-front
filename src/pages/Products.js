import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const Products = () => {
  const { logout } = useContext(AuthContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/products")
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Produtos</h1>
        <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded">Sair</button>
      </div>
      <ul className="mt-4">
        {products.map(product => (
          <li key={product.id} className="p-4 border rounded shadow mb-2">
            <h2 className="text-lg font-bold">{product.name}</h2>
            <p>{product.description}</p>
            <p className="text-green-600">R$ {product.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;
