document.addEventListener('DOMContentLoaded', () => {
    // Inicializar usuário padrão se não existir
    if (!localStorage.getItem('users')) {
        const defaultUsers = [
            { email: 'admin@hospital.com', password: 'admin123', name: 'Admin', role: 'admin', status: 'active' }
        ];
        localStorage.setItem('users', JSON.stringify(defaultUsers));
    }

    // Proteger páginas (index.html, users.html)
    if (window.location.pathname.includes('index.html') || window.location.pathname.includes('users.html')) {
        if (!localStorage.getItem('isLoggedIn')) {
            window.location.href = 'login.html';
        }
    }

    // Formulário de login
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = loginForm.email.value.trim();
            const password = loginForm.password.value.trim();

            const users = JSON.parse(localStorage.getItem('users') || '[]');
            const user = users.find(u => u.email === email && u.password === password && u.status === 'active');

            if (user) {
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('currentUser', JSON.stringify(user));
                window.location.href = 'index.html';
            } else {
                alert('E-mail ou senha incorretos, ou usuário inativo.');
            }
        });

        // Esqueci minha senha (placeholder)
        document.getElementById('forgotPassword').addEventListener('click', (e) => {
            e.preventDefault();
            alert('Funcionalidade de recuperação de senha não implementada. Contate o administrador.');
        });
    }

    // Logout
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('currentUser');
            window.location.href = 'login.html';
        });
    }
});