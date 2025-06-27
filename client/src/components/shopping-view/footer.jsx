import { FaFacebook, FaInstagramSquare } from "react-icons/fa";
import { Link } from "react-router-dom";
import logoWaleKreasi from "../../assets/logo-WaleKreasi.png";

function Footer() {
  return (
    <footer className="bg-gray-100 border-t mt-16">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-sm text-gray-700">

        {/* Logo dan Deskripsi */}
        <div>
          <div className="flex items-center space-x-3 mb-4">
            <img
              src={logoWaleKreasi}
              alt="WaleKreasi Logo"
              className="w-12 sm:w-14 object-contain"
            />
            <h2 className="text-lg sm:text-xl font-bold text-gray-800 leading-tight">
              Wale<span className="block sm:inline">Kreasi.</span>
            </h2>
          </div>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Marketplace lokal Sulawesi Utara untuk menjual dan membeli produk kerajinan tangan terbaik dari para UMKM.
          </p>
          <Link
            to="/auth/register-seller"
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition"
          >
            🌟 Mulai Berjualan
          </Link>
        </div>

        {/* Navigasi */}
        <div>
          <h3 className="font-semibold mb-3 text-gray-800">Navigasi</h3>
          <ul className="space-y-2">
            <li><Link to="/shop/home" className="hover:text-blue-600">Beranda</Link></li>
            <li><Link to="/shop/listing" className="hover:text-blue-600">Produk</Link></li>
            <li><Link to="/about" className="hover:text-blue-600">Tentang Kami</Link></li>
          </ul>
        </div>

        {/* Bantuan */}
        <div>
          <h3 className="font-semibold mb-3 text-gray-800">Bantuan</h3>
          <ul className="space-y-2">
            <li><Link to="/contact" className="hover:text-blue-600">Kontak</Link></li>
          </ul>
        </div>

        {/* Sosial Media */}
        <div>
          <h3 className="font-semibold mb-3 text-gray-800">Ikuti Kami</h3>
          <div className="flex space-x-5 mt-2 text-2xl">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-blue-600">
              <FaFacebook />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-pink-500">
              <FaInstagramSquare />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-gray-500 text-xs border-t py-4 bg-gray-50">
        &copy; {new Date().getFullYear()} WaleKreasi. Semua hak dilindungi.
      </div>
    </footer>
  );
}

export default Footer;
