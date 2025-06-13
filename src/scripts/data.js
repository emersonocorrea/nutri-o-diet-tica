const mockPatients = [
    {
        nome: "João Silva",
        prontuario: "123456",
        enfermaria: "Enf. 3, Leito 12",
        nivelAssistencia: "Nível I (Primário)",
        peso: 70,
        altura: 1.75,
        imc: 22.86,
        dieta: "Dieta Geral",
        refeicoes: {
            Desjejum: "Café com leite, pão integral, margarina",
            Almoço: "Arroz, feijão, frango grelhado, salada",
            Jantar: "Sopa de legumes, pão integral"
        },
        observacoes: "Paciente aceita bem a dieta."
    },
    {
        nome: "Maria Oliveira",
        prontuario: "789012",
        enfermaria: "Enf. 5, Leito 8",
        nivelAssistencia: "Nível II (Secundário)",
        peso: 60,
        altura: 1.67,
        imc: 21.48,
        dieta: "Dieta Hipossódica",
        refeicoes: {
            Desjejum: "Suco natural, pão sem sal, queijo cottage",
            Almoço: "Arroz integral, peixe cozido, legumes no vapor",
            Lanche: "Fruta fresca",
            Jantar: "Salada verde, peito de frango grelhado"
        },
        observacoes: "Monitorar aceitação da dieta."
    }
];

window.mockPatients = mockPatients;