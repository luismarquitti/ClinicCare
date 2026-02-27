import { useState } from 'react';
import { useAppStore } from '../store';

export function Financial() {
  const { residents, billingItems, addBillingItem } = useAppStore();
  const [activeTab, setActiveTab] = useState<'faturas' | 'despesas' | 'relatorios'>('faturas');

  const pendingBillingItems = billingItems.filter(b => b.status === 'pendente');
  const totalPending = pendingBillingItems.reduce((acc, curr) => acc + curr.amount, 0);

  const getResidentName = (id: string) => residents.find(r => r.id === id)?.name || 'Desconhecido';

  const handleGenerateInvoice = (residentId: string) => {
    alert(`Fatura gerada para o residente ${getResidentName(residentId)} com sucesso! (Mock)`);
  };

  // Calculate some mock summary data
  const receitasPrevistas = 145000;
  const despesasOperacionais = 82350;
  const fluxoCaixa = receitasPrevistas - despesasOperacionais;

  return (
    <div className="w-full max-w-[1440px] mx-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-text-main dark:text-white tracking-tight">Painel Financeiro</h1>
          <p className="text-text-muted dark:text-gray-400 mt-1">Visão geral de faturamento e despesas da clínica</p>
        </div>
        <button className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-full font-medium hover:bg-primary/90 transition-shadow shadow-md hover:shadow-lg active:scale-95">
          <span className="material-symbols-outlined text-[20px]">add</span>
          Nova Fatura
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {/* Card 1: Receitas */}
        <div className="bg-white dark:bg-surface-dark rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 relative overflow-hidden group hover:shadow-md transition-all">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-success/10 rounded-xl text-success">
              <span className="material-symbols-outlined">trending_up</span>
            </div>
            <span className="flex items-center text-xs font-medium text-success bg-success/5 px-2 py-1 rounded-full">
              +5.2% <span className="material-symbols-outlined text-[14px] ml-1">arrow_upward</span>
            </span>
          </div>
          <p className="text-sm font-medium text-text-muted mb-1">Receitas Previstas</p>
          <h3 className="text-3xl font-bold text-text-main dark:text-white">
            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(receitasPrevistas)}
          </h3>
          <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br from-success/5 to-transparent rounded-full blur-xl group-hover:bg-success/10 transition-colors"></div>
        </div>

        {/* Card 2: Despesas */}
        <div className="bg-white dark:bg-surface-dark rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 relative overflow-hidden group hover:shadow-md transition-all">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-danger/10 rounded-xl text-danger">
              <span className="material-symbols-outlined">trending_down</span>
            </div>
            <span className="flex items-center text-xs font-medium text-danger bg-danger/5 px-2 py-1 rounded-full">
              +1.8% <span className="material-symbols-outlined text-[14px] ml-1">arrow_upward</span>
            </span>
          </div>
          <p className="text-sm font-medium text-text-muted mb-1">Despesas Operacionais</p>
          <h3 className="text-3xl font-bold text-text-main dark:text-white">
            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(despesasOperacionais)}
          </h3>
          <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br from-danger/5 to-transparent rounded-full blur-xl group-hover:bg-danger/10 transition-colors"></div>
        </div>

        {/* Card 3: Fluxo */}
        <div className="bg-primary text-white rounded-xl p-6 shadow-lg shadow-primary/20 relative overflow-hidden group hover:shadow-xl transition-all">
          <div className="flex justify-between items-start mb-4 relative z-10">
            <div className="p-3 bg-white/20 rounded-xl text-white backdrop-blur-sm">
              <span className="material-symbols-outlined">account_balance</span>
            </div>
            <span className="flex items-center text-xs font-medium text-white bg-white/20 px-2 py-1 rounded-full backdrop-blur-sm">
              +12.4% <span className="material-symbols-outlined text-[14px] ml-1">arrow_upward</span>
            </span>
          </div>
          <p className="text-sm font-medium text-white/80 mb-1 relative z-10">Fluxo de Caixa</p>
          <h3 className="text-3xl font-bold text-white relative z-10">
            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(fluxoCaixa)}
          </h3>
          {/* Decorative Circle */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-2xl"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-secondary/30 rounded-full -ml-8 -mb-8 blur-xl"></div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
        <nav aria-label="Tabs" className="flex space-x-8">
          <button 
            onClick={() => setActiveTab('faturas')}
            className={`py-4 px-1 inline-flex items-center text-sm font-bold border-b-[3px] transition-all ${activeTab === 'faturas' ? 'border-primary text-primary' : 'border-transparent text-text-muted hover:text-text-main hover:border-gray-300'}`}
          >
            <span className="material-symbols-outlined mr-2 text-[20px]">receipt_long</span>
            Faturamento de Residentes
          </button>
          <button 
            onClick={() => setActiveTab('despesas')}
            className={`py-4 px-1 inline-flex items-center text-sm font-bold border-b-[3px] transition-all ${activeTab === 'despesas' ? 'border-primary text-primary' : 'border-transparent text-text-muted hover:text-text-main hover:border-gray-300'}`}
          >
            <span className="material-symbols-outlined mr-2 text-[20px]">shopping_bag</span>
            Despesas da Clínica
          </button>
          <button 
            onClick={() => setActiveTab('relatorios')}
            className={`py-4 px-1 inline-flex items-center text-sm font-bold border-b-[3px] transition-all ${activeTab === 'relatorios' ? 'border-primary text-primary' : 'border-transparent text-text-muted hover:text-text-main hover:border-gray-300'}`}
          >
            <span className="material-symbols-outlined mr-2 text-[20px]">analytics</span>
            Relatórios
          </button>
        </nav>
      </div>

      {/* Table Section */}
      <div className="bg-white dark:bg-surface-dark rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <button className="p-2 text-text-muted hover:bg-surface-light rounded-lg transition-colors">
              <span className="material-symbols-outlined">filter_list</span>
            </button>
            <span className="text-sm font-medium text-text-muted">Filtrar por Status</span>
          </div>
          <button className="text-sm text-primary font-medium hover:underline flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px]">download</span> Exportar CSV
          </button>
        </div>

        {activeTab === 'faturas' && (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-light/50 dark:bg-surface-dark/50 text-text-muted text-xs uppercase tracking-wider font-semibold">
                    <th className="px-6 py-4 rounded-tl-lg">Nome do Residente</th>
                    <th className="px-6 py-4">Mensalidade Base</th>
                    <th className="px-6 py-4">Custos Variáveis</th>
                    <th className="px-6 py-4">Valor Total</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 rounded-tr-lg text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {residents.map((resident, index) => {
                    const residentItems = pendingBillingItems.filter(b => b.residentId === resident.id);
                    const custosVariaveis = residentItems.reduce((acc, curr) => acc + curr.amount, 0);
                    const mensalidadeBase = 4500; // Mock base value
                    const total = mensalidadeBase + custosVariaveis;
                    const status = total > 5000 ? 'Pendente' : 'Pago'; // Mock status logic
                    const statusColor = status === 'Pago' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';

                    return (
                      <tr key={resident.id} className="hover:bg-background-light dark:hover:bg-surface-dark/80 transition-colors group">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
                              {resident.name.charAt(0)}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-text-main dark:text-white">{resident.name}</div>
                              <div className="text-xs text-text-muted">Quarto {resident.room}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-text-muted">
                          {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(mensalidadeBase)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-text-muted">
                          {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(custosVariaveis)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-text-main dark:text-white">
                          {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(total)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColor}`}>
                            {status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button 
                            onClick={() => handleGenerateInvoice(resident.id)}
                            className="text-text-muted hover:text-primary transition-colors p-2 rounded-full hover:bg-primary/10"
                            title="Gerar Fatura"
                          >
                            <span className="material-symbols-outlined">receipt</span>
                          </button>
                          <button className="text-text-muted hover:text-primary transition-colors p-2 rounded-full hover:bg-primary/10">
                            <span className="material-symbols-outlined">more_vert</span>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                  {residents.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-6 py-8 text-center text-text-muted">
                        Nenhum residente encontrado.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between px-6 py-4 bg-surface-light/30 border-t border-gray-100 dark:border-gray-800">
              <div className="flex-1 flex justify-between sm:hidden">
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-text-muted bg-white hover:bg-gray-50">Anterior</button>
                <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-text-muted bg-white hover:bg-gray-50">Próximo</button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-text-muted">
                    Mostrando <span className="font-medium text-text-main">1</span> até <span className="font-medium text-text-main">{Math.min(5, residents.length)}</span> de <span className="font-medium text-text-main">{residents.length}</span> resultados
                  </p>
                </div>
                <div>
                  <nav aria-label="Pagination" className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                    <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                      <span className="sr-only">Anterior</span>
                      <span className="material-symbols-outlined text-[16px]">chevron_left</span>
                    </button>
                    <button aria-current="page" className="z-10 bg-primary/10 border-primary text-primary relative inline-flex items-center px-4 py-2 border text-sm font-medium">1</button>
                    <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                      <span className="sr-only">Próximo</span>
                      <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'despesas' && (
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-text-main dark:text-white">Lançamentos Variáveis</h2>
              <button className="text-primary hover:text-primary/80 font-medium text-sm transition-colors">
                + Novo Lançamento Manual
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700 text-sm font-medium text-text-muted">
                    <th className="pb-3 font-medium">Data</th>
                    <th className="pb-3 font-medium">Residente</th>
                    <th className="pb-3 font-medium">Descrição</th>
                    <th className="pb-3 font-medium">Tipo</th>
                    <th className="pb-3 font-medium text-right">Valor</th>
                    <th className="pb-3 font-medium text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {billingItems.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map(item => (
                    <tr key={item.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-surface-light dark:hover:bg-surface-dark transition-colors">
                      <td className="py-3 text-text-muted">{new Date(item.date).toLocaleDateString('pt-BR')}</td>
                      <td className="py-3 font-medium text-text-main dark:text-white">{getResidentName(item.residentId)}</td>
                      <td className="py-3 text-text-muted">{item.description}</td>
                      <td className="py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${item.type === 'fixo' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'}`}>
                          {item.type === 'fixo' ? 'Fixo' : 'Variável'}
                        </span>
                      </td>
                      <td className="py-3 text-right font-medium text-text-main dark:text-white">
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.amount)}
                      </td>
                      <td className="py-3 text-center">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${item.status === 'faturado' ? 'bg-success/10 text-success' : 'bg-yellow-100 text-yellow-800'}`}>
                          {item.status === 'faturado' ? <span className="material-symbols-outlined text-[12px]">check_circle</span> : <span className="material-symbols-outlined text-[12px]">schedule</span>}
                          {item.status === 'faturado' ? 'Faturado' : 'Pendente'}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {billingItems.length === 0 && (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-text-muted">Nenhum lançamento encontrado.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'relatorios' && (
          <div className="p-12 text-center">
            <span className="material-symbols-outlined text-[48px] text-text-muted/30 mb-4">analytics</span>
            <h3 className="text-lg font-medium text-text-main dark:text-white mb-2">Relatórios Financeiros</h3>
            <p className="text-text-muted">A funcionalidade de relatórios detalhados estará disponível em breve.</p>
          </div>
        )}
      </div>
    </div>
  );
}
