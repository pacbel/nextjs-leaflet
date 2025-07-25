# Documentação Técnica dos Componentes - NextJS-Leaflet

Esta documentação fornece detalhes técnicos sobre os principais componentes do sistema NextJS-Leaflet, explicando sua estrutura, funcionalidades e como eles se integram.

## Visão Geral dos Componentes

O sistema NextJS-Leaflet é construído utilizando uma arquitetura baseada em componentes React, seguindo as melhores práticas do Next.js. Os componentes estão organizados em categorias lógicas para facilitar a manutenção e extensão do código.

## Componentes de Mapa

### 1. Mapa Básico (`src/lib/components/maps/index.tsx`)

Este componente implementa um mapa Leaflet básico com um marcador simples.

#### Estrutura:

```typescript
import L from 'leaflet';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

const Maps = () => {
  const icon = L.icon({ iconUrl: '/images/marker-icon.png' });

  return (
    <div className="w-full">
      <MapContainer
        className="h-[300px] w-full"
        center={[51.505, -0.09]}
        zoom={13}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[51.505, -0.09]} icon={icon}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};
```

#### Funcionalidades:

- **MapContainer**: Componente principal que define o contêiner do mapa.
  - `center`: Define o centro inicial do mapa (latitude, longitude).
  - `zoom`: Define o nível de zoom inicial.
  - `scrollWheelZoom`: Desativa o zoom com a roda do mouse.

- **TileLayer**: Define a camada de tiles (imagens) do mapa.
  - `attribution`: Créditos para os fornecedores dos dados do mapa.
  - `url`: URL do serviço de tiles (OpenStreetMap neste caso).

- **Marker**: Adiciona um marcador no mapa.
  - `position`: Posição do marcador (latitude, longitude).
  - `icon`: Ícone personalizado para o marcador.

- **Popup**: Define o conteúdo que será exibido ao clicar no marcador.

### 2. Mapa com GeoJSON (`src/lib/components/maps-geojson/index.tsx`)

Este componente estende o mapa básico para incluir dados no formato GeoJSON.

#### Estrutura:

```typescript
import type { FeatureCollection, Point } from 'geojson';
import type { LatLngExpression } from 'leaflet';
import L from 'leaflet';
import { MapContainer, Marker, Popup, GeoJSON, TileLayer } from 'react-leaflet';

interface MyGeoJsonProperties {
  name: string;
  address: string;
  openingHours: string;
}

const MapsGeoJSON = () => {
  const icon = L.icon({ iconUrl: '/images/marker-icon.png' });
  const dataGeoJSON: FeatureCollection<Point> = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-8.8280039, 115.1558519],
        },
        properties: {
          name: 'My Coffee Shop',
          address:
            'Jl. Pura Batu Pageh No.99R, Ungasan, Kec. Kuta Sel., Kabupaten Badung, Bali 80361',
          openingHours: '7am - 9pm',
        },
      },
    ],
  };
  
  // Extract coordinates for Leaflet
  const [latitude, longitude] = dataGeoJSON.features[0].geometry.coordinates;
  const leafletCoordinates: LatLngExpression = [latitude, longitude];
  const { name, address } = dataGeoJSON.features[0]
    .properties as MyGeoJsonProperties;
    
  return (
    <div className="w-full">
      <MapContainer
        className="h-[300px] w-full"
        zoom={13}
        scrollWheelZoom={false}
        center={leafletCoordinates}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={leafletCoordinates} icon={icon}>
          <Popup>
            {name} <br /> {address}
          </Popup>
        </Marker>
        <GeoJSON data={dataGeoJSON} />
      </MapContainer>
    </div>
  );
};
```

#### Funcionalidades:

- **Definição de Tipos**: Utiliza TypeScript para definir tipos para os dados GeoJSON.
  - `FeatureCollection<Point>`: Define a estrutura da coleção de features GeoJSON.
  - `MyGeoJsonProperties`: Interface para as propriedades dos pontos GeoJSON.

- **Dados GeoJSON**: Define um objeto GeoJSON com informações sobre um ponto de interesse.
  - `type`: Tipo da coleção ('FeatureCollection').
  - `features`: Array de features GeoJSON.
  - `geometry`: Define o tipo de geometria e coordenadas.
  - `properties`: Informações adicionais sobre o ponto.

- **Extração de Coordenadas**: Converte as coordenadas do formato GeoJSON para o formato esperado pelo Leaflet.
  - GeoJSON utiliza [longitude, latitude], enquanto Leaflet utiliza [latitude, longitude].

- **GeoJSON Component**: Renderiza os dados GeoJSON no mapa.
  - `data`: Objeto GeoJSON a ser renderizado.

### 3. Mapa com Geoman (`src/lib/components/maps-geoman/index.tsx`)

Este componente estende o mapa com GeoJSON para incluir ferramentas de edição usando o plugin Geoman.

#### Estrutura:

