# UniSENAC
# Programação Orientação a Objetos
# Atividade avaliativa

Os alunos devem montar grupos de 3 a 6 pessoas para resolver o problema proposto.

## Entrega/apresentação

### Parte 1

Dentro do escopo geral, os grupos devem fazer o planejamento de um “MVP” que poderá ser entregue até as 11:15 (manhã) e 21:15 (noite).
As **11:15/21:15** todos os grupos devem apresentar seu pitch de MVP em **3 minutos,** não mais.

### Parte 2

Os grupos irão apresentar suas soluções para a turma.
Data: 26/9
Tempo: 10 minutos
Formato de apresentação: livre

# **Sistema de Reserva de Quadras Esportivas**

### Requisitos Funcionais:

1. O sistema deve permitir o cadastro de quadras esportivas disponíveis.
2. Cada quadra deve ter um nome e um tipo de esporte associado (por exemplo, futebol, tênis, basquete).
3. O sistema deve permitir que os clientes reservem quadras para jogar.
4. Os clientes devem fornecer seu nome e selecionar a quadra desejada.
5. O sistema deve registrar a data e o horário da reserva.
6. O sistema deve ser capaz de listar todas as quadras disponíveis.
7. O sistema deve ser capaz de listar todas as reservas feitas.
8. Uma integração com Gemini para dar sugestão de nutrição esportiva toda vez que um novo agendamento for realizado

## Casos de teste

1. **Teste de criação de quadra esportiva:**
    - Verificar se é possível criar uma quadra esportiva com sucesso, fornecendo um nome e um tipo de esporte válido.
    - Verificar se a quadra criada está presente na lista de quadras disponíveis.
2. **Teste de reserva de quadra:**
    - Verificar se é possível reservar uma quadra com sucesso, fornecendo o nome do cliente, a quadra desejada e a data/horário da reserva.
    - Verificar se a reserva é registrada corretamente no sistema.
    - Verificar se a quadra reservada é marcada como ocupada no horário especificado.
3. **Teste de listagem de quadras disponíveis:**
    - Verificar se todas as quadras disponíveis são listadas corretamente pelo sistema.
    - Verificar se as quadras ocupadas em determinado horário não são listadas como disponíveis.
4. **Teste de listagem de reservas feitas:**
    - Verificar se todas as reservas feitas são listadas corretamente pelo sistema.
    - Verificar se as informações de cliente, quadra e horário da reserva estão corretas na lista.
5. **Teste de tentativa de reserva em quadra ocupada:**
    - Verificar se o sistema lança uma exceção ou retorna uma mensagem de erro quando uma tentativa de reserva é feita em uma quadra já ocupada no horário especificado.
6. **Teste de cancelamento de reserva:**
    - Verificar se é possível cancelar uma reserva previamente feita.
    - Verificar se a quadra reservada é marcada como disponível novamente após o cancelamento.

    Esses são apenas alguns exemplos de casos de teste que podem ser elaborados para garantir o funcionamento correto do sistema de reserva de quadras esportivas. Cada teste deve verificar um comportamento específico do sistema em diferentes situações.

### Observações:

- Implemente o sistema em TS.
- Escreva o código mais limpo e claro possível.
- Utilize classes para representar quadras, usuários e reservas, com métodos para realizar as operações necessárias.
- Considere como tratar casos de exceção, como tentativas de reserva de quadras já ocupadas.
- Teste o sistema com diferentes cenários para garantir seu funcionamento correto.