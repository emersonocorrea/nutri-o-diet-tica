import { apiGet, apiPost, apiPut, apiDelete } from './api.js';

document.addEventListener('DOMContentLoaded', () => {
    const userList = document.getElementById('userList');
    const filterInput = document.getElementById('filterInput');
    const openModalBtn = document.getElementById('openModalBtn');
    const modal = document.getElementById('modal');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const cancelModalBtn = document.getElementById('cancelModalBtn');
    const userForm = document.getElementById('userForm');
    const modalTitle = document.getElementById('modalTitle');
    const viewModal = document.getElementById('viewModal');
    const closeViewModalBtn = document.getElementById('closeViewModalBtn');
    const closeViewModalFooterBtn = document.getElementById('closeViewModalFooterBtn');
    const userDetails = document.getElementById('userDetails');
    const viewDetailsBtn = document.getElementById('viewDetailsBtn');
    const editSelectedBtn = document.getElementById('editSelectedBtn');
    const deleteSelectedBtn = document.getElementById('deleteSelectedBtn');
    const selectAll = document.getElementById('selectAll');

    let users = [];

    // Carrega usuários do backend
    async function loadUsers() {
        try {
            users = await apiGet('/users');
            renderUsers();
        } catch (error) {
            console.error('Erro ao carregar usuários:', error);
        }
    }

    // Renderizar tabela
    function renderUsers(filter = '') {
        userList.innerHTML = '';
        const filteredUsers = users.filter(user =>
            user.name.toLowerCase().includes(filter.toLowerCase()) ||
            user.email.toLowerCase().includes(filter.toLowerCase())
        );

        filteredUsers.forEach((user, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="px-2 sm:px-4 md:px-6 py-1 sm:py-2 md:py-3">
                    <input type="checkbox" class="userCheckbox min-h-5 min-w-5" data-index="${index}" data-id="${user.id}">
                </td>
                <td class="px-2 sm:px-4 md:px-6 py-1 sm:py-2 md:py-3">${user.name}</td>
                <td class="px-2 sm:px-4 md:px-6 py-1 sm:py-2 md:py-3">${user.email}</td>
                <td class="px-2 sm:px-4 md:px-6 py-1 sm:py-2 md:py-3">${user.role === 'admin' ? 'Admin' : 'Usuário'}</td>
                <td class="px-2 sm:px-4 md:px-6 py-1 sm:py-2 md:py-3">${user.status === 'active' ? 'Ativo' : 'Inativo'}</td>
            `;
            userList.appendChild(row);
        });

        updateButtonStates();
    }

    // Atualizar estado dos botões
    function updateButtonStates() {
        const checkboxes = document.querySelectorAll('.userCheckbox:checked');
        const singleSelected = checkboxes.length === 1;
        viewDetailsBtn.disabled = !singleSelected;
        editSelectedBtn.disabled = !singleSelected;
        deleteSelectedBtn.disabled = checkboxes.length === 0;
    }

    // Filtro
    filterInput.addEventListener('input', () => {
        renderUsers(filterInput.value);
    });

    // Abrir modal
    openModalBtn.addEventListener('click', () => {
        modalTitle.textContent = 'Cadastro de Usuário';
        userForm.reset();
        userForm.editId.value = '';
        modal.classList.remove('hidden');
    });

    // Fechar modal
    closeModalBtn.addEventListener('click', () => {
        modal.classList.add('hidden');
    });
    cancelModalBtn.addEventListener('click', () => {
        modal.classList.add('hidden');
    });

    // Salvar usuário
    userForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const editId = userForm.editId.value;
        const user = {
            name: userForm.name.value.trim(),
            email: userForm.email.value.trim(),
            password: userForm.password.value.trim(),
            role: userForm.role.value,
            status: userForm.status.value
        };

        try {
            if (editId === '') {
                await apiPost('/users', user);
            } else {
                await apiPut(`/users/${editId}`, user);
            }
            await loadUsers();
            modal.classList.add('hidden');
        } catch (error) {
            alert('Erro ao salvar usuário: ' + error.message);
        }
    });

    // Visualizar detalhes
    viewDetailsBtn.addEventListener('click', async () => {
        const selectedCheckbox = document.querySelector('.userCheckbox:checked');
        const userId = selectedCheckbox.dataset.id;
        try {
            const user = await apiGet(`/users/${userId}`);
            userDetails.innerHTML = `
                <p><strong>Nome:</strong> ${user.name}</p>
                <p><strong>E-mail:</strong> ${user.email}</p>
                <p><strong>Tipo:</strong> ${user.role === 'admin' ? 'Admin' : 'Usuário'}</p>
                <p><strong>Status:</strong> ${user.status === 'active' ? 'Ativo' : 'Inativo'}</p>
            `;
            viewModal.classList.remove('hidden');
        } catch (error) {
            alert('Erro ao carregar detalhes: ' + error.message);
        }
    });

    // Fechar modal de visualização
    closeViewModalBtn.addEventListener('click', () => {
        viewModal.classList.add('hidden');
    });
    closeViewModalFooterBtn.addEventListener('click', () => {
        viewModal.classList.add('hidden');
    });

    // Editar usuário
    editSelectedBtn.addEventListener('click', async () => {
        const selectedCheckbox = document.querySelector('.userCheckbox:checked');
        const userId = selectedCheckbox.dataset.id;
        try {
            const user = await apiGet(`/users/${userId}`);
            modalTitle.textContent = 'Editar Usuário';
            userForm.name.value = user.name;
            userForm.email.value = user.email;
            userForm.password.value = user.password;
            userForm.role.value = user.role;
            userForm.status.value = user.status;
            userForm.editId.value = userId;
            modal.classList.remove('hidden');
        } catch (error) {
            alert('Erro ao carregar usuário para edição: ' + error.message);
        }
    });

    // Excluir usuários
    deleteSelectedBtn.addEventListener('click', async () => {
        if (confirm('Deseja excluir os usuários selecionados?')) {
            const checkboxes = document.querySelectorAll('.userCheckbox:checked');
            const ids = Array.from(checkboxes).map(cb => cb.dataset.id);
            try {
                for (const id of ids) {
                    await apiDelete(`/users/${id}`);
                }
                await loadUsers();
            } catch (error) {
                alert('Erro ao excluir usuários: ' + error.message);
            }
        }
    });

    // Selecionar todos
    selectAll.addEventListener('change', () => {
        document.querySelectorAll('.userCheckbox').forEach(cb => {
            cb.checked = selectAll.checked;
        });
        updateButtonStates();
    });

    // Atualizar botões ao selecionar
    userList.addEventListener('change', updateButtonStates);

    // Inicializar
    loadUsers();
});