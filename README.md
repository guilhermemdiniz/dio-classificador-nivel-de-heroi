# Classificador de Nível de Heroi

Uma aplicação interativa para calcular e visualizar o nível de um herói com base em sua experiência (XP). O usuário consegue aumentar o XP do herói pressionando o botão de ganho de XP, o visual do card do heroi e a música mudam de acordo com a pontuação. Isso faz uma pequena referência ao meme "Mr Incredible becoming Canny".

## Funcionalidades

- **Ganhar e perder XP**: O usuário pode incrementar a experiência do herói pressionando um botão. Quando o botão é solto, perde XP até o limite mínimo do nível atual do herói.
- **Níveis do herói**: Conforme o herói atinge determinados intervalos de XP, ele sobe de nível, o que altera a música e a aparência do herói na tela.
- **Música de fundo por nível**: Cada nível possui uma música associada, que muda automaticamente ao subir de nível.
- **Opções de áudio**: O usuário pode mutar/desmutar o áudio da página e reiniciar o progresso do herói a qualquer momento.

## Pré-requisitos

- **Node.js** e **npm** instalados
- Uma IDE ou editor de código, como o **VS Code**

## Instalação e Execução

1. Clone o repositório:

    ```bash
    git clone https://github.com/guilhermemdiniz/dio-classificador-nivel-de-heroi.git
    cd dio-classificador-nivel-de-heroi
    ```

2. Instale as dependências do projeto:

    ```bash
    npm install
    ```

3. Inicie o servidor de desenvolvimento:

    ```bash
    npm run dev
    ```

## Estrutura do Código

- **`HeroPage`**: Componente principal onde o usuário interage para aumentar ou diminuir o XP do herói, visualizar o nível e controlar o áudio.
- **XP e nível do herói**: O nível do herói é calculado com base em intervalos de XP. Os ataques e defesas são baseados em percentuais do XP total.
- **Troca de música e visuais**: O uso do `useEffect` monitora o nível do herói e realiza a troca de música e aparência de acordo com o nível atual.

## Arquivos e Componentes Principais

- `HeroPage.js`: Componente principal da página do herói.
- `HeroCard.js`: Componente que exibe os detalhes do herói, como nome, nível, ataque e defesa.
- `XpIndicator.js`: Componente visual da barra de XP que representa o progresso atual do herói.
- `assets/audios`: Pasta onde estão os arquivos de áudio utilizados na aplicação, com um para cada nível.
- `public/`: Contém as imagens utilizadas na aplicação, com uma para cada nível
