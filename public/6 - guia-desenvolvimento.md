# Guia de Desenvolvimento - NextJS-Leaflet

Este guia fornece orientações detalhadas para desenvolvedores que desejam estender ou modificar o sistema NextJS-Leaflet, explicando as melhores práticas, padrões de código e fluxos de trabalho recomendados.

## Configuração do Ambiente de Desenvolvimento

### Pré-requisitos

Antes de começar o desenvolvimento, certifique-se de que seu ambiente atende aos seguintes requisitos:

- **Node.js**: Versão 16.8.x ou superior
- **pnpm**: Versão 8 ou superior (gerenciador de pacotes preferido)
- **Editor de código**: Visual Studio Code é recomendado, com as seguintes extensões:
  - ESLint
  - Prettier
  - Tailwind CSS IntelliSense
  - TypeScript Vue Plugin (Volar)

### Configuração Inicial

1. Clone o repositório:
   ```bash
   git clone https://github.com/naufaldi/nextjs-leaflet.git
   cd nextjs-leaflet
   ```

2. Instale as dependências:
   ```bash
   pnpm install
   ```

3. Configure os hooks do Git:
   ```bash
   pnpm prepare
   ```

4. Inicie o servidor de desenvolvimento:
   ```bash
   pnpm dev
   ```

## Estrutura do Projeto

O projeto segue a estrutura padrão do Next.js com App Router, com algumas personalizações:

```
nextjs-leaflet/
├── public/            # Arquivos estáticos
│   ├── images/        # Imagens utilizadas na aplicação
│   └── assets/        # Outros recursos estáticos
├── src/               # Código-fonte da aplicação
│   ├── app/           # Definição de rotas e páginas (Next.js App Router)
│   │   ├── api/       # Rotas de API
│   │   ├── geojson/   # Página de demonstração de GeoJSON
│   │   └── with-geoman/ # Página de demonstração de Geoman
│   └── lib/           # Bibliotecas e componentes reutilizáveis
│       ├── components/ # Componentes React
│       │   ├── layout/ # Componentes de layout
│       │   ├── maps/   # Componentes de mapas básicos
│       │   ├── maps-geojson/ # Componentes de mapas com GeoJSON
│       │   └── maps-geoman/  # Componentes de mapas com Geoman
│       ├── pages/     # Implementações de páginas
│       └── styles/    # Estilos e utilitários CSS
```

## Padrões de Código

### TypeScript

O projeto utiliza TypeScript para fornecer tipagem estática. Siga estas diretrizes ao trabalhar com TypeScript:

1. **Sempre defina tipos explícitos para props de componentes**:
   ```typescript
   interface ButtonProps {
     variant?: 'primary' | 'secondary';
     children: React.ReactNode;
     onClick?: () => void;
   }
   
   const Button = ({ variant = 'primary', children, onClick }: ButtonProps) => {
     // ...
   };
   ```

2. **Utilize interfaces para definir estruturas de dados complexas**:
   ```typescript
   interface MyGeoJsonProperties {
     name: string;
     address: string;
     openingHours: string;
   }
   ```

3. **Evite o uso de `any`**. Prefira `unknown` quando o tipo não for conhecido:
   ```typescript
   // Ruim
   const handleData = (data: any) => {
     // ...
   };
   
   // Bom
   const handleData = (data: unknown) => {
     if (typeof data === 'object' && data !== null) {
       // ...
     }
   };
   ```

### React e Next.js

1. **Utilize componentes funcionais e hooks**:
   ```typescript
   const MyComponent = () => {
     const [state, setState] = useState(initialState);
     
     useEffect(() => {
       // Efeito colateral
     }, [dependencies]);
     
     return (
       // JSX
     );
   };
   ```

2. **Carregue componentes Leaflet apenas no cliente**:
   ```typescript
   'use client';
   
   import dynamic from 'next/dynamic';
   
   const MyPage = () => {
     const MapComponent = dynamic(() => import('@/lib/components/maps'), {
       ssr: false,
     });
     
     return (
       <div>
         <MapComponent />
       </div>
     );
   };
   ```

3. **Utilize a diretiva `'use client'` apenas quando necessário**:
   - Componentes que utilizam hooks do React
   - Componentes que dependem do DOM do navegador
   - Componentes que utilizam APIs do navegador

### Estilização com Tailwind CSS

