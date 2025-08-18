import { Button } from '@/components/ui/button'
import { Plus, Import, Download } from 'lucide-react'

interface ProductsHeaderProps {
  onAddGroup: () => void
  onExport: () => void
  onImport: () => void
  isLoading?: boolean
}

export function ProductsHeader({ onAddGroup, onExport, onImport, isLoading }: ProductsHeaderProps) {
  return (
    <div className="flex justify-between items-center">
      <Button onClick={onAddGroup} className="bg-blue-500 hover:bg-blue-600" disabled={isLoading}>
        <Plus className="w-4 h-4" />
        Add Group
      </Button>
      <div className="flex gap-2">
        <Button 
          variant="outline" 
          className="text-green-600 border-green-200"
          onClick={onImport}
          disabled={isLoading}
        >
          <Import className="w-4 h-4" />
          Import
        </Button>
        <Button 
          variant="outline" 
          className="text-blue-600 border-blue-200"
          onClick={onExport}
          disabled={isLoading}
        >
          <Download className="w-4 h-4" />
          Export
        </Button>
      </div>
    </div>
  )
}
