import type { Request, Response } from "express";

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

  gioiTinh: "Nam" | "Nữ" | string;

  maKHFast: string;
  ngayDongBo: string;
  daDongBo: boolean;
};

// ===== Fake DB in-memory =====
const pad2 = (n: number) => String(n).padStart(2, "0");
const toDDMMYYYY = (d: Date) =>
  `${pad2(d.getDate())}/${pad2(d.getMonth() + 1)}/${d.getFullYear()}`;

const CUSTOMERS: Customer[] = Array.from({ length: 200 }).map((_, i) => {
  const id = i + 1;
  const gender = id % 2 === 0 ? "Nữ" : "Nam";
  const xung = gender === "Nam" ? "Mr" : id % 4 === 0 ? "Mrs" : "Ms";

  const birth = new Date(1985 + (id % 15), (id * 3) % 12, ((id * 7) % 28) + 1);
  const issue = new Date(2017 + (id % 8), (id * 5) % 12, ((id * 11) % 28) + 1);

  const phone = `09${pad2((id * 13) % 100)}${pad2((id * 17) % 100)}${pad2(
    (id * 19) % 100
  )}${pad2((id * 23) % 100)}`;

  const cccd = `079${String(100000000 + id).slice(-9)}`;

  return {
    id,
    xung,
    hoVaTen: `Khách Hàng ${pad2((id % 99) + 1)}`,
    maKhachHang: `KH${String(id).padStart(4, "0")}`,
    ngaySinh: toDDMMYYYY(birth),
    diDong: phone,
    soGiayTo: cccd,

    diaChiLienLac: "Thủ Đức, TP.HCM",
    diaChiThuongTru: "Dĩ An, Bình Dương",
    email: `customer${String(id).padStart(4, "0")}@email.com`,

    maThueTNCN: `3101${String(100000 + id)}`,
    chucVu: id % 5 === 0 ? "Quản lý" : "Nhân viên",
    nhomKhachHang: id % 7 === 0 ? "VIP" : id % 3 === 0 ? "Tiềm năng" : "Mới",
    nhanVien: `NV${pad2((id % 5) + 1)} - Sales ${pad2((id % 5) + 1)}`,
    ngheNghiep: id % 4 === 0 ? "Kinh doanh" : "Văn phòng",

    duAn:
      id % 3 === 0 ? "Bcons City" : id % 3 === 1 ? "Bcons Plaza" : "Bcons Bee",
    loaiBDS: id % 6 === 0 ? "Shophouse" : "Căn hộ",
    sanPhamQuanTam:
      id % 6 === 0 ? "SH mặt tiền" : id % 2 === 0 ? "CH 2PN" : "CH 1PN",
    donViCongTac: `Công ty ${String.fromCharCode(
      65 + (id % 20)
    )}${String.fromCharCode(65 + ((id + 3) % 20))}${String.fromCharCode(
      65 + ((id + 6) % 20)
    )}`,

    nguonDen:
      id % 4 === 0
        ? "Facebook"
        : id % 4 === 1
        ? "Zalo"
        : id % 4 === 2
        ? "Website"
        : "Hotline",
    capDo: id % 5 === 0 ? "Nóng" : id % 5 === 1 ? "Ấm" : "Lạnh",
    mucDich: id % 3 === 0 ? "Mua ở" : id % 3 === 1 ? "Đầu tư" : "Tìm hiểu",
    dienGiai: "Data mock trong dự án",
    ngayXuLy: toDDMMYYYY(new Date(2025, 11, ((id * 2) % 28) + 1)),

    danhSachDuAn: "Bcons City; Bcons Plaza; Bcons Bee",

    loaiGiayTo: id % 10 === 0 ? "Passport" : "CCCD",
    soCCCD: id % 10 === 0 ? "" : cccd,
    passport: id % 10 === 0 ? `P${String(1000000 + id)}` : "",
    noiCap: id % 10 === 0 ? "Cục QLXNC" : "Cục CSQLHC",
    ngayCap: toDDMMYYYY(issue),

    gioiTinh: gender,

    maKHFast: `FAST${String(id).padStart(4, "0")}`,
    ngayDongBo: `31/12/2025 ${pad2((id * 3) % 24)}:${pad2((id * 7) % 60)}`,
    daDongBo: id % 2 === 0,
  };
});

