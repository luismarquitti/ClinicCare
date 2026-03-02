import React, { useState } from 'react';
import { useAppStore } from '../store';
import { Asset, WorkOrder } from '../types';

export function Maintenance() {
  const { assets, workOrders, user, addAsset, updateAsset, addWorkOrder, updateWorkOrderStatus } = useAppStore();
  const [activeTab, setActiveTab] = useState<'ativos' | 'ordens'>('ativos');

  const [isAddAssetModalOpen, setIsAddAssetModalOpen] = useState(false);
  const [newAsset, setNewAsset] = useState<Partial<Asset>>({
    name: '', category: 'equipment', location: '', status: 'operating'
  });

  const [isAddOrderModalOpen, setIsAddOrderModalOpen] = useState(false);
  const [newOrder, setNewOrder] = useState<Partial<WorkOrder>>({
    title: '', description: '', location: '', type: 'preventiva', priority: 'medium', status: 'open'
  });

  const [selectedOrder, setSelectedOrder] = useState<WorkOrder | null>(null);
  const [isCompleteOrderModalOpen, setIsCompleteOrderModalOpen] = useState(false);
  const [orderCompletionCost, setOrderCompletionCost] = useState<number>(0);

  const handleAddAsset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newAsset.name && newAsset.location) {
      await addAsset(newAsset as Omit<Asset, 'id'>);
      setIsAddAssetModalOpen(false);
      setNewAsset({ name: '', category: 'equipment', location: '', status: 'operating' });
    }
  };

  const handleAddOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newOrder.title && newOrder.description && newOrder.location) {
      await addWorkOrder({
        ...newOrder,
        reportedBy: user?.uid || 'unknown',
        createdAt: new Date().toISOString()
      } as Omit<WorkOrder, 'id'>);

      // If linked to an asset, we might want to automatically update the asset's status
      if (newOrder.assetId && newOrder.type === 'corretiva') {
        await updateAsset(newOrder.assetId, { status: 'in_repair' });
      }

      setIsAddOrderModalOpen(false);
      setNewOrder({ title: '', description: '', location: '', type: 'preventiva', priority: 'medium', status: 'open' });
    }
  };

  const handleCompleteOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedOrder) {
      await updateWorkOrderStatus(selectedOrder.id, 'closed', new Date().toISOString(), orderCompletionCost);

      // If linked to an asset, restore its status to operating and update last maintenance
      if (selectedOrder.assetId) {
        await updateAsset(selectedOrder.assetId, {
          status: 'operating',
          lastMaintenanceDate: new Date().toISOString()
        });
      }

      setIsCompleteOrderModalOpen(false);
      setSelectedOrder(null);
      setOrderCompletionCost(0);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operating': return 'bg-success/10 text-success';
      case 'in_repair': return 'bg-warning/10 text-warning';
      case 'out_of_service': return 'bg-danger/10 text-danger';
      case 'open': return 'bg-blue-100 text-blue-700';
      case 'in_progress': return 'bg-warning/10 text-warning';
      case 'waiting_parts': return 'bg-purple-100 text-purple-700';
      case 'closed': return 'bg-success/10 text-success';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low': return 'text-success';
      case 'medium': return 'text-warning';
      case 'high': return 'text-orange-500';
      case 'critical': return 'text-danger font-bold';
      default: return 'text-text-muted';
    }
  };

  const getTranslatedStatus = (status: string) => {
    const translations: Record<string, string> = {
      'operating': 'Operante', 'in_repair': 'Em Reparo', 'out_of_service': 'Inativo',
      'open': 'Aberta', 'in_progress': 'Em Andamento', 'waiting_parts': 'Aguardando Peças', 'closed': 'Concluída'
    };
    return translations[status] || status;
  };

  return (
    <div className="w-full max-w-[1440px] mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-text-main dark:text-white tracking-tight">Manutenção e Facilidades</h1>
          <p className="text-text-muted dark:text-gray-400 mt-1">Gestão de ativos, equipamentos e ordens de serviço</p>
        </div>
      </div>

      <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
        <nav aria-label="Tabs" className="flex space-x-8 overflow-x-auto custom-scrollbar">
          <button
            onClick={() => setActiveTab('ativos')}
            className={`py-4 px-1 whitespace-nowrap inline-flex items-center text-sm font-bold border-b-[3px] transition-all ${activeTab === 'ativos' ? 'border-primary text-primary' : 'border-transparent text-text-muted hover:text-text-main hover:border-gray-300'}`}
          >
            <span className="material-symbols-outlined mr-2 text-[20px]">precision_manufacturing</span>
            Ativos e Equipamentos
          </button>
          <button
            onClick={() => setActiveTab('ordens')}
            className={`py-4 px-1 whitespace-nowrap inline-flex items-center text-sm font-bold border-b-[3px] transition-all ${activeTab === 'ordens' ? 'border-primary text-primary' : 'border-transparent text-text-muted hover:text-text-main hover:border-gray-300'}`}
          >
            <span className="material-symbols-outlined mr-2 text-[20px]">engineering</span>
            Ordens de Serviço
          </button>
        </nav>
      </div>

      <div className="bg-white dark:bg-surface-dark rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        {activeTab === 'ativos' && (
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-text-main dark:text-white">Inventário de Ativos</h2>
              <button
                onClick={() => setIsAddAssetModalOpen(true)}
                className="text-primary hover:text-primary/80 font-medium text-sm transition-colors flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-[18px]">add</span> Novo Ativo
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-light border-y border-gray-200 dark:bg-surface-dark/50 dark:border-gray-700 text-sm font-semibold text-text-muted">
                    <th className="py-3 px-4">Nome</th>
                    <th className="py-3 px-4">Localização</th>
                    <th className="py-3 px-4">Categoria</th>
                    <th className="py-3 px-4 text-center">Última Manutenção</th>
                    <th className="py-3 px-4 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {assets.map(asset => (
                    <tr key={asset.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-surface-light dark:hover:bg-surface-dark transition-colors">
                      <td className="py-3 px-4 font-medium text-text-main dark:text-white">{asset.name}</td>
                      <td className="py-3 px-4 text-text-muted">{asset.location}</td>
                      <td className="py-3 px-4 capitalize text-text-muted">{asset.category}</td>
                      <td className="py-3 px-4 text-center text-text-muted">
                        {asset.lastMaintenanceDate ? new Date(asset.lastMaintenanceDate).toLocaleDateString('pt-BR') : '-'}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className={`px-2 py-1 rounded-full text-xs font-bold capitalize ${getStatusColor(asset.status)}`}>
                          {getTranslatedStatus(asset.status)}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {assets.length === 0 && (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-text-muted">Nenhum ativo registrado.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'ordens' && (
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-text-main dark:text-white">Ordens de Serviço em Aberto e Histórico</h2>
              <button
                onClick={() => setIsAddOrderModalOpen(true)}
                className="text-primary hover:text-primary/80 font-medium text-sm transition-colors flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-[18px]">add</span> Nova O.S.
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-light border-y border-gray-200 dark:bg-surface-dark/50 dark:border-gray-700 text-sm font-semibold text-text-muted">
                    <th className="py-3 px-4">Abertura</th>
                    <th className="py-3 px-4">Ativo/Local</th>
                    <th className="py-3 px-4">Descrição</th>
                    <th className="py-3 px-4 text-center">Prioridade</th>
                    <th className="py-3 px-4 text-center">Status</th>
                    <th className="py-3 px-4 text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {workOrders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map(order => {
                    const linkedAsset = assets.find(a => a.id === order.assetId);
                    return (
                      <tr key={order.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-surface-light dark:hover:bg-surface-dark transition-colors">
                        <td className="py-3 px-4 text-text-muted">{new Date(order.createdAt).toLocaleDateString('pt-BR')}</td>
                        <td className="py-3 px-4">
                          <p className="font-medium text-text-main dark:text-white">{linkedAsset ? linkedAsset.name : 'Facilidade Geral'}</p>
                          <p className="text-xs text-text-muted">{order.location}</p>
                        </td>
                        <td className="py-3 px-4 text-text-muted max-w-xs truncate">{order.title}</td>
                        <td className="py-3 px-4 text-center">
                          <span className={`capitalize font-medium ${getPriorityColor(order.priority)}`}>{order.priority}</span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span className={`px-2 py-1 rounded-full text-xs font-bold capitalize ${getStatusColor(order.status)}`}>
                            {getTranslatedStatus(order.status)}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          {order.status !== 'closed' && (
                            <button
                              onClick={() => {
                                setSelectedOrder(order);
                                setIsCompleteOrderModalOpen(true);
                              }}
                              className="text-primary hover:text-primary/80 transition-colors p-1"
                              title="Concluir O.S."
                            >
                              <span className="material-symbols-outlined text-[20px]">check_circle</span>
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                  {workOrders.length === 0 && (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-text-muted">Nenhuma ordem de serviço registrada.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Modal Add Asset */}
      {isAddAssetModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-surface-dark w-full max-w-md rounded-2xl shadow-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h3 className="text-lg font-bold text-text-main dark:text-white">Registrar Novo Ativo</h3>
              <button onClick={() => setIsAddAssetModalOpen(false)} className="text-text-muted hover:text-text-main transition-colors">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <form onSubmit={handleAddAsset} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-main dark:text-white mb-1">Nome/Identificação</label>
                <input type="text" required placeholder="Ex: Cadeira de Rodas 05" value={newAsset.name} onChange={(e) => setNewAsset({ ...newAsset, name: e.target.value })} className="w-full px-3 py-2 bg-background-light dark:bg-background-dark border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-main dark:text-white mb-1">Localização</label>
                <input type="text" required placeholder="Ex: Quarto 102B" value={newAsset.location} onChange={(e) => setNewAsset({ ...newAsset, location: e.target.value })} className="w-full px-3 py-2 bg-background-light dark:bg-background-dark border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-main dark:text-white mb-1">Categoria</label>
                  <select value={newAsset.category} onChange={(e) => setNewAsset({ ...newAsset, category: e.target.value as any })} className="w-full px-3 py-2 bg-background-light dark:bg-background-dark border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary outline-none">
                    <option value="equipment">Equipamento Médico</option>
                    <option value="furniture">Mobiliário</option>
                    <option value="facility">Instalação(Predial)</option>
                    <option value="vehicle">Veículo</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-main dark:text-white mb-1">Data da Compra</label>
                  <input type="date" value={newAsset.purchaseDate || ''} onChange={(e) => setNewAsset({ ...newAsset, purchaseDate: e.target.value })} className="w-full px-3 py-2 bg-background-light dark:bg-background-dark border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary outline-none" />
                </div>
              </div>
              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setIsAddAssetModalOpen(false)} className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors font-medium border border-gray-200 dark:border-gray-700">Cancelar</button>
                <button type="submit" className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium">Salvar Ativo</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Add Work Order */}
      {isAddOrderModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-surface-dark w-full max-w-lg rounded-2xl shadow-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h3 className="text-lg font-bold text-text-main dark:text-white">Nova Ordem de Serviço</h3>
              <button onClick={() => setIsAddOrderModalOpen(false)} className="text-text-muted hover:text-text-main transition-colors">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <form onSubmit={handleAddOrder} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-main dark:text-white mb-1">Título / Resumo</label>
                <input type="text" required placeholder="Ex: Troca de lâmpada no Banheiro" value={newOrder.title} onChange={(e) => setNewOrder({ ...newOrder, title: e.target.value })} className="w-full px-3 py-2 bg-background-light dark:bg-background-dark border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-main dark:text-white mb-1">Descrição do Problema</label>
                <textarea required rows={3} value={newOrder.description} onChange={(e) => setNewOrder({ ...newOrder, description: e.target.value })} className="w-full px-3 py-2 bg-background-light dark:bg-background-dark border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary outline-none resize-none"></textarea>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-main dark:text-white mb-1">Ativo Vinculado (Opcional)</label>
                  <select value={newOrder.assetId || ''} onChange={(e) => {
                    const assetId = e.target.value;
                    const asset = assets.find(a => a.id === assetId);
                    setNewOrder({ ...newOrder, assetId, location: asset ? asset.location : newOrder.location });
                  }} className="w-full px-3 py-2 bg-background-light dark:bg-background-dark border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary outline-none">
                    <option value="">Nenhum (Facilidade Geral)</option>
                    {assets.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-main dark:text-white mb-1">Localização</label>
                  <input type="text" required placeholder="Ex: Recepção" value={newOrder.location} onChange={(e) => setNewOrder({ ...newOrder, location: e.target.value })} className="w-full px-3 py-2 bg-background-light dark:bg-background-dark border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary outline-none" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-main dark:text-white mb-1">Tipo</label>
                  <select value={newOrder.type} onChange={(e) => setNewOrder({ ...newOrder, type: e.target.value as 'preventiva' | 'corretiva' })} className="w-full px-3 py-2 bg-background-light dark:bg-background-dark border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary outline-none">
                    <option value="corretiva">Corretiva</option>
                    <option value="preventiva">Preventiva</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-main dark:text-white mb-1">Prioridade</label>
                  <select value={newOrder.priority} onChange={(e) => setNewOrder({ ...newOrder, priority: e.target.value as any })} className="w-full px-3 py-2 bg-background-light dark:bg-background-dark border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary outline-none">
                    <option value="low">Baixa</option>
                    <option value="medium">Média</option>
                    <option value="high">Alta</option>
                    <option value="critical">Crítica</option>
                  </select>
                </div>
              </div>
              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setIsAddOrderModalOpen(false)} className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors font-medium border border-gray-200 dark:border-gray-700">Cancelar</button>
                <button type="submit" className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium">Abrir O.S.</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Complete Work Order */}
      {isCompleteOrderModalOpen && selectedOrder && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-surface-dark w-full max-w-md rounded-2xl shadow-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h3 className="text-lg font-bold text-text-main dark:text-white">Concluir Ordem de Serviço</h3>
              <button onClick={() => setIsCompleteOrderModalOpen(false)} className="text-text-muted hover:text-text-main transition-colors">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <form onSubmit={handleCompleteOrder} className="p-6 space-y-4">
              <div className="bg-surface-light dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                <p className="font-bold text-text-main dark:text-white">{selectedOrder.title}</p>
                <p className="text-sm text-text-muted mt-1">{selectedOrder.description}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-text-main dark:text-white mb-1">Custo Total (R$)</label>
                <input type="number" step="0.01" min="0" required value={orderCompletionCost || ''} onChange={(e) => setOrderCompletionCost(Number(e.target.value))} placeholder="Ex: 150.00" className="w-full px-3 py-2 bg-background-light dark:bg-background-dark border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary outline-none" />
                <p className="text-xs text-text-muted mt-1">Este custo poderá ser faturado como despesa de manutenção pela equipe financeira.</p>
              </div>
              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setIsCompleteOrderModalOpen(false)} className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors font-medium border border-gray-200 dark:border-gray-700">Cancelar</button>
                <button type="submit" className="px-4 py-2 bg-success text-white rounded-lg hover:bg-success/90 transition-colors font-medium">Validar Conclusão</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
