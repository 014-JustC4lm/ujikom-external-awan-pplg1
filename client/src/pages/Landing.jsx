import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Landing = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="landing-page min-h-screen pt-16">
      {/* Hero Section */}
      <section className="text-white py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
           <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Welcome to Lumixor Studio
          </h1>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Sistem peminjaman alat studio internal yang mudah dan efisien.
            Kelola peminjaman kamera, lensa, dan peralatan studio lainnya.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/items" className="px-8 py-3 glass text-white rounded-lg font-bold text-lg hover:bg-white/20 transition-colors shadow-sm">
              Browse Equipment
            </Link>
            {!isAuthenticated() && (
              <Link to="/register" className="px-8 py-3 bg-blue-700 border border-blue-500 text-white rounded-lg font-bold text-lg hover:bg-blue-800 transition-colors">
                Get Started
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">Why Choose Us?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass p-8 rounded-lg text-center">
              <div className="text-4xl mb-4">📸</div>
              <h3 className="text-xl font-bold mb-3 text-white">Premium Equipment</h3>
              <p className="text-blue-100">
                Akses ke koleksi kamera, lensa, dan peralatan studio berkualitas tinggi
              </p>
            </div>

            <div className="glass p-8 rounded-lg text-center">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-bold mb-3 text-white">Quick Process</h3>
              <p className="text-blue-100">
                Proses peminjaman yang cepat dan mudah dengan approval real-time
              </p>
            </div>

            <div className="glass p-8 rounded-lg text-center">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="text-xl font-bold mb-3 text-white">Secure & Reliable</h3>
              <p className="text-blue-100">
                Sistem yang aman dengan tracking lengkap untuk setiap peminjaman
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">Equipment Categories</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link to="/items?category=Kamera" className="block glass p-8 rounded-lg text-center hover:bg-white/20 transition-all group">
              <div className="text-4xl mb-4">📷</div>
              <h3 className="text-xl font-bold text-center mb-2 text-white">
                Kamera
              </h3>
              <p className="text-blue-100 text-sm">
                DSLR, Mirrorless, dan berbagai jenis kamera profesional
              </p>
            </Link>

            <Link to="/items?category=Lensa" className="block glass p-8 rounded-lg text-center hover:bg-white/20 transition-all group">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-center mb-2 text-white">
                Lensa
              </h3>
              <p className="text-blue-100 text-sm">
                Wide, telephoto, prime, dan berbagai jenis lensa berkualitas
              </p>
            </Link>

            <Link to="/items?category=Alat Lainnya" className="block glass p-8 rounded-lg text-center hover:bg-white/20 transition-all group">
              <div className="text-4xl mb-4">🎬</div>
              <h3 className="text-xl font-bold text-center mb-2 text-white">
                Alat Lainnya
              </h3>
              <p className="text-blue-100 text-sm">
                Tripod, lighting, microphone, stabilizer, dan aksesoris lainnya
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <div className="glass rounded-lg p-10 max-w-4xl mx-auto text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-lg text-blue-100 mb-8">
              Mulai pinjam peralatan studio yang Anda butuhkan sekarang juga!
            </p>
            <Link
              to={isAuthenticated() ? '/items' : '/register'}
              className="inline-block px-8 py-3 bg-white text-blue-700 rounded-lg font-bold hover:bg-gray-100 transition-colors shadow-sm"
            >
              {isAuthenticated() ? 'Browse Equipment' : 'Create Free Account'}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
