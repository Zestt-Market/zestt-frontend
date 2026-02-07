Zest Front‑end Restructuring Guide
Current context and identified issues

The zestt-frontend repository implements navigation and category filtering in a very simplified way. The top navigation bar lists many categories ("Política", "Esportes", "Crypto", "Finanças", etc.), but most of them only invoke a local filter and do not lead to a dedicated route. The only case where a real navigation happens is when clicking Esportes, which uses router.push('/sports') to open app/sports/page.tsx, while every other category just calls setCategoryFilter and switches the view state to “MARKETS”. In addition:

The view state (an enum called ViewState) controls the entire navigation within AppContainer, keeping a single page with many conditional views. This diverges from Next.js’ file‑based routing paradigm and makes it hard to share meaningful URLs or reload to the same screen.

The MarketContext implements a real filter only for the Esportes category—when categoryFilter === 'Esportes' it serves World Cup mock data—and ignores all other categories, always returning the full list of markets. This contributes to the impression that the category buttons “don’t work”.

Navigation uses buttons (<button>), not Next.js links. This prevents native link behavior, such as opening in a new tab and proper browser history.

There are two header components (Header.tsx and Layout/Header.tsx) with similar navigation logic, duplicating code and making maintenance harder.

Recommended architecture and routing patterns

To improve the project structure and align it with patterns used in projects like Moneyzi, reorganize routes and components as follows:

Adopt Next.js file‑based routing: instead of controlling navigation through internal state, create pages under app/ for each area of the application. For example:

app/home/page.tsx or app/page.tsx for the home page.

app/markets/page.tsx for listing all markets.

app/category/[slug]/page.tsx for each category. The slug parameter can take values like politica, esportes, crypto, etc., giving each category its own URL (/category/politica).

app/markets/[id]/page.tsx for market details. This route already exists implicitly via router.push(/markets/${marketId}) in the Sports component.

Generate category pages dynamically: create a app/category/[slug]/page.tsx component that uses getMarkets() or MarketContext to filter markets based on the slug. You can map slug to the displayed category (e.g. 'politica' → 'Política') and filter the markets list by the market.category property. This way all categories will behave consistently instead of only “Esportes”.

Use Next.js Link components: replace navigation <button> elements with <Link href="..."> elements for each category. This enables standard link behaviour and improves accessibility. Navigation items can be defined in an array of objects containing label and href, then iterated to render the links. For future features (e.g. “Ranking”), keep a button or create a link to a placeholder page.

Centralize category data: instead of hard‑coding the list of categories in each header component, create a file like src/constants/categories.ts or fetch categories dynamically from the Kalshi API. This keeps the navigation bar and category filters in sync with the actual available categories.

Refactor MarketContext:

Complete filtering: replace the logic that only handles “Esportes” with a function that filters markets by the given category, e.g. markets.filter(m => m.category === categoryFilter) for all categories. Keep the special “Esportes” logic using mock data if needed, but add filters for the remaining categories.

Method to fetch markets by category: expose a getMarketsByCategory(slug) function that can be used by server components or pages. Category pages can then be server components that call this function and pass the data to a client component for rendering, following the server‑actions pattern used in Moneyzi (functions with 'use server').

Separate server and client components: Next.js 14 allows separating server components (for data fetching) and client components (for state and interactions). Move data fetching and authentication logic into server components (for example, category pages can be server components executing getMarketsByCategory()), and pass the results to client components. This separation improves performance and SEO.

Remove AppContainer as the sole orchestrator: when file‑based routing is implemented, the large AppContainer.tsx is no longer necessary. Each page can handle its own navigation and layout. Shared components, such as the header and context providers (AuthProvider, MarketProvider, etc.), should remain in src/Providers.tsx and be used in layout.tsx to wrap all pages.

Additional best practices

Componentization and reuse: break long components (like Header.tsx) into smaller sub‑components for each responsibility (navigation, avatar, user menu, category list). This simplifies testing and maintenance.

Avoid duplication: unify the two header versions (src/components/Header.tsx and src/components/Layout/Header.tsx) into a single configurable component to avoid maintaining two nearly identical implementations.

Remove console.log debugging statements: the codebase contains many console logs (e.g. console.log('💰 Balance atualizado:', balance)). Remove these or replace them with a logger that is disabled in production to avoid console clutter.

Tailwind and design tokens: continue using the design system and Tailwind CSS. Define consistent utility classes and avoid inline styles. Use the tokens defined in src/design-system/tokens.ts for repeated colors and spacing values.

Minimize global state: avoid storing too much data in contexts. For example, the AuthContext currently contains user synchronization and simulated payment logic, which could be moved to server actions or dedicated hooks.

Conclusion

The Zestt Front project uses Next.js but still behaves like a traditional SPA, centralizing navigation in internal state and using buttons instead of routes. By reorganizing the project to follow file‑based routing, creating pages for each category and using appropriate links, the user experience will improve significantly. Additionally, filtering markets by category and removing component duplication will make the code cleaner, more scalable and aligned with best practices demonstrated in reference projects like Moneyzi.