import React, { useState, useEffect } from 'react'
import useAuthStore from '../../stores/authStore'

export default function PatientDashboard() {
  const user = useAuthStore((state) => state.user)
  const [rewards, setRewards] = useState([])
  const [level, setLevel] = useState({
    name: 'Sorriso Iniciante',
    points: 0,
    benefits: 'Nível básico para novos clientes'
  })

  useEffect(() => {
    // Determinar o nível do usuário baseado nos pontos
    if (user?.points >= 10000) {
      setLevel({
        name: 'Sorriso Diamante',
        points: 10000,
        benefits: 'Desconto de 20% em todos os procedimentos + Atendimento VIP'
      })
    } else if (user?.points >= 5000) {
      setLevel({
        name: 'Sorriso Deslumbrante',
        points: 5000,
        benefits: 'Desconto de 15% em procedimentos estéticos + Kit dental premium'
      })
    } else if (user?.points >= 1000) {
      setLevel({
        name: 'Sorriso Radiante',
        points: 1000,
        benefits: 'Desconto de 10% em procedimentos estéticos'
      })
    }

    // Mock de recompensas
    setRewards([
      {
        id: '1',
        name: 'Limpeza Grátis',
        description: 'Ganhe uma sessão de limpeza dental gratuita',
        points_required: 100
      },
      {
        id: '2',
        name: 'Clareamento',
        description: '50% de desconto no clareamento dental',
        points_required: 200
      },
      {
        id: '3',
        name: 'Consulta Ortodôntica',
        description: 'Avaliação ortodôntica gratuita',
        points_required: 150
      }
    ])
  }, [user?.points])

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Bem-vindo(a), {user?.name}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-indigo-100 p-4 rounded-lg">
            <h3 className="text-lg font-semibold">Seus Pontos</h3>
            <p className="text-3xl font-bold">{user?.points}</p>
          </div>
          <div className="bg-indigo-100 p-4 rounded-lg">
            <h3 className="text-lg font-semibold">Seu Nível</h3>
            <p className="text-xl font-bold">{level.name}</p>
            <p className="text-sm text-gray-600 mt-2">{level.benefits}</p>
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Recompensas Disponíveis</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {rewards.map((reward) => (
            <div key={reward.id} className="border rounded-lg p-4">
              <h3 className="text-lg font-semibold">{reward.name}</h3>
              <p className="text-gray-600">{reward.description}</p>
              <p className="text-sm font-semibold mt-2">
                {reward.points_required} pontos
              </p>
              <button 
                className={`mt-4 px-4 py-2 rounded-md w-full ${
                  user?.points >= reward.points_required
                    ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
                disabled={user?.points < reward.points_required}
              >
                {user?.points >= reward.points_required ? 'Resgatar' : 'Pontos Insuficientes'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
