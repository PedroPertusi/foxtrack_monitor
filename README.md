# FoxTrack Monitor
Projeto para o roteiro 3 da disciplina de cibersegurança do 6o Semestre de Ciência da Computação.

Aluno: Pedro Pertusi

**FoxTrack Monitor** é uma extensão de navegador que monitora e detecta possíveis conexões de terceiros, ameaças de sequestro e hook, armazenamento local e técnicas de fingerprinting em páginas web. A extensão exibe um relatório dinâmico desses aspectos de segurança diretamente no popup da extensão.

## Funcionalidades

- **Detecção de conexões de terceiros**: A extensão é capaz de detectar e listar as conexões a domínios de terceira parte em uma navegação web.
- **Ameaças de sequestro de navegador (Hijacking/Hooking)**: Verifica se há potenciais ameaças de sequestro de navegador ou hooks maliciosos.
- **Armazenamento local (Storage local - HTML5)**: Detecta o armazenamento de dados no dispositivo do usuário.
- **Cookies e Supercookies**: Detecta a quantidade de cookies e supercookies injetados no carregamento de uma página, diferenciando cookies de primeira e terceira parte, bem como de sessão ou navegação, se possível.
- **Detecção de Canvas Fingerprint**: Detecta tentativas de fingerprinting usando a API de Canvas.
- **Pontuação de privacidade**: Calcula uma pontuação de privacidade com base em uma metodologia definida pelo grupo, indicando se a página respeita a privacidade do usuário.

## Instalação

1. Clone o repositório ou baixe o código-fonte.
2. Abra o **Firefox** e vá para `about:debugging` > **Este Firefox** > **Carregar Manifesto Temporário**.
3. Selecione o arquivo `manifest.json` localizado no diretório da extensão.
4. A extensão será carregada e aparecerá na barra de ferramentas do Firefox.

## Como usar

1. Após instalar a extensão, clique no ícone da extensão na barra de ferramentas.
2. Clique no botão **"Run Scan"** para iniciar a análise da página atual.
3. A extensão injetará um script na página que coletará as informações de segurança.
4. Quando a análise for concluída, a extensão exibirá um relatório com os seguintes dados:
   - **Domínios de Terceiros**: Exibe se a página fez conexões com domínios de terceiros.
   - **Ameaças de Sequestro/Hooking**: Exibe possíveis ameaças detectadas.
   - **Armazenamento Local**: Indica se o `localStorage` foi utilizado.
   - **Cookies e Supercookies**: Detecta a quantidade de cookies e supercookies injetados no carregamento de uma página, diferenciando cookies de primeira e terceira parte, bem como de sessão ou navegação, se possível.
   - **Fingerprinting de Canvas**: Detecta tentativas de fingerprinting através da API de Canvas.

## Estrutura do Código

- **popup/foxtrack_monitor.js**: Controla a interface de popup da extensão, injeta o script de conteúdo e processa o resultado da análise.
- **content_scripts/foxtrack.js**: Script de conteúdo injetado na página, responsável por remover elementos do DOM e analisar as ameaças.
- **manifest.json**: Arquivo de manifesto que define as permissões, scripts, e configurações da extensão.

## Exemplo de Uso

1. Acesse uma página qualquer no navegador.
2. Abra o popup da extensão e clique em **"Run Scan"**.
3. A extensão analisará a página e mostrará o relatório com as informações detectadas.

## Requisitos

- **Firefox** (a extensão foi projetada para ser usada no Firefox)
- **Manifest V2** (compatível com o Manifest V2)

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).
