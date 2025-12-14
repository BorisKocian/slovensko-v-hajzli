import Image from 'next/image'

export type ToiletState = 'base' | 'flushed' | 'hungry' | 'test'

interface ToiletButtonProps {
  size?: number // Size in pixels, default 120
  state?: ToiletState
}

const toiletImages: Record<ToiletState, string> = {
  base: '/toilets/BaseToilet.svg',
  flushed: '/toilets/FlushedToilet.svg',
  hungry: '/toilets/HungryToilet.svg',
  test: '/toilets/OtvoreneUstaGradient.svg',
}

export function ToiletButton({ size = 120, state = 'base' }: ToiletButtonProps) {
  const fingerSize = size * 0.4
  const showFinger = state === 'base' || state === 'hungry'

  return (
    <button
      className="relative group cursor-pointer"
      style={{ width: size, height: size }}
    >
      {/* Pointing Finger - only shown in base state */}
      {showFinger && (
        <div
          className="absolute animate-point"
          style={{ width: fingerSize, height: fingerSize, left: -fingerSize * 0.8, top: '40%' }}
        >
          <Image
            src="/toilets/PointingFinger.svg"
            alt="Point"
            fill
            className="object-contain"
          />
        </div>
      )}

      {/* Toilet */}
      <div className="relative w-full h-full transition-transform group-hover:scale-110">
        <Image
          src={toiletImages[state]}
          alt="Toilet"
          fill
          className="object-contain"
        />
      </div>
    </button>
  )
}
