import { useState } from 'react';
import { generatePDFLabels } from '../utils/generatePDF';

function PatientList({ patients, onEdit, onDelete, onView }) {
  const [filter, setFilter] = useState('');
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [showMealModal, setShowMealModal] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);
  const [selectedIds, setSelectedIds] = useState(new Set());

  const filteredPatients = patients.filter(
    (p) =>
      p.nome.toLowerCase().includes(filter.toLowerCase()) ||
      p.prontuario.toLowerCase().includes(filter.toLowerCase()) ||
      p.enfermaria.toLowerCase().includes(filter.toLowerCase())
  );

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(new Set(filteredPatients.map((p) => p.id)));
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

  const handlePrintMeal = () => {
    setShowMealModal(true);
  };

  const handleMealSubmit = (e) => {
    e.preventDefault();
    const meal = e.target.selectedMeal.value;
    setSelectedMeal(meal);
    setShowMealModal(false);
    setShowResultModal(true);
  };

  const handlePrintLabels = () => {
    if (selectedMeal) {
      const selectedPatients = filteredPatients.filter((p) => selectedIds.has(p.id));
      generatePDFLabels(selectedPatients, selectedMeal);
    }
  };

  const handlePrintResult = () => {
    const printContent = document.getElementById('mealResultDetails').innerHTML;
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Lista de Pacientes - Refeição</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
          </style>
        </head>
        <body>
          <h2>Lista de Pacientes com Refeição Selecionada ${selectedMeal}</h2>
          ${printContent}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Filtrar por nome, prontuário ou enfermaria"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-1/2 p-2 border rounded"
        />
        <button
          onClick={() => onEdit(null)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Novo Paciente
        </button>
      </div>
      <table className="min-w-full bg-white border">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-6 py-3 text-left">
              <input
                type="checkbox"
                checked={selectedIds.size === filteredPatients.length && filteredPatients.length > 0}
                onChange={handleSelectAll}
              />
            </th>
            <th className="px-6 py-3 text-left">Nome</th>
            <th className="px-6 py-3 text-left">Prontuário</th>
            <th className="px-6 py-3 text-left">Enfermaria</th>
            <th className="px-6 py-3 text-left">Nível de Assistência</th>
            <th className="px-6 py-3 text-left">Dieta</th>
            <th className="px-6 py-3 text-left">IMC</th>
            <th className="px-6 py-3 text-left">Ações</th>
          </tr>
        </thead>
        <tbody>
          {filteredPatients.map((patient) => (
            <tr key={patient.id} className="border-t">
              <td className="px-6 py-4">
                <input
                  type="checkbox"
                  checked={selectedIds.has(patient.id)}
                  onChange={() => handleSelect(patient.id)}
                />
              </td>
              <td className="px-6 py-4">{patient.nome}</td>
              <td className="px-6 py-4">{patient.prontuario}</td>
              <td className="px-6 py-4">{patient.enfermaria}</td>
              <td className="px-6 py-4">{patient.nivel_assistencia}</td>
              <td className="px-6 py-4">{patient.dieta}</td>
              <td className="px-6 py-4">{patient.imc}</td>
              <td className="px-6 py-4 flex space-x-2">
                <button
                  onClick={() => onView(patient)}
                  className="text-blue-500 hover:underline"
                >
                  Ver
                </button>
                <button
                  onClick={() => onEdit(patient)}
                  className="text-green-500 hover:underline"
                >
                  Editar
                </button>
                <button
                  onClick={() => onDelete(patient.id)}
                  className="text-red-500 hover:underline"
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 flex space-x-2">
        <button
          onClick={handlePrintMeal}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Imprimir Refeição
        </button>
        <button
          onClick={() => {
            if (selectedIds.size === 0) alert('Selecione pelo menos um paciente.');
            else onView(filteredPatients.find((p) => selectedIds.has(p.id)));
          }}
          disabled={selectedIds.size !== 1}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Ver Detalhes
        </button>
        <button
          onClick={() => {
            if (selectedIds.size === 0) alert('Selecione pelo menos um paciente.');
            else onEdit(filteredPatients.find((p) => selectedIds.has(p.id)));
          }}
          disabled={selectedIds.size !== 1}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Editar Selecionado
        </button>
        <button
          onClick={() => {
            if (selectedIds.size === 0) alert('Selecione pelo menos um paciente.');
            else if (confirm('Excluir pacientes selecionados?')) {
              selectedIds.forEach(onDelete);
            }
          }}
          disabled={selectedIds.size === 0}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Excluir Selecionados
        </button>
      </div>

      {/* Modal de Seleção de Refeição */}
      {showMealModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Selecionar Refeição</h2>
            <form onSubmit={handleMealSubmit}>
              <select name="selectedMeal" className="w-full p-2 border rounded mb-4" required>
                <option value="">Selecione</option>
                {['Desjejum', 'Almoço', 'Lanche', 'Jantar', 'Ceia'].map((ref) => (
                  <option key={ref} value={ref}>{ref}</option>
                ))}
              </select>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowMealModal(false)}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Confirmar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de Resultado de Refeição */}
      {showResultModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl">
            <h2 className="text-xl font-bold mb-4">
              Lista de Pacientes com Refeição Selecionada {selectedMeal}
            </h2>
            <div id="mealResultDetails">
              <table className="min-w-full border">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-6 py-3 text-left">Nome</th>
                    <th className="px-6 py-3 text-left">Prontuário</th>
                    <th className="px-6 py-3 text-left">Enfermaria</th>
                    <th className="px-6 py-3 text-left">{selectedMeal}</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPatients
                    .filter((p) => selectedIds.has(p.id))
                    .map((patient) => (
                      <tr key={patient.id} className="border-t">
                        <td className="px-6 py-4">{patient.nome}</td>
                        <td className="px-6 py-4">{patient.prontuario}</td>
                        <td className="px-6 py-4">{patient.enfermaria}</td>
                        <td className="px-6 py-4">
                          {patient.refeicoes?.[selectedMeal] || 'Não registrada'}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={handlePrintResult}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
              >
                Imprimir Lista
              </button>
              <button
                onClick={handlePrintLabels}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
              >
                Imprimir Etiquetas
              </button>
              <button
                onClick={() => setShowResultModal(false)}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PatientList;