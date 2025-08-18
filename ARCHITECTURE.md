# Container Stuffing Optimization - Clean Architecture

## Architecture Overview

This project has been refactored to follow clean architecture principles with clear separation of concerns between presentation logic and data layer.

## Directory Structure

```
src/
├── components/           # Reusable UI components
│   ├── products/        # Product-specific components
│   │   ├── ProductsHeader.tsx
│   │   ├── ProductGroupComponent.tsx
│   │   └── PalletsOption.tsx
│   ├── ui/              # Generic UI components
│   └── layout/          # Layout components
├── context/             # Global state management
│   └── AppContext.tsx   # Main application context
├── hooks/               # Custom hooks for state and business logic
│   ├── useAppState.ts   # App state selectors and actions
│   ├── useProductOperations.ts  # Product business logic
│   └── useContainerOperations.ts # Container business logic
├── services/            # Data layer - API calls and data management
│   ├── productService.ts
│   └── containerService.ts
├── types/               # TypeScript type definitions
│   ├── product.ts
│   └── container.ts
├── constants/           # Application constants
│   └── app.ts
├── pages/               # Page components (presentation layer)
│   ├── landing.tsx
│   ├── products.tsx
│   ├── containers-trucks.tsx
│   └── stuffing-result.tsx
└── utils/               # Utility functions
```

## Architecture Layers

### 1. Data Layer (`/services`)
- **Purpose**: Handles data persistence, API calls, and data transformation
- **Files**: `productService.ts`, `containerService.ts`
- **Responsibilities**:
  - CRUD operations for products and groups
  - Mock API implementations (ready for real API integration)
  - Data validation and transformation
  - Export/Import functionality

### 2. State Management (`/context`, `/hooks`)
- **Context**: Global state management using React Context API
- **Custom Hooks**: 
  - `useAppState.ts`: State selectors and actions
  - `useProductOperations.ts`: Product-related business logic
  - `useContainerOperations.ts`: Container and optimization logic

### 3. Business Logic Layer (`/hooks`)
- **Purpose**: Contains application business rules and logic
- **Features**:
  - Product CRUD operations
  - Container optimization calculations
  - Error handling and loading states
  - Data validation

### 4. Presentation Layer (`/components`, `/pages`)
- **Components**: Reusable, pure UI components focused on presentation
- **Pages**: Main application views that orchestrate components and business logic
- **Features**:
  - Clean separation from business logic
  - Reusable component design
  - Proper prop interfaces

## Key Benefits of This Architecture

### ✅ Separation of Concerns
- **Data Layer**: Isolated API calls and data management
- **Business Logic**: Centralized in custom hooks
- **Presentation**: Clean, focused UI components

### ✅ Testability
- Each layer can be tested independently
- Services can be mocked easily
- Business logic is isolated from UI

### ✅ Maintainability
- Clear file organization
- Single responsibility principle
- Easy to locate and modify functionality

### ✅ Scalability
- Easy to add new features
- Simple to replace mock services with real APIs
- Component reusability

### ✅ Type Safety
- Comprehensive TypeScript types
- Interface definitions for all data structures
- Compile-time error catching

## Usage Examples

### Adding a New Product Operation

1. **Add to Service Layer** (`productService.ts`):
```typescript
async moveProduct(fromGroupId: string, toGroupId: string, productId: string): Promise<boolean> {
  // Implementation
}
```

2. **Add to Business Logic** (`useProductOperations.ts`):
```typescript
const moveProduct = useCallback(async (fromGroupId: string, toGroupId: string, productId: string) => {
  try {
    const success = await productService.moveProduct(fromGroupId, toGroupId, productId)
    if (success) {
      // Update state
    }
  } catch (error) {
    setError(error.message)
  }
}, [/* dependencies */])
```

3. **Use in Component**:
```typescript
const { moveProduct } = useProductOperations()
// Use moveProduct in event handlers
```

### Adding Real API Integration

Replace the mock service methods with actual API calls:

```typescript
// In productService.ts
async getGroups(): Promise<ProductGroup[]> {
  const response = await fetch('/api/product-groups')
  return response.json()
}
```

## Future Enhancements

- **State Persistence**: Add localStorage or sessionStorage persistence
- **Caching**: Implement React Query for better data fetching
- **Real-time Updates**: WebSocket integration for live updates
- **Advanced Optimization**: More sophisticated container optimization algorithms
- **User Management**: Authentication and user-specific data
- **Audit Trail**: Track changes and history

## Migration from Old Architecture

The refactoring included:

1. **Extracted** inline state management to centralized context
2. **Separated** business logic from presentation components
3. **Created** service layer for data operations
4. **Organized** code by feature and responsibility
5. **Added** proper TypeScript typing throughout
6. **Implemented** error handling and loading states

This architecture provides a solid foundation for scaling the application while maintaining code quality and developer experience.
