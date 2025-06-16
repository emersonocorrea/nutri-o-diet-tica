import { useState, useEffect } from 'react';
import api from '../utils/api';

function PatientForm({ patient, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    nome: '',
    prontuario: '',
    enfermaria: '',
    nivel_assistencia: 'Baixa',
    peso: '',
    altura: '',
    dieta: '',
    observacoes: '',
    refeicoes: {
      Desjejum: '',
      Almoço: '',
      Lanche: '',
      Jantar: '',
      Ceia: '',
    },
    refeicaoCheck: [],
  });
  const [imc, setImc] = useState(0);

  useEffect(() => {
    if (patient) {
      setFormData({
        nome: patient.nome || '',
        prontuario: patient.prontuario || '',
        enfermaria: patient.enfermaria || '',
        nivel_assistencia: patient.nivel_assistencia || 'Baixa',
        peso: patient.peso || '',
        altura: patient.altura || '',
        dieta: patient.dieta || '',
        observacoes: patient.observacoes || '',
        refeicoes: {
          Desjejum: patient.refeicoes?.Desjejum || '',
          Almoço: patient.refeicoes?.Almoço || '',
          Lanche: patient.refeicoes?.Lanche || '',
          Jantar: patient.refeicoes?.Jantar || '',
          Ceia: patient.refeicoes?.Ceia || '',
        },
        refeicaoCheck: Object.keys(patient.refeicoes || {}),
      });
      calculateIMC(patient.peso, patient.altura);
    }
  }, [patient]);

  const calculateIMC = (peso, altura) => {
    const p = parseFloat(peso);
    const a = parseFloat(altura);
    if (p > 0 && a > 0) {
      setImc((p / (a * a)).toFixed(2));
    } else {
      setImc(0);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData((prev) => ({
        ...prev,
        refeicaoCheck: checked
          ? [...prev.refeicaoCheck, value]
          : prev.refeicaoCheck.filter((ref) => ref !== value),
      }));
    } else if (name.startsWith('refeicao')) {
      const mealType = name.replace('refeicao', '');
      setFormData((prev) => ({
        ...prev,
        refeicoes: { ...prev.refeicoes, [mealType]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
      if (name === 'peso' || name === 'altura') {
        calculateIMC(
          name === 'peso' ? value : formData.peso,
          name === 'altura' ? value : formData.altura
        );
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.nome || !formData.prontuario || !formData.enfermaria || 
        !formData.nivel_assistencia || !formData.peso || !formData.altura || !formData.dieta) {
      alert('Preencha todos os campos obrigatórios.');
      return;
    }
    try {
      const patientData = {
        nome: formData.nome,
        prontuario: formData.prontuario,
        enfermaria: formData.enfermaria,
        nivel_assistencia: formData.nivel_assistencia,
        peso: parseFloat(formData.peso),
        altura: parseFloat(formData.altura),
        dieta: formData.dieta,
      };
      let patientId;
      if (patient?.id) {
        await api.put(`/patients/${patient.id}`, patientData);
        patientId = patient.id;
      } else {
        const response = await api.post('/patients', patientData);
        patientId = response.data.id;
      }
      // Atualizar refeições
      const existingMeals = (await api.get(`/meals?patient_id=${patientId}`)).data;
      for (const type of formData.refeicaoCheck) {
        const description = formData.refeicoes[type].trim();
        if (description) {
          const existingMeal = existingMeals.find((meal) => meal.type === type);
          if (existingMeal) {
            await api.put(`/meals/${existingMeal.id}`, { patient_id: patientId, type, description });
          } else {
            await api.post('/meals', { patient_id: patientId, type, description });
          }
        }
      }
      // Remover refeições desmarcadas
      for (const meal of existingMeals) {
        if (!formData.refeicaoCheck.includes(meal.type)) {
          await api.delete(`/meals/${meal.id}`);
        }
      }
      onSubmit();
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center z-50 overflow-y-auto py-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">
          {patient ? 'Editar Paciente' : 'Cadastrar Paciente'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Nome *</label>
            <input
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Prontuário *</label>
            <input
              type="text"
              name="prontuario"
              value={formData.prontuario}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Enfermaria/Leito *</label>
            <input
              type="text"
              name="enfermaria"
              value={formData.enfermaria}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Nível de Assistência *</label>
            <select
              name="nivel_assistencia"
              value={formData.nivel_assistencia}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            >
              <option value="Baixa">Baixa</option>
              <option value="Média">Média</option>
              <option value="Alta">Alta</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">Peso (kg) *</label>
              <input
                type="number"
                name="peso"
                value={formData.peso}
                onChange={handleChange}
                step="0.1"
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Altura (m) *</label>
              <input
                type="number"
                name="altura"
                value={formData.altura}
                onChange={handleChange}
                step="0.01"
                className="w-full p-2 border rounded"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium">IMC</label>
            <input
              type="text"
              value={imc}
              readOnly
              className="w-full p-2 border rounded bg-gray-100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Dieta *</label>
            <input
              type="text"
              name="dieta"
              value={formData.dieta}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Observações</label>
            <textarea
              name="observacoes"
              value={formData.observacoes}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Refeições</label>
            {['Desjejum', 'Almoço', 'Lanche', 'Jantar', 'Ceia'].map((ref) => (
              <div key={ref} className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="refeicaoCheck"
                    value={ref}
                    checked={formData.refeicaoCheck.includes(ref)}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  {ref}
                </label>
                {formData.refeicaoCheck.includes(ref) && (
                  <textarea
                    name={`refeicao${ref}`}
                    value={formData.refeicoes[ref]}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    placeholder={`Descrição para ${ref}`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PatientForm;