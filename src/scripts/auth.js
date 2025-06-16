import { apiPost } from './api.js';

document.addEventListener('DOMContentLoaded', () => {
    // Proteger páginas (index.html, users.html)
    if (window.location.pathname.includes('index.html') || window.location.pathname.includes('users.html')) {
        if (!localStorage.getItem('token')) {
            window.location.href = 'login.html';
        }
    }

    // Formulário de login
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = loginForm.email.value.trim();
            const password = loginForm.password.value.trim();

            try {
                const response = await apiPost('/auth/login', { email, password });
                localStorage.setItem('token', response.token);
                localStorage.setItem('currentUser', JSON.stringify(response.user));
                window.location.href = 'index.html';
            } catch (error) {
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
            localStorage.removeItem('token');
            localStorage.removeItem('currentUser');
            window.location.href = 'login.html';
        });
    }
});