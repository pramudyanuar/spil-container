import { Checkbox } from '@/components/ui/checkbox'

interface PalletsOptionProps {
  usePallets: boolean
  onUsePalletsChange: (use: boolean) => void
}

export function PalletsOption({ usePallets, onUsePalletsChange }: PalletsOptionProps) {
  return (
    <div className="flex items-center gap-2 pt-2">
      <Checkbox
        checked={usePallets}
        onChange={(checked) => onUsePalletsChange(checked)}
      />
      <label className="text-sm">Use pallets</label>
      <span className="text-gray-400">?</span>
    </div>
  )
}
