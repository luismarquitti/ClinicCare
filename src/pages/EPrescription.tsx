import React from 'react';
import { useNavigate } from 'react-router-dom';

export function EPrescription() {
  const navigate = useNavigate();

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-sans min-h-screen flex flex-col overflow-x-hidden">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-6 py-3 shadow-sm">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-4 text-slate-900 dark:text-white">
            <div className="size-8 rounded bg-primary/10 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined">medication</span>
            </div>
            <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-tight">e-Prescription</h2>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <button onClick={() => navigate('/dashboard')} className="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary text-sm font-medium transition-colors">Dashboard</button>
            <button onClick={() => navigate('/residents')} className="text-primary text-sm font-bold bg-primary/10 px-3 py-1 rounded-full">Patients</button>
            <button className="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary text-sm font-medium transition-colors">Orders</button>
            <button className="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary text-sm font-medium transition-colors">Reports</button>
          </nav>
        </div>
        <div className="flex items-center justify-end gap-4">
          <div className="relative hidden sm:flex w-64 items-center">
            <span className="absolute left-3 text-slate-400 material-symbols-outlined text-[20px]">search</span>
            <input className="w-full rounded-xl border-none bg-slate-100 dark:bg-slate-800 py-2.5 pl-10 pr-4 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-primary placeholder:text-slate-400" placeholder="Search patient, drug..." type="text" />
          </div>
          <button className="hidden sm:flex items-center justify-center gap-2 rounded-xl bg-slate-100 dark:bg-slate-800 px-4 py-2.5 text-sm font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
            <span className="material-symbols-outlined text-[20px]">save</span>
            <span>Draft</span>
          </button>
          <div className="size-10 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
            <img alt="Doctor profile" className="h-full w-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDZeu4AB02lwrxKb1buZ9mfTBnoGpa6Jh4MNcGkHxn7rUU0rntMD934pyNJxFChXNvbQaC3YJ8gpKmxdHYrSLv4g0LlXWN0UVwj9b_wQnBMwHG78o3lQvWKMYXFtelUD9kd96F2IW8fAYcGb-DX3NPpjWMxIEl_7bo88mIvADnHYYhfDlHeCUnXJ_HnjTRSPyi2n0tEXPqGSKXV44H8KnBhM_odNc52YDrlfDsRls1IviTuRp37o6l1yMRWTjeJ--pZJYbRr_PjxGdP" />
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-[1440px] mx-auto p-6 md:p-8 lg:px-12">
        {/* Header Section with Patient Info & Allergy Alert */}
        <div className="mb-8 flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="size-16 rounded-2xl bg-slate-200 dark:bg-slate-700 overflow-hidden shrink-0 shadow-sm">
              <img alt="Elderly patient" className="h-full w-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDmL8xXVbeXDMjzjYCBLfiiSZ_SzvDgY9XmP0CCyWb7b0QyQvUwXf4nAgdVA5-52hlsXCQ0ezd1H0rWrSVOMOgXzML1Kwhj36mKgsSrk1DTFw_PMLDO-vTkVh_gQMAZmkin1d-cdd6MnjBeOcu1KKnHAnaDxTUbp01FyovbuwtzSjezdqHcO1PEQjg-q3ssicq4Drp8R6U4g9qCg24IiYQtLj_ii2PRmcjSv2qnkqeRwvX6dwU-ss5YbGIWhz5xpBczR54pk8Hlebo8" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Eleanor Rigby <span className="text-slate-400 font-normal text-lg">#83920</span></h1>
              <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400 mt-1">
                <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">female</span> 78 Years</span>
                <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">calendar_today</span> DOB: 1945-06-12</span>
                <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">monitor_weight</span> 62kg</span>
              </div>
            </div>
          </div>

          {/* Critical Alert Banner */}
          <div className="flex-1 w-full lg:w-auto lg:max-w-2xl bg-red-50 dark:bg-red-900/20 border-l-4 border-danger rounded-r-xl p-4 flex items-start gap-4 shadow-sm animate-pulse">
            <div className="text-danger bg-white dark:bg-red-900/50 rounded-full p-1.5 shrink-0 shadow-sm">
              <span className="material-symbols-outlined">warning</span>
            </div>
            <div>
              <h3 className="font-bold text-danger text-base">ALLERGY ALERT: Penicillin &amp; Sulfonamides</h3>
              <p className="text-slate-700 dark:text-red-100 text-sm mt-0.5">Patient has a severe anaphylactic reaction history. Verify all prescriptions.</p>
            </div>
            <button className="ml-auto text-danger text-sm font-bold hover:underline">View History</button>
          </div>
        </div>

        {/* Split Workspace Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full">
          {/* Left Column: Prescription Form (Larger) */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            {/* Stepper Progress */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm border border-slate-100 dark:border-slate-700 flex justify-between items-center relative overflow-hidden">
              <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 dark:bg-slate-700 -z-10 transform -translate-y-1/2"></div>
              <div className="flex flex-col items-center gap-2 z-10 bg-white dark:bg-slate-800 px-2 cursor-pointer">
                <div className="size-8 rounded-full bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/30">
                  <span className="material-symbols-outlined text-sm">check</span>
                </div>
                <span className="text-xs font-bold text-primary">Medication</span>
              </div>
              <div className="flex flex-col items-center gap-2 z-10 bg-white dark:bg-slate-800 px-2 cursor-pointer">
                <div className="size-8 rounded-full bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/30 ring-4 ring-primary/10">
                  <span className="text-sm font-bold">2</span>
                </div>
                <span className="text-xs font-bold text-primary">Dosing &amp; Freq</span>
              </div>
              <div className="flex flex-col items-center gap-2 z-10 bg-white dark:bg-slate-800 px-2">
                <div className="size-8 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400 flex items-center justify-center">
                  <span className="text-sm font-bold">3</span>
                </div>
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Duration</span>
              </div>
              <div className="flex flex-col items-center gap-2 z-10 bg-white dark:bg-slate-800 px-2">
                <div className="size-8 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400 flex items-center justify-center">
                  <span className="text-sm font-bold">4</span>
                </div>
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Review</span>
              </div>
            </div>

            {/* Form Section: Medication Details */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
              <div className="p-6 border-b border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800 flex justify-between items-center">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary">prescriptions</span>
                  Prescription Details
                </h3>
                <span className="text-xs font-bold text-secondary bg-secondary/10 px-2 py-1 rounded">DRAFT</span>
              </div>
              
              <div className="p-6 grid gap-8">
                {/* Selected Drug */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Selected Medication</label>
                  <div className="flex gap-2">
                    <div className="flex-1 relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="material-symbols-outlined text-slate-400">search</span>
                      </div>
                      <input className="block w-full pl-10 pr-3 py-3 border border-slate-300 dark:border-slate-600 rounded-xl leading-5 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm" placeholder="Search drug database..." type="text" defaultValue="Lisinopril (Prinivil)" />
                    </div>
                    <button className="px-4 py-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 rounded-xl font-medium transition-colors">
                      Browse Formulary
                    </button>
                  </div>
                  <div className="flex gap-2 mt-1">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                      Generic Available
                    </span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                      Tier 1
                    </span>
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
                        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Strength</label>
                        <select className="block w-full rounded-lg border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-primary focus:border-primary sm:text-sm py-2.5">
                          <option>10 mg</option>
                          <option>20 mg</option>
                          <option>40 mg</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Route</label>
                        <select className="block w-full rounded-lg border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-primary focus:border-primary sm:text-sm py-2.5">
                          <option>Oral (PO)</option>
                          <option>Sublingual</option>
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
                        <select className="block w-full rounded-lg border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-primary focus:border-primary sm:text-sm py-2.5">
                          <option>QD (Once Daily)</option>
                          <option>BID (Twice Daily)</option>
                          <option>TID (Three Times Daily)</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Timing Instructions</label>
                        <input className="block w-full rounded-lg border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-primary focus:border-primary sm:text-sm py-2.5" placeholder="e.g., Take with food in AM" type="text" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Full Width Card: Dispense & Refills */}
                <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 hover:border-secondary/50 transition-colors group">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="p-2 rounded-lg bg-white dark:bg-slate-700 shadow-sm text-secondary group-hover:text-primary transition-colors">
                      <span className="material-symbols-outlined">inventory_2</span>
                    </div>
                    <h4 className="font-bold text-slate-900 dark:text-white">Dispense &amp; Refills</h4>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Dispense Amount</label>
                      <div className="relative rounded-md shadow-sm">
                        <input className="block w-full rounded-lg border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 pl-3 pr-12 py-2.5 focus:border-primary focus:ring-primary sm:text-sm text-slate-900 dark:text-white" placeholder="30" type="number" />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                          <span className="text-slate-500 sm:text-sm">tabs</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Refills</label>
                      <div className="flex items-center rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 p-0.5">
                        <button className="px-3 py-2 text-slate-500 hover:text-primary hover:bg-slate-50 dark:hover:bg-slate-800 rounded-md transition-colors"><span className="material-symbols-outlined text-sm">remove</span></button>
                        <input className="w-full text-center border-none p-0 focus:ring-0 text-slate-900 dark:text-white font-semibold bg-transparent" type="text" defaultValue="3" />
                        <button className="px-3 py-2 text-slate-500 hover:text-primary hover:bg-slate-50 dark:hover:bg-slate-800 rounded-md transition-colors"><span className="material-symbols-outlined text-sm">add</span></button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Days Supply</label>
                      <input className="block w-full rounded-lg border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-500 cursor-not-allowed sm:text-sm py-2.5" disabled type="text" defaultValue="30 Days" />
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-700">
                  <button onClick={() => navigate(-1)} className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 font-medium px-4 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">Cancel</button>
                  <div className="flex gap-3">
                    <button onClick={() => navigate(-1)} className="px-6 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">Back</button>
                    <button className="px-6 py-2.5 rounded-xl bg-primary text-white font-bold shadow-lg shadow-primary/30 hover:bg-blue-600 transition-colors flex items-center gap-2">
                      Next Step
                      <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Active Medications & Context (Sidebar) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {/* Quick Stats / Context */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                <span className="text-xs font-medium text-slate-500 uppercase block mb-1">Last Visit</span>
                <div className="font-bold text-slate-900 dark:text-white">Oct 12, 2023</div>
              </div>
              <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                <span className="text-xs font-medium text-slate-500 uppercase block mb-1">PCP</span>
                <div className="font-bold text-slate-900 dark:text-white">Dr. Smith</div>
              </div>
            </div>

            {/* Active Medications List */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 flex flex-col h-full max-h-[800px]">
              <div className="p-4 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center bg-slate-50/80 dark:bg-slate-800">
                <h3 className="font-bold text-slate-900 dark:text-white text-base">Active Medications (5)</h3>
                <button className="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full transition-colors text-slate-500">
                  <span className="material-symbols-outlined text-[20px]">filter_list</span>
                </button>
              </div>
              
              <div className="overflow-y-auto p-4 space-y-3 flex-1 custom-scrollbar">
                {/* Active Med Card 1 */}
                <div className="group relative bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-3 hover:shadow-md transition-shadow cursor-pointer">
                  <div className="absolute top-3 right-3">
                    <span className="size-2 rounded-full bg-green-500 block" title="Active"></span>
                  </div>
                  <h4 className="font-bold text-slate-800 dark:text-white text-sm pr-4">Metformin HCl</h4>
                  <p className="text-xs text-slate-500 mt-0.5">500mg • Oral • BID</p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-[10px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2 py-0.5 rounded-full">Diabetes</span>
                    <span className="text-[10px] text-slate-400">Refill in 12 days</span>
                  </div>
                </div>
                
                {/* Active Med Card 2 */}
                <div className="group relative bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-3 hover:shadow-md transition-shadow cursor-pointer">
                  <div className="absolute top-3 right-3">
                    <span className="size-2 rounded-full bg-green-500 block" title="Active"></span>
                  </div>
                  <h4 className="font-bold text-slate-800 dark:text-white text-sm pr-4">Atorvastatin</h4>
                  <p className="text-xs text-slate-500 mt-0.5">20mg • Oral • QD</p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-[10px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2 py-0.5 rounded-full">Cholesterol</span>
                    <span className="text-[10px] text-slate-400">Refill in 5 days</span>
                  </div>
                </div>

                {/* Active Med Card 3 (Warning) */}
                <div className="group relative bg-amber-50 dark:bg-amber-900/10 rounded-xl border border-amber-200 dark:border-amber-800 p-3 hover:shadow-md transition-shadow cursor-pointer">
                  <div className="absolute top-3 right-3">
                    <span className="size-2 rounded-full bg-amber-500 block animate-pulse" title="Expiring Soon"></span>
                  </div>
                  <h4 className="font-bold text-slate-800 dark:text-white text-sm pr-4">Amlodipine</h4>
                  <p className="text-xs text-slate-500 mt-0.5">5mg • Oral • QD</p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-[10px] font-medium bg-white/50 dark:bg-black/20 text-slate-600 dark:text-slate-400 px-2 py-0.5 rounded-full">Hypertension</span>
                    <span className="text-[10px] text-amber-600 dark:text-amber-400 font-bold">Expires tomorrow</span>
                  </div>
                </div>

                {/* Active Med Card 4 */}
                <div className="group relative bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-3 hover:shadow-md transition-shadow cursor-pointer">
                  <div className="absolute top-3 right-3">
                    <span className="size-2 rounded-full bg-green-500 block" title="Active"></span>
                  </div>
                  <h4 className="font-bold text-slate-800 dark:text-white text-sm pr-4">Omeprazole</h4>
                  <p className="text-xs text-slate-500 mt-0.5">20mg • Oral • QD</p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-[10px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2 py-0.5 rounded-full">GERD</span>
                    <span className="text-[10px] text-slate-400">Refill in 20 days</span>
                  </div>
                </div>

                {/* Active Med Card 5 */}
                <div className="group relative bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-3 hover:shadow-md transition-shadow cursor-pointer opacity-70">
                  <div className="absolute top-3 right-3">
                    <span className="size-2 rounded-full bg-slate-300 block" title="Discontinued"></span>
                  </div>
                  <h4 className="font-bold text-slate-800 dark:text-white text-sm pr-4 line-through decoration-slate-400">Ibuprofen</h4>
                  <p className="text-xs text-slate-500 mt-0.5">800mg • Oral • PRN</p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-[10px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2 py-0.5 rounded-full">Pain</span>
                    <span className="text-[10px] text-slate-400">Discontinued</span>
                  </div>
                </div>
              </div>
              
              <div className="p-4 border-t border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800">
                <button className="w-full py-2 rounded-lg border border-dashed border-slate-300 dark:border-slate-600 text-slate-500 hover:text-primary hover:border-primary hover:bg-primary/5 transition-all text-sm font-medium flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">add</span>
                  Add External Medication
                </button>
              </div>
            </div>

            {/* Recent Interactions Widget */}
            <div className="bg-blue-50 dark:bg-blue-900/10 rounded-xl p-4 border border-blue-100 dark:border-blue-900/30">
              <h4 className="font-bold text-primary text-sm mb-2 flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">info</span>
                Interaction Check
              </h4>
              <p className="text-xs text-slate-600 dark:text-blue-100 leading-relaxed">
                Lisinopril may interact with Metformin. Monitoring required for renal function and blood glucose levels.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
