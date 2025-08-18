export function ProductsPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center">Products</h2>
      <div className="max-w-2xl mx-auto">
        <p className="text-muted-foreground text-center mb-6">
          Select and configure your products for shipping
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <h3 className="font-semibold mb-2">Product Category A</h3>
            <p className="text-sm text-muted-foreground">Electronics and gadgets</p>
          </div>
          <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <h3 className="font-semibold mb-2">Product Category B</h3>
            <p className="text-sm text-muted-foreground">Clothing and accessories</p>
          </div>
          <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <h3 className="font-semibold mb-2">Product Category C</h3>
            <p className="text-sm text-muted-foreground">Home and garden</p>
          </div>
          <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <h3 className="font-semibold mb-2">Product Category D</h3>
            <p className="text-sm text-muted-foreground">Sports and outdoors</p>
          </div>
        </div>
      </div>
    </div>
  )
}
