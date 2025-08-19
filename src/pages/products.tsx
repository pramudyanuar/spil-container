import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { ProductsHeader } from '@/components/products/ProductsHeader'
import { ProductGroupComponent } from '@/components/products/ProductGroupComponent'
import { useProductOperations } from '@/hooks/useProductOperations'

export function ProductsPage() {
  const {
    groups,
    isLoading,
    loadGroups,
    addGroup,
    deleteGroup,
    updateGroup,
    addProduct,
    updateProduct,
    deleteProduct,
    duplicateProduct,
    exportGroups,
    importGroups
  } = useProductOperations()

  useEffect(() => {
    loadGroups()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
    <div className="space-y-6 px-8 py-6 max-w-6xl mx-auto">
      <ProductsHeader
        onAddGroup={addGroup}
        onExport={exportGroups}
        onImport={handleImport}
        isLoading={isLoading}
      />

      {/* Groups */}
      <div className="space-y-6">
        {groups.map((group) => (
          <ProductGroupComponent
            key={group.id}
            group={group}
            onDeleteGroup={deleteGroup}
            onUpdateGroup={updateGroup}
            onAddProduct={addProduct}
            onUpdateProduct={updateProduct}
            onDeleteProduct={deleteProduct}
            onDuplicateProduct={duplicateProduct}
          />
        ))}
      </div>

      {groups.length === 0 && !isLoading && (
        <div className="text-center py-16 border rounded-lg">
          <p className="text-muted-foreground mb-4 text-lg">No product groups found</p>
          <Button onClick={addGroup} className="bg-blue-500 hover:bg-blue-600">
            Add Your First Group
          </Button>
        </div>
      )}
    </div>
  )
}
