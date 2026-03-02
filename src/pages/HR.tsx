import React, { useState } from 'react';
import { useAppStore } from '../store';
import { Employee, SalaryAdvance } from '../types';

export function HR() {
    const { employees, salaryAdvances, addEmployee, updateEmployee, addSalaryAdvance, updateSalaryAdvanceStatus, addExpense } = useAppStore();
    const [activeTab, setActiveTab] = useState<'funcionarios' | 'folha'>('funcionarios');

    // Add Employee State
    const [isAddEmployeeModalOpen, setIsAddEmployeeModalOpen] = useState(false);
    const [newEmployee, setNewEmployee] = useState<Partial<Employee>>({
        name: '', role: '', status: 'off_duty', contact: '', baseSalary: 0
    });

    // Add Advance State
    const [isAddAdvanceModalOpen, setIsAddAdvanceModalOpen] = useState(false);
    const [newAdvance, setNewAdvance] = useState<Partial<SalaryAdvance>>({
        employeeId: '', amount: 0, description: '', status: 'pending', date: new Date().toISOString().split('T')[0]
    });

    const handleAddEmployee = async (e: React.FormEvent) => {
        e.preventDefault();
        if (newEmployee.name && newEmployee.role) {
            await addEmployee({ ...newEmployee, hireDate: new Date().toISOString().split('T')[0] } as Omit<Employee, 'id'>);
            setIsAddEmployeeModalOpen(false);
            setNewEmployee({ name: '', role: '', status: 'off_duty', contact: '', baseSalary: 0 });
        }
    };

    const handleAddAdvance = async (e: React.FormEvent) => {
        e.preventDefault();
        if (newAdvance.employeeId && newAdvance.amount && newAdvance.amount > 0) {
            await addSalaryAdvance(newAdvance as Omit<SalaryAdvance, 'id'>);
            setIsAddAdvanceModalOpen(false);
            setNewAdvance({ employeeId: '', amount: 0, description: '', status: 'pending', date: new Date().toISOString().split('T')[0] });
        }
    };

    const handleApproveAdvance = async (advance: SalaryAdvance) => {
        await updateSalaryAdvanceStatus(advance.id, 'approved');
    };

    const handlePayAdvance = async (advance: SalaryAdvance) => {
        const emp = employees.find(e => e.id === advance.employeeId);
        if (emp && window.confirm(`Confirmar o pagamento de Vale para ${emp.name}? Isso criará uma despesa no módulo financeiro.`)) {
            await updateSalaryAdvanceStatus(advance.id, 'paid');

            // Post to Financial Module
            await addExpense({
                date: new Date().toISOString(),
                description: `Adiantamento/Vale - ${emp.name} (${advance.description})`,
                category: 'pessoal',
                amount: advance.amount,
                status: 'pago' // Since we are paying it now
            });
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'on_duty': return 'Trabalhando';
            case 'off_duty': return 'Folga';
            case 'vacation': return 'Férias';
            case 'leave': return 'Licença/Atestado';
            default: return status;
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'on_duty': return 'bg-success/10 text-success border-success/20';
            case 'off_duty': return 'bg-gray-100 text-gray-700 border-gray-200';
            case 'vacation': return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'leave': return 'bg-warning/10 text-warning border-warning/20';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    const getAdvanceStatusColor = (status: string) => {
        switch (status) {
            case 'pending': return 'bg-warning/10 text-warning';
            case 'approved': return 'bg-blue-100 text-blue-700';
            case 'paid': return 'bg-success/10 text-success';
            case 'rejected': return 'bg-danger/10 text-danger';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    const getAdvanceStatusText = (status: string) => {
        const translations: Record<string, string> = {
            'pending': 'Pendente', 'approved': 'Aprovado', 'paid': 'Pago', 'rejected': 'Rejeitado'
        };
        return translations[status] || status;
    };

    return (
        <div className="w-full max-w-[1440px] mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-text-main dark:text-white tracking-tight">Recursos Humanos</h1>
                    <p className="text-text-muted dark:text-gray-400 mt-1">Gestão de Equipe, Plantões e Adiantamentos (Vales)</p>
                </div>
            </div>

            <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
                <nav aria-label="Tabs" className="flex space-x-8 overflow-x-auto custom-scrollbar">
                    <button
                        onClick={() => setActiveTab('funcionarios')}
                        className={`py-4 px-1 whitespace-nowrap inline-flex items-center text-sm font-bold border-b-[3px] transition-all ${activeTab === 'funcionarios' ? 'border-primary text-primary' : 'border-transparent text-text-muted hover:text-text-main hover:border-gray-300'}`}
                    >
                        <span className="material-symbols-outlined mr-2 text-[20px]">badge</span>
                        Equipe (Funcionários)
                    </button>
                    <button
                        onClick={() => setActiveTab('folha')}
                        className={`py-4 px-1 whitespace-nowrap inline-flex items-center text-sm font-bold border-b-[3px] transition-all ${activeTab === 'folha' ? 'border-primary text-primary' : 'border-transparent text-text-muted hover:text-text-main hover:border-gray-300'}`}
                    >
                        <span className="material-symbols-outlined mr-2 text-[20px]">request_quote</span>
                        Adiantamentos & Vales
                    </button>
                </nav>
            </div>

            <div className="bg-white dark:bg-surface-dark rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                {activeTab === 'funcionarios' && (
                    <div className="p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-lg font-bold text-text-main dark:text-white">Relação de Colaboradores</h2>
                            <button
                                onClick={() => setIsAddEmployeeModalOpen(true)}
                                className="text-primary hover:text-primary/80 font-medium text-sm transition-colors flex items-center gap-1"
                            >
                                <span className="material-symbols-outlined text-[18px]">person_add</span> Novo Funcionário
                            </button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-surface-light border-y border-gray-200 dark:bg-surface-dark/50 dark:border-gray-700 text-sm font-semibold text-text-muted">
                                        <th className="py-3 px-4">Nome</th>
                                        <th className="py-3 px-4">Cargo / Função</th>
                                        <th className="py-3 px-4">Contato</th>
                                        <th className="py-3 px-4 text-right">Salário Base</th>
                                        <th className="py-3 px-4 text-center">Status Atual</th>
                                        <th className="py-3 px-4 text-center">Ações</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm">
                                    {employees.map(emp => (
                                        <tr key={emp.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-surface-light dark:hover:bg-surface-dark transition-colors">
                                            <td className="py-3 px-4 font-bold text-text-main dark:text-white flex items-center gap-2">
                                                <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs uppercase">
                                                    {emp.name.substring(0, 2)}
                                                </div>
                                                {emp.name}
                                            </td>
                                            <td className="py-3 px-4 text-text-muted">{emp.role}</td>
                                            <td className="py-3 px-4 text-text-muted">{emp.contact || '-'}</td>
                                            <td className="py-3 px-4 text-right font-medium text-text-main dark:text-white">
                                                {emp.baseSalary ? new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(emp.baseSalary) : '-'}
                                            </td>
                                            <td className="py-3 px-4 text-center">
                                                <select
                                                    value={emp.status}
                                                    onChange={(e) => updateEmployee(emp.id, { status: e.target.value as any })}
                                                    className={`px-2 py-1 border rounded-full text-xs font-bold inline-block text-center outline-none cursor-pointer ${getStatusColor(emp.status)}`}
                                                >
                                                    <option value="on_duty">Trabalhando</option>
                                                    <option value="off_duty">Em Folga</option>
                                                    <option value="vacation">Férias</option>
                                                    <option value="leave">Atestado/Licença</option>
                                                </select>
                                            </td>
                                            <td className="py-3 px-4 text-center">
                                                <button
                                                    className="text-text-muted hover:text-primary transition-colors p-1"
                                                    title="Editar"
                                                >
                                                    <span className="material-symbols-outlined text-[18px]">edit</span>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    {employees.length === 0 && (
                                        <tr>
                                            <td colSpan={6} className="py-8 text-center text-text-muted">Nenhum funcionário cadastrado.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {activeTab === 'folha' && (
                    <div className="p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-lg font-bold text-text-main dark:text-white">Gerenciamento de Vales / Adiantamentos</h2>
                            <button
                                onClick={() => setIsAddAdvanceModalOpen(true)}
                                className="text-primary hover:text-primary/80 font-medium text-sm transition-colors flex items-center gap-1"
                            >
                                <span className="material-symbols-outlined text-[18px]">payments</span> Solicitar Vale
                            </button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-surface-light border-y border-gray-200 dark:bg-surface-dark/50 dark:border-gray-700 text-sm font-semibold text-text-muted">
                                        <th className="py-3 px-4">Data</th>
                                        <th className="py-3 px-4">Funcionário</th>
                                        <th className="py-3 px-4">Motivo / Descrição</th>
                                        <th className="py-3 px-4 text-right">Valor Solicitado</th>
                                        <th className="py-3 px-4 text-center">Status</th>
                                        <th className="py-3 px-4 text-right">Ações</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm">
                                    {salaryAdvances.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map(advance => {
                                        const emp = employees.find(e => e.id === advance.employeeId);
                                        return (
                                            <tr key={advance.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-surface-light dark:hover:bg-surface-dark transition-colors">
                                                <td className="py-3 px-4 text-text-muted">{new Date(advance.date).toLocaleDateString('pt-BR')}</td>
                                                <td className="py-3 px-4 font-medium text-text-main dark:text-white">{emp ? emp.name : 'Funcionário Excluído'}</td>
                                                <td className="py-3 px-4 text-text-muted">{advance.description}</td>
                                                <td className="py-3 px-4 text-right font-medium text-text-main dark:text-white">
                                                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(advance.amount)}
                                                </td>
                                                <td className="py-3 px-4 text-center">
                                                    <span className={`px-2 py-1 rounded-full text-xs font-bold capitalize ${getAdvanceStatusColor(advance.status)}`}>
                                                        {getAdvanceStatusText(advance.status)}
                                                    </span>
                                                </td>
                                                <td className="py-3 px-4 text-right flex justify-end gap-2">
                                                    {advance.status === 'pending' && (
                                                        <button
                                                            onClick={() => handleApproveAdvance(advance)}
                                                            className="text-primary hover:text-primary/80 transition-colors px-2 py-1 text-xs border border-primary/20 rounded-md bg-primary/5 font-medium"
                                                        >
                                                            Aprovar
                                                        </button>
                                                    )}
                                                    {advance.status === 'approved' && (
                                                        <button
                                                            onClick={() => handlePayAdvance(advance)}
                                                            className="text-success hover:text-success/80 transition-colors px-2 py-1 text-xs border border-success/20 rounded-md bg-success/5 font-medium flex items-center gap-1"
                                                        >
                                                            <span className="material-symbols-outlined text-[14px]">price_check</span> Pagar
                                                        </button>
                                                    )}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                    {salaryAdvances.length === 0 && (
                                        <tr>
                                            <td colSpan={6} className="py-8 text-center text-text-muted">Nenhum vale ou adiantamento registrado no momento.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>

            {/* Modal Add Employee */}
            {isAddEmployeeModalOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-surface-dark w-full max-w-md rounded-2xl shadow-xl overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                            <h3 className="text-lg font-bold text-text-main dark:text-white">Novo Funcionário</h3>
                            <button onClick={() => setIsAddEmployeeModalOpen(false)} className="text-text-muted hover:text-text-main transition-colors">
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>
                        <form onSubmit={handleAddEmployee} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-text-main dark:text-white mb-1">Nome Completo</label>
                                <input type="text" required placeholder="Ex: Ana Maria Freitas" value={newEmployee.name} onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })} className="w-full px-3 py-2 bg-background-light dark:bg-background-dark border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary outline-none text-text-main dark:text-white" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-text-main dark:text-white mb-1">Cargo/Função</label>
                                    <input type="text" required placeholder="Ex: Técnico de Enf." value={newEmployee.role} onChange={(e) => setNewEmployee({ ...newEmployee, role: e.target.value })} className="w-full px-3 py-2 bg-background-light dark:bg-background-dark border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary outline-none text-text-main dark:text-white" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-text-main dark:text-white mb-1">Salário Base (R$)</label>
                                    <input type="number" required min="0" step="0.01" value={newEmployee.baseSalary || ''} onChange={(e) => setNewEmployee({ ...newEmployee, baseSalary: Number(e.target.value) })} className="w-full px-3 py-2 bg-background-light dark:bg-background-dark border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary outline-none text-text-main dark:text-white" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-text-main dark:text-white mb-1">Telefone / Contato</label>
                                <input type="text" placeholder="(11) 90000-0000" value={newEmployee.contact} onChange={(e) => setNewEmployee({ ...newEmployee, contact: e.target.value })} className="w-full px-3 py-2 bg-background-light dark:bg-background-dark border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary outline-none text-text-main dark:text-white" />
                            </div>
                            <div className="pt-4 flex justify-end gap-3">
                                <button type="button" onClick={() => setIsAddEmployeeModalOpen(false)} className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 text-text-main dark:text-white rounded-lg transition-colors font-medium border border-gray-200 dark:border-gray-700">Cancelar</button>
                                <button type="submit" className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium">Cadastrar Profissional</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal Add Advance */}
            {isAddAdvanceModalOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-surface-dark w-full max-w-md rounded-2xl shadow-xl overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                            <h3 className="text-lg font-bold text-text-main dark:text-white">Solicitar Vale / Adiantamento</h3>
                            <button onClick={() => setIsAddAdvanceModalOpen(false)} className="text-text-muted hover:text-text-main transition-colors">
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>
                        <form onSubmit={handleAddAdvance} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-text-main dark:text-white mb-1">Funcionário</label>
                                <select required value={newAdvance.employeeId} onChange={(e) => setNewAdvance({ ...newAdvance, employeeId: e.target.value })} className="w-full px-3 py-2 bg-background-light dark:bg-background-dark border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary outline-none text-text-main dark:text-white">
                                    <option value="" disabled>Selecione um funcionário</option>
                                    {employees.map(emp => <option key={emp.id} value={emp.id}>{emp.name} ({emp.role})</option>)}
                                </select>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-text-main dark:text-white mb-1">Valor (R$)</label>
                                    <input type="number" required min="1" step="0.01" value={newAdvance.amount || ''} onChange={(e) => setNewAdvance({ ...newAdvance, amount: Number(e.target.value) })} className="w-full px-3 py-2 bg-background-light dark:bg-background-dark border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary outline-none text-text-main dark:text-white" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-text-main dark:text-white mb-1">Data</label>
                                    <input type="date" required value={newAdvance.date} onChange={(e) => setNewAdvance({ ...newAdvance, date: e.target.value })} className="w-full px-3 py-2 bg-background-light dark:bg-background-dark border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary outline-none text-text-main dark:text-white" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-text-main dark:text-white mb-1">Motivo / Descrição</label>
                                <input type="text" required placeholder="Vale Transporte, Adiantamento Quinzenal..." value={newAdvance.description} onChange={(e) => setNewAdvance({ ...newAdvance, description: e.target.value })} className="w-full px-3 py-2 bg-background-light dark:bg-background-dark border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary outline-none text-text-main dark:text-white" />
                            </div>

                            <div className="pt-4 flex justify-end gap-3">
                                <button type="button" onClick={() => setIsAddAdvanceModalOpen(false)} className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 text-text-main dark:text-white rounded-lg transition-colors font-medium border border-gray-200 dark:border-gray-700">Cancelar</button>
                                <button type="submit" className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium">Registrar Solicitação</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
