import { useState } from "react";
import { buscarCep } from "../services/cepService";

export const useCep = () => {
  const [loading, setLoading] = useState(false);

  const getCep = async (cep: string) => {
    setLoading(true);
    const data = await buscarCep(cep);
    setLoading(false);
    return data;
  };

  return { getCep, loading };
};