import type { Request, Response } from 'express';

type Customer = {
  id: number;
  xung: string;
  hoVaTen: string;
  maKhachHang: string;
  ngaySinh: string;
  diDong: string;
  soGiayTo: string;

  diaChiLienLac: string;
  diaChiThuongTru: string;
  email: string;

  maThueTNCN: string;
  chucVu: string;
  nhomKhachHang: string;
  nhanVien: string;
  ngheNghiep: string;

  duAn: string;
  loaiBDS: string;
  sanPhamQuanTam: string;
  donViCongTac: string;

  nguonDen: string;
  capDo: string;
  mucDich: string;
  dienGiai: string;
  ngayXuLy: string;

  danhSachDuAn: string;

  loaiGiayTo: string;
  soCCCD: string;
  passport: string;
  noiCap: string;
  ngayCap: string;

  gioiTinh: 'Nam' | 'Nữ' | string;

  maKHFast: string;
  ngayDongBo: string;
  daDongBo: boolean;
};

// ===== Fake DB in-memory =====
const pad2 = (n: number) => String(n).padStart(2, '0');
const toDDMMYYYY = (d: Date) =>
  `${pad2(d.getDate())}/${pad2(d.getMonth() + 1)}/${d.getFullYear()}`;

const CUSTOMERS: Customer[] = Array.from({ length: 200 }).map((_, i) => {
  const id = i + 1;
  const gender = id % 2 === 0 ? 'Nữ' : 'Nam';
  const xung = gender === 'Nam' ? 'Mr' : id % 4 === 0 ? 'Mrs' : 'Ms';

  const birth = new Date(1985 + (id % 15), (id * 3) % 12, ((id * 7) % 28) + 1);
  const issue = new Date(2017 + (id % 8), (id * 5) % 12, ((id * 11) % 28) + 1);

  const phone = `09${pad2((id * 13) % 100)}${pad2((id * 17) % 100)}${pad2(
    (id * 19) % 100,
  )}${pad2((id * 23) % 100)}`;

  const cccd = `079${String(100000000 + id).slice(-9)}`;

  return {
    id,
    xung,
    hoVaTen: `Khách Hàng ${pad2((id % 99) + 1)}`,
    maKhachHang: `KH${String(id).padStart(4, '0')}`,
    ngaySinh: toDDMMYYYY(birth),
    diDong: phone,
    soGiayTo: cccd,

    diaChiLienLac: 'Thủ Đức, TP.HCM',
    diaChiThuongTru: 'Dĩ An, Bình Dương',
    email: `customer${String(id).padStart(4, '0')}@email.com`,

    maThueTNCN: `3101${String(100000 + id)}`,
    chucVu: id % 5 === 0 ? 'Quản lý' : 'Nhân viên',
    nhomKhachHang: id % 7 === 0 ? 'VIP' : id % 3 === 0 ? 'Tiềm năng' : 'Mới',
    nhanVien: `NV${pad2((id % 5) + 1)} - Sales ${pad2((id % 5) + 1)}`,
    ngheNghiep: id % 4 === 0 ? 'Kinh doanh' : 'Văn phòng',

    duAn: id % 3 === 0 ? 'Bcons City' : id % 3 === 1 ? 'Bcons Plaza' : 'Bcons Bee',
    loaiBDS: id % 6 === 0 ? 'Shophouse' : 'Căn hộ',
    sanPhamQuanTam: id % 6 === 0 ? 'SH mặt tiền' : id % 2 === 0 ? 'CH 2PN' : 'CH 1PN',
    donViCongTac: `Công ty ${String.fromCharCode(65 + (id % 20))}${String.fromCharCode(
      65 + ((id + 3) % 20),
    )}${String.fromCharCode(65 + ((id + 6) % 20))}`,

    nguonDen: id % 4 === 0 ? 'Facebook' : id % 4 === 1 ? 'Zalo' : id % 4 === 2 ? 'Website' : 'Hotline',
    capDo: id % 5 === 0 ? 'Nóng' : id % 5 === 1 ? 'Ấm' : 'Lạnh',
    mucDich: id % 3 === 0 ? 'Mua ở' : id % 3 === 1 ? 'Đầu tư' : 'Tìm hiểu',
    dienGiai: 'Data mock trong dự án',
    ngayXuLy: toDDMMYYYY(new Date(2025, 11, ((id * 2) % 28) + 1)),

    danhSachDuAn: 'Bcons City; Bcons Plaza; Bcons Bee',

    loaiGiayTo: id % 10 === 0 ? 'Passport' : 'CCCD',
    soCCCD: id % 10 === 0 ? '' : cccd,
    passport: id % 10 === 0 ? `P${String(1000000 + id)}` : '',
    noiCap: id % 10 === 0 ? 'Cục QLXNC' : 'Cục CSQLHC',
    ngayCap: toDDMMYYYY(issue),

    gioiTinh: gender,

    maKHFast: `FAST${String(id).padStart(4, '0')}`,
    ngayDongBo: `31/12/2025 ${pad2((id * 3) % 24)}:${pad2((id * 7) % 60)}`,
    daDongBo: id % 2 === 0,
  };
});

export default {
  'GET /api/customers': (req: Request, res: Response) => {
    const page = Math.max(Number(req.query.page ?? 1), 1);
    const pageSize = Math.max(Number(req.query.pageSize ?? 10), 1);
    const keyword = String(req.query.keyword ?? '').trim().toLowerCase();

    let list = CUSTOMERS;

    if (keyword) {
      list = list.filter((c) => {
        const hay = `${c.hoVaTen} ${c.maKhachHang} ${c.diDong} ${c.email}`.toLowerCase();
        return hay.includes(keyword);
      });
    }

    const total = list.length;
    const start = (page - 1) * pageSize;
    const items = list.slice(start, start + pageSize);

    res.json({
      success: true,
      message: 'OK',
      data: { items, page, pageSize, total },
    });
  },
};
