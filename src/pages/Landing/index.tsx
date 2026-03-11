import React from 'react';
import { useNavigate } from 'react-router-dom';
import { styles } from './styles';

export function Landing() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      {/* Top Navigation */}
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <div className={styles.logoWrapper}>
            <div className={styles.logoIconBox}>
              <span className={styles.logoIcon}>local_hospital</span>
            </div>
            <h2 className={styles.logoText}>Vitalis Care</h2>
          </div>
          <button 
            onClick={() => navigate('/login')}
            className={styles.loginButton}
          >
            <span className="mr-2 material-symbols-outlined text-[20px]">login</span>
            Login
          </button>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.mainInner}>
          {/* Hero Section */}
          <div className={styles.heroGrid}>
            <div className={styles.heroTextCol}>
              <div className="flex flex-col gap-6">
                <div className="space-y-4">
                  <div className={styles.heroBadge}>
                    Portal do Colaborador
                  </div>
                  <h1 className={styles.heroTitle}>
                    Bem-vindo ao <span className="text-primary">Sistema Vitalis</span>
                  </h1>
                  <p className={styles.heroSubtitle}>
                    A plataforma centralizada para gestão de cuidados, equipe médica e administração da nossa clínica. Simplifique sua rotina diária.
                  </p>
                </div>
                <div className={styles.heroActions}>
                  <button 
                    onClick={() => navigate('/login')}
                    className={styles.primaryHeroButton}
                  >
                    Acessar Sistema
                  </button>
                  <button className={styles.secondaryHeroButton}>
                    Primeiro Acesso
                  </button>
                </div>
              </div>
            </div>
            <div className={styles.heroImageWrapper}>
              <div 
                className={styles.heroImage} 
                style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDYyu4iw-t_qK-d0vCrXGrBC_ar643CPXnhTR-8VP8NvNJaUATn7uQ9hmllQmk_lqrjivN95MalgSaWGeOwjXJvI5g9SnXJj6DaqFrD1F3ZMYPLHeLnab28K6MPWuWVE-x3YgbtnEPurR5JS6zdKwihi9Z-CAqpiawkFgqgyuKXMKaAF34Po0ydT_BzXyPyO6xL1WiPUcIN-pqU9zF3C4kyj5KDDeVvnVWPX2sUla2L5Rj65QH1T6bm_JVBsln1WyvePZuO2AhY-WQt')" }}
              >
                <div className={styles.heroImageOverlay}></div>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Áreas do Sistema</h2>
              <p className={styles.sectionSubtitle}>Acesso rápido aos módulos principais da clínica.</p>
            </div>
            <div className={styles.featuresGrid}>
              {/* Card 1 */}
              <div className={styles.featureCard}>
                <div className={styles.featureIconBox('bg-blue-100 text-primary dark:bg-primary/20')}>
                  <span className={styles.featureIcon}>medical_services</span>
                </div>
                <div>
                  <h3 className={styles.featureTitle}>Equipe de Saúde</h3>
                  <p className={styles.featureText}>Gestão de pacientes e consultas médicas.</p>
                </div>
              </div>
              {/* Card 2 */}
              <div className={styles.featureCard}>
                <div className={styles.featureIconBox('bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300')}>
                  <span className={styles.featureIcon}>medication</span>
                </div>
                <div>
                  <h3 className={styles.featureTitle}>Enfermagem</h3>
                  <p className={styles.featureText}>Registros, triagem e rotinas de cuidado.</p>
                </div>
              </div>
              {/* Card 3 */}
              <div className={styles.featureCard}>
                <div className={styles.featureIconBox('bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300')}>
                  <span className={styles.featureIcon}>groups</span>
                </div>
                <div>
                  <h3 className={styles.featureTitle}>Administração &amp; RH</h3>
                  <p className={styles.featureText}>Gestão de pessoal, escalas e políticas.</p>
                </div>
              </div>
              {/* Card 4 */}
              <div className={styles.featureCard}>
                <div className={styles.featureIconBox('bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300')}>
                  <span className={styles.featureIcon}>payments</span>
                </div>
                <div>
                  <h3 className={styles.featureTitle}>Financeiro</h3>
                  <p className={styles.featureText}>Controle de fluxo, compras e faturamento.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Stepper / Quick Guide */}
          <div className={styles.guideWrapper}>
            <div className={styles.guideFlex}>
              <div className={styles.guideTextCol}>
                <h2 className={styles.guideTitle}>Guia de Acesso</h2>
                <p className={styles.guideSubtitle}>Siga os passos para configurar sua conta.</p>
              </div>
              
              <div className={styles.stepperWrapper}>
                <div className={styles.stepperInner}>
                  <div className={styles.stepperLine}></div>
                  
                  {/* Step 1 */}
                  <div className={styles.stepItem}>
                    <div className={styles.stepIconActive}>
                      <span className={styles.stepIcon}>person_add</span>
                    </div>
                    <div className={styles.stepLabelWrapper}>
                      <p className={styles.stepLabel}>Solicitar Acesso</p>
                      <p className={styles.stepSub}>Passo 1</p>
                    </div>
                  </div>
                  
                  {/* Step 2 */}
                  <div className={styles.stepItem}>
                    <div className={styles.stepIconInactive}>
                      <span className={styles.stepIcon}>lock_reset</span>
                    </div>
                    <div className={styles.stepLabelWrapper}>
                      <p className={styles.stepLabelMuted}>Configurar Senha</p>
                      <p className={styles.stepSub}>Passo 2</p>
                    </div>
                  </div>
                  
                  {/* Step 3 */}
                  <div className={styles.stepItem}>
                    <div className={styles.stepIconInactive}>
                      <span className={styles.stepIcon}>dashboard</span>
                    </div>
                    <div className={styles.stepLabelWrapper}>
                      <p className={styles.stepLabelMuted}>Acessar Painel</p>
                      <p className={styles.stepSub}>Passo 3</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div className={styles.footerLogo}>
            <span className="material-symbols-outlined text-[24px]">local_hospital</span>
            <span className="text-lg font-bold">Vitalis Care</span>
          </div>
          <div className={styles.footerLinks}>
            <a className={styles.footerLink} href="#">Suporte de TI</a>
            <a className={styles.footerLink} href="#">Políticas Internas</a>
            <a className={styles.footerLink} href="#">Diretrizes de Privacidade</a>
            <button onClick={() => navigate('/docs')} className={styles.footerLink}>Manual do Sistema</button>
          </div>
          <p className={styles.footerCopyright}>
            © 2024 Vitalis Senior Clinic. Uso interno exclusivo. Acesso restrito a colaboradores autorizados.
          </p>
        </div>
      </footer>
    </div>
  );
}
