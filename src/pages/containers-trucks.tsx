export function ContainersTrucksPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center">Containers & Trucks</h2>
      <div className="max-w-4xl mx-auto">
        <p className="text-muted-foreground text-center mb-6">
          Choose your containers and trucks for transportation
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Containers Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Available Containers</h3>
            <div className="space-y-3">
              <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">20ft Standard Container</h4>
                    <p className="text-sm text-muted-foreground">Dimensions: 20' x 8' x 8'6"</p>
                  </div>
                  <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">Available</span>
                </div>
              </div>
              <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">40ft Standard Container</h4>
                    <p className="text-sm text-muted-foreground">Dimensions: 40' x 8' x 8'6"</p>
                  </div>
                  <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">Available</span>
                </div>
              </div>
              <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">40ft High Cube Container</h4>
                    <p className="text-sm text-muted-foreground">Dimensions: 40' x 8' x 9'6"</p>
                  </div>
                  <span className="text-sm bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Limited</span>
                </div>
              </div>
            </div>
          </div>

          {/* Trucks Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Available Trucks</h3>
            <div className="space-y-3">
              <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">Standard Truck</h4>
                    <p className="text-sm text-muted-foreground">Capacity: 20ft container</p>
                  </div>
                  <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">Available</span>
                </div>
              </div>
              <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">Heavy Duty Truck</h4>
                    <p className="text-sm text-muted-foreground">Capacity: 40ft container</p>
                  </div>
                  <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">Available</span>
                </div>
              </div>
              <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">Specialized Truck</h4>
                    <p className="text-sm text-muted-foreground">For oversized cargo</p>
                  </div>
                  <span className="text-sm bg-red-100 text-red-800 px-2 py-1 rounded">Unavailable</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
