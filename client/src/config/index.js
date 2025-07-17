export const registerFormControls = [
  {
      name : 'userName' ,
      label : 'Nama Pengguna', 
      placeholder :'Masukkan nama anda' ,
      componentType : 'input' , 
      type : 'text'   
  },
  {
      name : 'email' ,
      label : 'Email', 
      placeholder :'Contoh: saya@email.com' ,
      componentType : 'input' , 
      type : 'email'   
  },
    {
      name : 'phoneNumber' ,
      label : 'Nomor Telepon', 
      placeholder :'08xxxxxxxxxx' ,
      componentType : 'input' , 
      type : 'tel'   
  },
  {
      name : 'password' ,
      label : 'Kata Sandi', 
      placeholder :'Minimal 8 Karakter' ,
      componentType : 'input' , 
      type : 'password'   
  }


];

export const sellerRegisterFormControls = [
  // Data Diri Seller
  {
    name: 'sellerName',
    label: 'Nama Lengkap',
    placeholder: 'Masukkan nama lengkap',
    componentType: 'input',
    type: 'text',
    section: 'Identitas Pemilik Usaha',
  },
  {
    name: 'phoneNumber',
    label: 'Nomor Telepon',
    placeholder: 'Masukkan nomor telepon aktif',
    componentType: 'input',
    type: 'text',
    section: 'Identitas Pemilik Usaha',
  },
  {
    name: 'email',
    label: 'Email',
    placeholder: 'Masukkan email',
    componentType: 'input',
    type: 'email',
    section: 'Identitas Pemilik Usaha',
  },

  {
    name : 'nik',
    label :'NIK (Nomor Induk Kependudukan)',
    placeholder :'Masukkan NIK anda',
    componentType :'input',
    type : 'number',
    section: 'Identitas Pemilik Usaha',
  },
  {
    name: 'password',
    label: 'Kata Sandi',
    placeholder: 'Masukkan kata sandi',
    componentType: 'input',
    type: 'password',
    section: 'Identitas Pemilik Usaha',
  },
  {
    name : 'domicileAddress',
    label :'Alamat Domisili',
    placeholder :'Masukkan Alamat Domisili Anda',
    componentType :'input',
    type : 'text',
    section: 'Identitas Pemilik Usaha',
  },

  // Data Usaha / Toko
  {
    name: 'storeName',
    label: 'Nama Usaha / Toko',
    placeholder: 'Masukkan nama usaha',
    componentType: 'input',
    type: 'text',
    section: 'Data Usaha / Toko',
  },
  {
    name: 'productionAddress',
    label: 'Alamat Produksi',
    placeholder: 'Masukkan alamat tempat produksi',
    componentType: 'input',
    type: 'text',
    section: 'Data Usaha / Toko',
  },
  {
    name: 'storeDescription',
    label: 'Deskripsi Usaha',
    placeholder: 'Deskripsikan usaha Anda',
    componentType: 'textarea',
    section: 'Data Usaha / Toko',
  }
,

  // Data Pembayaran
  {
    name: 'bankAccountOwner',
    label: 'Nama Pemilik Rekening',
    placeholder: 'Masukkan nama pemilik rekening',
    componentType: 'input',
    type: 'text',
    section: 'Data Pembayaran',
  },
  {
    name: 'bankAccountNumber',
    label: 'Nomor Rekening Bank',
    placeholder: 'Masukkan nomor rekening',
    componentType: 'input',
    type: 'text',
    section: 'Data Pembayaran',
  },
  {
    name: 'bankName',
    label: 'Nama Bank',
    placeholder: 'Masukkan nama bank',
    componentType: 'input',
    type: 'text',
    section: 'Data Pembayaran',
  }

];

export const sellerProfileFormElements = [
  { label: "Nama Lengkap", name: "sellerName", type: "text" },
  { label: "Nomor Telepon", name: "phoneNumber", type: "text" },
  { label: "Alamat Domisili", name: "domicileAddress", type: "text" },
  { label: "NIK", name: "nik", type: "text" },
  { label: "Nama Toko", name: "storeName", type: "text" },
  { label: "Deskripsi Toko", name: "storeDescription", type: "textarea" },
  { label: "Alamat Produksi", name: "productionAddress", type: "text" },
  { label: "Nama Pemilik Rekening", name: "bankAccountOwner", type: "text" },
  { label: "Nama Bank", name: "bankName", type: "text" },
  { label: "Nomor Rekening", name: "bankAccountNumber", type: "text" },
  { label: "Dompet Digital", name: "eWallet", type: "text" },
  { label: "Pemilik E-Wallet", name: "eWalletsAccountOwner", type: "text" },
  { label: "Nomor E-Wallet", name: "eWalletAccountNumber", type: "text" },
];



