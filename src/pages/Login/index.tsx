import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../../store';
import { Mail, Lock, AlertCircle, Info } from 'lucide-react';
import { styles } from './styles';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const login = useAppStore((state) => state.login);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      if (email && password) {
        await login(email, password);
        navigate('/dashboard');
      }
    } catch (err: any) {
      setError('Falha na autenticação. Verifique seu email e senha.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      {/* Left Column: Login Form */}
      <div className={styles.leftCol}>
        <div className={styles.formWrapper}>
          <div className={styles.header}>
            <div className={styles.logoWrapper}>
              <span className={styles.logoIcon}>local_hospital</span>
            </div>
            <h1 className={styles.title}>ClinicCare</h1>
            <p className={styles.subtitle}>Acesso Restrito ao Sistema</p>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            {error && (
              <div className={styles.errorWrapper}>
                <AlertCircle className="shrink-0" size={20} />
                <span>{error}</span>
              </div>
            )}

            {/* Email Field - MD3 Filled style */}
            <div className={styles.inputGroup}>
              <div className={styles.inputIconWrapper}>
                <Mail className={styles.inputIcon} />
              </div>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.input}
                placeholder=" "
                required
              />
              <label 
                htmlFor="email" 
                className={styles.label}
              >
                E-mail Profissional
              </label>
            </div>

            {/* Password Field - MD3 Filled style */}
            <div className={styles.inputGroup}>
              <div className={styles.inputIconWrapper}>
                <Lock className={styles.inputIcon} />
              </div>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.input}
                placeholder=" "
                required
              />
              <label 
                htmlFor="password" 
                className={styles.label}
              >
                Senha Segura
              </label>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className={styles.submitButton}
              >
                {isLoading ? (
                  <div className={styles.spinner} />
                ) : (
                  'Acessar Prontuário'
                )}
              </button>
            </div>
            
            <div className={styles.forgotPasswordWrapper}>
               <a href="#" className={styles.forgotPasswordLink}>
                 Esqueceu sua senha?
               </a>
            </div>
          </form>
        </div>
      </div>

      {/* Right Column: Quadro de Avisos / Onboarding (Desktop Only) */}
      <div className={styles.rightCol}>
        {/* Decorative background shapes */}
        <div className={styles.decorCircle1} />
        <div className={styles.decorCircle2} />
        
        <div className={styles.onboardingWrapper}>
          <div className={styles.onboardingCard}>
            <div className={styles.onboardingHeader}>
              <div className={styles.onboardingIconWrapper}>
                 <Info size={24} />
              </div>
              <h2 className={styles.onboardingTitle}>Quadro de Avisos</h2>
            </div>
            
            <div className={styles.onboardingContent}>
              <div className={`${styles.newsItem} border-secondary`}>
                <h3 className={styles.newsTitle}>Atualização do Sistema (v2.4.0)</h3>
                <p className={styles.newsText}>O módulo de faturamento foi atualizado. Para dúvidas, contate o ramal 4455.</p>
              </div>
              
              <div className={`${styles.newsItem} border-primary`}>
                <h3 className={styles.newsTitle}>Campanha de Vacinação H1N1</h3>
                <p className={styles.newsText}>Colaboradores devem comparecer à sala 102 até o dia 15/03.</p>
              </div>
              
              <div className={styles.helpWrapper}>
                <p className={styles.helpLabel}>
                  Precisa de ajuda com o acesso?
                </p>
                <p className={styles.helpText}>
                  Abra um chamado no portal de TI ou ligue para o Suporte 24h (Ramal 1000).
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
