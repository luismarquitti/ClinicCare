import { useState } from 'react';
import { useAppStore } from '../store';
import { Pill, CheckCircle, XCircle, Clock } from 'lucide-react';

export function Nursing() {
  const { residents, medications, administrations, updateAdministrationStatus, user } = useAppStore();
  const [activeTab, setActiveTab] = useState<'pendentes' | 'administrados'>('pendentes');

  const getResidentName = (id: string) => residents.find(r => r.id === id)?.name || 'Desconhecido';
  const getMedicationName = (id: string) => medications.find(m => m.id === id)?.name || 'Desconhecido';
  const getMedicationDosage = (id: string) => medications.find(m => m.id === id)?.dosage || '';

  const pendingAdministrations = administrations.filter(a => a.status === 'pendente').sort((a, b) => new Date(a.scheduledTime).getTime() - new Date(b.scheduledTime).getTime());
  const completedAdministrations = administrations.filter(a => a.status !== 'pendente').sort((a, b) => new Date(b.scheduledTime).getTime() - new Date(a.scheduledTime).getTime());

  const handleAdminister = (id: string) => {
    if (user) {
      updateAdministrationStatus(id, 'administrado', user.uid);
    }
  };

  const handleSkip = (id: string) => {
    if (user) {
      const reason = prompt('Motivo para não administrar:');
      if (reason) {
        updateAdministrationStatus(id, 'nao_administrado', user.uid, reason);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Painel de Enfermagem</h1>
        <p className="text-slate-500">Gestão de medicações e cuidados do turno.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="flex border-b border-slate-100">
          <button 
            className={`flex-1 py-4 text-sm font-medium border-b-2 transition-colors ${activeTab === 'pendentes' ? 'border-primary text-primary' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
            onClick={() => setActiveTab('pendentes')}
          >
            <div className="flex items-center justify-center gap-2">
              <Clock size={18} />
              Pendentes ({pendingAdministrations.length})
            </div>
          </button>
          <button 
            className={`flex-1 py-4 text-sm font-medium border-b-2 transition-colors ${activeTab === 'administrados' ? 'border-primary text-primary' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
            onClick={() => setActiveTab('administrados')}
          >
            <div className="flex items-center justify-center gap-2">
              <CheckCircle size={18} />
              Histórico
            </div>
          </button>
        </div>

        <div className="p-6">
          {activeTab === 'pendentes' && (
            <div className="space-y-4">
              {pendingAdministrations.map(admin => (
                <div key={admin.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200 gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                      <Pill size={20} />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900">{getResidentName(admin.residentId)}</h3>
                      <p className="text-slate-700 font-medium">{getMedicationName(admin.medicationId)} - {getMedicationDosage(admin.medicationId)}</p>
                      <p className="text-sm text-slate-500 flex items-center gap-1 mt-1">
                        <Clock size={14} />
                        Horário: {new Date(admin.scheduledTime).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button 
                      onClick={() => handleSkip(admin.id)}
                      className="px-4 py-2 text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-lg font-medium transition-colors text-sm"
                    >
                      Não Administrado
                    </button>
                    <button 
                      onClick={() => handleAdminister(admin.id)}
                      className="px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg font-medium transition-colors text-sm flex items-center gap-2"
                    >
                      <CheckCircle size={16} />
                      Administrar
                    </button>
                  </div>
                </div>
              ))}
              {pendingAdministrations.length === 0 && (
                <div className="text-center py-12 text-slate-500">
                  <CheckCircle size={48} className="mx-auto text-primary/50 mb-4" />
                  <p className="text-lg font-medium text-slate-900">Tudo em dia!</p>
                  <p>Não há medicações pendentes para este turno.</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'administrados' && (
            <div className="space-y-4">
              {completedAdministrations.map(admin => (
                <div key={admin.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200 gap-4">
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${admin.status === 'administrado' ? 'bg-primary/10 text-primary' : 'bg-rose-100 text-rose-600'}`}>
                      {admin.status === 'administrado' ? <CheckCircle size={20} /> : <XCircle size={20} />}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900">{getResidentName(admin.residentId)}</h3>
                      <p className="text-slate-700 font-medium">{getMedicationName(admin.medicationId)} - {getMedicationDosage(admin.medicationId)}</p>
                      <div className="text-sm text-slate-500 mt-1 space-y-1">
                        <p>Agendado: {new Date(admin.scheduledTime).toLocaleString('pt-BR')}</p>
                        {admin.administeredTime && (
                          <p>Realizado: {new Date(admin.administeredTime).toLocaleString('pt-BR')}</p>
                        )}
                        {admin.notes && (
                          <p className="text-rose-600">Motivo: {admin.notes}</p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="shrink-0">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${admin.status === 'administrado' ? 'bg-primary/10 text-primary' : 'bg-rose-100 text-rose-700'}`}>
                      {admin.status === 'administrado' ? 'Administrado' : 'Não Administrado'}
                    </span>
                  </div>
                </div>
              ))}
              {completedAdministrations.length === 0 && (
                <div className="text-center py-12 text-slate-500">
                  Nenhum histórico encontrado.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
