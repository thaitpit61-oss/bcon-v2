import React, { useEffect, useMemo, useRef, useState } from "react";
import { history, useParams } from "@umijs/max";
import type { ProFormInstance } from "@ant-design/pro-components";
import {
  PageContainer,
  ProCard,
  ProForm,
  ProFormDatePicker,
  ProFormDigit,
  ProFormRadio,
  ProFormSelect,
  ProFormSwitch,
  ProFormText,
  ProFormTextArea,
} from "@ant-design/pro-components";
import { message, Tabs } from "antd";

type CustomerType = "Cá nhân" | "Doanh nghiệp";
type EnterpriseTab = "ttdn" | "nldd";

type CustomerEditPayload = {
  id?: string;
  loaiKhachHang: CustomerType;

  /** ===== CÁ NHÂN ===== */
  quyDanh?: string;
  hoVaTen?: string;
  code?: string;

  quocTich?: string;
  loaiGiayTo?: string;
  soGiayTo?: string;
  ngaySinh?: string;
  diDong?: string;

  ngayCap?: string;
  noiCap?: string;
  noiCapEN?: string;
  diDong2?: string;

  ngayHetHan?: string;
  email?: string;
  email2?: string;

  maSoThue?: string;
  nguyenQuan?: string;
  nguyenQuanEN?: string;

  diaChiThuongTru?: string;
  xaHuyenTinhThuongTru?: string;
  diaChiThuongTruEN?: string;

  diaChiLienHe?: string;
  xaHuyenTinhLienHe?: string;
  diaChiLienHeEN?: string;

  nganHang?: string;
  chiNhanh?: string;
  soTaiKhoan?: string;
  loaiBDS?: string;

  ngheNghiep?: string;
  mucDich?: string;
  nguonDen?: string;

  duAn?: string;
  sanPhamQuanTam?: string;

  chucVu?: string;
  thoiDiemLienHe?: string;
  mucThuNhap?: number;
  nhomKhachHang?: string;

  nhanVien?: string;
  capDo?: string;
  gioiTinh?: string;

  ghiChu?: string;

  maFast?: string;
  ngayDongBo?: string;
  daDongBo?: boolean;

  /** ===== DOANH NGHIỆP: Thông tin DN ===== */
  tenCongTy?: string;
  tenCongTyEN?: string;
  maSoThueCty?: string;

  soGPKD?: string;
  ngayCapGPKD?: string;
  noiCapGPKD?: string;
  dienThoaiCty?: string;

  fax?: string;
  ngayCapLaiGPKD?: string;
  noiCapGPKDEN?: string;
  emailCty?: string;

  diaChiCongTy?: string;
  diaChiCongTyEN?: string;
  diaChiLienLacCty?: string;
  diaChiLienLacCtyEN?: string;

  nganHangCty?: string;
  chiNhanhCty?: string;
  soTaiKhoanCty?: string;
  loaiBDS_1?: string;

  loaiHinhKD?: string;
  loaiBDS_2?: string;
  nguonDenCty?: string;

  duAnCty?: string;
  sanPhamQuanTamCty?: string;
  nhomKhachHangCty?: string;

  nhanVienCty?: string;
  mucDichCty?: string;
  capDoCty?: string;
  thoiDiemLienHeCty?: string;

  ghiChuCty?: string;
  maFastCty?: string;
  ngayDongBoCty?: string;
  daDongBoCty?: boolean;

  /** ===== DOANH NGHIỆP: Người đại diện ===== */
  nldd_quyDanh?: string;
  nldd_hoVaTen?: string;
  nldd_ngaySinh?: string;

  nldd_quocTich?: string;
  nldd_loaiGiayTo?: string;
  nldd_soGiayTo?: string;
  nldd_ngayCap?: string;
  nldd_ngayHetHan?: string;

  nldd_noiCap?: string;
  nldd_noiCapEN?: string;

  nldd_diDong?: string;
  nldd_diDong2?: string;

  nldd_email?: string;
  nldd_email2?: string;

  nldd_chucVu?: string;
  nldd_chucVuEN?: string;
  nldd_maSoThueCaNhan?: string;

  nldd_nguyenQuan?: string;
  nldd_nguyenQuanEN?: string;

  nldd_diaChiThuongTru?: string;
  nldd_xaHuyenTinhThuongTru?: string;
  nldd_diaChiThuongTruEN?: string;

  nldd_diaChiLienHe?: string;
  nldd_xaHuyenTinhLienHe?: string;
  nldd_diaChiLienHeEN?: string;

  nldd_gioiTinh?: string;
};

const CustomerEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const formRef = useRef<ProFormInstance<CustomerEditPayload> | null>(null);
  const [customerType, setCustomerType] = useState<CustomerType>("Cá nhân");
  const [enterpriseTab, setEnterpriseTab] = useState<EnterpriseTab>("ttdn");
  const fullWidth = { style: { width: "100%" } };

  const demoData = useMemo<CustomerEditPayload>(() => {
    if (id === "2") {
      return {
        id,
        loaiKhachHang: "Doanh nghiệp",
        code: "030296021615",
        tenCongTy: "CÔNG TY ABC",
        tenCongTyEN: "ABC COMPANY",
        maSoThueCty: "030296021615",
        soGPKD: "GP-123",
        dienThoaiCty: "0909000000",
        emailCty: "abc@company.com",
        loaiBDS_1: "Đất nền",
        loaiBDS_2: "Đất nền",
        capDoCty: "Chờ xử lý",
        nhanVienCty: "BC1579",
        daDongBoCty: false,

        // người đại diện
        nldd_quyDanh: "Mr",
        nldd_hoVaTenDem: "NGUYỄN VĂN",
        nldd_ten: "A",
        nldd_quocTich: "Việt Nam",
        nldd_gioiTinh: "Không xác định",
      };
    }

    return {
      id,
      loaiKhachHang: "Cá nhân",
      quyDanh: "Mr",
      hoVaTen: "BÙI QUỲNH ANH",
      code: "030296021611",
      quocTich: "Việt Nam",
      loaiGiayTo: "Thẻ căn cước nhân dân",
      soGiayTo: "079307004898",
      diDong: "0903316742",
      email: "thy_huong78@yahoo.com",
      capDo: "Chờ xử lý",
      nhomKhachHang: "Chưa phân loại",
      gioiTinh: "Nữ",
      daDongBo: true,
      loaiBDS: "Đất nền",
      ngheNghiep: "Chưa phân loại",
      mucDich: "[Chưa chọn]",
      nguonDen: "[Chưa chọn]",
    };
  }, [id]);

  useEffect(() => {
    setCustomerType(demoData.loaiKhachHang);
    formRef.current?.setFieldsValue(demoData);
  }, [demoData]);

  const onFinish = async (values: CustomerEditPayload) => {
    console.log("UPDATE CUSTOMER:", values);
    message.success("Cập nhật khách hàng (demo) thành công!");
    history.push("/customer");
    return true;
  };

  const optQuyDanh = [
    { label: "Mr", value: "Mr" },
    { label: "Mrs", value: "Mrs" },
    { label: "Ms", value: "Ms" },
  ];

  const optQuocTich = [
    { label: "Việt Nam", value: "Việt Nam" },
    { label: "Khác", value: "Khác" },
  ];

  const optLoaiGiayTo = [
    { label: "Thẻ căn cước nhân dân", value: "Thẻ căn cước nhân dân" },
    { label: "CMND", value: "CMND" },
    { label: "Passport", value: "Passport" },
  ];

  const optLoaiBDS = [
    { label: "Đất nền", value: "Đất nền" },
    { label: "Căn hộ", value: "Căn hộ" },
    { label: "Nhà phố", value: "Nhà phố" },
    { label: "Khác", value: "Khác" },
  ];

  const optCapDo = [
    { label: "Chờ xử lý", value: "Chờ xử lý" },
    { label: "Đang chăm sóc", value: "Đang chăm sóc" },
    { label: "Đã chuyển đổi", value: "Đã chuyển đổi" },
  ];

  const optNhomKH = [
    { label: "Chưa phân loại", value: "Chưa phân loại" },
    { label: "VIP", value: "VIP" },
  ];

  const optGioiTinh = [
    { label: "Không xác định", value: "Không xác định" },
    { label: "Nam", value: "Nam" },
    { label: "Nữ", value: "Nữ" },
  ];

  return (
    <PageContainer title={`Sửa khách hàng #${id}`} onBack={() => history.push("/customer")}>
      <ProCard className="rounded-xl">
        <ProForm<CustomerEditPayload>
          formRef={formRef}
          layout="vertical"
          grid
          colProps={{ span: 24 }}
          rowProps={{ gutter: [12, 10] }}
          onFinish={onFinish}
          submitter={{
            searchConfig: { submitText: "Lưu & Thoát", resetText: "Hủy" },
            resetButtonProps: {
              onClick: (e) => {
                e.preventDefault();
                history.push("/customer");
              },
            },
          }}
        >
          {/* Tabs loại khách hàng */}
          <ProCard bordered className="rounded-xl mb-4" bodyStyle={{ paddingTop: 8, paddingBottom: 0 }}>
            <Tabs
              activeKey={customerType}
              onChange={(key) => {
                const next = key as CustomerType;
                setCustomerType(next);
                formRef.current?.setFieldsValue({ loaiKhachHang: next });
              }}
              items={[
                { key: "Cá nhân", label: "Cá nhân" },
                { key: "Doanh nghiệp", label: "Doanh nghiệp" },
              ]}
            />
          </ProCard>

          {/* ========== CÁ NHÂN ========== */}
          {customerType === "Cá nhân" ? (
            <ProCard
              title="1. CÁ NHÂN"
              bordered
              headerBordered
              className="rounded-xl"
              bodyStyle={{ paddingTop: 12, paddingBottom: 12 }}
            >
              <ProForm.Group>
                <ProFormSelect name="quyDanh" label="Quý danh" colProps={{ span: 6 }} fieldProps={fullWidth} options={optQuyDanh} />
                <ProFormText name="hoVaTen" label="Họ và tên" colProps={{ span: 6 }} fieldProps={fullWidth} />
                <ProFormText name="code" label="Code" colProps={{ span: 6 }} fieldProps={fullWidth} />
              </ProForm.Group>

              <ProForm.Group>
                <ProFormSelect name="quocTich" label="Quốc tịch" colProps={{ span: 6 }} fieldProps={fullWidth} options={optQuocTich} />
                <ProFormSelect name="loaiGiayTo" label="Loại giấy tờ" colProps={{ span: 6 }} fieldProps={fullWidth} options={optLoaiGiayTo} />
                <ProFormText name="soGiayTo" label="Số giấy tờ" colProps={{ span: 6 }} fieldProps={fullWidth} />
                <ProFormDatePicker name="ngaySinh" label="Ngày sinh" colProps={{ span: 3 }} fieldProps={fullWidth} />
                <ProFormText name="diDong" label="Di động" colProps={{ span: 3 }} fieldProps={fullWidth} />
              </ProForm.Group>

              <ProForm.Group>
                <ProFormDatePicker name="ngayCap" label="Ngày cấp" colProps={{ span: 6 }} fieldProps={fullWidth} />
                <ProFormText name="noiCap" label="Nơi cấp" colProps={{ span: 6 }} fieldProps={fullWidth} />
                <ProFormText name="noiCapEN" label="Nơi cấp EN" colProps={{ span: 6 }} fieldProps={fullWidth} />
                <ProFormText name="diDong2" label="Di động 2" colProps={{ span: 6 }} fieldProps={fullWidth} />
              </ProForm.Group>

              <ProForm.Group>
                <ProFormDatePicker name="ngayHetHan" label="Ngày hết hạn" colProps={{ span: 6 }} fieldProps={fullWidth} />
                <ProFormText name="email" label="Email" colProps={{ span: 9 }} fieldProps={fullWidth} />
                <ProFormText name="email2" label="Email 2" colProps={{ span: 9 }} fieldProps={fullWidth} />
              </ProForm.Group>

              <ProForm.Group>
                <ProFormText name="maSoThue" label="Mã số thuế" colProps={{ span: 6 }} fieldProps={fullWidth} />
                <ProFormText name="nguyenQuan" label="Nguyên quán" colProps={{ span: 9 }} fieldProps={fullWidth} />
                <ProFormText name="nguyenQuanEN" label="Nguyên quán EN" colProps={{ span: 9 }} fieldProps={fullWidth} />
              </ProForm.Group>

              <ProForm.Group>
                <ProFormTextArea
                  name="diaChiThuongTru"
                  label="Địa chỉ Thường trú"
                  colProps={{ span: 12 }}
                  fieldProps={{ ...fullWidth, rows: 2 }}
                />
                <ProFormSelect
                  name="xaHuyenTinhThuongTru"
                  label="Xã, huyện, tỉnh - Thường trú"
                  colProps={{ span: 12 }}
                  fieldProps={fullWidth}
                  options={[{ label: "Chọn / Select", value: "" }]}
                />
              </ProForm.Group>
              <ProFormTextArea
                name="diaChiThuongTruEN"
                label="Địa chỉ Thường trú EN"
                colProps={{ span: 24 }}
                fieldProps={{ ...fullWidth, rows: 2 }}
              />

              <ProForm.Group>
                <ProFormTextArea
                  name="diaChiLienHe"
                  label="Địa chỉ Liên hệ"
                  colProps={{ span: 12 }}
                  fieldProps={{ ...fullWidth, rows: 2 }}
                />
                <ProFormSelect
                  name="xaHuyenTinhLienHe"
                  label="Xã, huyện, tỉnh - Liên hệ"
                  colProps={{ span: 12 }}
                  fieldProps={fullWidth}
                  options={[{ label: "Chọn / Select", value: "" }]}
                />
              </ProForm.Group>
              <ProFormTextArea
                name="diaChiLienHeEN"
                label="Địa chỉ Liên hệ EN"
                colProps={{ span: 24 }}
                fieldProps={{ ...fullWidth, rows: 2 }}
              />

              <ProForm.Group>
                <ProFormSelect name="nganHang" label="Ngân hàng" colProps={{ span: 8 }} fieldProps={fullWidth} options={[{ label: "Chọn", value: "" }]} />
                <ProFormText name="chiNhanh" label="Chi nhánh" colProps={{ span: 5 }} fieldProps={fullWidth} />
                <ProFormText name="soTaiKhoan" label="Số tài khoản" colProps={{ span: 5 }} fieldProps={fullWidth} />
                <ProFormSelect name="loaiBDS" label="Loại BĐS" colProps={{ span: 6 }} fieldProps={fullWidth} options={optLoaiBDS} />
              </ProForm.Group>

              <ProForm.Group>
                <ProFormSelect
                  name="ngheNghiep"
                  label="Nghề nghiệp"
                  colProps={{ span: 8 }}
                  fieldProps={fullWidth}
                  options={[
                    { label: "Chưa phân loại", value: "Chưa phân loại" },
                    { label: "Khác", value: "Khác" },
                  ]}
                />
                <ProFormSelect name="mucDich" label="Mục đích" colProps={{ span: 8 }} fieldProps={fullWidth} options={[{ label: "[Chưa chọn]", value: "[Chưa chọn]" }]} />
                <ProFormSelect name="nguonDen" label="Nguồn đến" colProps={{ span: 8 }} fieldProps={fullWidth} options={[{ label: "[Chưa chọn]", value: "[Chưa chọn]" }]} />
              </ProForm.Group>

              <ProForm.Group>
                <ProFormSelect name="duAn" label="Dự án" colProps={{ span: 8 }} fieldProps={fullWidth} options={[{ label: "0", value: "0" }]} />
                <ProFormText name="sanPhamQuanTam" label="Sản phẩm quan tâm" colProps={{ span: 16 }} fieldProps={fullWidth} />
              </ProForm.Group>

              <ProForm.Group>
                <ProFormText name="chucVu" label="Chức vụ" colProps={{ span: 8 }} fieldProps={fullWidth} />
                <ProFormSelect
                  name="thoiDiemLienHe"
                  label="Thời điểm liên hệ"
                  colProps={{ span: 6 }}
                  fieldProps={fullWidth}
                  options={[
                    { label: "Đầu giờ chiều t4", value: "Đầu giờ chiều t4" },
                    { label: "Khác", value: "Khác" },
                  ]}
                />
                <ProFormDigit name="mucThuNhap" label="Mức thu nhập" colProps={{ span: 5 }} min={0} fieldProps={{ ...fullWidth, precision: 0 }} />
                <ProFormSelect name="nhomKhachHang" label="Nhóm Khách hàng" colProps={{ span: 5 }} fieldProps={fullWidth} options={optNhomKH} />
              </ProForm.Group>

              <ProForm.Group>
                <ProFormText name="nhanVien" label="Nhân viên" colProps={{ span: 8 }} fieldProps={fullWidth} placeholder="VD: BC1579" />
                <ProFormSelect name="capDo" label="Cấp độ" colProps={{ span: 8 }} fieldProps={fullWidth} options={optCapDo} />
                <ProFormSelect name="gioiTinh" label="Giới tính" colProps={{ span: 8 }} fieldProps={fullWidth} options={optGioiTinh} />
              </ProForm.Group>

              <ProFormTextArea name="ghiChu" label="Ghi chú" colProps={{ span: 24 }} fieldProps={{ ...fullWidth, rows: 2 }} />

              <ProForm.Group>
                <ProFormText name="maFast" label="Mã Fast" colProps={{ span: 9 }} fieldProps={fullWidth} />
                <ProFormDatePicker name="ngayDongBo" label="Ngày đồng bộ" colProps={{ span: 9 }} fieldProps={fullWidth} />
                <ProFormSwitch
                  name="daDongBo"
                  label="Đã đồng bộ"
                  colProps={{ span: 6 }}
                  fieldProps={{ checkedChildren: "Đã đồng bộ", unCheckedChildren: "Chưa đồng bộ" }}
                />
              </ProForm.Group>
            </ProCard>
          ) : (
            /* ========== DOANH NGHIỆP ========== */
            <ProCard
              title="2. DOANH NGHIỆP"
              bordered
              headerBordered
              className="rounded-xl"
              bodyStyle={{ paddingTop: 12, paddingBottom: 12 }}
            >
              <Tabs
                className="mb-2"
                activeKey={enterpriseTab}
                onChange={(k) => setEnterpriseTab(k as EnterpriseTab)}
                items={[
                  { key: "ttdn", label: "Thông tin doanh nghiệp" },
                  { key: "nldd", label: "Thông tin người đại diện" },
                ]}
              />

              {/* ===== Thông tin doanh nghiệp ===== */}
              {enterpriseTab === "ttdn" ? (
                <>
                  <ProForm.Group>
                    <ProFormText name="tenCongTy" label="Tên công ty" colProps={{ span: 18 }} fieldProps={fullWidth} rules={[{ required: true, message: "Vui lòng nhập tên công ty" }]} />
                    <ProFormText name="code" label="Code" colProps={{ span: 6 }} fieldProps={fullWidth} />
                  </ProForm.Group>

                  <ProForm.Group>
                    <ProFormText name="tenCongTyEN" label="Tên công ty EN" colProps={{ span: 18 }} fieldProps={fullWidth} />
                    <ProFormText name="maSoThueCty" label="Mã số thuế Cty" colProps={{ span: 6 }} fieldProps={fullWidth} />
                  </ProForm.Group>

                  <ProForm.Group>
                    <ProFormText name="soGPKD" label="Số GPKD" colProps={{ span: 6 }} fieldProps={fullWidth} />
                    <ProFormDatePicker name="ngayCapGPKD" label="Ngày cấp GPKD" colProps={{ span: 6 }} fieldProps={fullWidth} />
                    <ProFormText name="noiCapGPKD" label="Nơi cấp GPKD" colProps={{ span: 6 }} fieldProps={fullWidth} />
                    <ProFormText name="dienThoaiCty" label="Điện thoại Cty" colProps={{ span: 6 }} fieldProps={fullWidth} />
                  </ProForm.Group>

                  <ProForm.Group>
                    <ProFormText name="fax" label="Fax" colProps={{ span: 6 }} fieldProps={fullWidth} />
                    <ProFormDatePicker name="ngayCapLaiGPKD" label="Ngày cấp lại GPKD" colProps={{ span: 6 }} fieldProps={fullWidth} />
                    <ProFormText name="noiCapGPKDEN" label="Nơi cấp GPKD EN" colProps={{ span: 6 }} fieldProps={fullWidth} />
                    <ProFormText name="emailCty" label="Email Cty" colProps={{ span: 6 }} fieldProps={fullWidth} />
                  </ProForm.Group>

                  <ProFormTextArea name="diaChiCongTy" label="Địa chỉ Công ty" colProps={{ span: 24 }} fieldProps={{ ...fullWidth, rows: 2 }} />
                  <ProFormTextArea name="diaChiCongTyEN" label="Địa chỉ Công ty EN" colProps={{ span: 24 }} fieldProps={{ ...fullWidth, rows: 2 }} />
                  <ProFormTextArea name="diaChiLienLacCty" label="Địa chỉ liên lạc Công ty" colProps={{ span: 24 }} fieldProps={{ ...fullWidth, rows: 2 }} />
                  <ProFormTextArea name="diaChiLienLacCtyEN" label="Địa chỉ liên lạc Công ty EN" colProps={{ span: 24 }} fieldProps={{ ...fullWidth, rows: 2 }} />

                  <ProForm.Group>
                    <ProFormSelect name="nganHangCty" label="Ngân hàng" colProps={{ span: 8 }} fieldProps={fullWidth} options={[{ label: "Chọn", value: "" }]} />
                    <ProFormText name="chiNhanhCty" label="Chi nhánh" colProps={{ span: 5 }} fieldProps={fullWidth} />
                    <ProFormText name="soTaiKhoanCty" label="Số tài khoản" colProps={{ span: 5 }} fieldProps={fullWidth} />
                    <ProFormSelect name="loaiBDS_1" label="Loại BĐS" colProps={{ span: 6 }} fieldProps={fullWidth} options={optLoaiBDS} />
                  </ProForm.Group>

                  <ProForm.Group>
                    <ProFormText name="loaiHinhKD" label="Loại hình KD" colProps={{ span: 8 }} fieldProps={fullWidth} />
                    <ProFormSelect name="loaiBDS_2" label="Loại BĐS" colProps={{ span: 8 }} fieldProps={fullWidth} options={optLoaiBDS} />
                    <ProFormSelect name="nguonDenCty" label="Nguồn đến" colProps={{ span: 8 }} fieldProps={fullWidth} options={[{ label: "[Chưa chọn]", value: "[Chưa chọn]" }]} />
                  </ProForm.Group>

                  <ProForm.Group>
                    <ProFormSelect name="duAnCty" label="Dự án" colProps={{ span: 8 }} fieldProps={fullWidth} options={[{ label: "0", value: "0" }]} />
                    <ProFormText name="sanPhamQuanTamCty" label="Sản phẩm quan tâm" colProps={{ span: 10 }} fieldProps={fullWidth} />
                    <ProFormSelect name="nhomKhachHangCty" label="Nhóm Khách hàng" colProps={{ span: 6 }} fieldProps={fullWidth} options={optNhomKH} />
                  </ProForm.Group>

                  <ProForm.Group>
                    <ProFormText name="nhanVienCty" label="Nhân viên" colProps={{ span: 6 }} fieldProps={fullWidth} placeholder="VD: BC1579" />
                    <ProFormSelect name="mucDichCty" label="Mục đích" colProps={{ span: 6 }} fieldProps={fullWidth} options={[{ label: "[Chưa chọn]", value: "[Chưa chọn]" }]} />
                    <ProFormSelect name="capDoCty" label="Cấp độ" colProps={{ span: 6 }} fieldProps={fullWidth} options={optCapDo} />
                    <ProFormSelect name="thoiDiemLienHeCty" label="Thời điểm liên hệ" colProps={{ span: 6 }} fieldProps={fullWidth} options={[{ label: "[Chưa chọn]", value: "[Chưa chọn]" }]} />
                  </ProForm.Group>

                  <ProFormTextArea name="ghiChuCty" label="Ghi chú" colProps={{ span: 24 }} fieldProps={{ ...fullWidth, rows: 2 }} />

                  <ProForm.Group>
                    <ProFormText name="maFastCty" label="Mã Fast" colProps={{ span: 9 }} fieldProps={fullWidth} />
                    <ProFormDatePicker name="ngayDongBoCty" label="Ngày đồng bộ" colProps={{ span: 9 }} fieldProps={fullWidth} />
                    <ProFormSwitch
                      name="daDongBoCty"
                      label="Đã đồng bộ"
                      colProps={{ span: 6 }}
                      fieldProps={{ checkedChildren: "Đã đồng bộ", unCheckedChildren: "Chưa đồng bộ" }}
                    />
                  </ProForm.Group>
                </>
              ) : (
                /* ===== Thông tin người đại diện ===== */
                <>
                  <ProForm.Group>
                    <ProFormSelect name="nldd_quyDanh" label="Quý danh" colProps={{ span: 6 }} fieldProps={fullWidth} options={optQuyDanh} />
                    <ProFormText name="nldd_hoVaTen" label="Họ và tên" colProps={{ span: 9 }} fieldProps={fullWidth} />
                    <ProFormDatePicker name="nldd_ngaySinh" label="Ngày sinh" colProps={{ span: 4 }} fieldProps={fullWidth} />
                  </ProForm.Group>

                  <ProForm.Group>
                    <ProFormSelect name="nldd_quocTich" label="Quốc tịch" colProps={{ span: 6 }} fieldProps={fullWidth} options={optQuocTich} />
                    <ProFormSelect name="nldd_loaiGiayTo" label="Loại giấy tờ" colProps={{ span: 6 }} fieldProps={fullWidth} options={optLoaiGiayTo} />
                    <ProFormText name="nldd_soGiayTo" label="Số giấy tờ" colProps={{ span: 6 }} fieldProps={fullWidth} />
                    <ProFormDatePicker name="nldd_ngayCap" label="Ngày cấp" colProps={{ span: 3 }} fieldProps={fullWidth} />
                    <ProFormDatePicker name="nldd_ngayHetHan" label="Ngày hết hạn" colProps={{ span: 3 }} fieldProps={fullWidth} />
                  </ProForm.Group>

                  <ProForm.Group>
                    <ProFormText name="nldd_noiCap" label="Nơi cấp" colProps={{ span: 12 }} fieldProps={fullWidth} />
                    <ProFormText name="nldd_noiCapEN" label="Nơi cấp EN" colProps={{ span: 12 }} fieldProps={fullWidth} />
                  </ProForm.Group>

                  <ProForm.Group>
                    <ProFormText name="nldd_diDong" label="Di động" colProps={{ span: 6 }} fieldProps={fullWidth} />
                    <ProFormText name="nldd_diDong2" label="Di động 2" colProps={{ span: 6 }} fieldProps={fullWidth} />
                    <ProFormText name="nldd_email" label="Email" colProps={{ span: 6 }} fieldProps={fullWidth} />
                    <ProFormText name="nldd_email2" label="Email 2" colProps={{ span: 6 }} fieldProps={fullWidth} />
                  </ProForm.Group>

                  <ProForm.Group>
                    <ProFormText name="nldd_chucVu" label="Chức vụ" colProps={{ span: 8 }} fieldProps={fullWidth} />
                    <ProFormText name="nldd_chucVuEN" label="Chức vụ EN" colProps={{ span: 8 }} fieldProps={fullWidth} />
                    <ProFormText name="nldd_maSoThueCaNhan" label="Mã số thuế cá nhân" colProps={{ span: 8 }} fieldProps={fullWidth} />
                  </ProForm.Group>

                  <ProForm.Group>
                    <ProFormText name="nldd_nguyenQuan" label="Nguyên quán" colProps={{ span: 12 }} fieldProps={fullWidth} />
                    <ProFormText name="nldd_nguyenQuanEN" label="Nguyên quán EN" colProps={{ span: 12 }} fieldProps={fullWidth} />
                  </ProForm.Group>

                  <ProForm.Group>
                    <ProFormTextArea name="nldd_diaChiThuongTru" label="Địa chỉ Thường trú" colProps={{ span: 12 }} fieldProps={{ ...fullWidth, rows: 2 }} />
                    <ProFormSelect
                      name="nldd_xaHuyenTinhThuongTru"
                      label="Xã, huyện, tỉnh - Thường trú"
                      colProps={{ span: 12 }}
                      fieldProps={fullWidth}
                      options={[{ label: "Chọn / Select", value: "" }]}
                    />
                  </ProForm.Group>
                  <ProFormTextArea name="nldd_diaChiThuongTruEN" label="Địa chỉ Thường trú EN" colProps={{ span: 24 }} fieldProps={{ ...fullWidth, rows: 2 }} />

                  <ProForm.Group>
                    <ProFormTextArea name="nldd_diaChiLienHe" label="Địa chỉ Liên hệ" colProps={{ span: 12 }} fieldProps={{ ...fullWidth, rows: 2 }} />
                    <ProFormSelect
                      name="nldd_xaHuyenTinhLienHe"
                      label="Xã, huyện, tỉnh - Liên hệ"
                      colProps={{ span: 12 }}
                      fieldProps={fullWidth}
                      options={[{ label: "Chọn / Select", value: "" }]}
                    />
                  </ProForm.Group>
                  <ProFormTextArea name="nldd_diaChiLienHeEN" label="Địa chỉ Liên hệ EN" colProps={{ span: 24 }} fieldProps={{ ...fullWidth, rows: 2 }} />

                  <ProFormSelect name="nldd_gioiTinh" label="Giới tính" colProps={{ span: 6 }} fieldProps={fullWidth} options={optGioiTinh} />
                </>
              )}
            </ProCard>
          )}
        </ProForm>
      </ProCard>
    </PageContainer>
  );
};

export default CustomerEdit;