// Giả sử bạn có CUSTOMERS list + thêm 1 map detail
const CUSTOMER_DETAIL: Record<number, any> = {
  1: {
    id: 1,

    // ===== Cá nhân / chung =====
    loaiKhachHang: "Cá nhân",
    quyDanh: "Mr",
    hoVaTen: "Nguyễn Văn A",
    code: "KH0001",
    quocTich: "Việt Nam",
    loaiGiayTo: "CCCD",
    soGiayTo: "079123456789",
    ngaySinh: "14/02/1996",
    diDong: "0901234567",
    ngayCap: "18/06/2019",
    noiCap: "Cục Cảnh sát quản lý hành chính về trật tự xã hội",
    noiCapEN: "Department of Administrative Management of Social Order",
    diDong2: "0912345678",
    ngayHetHan: "18/06/2034",
    email: "a.nguyen@email.com",
    email2: "a.nguyen2@email.com",
    maSoThue: "3101000001",
    nguyenQuan: "Bình Dương",
    nguyenQuanEN: "Binh Duong",
    diaChiThuongTru: "Dĩ An, Bình Dương",
    xaHuyenTinhThuongTru: "Dĩ An - Bình Dương",
    diaChiThuongTruEN: "Di An, Binh Duong, Vietnam",
    diaChiLienHe: "Thủ Đức, TP.HCM",
    xaHuyenTinhLienHe: "Thủ Đức - TP.HCM",
    diaChiLienHeEN: "Thu Duc, Ho Chi Minh City, Vietnam",
    nganHang: "Vietcombank",
    chiNhanh: "CN Thủ Đức",
    soTaiKhoan: "0123456789012",
    loaiBDS: "Căn hộ",
    ngheNghiep: "Kinh doanh",
    mucDich: "Mua ở",
    nguonDen: "Facebook",
    duAn: "Bcons City",
    sanPhamQuanTam: "CH 2PN",
    chucVu: "Nhân viên",
    thoiDiemLienHe: "Sáng",
    mucThuNhap: 25000000,
    nhomKhachHang: "Tiềm năng",
    nhanVien: "NV001 - Trần Minh Anh",
    capDo: "Nóng",
    gioiTinh: "Nam",
    ghiChu: "Khách muốn xem nhà cuối tuần",
    maFast: "FAST0001",
    ngayDongBo: "31/12/2025 16:10",
    daDongBo: true,

    /** ===== Doanh nghiệp ===== */
    tenCongTy: "",
    tenCongTyEN: "",
    maSoThueCty: "",
    soGPKD: "",
    ngayCapGPKD: "",
    noiCapGPKD: "",
    fax: "",
    ngayCapLaiGPKD: "",
    noiCapGPKDEN: "",
    dienThoaiCty: "",
    emailCty: "",
    diaChiCongTy: "",
    diaChiCongTyEN: "",
    diaChiLienLacCty: "",
    diaChiLienLacCtyEN: "",
    loaiHinhKD: "",
    loaiBDS_1: "",
    loaiBDS_2: "",
    nguonDenCty: "",
    duAnCty: "",
    sanPhamQuanTamCty: "",
    nhomKhachHangCty: "",
    nhanVienCty: "",
    mucDichCty: "",
    capDoCty: "",
    thoiDiemLienHeCty: "",
    ghiChuCty: "",
    maFastCty: "",
    ngayDongBoCty: "",
    daDongBoCty: false,

    // ===== Người đại diện (Doanh nghiệp) =====
    nldd_quyDanh: "",
    nldd_hoVaTen: "",
    nldd_ngaySinh: "",
    nldd_quocTich: "",
    nldd_loaiGiayTo: "",
    nldd_soGiayTo: "",
    nldd_ngayCap: "",
    nldd_ngayHetHan: "",
    nldd_noiCap: "",
    nldd_noiCapEN: "",
    nldd_diDong: "",
    nldd_diDong2: "",
    nldd_email: "",
    nldd_email2: "",
    nldd_chucVu: "",
    nldd_chucVuEN: "",
    nldd_maSoThueCaNhan: "",
    nldd_nguyenQuan: "",
    nldd_nguyenQuanEN: "",
    nldd_diaChiThuongTru: "",
    nldd_xaHuyenTinhThuongTru: "",
    nldd_diaChiThuongTruEN: "",
    nldd_diaChiLienHe: "",
    nldd_xaHuyenTinhLienHe: "",
    nldd_diaChiLienHeEN: "",
    nldd_gioiTinh: "",
  },

  2: {
    id: 2,

    // ===== Cá nhân / chung (Doanh nghiệp có thể để trống hoặc dùng làm contact) =====
    loaiKhachHang: "Doanh nghiệp",
    quyDanh: "",
    hoVaTen: "",
    code: "KH0002",
    quocTich: "Việt Nam",
    loaiGiayTo: "",
    soGiayTo: "",
    ngaySinh: "",
    diDong: "",
    ngayCap: "",
    noiCap: "",
    noiCapEN: "",
    diDong2: "",
    ngayHetHan: "",
    email: "",
    email2: "",
    maSoThue: "",
    nguyenQuan: "",
    nguyenQuanEN: "",
    diaChiThuongTru: "",
    xaHuyenTinhThuongTru: "",
    diaChiThuongTruEN: "",
    diaChiLienHe: "",
    xaHuyenTinhLienHe: "",
    diaChiLienHeEN: "",
    nganHang: "BIDV",
    chiNhanh: "CN Quận 1",
    soTaiKhoan: "1234567890123",
    loaiBDS: "Shophouse",
    ngheNghiep: "",
    mucDich: "",
    nguonDen: "",
    duAn: "",
    sanPhamQuanTam: "",
    chucVu: "",
    thoiDiemLienHe: "",
    mucThuNhap: 0,
    nhomKhachHang: "",
    nhanVien: "",
    capDo: "",
    gioiTinh: "",
    ghiChu: "",
    maFast: "",
    ngayDongBo: "",
    daDongBo: false,

    /** ===== Doanh nghiệp ===== */
    tenCongTy: "CÔNG TY TNHH ABC",
    tenCongTyEN: "ABC COMPANY LIMITED",
    maSoThueCty: "3700123456",
    soGPKD: "0312345678",
    ngayCapGPKD: "02/02/2020",
    noiCapGPKD: "Sở Kế hoạch và Đầu tư TP.HCM",
    fax: "02812345679",
    ngayCapLaiGPKD: "10/10/2022",
    noiCapGPKDEN: "Department of Planning and Investment of Ho Chi Minh City",
    dienThoaiCty: "02812345678",
    emailCty: "contact@abc.com",
    diaChiCongTy: "Số 12 Nguyễn Huệ, Phường Bến Nghé, Quận 1, TP.HCM",
    diaChiCongTyEN:
      "12 Nguyen Hue St., Ben Nghe Ward, District 1, Ho Chi Minh City, Vietnam",
    diaChiLienLacCty: "Số 12 Nguyễn Huệ, Phường Bến Nghé, Quận 1, TP.HCM",
    diaChiLienLacCtyEN:
      "12 Nguyen Hue St., Ben Nghe Ward, District 1, Ho Chi Minh City, Vietnam",
    loaiHinhKD: "Thương mại - Dịch vụ",
    loaiBDS_1: "Shophouse",
    loaiBDS_2: "Căn hộ",
    nguonDenCty: "Website",
    duAnCty: "Bcons Plaza",
    sanPhamQuanTamCty: "Shophouse góc",
    nhomKhachHangCty: "VIP",
    nhanVienCty: "NV002 - Lê Quốc Huy",
    mucDichCty: "Đầu tư",
    capDoCty: "Ấm",
    thoiDiemLienHeCty: "Chiều",
    ghiChuCty: "Cần báo giá + dòng tiền cho thuê",
    maFastCty: "FASTC0002",
    ngayDongBoCty: "31/12/2025 10:00",
    daDongBoCty: false,

    // ===== Người đại diện =====
    nldd_quyDanh: "Mr",
    nldd_hoVaTen: "Trần Văn B",
    nldd_ngaySinh: "08/06/1990",
    nldd_quocTich: "Việt Nam",
    nldd_loaiGiayTo: "CCCD",
    nldd_soGiayTo: "079999999999",
    nldd_ngayCap: "01/01/2021",
    nldd_ngayHetHan: "01/01/2036",
    nldd_noiCap: "Cục Cảnh sát quản lý hành chính về trật tự xã hội",
    nldd_noiCapEN: "Department of Administrative Management of Social Order",
    nldd_diDong: "0909999999",
    nldd_diDong2: "0919999999",
    nldd_email: "rep@abc.com",
    nldd_email2: "rep2@abc.com",
    nldd_chucVu: "Giám đốc",
    nldd_chucVuEN: "Director",
    nldd_maSoThueCaNhan: "3101009999",
    nldd_nguyenQuan: "TP.HCM",
    nldd_nguyenQuanEN: "Ho Chi Minh City",
    nldd_diaChiThuongTru: "Quận 3, TP.HCM",
    nldd_xaHuyenTinhThuongTru: "Quận 3 - TP.HCM",
    nldd_diaChiThuongTruEN: "District 3, Ho Chi Minh City, Vietnam",
    nldd_diaChiLienHe: "Quận 1, TP.HCM",
    nldd_xaHuyenTinhLienHe: "Quận 1 - TP.HCM",
    nldd_diaChiLienHeEN: "District 1, Ho Chi Minh City, Vietnam",
    nldd_gioiTinh: "Nam",
  },
};

export default {
  "GET /api/customers/:id": (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const data = CUSTOMER_DETAIL[id];

    if (!data) {
      res.status(404).json({ success: false, message: "Not found" });
      return;
    }

    res.json({ success: true, message: "OK", data });
  },
  "GET /api/customers": (req: Request, res: Response) => {
    const page = Math.max(Number(req.query.page ?? 1), 1);
    const pageSize = Math.max(Number(req.query.pageSize ?? 10), 1);
    const keyword = String(req.query.keyword ?? "")
      .trim()
      .toLowerCase();

    let list = CUSTOMERS;

    if (keyword) {
      list = list.filter((c) => {
        const hay =
          `${c.hoVaTen} ${c.maKhachHang} ${c.diDong} ${c.email}`.toLowerCase();
        return hay.includes(keyword);
      });
    }

    const total = list.length;
    const start = (page - 1) * pageSize;
    const items = list.slice(start, start + pageSize);

    res.json({
      success: true,
      message: "OK",
      data: { items, page, pageSize, total },
    });
  },
};
