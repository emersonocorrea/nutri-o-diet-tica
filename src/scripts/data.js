const mockPatients = [
  {
    nome: "João Silva",
    prontuario: "PR10001",
    enfermaria: "Enf. 3A - Leito 12",
    nivelAssistencia: "Nível I (Primário)",
    peso: 75.5,
    altura: 1.75,
    imc: (75.5 / (1.75 * 1.75)).toFixed(2),
    dieta: "Dieta Padrão",
    refeicoes: {
      Desjejum: "Café com leite, pão integral",
      Almoço: "Arroz, feijão, frango grelhado",
      Jantar: "Sopa de legumes"
    },
    observacoes: "Alergia a frutos do mar"
  },
  {
    nome: "Maria Oliveira",
    prontuario: "PR10002",
    enfermaria: "UTI - Leito 5",
    nivelAssistencia: "Nível III (Terciário)",
    peso: 62.0,
    altura: 1.60,
    imc: (62.0 / (1.60 * 1.60)).toFixed(2),
    dieta: "Dieta Enteral",
    refeicoes: {
      Almoço: "Fórmula enteral 500ml",
      Jantar: "Fórmula enteral 500ml"
    },
    observacoes: ""
  },
  {
    nome: "Pedro Santos",
    prontuario: "PR10003",
    enfermaria: "Enf. 2B - Leito 8",
    nivelAssistencia: "Nível II (Secundário)",
    peso: 88.2,
    altura: 1.80,
    imc: (88.2 / (1.80 * 1.80)).toFixed(2),
    dieta: "Dieta Hipossódica",
    refeicoes: {
      Desjejum: "Suco de laranja, torrada",
      Almoço: "Macarrão com molho leve",
      Lanche: "Fruta fresca",
      Jantar: "Peixe cozido, purê"
    },
    observacoes: "Hipertenso"
  },
  {
    nome: "Ana Costa",
    prontuario: "PR10004",
    enfermaria: "Enf. 4C - Leito 3",
    nivelAssistencia: "Nível I (Primário)",
    peso: 55.7,
    altura: 1.55,
    imc: (55.7 / (1.55 * 1.55)).toFixed(2),
    dieta: "Dieta Padrão",
    refeicoes: {
      Desjejum: "Iogurte natural, granola",
      Almoço: "Arroz integral, carne magra",
      Lanche: "Biscoito integral",
      Jantar: "Salada, omelete"
    },
    observacoes: ""
  },
  {
    nome: "Lucas Pereira",
    prontuario: "PR10005",
    enfermaria: "Enf. 1A - Leito 10",
    nivelAssistencia: "Nível II (Secundário)",
    peso: 95.0,
    altura: 1.85,
    imc: (95.0 / (1.85 * 1.85)).toFixed(2),
    dieta: "Dieta Hipocalórica",
    refeicoes: {
      Desjejum: "Chá verde, pão light",
      Almoço: "Salada, frango grelhado",
      Lanche: "Maçã",
      Jantar: "Sopa de abóbora"
    },
    observacoes: "Obesidade grau I"
  },
  {
    nome: "Clara Almeida",
    prontuario: "PR10006",
    enfermaria: "Enf. 5B - Leito 7",
    nivelAssistencia: "Nível I (Primário)",
    peso: 70.3,
    altura: 1.65,
    imc: (70.3 / (1.65 * 1.65)).toFixed(2),
    dieta: "Dieta Padrão",
    refeicoes: {
      Desjejum: "Café preto, pão francês",
      Almoço: "Arroz, feijão, bife",
      Jantar: "Sopa de ervilha"
    },
    observacoes: "Sem restrições"
  },
  {
    nome: "Rafael Lima",
    prontuario: "PR10007",
    enfermaria: "UTI - Leito 2",
    nivelAssistencia: "Nível III (Terciário)",
    peso: 80.0,
    altura: 1.78,
    imc: (80.0 / (1.78 * 1.78)).toFixed(2),
    dieta: "Dieta Enteral",
    refeicoes: {
      Almoço: "Fórmula enteral 600ml",
      Jantar: "Fórmula enteral 600ml"
    },
    observacoes: "Paciente intubado"
  },
  {
    nome: "Sofia Mendes",
    prontuario: "PR10008",
    enfermaria: "Enf. 3C - Leito 15",
    nivelAssistencia: "Nível II (Secundário)",
    peso: 58.9,
    altura: 1.62,
    imc: (58.9 / (1.62 * 1.62)).toFixed(2),
    dieta: "Dieta Hipossódica",
    refeicoes: {
      Desjejum: "Suco natural, pão sem sal",
      Almoço: "Arroz, peixe cozido",
      Lanche: "Fruta",
      Jantar: "Sopa sem sal"
    },
    observacoes: ""
  },
  {
    nome: "Gabriel Ferreira",
    prontuario: "PR10009",
    enfermaria: "Enf. 2A - Leito 4",
    nivelAssistencia: "Nível I (Primário)",
    peso: 82.4,
    altura: 1.82,
    imc: (82.4 / (1.82 * 1.82)).toFixed(2),
    dieta: "Dieta Padrão",
    refeicoes: {
      Desjejum: "Leite, cereal",
      Almoço: "Macarrão, carne",
      Jantar: "Salada, frango"
    },
    observacoes: "Alergia a amendoim"
  },
  {
    nome: "Juliana Rocha",
    prontuario: "PR10010",
    enfermaria: "Enf. 4B - Leito 9",
    nivelAssistencia: "Nível II (Secundário)",
    peso: 65.1,
    altura: 1.68,
    imc: (65.1 / (1.68 * 1.68)).toFixed(2),
    dieta: "Dieta Diabética",
    refeicoes: {
      Desjejum: "Chá, pão integral",
      Almoço: "Arroz integral, legumes",
      Lanche: "Fruta com baixo IG",
      Jantar: "Peixe, salada"
    },
    observacoes: "Diabetes tipo 2"
  },
  {
    nome: "Mateus Carvalho",
    prontuario: "PR10011",
    enfermaria: "Enf. 1B - Leito 6",
    nivelAssistencia: "Nível I (Primário)",
    peso: 77.8,
    altura: 1.70,
    imc: (77.8 / (1.70 * 1.70)).toFixed(2),
    dieta: "Dieta Padrão",
    refeicoes: {
      Desjejum: "Café, pão com queijo",
      Almoço: "Arroz, feijão, ovo",
      Jantar: "Sopa de cenoura"
    },
    observacoes: ""
  },
  {
    nome: "Laura Ribeiro",
    prontuario: "PR10012",
    enfermaria: "Enf. 5A - Leito 11",
    nivelAssistencia: "Nível II (Secundário)",
    peso: 60.5,
    altura: 1.58,
    imc: (60.5 / (1.58 * 1.58)).toFixed(2),
    dieta: "Dieta Hipossódica",
    refeicoes: {
      Desjejum: "Suco, torrada sem sal",
      Almoço: "Macarrão, frango cozido",
      Lanche: "Fruta fresca",
      Jantar: "Sopa leve"
    },
    observacoes: "Hipertensão"
  },
  {
    nome: "Thiago Barbosa",
    prontuario: "PR10013",
    enfermaria: "UTI - Leito 3",
    nivelAssistencia: "Nível III (Terciário)",
    peso: 90.0,
    altura: 1.88,
    imc: (90.0 / (1.88 * 1.88)).toFixed(2),
    dieta: "Dieta Enteral",
    refeicoes: {
      Almoço: "Fórmula enteral 700ml",
      Jantar: "Fórmula enteral 700ml"
    },
    observacoes: "Pós-cirúrgico"
  },
  {
    nome: "Beatriz Souza",
    prontuario: "PR10014",
    enfermaria: "Enf. 3B - Leito 5",
    nivelAssistencia: "Nível I (Primário)",
    peso: 68.0,
    altura: 1.63,
    imc: (68.0 / (1.63 * 1.63)).toFixed(2),
    dieta: "Dieta Padrão",
    refeicoes: {
      Desjejum: "Iogurte, pão integral",
      Almoço: "Arroz, carne magra",
      Jantar: "Salada, peixe"
    },
    observacoes: ""
  },
  {
    nome: "Enzo Martins",
    prontuario: "PR10015",
    enfermaria: "Enf. 2C - Leito 13",
    nivelAssistencia: "Nível II (Secundário)",
    peso: 85.6,
    altura: 1.79,
    imc: (85.6 / (1.79 * 1.79)).toFixed(2),
    dieta: "Dieta Hipocalórica",
    refeicoes: {
      Desjejum: "Chá, pão light",
      Almoço: "Salada, frango",
      Lanche: "Fruta",
      Jantar: "Sopa de legumes"
    },
    observacoes: "Sobrepeso"
  },
  {
    nome: "Camila Dias",
    prontuario: "PR10016",
    enfermaria: "Enf. 4A - Leito 2",
    nivelAssistencia: "Nível I (Primário)",
    peso: 57.3,
    altura: 1.57,
    imc: (57.3 / (1.57 * 1.57)).toFixed(2),
    dieta: "Dieta Padrão",
    refeicoes: {
      Desjejum: "Café, pão francês",
      Almoço: "Arroz, feijão, carne",
      Jantar: "Sopa de abóbora"
    },
    observacoes: "Sem restrições"
  },
  {
    nome: "Vinicius Correia",
    prontuario: "PR10017",
    enfermaria: "Enf. 1C - Leito 14",
    nivelAssistencia: "Nível II (Secundário)",
    peso: 78.9,
    altura: 1.76,
    imc: (78.9 / (1.76 * 1.76)).toFixed(2),
    dieta: "Dieta Diabética",
    refeicoes: {
      Desjejum: "Chá, pão integral",
      Almoço: "Arroz integral, legumes",
      Lanche: "Fruta com baixo IG",
      Jantar: "Peixe, salada"
    },
    observacoes: "Diabetes tipo 1"
  },
  {
    nome: "Isabela Gonçalves",
    prontuario: "PR10018",
    enfermaria: "Enf. 5C - Leito 1",
    nivelAssistencia: "Nível I (Primário)",
    peso: 63.2,
    altura: 1.64,
    imc: (63.2 / (1.64 * 1.64)).toFixed(2),
    dieta: "Dieta Padrão",
    refeicoes: {
      Desjejum: "Leite, cereal",
      Almoço: "Macarrão, carne",
      Jantar: "Salada, frango"
    },
    observacoes: ""
  },
  {
    nome: "Daniel Castro",
    prontuario: "PR10019",
    enfermaria: "UTI - Leito 4",
    nivelAssistencia: "Nível III (Terciário)",
    peso: 87.0,
    altura: 1.83,
    imc: (87.0 / (1.83 * 1.83)).toFixed(2),
    dieta: "Dieta Enteral",
    refeicoes: {
      Almoço: "Fórmula enteral 800ml",
      Jantar: "Fórmula enteral 800ml"
    },
    observacoes: "Trauma grave"
  },
  {
    nome: "Helena Araujo",
    prontuario: "PR10020",
    enfermaria: "Enf. 3A - Leito 16",
    nivelAssistencia: "Nível II (Secundário)",
    peso: 59.8,
    altura: 1.59,
    imc: (59.8 / (1.59 * 1.59)).toFixed(2),
    dieta: "Dieta Hipossódica",
    refeicoes: {
      Desjejum: "Suco, pão sem sal",
      Almoço: "Arroz, peixe cozido",
      Lanche: "Fruta",
      Jantar: "Sopa sem sal"
    },
    observacoes: "Cardiopatia"
  },
  {
    nome: "Arthur Vieira",
    prontuario: "PR10021",
    enfermaria: "Enf. 2B - Leito 7",
    nivelAssistencia: "Nível I (Primário)",
    peso: 81.0,
    altura: 1.77,
    imc: (81.0 / (1.77 * 1.77)).toFixed(2),
    dieta: "Dieta Padrão",
    refeicoes: {
      Desjejum: "Café, pão com queijo",
      Almoço: "Arroz, feijão, ovo",
      Jantar: "Sopa de cenoura"
    },
    observacoes: "Alergia a leite"
  },
  {
    nome: "Manuela Torres",
    prontuario: "PR10022",
    enfermaria: "Enf. 4C - Leito 10",
    nivelAssistencia: "Nível II (Secundário)",
    peso: 66.7,
    altura: 1.66,
    imc: (66.7 / (1.66 * 1.66)).toFixed(2),
    dieta: "Dieta Hipocalórica",
    refeicoes: {
      Desjejum: "Chá verde, pão light",
      Almoço: "Salada, frango grelhado",
      Lanche: "Maçã",
      Jantar: "Sopa de abóbora"
    },
    observacoes: "Sobrepeso"
  },
  {
    nome: "Gustavo Nascimento",
    prontuario: "PR10023",
    enfermaria: "Enf. 1A - Leito 9",
    nivelAssistencia: "Nível I (Primário)",
    peso: 73.4,
    altura: 1.72,
    imc: (73.4 / (1.72 * 1.72)).toFixed(2),
    dieta: "Dieta Padrão",
    refeicoes: {
      Desjejum: "Iogurte, granola",
      Almoço: "Arroz integral, carne",
      Jantar: "Salada, omelete"
    },
    observacoes: ""
  },
  {
    nome: "Lívia Cunha",
    prontuario: "PR10024",
    enfermaria: "Enf. 5B - Leito 8",
    nivelAssistencia: "Nível II (Secundário)",
    peso: 61.0,
    altura: 1.61,
    imc: (61.0 / (1.61 * 1.61)).toFixed(2),
    dieta: "Dieta Diabética",
    refeicoes: {
      Desjejum: "Chá, pão integral",
      Almoço: "Arroz integral, legumes",
      Lanche: "Fruta com baixo IG",
      Jantar: "Peixe, salada"
    },
    observacoes: "Diabetes tipo 2"
  },
  {
    nome: "Eduardo Ramos",
    prontuario: "PR10025",
    enfermaria: "UTI - Leito 6",
    nivelAssistencia: "Nível III (Terciário)",
    peso: 92.5,
    altura: 1.90,
    imc: (92.5 / (1.90 * 1.90)).toFixed(2),
    dieta: "Dieta Enteral",
    refeicoes: {
      Almoço: "Fórmula enteral 900ml",
      Jantar: "Fórmula enteral 900ml"
    },
    observacoes: "Pós-operatório"
  },
  {
    nome: "Valentina Melo",
    prontuario: "PR10026",
    enfermaria: "Enf. 3C - Leito 4",
    nivelAssistencia: "Nível I (Primário)",
    peso: 64.8,
    altura: 1.67,
    imc: (64.8 / (1.67 * 1.67)).toFixed(2),
    dieta: "Dieta Padrão",
    refeicoes: {
      Desjejum: "Café, pão francês",
      Almoço: "Arroz, feijão, carne",
      Jantar: "Sopa de legumes"
    },
    observacoes: "Sem restrições"
  },
  {
    nome: "Felipe Duarte",
    prontuario: "PR10027",
    enfermaria: "Enf. 2A - Leito 11",
    nivelAssistencia: "Nível II (Secundário)",
    peso: 79.2,
    altura: 1.74,
    imc: (79.2 / (1.74 * 1.74)).toFixed(2),
    dieta: "Dieta Hipossódica",
    refeicoes: {
      Desjejum: "Suco, pão sem sal",
      Almoço: "Arroz, peixe cozido",
      Lanche: "Fruta",
      Jantar: "Sopa sem sal"
    },
    observacoes: "Hipertensão"
  },
  {
    nome: "Alice Cardoso",
    prontuario: "PR10028",
    enfermaria: "Enf. 4B - Leito 12",
    nivelAssistencia: "Nível I (Primário)",
    peso: 56.4,
    altura: 1.56,
    imc: (56.4 / (1.56 * 1.56)).toFixed(2),
    dieta: "Dieta Padrão",
    refeicoes: {
      Desjejum: "Leite, cereal",
      Almoço: "Macarrão, carne",
      Jantar: "Salada, frango"
    },
    observacoes: ""
  },
  {
    nome: "Henrique Borges",
    prontuario: "PR10029",
    enfermaria: "Enf. 1B - Leito 3",
    nivelAssistencia: "Nível II (Secundário)",
    peso: 84.3,
    altura: 1.81,
    imc: (84.3 / (1.81 * 1.81)).toFixed(2),
    dieta: "Dieta Hipocalórica",
    refeicoes: {
      Desjejum: "Chá verde, pão light",
      Almoço: "Salada, frango grelhado",
      Lanche: "Maçã",
      Jantar: "Sopa de abóbora"
    },
    observacoes: "Obesidade"
  },
  {
    nome: "Mariana Pires",
    prontuario: "PR10030",
    enfermaria: "Enf. 5A - Leito 15",
    nivelAssistencia: "Nível I (Primário)",
    peso: 67.5,
    altura: 1.69,
    imc: (67.5 / (1.69 * 1.69)).toFixed(2),
    dieta: "Dieta Padrão",
    refeicoes: {
      Desjejum: "Iogurte, granola",
      Almoço: "Arroz integral, carne",
      Jantar: "Salada, omelete"
    },
    observacoes: "Alergia a glúten"
  },
  {
    nome: "Leonardo Farias",
    prontuario: "PR10031",
    enfermaria: "UTI - Leito 7",
    nivelAssistencia: "Nível III (Terciário)",
    peso: 89.0,
    altura: 1.86,
    imc: (89.0 / (1.86 * 1.86)).toFixed(2),
    dieta: "Dieta Enteral",
    refeicoes: {
      Almoço: "Fórmula enteral 1000ml",
      Jantar: "Fórmula enteral 1000ml"
    },
    observacoes: "Paciente em coma"
  },
  {
    nome: "Yasmin Nogueira",
    prontuario: "PR10032",
    enfermaria: "Enf. 3B - Leito 6",
    nivelAssistencia: "Nível II (Secundário)",
    peso: 60.2,
    altura: 1.60,
    imc: (60.2 / (1.60 * 1.60)).toFixed(2),
    dieta: "Dieta Hipossódica",
    refeicoes: {
      Desjejum: "Suco, pão sem sal",
      Almoço: "Arroz, peixe cozido",
      Lanche: "Fruta",
      Jantar: "Sopa sem sal"
    },
    observacoes: "Cardiopatia"
  },
  {
    nome: "Samuel Rezende",
    prontuario: "PR10033",
    enfermaria: "Enf. 2C - Leito 5",
    nivelAssistencia: "Nível I (Primário)",
    peso: 76.0,
    altura: 1.73,
    imc: (76.0 / (1.73 * 1.73)).toFixed(2),
    dieta: "Dieta Padrão",
    refeicoes: {
      Desjejum: "Café, pão com queijo",
      Almoço: "Arroz, feijão, ovo",
      Jantar: "Sopa de cenoura"
    },
    observacoes: ""
  },
  {
    nome: "Letícia Viana",
    prontuario: "PR10034",
    enfermaria: "Enf. 4A - Leito 8",
    nivelAssistencia: "Nível II (Secundário)",
    peso: 62.9,
    altura: 1.65,
    imc: (62.9 / (1.65 * 1.65)).toFixed(2),
    dieta: "Dieta Diabética",
    refeicoes: {
      Desjejum: "Chá, pão integral",
      Almoço: "Arroz integral, legumes",
      Lanche: "Fruta com baixo IG",
      Jantar: "Peixe, salada"
    },
    observacoes: "Diabetes tipo 2"
  },
  {
    nome: "João Victor Peixoto",
    prontuario: "PR10035",
    enfermaria: "Enf. 1C - Leito 2",
    nivelAssistencia: "Nível I (Primário)",
    peso: 80.7,
    altura: 1.78,
    imc: (80.7 / (1.78 * 1.78)).toFixed(2),
    dieta: "Dieta Padrão",
    refeicoes: {
      Desjejum: "Leite, cereal",
      Almoço: "Macarrão, carne",
      Jantar: "Salada, frango"
    },
    observacoes: "Sem restrições"
  },
  {
    nome: "Bruna Lopes",
    prontuario: "PR10036",
    enfermaria: "Enf. 5C - Leito 13",
    nivelAssistencia: "Nível II (Secundário)",
    peso: 58.0,
    altura: 1.58,
    imc: (58.0 / (1.58 * 1.58)).toFixed(2),
    dieta: "Dieta Hipossódica",
    refeicoes: {
      Desjejum: "Suco, pão sem sal",
      Almoço: "Arroz, peixe cozido",
      Lanche: "Fruta",
      Jantar: "Sopa sem sal"
    },
    observacoes: "Hipertensão"
  },
  {
    nome: "Caio Monteiro",
    prontuario: "PR10037",
    enfermaria: "UTI - Leito 8",
    nivelAssistencia: "Nível III (Terciário)",
    peso: 86.0,
    altura: 1.84,
    imc: (86.0 / (1.84 * 1.84)).toFixed(2),
    dieta: "Dieta Enteral",
    refeicoes: {
      Almoço: "Fórmula enteral 1100ml",
      Jantar: "Fórmula enteral 1100ml"
    },
    observacoes: "Pós-cirúrgico"
  },
  {
    nome: "Larissa Campos",
    prontuario: "PR10038",
    enfermaria: "Enf. 3A - Leito 7",
    nivelAssistencia: "Nível I (Primário)",
    peso: 65.0,
    altura: 1.66,
    imc: (65.0 / (1.66 * 1.66)).toFixed(2),
    dieta: "Dieta Padrão",
    refeicoes: {
      Desjejum: "Café, pão francês",
      Almoço: "Arroz, feijão, carne",
      Jantar: "Sopa de legumes"
    },
    observacoes: ""
  },
  {
    nome: "Igor Azevedo",
    prontuario: "PR10039",
    enfermaria: "Enf. 2B - Leito 14",
    nivelAssistencia: "Nível II (Secundário)",
    peso: 83.5,
    altura: 1.80,
    imc: (83.5 / (1.80 * 1.80)).toFixed(2),
    dieta: "Dieta Hipocalórica",
    refeicoes: {
      Desjejum: "Chá verde, pão light",
      Almoço: "Salada, frango grelhado",
      Lanche: "Maçã",
      Jantar: "Sopa de abóbora"
    },
    observacoes: "Sobrepeso"
  },
  {
    nome: "Fernanda Batista",
    prontuario: "PR10040",
    enfermaria: "Enf. 4C - Leito 1",
    nivelAssistencia: "Nível I (Primário)",
    peso: 59.0,
    altura: 1.62,
    imc: (59.0 / (1.62 * 1.62)).toFixed(2),
    dieta: "Dieta Padrão",
    refeicoes: {
      Desjejum: "Iogurte, granola",
      Almoço: "Arroz integral, carne",
      Jantar: "Salada, omelete"
    },
    observacoes: "Alergia a ovo"
  },
  {
    nome: "Rodrigo Silveira",
    prontuario: "PR10041",
    enfermaria: "Enf. 1A - Leito 5",
    nivelAssistencia: "Nível II (Secundário)",
    peso: 78.0,
    altura: 1.75,
    imc: (78.0 / (1.75 * 1.75)).toFixed(2),
    dieta: "Dieta Diabética",
    refeicoes: {
      Desjejum: "Chá, pão integral",
      Almoço: "Arroz integral, legumes",
      Lanche: "Fruta com baixo IG",
      Jantar: "Peixe, salada"
    },
    observacoes: "Diabetes tipo 1"
  },
  {
    nome: "Cecília Cruz",
    prontuario: "PR10042",
    enfermaria: "Enf. 5B - Leito 4",
    nivelAssistencia: "Nível I (Primário)",
    peso: 66.0,
    altura: 1.68,
    imc: (66.0 / (1.68 * 1.68)).toFixed(2),
    dieta: "Dieta Padrão",
    refeicoes: {
      Desjejum: "Leite, cereal",
      Almoço: "Macarrão, carne",
      Jantar: "Salada, frango"
    },
    observacoes: ""
  },
  {
    nome: "André Navarro",
    prontuario: "PR10043",
    enfermaria: "UTI - Leito 9",
    nivelAssistencia: "Nível III (Terciário)",
    peso: 91.0,
    altura: 1.89,
    imc: (91.0 / (1.89 * 1.89)).toFixed(2),
    dieta: "Dieta Enteral",
    refeicoes: {
      Almoço: "Fórmula enteral 1200ml",
      Jantar: "Fórmula enteral 1200ml"
    },
    observacoes: "Trauma craniano"
  },
  {
    nome: "Elisa Macedo",
    prontuario: "PR10044",
    enfermaria: "Enf. 3C - Leito 10",
    nivelAssistencia: "Nível II (Secundário)",
    peso: 61.5,
    altura: 1.63,
    imc: (61.5 / (1.63 * 1.63)).toFixed(2),
    dieta: "Dieta Hipossódica",
    refeicoes: {
      Desjejum: "Suco, pão sem sal",
      Almoço: "Arroz, peixe cozido",
      Lanche: "Fruta",
      Jantar: "Sopa sem sal"
    },
    observacoes: "Hipertensão"
  },
  {
    nome: "Bernardo Guedes",
    prontuario: "PR10045",
    enfermaria: "Enf. 2A - Leito 3",
    nivelAssistencia: "Nível I (Primário)",
    peso: 77.0,
    altura: 1.76,
    imc: (77.0 / (1.76 * 1.76)).toFixed(2),
    dieta: "Dieta Padrão",
    refeicoes: {
      Desjejum: "Café, pão com queijo",
      Almoço: "Arroz, feijão, ovo",
      Jantar: "Sopa de cenoura"
    },
    observacoes: "Sem restrições"
  },
  {
    nome: "Vitória Leite",
    prontuario: "PR10046",
    enfermaria: "Enf. 4B - Leito 6",
    nivelAssistencia: "Nível II (Secundário)",
    peso: 63.0,
    altura: 1.64,
    imc: (63.0 / (1.64 * 1.64)).toFixed(2),
    dieta: "Dieta Hipocalórica",
    refeicoes: {
      Desjejum: "Chá verde, pão light",
      Almoço: "Salada, frango grelhado",
      Lanche: "Maçã",
      Jantar: "Sopa de abóbora"
    },
    observacoes: "Sobrepeso"
  },
  {
    nome: "Nicolas Brandão",
    prontuario: "PR10047",
    enfermaria: "Enf. 1B - Leito 12",
    nivelAssistencia: "Nível I (Primário)",
    peso: 82.0,
    altura: 1.79,
    imc: (82.0 / (1.79 * 1.79)).toFixed(2),
    dieta: "Dieta Padrão",
    refeicoes: {
      Desjejum: "Iogurte, granola",
      Almoço: "Arroz integral, carne",
      Jantar: "Salada, omelete"
    },
    observacoes: ""
  },
  {
    nome: "Lara Queiroz",
    prontuario: "PR10048",
    enfermaria: "Enf. 5A - Leito 2",
    nivelAssistencia: "Nível II (Secundário)",
    peso: 60.0,
    altura: 1.61,
    imc: (60.0 / (1.61 * 1.61)).toFixed(2),
    dieta: "Dieta Diabética",
    refeicoes: {
      Desjejum: "Chá, pão integral",
      Almoço: "Arroz integral, legumes",
      Lanche: "Fruta com baixo IG",
      Jantar: "Peixe, salada"
    },
    observacoes: "Diabetes tipo 2"
  },
  {
    nome: "Pietro Siqueira",
    prontuario: "PR10049",
    enfermaria: "UTI - Leito 10",
    nivelAssistencia: "Nível III (Terciário)",
    peso: 88.0,
    altura: 1.87,
    imc: (88.0 / (1.87 * 1.87)).toFixed(2),
    dieta: "Dieta Enteral",
    refeicoes: {
      Almoço: "Fórmula enteral 1300ml",
      Jantar: "Fórmula enteral 1300ml"
    },
    observacoes: "Pós-operatório"
  },
  {
    nome: "Giovanna Cavalcanti",
    prontuario: "PR10050",
    enfermaria: "Enf. 3B - Leito 9",
    nivelAssistencia: "Nível I (Primário)",
    peso: 64.0,
    altura: 1.65,
    imc: (64.0 / (1.65 * 1.65)).toFixed(2),
    dieta: "Dieta Padrão",
    refeicoes: {
      Desjejum: "Café, pão francês",
      Almoço: "Arroz, feijão, carne",
      Jantar: "Sopa de legumes"
    },
    observacoes: "Sem restrições"
  }
];