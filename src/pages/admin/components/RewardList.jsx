import React, { useState } from 'react'

export default function RewardList() {
  const [rewards, setRewards] = useState([
    {
      id: '1',
      name: 'Limpeza Grátis',
      description: 'Ganhe uma sessão de limpeza dental gratuita',
      points_required: 100,
      inventory: 10
    },
    {
      id: '2',
      name: 'Clareamento',
      description: '50% de desconto no clareamento dental',
      points_required: 200,
      inventory: 5
    }
  ])

  const [editingReward, setEditingReward] = useState(null)

  const handleDelete = (id) => {
    setRewards(rewards.filter(reward => reward.id !== id))
  }

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Gerenciar Recompensas
        </h3>
        <button
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          onClick={() => {/* Adicionar nova recompensa */}}
        >
          Nova Recompensa
        </button>
      </div>
      <div className="border-t border-gray-200">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 p-4">
          {rewards.map((reward) => (
            <div key={reward.id} className="border rounded-lg p-4">
              <h3 className="text-lg font-semibold">{reward.name}</h3>
              <p className="text-gray-600">{reward.description}</p>
              <div className="mt-2">
                <p className="text-sm">Pontos necessários: {reward.points_required}</p>
                <p className="text-sm">Disponível: {reward.inventory}</p>
              </div>
              <div className="mt-4 flex space-x-2">
                <button
                  onClick={() => setEditingReward(reward)}
                  className="bg-gray-100 text-gray-700 px-3 py-1 rounded hover:bg-gray-200"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(reward.id)}
                  className="bg-red-100 text-red-700 px-3 py-1 rounded hover:bg-red-200"
                >
                  Excluir
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
