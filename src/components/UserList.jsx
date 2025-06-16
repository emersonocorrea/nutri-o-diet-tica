import { useState } from 'react';

function UserList({ users, onEdit, onDelete }) {
  const [selectedIds, setSelectedIds] = useState(new Set());

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(new Set(users.map((u) => u.id)));
    } else {
      setSelectedIds(new Set());
    }
  };

  const handleSelect = (id) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedIds(newSelected);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-end mb-4">
        <button
          onClick={() => onEdit(null)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Novo Usuário
        </button>
      </div>
      <table className="min-w-full bg-white border">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-6 py-3 text-left">
              <input
                type="checkbox"
                checked={selectedIds.size === users.length && users.length > 0}
                onChange={handleSelectAll}
              />
            </th>
            <th className="px-6 py-3 text-left">Nome</th>
            <th className="px-6 py-3 text-left">E-mail</th>
            <th className="px-6 py-3 text-left">Função</th>
            <th className="px-6 py-3 text-left">Status</th>
            <th className="px-6 py-3 text-left">Ações</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-t">
              <td className="px-6 py-4">
                <input
                  type="checkbox"
                  checked={selectedIds.has(user.id)}
                  onChange={() => handleSelect(user.id)}
                />
              </td>
              <td className="px-6 py-4">{user.name}</td>
              <td className="px-6 py-4">{user.email}</td>
              <td className="px-6 py-4">{user.role === 'admin' ? 'Administrador' : 'Usuário'}</td>
              <td className="px-6 py-4">{user.status === 'active' ? 'Ativo' : 'Inativo'}</td>
              <td className="px-6 py-4 flex space-x-2">
                <button
                  onClick={() => onEdit(user)}
                  className="text-green-500 hover:underline"
                >
                  Editar
                </button>
                <button
                  onClick={() => onDelete(user.id)}
                  className="text-red-500 hover:underline"
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4">
        <button
          onClick={() => {
            if (selectedIds.size === 0) alert('Selecione pelo menos um usuário.');
            else if (confirm('Excluir usuários selecionados?')) {
              selectedIds.forEach(onDelete);
            }
          }}
          disabled={selectedIds.size === 0}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Excluir Selecionados
        </button>
      </div>
    </div>
  );
}

export default UserList;