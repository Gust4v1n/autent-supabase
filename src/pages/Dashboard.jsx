import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import '../styles/Dashboard.css'

export const Dashboard = () => {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await signOut()
      navigate('/login')
    } catch (error) {
      console.error('Erro ao fazer logout:', error)
    }
  }

  return (
    <div className="dashboard-container">
      <nav className="dashboard-nav">
        <h2>Meu App</h2>
        <button onClick={handleLogout} className="logout-button">
          Sair
        </button>
      </nav>

      <div className="dashboard-content">
        <div className="user-card">
          <div className="user-avatar">
            {user?.user_metadata?.avatar_url ? (
              <img 
                src={user.user_metadata.avatar_url} 
                alt="Avatar" 
              />
            ) : (
              <div className="avatar-placeholder">
                {user?.user_metadata?.full_name?.[0]?.toUpperCase() || 
                 user?.email?.[0]?.toUpperCase() || 'U'}
              </div>
            )}
          </div>

          <div className="user-info">
            <h1>Bem-vindo!</h1>
            {user?.user_metadata?.full_name && (
              <p className="user-name">{user.user_metadata.full_name}</p>
            )}
            <p className="user-email">{user?.email}</p>
            <div className="user-metadata">
              <p><strong>ID:</strong> {user?.id}</p>
              <p><strong>Provedor:</strong> {user?.app_metadata?.provider || 'email'}</p>
              <p><strong>Cadastrado em:</strong> {new Date(user?.created_at).toLocaleDateString('pt-BR')}</p>
            </div>
          </div>
        </div>

        <div className="crud-section">
          <h2>Área Protegida - CRUD</h2>
          <p>Esta área só é acessível para usuários autenticados.</p>
          <div className="crud-placeholder">
            <p>🔒 Aqui você pode implementar seu CRUD de tarefas, notas, produtos, etc.</p>
            <p>O usuário está autenticado e pode acessar recursos protegidos!</p>
          </div>
        </div>
      </div>
    </div>
  )
}
