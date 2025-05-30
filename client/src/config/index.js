export const registerFormControls = [
  {
      name : 'userName' ,
      label : 'Nama Pengguna', 
      placeholder :'Masukkan nama pengguna' ,
      componentType : 'input' , 
      type : 'text'   
  },
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


];

export const sellerRegisterFormControls = [
  // Data Diri Seller
  {
    name: 'sellerName',
    label: 'Nama Lengkap',
    placeholder: 'Masukkan nama lengkap',
    componentType: 'input',
    type: 'text',
  },
  {
    name: 'phoneNumber',
    label: 'Nomor Telepon',
    placeholder: 'Masukkan nomor telepon aktif',
    componentType: 'input',
    type: 'text',
  },
  {
    name: 'email',
    label: 'Email',
    placeholder: 'Masukkan email',
    componentType: 'input',
    type: 'email',
  },
  {
    name: 'password',
    label: 'Kata Sandi',
    placeholder: 'Masukkan kata sandi',
    componentType: 'input',
    type: 'password',
  },

  // Data Usaha / Toko
  {
    name: 'storeName',
    label: 'Nama Usaha / Toko',
    placeholder: 'Masukkan nama usaha',
    componentType: 'input',
    type: 'text',
  },
  {
    name: 'storeDescription',
    label: 'Deskripsi Usaha',
    placeholder: 'Deskripsikan usaha Anda',
    componentType: 'textarea',
  },
  {
    name: 'productionAddress',
    label: 'Alamat Produksi',
    placeholder: 'Masukkan alamat tempat produksi',
    componentType: 'input',
    type: 'text',
  },

  // Data Pembayaran
  {
    name: 'accountOwner',
    label: 'Nama Pemilik Rekening',
    placeholder: 'Masukkan nama pemilik rekening',
    componentType: 'input',
    type: 'text',
  },
  {
    name: 'bankName',
    label: 'Nama Bank',
    placeholder: 'Masukkan nama bank',
    componentType: 'input',
    type: 'text',
  },
  {
    name: 'bankAccountNumber',
    label: 'Nomor Rekening Bank',
    placeholder: 'Masukkan nomor rekening',
    componentType: 'input',
    type: 'text',
  },
  {
    name: 'eWallets',
    label: 'Dompet Digital (jika ada)',
    placeholder: 'Contoh: DANA, OVO, GoPay',
    componentType: 'input', // atau bisa diganti menjadi input array/multi-tag input
    type: 'text',
  },
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
  { id: "price-lowtohigh", label: "Price: Low to High" },
  { id: "price-hightolow", label: "Price: High to Low" },
  { id: "title-atoz", label: "Title: A to Z" },
  { id: "title-ztoa", label: "Title: Z to A" },
];

export const addressFormControls = [
  {
    label: "Alamat",
    name: "address",
    componentType: "input",
    type: "text",
    placeholder: "Masukkan Alamat Anda",
  },
  {
    label: "Kota",
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