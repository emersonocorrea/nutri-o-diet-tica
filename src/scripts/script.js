// Inicializa lista de pacientes com dados mock
let patients = [...mockPatients];
// Armazena a refeição selecionada globalmente
let currentSelectedMeal = null;

// Função para calcular IMC
function calculateIMC(peso, altura) {
    if (peso > 0 && altura > 0) {
        return (peso / (altura * altura)).toFixed(2);
    }
    return 0;
}

// Função para renderizar a lista de pacientes
function renderPatientList(filteredPatients) {
    const patientList = document.getElementById('patientList');
    patientList.innerHTML = '';
    filteredPatients.forEach((patient, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="px-6 py-4 whitespace-nowrap">
                <input type="checkbox" class="patientCheckbox" data-index="${index}">
            </td>
            <td class="px-6 py-4 whitespace-nowrap">${patient.nome}</td>
            <td class="px-6 py-4 whitespace-nowrap">${patient.prontuario}</td>
            <td class="px-6 py-4 whitespace-nowrap">${patient.enfermaria}</td>
            <td class="px-6 py-4 whitespace-nowrap">${patient.nivelAssistencia}</td>
            <td class="px-6 py-4 whitespace-nowrap">${patient.dieta}</td>
            <td class="px-6 py-4 whitespace-nowrap">${patient.imc}</td>
        `;
        patientList.appendChild(row);
    });
    updateButtonStates();
}

// Função para obter pacientes filtrados
function getFilteredPatients() {
    const filterInput = document.getElementById('filterInput');
    if (!filterInput) return patients;
    const filterValue = filterInput.value.toLowerCase();
    if (!filterValue) return patients;
    return patients.filter(patient =>
        patient.nome.toLowerCase().includes(filterValue) ||
        patient.prontuario.toLowerCase().includes(filterValue) ||
        patient.enfermaria.toLowerCase().includes(filterValue)
    );
}

// Função para filtrar pacientes e atualizar a tabela
function filterPatients() {
    const filteredPatients = getFilteredPatients();
    renderPatientList(filteredPatients);
}

// Função para atualizar o estado dos botões de ação
function updateButtonStates() {
    const checkboxes = document.querySelectorAll('.patientCheckbox:checked');
    const printMealBtn = document.getElementById('printMealBtn');
    const viewBtn = document.getElementById('viewDetailsBtn');
    const editBtn = document.getElementById('editSelectedBtn');
    const deleteBtn = document.getElementById('deleteSelectedBtn');
    if (printMealBtn && viewBtn && editBtn && deleteBtn) {
        printMealBtn.disabled = false; // Sempre habilitado
        viewBtn.disabled = checkboxes.length !== 1;
        editBtn.disabled = checkboxes.length !== 1;
        deleteBtn.disabled = checkboxes.length === 0;
    }
}

// Função para gerar PDF com etiquetas no formato horizontal
function generatePDFLabels(patients, selectedMeal) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({
        orientation: 'landscape', // Horizontal
        unit: 'mm',
        format: [90, 35] // Tamanho da etiqueta: 90mm largura x 35mm altura
    });

    // Criar um canvas temporário para o código de barras
    const canvas = document.createElement('canvas');
    document.body.appendChild(canvas);
    canvas.style.display = 'none';

    patients.forEach((patient, index) => {
        if (index > 0) {
            doc.addPage([90, 35]); // Adicionar nova página para cada etiqueta
        }

        // Truncar textos para caber na etiqueta
        const nome = patient.nome.substring(0, 30); // Relaxado de 15 para 30
        const prontuario = patient.prontuario.substring(0, 20); // Relaxado de 10 para 20
        const enfermaria = patient.enfermaria.substring(0, 20); // Relaxado de 10 para 20
        const mealDesc = patient.refeicoes && patient.refeicoes[selectedMeal] ? patient.refeicoes[selectedMeal] : 'Não registrada';
        const mealLabel = `${selectedMeal}: ${mealDesc}`.substring(0, 30); // Relaxado de 15 para 30

        // Adicionar textos na coluna esquerda (~60mm)
        doc.setFont('Helvetica');
        doc.setFontSize(15); // Mantido em 15pt
        doc.text(2, 6, nome); // Ajustado para y=6
        doc.text(2, 12, `Pront: ${prontuario}`); // Ajustado para y=12
        doc.text(2, 18, enfermaria); // Ajustado para y=18
        doc.text(2, 24, mealLabel); // Ajustado para y=24

        // Gerar código de barras na coluna direita (~30mm)
        canvas.width = 100; // Aumentado para suportar código de barras maior
        canvas.height = 60;
        JsBarcode(canvas, prontuario, {
            format: 'CODE128',
            displayValue: false,
            height: 60,
            width: 1.5 // Ajustado para maior clareza
        });
        const barcodeData = canvas.toDataURL('image/png');

        // Adicionar código de barras ao PDF
        doc.addImage(barcodeData, 'PNG', 64, 10, 25, 15); // 25mm x 15mm, à direita

        // Limpar canvas para a próxima iteração
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    });

    // Remover canvas temporário
    document.body.removeChild(canvas);

    // Baixar o PDF
    doc.save(`etiquetas_${selectedMeal}.pdf`);
}

// Manipula o modal de cadastro/edição
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modalTitle');
const openModalBtn = document.getElementById('openModalBtn');
const closeModalBtn = document.getElementById('closeModalBtn');
const cancelModalBtn = document.getElementById('cancelModalBtn');
const patientForm = document.getElementById('patientForm');
const pesoInput = patientForm?.querySelector('input[name="peso"]');
const alturaInput = patientForm?.querySelector('input[name="altura"]');
const imcInput = patientForm?.querySelector('input[name="imc"]');
const editIndexInput = patientForm?.querySelector('input[name="editIndex"]');

// Manipula o modal de visualização de detalhes
const viewModal = document.getElementById('viewModal');
const closeViewModalBtn = document.getElementById('closeViewModalBtn');
const closeViewModalFooterBtn = document.getElementById('closeViewModalFooterBtn');
const patientDetails = document.getElementById('patientDetails');

// Manipula o modal de seleção de refeição
const selectMealModal = document.getElementById('selectMealModal');
const closeSelectMealModalBtn = document.getElementById('closeSelectMealModalBtn');
const cancelSelectMealBtn = document.getElementById('cancelSelectMealBtn');
const selectMealForm = document.getElementById('selectMealForm');

// Manipula o modal de resultado da refeição
const mealResultModal = document.getElementById('mealResultModal');
const closeMealResultModalBtn = document.getElementById('closeMealResultModalBtn');
const closeMealResultModalFooterBtn = document.getElementById('closeMealResultModalFooterBtn');
const mealResultDetails = document.getElementById('mealResultDetails');
const mealResultTitle = document.getElementById('mealResultTitle');
const printResultBtn = document.getElementById('printResultBtn');
const printLabelsBtn = document.getElementById('printLabelsBtn');

// Função para atualizar visibilidade dos campos de descrição de refeições
function toggleRefeicaoDesc() {
    const checkboxes = patientForm?.querySelectorAll('.refeicaoCheck') || [];
    checkboxes.forEach(cb => {
        const descField = patientForm.querySelector(`textarea[name="refeicao${cb.value}"]`);
        if (descField) {
            descField.classList.toggle('hidden', !cb.checked);
        }
    });
}

// Atualiza o IMC em tempo real
function updateIMC() {
    if (!pesoInput || !alturaInput || !imcInput) return;
    const peso = parseFloat(pesoInput.value);
    const altura = parseFloat(alturaInput.value);
    imcInput.value = calculateIMC(peso, altura);
}

if (pesoInput && alturaInput) {
    pesoInput.addEventListener('input', updateIMC);
    alturaInput.addEventListener('input', updateIMC);
}

// Manipula checkboxes de refeições
const refeicaoCheckboxes = patientForm?.querySelectorAll('.refeicaoCheck') || [];
refeicaoCheckboxes.forEach(cb => {
    cb.addEventListener('change', toggleRefeicaoDesc);
});

if (openModalBtn) {
    openModalBtn.addEventListener('click', () => {
        if (modal && modalTitle && patientForm) {
            modalTitle.textContent = 'Cadastro de Paciente';
            editIndexInput.value = '';
            patientForm.reset();
            toggleRefeicaoDesc();
            modal.classList.remove('hidden');
        }
    });
}

if (closeModalBtn) {
    closeModalBtn.addEventListener('click', () => {
        if (modal && patientForm) {
            modal.classList.add('hidden');
            patientForm.reset();
            toggleRefeicaoDesc();
        }
    });
}

if (cancelModalBtn) {
    cancelModalBtn.addEventListener('click', () => {
        if (modal && patientForm) {
            modal.classList.add('hidden');
            patientForm.reset();
            toggleRefeicaoDesc();
        }
    });
}

// Manipula o modal de visualização de detalhes
if (closeViewModalBtn) {
    closeViewModalBtn.addEventListener('click', () => {
        if (viewModal) {
            viewModal.classList.add('hidden');
        }
    });
}

if (closeViewModalFooterBtn) {
    closeViewModalFooterBtn.addEventListener('click', () => {
        if (viewModal) {
            viewModal.classList.add('hidden');
        }
    });
}

// Manipula o modal de seleção de refeição
if (closeSelectMealModalBtn) {
    closeSelectMealModalBtn.addEventListener('click', () => {
        if (selectMealModal && selectMealForm) {
            selectMealModal.classList.add('hidden');
            selectMealForm.reset();
        }
    });
}

if (cancelSelectMealBtn) {
    cancelSelectMealBtn.addEventListener('click', () => {
        if (selectMealModal && selectMealForm) {
            selectMealModal.classList.add('hidden');
            selectMealForm.reset();
        }
    });
}

// Manipula o modal de resultado da refeição
if (closeMealResultModalBtn) {
    closeMealResultModalBtn.addEventListener('click', () => {
        if (mealResultModal) {
            mealResultModal.classList.add('hidden');
        }
    });
}

if (closeMealResultModalFooterBtn) {
    closeMealResultModalFooterBtn.addEventListener('click', () => {
        if (mealResultModal) {
            mealResultModal.classList.add('hidden');
        }
    });
}

if (printResultBtn) {
    printResultBtn.addEventListener('click', () => {
        const printContent = mealResultDetails.innerHTML;
        const titleContent = mealResultTitle.textContent;
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
                    <h2>Lista de Pacientes com Refeição Selecionada ${titleContent}</h2>
                    ${printContent}
                </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.print();
    });
}

// Manipula o botão de imprimir etiquetas em PDF
if (printLabelsBtn) {
    printLabelsBtn.addEventListener('click', () => {
        if (!currentSelectedMeal) return alert('Nenhuma refeição selecionada.');
        const filteredPatients = getFilteredPatients();
        try {
            generatePDFLabels(filteredPatients, currentSelectedMeal);
        } catch (error) {
            alert('Erro ao gerar etiquetas: ' + error.message);
        }
    });
}

// Manipula o botão de visualizar detalhes
const viewDetailsBtn = document.getElementById('viewDetailsBtn');
if (viewDetailsBtn) {
    viewDetailsBtn.addEventListener('click', () => {
        const selectedCheckbox = document.querySelector('.patientCheckbox:checked');
        if (selectedCheckbox && viewModal && patientDetails) {
            const index = parseInt(selectedCheckbox.dataset.index);
            const patient = patients[index];
            patientDetails.innerHTML = `
                <p><strong>Nome:</strong> ${patient.nome}</p>
                <p><strong>Prontuário:</strong> ${patient.prontuario}</p>
                <p><strong>Enfermaria/Leito:</strong> ${patient.enfermaria}</p>
                <p><strong>Nível de Assistência:</strong> ${patient.nivelAssistencia}</p>
                <p><strong>Peso:</strong> ${patient.peso} kg</p>
                <p><strong>Altura:</strong> ${patient.altura} m</p>
                <p><strong>IMC:</strong> ${patient.imc}</p>
                <p><strong>Dieta:</strong> ${patient.dieta}</p>
                <p><strong>Refeições:</strong></p>
                <ul class="list-disc pl-5">
                    ${Object.entries(patient.refeicoes || {}).map(([ref, desc]) => `<li>${ref}: ${desc}</li>`).join('') || '<li>Nenhuma refeição registrada</li>'}
                </ul>
                <p><strong>Observações:</strong> ${patient.observacoes || 'Nenhuma'}</p>
            `;
            viewModal.classList.remove('hidden');
        }
    });
}

// Manipula o botão de imprimir refeição
const printMealBtn = document.getElementById('printMealBtn');
if (printMealBtn) {
    printMealBtn.addEventListener('click', () => {
        if (selectMealModal) {
            selectMealModal.classList.remove('hidden');
        }
    });
}

// Manipula o envio do formulário de seleção de refeição
if (selectMealForm) {
    selectMealForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(selectMealForm);
        const selectedMeal = formData.get('selectedMeal');
        if (selectedMeal && mealResultModal && mealResultDetails && mealResultTitle) {
            currentSelectedMeal = selectedMeal; // Armazena a refeição selecionada
            const filteredPatients = getFilteredPatients();
            mealResultTitle.textContent = filteredPatients.length < patients.length ? '(Filtrada)' : '';
            let tableContent = `
                <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-50">
                        <tr>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nome</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Prontuário</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Enfermaria/Leito</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">${selectedMeal}</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200">
            `;
            filteredPatients.forEach(patient => {
                const mealDesc = patient.refeicoes && patient.refeicoes[selectedMeal] ? patient.refeicoes[selectedMeal] : 'Não registrada';
                tableContent += `
                    <tr>
                        <td class="px-6 py-4 whitespace-nowrap">${patient.nome}</td>
                        <td class="px-6 py-4 whitespace-nowrap">${patient.prontuario}</td>
                        <td class="px-6 py-4 whitespace-nowrap">${patient.enfermaria}</td>
                        <td class="px-6 py-4 whitespace-nowrap">${mealDesc}</td>
                    </tr>
                `;
            });
            tableContent += `
                    </tbody>
                </table>
            `;
            mealResultDetails.innerHTML = tableContent;
            selectMealModal.classList.add('hidden');
            selectMealForm.reset();
            mealResultModal.classList.remove('hidden');
        }
    });
}

// Manipula o checkbox "Marcar Todos"
const selectAll = document.getElementById('selectAll');
if (selectAll) {
    selectAll.addEventListener('change', (e) => {
        const checkboxes = document.querySelectorAll('.patientCheckbox');
        checkboxes.forEach(checkbox => {
            checkbox.checked = e.target.checked;
        });
        updateButtonStates();
    });
}

// Atualiza o estado dos botões quando checkboxes individuais são alterados
document.addEventListener('change', (e) => {
    if (e.target.classList.contains('patientCheckbox')) {
        if (selectAll) {
            const checkboxes = document.querySelectorAll('.patientCheckbox');
            selectAll.checked = Array.from(checkboxes).every(cb => cb.checked);
        }
        updateButtonStates();
    }
});

// Manipula a edição de um paciente
const editSelectedBtn = document.getElementById('editSelectedBtn');
if (editSelectedBtn) {
    editSelectedBtn.addEventListener('click', () => {
        const selectedCheckbox = document.querySelector('.patientCheckbox:checked');
        if (selectedCheckbox && modal && modalTitle && patientForm) {
            const index = parseInt(selectedCheckbox.dataset.index);
            const patient = patients[index];
            modalTitle.textContent = 'Editar Paciente';
            editIndexInput.value = index;
            patientForm.querySelector('input[name="nome"]').value = patient.nome;
            patientForm.querySelector('input[name="prontuario"]').value = patient.prontuario;
            patientForm.querySelector('input[name="enfermaria"]').value = patient.enfermaria;
            patientForm.querySelector('select[name="nivelAssistencia"]').value = patient.nivelAssistencia;
            patientForm.querySelector('input[name="peso"]').value = patient.peso;
            patientForm.querySelector('input[name="altura"]').value = patient.altura;
            patientForm.querySelector('input[name="imc"]').value = patient.imc;
            patientForm.querySelector('input[name="dieta"]').value = patient.dieta;
            patientForm.querySelector('textarea[name="observacoes"]').value = patient.observacoes || '';
            refeicaoCheckboxes.forEach(cb => {
                cb.checked = patient.refeicoes && !!patient.refeicoes[cb.value];
                const descField = patientForm.querySelector(`textarea[name="refeicao${cb.value}"]`);
                if (descField) {
                    descField.value = patient.refeicoes && patient.refeicoes[cb.value] ? patient.refeicoes[cb.value] : '';
                }
            });
            toggleRefeicaoDesc();
            modal.classList.remove('hidden');
        }
    });
}

// Manipula a exclusão de pacientes
const deleteSelectedBtn = document.getElementById('deleteSelectedBtn');
if (deleteSelectedBtn) {
    deleteSelectedBtn.addEventListener('click', () => {
        if (confirm('Deseja excluir os pacientes selecionados?')) {
            const selectedIndexes = Array.from(document.querySelectorAll('.patientCheckbox:checked'))
                .map(cb => parseInt(cb.dataset.index))
                .sort((a, b) => b - a);
            selectedIndexes.forEach(index => patients.splice(index, 1));
            renderPatientList(patients);
            if (selectAll) {
                selectAll.checked = false;
            }
        }
    });
}

// Manipula o envio do formulário de cadastro/edição
if (patientForm) {
    patientForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(patientForm);
        const editIndex = parseInt(formData.get('editIndex'));
        const refeicoes = {};
        ['Desjejum', 'Almoço', 'Lanche', 'Jantar', 'Ceia'].forEach(ref => {
            if (formData.getAll('refeicaoCheck').includes(ref)) {
                const desc = formData.get(`refeicao${ref}`) || '';
                if (desc.trim()) {
                    refeicoes[ref] = desc;
                }
            }
        });
        const newPatient = {
            nome: formData.get('nome'),
            prontuario: formData.get('prontuario'),
            enfermaria: formData.get('enfermaria'),
            nivelAssistencia: formData.get('nivelAssistencia'),
            peso: parseFloat(formData.get('peso')),
            altura: parseFloat(formData.get('altura')),
            imc: parseFloat(calculateIMC(formData.get('peso'), formData.get('altura'))),
            dieta: formData.get('dieta'),
            refeicoes,
            observacoes: formData.get('observacoes') || ''
        };
        if (!isNaN(editIndex)) {
            patients[editIndex] = newPatient;
        } else {
            patients.push(newPatient);
        }
        renderPatientList(patients);
        if (modal) {
            modal.classList.add('hidden');
        }
        patientForm.reset();
        toggleRefeicaoDesc();
    });
}

// Inicializa filtros
const filterInput = document.getElementById('filterInput');
if (filterInput) {
    filterInput.addEventListener('input', filterPatients);
}

// Renderiza a lista inicial
document.addEventListener('DOMContentLoaded', () => {
    renderPatientList(patients);
    toggleRefeicaoDesc();
});