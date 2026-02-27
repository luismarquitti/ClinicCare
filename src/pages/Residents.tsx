import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store';

export function Residents() {
  const { residents, vitalSigns, evolutionRecords } = useAppStore();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedResidentId, setSelectedResidentId] = useState<string | null>(residents.length > 0 ? residents[0].id : null);
  const [activeTab, setActiveTab] = useState<'saude' | 'dados' | 'financeiro'>('saude');

  const filteredResidents = residents.filter(r => 
    r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.cpf.includes(searchTerm) ||
    r.room.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedResident = residents.find(r => r.id === selectedResidentId);

  const getAge = (birthDate: string) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const getLatestVitals = (residentId: string) => {
    const vitals = vitalSigns.filter(v => v.residentId === residentId).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    return vitals.length > 0 ? vitals[0] : null;
  };

  const getResidentEvolutions = (residentId: string) => {
    return evolutionRecords.filter(e => e.residentId === residentId).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  };

  return (
    <div className="max-w-[1400px] mx-auto h-full flex flex-col xl:flex-row gap-6">
      {/* Left Column: List View */}
      <div className="flex-1 flex flex-col min-w-0 xl:max-w-[60%] 2xl:max-w-[65%]">
        {/* Actions Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="relative flex-1 min-w-[280px]">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted dark:text-gray-400">
              <span className="material-symbols-outlined">search</span>
            </span>
            <input 
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-text-main dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary placeholder:text-text-muted/70 transition-all" 
              placeholder="Buscar por nome, quarto ou status" 
            />
          </div>
          <button 
            onClick={() => navigate('/residents/new')}
            className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-sm"
          >
            <span className="material-symbols-outlined text-[20px]">add</span>
            <span>Adicionar Residente</span>
          </button>
        </div>

        {/* Table */}
        <div className="bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm flex-1 flex flex-col">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-background-light/50 dark:bg-background-dark/50 border-b border-gray-200 dark:border-gray-700">
                  <th className="px-6 py-4 text-xs font-semibold text-text-muted uppercase tracking-wider w-16">Avatar</th>
                  <th className="px-6 py-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Nome</th>
                  <th className="px-6 py-4 text-xs font-semibold text-text-muted uppercase tracking-wider w-24">Idade</th>
                  <th className="px-6 py-4 text-xs font-semibold text-text-muted uppercase tracking-wider w-32">Quarto</th>
                  <th className="px-6 py-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-semibold text-text-muted uppercase tracking-wider w-16"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {filteredResidents.map(resident => {
                  const isSelected = selectedResidentId === resident.id;
                  const age = getAge(resident.birthDate);
                  
                  return (
                    <tr 
                      key={resident.id}
                      onClick={() => setSelectedResidentId(resident.id)}
                      className={`group transition-colors cursor-pointer border-l-4 ${
                        isSelected 
                          ? 'bg-primary/5 border-l-primary dark:bg-primary/10' 
                          : 'hover:bg-background-light dark:hover:bg-surface-dark/80 border-l-transparent'
                      }`}
                    >
                      <td className="px-6 py-4">
                        <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
                          {resident.name.charAt(0)}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm font-medium text-text-main dark:text-white">{resident.name}</p>
                        <p className="text-xs text-text-muted lg:hidden">{age} anos • Quarto {resident.room}</p>
                      </td>
                      <td className="px-6 py-4 text-sm text-text-muted hidden sm:table-cell">{age}</td>
                      <td className="px-6 py-4 text-sm text-text-muted hidden sm:table-cell">{resident.room}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                          resident.status === 'ativo' 
                            ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' 
                            : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
                        }`}>
                          <span className={`h-1.5 w-1.5 rounded-full ${resident.status === 'ativo' ? 'bg-green-500' : 'bg-red-500'}`}></span>
                          {resident.status === 'ativo' ? 'Estável' : 'Inativo'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className={`material-symbols-outlined text-[20px] transition-colors ${isSelected ? 'text-primary' : 'text-text-muted group-hover:text-primary'}`}>
                          chevron_right
                        </span>
                      </td>
                    </tr>
                  );
                })}
                {filteredResidents.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-text-muted">
                      Nenhum residente encontrado.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center bg-background-light/30 dark:bg-background-dark/30 mt-auto">
            <p className="text-xs text-text-muted">Mostrando {filteredResidents.length} residentes</p>
            <div className="flex gap-2">
              <button className="p-1 rounded hover:bg-background-light dark:hover:bg-surface-dark text-text-muted disabled:opacity-50" disabled>
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <button className="p-1 rounded hover:bg-background-light dark:hover:bg-surface-dark text-text-muted">
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Detail View */}
      {selectedResident ? (
        <div className="w-full xl:w-[450px] 2xl:w-[500px] flex flex-col gap-6">
          {/* Summary Card */}
          <div className="bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-primary/20 to-primary/5"></div>
            <div className="relative flex flex-col items-center">
              <div className="h-28 w-28 rounded-full border-4 border-white dark:border-surface-dark bg-primary/10 text-primary flex items-center justify-center text-4xl font-bold shadow-md mb-4">
                {selectedResident.name.charAt(0)}
              </div>
              <h3 className="text-xl font-bold text-text-main dark:text-white text-center">{selectedResident.name}</h3>
              <p className="text-text-muted text-sm mb-4">Admitido em: {new Date(selectedResident.admissionDate).toLocaleDateString('pt-BR')}</p>
              
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                {selectedResident.allergies?.map((allergy, idx) => (
                  <span key={idx} className="px-3 py-1 rounded-full bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-xs font-semibold border border-red-100 dark:border-red-800/30 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">warning</span>
                    {allergy}
                  </span>
                ))}
                {selectedResident.comorbidities?.map((comorbidity, idx) => (
                  <span key={idx} className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold border border-primary/20">
                    {comorbidity}
                  </span>
                ))}
              </div>
              
              <div className="grid grid-cols-3 gap-4 w-full border-t border-gray-200 dark:border-gray-700 pt-4">
                <div className="text-center">
                  <p className="text-xs text-text-muted uppercase tracking-wider font-semibold">Idade</p>
                  <p className="text-lg font-bold text-text-main dark:text-white">{getAge(selectedResident.birthDate)}</p>
                </div>
                <div className="text-center border-l border-gray-200 dark:border-gray-700">
                  <p className="text-xs text-text-muted uppercase tracking-wider font-semibold">Quarto</p>
                  <p className="text-lg font-bold text-text-main dark:text-white">{selectedResident.room}</p>
                </div>
                <div className="text-center border-l border-gray-200 dark:border-gray-700">
                  <p className="text-xs text-text-muted uppercase tracking-wider font-semibold">Tipo Sang.</p>
                  <p className="text-lg font-bold text-text-main dark:text-white">{selectedResident.bloodType}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs & Content */}
          <div className="bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm flex-1 flex flex-col min-h-[400px]">
            {/* Tabs Header */}
            <div className="flex border-b border-gray-200 dark:border-gray-700">
              <button 
                onClick={() => setActiveTab('saude')}
                className={`flex-1 py-4 text-sm font-medium transition-colors focus:outline-none ${activeTab === 'saude' ? 'text-primary border-b-2 border-primary bg-primary/5' : 'text-text-muted hover:text-text-main dark:hover:text-white'}`}
              >
                Saúde
              </button>
              <button 
                onClick={() => setActiveTab('dados')}
                className={`flex-1 py-4 text-sm font-medium transition-colors focus:outline-none ${activeTab === 'dados' ? 'text-primary border-b-2 border-primary bg-primary/5' : 'text-text-muted hover:text-text-main dark:hover:text-white'}`}
              >
                Dados
              </button>
              <button 
                onClick={() => setActiveTab('financeiro')}
                className={`flex-1 py-4 text-sm font-medium transition-colors focus:outline-none ${activeTab === 'financeiro' ? 'text-primary border-b-2 border-primary bg-primary/5' : 'text-text-muted hover:text-text-main dark:hover:text-white'}`}
              >
                Financeiro
              </button>
            </div>

            {/* Tab Content */}
            <div className="p-6 flex-1 overflow-y-auto">
              {activeTab === 'saude' && (
                <>
                  {/* Vitals */}
                  <div className="mb-6">
                    <h4 className="text-sm font-bold text-text-main dark:text-white mb-3 flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary text-[20px]">monitor_heart</span>
                      Sinais Vitais (Últimos)
                    </h4>
                    {getLatestVitals(selectedResident.id) ? (
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-background-light dark:bg-background-dark p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                          <p className="text-xs text-text-muted">Pressão Arterial</p>
                          <p className="text-base font-semibold text-text-main dark:text-white">{getLatestVitals(selectedResident.id)?.bloodPressure} <span className="text-xs font-normal text-text-muted">mmHg</span></p>
                        </div>
                        <div className="bg-background-light dark:bg-background-dark p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                          <p className="text-xs text-text-muted">Batimentos</p>
                          <p className="text-base font-semibold text-text-main dark:text-white">{getLatestVitals(selectedResident.id)?.heartRate} <span className="text-xs font-normal text-text-muted">bpm</span></p>
                        </div>
                        <div className="bg-background-light dark:bg-background-dark p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                          <p className="text-xs text-text-muted">Temp.</p>
                          <p className="text-base font-semibold text-text-main dark:text-white">{getLatestVitals(selectedResident.id)?.temperature} <span className="text-xs font-normal text-text-muted">°C</span></p>
                        </div>
                        <div className="bg-background-light dark:bg-background-dark p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                          <p className="text-xs text-text-muted">Saturação</p>
                          <p className="text-base font-semibold text-text-main dark:text-white">{getLatestVitals(selectedResident.id)?.oxygenSaturation} <span className="text-xs font-normal text-text-muted">%</span></p>
                        </div>
                      </div>
                    ) : (
                      <p className="text-sm text-text-muted">Nenhum sinal vital registrado.</p>
                    )}
                  </div>

                  {/* Prontuario / Timeline */}
                  <div>
                    <h4 className="text-sm font-bold text-text-main dark:text-white mb-3 flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary text-[20px]">history</span>
                      Últimos Registros
                    </h4>
                    <div className="relative pl-4 border-l-2 border-gray-200 dark:border-gray-700 space-y-6">
                      {getResidentEvolutions(selectedResident.id).slice(0, 3).map((evo, idx) => (
                        <div key={evo.id} className="relative">
                          <div className={`absolute -left-[21px] top-1 h-3 w-3 rounded-full border-2 border-white dark:border-surface-dark ${idx === 0 ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-600'}`}></div>
                          <p className="text-xs text-text-muted mb-0.5">{new Date(evo.date).toLocaleString('pt-BR')}</p>
                          <p className="text-sm font-medium text-text-main dark:text-white">Evolução de Enfermagem</p>
                          <p className="text-sm text-text-muted mt-1">{evo.notes}</p>
                          <div className="mt-2 flex items-center gap-2">
                            <div className="h-5 w-5 rounded-full bg-primary/20 text-[10px] flex items-center justify-center text-primary font-bold">
                              {evo.recordedBy.substring(0, 2).toUpperCase()}
                            </div>
                            <span className="text-xs text-text-muted">Profissional</span>
                          </div>
                        </div>
                      ))}
                      {getResidentEvolutions(selectedResident.id).length === 0 && (
                        <p className="text-sm text-text-muted">Nenhuma evolução registrada.</p>
                      )}
                    </div>
                    
                    <button 
                      onClick={() => navigate(`/residents/${selectedResident.id}`)}
                      className="w-full mt-6 py-2 text-sm text-primary font-medium hover:bg-primary/5 rounded-lg transition-colors border border-dashed border-primary/30"
                    >
                      Abrir Prontuário Completo
                    </button>
                  </div>
                </>
              )}

              {activeTab === 'dados' && (
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-bold text-text-main dark:text-white mb-2">Informações Pessoais</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-text-muted text-xs">CPF</p>
                        <p className="text-text-main dark:text-white font-medium">{selectedResident.cpf}</p>
                      </div>
                      <div>
                        <p className="text-text-muted text-xs">Data de Nascimento</p>
                        <p className="text-text-main dark:text-white font-medium">{new Date(selectedResident.birthDate).toLocaleDateString('pt-BR')}</p>
                      </div>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
                    <h4 className="text-sm font-bold text-text-main dark:text-white mb-2">Contato de Emergência</h4>
                    <div className="text-sm">
                      <p className="text-text-muted text-xs">Telefone</p>
                      <p className="text-text-main dark:text-white font-medium">{selectedResident.emergencyContact}</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'financeiro' && (
                <div className="text-center py-8">
                  <span className="material-symbols-outlined text-[48px] text-text-muted/30 mb-4">payments</span>
                  <p className="text-sm text-text-muted">Acesse o módulo financeiro para ver detalhes de faturamento deste residente.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="hidden xl:flex w-[450px] 2xl:w-[500px] flex-col items-center justify-center bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm p-8 text-center">
          <span className="material-symbols-outlined text-[64px] text-gray-200 dark:text-gray-700 mb-4">group</span>
          <h3 className="text-lg font-medium text-text-main dark:text-white mb-2">Nenhum residente selecionado</h3>
          <p className="text-text-muted text-sm">Selecione um residente na lista ao lado para visualizar seus detalhes e prontuário.</p>
        </div>
      )}
    </div>
  );
}
