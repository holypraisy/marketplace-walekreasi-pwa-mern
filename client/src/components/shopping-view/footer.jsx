import { FaFacebook, FaInstagramSquare } from "react-icons/fa";
import { Link } from "react-router-dom";
import logoWaleKreasi from "../../assets/logo-WaleKreasi.png";

function Footer() {
  return (
    <footer className="bg-gray-100 border-t mt-16">
      <div className="container px-6 md:px-12 py-10 text-sm text-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr] gap-4">
          {/* Logo dan Deskripsi */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <img
                src={logoWaleKreasi}
                alt="WaleKreasi Logo"
                className="w-12 sm:w-14 object-contain"
              />
              <h2 className="text-lg sm:text-xl font-bold text-gray-800 leading-tight">
                Wale <br />Kreasi.
              </h2>
            </div>
            <p className="text-gray-600 mb-4">
              Solusi UMKM Lokal, Karya Hebat dari Sulawesi Utara.
            </p>
            <Link
              to="/auth/register-seller"
              className="inline-block bg-primary text-white px-4 py-2 rounded-full text-sm hover:bg-accent transition"
            >
              Mulai Berjualan
            </Link>
          </div>

          {/* Navigasi */}
        <div className="md:grid-cols-1">
          <h3 className="font-semibold mb-2 text-gray-800">Navigasi</h3>
          <ul className="flex md:flex-col md:space-y-2 items-center md:items-start">
            <li className="border-r md:border-0 border-primary pr-2 md:pr-0 hover:text-primary"><Link to="/shop/home">Beranda</Link></li>
            <li className="border-r md:border-0 border-primary px-2 md:px-0 hover:text-primary"><Link to="/shop/listing">Produk</Link></li>
            <li className="pl-2 md:pl-0 hover:text-primary"><Link to="/about">Tentang Kami</Link></li>
          </ul>
        </div>

          {/* Bantuan */}
          <div>
            <h3 className="font-semibold mb-2 text-gray-800">Bantuan</h3>
            <ul className="space-y-2">
              <li><Link to="/contact" className="hover:text-primary">Kontak</Link></li>
            </ul>
          </div>

          {/* Sosial Media */}
          <div>
            <h3 className="font-semibold mb-2 text-gray-800">Ikuti Kami</h3>
            <div className="flex space-x-4 text-2xl mt-2">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-blue-600">
                <FaFacebook />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-pink-500">
                <FaInstagramSquare />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-gray-500 text-xs border-t py-2 md:py-4  bg-gray-50">
        &copy; {new Date().getFullYear()}, WaleKreasi. All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;
