export function StuffingResultPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center">Stuffing Result</h2>
      <div className="max-w-4xl mx-auto">
        <p className="text-muted-foreground text-center mb-6">
          Review your stuffing optimization results
        </p>
        
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 dark:text-blue-100">Total Containers</h3>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">3</p>
          </div>
          <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
            <h3 className="font-semibold text-green-900 dark:text-green-100">Space Utilization</h3>
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">85%</p>
          </div>
          <div className="bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
            <h3 className="font-semibold text-purple-900 dark:text-purple-100">Total Cost</h3>
            <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">$2,450</p>
          </div>
        </div>

        {/* Container Details */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Container Assignment Details</h3>
          
          <div className="border rounded-lg overflow-hidden">
            <div className="bg-muted/50 px-4 py-3 border-b">
              <h4 className="font-medium">Container #1 - 40ft High Cube</h4>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium mb-2">Assigned Products:</p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Electronics Package A (15 units)</li>
                    <li>• Electronics Package B (8 units)</li>
                    <li>• Accessories Set (25 units)</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium mb-2">Utilization:</p>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '92%' }}></div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">92% filled</p>
                </div>
              </div>
            </div>
          </div>

          <div className="border rounded-lg overflow-hidden">
            <div className="bg-muted/50 px-4 py-3 border-b">
              <h4 className="font-medium">Container #2 - 40ft Standard</h4>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium mb-2">Assigned Products:</p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Clothing Set A (50 units)</li>
                    <li>• Clothing Set B (30 units)</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium mb-2">Utilization:</p>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '78%' }}></div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">78% filled</p>
                </div>
              </div>
            </div>
          </div>

          <div className="border rounded-lg overflow-hidden">
            <div className="bg-muted/50 px-4 py-3 border-b">
              <h4 className="font-medium">Container #3 - 20ft Standard</h4>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium mb-2">Assigned Products:</p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Sports Equipment (12 units)</li>
                    <li>• Home Goods (18 units)</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium mb-2">Utilization:</p>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">85% filled</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
