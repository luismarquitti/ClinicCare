import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Users, Pill, DollarSign, Wrench, Activity, ChevronRight, ArrowLeft } from 'lucide-react';

type DocSection = 'intro' | 'residents' | 'eprescription' | 'financial' | 'maintenance' | 'nursing';

export function Documentation() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<DocSection>('intro');

  const sections = [
    { id: 'intro', title: 'Introdução', icon: <BookOpen size={18} /> },
    { id: 'residents', title: 'Gestão de Residentes', icon: <Users size={18} /> },
    { id: 'eprescription', title: 'E-Prescription', icon: <Pill size={18} /> },
    { id: 'nursing', title: 'Painel de Enfermagem', icon: <Activity size={18} /> },
    { id: 'financial', title: 'Módulo Financeiro', icon: <DollarSign size={18} /> },
    { id: 'maintenance', title: 'Manutenção', icon: <Wrench size={18} /> },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="flex items-center gap-2 text-primary">
            <BookOpen size={24} />
            <h1 className="text-xl font-bold text-slate-900">Central de Ajuda & Documentação</h1>
          </div>
        </div>
        <button 
          onClick={() => navigate('/')}
          className="text-sm font-medium text-slate-600 hover:text-primary transition-colors"
        >
          Voltar ao Início
        </button>
      </header>

      <div className="flex flex-1 max-w-[1440px] w-full mx-auto">
        {/* Sidebar Navigation */}
        <aside className="w-72 bg-white border-r border-slate-200 hidden md:block overflow-y-auto h-[calc(100vh-73px)] sticky top-[73px]">
          <div className="p-6">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Tópicos</h2>
            <nav className="space-y-1">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id as DocSection)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    activeSection === section.id 
                      ? 'bg-primary/10 text-primary' 
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={activeSection === section.id ? 'text-primary' : 'text-slate-400'}>
                      {section.icon}
                    </span>
                    {section.title}
                  </div>
                  {activeSection === section.id && <ChevronRight size={16} />}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 md:p-12 overflow-y-auto">
          <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-200 p-8 md:p-12">
            {activeSection === 'intro' && (
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-slate-900">Bem-vindo ao ILPI Manager</h2>
                <p className="text-lg text-slate-600 leading-relaxed">
                  O ILPI Manager é a plataforma definitiva para gestão de Instituições de Longa Permanência para Idosos. 
                  Nossa missão é unificar o cuidado clínico e a gestão administrativa em uma interface única, segura e intuitiva.
                </p>
                
                <div className="mt-8 space-y-4">
                  <h3 className="text-xl font-bold text-slate-800">Visão Geral dos Módulos</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    <div className="p-4 border border-slate-200 rounded-xl bg-slate-50">
                      <h4 className="font-bold text-primary flex items-center gap-2 mb-2">
                        <Users size={18} /> Gestão de Residentes
                      </h4>
                      <p className="text-sm text-slate-600">Cadastro completo, prontuário eletrônico e acompanhamento de sinais vitais.</p>
                    </div>
                    <div className="p-4 border border-slate-200 rounded-xl bg-slate-50">
                      <h4 className="font-bold text-primary flex items-center gap-2 mb-2">
                        <Pill size={18} /> E-Prescription
                      </h4>
                      <p className="text-sm text-slate-600">Prescrição eletrônica de medicamentos com alertas de interação e alergias.</p>
                    </div>
                    <div className="p-4 border border-slate-200 rounded-xl bg-slate-50">
                      <h4 className="font-bold text-primary flex items-center gap-2 mb-2">
                        <Activity size={18} /> Enfermagem
                      </h4>
                      <p className="text-sm text-slate-600">Aprazamento de medicamentos e registro de evoluções diárias.</p>
                    </div>
                    <div className="p-4 border border-slate-200 rounded-xl bg-slate-50">
                      <h4 className="font-bold text-primary flex items-center gap-2 mb-2">
                        <DollarSign size={18} /> Financeiro
                      </h4>
                      <p className="text-sm text-slate-600">Faturamento automático, controle de custos variáveis e mensalidades.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'residents' && (
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-slate-900">Gestão de Residentes</h2>
                <p className="text-lg text-slate-600">
                  O módulo de residentes é o coração do sistema, onde todas as informações clínicas e pessoais são centralizadas.
                </p>
                
                <div className="space-y-8 mt-8">
                  <section>
                    <h3 className="text-xl font-bold text-slate-800 mb-3">Admissão de Residentes</h3>
                    <p className="text-slate-600 mb-4">
                      Para adicionar um novo residente, clique no botão <strong>"Adicionar Residente"</strong> no painel principal. O processo de admissão é dividido em etapas:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-slate-600">
                      <li><strong>Informações Pessoais:</strong> Dados básicos, CPF, data de nascimento.</li>
                      <li><strong>Perfil Clínico:</strong> Registro de alergias, comorbidades, tipo sanguíneo e sinais vitais base.</li>
                      <li><strong>Contatos:</strong> Informações de familiares e contatos de emergência.</li>
                    </ul>
                  </section>

                  <section>
                    <h3 className="text-xl font-bold text-slate-800 mb-3">Prontuário Eletrônico</h3>
                    <p className="text-slate-600 mb-4">
                      Ao clicar em um residente na lista, você acessa seu prontuário detalhado. Ele é dividido em três abas principais:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-slate-600">
                      <li><strong>Saúde:</strong> Exibe os últimos sinais vitais e a linha do tempo de evoluções de enfermagem.</li>
                      <li><strong>Dados:</strong> Informações cadastrais completas.</li>
                      <li><strong>Financeiro:</strong> Resumo de faturamento atrelado ao residente.</li>
                    </ul>
                  </section>
                </div>
              </div>
            )}

            {activeSection === 'eprescription' && (
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-slate-900">E-Prescription (Prescrição Eletrônica)</h2>
                <p className="text-lg text-slate-600">
                  Um sistema moderno e seguro para prescrição de medicamentos, projetado para reduzir erros e facilitar o trabalho médico.
                </p>
                
                <div className="space-y-8 mt-8">
                  <section>
                    <h3 className="text-xl font-bold text-slate-800 mb-3">Como Prescrever</h3>
                    <ol className="list-decimal pl-6 space-y-3 text-slate-600">
                      <li>Acesse o prontuário do residente e clique em <strong>"Nova Prescrição"</strong>.</li>
                      <li>Busque o medicamento desejado no banco de dados.</li>
                      <li>Defina a <strong>Dosagem</strong> (ex: 50mg) e a <strong>Via de Administração</strong> (ex: Oral).</li>
                      <li>Estabeleça a <strong>Frequência</strong> (ex: 12/12h) e instruções específicas.</li>
                      <li>Defina a quantidade a ser dispensada e o número de repetições (refills).</li>
                    </ol>
                  </section>

                  <section className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-xl">
                    <h3 className="text-lg font-bold text-red-800 mb-2">Alertas de Segurança</h3>
                    <p className="text-red-700 text-sm">
                      O sistema verifica automaticamente alergias cadastradas no perfil do paciente. Se houver incompatibilidade (ex: prescrição de Penicilina para paciente alérgico), um alerta crítico será exibido na tela, bloqueando ou exigindo confirmação dupla.
                    </p>
                  </section>
                </div>
              </div>
            )}

            {activeSection === 'nursing' && (
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-slate-900">Painel de Enfermagem</h2>
                <p className="text-lg text-slate-600">
                  Ferramenta focada na rotina da equipe de enfermagem, garantindo que nenhuma medicação ou cuidado seja esquecido.
                </p>
                
                <div className="space-y-8 mt-8">
                  <section>
                    <h3 className="text-xl font-bold text-slate-800 mb-3">Aprazamento de Medicamentos</h3>
                    <p className="text-slate-600 mb-4">
                      O painel exibe uma lista de todas as medicações que precisam ser administradas no dia, organizadas por horário e status:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-slate-600">
                      <li><span className="font-semibold text-amber-600">Pendente:</span> Aguardando administração.</li>
                      <li><span className="font-semibold text-green-600">Administrado:</span> Confirmado pela equipe.</li>
                      <li><span className="font-semibold text-red-600">Não Administrado:</span> Quando ocorre recusa ou impossibilidade (exige justificativa).</li>
                    </ul>
                  </section>

                  <section>
                    <h3 className="text-xl font-bold text-slate-800 mb-3">Registro de Sinais Vitais</h3>
                    <p className="text-slate-600">
                      A equipe pode registrar rapidamente Pressão Arterial, Frequência Cardíaca, Temperatura e Saturação de Oxigênio diretamente pelo painel ou no prontuário do residente.
                    </p>
                  </section>
                </div>
              </div>
            )}

            {activeSection === 'financial' && (
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-slate-900">Módulo Financeiro</h2>
                <p className="text-lg text-slate-600">
                  Gestão completa de faturamento, mensalidades e custos extras gerados durante o cuidado.
                </p>
                
                <div className="space-y-8 mt-8">
                  <section>
                    <h3 className="text-xl font-bold text-slate-800 mb-3">Faturamento de Residentes</h3>
                    <p className="text-slate-600 mb-4">
                      O sistema consolida automaticamente:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-slate-600">
                      <li><strong>Mensalidade Base:</strong> Valor fixo do plano/quarto do residente.</li>
                      <li><strong>Custos Variáveis:</strong> Medicamentos extras, fraldas, materiais de curativo ou serviços adicionais utilizados no mês.</li>
                    </ul>
                    <p className="text-slate-600 mt-4">
                      No final do ciclo, basta clicar em <strong>"Gerar Fatura"</strong> para consolidar os valores e emitir a cobrança para o responsável financeiro.
                    </p>
                  </section>
                </div>
              </div>
            )}

            {activeSection === 'maintenance' && (
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-slate-900">Manutenção e Infraestrutura</h2>
                <p className="text-lg text-slate-600">
                  Controle de chamados e manutenções preventivas/corretivas da clínica.
                </p>
                
                <div className="space-y-8 mt-8">
                  <section>
                    <h3 className="text-xl font-bold text-slate-800 mb-3">Registro de Manutenções</h3>
                    <p className="text-slate-600 mb-4">
                      A gestão de infraestrutura não é baseada em tickets abertos por qualquer usuário, mas sim controlada ativamente pela administração.
                    </p>
                    <p className="text-slate-600">
                      Para registrar uma manutenção, acesse o módulo e clique em <strong>"Nova Manutenção"</strong>. Preencha a descrição, o local (ex: Quarto 102), o tipo (Preventiva ou Corretiva) e o custo associado.
                    </p>
                  </section>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
