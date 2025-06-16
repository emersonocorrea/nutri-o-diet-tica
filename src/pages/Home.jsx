import { useState, useEffect } from 'react';
import api from '../utils/api';
import PatientList from '../components/PatientList';
import PatientForm from '../components/PatientForm';

function Home() {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);

  const loadPatients = async () => {
    try {
      const response = await api.get('/patients');
      const patientsData = response.data;
      for (let patient of patientsData) {
        const mealsResponse = await api.get(`/meals?patient_id=${patient.id}`);
        patient.refeicoes = mealsResponse.data.reduce((acc, meal) => {
          acc[meal.type] = meal.description;
          return acc;
        }, {});
        patient.imc = (patient.peso / (patient.altura * patient.altura)).toFixed(2);
        patient.observacoes = '';
      }
      setPatients(patientsData);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    loadPatients();
  }, []);

  const handleEdit = (patient) => {
    setSelectedPatient(patient);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/patients/${id}`);
      await loadPatients();
    } catch (error) {
      alert(error);
    }
  };

  const handleView = (patient) => {
    setSelectedPatient(patient);
    setShowViewModal(true);
  };

  const handleFormSubmit = async () => {
    setShowForm(false);
    setSelectedPatient(null);
    await loadPatients();
  };

  return (
    <div>
      <PatientList
        patients={patients}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onView={handleView}
      />
      {showForm && (
        <PatientForm
          patient={selectedPatient}
          onSubmit={handleFormSubmit}
          onCancel={() => {
            setShowForm(false);
            setSelectedPatient(null);
          }}
        />
      )}
      {showViewModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Detalhes do Paciente</h2>
            <div className="space-y-2">
              <p><strong>Nome:</strong> {selectedPatient.nome}</p>
              <p><strong>Prontuário:</strong> {selectedPatient.prontuario}</p>
              <p><strong>Enfermaria:</strong> {selectedPatient.enfermaria}</p>
              <p><strong>Nível de Assistência:</strong> {selectedPatient.nivel_assistencia}</p>
              <p><strong>Peso:</strong> {selectedPatient.peso} kg</p>
              <p><strong>Altura:</strong> {selectedPatient.altura} m</p>
              <p><strong>IMC:</strong> {selectedPatient.imc}</p>
              <p><strong>Dieta:</strong> {selectedPatient.dieta}</p>
              <p><strong>Refeições:</strong></p>
              <ul className="list-disc pl-5">
                {Object.entries(selectedPatient.refeicoes || {}).map(([ref, desc]) => (
                  <li key={ref}>{ref}: {desc}</li>
                )) || <li>Nenhuma refeição registrada</li>}
              </ul>
              <p><strong>Observações:</strong> {selectedPatient.observacoes || 'Nenhuma'}</p>
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setShowViewModal(false)}
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

export default Home;