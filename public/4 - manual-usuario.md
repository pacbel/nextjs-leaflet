# Manual do Usuário - NextJS-Leaflet

Este manual fornece instruções detalhadas sobre como utilizar o sistema NextJS-Leaflet, explicando suas funcionalidades e como navegar pela interface.

## Introdução

O NextJS-Leaflet é uma aplicação web que demonstra a integração de mapas interativos utilizando a biblioteca Leaflet em um projeto Next.js. O sistema oferece três exemplos principais de implementação de mapas:

1. Mapas Básicos
2. Mapas com GeoJSON
3. Mapas com ferramentas de edição (Geoman)

## Navegação na Interface

### Barra Lateral

A barra lateral esquerda contém os links para as diferentes seções da aplicação:

- **Mapas Básicos**: Exibe um mapa simples com um marcador.
- **Mapas com GeoJSON**: Demonstra como utilizar dados GeoJSON em um mapa.
- **Mapas + GeoJSON + Geoman**: Apresenta um mapa com ferramentas avançadas de edição.

Para navegar entre as seções, basta clicar no botão correspondente na barra lateral.

### Cabeçalho

O cabeçalho da aplicação contém:

- **Título da Página**: Indica a seção atual.
- **Alternador de Tema**: Permite alternar entre os temas claro e escuro.

## Funcionalidades Principais

### 1. Mapas Básicos

Na seção de Mapas Básicos, você encontrará:

- Um mapa interativo centrado em uma localização específica (Londres, por padrão).
- Um marcador no centro do mapa.
- Um popup informativo que aparece ao clicar no marcador.

**Como utilizar**:
- **Zoom**: Utilize a roda do mouse ou os botões de zoom no canto superior esquerdo.
- **Movimentação**: Clique e arraste para mover o mapa.
- **Interação com Marcadores**: Clique no marcador para exibir informações adicionais.

### 2. Mapas com GeoJSON

Na seção de Mapas com GeoJSON, você encontrará:

- Um mapa interativo centrado em uma localização específica (Bali, Indonésia).
- Dados geográficos representados no formato GeoJSON.
- Um marcador com informações detalhadas sobre um estabelecimento.

**Como utilizar**:
- **Zoom e Movimentação**: Semelhante à seção de Mapas Básicos.
- **Visualização de Dados GeoJSON**: Os dados GeoJSON são exibidos automaticamente no mapa.
- **Informações Detalhadas**: Clique no marcador para ver informações como nome, endereço e horário de funcionamento.

### 3. Mapas com Geoman

Na seção de Mapas com Geoman, você encontrará:

- Um mapa interativo com ferramentas avançadas de edição.
- Barra de ferramentas Geoman no canto superior esquerdo.
- Dados GeoJSON pré-carregados.

**Como utilizar**:

A barra de ferramentas Geoman oferece as seguintes opções:

- **Desenhar Marcador**: Permite adicionar novos marcadores ao mapa.
- **Desenhar Polígono**: Permite desenhar áreas poligonais no mapa.
- **Desenhar Linha**: Permite desenhar linhas no mapa.
- **Desenhar Círculo**: Permite desenhar círculos no mapa.
- **Desenhar Marcador Circular**: Permite adicionar marcadores circulares.
- **Editar Camadas**: Permite modificar elementos existentes no mapa.
- **Mover Camadas**: Permite arrastar e reposicionar elementos.
- **Cortar Polígonos**: Permite dividir polígonos existentes.
- **Remover Camadas**: Permite excluir elementos do mapa.

Para utilizar estas ferramentas:

1. Selecione a ferramenta desejada na barra de ferramentas.
2. Interaja com o mapa conforme a ferramenta selecionada:
   - Para ferramentas de desenho: clique no mapa para iniciar e continuar o desenho.
   - Para edição: clique no elemento que deseja editar.
   - Para remoção: clique no elemento que deseja remover.

## Dicas e Truques

### Navegação Eficiente no Mapa

- **Duplo clique**: Amplia o mapa no ponto clicado.
- **Shift + Arrastar**: Cria uma caixa de seleção para ampliar uma área específica.
- **Teclas de seta**: Movem o mapa em pequenos incrementos.

### Trabalhando com Geoman

- **Ctrl + Z**: Desfaz a última ação (em navegadores compatíveis).
- **Finalizar desenho**: Para finalizar o desenho de um polígono ou linha, clique no ponto inicial ou dê um duplo clique.
- **Edição precisa**: No modo de edição, você pode arrastar os pontos individuais de um polígono ou linha para ajustes precisos.

## Solução de Problemas Comuns

### O mapa não carrega corretamente

Se o mapa não estiver carregando corretamente:

1. Verifique sua conexão com a internet.
2. Atualize a página do navegador.
3. Limpe o cache do navegador e tente novamente.

### Ferramentas de edição não funcionam

Se as ferramentas de edição do Geoman não estiverem funcionando:

1. Verifique se você selecionou a ferramenta correta na barra de ferramentas.
2. Tente atualizar a página.
3. Verifique se seu navegador está atualizado e suporta todas as funcionalidades necessárias.

## Compatibilidade

O sistema NextJS-Leaflet é compatível com os seguintes navegadores:

- Google Chrome (versão 60 ou superior)
- Mozilla Firefox (versão 60 ou superior)
- Microsoft Edge (versão 79 ou superior)
- Safari (versão 12 ou superior)

Para uma melhor experiência, recomendamos utilizar a versão mais recente do seu navegador preferido.

## Conclusão

Este manual forneceu uma visão geral das funcionalidades disponíveis no sistema NextJS-Leaflet. Explore as diferentes seções para aprender mais sobre a implementação de mapas interativos em aplicações web modernas.

Se você encontrar problemas ou tiver dúvidas adicionais, consulte a documentação técnica disponível ou entre em contato com a equipe de suporte.
