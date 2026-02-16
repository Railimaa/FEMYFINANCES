# Revisão de Código: Dashboard e SideBar

## 📋 Resumo Executivo

Este documento contém a revisão de código da implementação do Dashboard (página de gráficos) e do componente SideBar no projeto FEMYFINANCES.

**Status Geral**: ✅ Implementação sólida com alguns pontos de melhoria

**Componentes Revisados**:
- `src/ui/components/SideBar.tsx` - Componente de navegação lateral
- `src/ui/components/Header.tsx` - Cabeçalho com menu e perfil
- `src/ui/pages/Chart/` - Página do Dashboard com gráficos

---

## 🎯 Pontos Positivos

### 1. **Arquitetura e Organização**
- ✅ Excelente separação de responsabilidades
- ✅ Uso de hooks customizados para lógica de negócio
- ✅ Componentes modulares e reutilizáveis
- ✅ TypeScript com tipagem adequada

### 2. **Experiência do Usuário**
- ✅ Animações suaves com Framer Motion
- ✅ Estados de loading e erro bem implementados
- ✅ Design responsivo para mobile e desktop
- ✅ Feedback visual para ações do usuário

### 3. **Qualidade do Código**
- ✅ TypeScript type checking passa sem erros
- ✅ Prettier formatting está correto
- ✅ Uso de React Query para cache e gerenciamento de estado
- ✅ Hooks otimizados com useCallback e useMemo

---

## ⚠️ Problemas Identificados

### 🔴 Crítico - Acessibilidade no SideBar

**Arquivo**: `src/ui/components/SideBar.tsx`

**Linha 78-82**: O backdrop do modal não tem suporte para teclado
```tsx
// eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
<div
  className="..."
  onClick={handleToggleOpen}
  slot="button"  // ❌ atributo inválido
>
```

**Problemas**:
1. ESLint desabilitado sem implementar alternativa
2. Usuários de teclado não conseguem fechar o modal clicando no backdrop
3. `slot="button"` é um atributo HTML inválido para `<div>`
4. Falta focus trap - usuários podem navegar para elementos fora do modal

**Recomendação**:
```tsx
<div
  className="..."
  onClick={handleToggleOpen}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleToggleOpen();
    }
  }}
  role="button"
  tabIndex={0}
  aria-label="Fechar menu de navegação"
>
```

### 🟡 Alto - IDs Dinâmicos no SideBar

**Arquivo**: `src/ui/components/SideBar.tsx`

**Linha 54**: Gerando IDs aleatórios em cada render
```tsx
const links = [
  {
    id: Math.random(),  // ❌ Novo ID a cada render
    to: routes.home,
    icon: <House size={20} />,
    description: 'Inicio',
  },
  // ...
];
```

**Problema**: 
- React recria os elementos a cada render
- Pode causar problemas de performance com muitas re-renderizações
- Animações podem comportar-se de forma inesperada

**Recomendação**:
```tsx
const links = useMemo(() => [
  {
    id: 'home',  // ID estável
    to: routes.home,
    icon: <House size={20} />,
    description: 'Inicio',
  },
  {
    id: 'dashboard',
    to: routes.dashboard,
    icon: <ChartColumn size={20} />,
    description: 'Dashboards',
  },
  {
    id: 'profile',
    to: routes.myProfile,
    icon: <User size={20} />,
    description: 'Meu Perfil',
  },
], []);
```

### 🟡 Alto - Atributos ARIA Faltantes

**Arquivo**: `src/ui/components/SideBar.tsx` e `src/ui/components/Header.tsx`

**SideBar - Linha 98-128**: Faltam atributos ARIA para navegação
```tsx
<div className="flex flex-col items-center gap-3">  // ❌ Sem role="navigation"
  {links.map(({ id, to, description, icon }, index) => (
    // ...
  ))}
</div>
```

**Header - Linha 102**: Botão do menu sem ARIA
```tsx
<Button variant="ghost" onClick={handleToggleSideBar} type="button">
  <MenuIcon />  // ❌ Sem aria-label ou aria-expanded
</Button>
```

