import { useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { ItemService } from "../services/itemService";

interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  imagen: string;
}

export const PaginaProducto = () => {
  const { id } = useParams<{ id: string}>();
  const idNumber = Number(id); // Obtén el ID del producto desde la URL
  const [producto, setProducto] = useState<Producto | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const itemService = useRef(new ItemService()).current;

  useEffect(() => {
    if (!id) {
      setError(true); // Handle the case where id is undefined
      setLoading(false);
      return;
    }
    const fetchProducto = async () => {
      try {
        const response = await itemService.getByUserId(idNumber);
        if (!response.ok) throw new Error("Producto no encontrado");
        const data = await response.json();
        setProducto(data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProducto();
  }, [id]);

  if (loading) {
    return <div className="container mt-4"><h1>Cargando producto...</h1></div>;
  }

  if (error || !producto) {
    return <div className="container mt-4"><h1>Producto no encontrado</h1></div>;
  }

  return (
    <div className="container mt-4">
      <h1 className="fw-bold text-success">{producto.nombre}</h1>
      <img src={producto.imagen} alt={producto.nombre} className="img-fluid rounded mb-4" />
      <p>{producto.descripcion}</p>
      <h3 className="fw-bold text-primary">{producto.precio} Créditos</h3>
    </div>
  );
};