```typescript
import type { FeatureCollection, Point } from 'geojson';
import * as L from 'leaflet';
import type { LatLngExpression } from 'leaflet';
import { useEffect } from 'react';
import {
  MapContainer,
  Marker,
  Popup,
  GeoJSON,
  TileLayer,
  useMap,
} from 'react-leaflet';
import '@geoman-io/leaflet-geoman-free';

interface MyGeoJsonProperties {
  name: string;
  address: string;
  openingHours: string;
}

const AddGeomanControls = () => {
  const map = useMap();

  useEffect(() => {
    map.pm.addControls({
      position: 'topleft',
      drawMarker: true,
      drawPolygon: true,
      drawPolyline: true,
      drawCircle: true,
      drawCircleMarker: true,
      editMode: true,
      dragMode: true,
      cutPolygon: true,
      removalMode: true,
    });

    map.on('pm:create', () => {
      // console.log(e);
    });
  }, [map]);

  return null;
};

const WithGeoman = () => {
  // [Código similar ao componente MapsGeoJSON]
  
  return (
    <div className="w-full">
      <MapContainer
        className="h-[500px] w-full"
        zoom={13}
        scrollWheelZoom={false}
        center={leafletCoordinates}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={leafletCoordinates} icon={icon}>
          <Popup>
            {name} <br /> {address}
          </Popup>
        </Marker>
        <GeoJSON data={dataGeoJSON} />
        <AddGeomanControls />
      </MapContainer>
    </div>
  );
};
```

#### Funcionalidades:

- **AddGeomanControls**: Componente interno que adiciona os controles do Geoman ao mapa.
  - `useMap`: Hook do React Leaflet para acessar a instância do mapa.
  - `useEffect`: Hook React para executar código após a renderização.

- **Configuração do Geoman**: Adiciona controles de edição ao mapa.
  - `position`: Define a posição dos controles no mapa.
  - Várias opções para diferentes ferramentas de desenho e edição.

- **Evento de Criação**: Configura um listener para o evento `pm:create` que é disparado quando um novo elemento é criado no mapa.

## Componentes de Página

### 1. Página Inicial (`src/lib/pages/home/index.tsx`)

Este componente define a página inicial da aplicação, que exibe o mapa básico.

#### Estrutura:

```typescript
'use client';

import type { NextPage } from 'next';
import dynamic from 'next/dynamic';

import SomeText from '@/lib/components/samples/SomeText';

const Home: NextPage = () => {
  const NotSSRMaps = dynamic(() => import('@/lib/components/maps'), {
    ssr: false,
  });

  return (
    <div className="mx-auto flex min-h-[60vh] w-full max-w-screen-lg flex-col items-center justify-center gap-8 text-center">
      <SomeText />
      <NotSSRMaps />
    </div>
  );
};
```

#### Funcionalidades:

- **'use client'**: Diretiva que indica que este componente deve ser renderizado no lado do cliente.

- **Importação Dinâmica**: Utiliza `dynamic` do Next.js para importar o componente de mapa.
  - `ssr: false`: Desativa a renderização no lado do servidor para o componente de mapa.

- **Layout**: Define o layout da página com classes Tailwind CSS.

### 2. Página GeoJSON (`src/lib/pages/geojson/index.tsx`)

Este componente define a página que exibe o mapa com dados GeoJSON.

#### Estrutura:

```typescript
'use client';

import dynamic from 'next/dynamic';

const GeoJSON = () => {
  const NotSSRMaps = dynamic(() => import('@/lib/components/maps-geojson'), {
    ssr: false,
  });
  return (
    <div className="mx-auto flex min-h-[60vh] w-full max-w-screen-lg flex-col items-center justify-center gap-8 text-center">
      <NotSSRMaps />
    </div>
  );
};
```

### 3. Página Geoman (`src/lib/pages/with-geoman/index.tsx`)

Este componente define a página que exibe o mapa com ferramentas de edição Geoman.

#### Estrutura:

```typescript
'use client';

import dynamic from 'next/dynamic';

const WithGeoman = () => {
  const NotSSRMaps = dynamic(() => import('@/lib/components/maps-geoman'), {
    ssr: false,
  });
  return (
    <div className="mx-auto flex min-h-[60vh] w-full max-w-screen-lg flex-col items-center justify-center gap-8 text-center">
      <NotSSRMaps />
    </div>
  );
};
```

## Componentes de Layout

### 1. Layout Principal (`src/lib/components/layout/index.tsx`)

Este componente define a estrutura principal da aplicação, incluindo cabeçalho, barra lateral e rodapé.

#### Estrutura:

```typescript
import type { ReactNode } from 'react';

import { ThemeProvider } from '@/lib/components/theme-provider';

import Footer from './Footer';
import Header from './Header';
import { Sidebar } from './Sidebar';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="flex min-h-screen ">
        <Sidebar />
        <div className="flex w-full flex-col">
          <Header />
          <main className="wrapper flex-grow">{children}</main>
          <Footer />
        </div>
      </div>
    </ThemeProvider>
  );
};
```

