# Architecture Overview

## Frontend Architecture

### Component Structure

The frontend follows a **modular, component-based architecture** with clear separation of concerns:

```
src/
├── components/          # Presentational components
│   ├── Header.tsx       # App header
│   ├── Footer.tsx       # App footer
│   ├── IndicatorCard.tsx      # Single indicator card
│   ├── IndicatorCards.tsx     # Container for all indicator cards
│   ├── WeightSlider.tsx       # Single weight slider
│   ├── WeightSliders.tsx      # Container for all sliders
│   ├── RankingsTable.tsx      # Rankings table component
│   └── FormulaSection.tsx     # Formula display
├── services/            # API service layer
│   └── api.ts          # API client and endpoints
├── hooks/              # Custom React hooks
│   └── useRankings.ts  # Rankings data management hook
├── types/              # TypeScript definitions
│   └── index.ts        # All type definitions
├── utils/              # Utility functions
│   ├── calculations.ts # Calculation utilities
│   └── ratings.ts      # Rating utilities
└── App.tsx             # Main app orchestrator
```

### Design Principles

1. **Single Responsibility**: Each component has one clear purpose
2. **Separation of Concerns**: 
   - UI components don't handle API calls
   - Business logic is in hooks
   - API calls are in services
   - Calculations are pure functions
3. **Reusability**: Components are composable and reusable
4. **Type Safety**: Full TypeScript coverage
5. **Scalability**: Easy to add new features or indicators

### Data Flow

```
User Interaction
    ↓
Component (WeightSlider)
    ↓
App.tsx (handleWeightChange)
    ↓
State Update (weights)
    ↓
useRankings Hook
    ↓
API Service (calculateRankings)
    ↓
Backend API
    ↓
Response → Hook → Component → UI Update
```

### Benefits

- **Maintainability**: Easy to find and modify code
- **Testability**: Each layer can be tested independently
- **Scalability**: Add new features without affecting existing code
- **Readability**: Clear structure makes code easy to understand
- **Reusability**: Components and utilities can be reused