export const loginFormControls = [
  {
      name : 'email' ,
      label : 'Email', 
      placeholder :'Masukkan Email Anda' ,
      componentType : 'input' , 
      type : 'email'   
  },
  {
      name : 'password' ,
      label : 'Kata Sandi', 
      placeholder :'Masukkan Kata Sandi' ,
      componentType : 'input' , 
      type : 'password'   
  }


]

export const adminSideBarMenuItems = [
  {
      id :'dashboard' ,
      label : 'Dashboard' ,
      path : '/admin/dashboard'
  },
  {
      id :'products' ,
      label : 'Products' ,
      path : '/admin/products'
  },
  
  {
      id :'orders' ,
      label : 'Orders' ,
      path : '/admin/orders'
  },
]

export const addProductFormElements = [
  {
    label: "Nama Barang",
    name: "title",
    componentType: "input",
    type: "text",
    placeholder: "Masukkan Nama Barang",
  },
  {
    label: "Deskripsi",
    name: "description",
    componentType: "textarea",
    placeholder: "Masukkan Deskripsi Produk",
  },
  {
    label: "Kategori",
    name: "category",
    componentType: "select",
    options: [
        { id: "home-decor", label: "Dekorasi Rumah" },
        { id: "accessories-fashion", label: "Aksesori & Fashion" },
        { id: "souvenirs", label: "Souvenir & Oleh-Oleh" },
        { id: "traditional-tools", label: "Peralatan Tradisional" },
        { id: "eco-friendly", label: "Produk Ramah Lingkungan" },
      ],
  },
  {
    label: "Harga",
    name: "price",
    componentType: "input",
    type: "number",
    placeholder: "Masukkan Harga Barang",
  },
  {
    label: "Harga Diskon",
    name: "salePrice",
    componentType: "input",
    type: "number",
    placeholder: "Masukkan Harga Diskon (opsional)",
  },
  {
    label: "Jumlah Stok",
    name: "totalStock",
    componentType: "input",
    type: "number",
    placeholder: "Masukkan Jumlah Stok",
  },
];

export const shoppingViewHeaderMenuItems = [
  {
    id: "home-decor",
    label: "Dekorasi Rumah",
    path: "/shop/listing",
  },
  {
    id: "accessories-fashion",
    label: "Aksesoris & Fashion",
    path: "/shop/listing",
  },
  {
    id: "souvenirs",
    label: "Souvenir & Oleh-Oleh",
    path: "/shop/listing",
  },
  {
    id: "traditional-tools",
    label: "Peralatan Tradisional",
    path: "/shop/listing",
  },
  {
    id: "eco-friendly",
    label: "Produk Ramah Lingkungan",
    path: "/shop/listing",
  },
];

export const categoryOptionsMap = {
  "home-decor": "Dekorasi Rumah",
  "accessories-fashion": "Aksesori & Fashion",
  "souvenirs": "Souvenir & Oleh-Oleh",
  "traditional-tools": "Peralatan Tradisional",
  "eco-friendly": "Produk Ramah Lingkungan",
};

export const filterOptions = {
  category: [
    { id: "home-decor", label: "Dekorasi Rumah" },
    { id: "accessories-fashion", label: "Aksesori & Fashion" },
    { id: "souvenirs", label: "Souvenir & Oleh-Oleh" },
    { id: "traditional-tools", label: "Peralatan Tradisional" },
    { id: "eco-friendly", label: "Produk Ramah Lingkungan" },
  ],
};

export const sortOptions = [
  { id: "price-lowtohigh", label: "Harga: Terendah - Tertinggi" },
  { id: "price-hightolow", label: "Harga: Tertinggi - Terendah" },
  { id: "title-atoz", label: "Nama: A - Z" },
  { id: "title-ztoa", label: "Nama: Z - A" },
];

export const addressFormControls = [
  {
    label : "Nama Penerima",
    name : "receiverName",
    componentType: "input",
    type: "text",
    placeholder: "Masukkan Nama Penerima",
    maxLength: 50,
  },
  {
    label: "Alamat",
    name: "address",
    componentType: "input",
    type: "text",
    placeholder: "Masukkan Alamat Anda",
  },
  {
    label: "Kota/Kabupaten",
    name: "city",
    componentType: "input",
    type: "text",
    placeholder: "Masukkan kota Anda",
  },
  {
    label: "Kode Pos",
    name: "pincode",
    componentType: "input",
    type: "text",
    placeholder: "Masukkan Kode Pos Anda",
  },
  {
    label: "Nomor telepon",
    name: "phone",
    componentType: "input",
    type: "text",
    placeholder: "Masukkan Nomor Telepon Penerima",
  },
  {
    label: "Catatan",
    name: "notes",
    componentType: "textarea",
    placeholder: "Masukkan catatan tambahan (jika ada)",
  },
];