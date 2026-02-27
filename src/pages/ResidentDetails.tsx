import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppStore } from '../store';
import { ArrowLeft, Activity, FileText, Pill, Plus } from 'lucide-react';

export function ResidentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { residents, vitalSigns, evolutionRecords, addVitalSign, addEvolutionRecord, addMedication, user } = useAppStore();
  const [activeTab, setActiveTab] = useState<'evolucao' | 'sinais' | 'prescricao'>('evolucao');

  const resident = residents.find(r => r.id === id);
  const residentVitals = vitalSigns.filter(v => v.residentId === id).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const residentEvolutions = evolutionRecords.filter(e => e.residentId === id).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!resident) {
    return <div className="p-8">Residente não encontrado.</div>;
  }

  const handleAddVital = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    addVitalSign({
      residentId: resident.id,
      date: new Date().toISOString(),
      bloodPressure: formData.get('bp') as string,
      heartRate: Number(formData.get('hr')),
      temperature: Number(formData.get('temp')),
      oxygenSaturation: Number(formData.get('spo2')),
      recordedBy: user?.uid || 'unknown'
    });
    setIsModalOpen(false);
  };

  const handleAddEvolution = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    addEvolutionRecord({
      residentId: resident.id,
      date: new Date().toISOString(),
      notes: formData.get('notes') as string,
      recordedBy: user?.uid || 'unknown'
    });
    setIsModalOpen(false);
  };

  const handleAddMedication = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    addMedication({
      residentId: resident.id,
      name: formData.get('name') as string,
      dosage: formData.get('dosage') as string,
      frequency: formData.get('frequency') as string,
      startDate: new Date().toISOString(),
      active: true
    });
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate('/residents')} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{resident.name}</h1>
          <p className="text-slate-500">Prontuário Eletrônico - Quarto {resident.room}</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="flex border-b border-slate-100">
          <button 
            className={`flex-1 py-4 text-sm font-medium border-b-2 transition-colors ${activeTab === 'evolucao' ? 'border-primary text-primary' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
            onClick={() => setActiveTab('evolucao')}
          >
            <div className="flex items-center justify-center gap-2">
              <FileText size={18} />
              Evolução Diária
            </div>
          </button>
          <button 
            className={`flex-1 py-4 text-sm font-medium border-b-2 transition-colors ${activeTab === 'sinais' ? 'border-primary text-primary' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
            onClick={() => setActiveTab('sinais')}
          >
            <div className="flex items-center justify-center gap-2">
              <Activity size={18} />
              Sinais Vitais
            </div>
          </button>
          <button 
            className={`flex-1 py-4 text-sm font-medium border-b-2 transition-colors ${activeTab === 'prescricao' ? 'border-primary text-primary' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
            onClick={() => setActiveTab('prescricao')}
          >
            <div className="flex items-center justify-center gap-2">
              <Pill size={18} />
              Prescrição
            </div>
          </button>
        </div>

        <div className="p-6">
          <div className="flex justify-end mb-6">
            <button 
              onClick={() => {
                if (activeTab === 'prescricao') {
                  navigate(`/eprescription/${resident.id}`);
                } else {
                  setIsModalOpen(true);
                }
              }}
              className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              <Plus size={20} />
              {activeTab === 'evolucao' ? 'Nova Evolução' : activeTab === 'sinais' ? 'Registrar Sinais' : 'Nova Prescrição'}
            </button>
          </div>

          {activeTab === 'evolucao' && (
            <div className="space-y-4">
              {residentEvolutions.map(evo => (
                <div key={evo.id} className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-slate-900">
                      {new Date(evo.date).toLocaleString('pt-BR')}
                    </span>
                    <span className="text-xs text-slate-500">Por: {evo.recordedBy}</span>
                  </div>
                  <p className="text-slate-700 whitespace-pre-wrap">{evo.notes}</p>
                </div>
              ))}
              {residentEvolutions.length === 0 && (
                <p className="text-center text-slate-500 py-8">Nenhuma evolução registrada.</p>
              )}
            </div>
          )}

          {activeTab === 'sinais' && (
            <div className="space-y-4">
              <div className="grid grid-cols-5 gap-4 text-sm font-medium text-slate-500 px-4 mb-2">
                <div>Data/Hora</div>
                <div>PA (mmHg)</div>
                <div>FC (bpm)</div>
                <div>Temp (°C)</div>
                <div>SpO2 (%)</div>
              </div>
              {residentVitals.map(vital => (
                <div key={vital.id} className="grid grid-cols-5 gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100 items-center">
                  <div className="text-sm text-slate-900">{new Date(vital.date).toLocaleString('pt-BR')}</div>
                  <div className="text-slate-700 font-medium">{vital.bloodPressure}</div>
                  <div className="text-slate-700 font-medium">{vital.heartRate}</div>
                  <div className="text-slate-700 font-medium">{vital.temperature}</div>
                  <div className="text-slate-700 font-medium">{vital.oxygenSaturation}</div>
                </div>
              ))}
              {residentVitals.length === 0 && (
                <p className="text-center text-slate-500 py-8">Nenhum sinal vital registrado.</p>
              )}
            </div>
          )}

          {activeTab === 'prescricao' && (
            <div className="text-center text-slate-500 py-8">
              <Pill size={48} className="mx-auto text-slate-300 mb-4" />
              <p>Prescrições ativas aparecerão aqui.</p>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      {isModalOpen && activeTab === 'sinais' && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-xl">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
              <h2 className="text-xl font-bold text-slate-900">Registrar Sinais Vitais</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">&times;</button>
            </div>
            <form onSubmit={handleAddVital} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Pressão Arterial (ex: 120/80)</label>
                <input name="bp" type="text" required className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Frequência Cardíaca (bpm)</label>
                <input name="hr" type="number" required className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Temperatura (°C)</label>
                <input name="temp" type="number" step="0.1" required className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Saturação O2 (%)</label>
                <input name="spo2" type="number" required className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary outline-none" />
              </div>
              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium transition-colors">Cancelar</button>
                <button type="submit" className="px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg font-medium transition-colors">Salvar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isModalOpen && activeTab === 'evolucao' && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-xl">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
              <h2 className="text-xl font-bold text-slate-900">Nova Evolução</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">&times;</button>
            </div>
            <form onSubmit={handleAddEvolution} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Anotações Clínicas</label>
                <textarea name="notes" rows={6} required className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary outline-none resize-none"></textarea>
              </div>
              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium transition-colors">Cancelar</button>
                <button type="submit" className="px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg font-medium transition-colors">Salvar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