**Recomendação**:
```tsx
// No SideBar
<nav 
  className="flex flex-col items-center gap-3"
  aria-label="Navegação principal"
>

// No Header
<Button 
  variant="ghost" 
  onClick={handleToggleSideBar} 
  type="button"
  aria-label="Abrir menu de navegação"
  aria-expanded={open}
  aria-controls="sidebar-navigation"
>
  <MenuIcon />
</Button>
```

### 🟡 Médio - Cache Infinito no React Query

**Arquivo**: `src/ui/pages/Chart/hooks/useGetTransactionsChart.ts`

**Linha 15**: Cache nunca expira
```tsx
staleTime: Infinity,  // ⚠️ Dados nunca são considerados obsoletos
```

**Problema**:
- Dados financeiros podem ficar desatualizados
- Usuário não vê mudanças feitas em outras abas/dispositivos
- Apenas refetch manual atualiza os dados

**Recomendação**:
```tsx
staleTime: 1000 * 60 * 5, // 5 minutos
// ou
staleTime: 0, // Sempre considera dados como possivelmente obsoletos
refetchOnWindowFocus: true, // Atualiza ao voltar para a aba
```

### 🟡 Médio - Manipulação Direta do DOM

**Arquivo**: `src/ui/components/SideBar.tsx`

**Linha 40-49**: Manipulando styles do body diretamente
```tsx
useEffect(() => {
  if (open) {
    document.body.style.overflowY = 'hidden';  // ⚠️ Manipulação direta
  } else {
    document.body.style.overflowY = 'visible';
  }

  return () => {
    document.body.style.overflowY = '';
  };
}, [open]);
```

**Problema**:
- Pode conflitar com outros componentes que manipulam o scroll
- Dificulta testes
- Não segue as melhores práticas do React

**Recomendação**:
```tsx
// Usar classes CSS do Tailwind
useEffect(() => {
  if (open) {
    document.body.classList.add('overflow-hidden');
  } else {
    document.body.classList.remove('overflow-hidden');
  }

  return () => {
    document.body.classList.remove('overflow-hidden');
  };
}, [open]);
```

### 🟢 Baixo - Dependência Duplicada no useEffect

**Arquivo**: `src/ui/components/SideBar.tsx`

**Linha 26-38**: `open` na dependência, mas função não usa
```tsx
useEffect(() => {
  function handleClose(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  document.addEventListener('keydown', handleClose);

  return () => {
    document.removeEventListener('keydown', handleClose);
  };
}, [open]);  // ⚠️ Não precisa de 'open' aqui
```

**Recomendação**:
```tsx
}, []); // Remover 'open' das dependências
```

### 🟢 Baixo - Hardcoded Z-Index

**Arquivo**: `src/ui/components/SideBar.tsx` e `src/ui/components/Header.tsx`

**Problema**: Valores de z-index espalhados sem organização
- Header: `z-[1000]`
- HeaderProfile dropdown: `z-[1001]`
- SideBar backdrop: `z-[2000]`
- SideBar drawer: `z-[2001]`

**Recomendação**: Criar sistema de z-index no Tailwind config
```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      zIndex: {
        'header': '1000',
        'dropdown': '1100',
        'modal-backdrop': '2000',
        'modal': '2100',
      }
    }
  }
}
```

### 🟢 Baixo - Divisão por Zero

**Arquivo**: `src/ui/pages/Chart/components/CardIncomeExpenseContent.tsx`

**Linha 42-44** (aproximado): Cálculo de economia
```tsx
const economy = totals.income > 0 
  ? ((totals.income - totals.expense) / totals.income) * 100 
  : 0;
```

**Observação**: Já está tratado corretamente, mas poderia ter comentário explicativo

### 🟢 Baixo - Gráfico de Pizza Limita Top 5

**Arquivo**: `src/ui/pages/Chart/components/PierChart.tsx`

**Problema**: Mostra apenas top 5 categorias sem indicar que há mais

**Recomendação**: Adicionar categoria "Outros" para agregar o resto

---

## 🔧 Melhorias Sugeridas

### 1. **Implementar Focus Trap no Modal**

Adicionar biblioteca como `focus-trap-react`:
```tsx
import FocusTrap from 'focus-trap-react';

// No SideBar
<FocusTrap active={open}>
  <motion.div className="...">
    {/* conteúdo do sidebar */}
  </motion.div>
</FocusTrap>
```