#### Funcionalidades:

- **ThemeProvider**: Provedor de tema para a aplicação.
  - `attribute="class"`: Define que o tema será aplicado através de classes CSS.
  - `defaultTheme="system"`: Define o tema padrão como o tema do sistema.
  - `enableSystem`: Permite que o tema seja definido pelo sistema.

- **Estrutura de Layout**: Define a estrutura básica da aplicação.
  - `Sidebar`: Barra lateral com navegação.
  - `Header`: Cabeçalho da aplicação.
  - `main`: Conteúdo principal da página.
  - `Footer`: Rodapé da aplicação.

### 2. Barra Lateral (`src/lib/components/layout/Sidebar.tsx`)

Este componente define a barra lateral de navegação da aplicação.

#### Estrutura:

```typescript
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Button } from '../ui/button';
import { cn } from '@/lib/styles/utils';

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className={cn('w-full max-w-xs border-r pb-12')}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            List Tutorial Maps
          </h2>
          <div className="space-y-1">
            <Link href="/">
              <Button
                variant={pathname === '/' ? 'secondary' : 'ghost'}
                className="w-full justify-start"
              >
                <svg>...</svg>
                Basic Maps
              </Button>
            </Link>
            <Link href="/geojson">
              <Button
                variant={pathname === '/geojson' ? 'secondary' : 'ghost'}
                className="w-full justify-start"
              >
                <svg>...</svg>
                Maps with GeoJSON
              </Button>
            </Link>
            <Link href="/with-geoman">
              <Button
                variant={pathname === '/with-geoman' ? 'secondary' : 'ghost'}
                className="w-full justify-start"
              >
                <svg>...</svg>
                Maps + GeoJSON + Geoman
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
```

#### Funcionalidades:

- **usePathname**: Hook do Next.js para obter o caminho atual da URL.

- **Navegação Condicional**: Destaca o botão correspondente à página atual.
  - `variant={pathname === '/' ? 'secondary' : 'ghost'}`: Aplica estilos diferentes dependendo da página atual.

- **Links de Navegação**: Define links para as diferentes páginas da aplicação.
  - `/`: Página inicial com mapa básico.
  - `/geojson`: Página com mapa GeoJSON.
  - `/with-geoman`: Página com mapa Geoman.

## Integração com Next.js App Router

### 1. Arquivo de Rota da Página Inicial (`src/app/page.tsx`)

```typescript
import Home from '@/lib/pages/home';

export default Home;
```

### 2. Arquivo de Rota da Página GeoJSON (`src/app/geojson/page.tsx`)

```typescript
import GeoJSON from '@/lib/pages/geojson';

export default GeoJSON;
```

### 3. Arquivo de Rota da Página Geoman (`src/app/with-geoman/page.tsx`)

```typescript
import WithGeoman from '@/lib/pages/with-geoman';

export default WithGeoman;
```

### 4. Layout da Aplicação (`src/app/layout.tsx`)

```typescript
import type { Metadata, Viewport } from 'next';

import Layout from '@/lib/components/layout';
import { fontSans } from '@/lib/styles/fonts';
import { cn } from '@/lib/styles/utils';
import 'leaflet/dist/leaflet.css';

import '@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css';
import '@/lib/styles/globals.css';

// [Definições de metadata e viewport]

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable
        )}
      >
        <Layout>{children}</Layout>
      </body>
    </html>
  );
};
```

## Considerações Técnicas

### Renderização no Lado do Cliente

Todos os componentes de mapa são renderizados exclusivamente no lado do cliente usando a função `dynamic` do Next.js com a opção `ssr: false`. Isso é necessário porque a biblioteca Leaflet depende do DOM do navegador, que não está disponível durante a renderização no servidor.

### Gerenciamento de Dependências CSS

O sistema importa os arquivos CSS necessários para o Leaflet e o Geoman no arquivo de layout principal:

```typescript
import 'leaflet/dist/leaflet.css';
import '@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css';
```

### Tipagem com TypeScript

O sistema utiliza TypeScript para fornecer tipagem estática, melhorando a segurança do código e a experiência de desenvolvimento:

```typescript
import type { FeatureCollection, Point } from 'geojson';
import type { LatLngExpression } from 'leaflet';

interface MyGeoJsonProperties {
  name: string;
  address: string;
  openingHours: string;
}
```

### Estilização com Tailwind CSS

O sistema utiliza Tailwind CSS para estilização, aplicando classes utilitárias diretamente nos elementos:

```typescript
<div className="mx-auto flex min-h-[60vh] w-full max-w-screen-lg flex-col items-center justify-center gap-8 text-center">
```

## Conclusão

Esta documentação forneceu uma visão detalhada dos principais componentes do sistema NextJS-Leaflet, explicando sua estrutura, funcionalidades e como eles se integram. Estes componentes demonstram como implementar mapas interativos em aplicações Next.js, utilizando diferentes níveis de complexidade, desde mapas básicos até mapas com ferramentas avançadas de edição.
