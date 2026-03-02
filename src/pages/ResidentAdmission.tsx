import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store';
import { Resident } from '../types';

export function ResidentAdmission() {
  const navigate = useNavigate();
  const { addResident } = useAppStore();
  const [activeStep, setActiveStep] = useState(1);
  const [formData, setFormData] = useState<Partial<Resident>>({
    name: '',
    cpf: '',
    birthDate: '',
    emergencyContact: '',
    room: '',
    status: 'ativo',
    allergies: [],
    comorbidities: [],
    bloodType: ''
  });

  const [allergyInput, setAllergyInput] = useState('');
  const [comorbidityInput, setComorbidityInput] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddAllergy = () => {
    if (allergyInput.trim() && !formData.allergies?.includes(allergyInput.trim())) {
      setFormData(prev => ({ ...prev, allergies: [...(prev.allergies || []), allergyInput.trim()] }));
      setAllergyInput('');
    }
  };

  const handleRemoveAllergy = (allergy: string) => {
    setFormData(prev => ({ ...prev, allergies: prev.allergies?.filter(a => a !== allergy) }));
  };

  const handleAddComorbidity = () => {
    if (comorbidityInput.trim() && !formData.comorbidities?.includes(comorbidityInput.trim())) {
      setFormData(prev => ({ ...prev, comorbidities: [...(prev.comorbidities || []), comorbidityInput.trim()] }));
      setComorbidityInput('');
    }
  };

  const handleRemoveComorbidity = (comorbidity: string) => {
    setFormData(prev => ({ ...prev, comorbidities: prev.comorbidities?.filter(c => c !== comorbidity) }));
  };

  const handleSubmit = async () => {
    try {
      // In a real app, this would use Firebase.
      // Here we simulate the logic assuming the store addResident handles it.
      const newResident: Resident = {
        ...formData,
        id: crypto.randomUUID(), // Mock ID generation
        admissionDate: new Date().toISOString(),
      } as Resident;

      await addResident(newResident);
      navigate('/residents');
    } catch (error) {
      console.error('Error adding resident:', error);
      alert('Erro ao adicionar residente.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto h-full flex flex-col bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm">

      {/* Header */}
      <div className="px-8 py-6 border-b border-gray-200 dark:border-gray-700 bg-background-light/30 dark:bg-background-dark/30">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/residents')}
            className="w-10 h-10 rounded-lg flex items-center justify-center text-text-muted hover:bg-white dark:hover:bg-surface-dark transition-colors border border-transparent hover:border-gray-200 dark:hover:border-gray-700"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <div>
            <h2 className="text-2xl font-bold text-text-main dark:text-white">Admissão de Residente</h2>
            <p className="text-sm text-text-muted mt-1">Cadastre um novo morador na clínica.</p>
          </div>
        </div>
      </div>

      {/* Main Form Area */}
      <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
        <div className="space-y-8 max-w-3xl mx-auto pb-20">

          {/* Section 1: Personal Info */}
          <section className="space-y-4">
            <h3 className="text-lg font-semibold text-text-main dark:text-white flex items-center gap-2 border-b border-gray-100 dark:border-gray-800 pb-2">
              <span className="material-symbols-outlined text-primary text-[20px]">person</span>
              Informações Pessoais
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-medium text-text-main dark:text-slate-300">Nome Completo *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-background-light dark:bg-background-dark border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all dark:text-white"
                  placeholder="Nome do residente"
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-text-main dark:text-slate-300">CPF *</label>
                <input
                  type="text"
                  name="cpf"
                  value={formData.cpf}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-background-light dark:bg-background-dark border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all dark:text-white"
                  placeholder="000.000.000-00"
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-text-main dark:text-slate-300">Data de Nascimento *</label>
                <input
                  type="date"
                  name="birthDate"
                  value={formData.birthDate}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-background-light dark:bg-background-dark border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all dark:text-white"
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-text-main dark:text-slate-300">Quarto/Leito *</label>
                <input
                  type="text"
                  name="room"
                  value={formData.room}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-background-light dark:bg-background-dark border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all dark:text-white"
                  placeholder="Ex: 101-A"
                />
              </div>
            </div>
          </section>

          {/* Section 2: Contact Info */}
          <section className="space-y-4">
            <h3 className="text-lg font-semibold text-text-main dark:text-white flex items-center gap-2 border-b border-gray-100 dark:border-gray-800 pb-2">
              <span className="material-symbols-outlined text-primary text-[20px]">contact_phone</span>
              Contato de Emergência
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1 md:col-span-2">
                <label className="text-sm font-medium text-text-main dark:text-slate-300">Telefone / Nome do Contato *</label>
                <input
                  type="text"
                  name="emergencyContact"
                  value={formData.emergencyContact}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-background-light dark:bg-background-dark border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all dark:text-white"
                  placeholder="Ex: (11) 99999-9999 - João (Filho)"
                />
              </div>
            </div>
          </section>

          {/* Section 3: Clinical Profile */}
          <section className="space-y-4">
            <h3 className="text-lg font-semibold text-text-main dark:text-white flex items-center gap-2 border-b border-gray-100 dark:border-gray-800 pb-2">
              <span className="material-symbols-outlined text-primary text-[20px]">medical_information</span>
              Perfil Clínico
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <div className="space-y-1">
                <label className="text-sm font-medium text-text-main dark:text-slate-300">Tipo Sanguíneo</label>
                <select
                  name="bloodType"
                  value={formData.bloodType}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-background-light dark:bg-background-dark border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all dark:text-white"
                >
                  <option value="">Selecione...</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>

              {/* Allergies */}
              <div className="md:col-span-2 space-y-3">
                <label className="text-sm font-medium text-text-main dark:text-slate-300">Alergias</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={allergyInput}
                    onChange={(e) => setAllergyInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddAllergy())}
                    className="flex-1 px-3 py-2 bg-background-light dark:bg-background-dark border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all dark:text-white"
                    placeholder="Adicionar alergia..."
                  />
                  <button
                    type="button"
                    onClick={handleAddAllergy}
                    className="px-4 py-2 bg-primary/10 text-primary hover:bg-primary hover:text-white rounded-lg transition-colors text-sm font-medium"
                  >
                    Add
                  </button>
                </div>
                {formData.allergies && formData.allergies.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.allergies.map(allergy => (
                      <span key={allergy} className="px-3 py-1 rounded-full bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-100 dark:border-red-800/30 text-xs font-semibold flex items-center gap-1">
                        {allergy}
                        <button type="button" onClick={() => handleRemoveAllergy(allergy)} className="hover:text-red-800 dark:hover:text-red-200 ml-1">
                          <span className="material-symbols-outlined text-[14px]">close</span>
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Comorbidities */}
              <div className="md:col-span-2 space-y-3">
                <label className="text-sm font-medium text-text-main dark:text-slate-300">Comorbidades (Doenças Pré-existentes)</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={comorbidityInput}
                    onChange={(e) => setComorbidityInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddComorbidity())}
                    className="flex-1 px-3 py-2 bg-background-light dark:bg-background-dark border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all dark:text-white"
                    placeholder="Adicionar comorbidade (ex: Hipertensão, Diabetes)..."
                  />
                  <button
                    type="button"
                    onClick={handleAddComorbidity}
                    className="px-4 py-2 bg-primary/10 text-primary hover:bg-primary hover:text-white rounded-lg transition-colors text-sm font-medium"
                  >
                    Add
                  </button>
                </div>
                {formData.comorbidities && formData.comorbidities.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.comorbidities.map(comorbidity => (
                      <span key={comorbidity} className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 text-xs font-semibold flex items-center gap-1">
                        {comorbidity}
                        <button type="button" onClick={() => handleRemoveComorbidity(comorbidity)} className="hover:text-slate-900 dark:hover:text-white ml-1">
                          <span className="material-symbols-outlined text-[14px]">close</span>
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

            </div>
          </section>

        </div>
      </div>

      {/* Footer Footer */}
      <div className="border-t border-gray-200 dark:border-gray-700 p-6 flex justify-end gap-3 bg-background-light/30 dark:bg-background-dark/30 mt-auto">
        <button
          onClick={() => navigate('/residents')}
          className="px-6 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 text-text-main dark:text-white font-medium hover:bg-gray-50 dark:hover:bg-surface-dark transition-colors"
        >
          Cancelar
        </button>
        <button
          onClick={handleSubmit}
          className="px-6 py-2.5 rounded-lg bg-primary text-white font-medium hover:bg-primary/90 transition-colors shadow-sm"
        >
          Salvar Morador
        </button>
      </div>

    </div>
  );
}
