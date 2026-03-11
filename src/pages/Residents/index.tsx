import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../../store';
import { styles } from './styles';

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
    <div className={styles.container}>
      {/* Left Column: List View */}
      <div className={styles.leftCol}>
        {/* Actions Bar */}
        <div className={styles.actionsBar}>
          <div className={styles.searchWrapper}>
            <span className={styles.searchIconWrapper}>
              <span className="material-symbols-outlined">search</span>
            </span>
            <input 
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput} 
              placeholder="Buscar por nome, quarto ou status" 
            />
          </div>
          <button 
            onClick={() => navigate('/residents/new')}
            className={styles.addButton}
          >
            <span className="material-symbols-outlined text-[20px]">add</span>
            <span>Adicionar Residente</span>
          </button>
        </div>

        {/* Table */}
        <div className={styles.tableWrapper}>
          <div className={styles.tableScroll}>
            <table className={styles.table}>
              <thead>
                <tr className={styles.thead}>
                  <th className={`${styles.th} w-16`}>Avatar</th>
                  <th className={styles.th}>Nome</th>
                  <th className={`${styles.th} w-24`}>Idade</th>
                  <th className={`${styles.th} w-32`}>Quarto</th>
                  <th className={styles.th}>Status</th>
                  <th className={`${styles.th} w-16`}></th>
                </tr>
              </thead>
              <tbody className={styles.tbody}>
                {filteredResidents.map(resident => {
                  const isSelected = selectedResidentId === resident.id;
                  const age = getAge(resident.birthDate);
                  
                  return (
                    <tr 
                      key={resident.id}
                      onClick={() => setSelectedResidentId(resident.id)}
                      className={styles.tr(isSelected)}
                    >
                      <td className="px-6 py-4">
                        <div className={styles.avatar}>
                          {resident.name.charAt(0)}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className={styles.residentName}>{resident.name}</p>
                        <p className={styles.residentSub}>{age} anos • Quarto {resident.room}</p>
                      </td>
                      <td className={styles.tdMuted}>{age}</td>
                      <td className={styles.tdMuted}>{resident.room}</td>
                      <td className="px-6 py-4">
                        <span className={styles.statusBadge(resident.status === 'ativo')}>
                          <span className={styles.statusDot(resident.status === 'ativo')}></span>
                          {resident.status === 'ativo' ? 'Estável' : 'Inativo'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className={styles.chevron(isSelected)}>
                          chevron_right
                        </span>
                      </td>
                    </tr>
                  );
                })}
                {filteredResidents.length === 0 && (
                  <tr>
                    <td colSpan={6} className={styles.emptyState}>
                      Nenhum residente encontrado.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className={styles.pagination}>
            <p className={styles.paginationText}>Mostrando {filteredResidents.length} residentes</p>
            <div className={styles.paginationButtons}>
              <button className={styles.pageButton} disabled>
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <button className={styles.pageButton}>
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Detail View */}
      {selectedResident ? (
        <div className={styles.rightCol}>
          {/* Summary Card */}
          <div className={styles.summaryCard}>
            <div className={styles.summaryGradient}></div>
            <div className={styles.summaryContent}>
              <div className={styles.largeAvatar}>
                {selectedResident.name.charAt(0)}
              </div>
              <h3 className={styles.summaryName}>{selectedResident.name}</h3>
              <p className={styles.summaryDate}>Admitido em: {new Date(selectedResident.admissionDate).toLocaleDateString('pt-BR')}</p>
              
              <div className={styles.tagList}>
                {selectedResident.allergies?.map((allergy, idx) => (
                  <span key={idx} className={styles.allergyTag}>
                    <span className="material-symbols-outlined text-[16px]">warning</span>
                    {allergy}
                  </span>
                ))}
                {selectedResident.comorbidities?.map((comorbidity, idx) => (
                  <span key={idx} className={styles.comorbidityTag}>
                    {comorbidity}
                  </span>
                ))}
              </div>
              
              <div className={styles.statGrid}>
                <div className={styles.statItem}>
                  <p className={styles.statLabel}>Idade</p>
                  <p className={styles.statValue}>{getAge(selectedResident.birthDate)}</p>
                </div>
                <div className={`${styles.statItem} border-l border-gray-200 dark:border-gray-700`}>
                  <p className={styles.statLabel}>Quarto</p>
                  <p className={styles.statValue}>{selectedResident.room}</p>
                </div>
                <div className={`${styles.statItem} border-l border-gray-200 dark:border-gray-700`}>
                  <p className={styles.statLabel}>Tipo Sang.</p>
                  <p className={styles.statValue}>{selectedResident.bloodType}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs & Content */}
          <div className={styles.detailsCard}>
            {/* Tabs Header */}
            <div className={styles.tabsHeader}>
              <button 
                onClick={() => setActiveTab('saude')}
                className={styles.tabButton(activeTab === 'saude')}
              >
                Saúde
              </button>
              <button 
                onClick={() => setActiveTab('dados')}
                className={styles.tabButton(activeTab === 'dados')}
              >
                Dados
              </button>
              <button 
                onClick={() => setActiveTab('financeiro')}
                className={styles.tabButton(activeTab === 'financeiro')}
              >
                Financeiro
              </button>
            </div>

            {/* Tab Content */}
            <div className={styles.tabContent}>
              {activeTab === 'saude' && (
                <>
                  {/* Vitals */}
                  <div className="mb-6">
                    <h4 className={styles.sectionTitle}>
                      <span className="material-symbols-outlined text-primary text-[20px]">monitor_heart</span>
                      Sinais Vitais (Últimos)
                    </h4>
                    {getLatestVitals(selectedResident.id) ? (
                      <div className={styles.vitalsGrid}>
                        <div className={styles.vitalCard}>
                          <p className={styles.vitalLabel}>Pressão Arterial</p>
                          <p className={styles.vitalValue}>{getLatestVitals(selectedResident.id)?.bloodPressure} <span className={styles.vitalUnit}>mmHg</span></p>
                        </div>
                        <div className={styles.vitalCard}>
                          <p className={styles.vitalLabel}>Batimentos</p>
                          <p className={styles.vitalValue}>{getLatestVitals(selectedResident.id)?.heartRate} <span className={styles.vitalUnit}>bpm</span></p>
                        </div>
                        <div className={styles.vitalCard}>
                          <p className={styles.vitalLabel}>Temp.</p>
                          <p className={styles.vitalValue}>{getLatestVitals(selectedResident.id)?.temperature} <span className={styles.vitalUnit}>°C</span></p>
                        </div>
                        <div className={styles.vitalCard}>
                          <p className={styles.vitalLabel}>Saturação</p>
                          <p className={styles.vitalValue}>{getLatestVitals(selectedResident.id)?.oxygenSaturation} <span className={styles.vitalUnit}>%</span></p>
                        </div>
                      </div>
                    ) : (
                      <p className="text-sm text-text-muted">Nenhum sinal vital registrado.</p>
                    )}
                  </div>

                  {/* Prontuario / Timeline */}
                  <div>
                    <h4 className={styles.sectionTitle}>
                      <span className="material-symbols-outlined text-primary text-[20px]">history</span>
                      Últimos Registros
                    </h4>
                    <div className={styles.timeline}>
                      {getResidentEvolutions(selectedResident.id).slice(0, 3).map((evo, idx) => (
                        <div key={evo.id} className={styles.timelineItem}>
                          <div className={styles.timelineDot(idx === 0)}></div>
                          <p className={styles.timelineDate}>{new Date(evo.date).toLocaleString('pt-BR')}</p>
                          <p className={styles.timelineTitle}>Evolução de Enfermagem</p>
                          <p className={styles.timelineNotes}>{evo.notes}</p>
                          <div className={styles.timelineFooter}>
                            <div className={styles.userIcon}>
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
                      className={styles.fullRecordButton}
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
                        <p className={styles.infoLabel}>CPF</p>
                        <p className={styles.infoValue}>{selectedResident.cpf}</p>
                      </div>
                      <div>
                        <p className={styles.infoLabel}>Data de Nascimento</p>
                        <p className={styles.infoValue}>{new Date(selectedResident.birthDate).toLocaleDateString('pt-BR')}</p>
                      </div>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
                    <h4 className="text-sm font-bold text-text-main dark:text-white mb-2">Contato de Emergência</h4>
                    <div className="text-sm">
                      <p className={styles.infoLabel}>Telefone</p>
                      <p className={styles.infoValue}>{selectedResident.emergencyContact}</p>
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
        <div className={styles.emptyDetail}>
          <span className="material-symbols-outlined text-[64px] text-gray-200 dark:text-gray-700 mb-4">group</span>
          <h3 className="text-lg font-medium text-text-main dark:text-white mb-2">Nenhum residente selecionado</h3>
          <p className="text-text-muted text-sm">Selecione um residente na lista ao lado para visualizar seus detalhes e prontuário.</p>
        </div>
      )}
    </div>
  );
}
