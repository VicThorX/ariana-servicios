# Graph Report - .  (2026-07-14)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 166 nodes · 249 edges · 19 communities (13 shown, 6 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `2946c297`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_IEmailService|IEmailService]]
- [[_COMMUNITY_compilerOptions|compilerOptions]]
- [[_COMMUNITY_page.tsx|page.tsx]]
- [[_COMMUNITY_devDependencies|devDependencies]]
- [[_COMMUNITY_layout.tsx|layout.tsx]]
- [[_COMMUNITY_order.ts|order.ts]]
- [[_COMMUNITY_dependencies|dependencies]]
- [[_COMMUNITY_career.ts|career.ts]]
- [[_COMMUNITY_contact.ts|contact.ts]]
- [[_COMMUNITY_ContactRequest|ContactRequest]]
- [[_COMMUNITY_Reviews.tsx|Reviews.tsx]]
- [[_COMMUNITY_eslint.config.mjs|eslint.config.mjs]]
- [[_COMMUNITY_next.config.ts|next.config.ts]]
- [[_COMMUNITY_postcss.config.mjs|postcss.config.mjs]]

## God Nodes (most connected - your core abstractions)
1. `IEmailService` - 17 edges
2. `compilerOptions` - 16 edges
3. `CareerRequest` - 10 edges
4. `OrderRequest` - 10 edges
5. `QuoteRequest` - 10 edges
6. `MockEmailService` - 9 edges
7. `ResendEmailService` - 9 edges
8. `ContactRequest` - 7 edges
9. `scripts` - 5 edges
10. `submitCareerForm()` - 4 edges

## Surprising Connections (you probably didn't know these)
- `MockEmailService` --implements--> `IEmailService`  [EXTRACTED]
  src/core/infrastructure/services/MockEmailService.ts → src/core/domain/models/Contact.ts
- `ResendEmailService` --implements--> `IEmailService`  [EXTRACTED]
  src/core/infrastructure/services/ResendEmailService.ts → src/core/domain/models/Contact.ts
- `CareersPage()` --calls--> `submitCareerForm()`  [EXTRACTED]
  src/app/trabaja-con-nosotros/page.tsx → src/app/actions/career.ts
- `ProductsCatalogPage()` --calls--> `submitOrderForm()`  [EXTRACTED]
  src/app/productos/page.tsx → src/app/actions/order.ts
- `CartItem` --inherits--> `Product`  [EXTRACTED]
  src/app/productos/page.tsx → src/data/products.ts

## Import Cycles
- 1-file cycle: `src/data/products.ts -> src/data/products.ts`

## Communities (19 total, 6 thin omitted)

### Community 0 - "IEmailService"
Cohesion: 0.19
Nodes (8): CareerRequest, IEmailService, OrderRequest, QuoteRequest, resend, SubmitCareerRequestUseCase, SubmitOrderRequestUseCase, SubmitQuoteRequestUseCase

### Community 1 - "compilerOptions"
Cohesion: 0.10
Nodes (19): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+11 more)

### Community 3 - "devDependencies"
Cohesion: 0.11
Nodes (17): devDependencies, eslint, eslint-config-next, tailwindcss, @tailwindcss/postcss, @types/node, @types/react, @types/react-dom (+9 more)

### Community 4 - "layout.tsx"
Cohesion: 0.15
Nodes (7): metadata, quicksand, Footer(), LogoProps, ThemeProvider(), ThemeToggle(), WhatsAppButton()

### Community 5 - "order.ts"
Cohesion: 0.36
Nodes (7): getOrderUseCase(), submitOrderForm(), CartItem, ProductsCatalogPage(), OrderItem, catalogProducts, Product

### Community 6 - "dependencies"
Cohesion: 0.22
Nodes (9): dependencies, framer-motion, lucide-react, next, next-themes, react, react-dom, resend (+1 more)

### Community 7 - "career.ts"
Cohesion: 0.31
Nodes (4): getCareerUseCase(), submitCareerForm(), CareersPage(), MockEmailService

### Community 8 - "contact.ts"
Cohesion: 0.28
Nodes (3): getQuoteUseCase(), submitQuoteForm(), ResendEmailService

## Knowledge Gaps
- **49 isolated node(s):** `eslintConfig`, `nextConfig`, `name`, `version`, `private` (+44 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **6 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `IEmailService` connect `IEmailService` to `contact.ts`, `ContactRequest`, `career.ts`?**
  _High betweenness centrality (0.042) - this node is a cross-community bridge._
- **Why does `ResendEmailService` connect `contact.ts` to `IEmailService`, `ContactRequest`, `order.ts`, `career.ts`?**
  _High betweenness centrality (0.030) - this node is a cross-community bridge._
- **Why does `MockEmailService` connect `career.ts` to `contact.ts`, `IEmailService`, `order.ts`, `ContactRequest`?**
  _High betweenness centrality (0.030) - this node is a cross-community bridge._
- **What connects `eslintConfig`, `nextConfig`, `name` to the rest of the system?**
  _49 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `compilerOptions` be split into smaller, more focused modules?**
  _Cohesion score 0.1 - nodes in this community are weakly interconnected._
- **Should `page.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.1111111111111111 - nodes in this community are weakly interconnected._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.1111111111111111 - nodes in this community are weakly interconnected._