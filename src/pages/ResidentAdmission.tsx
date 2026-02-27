import React from 'react';
import { useNavigate } from 'react-router-dom';

export function ResidentAdmission() {
  const navigate = useNavigate();

  return (
    <div className="bg-background-light dark:bg-background-dark font-sans text-text-main dark:text-slate-100 antialiased h-screen flex flex-col overflow-hidden">
      {/* Header */}
      <header className="flex-none flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 dark:border-slate-700 bg-surface-light dark:bg-surface-dark px-10 py-3 z-20 shadow-sm">
        <div className="flex items-center gap-4 text-text-main dark:text-white">
          <div className="size-8 flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-[32px]">health_and_safety</span>
          </div>
          <h2 className="text-text-main dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">Senior Care Clinic - Admission</h2>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center justify-center rounded-xl size-10 bg-background-light dark:bg-slate-700 hover:bg-slate-200 text-text-main dark:text-white transition-colors">
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <button className="flex items-center justify-center rounded-xl size-10 bg-background-light dark:bg-slate-700 hover:bg-slate-200 text-text-main dark:text-white transition-colors">
            <span className="material-symbols-outlined">chat_bubble</span>
          </button>
          <button className="flex items-center justify-center rounded-xl size-10 bg-primary text-white hover:bg-purple-800 transition-colors">
            <span className="material-symbols-outlined">account_circle</span>
          </button>
        </div>
      </header>

      {/* Main Content Area (Split View) */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar: Progress & Tips */}
        <aside className="w-80 flex-none bg-background-light dark:bg-background-dark border-r border-slate-200 dark:border-slate-700 flex flex-col p-6 overflow-y-auto">
          <div className="mb-8">
            <h1 className="text-text-main dark:text-white text-xl font-bold leading-tight mb-1">New Resident Admission</h1>
            <p className="text-text-secondary dark:text-slate-400 text-sm">Step 2 of 5: Clinical Profile</p>
          </div>

          {/* Vertical Stepper */}
          <nav className="flex flex-col gap-2 mb-8">
            {/* Completed Step */}
            <div className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer group">
              <div className="flex items-center justify-center size-8 rounded-full bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                <span className="material-symbols-outlined text-[20px]">check</span>
              </div>
              <div>
                <p className="text-slate-700 dark:text-slate-300 text-sm font-semibold">Patient Info</p>
                <p className="text-slate-500 dark:text-slate-500 text-xs">Personal details &amp; ID</p>
              </div>
            </div>

            {/* Active Step */}
            <div className="flex items-center gap-3 px-3 py-3 rounded-xl bg-primary-light dark:bg-primary/20 border border-primary/20 shadow-sm relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>
              <div className="flex items-center justify-center size-8 rounded-full bg-primary text-white shadow-md">
                <span className="material-symbols-outlined text-[20px]">stethoscope</span>
              </div>
              <div>
                <p className="text-primary dark:text-primary-content text-sm font-bold">Clinical Profile</p>
                <p className="text-text-secondary dark:text-slate-300 text-xs">History &amp; Vitals</p>
              </div>
            </div>

            {/* Upcoming Step */}
            <div className="flex items-center gap-3 px-3 py-3 rounded-lg opacity-60">
              <div className="flex items-center justify-center size-8 rounded-full bg-slate-200 text-slate-500 dark:bg-slate-700 dark:text-slate-400">
                <span className="material-symbols-outlined text-[20px]">pill</span>
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Medication</p>
            </div>

            {/* Upcoming Step */}
            <div className="flex items-center gap-3 px-3 py-3 rounded-lg opacity-60">
              <div className="flex items-center justify-center size-8 rounded-full bg-slate-200 text-slate-500 dark:bg-slate-700 dark:text-slate-400">
                <span className="material-symbols-outlined text-[20px]">phone</span>
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Emergency Contacts</p>
            </div>

            {/* Upcoming Step */}
            <div className="flex items-center gap-3 px-3 py-3 rounded-lg opacity-60">
              <div className="flex items-center justify-center size-8 rounded-full bg-slate-200 text-slate-500 dark:bg-slate-700 dark:text-slate-400">
                <span className="material-symbols-outlined text-[20px]">verified</span>
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Review &amp; Admit</p>
            </div>
          </nav>

          {/* Tip Card */}
          <div className="mt-auto bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-100 dark:border-blue-800">
            <div className="flex gap-2 items-start mb-2">
              <span className="material-symbols-outlined text-blue-600 dark:text-blue-400">lightbulb</span>
              <span className="text-blue-800 dark:text-blue-300 font-semibold text-sm">Quick Tip</span>
            </div>
            <p className="text-blue-700 dark:text-blue-200 text-xs leading-relaxed">
              Ensure all allergies are documented precisely. If "None Known" is selected, other allergy fields will be disabled automatically.
            </p>
          </div>
        </aside>

        {/* Right Content: Form Area */}
        <main className="flex-1 bg-slate-50 dark:bg-black/20 p-6 md:p-10 overflow-hidden flex flex-col relative">
          {/* Scrollable Paper Container */}
          <div className="bg-surface-light dark:bg-surface-dark rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 flex-1 overflow-y-auto custom-scrollbar relative max-w-4xl mx-auto w-full">
            {/* Form Header */}
            <div className="sticky top-0 bg-surface-light/95 dark:bg-surface-dark/95 backdrop-blur-sm z-10 px-8 py-6 border-b border-slate-100 dark:border-slate-700">
              <h2 className="text-2xl font-bold text-text-main dark:text-white">Clinical Profile</h2>
              <p className="text-slate-500 dark:text-slate-400 mt-1">Please detail the resident's medical history, including allergies and existing conditions.</p>
            </div>

            <div className="p-8 space-y-8 pb-32">
              {/* Section: Vital Signs */}
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <span className="material-symbols-outlined text-primary">monitor_heart</span>
                  <h3 className="text-lg font-semibold text-text-main dark:text-white">Base Vitals</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Field: Weight */}
                  <div className="relative">
                    <input className="peer floating-input block w-full rounded-lg border-slate-300 dark:border-slate-600 bg-transparent px-3 py-3 text-sm text-text-main dark:text-white focus:border-primary focus:ring-1 focus:ring-primary placeholder-transparent" id="weight" placeholder="Weight" type="number" />
                    <label className="absolute left-3 top-3 text-slate-500 dark:text-slate-400 transition-all cursor-text pointer-events-none" htmlFor="weight">Weight (kg)</label>
                    <span className="absolute right-3 top-3 text-slate-400 text-sm">kg</span>
                  </div>
                  {/* Field: Height */}
                  <div className="relative">
                    <input className="peer floating-input block w-full rounded-lg border-slate-300 dark:border-slate-600 bg-transparent px-3 py-3 text-sm text-text-main dark:text-white focus:border-primary focus:ring-1 focus:ring-primary placeholder-transparent" id="height" placeholder="Height" type="number" />
                    <label className="absolute left-3 top-3 text-slate-500 dark:text-slate-400 transition-all cursor-text pointer-events-none" htmlFor="height">Height (cm)</label>
                    <span className="absolute right-3 top-3 text-slate-400 text-sm">cm</span>
                  </div>
                  {/* Field: Blood Type */}
                  <div className="relative">
                    <select className="peer floating-input block w-full rounded-lg border-slate-300 dark:border-slate-600 bg-transparent px-3 py-3 text-sm text-text-main dark:text-white focus:border-primary focus:ring-1 focus:ring-primary appearance-none" id="bloodtype" defaultValue="">
                      <option className="dark:bg-surface-dark" disabled value="">Select Type</option>
                      <option className="dark:bg-surface-dark" value="A+">A+</option>
                      <option className="dark:bg-surface-dark" value="A-">A-</option>
                      <option className="dark:bg-surface-dark" value="B+">B+</option>
                      <option className="dark:bg-surface-dark" value="B-">B-</option>
                      <option className="dark:bg-surface-dark" value="O+">O+</option>
                      <option className="dark:bg-surface-dark" value="O-">O-</option>
                      <option className="dark:bg-surface-dark" value="AB+">AB+</option>
                      <option className="dark:bg-surface-dark" value="AB-">AB-</option>
                    </select>
                    <label className="absolute -top-2 left-2 bg-white dark:bg-surface-dark px-1 text-xs text-primary" htmlFor="bloodtype">Blood Type</label>
                    <span className="material-symbols-outlined absolute right-3 top-3 text-slate-400 pointer-events-none">arrow_drop_down</span>
                  </div>
                </div>
              </section>

              <hr className="border-slate-100 dark:border-slate-700" />

              {/* Section: Allergies (Tag Cloud) */}
              <section>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">coronavirus</span>
                    <h3 className="text-lg font-semibold text-text-main dark:text-white">Allergies &amp; Sensitivities</h3>
                  </div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input className="form-checkbox text-primary rounded border-slate-300 focus:ring-primary size-4" type="checkbox" />
                    <span className="text-sm text-slate-600 dark:text-slate-300">No known allergies (NKA)</span>
                  </label>
                </div>

                <div className="bg-slate-50 dark:bg-black/10 rounded-xl p-4 border border-slate-200 dark:border-slate-700 mb-4">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Common Allergens (Click to add)</p>
                  <div className="flex flex-wrap gap-2">
                    <button className="px-3 py-1.5 rounded-full border border-slate-300 dark:border-slate-600 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 hover:border-primary hover:text-primary transition-all flex items-center gap-1 group">
                      <span className="material-symbols-outlined text-[16px] group-hover:text-primary">add</span> Penicillin
                    </button>
                    <button className="px-3 py-1.5 rounded-full border border-slate-300 dark:border-slate-600 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 hover:border-primary hover:text-primary transition-all flex items-center gap-1 group">
                      <span className="material-symbols-outlined text-[16px] group-hover:text-primary">add</span> Sulfa
                    </button>
                    <button className="px-3 py-1.5 rounded-full border border-slate-300 dark:border-slate-600 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 hover:border-primary hover:text-primary transition-all flex items-center gap-1 group">
                      <span className="material-symbols-outlined text-[16px] group-hover:text-primary">add</span> Latex
                    </button>
                    <button className="px-3 py-1.5 rounded-full border border-slate-300 dark:border-slate-600 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 hover:border-primary hover:text-primary transition-all flex items-center gap-1 group">
                      <span className="material-symbols-outlined text-[16px] group-hover:text-primary">add</span> Peanuts
                    </button>
                    <button className="px-3 py-1.5 rounded-full border border-slate-300 dark:border-slate-600 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 hover:border-primary hover:text-primary transition-all flex items-center gap-1 group">
                      <span className="material-symbols-outlined text-[16px] group-hover:text-primary">add</span> Shellfish
                    </button>
                  </div>
                </div>

                {/* Active Tags */}
                <div className="flex flex-wrap gap-2 items-center">
                  <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 text-sm font-medium">
                    Lactose
                    <button className="hover:bg-primary/20 rounded-full p-0.5"><span className="material-symbols-outlined text-[16px]">close</span></button>
                  </div>
                  <div className="relative flex-grow max-w-xs">
                    <input className="w-full bg-transparent border-b border-slate-300 dark:border-slate-600 focus:border-primary focus:outline-none py-1 text-sm text-text-main dark:text-white placeholder-slate-400" placeholder="Add other allergy..." type="text" />
                    <button className="absolute right-0 top-1 text-primary hover:text-primary-dark">
                      <span className="material-symbols-outlined text-[20px]">add_circle</span>
                    </button>
                  </div>
                </div>
              </section>

              <hr className="border-slate-100 dark:border-slate-700" />

              {/* Section: Conditions & History */}
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <span className="material-symbols-outlined text-primary">history_edu</span>
                  <h3 className="text-lg font-semibold text-text-main dark:text-white">Medical Conditions &amp; History</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {/* Multi-Select Condition (Mockup) */}
                  <div className="relative">
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Existing Conditions</label>
                    <div className="p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-transparent min-h-[50px] flex flex-wrap gap-2">
                      <div className="flex items-center gap-1 px-2 py-1 rounded bg-slate-100 dark:bg-slate-700 text-xs text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-600">
                        Hypertension <button><span className="material-symbols-outlined text-[14px]">close</span></button>
                      </div>
                      <div className="flex items-center gap-1 px-2 py-1 rounded bg-slate-100 dark:bg-slate-700 text-xs text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-600">
                        Diabetes Type 2 <button><span className="material-symbols-outlined text-[14px]">close</span></button>
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">Select from common list or type to search</p>
                  </div>

                  {/* Diet */}
                  <div className="relative">
                    <select className="peer floating-input block w-full rounded-lg border-slate-300 dark:border-slate-600 bg-transparent px-3 py-3 text-sm text-text-main dark:text-white focus:border-primary focus:ring-1 focus:ring-primary appearance-none mt-7" id="diet" defaultValue="Regular">
                      <option className="dark:bg-surface-dark" disabled value="">Select Diet Type</option>
                      <option className="dark:bg-surface-dark" value="Regular">Regular</option>
                      <option className="dark:bg-surface-dark" value="Low Sodium">Low Sodium</option>
                      <option className="dark:bg-surface-dark" value="Diabetic">Diabetic</option>
                      <option className="dark:bg-surface-dark" value="Pureed">Pureed</option>
                    </select>
                    <label className="absolute top-5 left-2 bg-white dark:bg-surface-dark px-1 text-xs text-primary" htmlFor="diet">Dietary Restrictions</label>
                    <span className="material-symbols-outlined absolute right-3 top-10 text-slate-400 pointer-events-none">arrow_drop_down</span>
                  </div>
                </div>

                {/* Notes Area */}
                <div className="relative">
                  <textarea className="peer floating-input block w-full rounded-lg border-slate-300 dark:border-slate-600 bg-transparent px-3 py-3 text-sm text-text-main dark:text-white focus:border-primary focus:ring-1 focus:ring-primary placeholder-transparent" id="notes" placeholder="Notes" rows={4}></textarea>
                  <label className="absolute left-3 top-3 text-slate-500 dark:text-slate-400 transition-all cursor-text pointer-events-none bg-surface-light dark:bg-surface-dark px-1" htmlFor="notes">Additional Medical Notes / Observations</label>
                </div>
              </section>
            </div>
          </div>

          {/* Floating Action Buttons Container */}
          <div className="absolute bottom-6 right-6 md:right-10 flex gap-3 z-20">
            <button 
              onClick={() => navigate('/residents')}
              className="px-6 py-3 rounded-xl bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-600 text-text-main dark:text-white font-semibold shadow-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-all flex items-center gap-2"
            >
              <span className="material-symbols-outlined">arrow_back</span>
              Back
            </button>
            <button 
              onClick={() => navigate('/residents')}
              className="px-6 py-3 rounded-xl bg-primary text-white font-semibold shadow-lg shadow-primary/30 hover:bg-purple-800 hover:shadow-primary/50 transition-all flex items-center gap-2"
            >
              Next Step
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>

          {/* Fade overlay for bottom of scroll area */}
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-50 to-transparent dark:from-[#1e1e24] pointer-events-none z-10 w-full md:w-[calc(100%-40px)] mx-auto rounded-b-2xl"></div>
        </main>
      </div>
    </div>
  );
}
