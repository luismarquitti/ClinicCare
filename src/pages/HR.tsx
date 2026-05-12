import React, { useState, useMemo } from 'react';
import { useAppStore } from '../store';
import { Employee, Role } from '../types';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'react-hot-toast';
import {
  Users,
  UserPlus,
  Shield,
  Mail,
  Filter,
  MoreVertical,
  UserCheck,
  UserMinus,
  Edit2,
  X,
  Search,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

const inviteSchema = z.object({
  email: z.string().email('E-mail inválido'),
  systemRole: z.enum(['superAdmin', 'admin', 'clinico', 'tecnico', 'financeiro', 'rh']),
  name: z.string().optional(),
});

type InviteForm = z.infer<typeof inviteSchema>;

const editRoleSchema = z.object({
  systemRole: z.enum(['superAdmin', 'admin', 'clinico', 'tecnico', 'financeiro', 'rh']),
});

type EditRoleForm = z.infer<typeof editRoleSchema>;

export function HR() {
  const {
    employees,
    inviteEmployee,
    updateEmployeeRole,
    toggleEmployeeAccountStatus,
    user: currentUser
  } = useAppStore();

  const [activeTab, setActiveTab] = useState<'colaboradores' | 'adiantamentos'>('colaboradores');
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Modals
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [isEditRoleModalOpen, setIsEditRoleModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { register: registerInvite, handleSubmit: handleSubmitInvite, reset: resetInvite, formState: { errors: inviteErrors } } = useForm<InviteForm>({
    resolver: zodResolver(inviteSchema)
  });

  const { register: registerEdit, handleSubmit: handleSubmitEdit, reset: resetEdit, formState: { errors: editErrors } } = useForm<EditRoleForm>({
    resolver: zodResolver(editRoleSchema)
  });

  const filteredEmployees = useMemo(() => {
    return employees.filter(emp => {
      const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           emp.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRole = roleFilter === 'all' || emp.systemRole === roleFilter;
      const matchesStatus = statusFilter === 'all' || emp.accountStatus === statusFilter;
      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [employees, searchTerm, roleFilter, statusFilter]);

  const onInviteSubmit = async (data: InviteForm) => {
    setIsLoading(true);
    try {
      await inviteEmployee(data);
      toast.success('Convite enviado com sucesso!');
      setIsInviteModalOpen(false);
      resetInvite();
    } catch (err: any) {
      toast.error('Erro ao enviar convite: ' + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const onEditRoleSubmit = async (data: EditRoleForm) => {
    if (!selectedEmployee) return;
    setIsLoading(true);
    try {
      await updateEmployeeRole(selectedEmployee.id, data.systemRole);
      toast.success('Papel do colaborador atualizado!');
      setIsEditRoleModalOpen(false);
      setSelectedEmployee(null);
    } catch (err: any) {
      toast.error('Erro ao atualizar papel: ' + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleStatus = async (emp: Employee) => {
    const newStatus = emp.accountStatus === 'active' ? 'inactive' : 'active';
    const action = newStatus === 'active' ? 'reativar' : 'desativar';

    if (window.confirm(`Deseja realmente ${action} a conta de ${emp.name}?`)) {
      try {
        await toggleEmployeeAccountStatus(emp.id, newStatus);
        toast.success(`Conta ${newStatus === 'active' ? 'reativada' : 'desativada'} com sucesso!`);
      } catch (err: any) {
        toast.error('Erro ao alterar status: ' + err.message);
      }
    }
  };

  const getRoleBadgeColor = (role: Role) => {
    switch (role) {
      case 'superAdmin': return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400';
      case 'admin': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
      case 'clinico': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      case 'tecnico': return 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400';
      case 'financeiro': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'rh': return 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400';
    }
  };

  const getStatusBadge = (status: Employee['accountStatus']) => {
    switch (status) {
      case 'active':
        return <span className="flex items-center gap-1 text-xs font-bold text-success"><CheckCircle2 size={14} /> Ativo</span>;
      case 'pending':
        return <span className="flex items-center gap-1 text-xs font-bold text-warning"><AlertCircle size={14} /> Pendente</span>;
      case 'inactive':
        return <span className="flex items-center gap-1 text-xs font-bold text-danger"><X size={14} /> Inativo</span>;
    }
  };

  return (
    <div className="w-full max-w-[1440px] mx-auto p-4 md:p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-black text-text-main dark:text-white tracking-tighter uppercase">Recursos Humanos</h1>
          <p className="text-text-muted dark:text-gray-400 mt-1 font-bold tracking-widest uppercase text-xs">Gestão de Equipe e Controle de Acesso</p>
        </div>
        <button
          onClick={() => setIsInviteModalOpen(true)}
          className="bg-text-main dark:bg-white text-white dark:text-text-main px-6 py-3 font-bold uppercase tracking-widest text-xs flex items-center gap-2 hover:opacity-90 transition-all active:scale-95 shadow-lg"
        >
          <UserPlus size={18} />
          Convidar Colaborador
        </button>
      </div>

      <div className="bg-white dark:bg-surface-dark border-4 border-text-main dark:border-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]">
        <div className="border-b-4 border-text-main dark:border-white p-4 flex flex-wrap gap-4 items-center justify-between bg-surface-light dark:bg-background-dark">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
              <input
                type="text"
                placeholder="Buscar por nome ou e-mail..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-white dark:bg-background-dark border-2 border-text-main dark:border-white font-bold text-sm outline-none w-full md:w-64"
              />
            </div>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="px-4 py-2 bg-white dark:bg-background-dark border-2 border-text-main dark:border-white font-bold text-sm outline-none"
            >
              <option value="all">Todos os Papéis</option>
              <option value="superAdmin">Super Admin</option>
              <option value="admin">Administrador</option>
              <option value="clinico">Clínico</option>
              <option value="tecnico">Técnico</option>
              <option value="financeiro">Financeiro</option>
              <option value="rh">RH</option>
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 bg-white dark:bg-background-dark border-2 border-text-main dark:border-white font-bold text-sm outline-none"
            >
              <option value="all">Todos os Status</option>
              <option value="active">Ativo</option>
              <option value="pending">Pendente</option>
              <option value="inactive">Inativo</option>
            </select>
          </div>
          <div className="text-xs font-black uppercase tracking-tighter text-text-muted">
            {filteredEmployees.length} Colaboradores Encontrados
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b-4 border-text-main dark:border-white bg-surface-light dark:bg-background-dark">
                <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-text-main dark:text-white">Colaborador</th>
                <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-text-main dark:text-white">E-mail</th>
                <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-text-main dark:text-white">Papel (RBAC)</th>
                <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-text-main dark:text-white">Status Conta</th>
                <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-text-main dark:text-white text-right">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((emp) => (
                <tr key={emp.id} className="border-b-2 border-gray-200 dark:border-gray-800 hover:bg-surface-light/50 dark:hover:bg-background-dark/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-none border-2 border-text-main dark:border-white bg-primary/10 flex items-center justify-center font-black text-primary uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]">
                        {emp.name.substring(0, 2)}
                      </div>
                      <div className="font-bold text-text-main dark:text-white uppercase tracking-tighter">{emp.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-text-muted dark:text-gray-400">{emp.email}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 text-[10px] font-black uppercase tracking-widest border-2 border-current ${getRoleBadgeColor(emp.systemRole)}`}>
                      {emp.systemRole}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-bold uppercase tracking-widest">{getStatusBadge(emp.accountStatus)}</td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => {
                          setSelectedEmployee(emp);
                          resetEdit({ systemRole: emp.systemRole });
                          setIsEditRoleModalOpen(true);
                        }}
                        className="p-2 border-2 border-text-main dark:border-white hover:bg-text-main hover:text-white dark:hover:bg-white dark:hover:text-text-main transition-all active:scale-95"
                        title="Editar Papel"
                      >
                        <Shield size={16} />
                      </button>
                      <button
                        onClick={() => handleToggleStatus(emp)}
                        className={`p-2 border-2 ${emp.accountStatus === 'inactive' ? 'border-success text-success hover:bg-success hover:text-white' : 'border-danger text-danger hover:bg-danger hover:text-white'} transition-all active:scale-95`}
                        title={emp.accountStatus === 'inactive' ? 'Ativar Conta' : 'Desativar Conta'}
                      >
                        {emp.accountStatus === 'inactive' ? <UserCheck size={16} /> : <UserMinus size={16} />}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredEmployees.length === 0 && (
            <div className="p-20 text-center">
              <Users size={48} className="mx-auto text-text-muted opacity-20 mb-4" />
              <p className="text-text-muted font-bold uppercase tracking-widest">Nenhum colaborador encontrado.</p>
            </div>
          )}
        </div>
      </div>

      {/* Invite Modal */}
      {isInviteModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-background-dark border-4 border-text-main dark:border-white w-full max-w-md shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] dark:shadow-[12px_12px_0px_0px_rgba(255,255,255,1)]">
            <div className="p-6 border-b-4 border-text-main dark:border-white flex justify-between items-center bg-surface-light dark:bg-background-dark">
              <h3 className="text-xl font-black uppercase tracking-tighter">Convidar para a Equipe</h3>
              <button onClick={() => setIsInviteModalOpen(false)} className="hover:rotate-90 transition-transform">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmitInvite(onInviteSubmit)} className="p-6 space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-text-muted">Nome Completo (Opcional)</label>
                <input
                  {...registerInvite('name')}
                  className="w-full p-3 bg-transparent border-2 border-text-main dark:border-white font-bold outline-none focus:bg-primary/5 transition-colors"
                  placeholder="Ex: Ana Souza"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-text-muted">E-mail Profissional</label>
                <input
                  {...registerInvite('email')}
                  className={`w-full p-3 bg-transparent border-2 ${inviteErrors.email ? 'border-danger' : 'border-text-main dark:border-white'} font-bold outline-none focus:bg-primary/5 transition-colors`}
                  placeholder="ana.souza@empresa.com"
                />
                {inviteErrors.email && <p className="text-xs font-bold text-danger uppercase tracking-widest">{inviteErrors.email.message}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-text-muted">Papel de Acesso</label>
                <select
                  {...registerInvite('systemRole')}
                  className={`w-full p-3 bg-transparent border-2 ${inviteErrors.systemRole ? 'border-danger' : 'border-text-main dark:border-white'} font-bold outline-none focus:bg-primary/5 transition-colors appearance-none uppercase`}
                >
                  <option value="">Selecione o acesso...</option>
                  <option value="superAdmin">Super Admin</option>
                  <option value="admin">Administrador</option>
                  <option value="clinico">Corpo Clínico (Saúde)</option>
                  <option value="tecnico">Técnico (Manutenção)</option>
                  <option value="financeiro">Financeiro</option>
                  <option value="rh">Recursos Humanos</option>
                </select>
                {inviteErrors.systemRole && <p className="text-xs font-bold text-danger uppercase tracking-widest">{inviteErrors.systemRole.message}</p>}
              </div>
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setIsInviteModalOpen(false)}
                  className="flex-1 py-3 border-2 border-text-main dark:border-white font-black uppercase tracking-widest text-xs hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 py-3 bg-text-main dark:bg-white text-white dark:text-text-main font-black uppercase tracking-widest text-xs hover:opacity-90 active:scale-95 transition-all disabled:opacity-50"
                >
                  {isLoading ? 'Enviando...' : 'Enviar Convite'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Role Modal */}
      {isEditRoleModalOpen && selectedEmployee && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-background-dark border-4 border-text-main dark:border-white w-full max-w-md shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] dark:shadow-[12px_12px_0px_0px_rgba(255,255,255,1)]">
            <div className="p-6 border-b-4 border-text-main dark:border-white flex justify-between items-center bg-surface-light dark:bg-background-dark">
              <h3 className="text-xl font-black uppercase tracking-tighter">Alterar Permissões</h3>
              <button onClick={() => setIsEditRoleModalOpen(false)} className="hover:rotate-90 transition-transform">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmitEdit(onEditRoleSubmit)} className="p-6 space-y-6">
              <div className="p-4 bg-primary/5 border-2 border-primary/20 space-y-1">
                <p className="text-[10px] font-black uppercase tracking-widest text-primary">Alterando acesso de:</p>
                <p className="font-bold text-lg tracking-tighter uppercase">{selectedEmployee.name}</p>
                <p className="text-xs font-medium opacity-60">{selectedEmployee.email}</p>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-text-muted">Novo Papel de Acesso</label>
                <select
                  {...registerEdit('systemRole')}
                  className={`w-full p-3 bg-transparent border-2 ${editErrors.systemRole ? 'border-danger' : 'border-text-main dark:border-white'} font-bold outline-none focus:bg-primary/5 transition-colors appearance-none uppercase`}
                >
                  <option value="superAdmin">Super Admin</option>
                  <option value="admin">Administrador</option>
                  <option value="clinico">Corpo Clínico (Saúde)</option>
                  <option value="tecnico">Técnico (Manutenção)</option>
                  <option value="financeiro">Financeiro</option>
                  <option value="rh">Recursos Humanos</option>
                </select>
                {editErrors.systemRole && <p className="text-xs font-bold text-danger uppercase tracking-widest">{editErrors.systemRole.message}</p>}
              </div>

              <div className="bg-warning/10 border-2 border-warning/20 p-4 flex gap-3">
                <AlertCircle size={20} className="text-warning shrink-0" />
                <p className="text-[10px] font-bold uppercase leading-tight text-warning">
                  Esta alteração terá efeito imediato no próximo login do colaborador ou refresh da página.
                </p>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setIsEditRoleModalOpen(false)}
                  className="flex-1 py-3 border-2 border-text-main dark:border-white font-black uppercase tracking-widest text-xs hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  Descartar
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 py-3 bg-text-main dark:bg-white text-white dark:text-text-main font-black uppercase tracking-widest text-xs hover:opacity-90 active:scale-95 transition-all disabled:opacity-50"
                >
                  {isLoading ? 'Salvando...' : 'Confirmar Alteração'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