### 2. **Adicionar Testes**

Não foram encontrados testes no repositório. Sugestões:
- Testes unitários para hooks customizados
- Testes de integração para componentes principais
- Testes de acessibilidade com jest-axe

### 3. **Melhorar Error Handling**

No ChartBar, a mensagem de erro é genérica:
```tsx
{isError && (
  <div className="flex justify-center items-center flex-col gap-1">
    <p className="text-xl font-semibold tracking-tight">
      Ops... Ocorreu um erro  {/* ⚠️ Muito genérico */}
    </p>
    <Button onClick={refetchTransactions}>Tentar Novamente</Button>
  </div>
)}
```

**Sugestão**: Mostrar mensagem mais específica ou código de erro

### 4. **Internacionalização (i18n)**

Todos os textos estão hardcoded em português. Para escalabilidade:
- Considerar adicionar `react-i18next` ou similar
- Separar strings em arquivos de tradução

### 5. **Performance - Memoização do HeaderProfile**

**Arquivo**: `src/ui/components/Header.tsx`

```tsx
// Memoizar o componente
const HeaderProfile = memo(function HeaderProfile({
  user,
  theme,
  toogleTheme,
  signOut,
}: {
  user: UserType;
  theme: Theme;
  toogleTheme: () => void;
  signOut: () => void;
}) {
  // ...
});
```

### 6. **Type Safety - Evitar Redundância**

**Arquivo**: `src/ui/pages/Chart/components/ChartBar.tsx`

**Linha 40 e 59**: `typeCategoryTransaction` é atribuído mas não usado consistentemente
```tsx
const byMonth = new Map<
  string,
  {
    month: string;
    Receitas: number;
    Despesas: number;
    typeCategoryTransaction: 'INCOME' | 'EXPENSE';  // ⚠️ Não usado após agregação
  }
>();
```

**Sugestão**: Remover se não for necessário ou documentar o propósito

---

## 📊 Resumo de Prioridades

| Prioridade | Quantidade | Tempo Estimado |
|-----------|-----------|----------------|
| 🔴 Crítico | 1 | 2-3 horas |
| 🟡 Alto | 3 | 3-4 horas |
| 🟢 Baixo | 4 | 2-3 horas |

**Total estimado**: 7-10 horas de trabalho

---

## ✅ Checklist de Ação

### Imediato (Sprint Atual)
- [ ] Corrigir acessibilidade do backdrop do SideBar
- [ ] Adicionar atributos ARIA no SideBar e Header
- [ ] Implementar IDs estáveis para os links
- [ ] Adicionar focus trap no modal

### Curto Prazo (Próxima Sprint)
- [ ] Ajustar staleTime do React Query
- [ ] Refatorar manipulação de scroll para usar classes CSS
- [ ] Organizar z-index no Tailwind config
- [ ] Adicionar testes unitários básicos

### Médio Prazo (Backlog)
- [ ] Implementar internacionalização
- [ ] Melhorar mensagens de erro
- [ ] Adicionar categoria "Outros" nos gráficos de pizza
- [ ] Documentar componentes com Storybook

---

## 🎓 Lições Aprendidas

1. **Acessibilidade é fundamental**: Sempre implementar suporte para teclado e screen readers
2. **React Query Cache**: Avaliar `staleTime` baseado no tipo de dados
3. **Manipulação de DOM**: Preferir soluções React-native quando possível
4. **IDs Estáveis**: Crucial para performance e animações corretas

---

## 📝 Conclusão

A implementação do Dashboard e SideBar está **bem estruturada e funcional**. O código demonstra boas práticas de React e TypeScript, com separação adequada de responsabilidades.

Os problemas identificados são majoritariamente relacionados a:
- **Acessibilidade** (principal área de melhoria)
- **Performance** (otimizações menores)
- **Manutenibilidade** (organização de constantes)

**Recomendação**: Priorizar as correções de acessibilidade antes de lançar para produção, pois impactam usuários com deficiências.

---

**Revisado por**: GitHub Copilot Code Review Agent  
**Data**: 2026-02-16  
**Versão**: 1.0
