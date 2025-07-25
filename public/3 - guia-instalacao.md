# Guia de Instalação - NextJS-Leaflet

Este guia fornece instruções detalhadas para instalar e configurar o sistema NextJS-Leaflet em seu ambiente de desenvolvimento local.

## Pré-requisitos

Antes de começar, certifique-se de que seu sistema atende aos seguintes requisitos:

- **Node.js**: Versão 16.8.x ou superior
- **pnpm**: Versão 8 ou superior (gerenciador de pacotes preferido)
- **Git**: Para clonar o repositório (opcional)
- **Editor de código**: Recomendamos Visual Studio Code com extensões para TypeScript e React

## Passos para Instalação

### 1. Clone o Repositório

Primeiro, clone o repositório do GitHub para sua máquina local:

```bash
git clone https://github.com/naufaldi/nextjs-leaflet.git
cd nextjs-leaflet
```

Alternativamente, você pode baixar o código-fonte como um arquivo ZIP e extraí-lo em seu diretório de trabalho.

### 2. Instale as Dependências

O projeto utiliza o pnpm como gerenciador de pacotes. Execute o seguinte comando para instalar todas as dependências:

```bash
pnpm install
```

Se você preferir usar npm ou yarn, pode utilizar os comandos equivalentes:

```bash
# Usando npm
npm install

# Usando yarn
yarn install
```

### 3. Configure as Variáveis de Ambiente (se necessário)

O projeto não requer variáveis de ambiente específicas para funcionar em ambiente de desenvolvimento. No entanto, se você precisar personalizar alguma configuração, pode criar um arquivo `.env.local` na raiz do projeto.

### 4. Inicie o Servidor de Desenvolvimento

Após a instalação das dependências, você pode iniciar o servidor de desenvolvimento:

```bash
pnpm dev
```

Isso iniciará o servidor de desenvolvimento do Next.js, que estará disponível em `http://localhost:3000`.

## Estrutura do Projeto

Após a instalação, você encontrará a seguinte estrutura de diretórios:

```
nextjs-leaflet/
├── public/            # Arquivos estáticos
├── src/               # Código-fonte
│   ├── app/           # Rotas e páginas
│   └── lib/           # Bibliotecas e componentes
├── .next/             # Arquivos de build (gerados automaticamente)
├── node_modules/      # Dependências (geradas automaticamente)
├── package.json       # Configuração de dependências e scripts
└── README.md          # Documentação básica
```

## Scripts Disponíveis

O projeto inclui vários scripts úteis que você pode executar:

- `pnpm dev`: Inicia o servidor de desenvolvimento
- `pnpm build`: Cria uma versão de produção do aplicativo
- `pnpm start`: Inicia o servidor de produção (após o build)
- `pnpm lint`: Executa o linter para verificar problemas de código
- `pnpm lint:fix`: Corrige automaticamente problemas de linting
- `pnpm type-check`: Verifica erros de tipagem TypeScript

## Solução de Problemas Comuns

### Erro: Módulos não encontrados

Se você encontrar erros relacionados a módulos não encontrados, tente:

1. Limpar o cache do pnpm: `pnpm store prune`
2. Remover a pasta node_modules: `rm -rf node_modules`
3. Reinstalar as dependências: `pnpm install`

### Erro: Problemas com Leaflet no Next.js

O Leaflet requer acesso ao DOM do navegador, o que pode causar problemas durante a renderização no servidor. O projeto já está configurado para carregar os componentes Leaflet apenas no lado do cliente usando `dynamic import` com `ssr: false`. Se você encontrar problemas relacionados ao Leaflet, verifique se está seguindo essa abordagem em seus próprios componentes.

### Erro: Incompatibilidade de Versões

Se você encontrar erros relacionados à incompatibilidade de versões, verifique se está usando as versões corretas do Node.js e pnpm conforme especificado nos pré-requisitos.

## Próximos Passos

Após a instalação bem-sucedida, você pode:

1. Explorar os diferentes exemplos de mapas disponíveis no aplicativo
2. Examinar o código-fonte para entender como os mapas são implementados
3. Experimentar modificações nos componentes existentes
4. Criar seus próprios componentes de mapa

## Recursos Adicionais

- [Documentação do Next.js](https://nextjs.org/docs)
- [Documentação do Leaflet](https://leafletjs.com/reference.html)
- [Documentação do React Leaflet](https://react-leaflet.js.org/)
- [Documentação do Geoman](https://geoman.io/docs)

## Suporte

Se você encontrar problemas durante a instalação ou tiver dúvidas sobre o projeto, pode:

1. Abrir uma issue no repositório GitHub
2. Consultar a documentação adicional disponível na pasta `public`