1. **Utilize classes utilitárias do Tailwind CSS para estilização**:
   ```tsx
   <div className="flex flex-col items-center justify-center p-4 bg-gray-100">
     <h1 className="text-2xl font-bold text-blue-600">Título</h1>
   </div>
   ```

2. **Para estilos reutilizáveis, utilize a função `cn` para combinar classes**:
   ```typescript
   import { cn } from '@/lib/styles/utils';
   
   const Button = ({ className, ...props }) => {
     return (
       <button
         className={cn(
           "bg-blue-500 text-white px-4 py-2 rounded",
           className
         )}
         {...props}
       />
     );
   };
   ```

3. **Mantenha a responsividade utilizando os modificadores de breakpoint do Tailwind**:
   ```tsx
   <div className="w-full md:w-1/2 lg:w-1/3">
     {/* Conteúdo */}
   </div>
   ```

## Trabalhando com Mapas

### Leaflet e React Leaflet

1. **Sempre carregue componentes Leaflet dinamicamente com `ssr: false`**:
   ```typescript
   const MapComponent = dynamic(() => import('@/lib/components/maps'), {
     ssr: false,
   });
   ```

2. **Utilize `useEffect` para interagir com a instância do mapa**:
   ```typescript
   const MapInteraction = () => {
     const map = useMap();
     
     useEffect(() => {
       map.on('click', (e) => {
         console.log(e.latlng);
       });
       
       return () => {
         map.off('click');
       };
     }, [map]);
     
     return null;
   };
   ```

3. **Carregue os estilos CSS do Leaflet no layout principal**:
   ```typescript
   // src/app/layout.tsx
   import 'leaflet/dist/leaflet.css';
   ```

### GeoJSON

1. **Defina tipos para seus dados GeoJSON**:
   ```typescript
   import type { FeatureCollection, Point } from 'geojson';
   
   const myData: FeatureCollection<Point> = {
     type: 'FeatureCollection',
     features: [
       // ...
     ],
   };
   ```

2. **Lembre-se da diferença de formato de coordenadas entre GeoJSON e Leaflet**:
   ```typescript
   // GeoJSON: [longitude, latitude]
   const geoJsonCoords = [-8.8280039, 115.1558519];
   
   // Leaflet: [latitude, longitude]
   const [longitude, latitude] = geoJsonCoords;
   const leafletCoords = [latitude, longitude];
   ```

### Geoman

1. **Adicione controles do Geoman utilizando um componente separado**:
   ```typescript
   const AddGeomanControls = () => {
     const map = useMap();
   
     useEffect(() => {
       map.pm.addControls({
         position: 'topleft',
         drawMarker: true,
         // outras opções...
       });
   
       return () => {
         // Limpeza, se necessário
       };
     }, [map]);
   
     return null;
   };
   ```

2. **Escute eventos do Geoman para interagir com as edições**:
   ```typescript
   useEffect(() => {
     map.on('pm:create', (e) => {
       console.log('Elemento criado:', e.layer);
     });
     
     return () => {
       map.off('pm:create');
     };
   }, [map]);
   ```

## Fluxo de Trabalho de Desenvolvimento

### Criando um Novo Componente de Mapa

1. **Crie um novo diretório para o componente**:
   ```
   src/lib/components/maps-custom/
   ```

2. **Crie o arquivo principal do componente**:
   ```
   src/lib/components/maps-custom/index.tsx
   ```

3. **Implemente o componente baseado nos exemplos existentes**:
   ```typescript
   import L from 'leaflet';
   import { MapContainer, TileLayer } from 'react-leaflet';
   
   const CustomMap = () => {
     return (
       <div className="w-full">
         <MapContainer
           className="h-[300px] w-full"
           center={[0, 0]}
           zoom={2}
           scrollWheelZoom={false}
         >
           <TileLayer
             attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
           />
           {/* Adicione seus componentes personalizados aqui */}
         </MapContainer>
       </div>
     );
   };
   
   export default CustomMap;
   ```

4. **Crie uma página para o novo componente**:
   ```
   src/lib/pages/custom-map/index.tsx
   ```

   ```typescript
   'use client';
   
   import dynamic from 'next/dynamic';
   
   const CustomMapPage = () => {
     const NotSSRMaps = dynamic(() => import('@/lib/components/maps-custom'), {
       ssr: false,
     });
     
     return (
       <div className="mx-auto flex min-h-[60vh] w-full max-w-screen-lg flex-col items-center justify-center gap-8 text-center">
         <NotSSRMaps />
       </div>
     );
   };
   
   export default CustomMapPage;
   ```

