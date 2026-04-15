import { useNavigate } from 'react-router';
import { useStore } from '../store/useStore';

export function PromoBanners() {
  const navigate = useNavigate();
  const { setSearchQuery } = useStore();

  return (
    <section className="bg-white py-8 sm:py-12">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="relative rounded-2xl overflow-hidden bg-gray-100 h-[300px] sm:h-[350px]">
            <img
              src="https://images.unsplash.com/photo-1773414753648-3d84b187664a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
              alt="Luxury products"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="relative h-full flex flex-col justify-end p-6 sm:p-8">
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">Luxury for less</h3>
              <p className="text-gray-100 text-sm sm:text-base mb-4 sm:mb-6">Shop the latest from top luxury brands.</p>
              <button
                onClick={() => { setSearchQuery('Watches'); navigate('/search?q=Watches'); }}
                className="inline-flex items-center justify-center bg-white hover:bg-gray-100 text-gray-900 px-6 py-3 rounded-full font-semibold transition-colors w-fit text-sm sm:text-base"
              >
                Shop now
              </button>
            </div>
          </div>
          <div className="relative rounded-2xl overflow-hidden bg-gray-100 h-[300px] sm:h-[350px]">
            <img
              src="https://images.unsplash.com/photo-1642351376726-a96985803ee8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
              alt="Auto parts"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="relative h-full flex flex-col justify-end p-6 sm:p-8">
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">Upgrade your ride</h3>
              <p className="text-gray-100 text-sm sm:text-base mb-4 sm:mb-6">Everything you need for your car or truck.</p>
              <button
                onClick={() => { setSearchQuery('Electronics'); navigate('/search?q=Electronics'); }}
                className="inline-flex items-center justify-center bg-white hover:bg-gray-100 text-gray-900 px-6 py-3 rounded-full font-semibold transition-colors w-fit text-sm sm:text-base"
              >
                Find parts
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
