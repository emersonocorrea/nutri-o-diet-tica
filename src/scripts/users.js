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

    let users = JSON.parse(localStorage.getItem('users') || '[]');

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
                    <input type="checkbox" class="userCheckbox min-h-5 min-w-5" data-index="${index}">
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
        userForm.editIndex.value = '';
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
    userForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const editIndex = userForm.editIndex.value;
        const user = {
            name: userForm.name.value.trim(),
            email: userForm.email.value.trim(),
            password: userForm.password.value.trim(),
            role: userForm.role.value,
            status: userForm.status.value
        };

        if (editIndex === '') {
            if (users.some(u => u.email === user.email)) {
                alert('E-mail já cadastrado.');
                return;
            }
            users.push(user);
        } else {
            if (users.some((u, i) => u.email === user.email && i !== Number(editIndex))) {
                alert('E-mail já cadastrado.');
                return;
            }
            users[Number(editIndex)] = user;
        }

        localStorage.setItem('users', JSON.stringify(users));
        modal.classList.add('hidden');
        renderUsers(filterInput.value);
    });

    // Visualizar detalhes
    viewDetailsBtn.addEventListener('click', () => {
        const selectedIndex = document.querySelector('.userCheckbox:checked').dataset.index;
        const user = users[Number(selectedIndex)];
        userDetails.innerHTML = `
            <p><strong>Nome:</strong> ${user.name}</p>
            <p><strong>E-mail:</strong> ${user.email}</p>
            <p><strong>Tipo:</strong> ${user.role === 'admin' ? 'Admin' : 'Usuário'}</p>
            <p><strong>Status:</strong> ${user.status === 'active' ? 'Ativo' : 'Inativo'}</p>
        `;
        viewModal.classList.remove('hidden');
    });

    // Fechar modal de visualização
    closeViewModalBtn.addEventListener('click', () => {
        viewModal.classList.add('hidden');
    });
    closeViewModalFooterBtn.addEventListener('click', () => {
        viewModal.classList.add('hidden');
    });

    // Editar usuário
    editSelectedBtn.addEventListener('click', () => {
        const selectedIndex = document.querySelector('.userCheckbox:checked').dataset.index;
        const user = users[Number(selectedIndex)];
        modalTitle.textContent = 'Editar Usuário';
        userForm.name.value = user.name;
        userForm.email.value = user.email;
        userForm.password.value = user.password;
        userForm.role.value = user.role;
        userForm.status.value = user.status;
        userForm.editIndex.value = selectedIndex;
        modal.classList.remove('hidden');
    });

    // Excluir usuários
    deleteSelectedBtn.addEventListener('click', () => {
        if (confirm('Deseja excluir os usuários selecionados?')) {
            const checkboxes = document.querySelectorAll('.userCheckbox:checked');
            const indices = Array.from(checkboxes).map(cb => Number(cb.dataset.index)).sort((a, b) => b - a);
            indices.forEach(index => users.splice(index, 1));
            localStorage.setItem('users', JSON.stringify(users));
            renderUsers(filterInput.value);
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
    renderUsers();
});