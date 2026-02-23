/**
 * Laptop on circular white platform over water - maquette fidelity
 */
export function LaptopVisual() {
  return (
    <div className="relative w-full max-w-xl flex flex-col items-center justify-end pb-8">
      {/* Water reflection / surface */}
      <div
        className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-[120%] h-24 rounded-[50%]"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(180,220,255,0.5) 0%, rgba(150,200,255,0.3) 70%, transparent 100%)',
        }}
      />
      {/* Circular white translucent platform */}
      <div
        className="absolute bottom-2 left-1/2 -translate-x-1/2 w-64 h-6 rounded-full"
        style={{
          background: 'linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.9) 100%)',
          boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
        }}
      />
      {/* Laptop base - silver */}
      <div
        className="relative w-72 h-3 rounded-b-md"
        style={{
          background: 'linear-gradient(180deg, #d4d4d4 0%, #a3a3a3 100%)',
          boxShadow: '0 2px 12px rgba(0,0,0,0.15)',
        }}
      />
      {/* Laptop screen */}
      <div
        className="relative w-[380px] rounded-t-xl overflow-hidden border-[3px] border-[#a8a8a8] border-b-0"
        style={{
          background: '#fff',
          boxShadow: '0 -4px 24px rgba(0,0,0,0.12)',
        }}
      >
        <div className="aspect-[16/10] bg-white p-4">
          <div className="h-7 rounded-md bg-gray-100 mb-4" />
          <div className="grid grid-cols-4 gap-2">
            <div className="aspect-square rounded-lg bg-amber-300" />
            <div className="aspect-square rounded-lg bg-sky-300" />
            <div className="aspect-square rounded-lg bg-pink-300" />
            <div className="aspect-square rounded-lg bg-emerald-300" />
          </div>
        </div>
      </div>
    </div>
  );
}
