import React, { createContext, useState } from 'react';

type FinanceContextType = {
  ganhos: { id: number; descricao: string; valor: number }[];
  gastos: { id: number; descricao: string; valor: number }[];
  adicionarGanho: (descricao: string, valor: number) => void;
  adicionarGasto: (descricao: string, valor: number) => void;
  setGanhos: (ganhos: { id: number; descricao: string; valor: number }[]) => void;
  setGastos: (gastos: { id: number; descricao: string; valor: number }[]) => void;
  total: number;
};

export const FinanceContext = createContext<FinanceContextType | null>(null);

export const FinanceProvider = ({ children }: { children: React.ReactNode }) => {
  const [ganhos, setGanhos] = useState<{ id: number; descricao: string; valor: number }[]>([]);
  const [gastos, setGastos] = useState<{ id: number; descricao: string; valor: number }[]>([]);

  const adicionarGanho = (descricao: string, valor: number) => {
    setGanhos([...ganhos, { id: Date.now(), descricao, valor }]);
  };

  const adicionarGasto = (descricao: string, valor: number) => {
    setGastos([...gastos, { id: Date.now(), descricao, valor }]);
  };

  const total = ganhos.reduce((acc, ganho) => acc + ganho.valor, 0) - gastos.reduce((acc, gasto) => acc + gasto.valor, 0);

  return (
    <FinanceContext.Provider value={{ ganhos, gastos, adicionarGanho, adicionarGasto, setGanhos, setGastos, total }}>
      {children}
    </FinanceContext.Provider>
  );
};
