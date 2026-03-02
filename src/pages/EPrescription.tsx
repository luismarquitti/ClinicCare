import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppStore } from '../store';
import { Medication } from '../types';

export function EPrescription() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { residents, medications, addMedication } = useAppStore();

  const resident = residents.find(r => r.id === id);
  const activeMedications = medications.filter(m => m.residentId === id && m.active);

  const [formData, setFormData] = useState({
    name: '',
    dosage: '10mg',
    route: 'Oral (PO)',
    frequency: 'QD (Once Daily)',
    instructions: '',
    dispenseAmount: 30,
    refills: 0,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!resident) {
    return (
      <div className="min-h-screen bg-background-light dark:bg-background-dark flex flex-col items-center justify-center">
        <span className="material-symbols-outlined text-[64px] text-gray-300 dark:text-gray-600 mb-4">person_off</span>
        <h2 className="text-xl font-bold text-slate-800 dark:text-white">Resident Not Found</h2>
        <button onClick={() => navigate('/residents')} className="mt-4 px-4 py-2 bg-primary text-white rounded-lg">Back to Residents</button>
      </div>
    );
  }

  const getAge = (birthDate: string) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
    return age;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.name.trim()) {
      alert("Please enter a medication name.");
      return;
    }

    setIsSubmitting(true);
    try {
      await addMedication({
        residentId: resident.id,
        name: formData.name,
        dosage: `${formData.dosage} - ${formData.route}`,
        frequency: `${formData.frequency} - ${formData.instructions}`,
        startDate: new Date().toISOString(),
        active: true
      });
      navigate(`/residents/${resident.id}`);
    } catch (error) {
      console.error("Error adding prescription:", error);
      alert("Failed to add prescription");
    } finally {
      setIsSubmitting(false);
    }
  };

  const activeAllergies = resident.allergies && resident.allergies.length > 0;

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-sans min-h-screen flex flex-col overflow-x-hidden">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-6 py-3 shadow-sm">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-4 text-slate-900 dark:text-white">
            <button onClick={() => navigate(-1)} className="hover:bg-slate-100 dark:hover:bg-slate-800 p-2 rounded-full transition-colors flex items-center justify-center">
              <span className="material-symbols-outlined">arrow_back</span>
            </button>
            <div className="size-8 rounded bg-primary/10 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined">medication</span>
            </div>
            <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-tight">e-Prescription</h2>
          </div>
        </div>
        <div className="flex items-center justify-end gap-4">
          {/* Draft button or actions can go here */}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-[1440px] mx-auto p-6 md:p-8 lg:px-12">
        {/* Header Section with Patient Info & Allergy Alert */}
        <div className="mb-8 flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="size-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center text-3xl font-bold overflow-hidden shrink-0 shadow-sm border border-primary/20">
              {resident.name.charAt(0)}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{resident.name}</h1>
              <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400 mt-1">
                <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">calendar_today</span> {getAge(resident.birthDate)} Years</span>
                <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                <span className="flex items-center gap-1">CPF: {resident.cpf}</span>
                <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">bloodtype</span> {resident.bloodType || 'N/A'}</span>
              </div>
            </div>
          </div>

          {/* Critical Alert Banner */}
          {activeAllergies && (
            <div className="flex-1 w-full lg:w-auto lg:max-w-2xl bg-red-50 dark:bg-red-900/20 border-l-4 border-danger rounded-r-xl p-4 flex items-start gap-4 shadow-sm animate-pulse">
              <div className="text-danger bg-white dark:bg-red-900/50 rounded-full p-1.5 shrink-0 shadow-sm">
                <span className="material-symbols-outlined">warning</span>
              </div>
              <div>
                <h3 className="font-bold text-danger text-base">ALLERGY ALERT</h3>
                <p className="text-slate-700 dark:text-red-100 text-sm mt-0.5">Patient has allergies: {resident.allergies?.join(', ')}. Verify all prescriptions.</p>
              </div>
            </div>
          )}
        </div>

        {/* Split Workspace Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full">
          {/* Left Column: Prescription Form */}
          <div className="lg:col-span-8 flex flex-col gap-6">

            {/* Form Section: Medication Details */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
              <div className="p-6 border-b border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800 flex justify-between items-center">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary">prescriptions</span>
                  Prescription Details
                </h3>
              </div>

              <div className="p-6 grid gap-8">
                {/* Selected Drug */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Medication Name *</label>
                  <div className="flex gap-2">
                    <div className="flex-1 relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="material-symbols-outlined text-slate-400">search</span>
                      </div>
                      <input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="block w-full pl-10 pr-3 py-3 border border-slate-300 dark:border-slate-600 rounded-xl leading-5 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm"
                        placeholder="e.g., Lisinopril, Dipirona, Paracetamol..."
                        type="text"
                      />
                    </div>
                  </div>
                </div>

                {/* Card Grouping: Dosing & Frequency */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Dosing Card */}
                  <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 hover:border-secondary/50 transition-colors group">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="p-2 rounded-lg bg-white dark:bg-slate-700 shadow-sm text-secondary group-hover:text-primary transition-colors">
                        <span className="material-symbols-outlined">pill</span>
                      </div>
                      <h4 className="font-bold text-slate-900 dark:text-white">Strength &amp; Route</h4>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Dosage / Strength</label>
                        <input
                          name="dosage"
                          value={formData.dosage}
                          onChange={handleChange}
                          className="block w-full rounded-lg border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-primary focus:border-primary sm:text-sm py-2.5 px-3"
                          placeholder="e.g., 500mg, 10ml..."
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Route</label>
                        <select
                          name="route"
                          value={formData.route}
                          onChange={handleChange}
                          className="block w-full rounded-lg border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-primary focus:border-primary sm:text-sm py-2.5 px-3"
                        >
                          <option>Oral (PO)</option>
                          <option>Sublingual</option>
                          <option>Intravenous (IV)</option>
                          <option>Intramuscular (IM)</option>
                          <option>Topical</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Timing Card */}
                  <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 hover:border-secondary/50 transition-colors group">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="p-2 rounded-lg bg-white dark:bg-slate-700 shadow-sm text-secondary group-hover:text-primary transition-colors">
                        <span className="material-symbols-outlined">schedule</span>
                      </div>
                      <h4 className="font-bold text-slate-900 dark:text-white">Frequency</h4>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Frequency</label>
                        <select
                          name="frequency"
                          value={formData.frequency}
                          onChange={handleChange}
                          className="block w-full rounded-lg border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-primary focus:border-primary sm:text-sm py-2.5 px-3"
                        >
                          <option value="QD">QD (1x ao dia)</option>
                          <option value="BID">BID (2x ao dia)</option>
                          <option value="TID">TID (3x ao dia)</option>
                          <option value="QID">QID (4x ao dia)</option>
                          <option value="PRN">PRN (Se necessário)</option>
                          <option value="ACM">ACM (A critério médico)</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Timing Instructions</label>
                        <input
                          name="instructions"
                          value={formData.instructions}
                          onChange={handleChange}
                          className="block w-full rounded-lg border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-primary focus:border-primary sm:text-sm py-2.5 px-3"
                          placeholder="e.g., Após as refeições, 8h/8h"
                          type="text"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-700">
                  <button onClick={() => navigate(-1)} className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 font-medium px-4 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">Cancel</button>
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting || !formData.name}
                    className="px-6 py-2.5 rounded-xl bg-primary text-white font-bold shadow-[0_4px_12px_rgba(59,130,246,0.3)] hover:bg-primary/90 hover:-translate-y-0.5 transition-all flex items-center gap-2 disabled:opacity-50 disabled:hover:translate-y-0"
                  >
                    {isSubmitting ? 'Saving...' : 'Authorize Prescription'}
                    {!isSubmitting && <span className="material-symbols-outlined text-sm">arrow_forward</span>}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Active Medications & Context (Sidebar) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {/* Active Medications List */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 flex flex-col h-full max-h-[800px]">
              <div className="p-4 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center bg-slate-50/80 dark:bg-slate-800">
                <h3 className="font-bold text-slate-900 dark:text-white text-base">Active Medications ({activeMedications.length})</h3>
                <span className="material-symbols-outlined text-slate-400">medical_services</span>
              </div>

              <div className="overflow-y-auto p-4 space-y-3 flex-1 custom-scrollbar">
                {activeMedications.length > 0 ? (
                  activeMedications.map(med => (
                    <div key={med.id} className="group relative bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-3 hover:shadow-md transition-shadow">
                      <div className="absolute top-3 right-3">
                        <span className="size-2 rounded-full bg-green-500 block" title="Active"></span>
                      </div>
                      <h4 className="font-bold text-slate-800 dark:text-white text-sm pr-4">{med.name}</h4>
                      <p className="text-xs text-slate-500 mt-0.5">{med.dosage} • {med.frequency}</p>
                      <div className="mt-2 text-xs text-slate-400">
                        Since: {new Date(med.startDate).toLocaleDateString()}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-slate-500 py-8">
                    <p className="text-sm">No active medications.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
