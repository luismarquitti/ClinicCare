import React, { useState } from 'react';
import { useAppStore } from '../store';
import { Wrench, Plus, Calendar, MapPin, DollarSign } from 'lucide-react';

export function Maintenance() {
  const { maintenanceLogs, addMaintenanceLog, user } = useAppStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddLog = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    addMaintenanceLog({
      date: formData.get('date') as string,
      description: formData.get('description') as string,
      location: formData.get('location') as string,
      type: formData.get('type') as 'preventiva' | 'corretiva',
      cost: Number(formData.get('cost')),
      recordedBy: user?.uid || 'unknown'
    });
    setIsModalOpen(false);
  };

  const getLogTypeColor = (type: string) => {
    switch (type) {
      case 'preventiva': return 'bg-blue-100 text-blue-700';
      case 'corretiva': return 'bg-amber-100 text-amber-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Registro de Manutenção</h1>
          <p className="text-slate-500">Acompanhamento e histórico de atividades de manutenção.</p>
        </div>
        {user?.role === 'admin' && (
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            <Plus size={20} />
            Nova Manutenção
          </button>
        )}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-sm border-b border-slate-100">
                <th className="p-4 font-medium">Data</th>
                <th className="p-4 font-medium">Descrição</th>
                <th className="p-4 font-medium">Localização</th>
                <th className="p-4 font-medium">Tipo</th>
                <th className="p-4 font-medium">Custo</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {maintenanceLogs.map(log => (
                <tr key={log.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 text-slate-900">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-slate-400" />
                      {new Date(log.date).toLocaleDateString('pt-BR')}
                    </div>
                  </td>
                  <td className="p-4 text-slate-700">{log.description}</td>
                  <td className="p-4 text-slate-500">
                    <div className="flex items-center gap-2">
                      <MapPin size={16} className="text-slate-400" />
                      {log.location}
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium uppercase ${getLogTypeColor(log.type)}`}>
                      {log.type}
                    </span>
                  </td>
                  <td className="p-4 font-medium text-slate-900">
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(log.cost)}
                  </td>
                </tr>
              ))}
              {maintenanceLogs.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-500">
                    Nenhum registro de manutenção encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Nova Manutenção */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-xl">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
              <h2 className="text-xl font-bold text-slate-900">Registrar Manutenção</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                &times;
              </button>
            </div>
            <form onSubmit={handleAddLog} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Data</label>
                <input name="date" type="date" required defaultValue={new Date().toISOString().split('T')[0]} className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Descrição</label>
                <textarea name="description" required rows={3} placeholder="Detalhes da manutenção..." className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary outline-none resize-none"></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Localização</label>
                <input name="location" type="text" required placeholder="Ex: Quarto 102B" className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Tipo</label>
                  <select name="type" className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary outline-none bg-white">
                    <option value="preventiva">Preventiva</option>
                    <option value="corretiva">Corretiva</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Custo (R$)</label>
                  <input name="cost" type="number" step="0.01" min="0" required placeholder="0.00" className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary outline-none" />
                </div>
              </div>
              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium transition-colors">
                  Cancelar
                </button>
                <button type="submit" className="px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg font-medium transition-colors">
                  Salvar Registro
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
