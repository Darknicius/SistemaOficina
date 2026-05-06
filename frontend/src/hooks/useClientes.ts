import { useState, useEffect, useCallback } from "react";
import { Cliente, ClienteAPI } from "../types/cliente";

const API_URL = "http://localhost:5000";

export const useClientes = () => {
  const [clientes, setClientes] = useState<ClienteAPI[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchClientes = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/clientes/all`);
      if (!res.ok) throw new Error("Erro ao buscar clientes");
      const data = await res.json();
      setClientes(data.clientes ?? []);
    } catch (err: any) {
      setError(err.message ?? "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteCliente = useCallback(
    async (id: number): Promise<boolean> => {
      try {
        const res = await fetch(`${API_URL}/clientes/${id}`, {
          method: "DELETE",
        });
        if (!res.ok) throw new Error("Erro ao deletar cliente");
        await fetchClientes();
        return true;
      } catch (err: any) {
        setError(err.message ?? "Erro ao deletar");
        return false;
      }
    },
    [fetchClientes]
  );

  const createCliente = useCallback(
    async (cliente: Cliente): Promise<boolean> => {
      try {
        const res = await fetch(`${API_URL}/clientes/adicionar`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(cliente),
        });
        if (!res.ok) throw new Error("Erro ao criar cliente");
        await fetchClientes();
        return true;
      } catch (err: any) {
        setError(err.message ?? "Erro ao criar");
        return false;
      }
    },
    [fetchClientes]
  );

  useEffect(() => {
    fetchClientes();
  }, [fetchClientes]);

  return { clientes, loading, error, fetchClientes, deleteCliente, createCliente };
};