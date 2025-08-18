import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { ProductsHeader } from '@/components/products/ProductsHeader'
import { ProductGroupComponent } from '@/components/products/ProductGroupComponent'
import { PalletsOption } from '@/components/products/PalletsOption'
import { useProductOperations } from '@/hooks/useProductOperations'
import { useUsePallets, useAppActions } from '@/hooks/useAppState'

export function ProductsPage() {
  const {
    groups,
    isLoading,
    loadGroups,
    addGroup,
    deleteGroup,
    addProduct,
    updateProduct,
    deleteProduct,
    duplicateProduct,
    exportGroups,
    importGroups
  } = useProductOperations()
  
  const usePallets = useUsePallets()
  const { setUsePallets } = useAppActions()

  useEffect(() => {
    loadGroups()
  }, [loadGroups])

  const handleImport = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.json'
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
          const data = e.target?.result as string
          if (data) {
            importGroups(data)
          }
        }
        reader.readAsText(file)
      }
    }
    input.click()
  }

  if (isLoading && groups.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading products...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 p-6">
      <ProductsHeader
        onAddGroup={addGroup}
        onExport={exportGroups}
        onImport={handleImport}
        isLoading={isLoading}
      />

      {/* Groups */}
      {groups.map((group) => (
        <div key={group.id} className="space-y-4">
          <ProductGroupComponent
            group={group}
            onDeleteGroup={deleteGroup}
            onAddProduct={addProduct}
            onUpdateProduct={updateProduct}
            onDeleteProduct={deleteProduct}
            onDuplicateProduct={duplicateProduct}
          />
          
          <PalletsOption
            usePallets={usePallets}
            onUsePalletsChange={setUsePallets}
          />
        </div>
      ))}

      {groups.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">No product groups found</p>
          <Button onClick={addGroup} className="bg-blue-500 hover:bg-blue-600">
            Add Your First Group
          </Button>
        </div>
      )}
    </div>
  )
}