5. **Adicione a rota para a nova página**:
   ```
   src/app/custom-map/page.tsx
   ```

   ```typescript
   import CustomMapPage from '@/lib/pages/custom-map';
   
   export default CustomMapPage;
   ```

6. **Adicione um link na barra lateral**:
   ```typescript
   // src/lib/components/layout/Sidebar.tsx
   
   // ...
   <Link href="/custom-map">
     <Button
       variant={pathname === '/custom-map' ? 'secondary' : 'ghost'}
       className="w-full justify-start"
     >
       <svg>...</svg>
       Mapa Personalizado
     </Button>
   </Link>
   // ...
   ```

### Testes e Qualidade de Código

1. **Execute o linter para verificar problemas de código**:
   ```bash
   pnpm lint
   ```

2. **Corrija automaticamente problemas de linting**:
   ```bash
   pnpm lint:fix
   ```

3. **Verifique erros de tipagem TypeScript**:
   ```bash
   pnpm type-check
   ```

4. **Formate o código**:
   ```bash
   pnpm format
   ```

## Melhores Práticas

### Performance

1. **Utilize importações dinâmicas para componentes pesados**:
   ```typescript
   const HeavyComponent = dynamic(() => import('@/lib/components/heavy-component'), {
     loading: () => <div>Carregando...</div>,
   });
   ```

2. **Minimize o número de re-renderizações**:
   - Utilize `useMemo` para valores calculados
   - Utilize `useCallback` para funções
   - Utilize `React.memo` para componentes

3. **Otimize imagens**:
   - Utilize formatos modernos (WebP, AVIF)
   - Utilize o componente `Image` do Next.js

### Acessibilidade

1. **Utilize elementos semânticos**:
   ```tsx
   <nav>
     <ul>
       <li><a href="/">Home</a></li>
     </ul>
   </nav>
   ```

2. **Adicione atributos ARIA quando necessário**:
   ```tsx
   <button aria-label="Fechar modal">X</button>
   ```

3. **Garanta contraste adequado entre texto e fundo**:
   ```tsx
   <div className="bg-gray-900">
     <p className="text-white">Texto com bom contraste</p>
   </div>
   ```

### Segurança

1. **Evite injeção de HTML**:
   ```tsx
   // Ruim
   <div dangerouslySetInnerHTML={{ __html: userInput }} />
   
   // Bom
   <div>{userInput}</div>
   ```

2. **Valide dados de entrada**:
   ```typescript
   const handleSubmit = (data: unknown) => {
     if (
       typeof data === 'object' && 
       data !== null && 
       'name' in data && 
       typeof data.name === 'string'
     ) {
       // Processe os dados
     } else {
       // Rejeite os dados inválidos
     }
   };
   ```

## Contribuição

### Fluxo de Trabalho Git

1. **Crie uma branch para sua feature ou correção**:
   ```bash
   git checkout -b feature/nome-da-feature
   ```

2. **Faça commits pequenos e frequentes**:
   ```bash
   git add .
   git commit -m "feat: adiciona novo componente de mapa"
   ```

3. **Siga as convenções de commit**:
   - `feat`: Nova funcionalidade
   - `fix`: Correção de bug
   - `docs`: Alterações na documentação
   - `style`: Alterações que não afetam o código (formatação, etc.)
   - `refactor`: Refatoração de código
   - `test`: Adição ou correção de testes
   - `chore`: Alterações no processo de build, ferramentas, etc.

4. **Envie sua branch para o repositório remoto**:
   ```bash
   git push origin feature/nome-da-feature
   ```

5. **Crie um pull request**:
   - Descreva as alterações realizadas
   - Mencione quaisquer problemas relacionados
   - Solicite revisão de código

## Recursos Adicionais

- [Documentação do Next.js](https://nextjs.org/docs)
- [Documentação do React](https://reactjs.org/docs)
- [Documentação do TypeScript](https://www.typescriptlang.org/docs)
- [Documentação do Tailwind CSS](https://tailwindcss.com/docs)
- [Documentação do Leaflet](https://leafletjs.com/reference.html)
- [Documentação do React Leaflet](https://react-leaflet.js.org/)
- [Documentação do Geoman](https://geoman.io/docs)

## Conclusão

Este guia forneceu orientações detalhadas para desenvolvedores que desejam estender ou modificar o sistema NextJS-Leaflet. Seguindo estas práticas recomendadas, você poderá contribuir para o projeto de forma eficiente e manter a qualidade do código.
