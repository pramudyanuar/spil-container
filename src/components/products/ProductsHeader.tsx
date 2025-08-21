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
    <div className="flex justify-between items-center p-4 bg-gray-800 dark:bg-gray-800 rounded-lg">
      <Button onClick={onAddGroup} className="bg-[#3A9542] hover:bg-[#2d7233]" disabled={isLoading}>
        <Plus className="w-4 h-4" />
        Tambah Grup
      </Button>
      <div className="flex gap-2">
        <Button 
          variant="outline" 
          className="text-[#3A9542] border-[#3A9542] hover:bg-[#3A9542] hover:text-white bg-gray-700"
          onClick={onImport}
          disabled={isLoading}
        >
          <Import className="w-4 h-4" />
          Import
        </Button>
        <Button 
          variant="outline" 
          className="text-[#3A9542] border-[#3A9542] hover:bg-[#3A9542] hover:text-white bg-gray-700"
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
