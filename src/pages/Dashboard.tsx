import { useAppStore } from '../store';
import { Users, Pill, DollarSign, Wrench, Bell, Check } from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line
} from 'recharts';

export function Dashboard() {
  const { residents, administrations, billingItems, maintenanceLogs, notifications, user, markNotificationAsRead } = useAppStore();

  const userNotifications = notifications.filter(n => n.targetRole === 'all' || n.targetRole === user?.role);
  const unreadNotifications = userNotifications.filter(n => !n.read);

  const stats = [
    {
      title: 'Residentes Ativos',
      value: residents.filter(r => r.status === 'ativo').length,
      icon: Users,
      color: 'text-primary',
      bg: 'bg-primary/10',
    },
    {
      title: 'Medicações Pendentes',
      value: administrations.filter(a => a.status === 'pendente').length,
      icon: Pill,
      color: 'text-secondary',
      bg: 'bg-secondary/10',
    },
    {
      title: 'Faturamento Pendente',
      value: new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
        billingItems.filter(b => b.status === 'pendente').reduce((acc, curr) => acc + curr.amount, 0)
      ),
      icon: DollarSign,
      color: 'text-orange-600',
      bg: 'bg-orange-100',
    },
    {
      title: 'Manutenções Registradas',
      value: maintenanceLogs.length,
      icon: Wrench,
      color: 'text-rose-600',
      bg: 'bg-rose-100',
    },
  ];

  // Data for Occupancy Pie Chart
  const totalRooms = 50; // Mock total capacity
  const activeResidents = residents.filter(r => r.status === 'ativo').length;
  const occupancyData = [
    { name: 'Ocupado', value: activeResidents },
    { name: 'Disponível', value: totalRooms - activeResidents }
  ];
  const COLORS = ['#006874', '#cbd5e1'];

  // Data for Monthly Costs Bar Chart
  const costsData = residents.map(r => {
    const residentCosts = billingItems
      .filter(b => b.residentId === r.id)
      .reduce((acc, curr) => acc + curr.amount, 0);
    return {
      name: r.name.split(' ')[0],
      custo: residentCosts
    };
  }).filter(d => d.custo > 0);

  // Data for Maintenance Performance Line Chart
  const maintenanceData = [
    { name: 'Seg', preventivas: 1, corretivas: 0 },
    { name: 'Ter', preventivas: 0, corretivas: 1 },
    { name: 'Qua', preventivas: 2, corretivas: 0 },
    { name: 'Qui', preventivas: 1, corretivas: 1 },
    { name: 'Sex', preventivas: 0, corretivas: 2 },
    { name: 'Sáb', preventivas: 0, corretivas: 0 },
    { name: 'Dom', preventivas: 1, corretivas: 0 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dashboard Analítico</h1>
          <p className="text-slate-500">Visão geral e métricas da clínica.</p>
        </div>
        
        {/* Notifications Dropdown */}
        <div className="relative group">
          <button className="relative p-2 bg-white rounded-full shadow-sm border border-slate-200 hover:bg-slate-50 transition-colors">
            <Bell size={20} className="text-slate-600" />
            {unreadNotifications.length > 0 && (
              <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white"></span>
            )}
          </button>
          <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-slate-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
            <div className="p-4 border-b border-slate-100 flex justify-between items-center">
              <h3 className="font-bold text-slate-900">Notificações</h3>
              <span className="text-xs font-medium bg-slate-100 text-slate-600 px-2 py-1 rounded-full">
                {unreadNotifications.length} novas
              </span>
            </div>
            <div className="max-h-80 overflow-y-auto">
              {userNotifications.length === 0 ? (
                <div className="p-8 text-center text-slate-500">
                  Nenhuma notificação.
                </div>
              ) : (
                userNotifications.map(notif => (
                  <div key={notif.id} className={`p-4 border-b border-slate-50 transition-colors flex gap-3 ${notif.read ? 'bg-white' : 'bg-blue-50/50'}`}>
                    <div className="flex-1">
                      <p className={`text-sm ${notif.read ? 'text-slate-600' : 'text-slate-900 font-medium'}`}>{notif.message}</p>
                      <span className="text-xs text-slate-400 mt-1 block">
                        {new Date(notif.createdAt).toLocaleString('pt-BR')}
                      </span>
                    </div>
                    {!notif.read && (
                      <button 
                        onClick={() => markNotificationAsRead(notif.id)}
                        className="text-blue-600 hover:text-blue-800 p-1"
                        title="Marcar como lida"
                      >
                        <Check size={16} />
                      </button>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${stat.bg} ${stat.color}`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">{stat.title}</p>
              <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        
        {/* Occupancy Pie Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Taxa de Ocupação</h2>
          <div className="flex-1 min-h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={occupancyData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {occupancyData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Costs Bar Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col lg:col-span-2">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Custos Variáveis por Residente (Mês Atual)</h2>
          <div className="flex-1 min-h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={costsData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} tickFormatter={(value) => `R$${value}`} />
                <RechartsTooltip 
                  cursor={{fill: '#f8fafc'}}
                  formatter={(value: number) => [new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value), 'Custo']}
                />
                <Bar dataKey="custo" fill="#005ac2" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Maintenance Line Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col lg:col-span-3">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Atividades de Manutenção (Últimos 7 dias)</h2>
          <div className="flex-1 min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={maintenanceData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <RechartsTooltip />
                <Legend />
                <Line type="monotone" dataKey="preventivas" name="Preventivas" stroke="#005ac2" strokeWidth={3} dot={{r: 4}} activeDot={{r: 6}} />
                <Line type="monotone" dataKey="corretivas" name="Corretivas" stroke="#006874" strokeWidth={3} dot={{r: 4}} activeDot={{r: 6}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
}
