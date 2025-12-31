import {
  PageContainer,
  ProCard,
  ProForm,
  ProFormDatePicker,
  ProFormInstance,
  ProFormSelect,
  ProFormSwitch,
  ProFormText,
  ProFormTextArea,
} from "@ant-design/pro-components";
import { history } from "@umijs/max";
import { Collapse, message, Tabs } from "antd";
import React, { useRef, useState } from "react";

type CustomerCreatePayload = {
  loaiKhachHang: "Cá nhân" | "Doanh nghiệp";
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

  /** ===== Doanh nghiệp ===== */
  tenCongTy?: string;
  tenCongTyEN?: string;
  maSoThueCty?: string;
  soGPKD?: string;
  ngayCapGPKD?: string;
  noiCapGPKD?: string;
  fax?: string;
  ngayCapLaiGPKD?: string;
  noiCapGPKDEN?: string;
  dienThoaiCty?: string;
  emailCty?: string;
  diaChiCongTy?: string;
  diaChiCongTyEN?: string;
  diaChiLienLacCty?: string;
  diaChiLienLacCtyEN?: string;
  loaiHinhKD?: string;
  loaiBDS_1?: string;
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

  // ===== Người đại diện =====
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

const CustomerCreate: React.FC = () => {
  const fullWidth = { style: { width: "100%" } };
  const [customerType, setCustomerType] = useState<"Cá nhân" | "Doanh nghiệp">(
    "Cá nhân"
  );
  const [enterpriseTab, setEnterpriseTab] = useState<"ttdn" | "nldd">("ttdn");
  const formRef = useRef<ProFormInstance<CustomerCreatePayload> | null>(null);

  const onFinish = async (values: CustomerCreatePayload) => {
    console.log("CREATE CUSTOMER:", values);
    message.success("Tạo khách hàng (demo) thành công!");
    history.push("/customer");
    return true;
  };

  return (
    <PageContainer title="Khách hàng">
      <ProCard className="rounded-xl">
        <ProForm<CustomerCreatePayload>
          formRef={formRef}
          layout="vertical"
          grid
          colProps={{ span: 24 }}
          rowProps={{ gutter: [12, 10] }}
          onFinish={onFinish}
          initialValues={{
            quyDanh: "Mr",
            quocTich: "Việt Nam",
            loaiGiayTo: "",
            loaiBDS: "Đất nền",
            ngheNghiep: "Chưa phân loại",
            mucDich: "[Chưa chọn]",
            nguonDen: "[Chưa chọn]",
            capDo: "Chờ xử lý",
            gioiTinh: "Không xác định",
            nhomKhachHang: "Chưa phân loại",
            loaiKhachHang: "Cá nhân",
            daDongBo: false,
          }}
          submitter={{
            searchConfig: {
              submitText: "Lưu và Thoát",
              resetText: "Hủy",
            },
            resetButtonProps: {
              onClick: (e) => {
                e.preventDefault();
                history.push("/crm/customer");
              },
            },
          }}
        >
          <ProCard
            bordered
            className="rounded-xl"
            bodyStyle={{ paddingTop: 12, paddingBottom: 12 }}
          >
            <Tabs
              activeKey={customerType}
              onChange={(key) => {
                const next = key as "Cá nhân" | "Doanh nghiệp";
                setCustomerType(next);

                formRef?.current?.setFieldsValue({ loaiKhachHang: next });
              }}
              items={[
                {
                  key: "Cá nhân",
                  label: "Cá nhân",
                },
                {
                  key: "Doanh nghiệp",
                  label: "Doanh nghiệp",
                },
              ]}
            />
          </ProCard>

          {customerType === "Cá nhân" ? (
            <>
              {/* ===== 1. CÁ NHÂN ===== */}
              <ProCard
                title="1. CÁ NHÂN"
                bordered
                headerBordered
                className="mb-4 rounded-xl"
                bodyStyle={{ paddingTop: 12, paddingBottom: 12 }}
              >
                <Collapse
                  defaultActiveKey={["basic"]} // panel mở mặc định
                  className="rounded-xl"
                  items={[
                    {
                      key: "basic",
                      label: "A. Thông tin cơ bản",
                      children: (
                        <>
                          <ProForm.Group>
                            <ProFormSelect
                              name="quyDanh"
                              label="Quý danh"
                              colProps={{ span: 12 }}
                              fieldProps={fullWidth}
                              rules={[
                                {
                                  required: true,
                                  message: "Vui lòng nhập quý danh",
                                },
                              ]}
                              options={[
                                { label: "Mr", value: "Mr" },
                                { label: "Mrs", value: "Mrs" },
                                { label: "Ms", value: "Ms" },
                              ]}
                            />

                            <ProFormText
                              name="hoVaTen"
                              label="Họ và tên"
                              colProps={{ span: 12 }}
                              fieldProps={fullWidth}
                              rules={[
                                {
                                  required: true,
                                  message: "Vui lòng nhập họ và tên",
                                },
                              ]}
                            />
                          </ProForm.Group>

                          <ProForm.Group>
                            <ProFormText
                              name="code"
                              label="Code"
                              colProps={{ span: 12 }}
                              fieldProps={fullWidth}
                            />

                            <ProFormSelect
                              name="gioiTinh"
                              label="Giới tính"
                              colProps={{ span: 12 }}
                              fieldProps={fullWidth}
                              options={[
                                {
                                  label: "Không xác định",
                                  value: "Không xác định",
                                },
                                { label: "Nam", value: "Nam" },
                                { label: "Nữ", value: "Nữ" },
                              ]}
                            />
                          </ProForm.Group>

                          <ProForm.Group>
                            <ProFormDatePicker
                              name="ngaySinh"
                              label="Ngày sinh"
                              colProps={{ span: 12 }}
                              fieldProps={fullWidth}
                            />

                            <ProFormSelect
                              name="quocTich"
                              label="Quốc tịch"
                              colProps={{ span: 12 }}
                              fieldProps={fullWidth}
                              options={[
                                { label: "Việt Nam", value: "Việt Nam" },
                                { label: "Khác", value: "Khác" },
                              ]}
                            />
                          </ProForm.Group>
                        </>
                      ),
                    },
                    {
                      key: "id",
                      label: "B. Giấy tờ tuỳ thân",
                      children: (
                        <>
                          <ProForm.Group>
                            <ProFormSelect
                              name="loaiGiayTo"
                              label="Loại giấy tờ"
                              colProps={{ span: 12 }}
                              fieldProps={fullWidth}
                              rules={[
                                {
                                  required: true,
                                  message: "Vui lòng nhập loại giấy tờ",
                                },
                              ]}
                              options={[
                                { label: "CCCD", value: "CCCD" },
                                { label: "CMND", value: "CMND" },
                                { label: "Passport", value: "Passport" },
                              ]}
                            />

                            <ProFormText
                              name="soGiayTo"
                              label="Số giấy tờ"
                              colProps={{ span: 12 }}
                              fieldProps={fullWidth}
                            />
                          </ProForm.Group>

                          <ProForm.Group>
                            <ProFormDatePicker
                              name="ngayCap"
                              label="Ngày cấp"
                              colProps={{ span: 12 }}
                              fieldProps={fullWidth}
                            />

                            <ProFormDatePicker
                              name="ngayHetHan"
                              label="Ngày hết hạn"
                              colProps={{ span: 12 }}
                              fieldProps={fullWidth}
                            />
                          </ProForm.Group>

                          <ProForm.Group>
                            <ProFormText
                              name="noiCap"
                              label="Nơi cấp"
                              colProps={{ span: 12 }}
                              fieldProps={fullWidth}
                            />

                            <ProFormText
                              name="noiCapEN"
                              label="Nơi cấp EN"
                              colProps={{ span: 12 }}
                              fieldProps={fullWidth}
                            />
                          </ProForm.Group>
                        </>
                      ),
                    },
                    {
                      key: "contact",
                      label: "C. Thông tin liên hệ",
                      children: (
                        <>
                          <ProForm.Group>
                            <ProFormText
                              name="diDong"
                              label="Di động"
                              colProps={{ span: 12 }}
                              fieldProps={fullWidth}
                            />
                            <ProFormText
                              name="diDong2"
                              label="Di động 2"
                              colProps={{ span: 12 }}
                              fieldProps={fullWidth}
                            />
                          </ProForm.Group>

                          <ProForm.Group>
                            <ProFormText
                              name="email"
                              label="Email"
                              colProps={{ span: 12 }}
                              fieldProps={fullWidth}
                            />
                            <ProFormText
                              name="email2"
                              label="Email 2"
                              colProps={{ span: 12 }}
                              fieldProps={fullWidth}
                            />
                          </ProForm.Group>

                          <ProForm.Group>
                            <ProFormSelect
                              name="thoiDiemLienHe"
                              label="Thời điểm liên hệ"
                              colProps={{ span: 12 }}
                              fieldProps={fullWidth}
                              options={[
                                {
                                  label: "Đầu giờ chiều t4",
                                  value: "Đầu giờ chiều t4",
                                },
                                { label: "Khác", value: "Khác" },
                              ]}
                            />
                            <div className="w-full" />
                          </ProForm.Group>
                        </>
                      ),
                    },

                    {
                      key: "address",
                      label: "D. Địa chỉ",
                      children: (
                        <>
                          <ProForm.Group>
                            <ProFormText
                              name="nguyenQuan"
                              label="Nguyên quán"
                              colProps={{ span: 12 }}
                              fieldProps={fullWidth}
                            />
                            <ProFormText
                              name="nguyenQuanEN"
                              label="Nguyên quán EN"
                              colProps={{ span: 12 }}
                              fieldProps={fullWidth}
                            />
                          </ProForm.Group>

                          <ProForm.Group>
                            <ProFormTextArea
                              name="diaChiThuongTru"
                              label="Địa chỉ Thường trú"
                              colProps={{ span: 24 }}
                              fieldProps={{ ...fullWidth, rows: 2 }}
                            />
                          </ProForm.Group>

                          <ProForm.Group>
                            <ProFormSelect
                              name="xaHuyenTinhThuongTru"
                              label="Xã, huyện, tỉnh - Thường trú"
                              colProps={{ span: 12 }}
                              fieldProps={fullWidth}
                              options={[{ label: "Chọn / Select", value: "" }]}
                            />
                            <ProFormTextArea
                              name="diaChiThuongTruEN"
                              label="Địa chỉ Thường trú EN"
                              colProps={{ span: 12 }}
                              fieldProps={{ ...fullWidth, rows: 2 }}
                            />
                          </ProForm.Group>

                          <ProForm.Group>
                            <ProFormTextArea
                              name="diaChiLienHe"
                              label="Địa chỉ Liên hệ"
                              colProps={{ span: 24 }}
                              fieldProps={{ ...fullWidth, rows: 2 }}
                            />
                          </ProForm.Group>

                          <ProForm.Group>
                            <ProFormSelect
                              name="xaHuyenTinhLienHe"
                              label="Xã, huyện, tỉnh - Liên hệ"
                              colProps={{ span: 12 }}
                              fieldProps={fullWidth}
                              options={[{ label: "Chọn / Select", value: "" }]}
                            />
                            <ProFormTextArea
                              name="diaChiLienHeEN"
                              label="Địa chỉ Liên hệ EN"
                              colProps={{ span: 12 }}
                              fieldProps={{ ...fullWidth, rows: 2 }}
                            />
                          </ProForm.Group>
                        </>
                      ),
                    },

                    {
                      key: "bank_bds",
                      label: "E. Ngân hàng & BĐS",
                      children: (
                        <>
                          <ProForm.Group>
                            <ProFormSelect
                              name="nganHang"
                              label="Ngân hàng"
                              colProps={{ span: 12 }}
                              fieldProps={fullWidth}
                              options={[{ label: "Chọn", value: "" }]}
                            />
                            <ProFormText
                              name="chiNhanh"
                              label="Chi nhánh"
                              colProps={{ span: 12 }}
                              fieldProps={fullWidth}
                            />
                          </ProForm.Group>

                          <ProForm.Group>
                            <ProFormText
                              name="soTaiKhoan"
                              label="Số tài khoản"
                              colProps={{ span: 12 }}
                              fieldProps={fullWidth}
                            />
                            <ProFormSelect
                              name="loaiBDS"
                              label="Loại BĐS"
                              colProps={{ span: 12 }}
                              fieldProps={fullWidth}
                              options={[
                                { label: "Đất nền", value: "Đất nền" },
                                { label: "Căn hộ", value: "Căn hộ" },
                                { label: "Nhà phố", value: "Nhà phố" },
                                { label: "Khác", value: "Khác" },
                              ]}
                            />
                          </ProForm.Group>

                          <ProForm.Group>
                            <ProFormSelect
                              name="duAn"
                              label="Dự án"
                              colProps={{ span: 12 }}
                              fieldProps={fullWidth}
                              options={[{ label: "0", value: "0" }]}
                            />
                            <ProFormText
                              name="sanPhamQuanTam"
                              label="Sản phẩm quan tâm"
                              colProps={{ span: 12 }}
                              fieldProps={fullWidth}
                            />
                          </ProForm.Group>
                        </>
                      ),
                    },

                    {
                      key: "classify",
                      label: "F. Phân loại & trạng thái",
                      children: (
                        <>
                          <ProForm.Group>
                            <ProFormSelect
                              name="ngheNghiep"
                              label="Nghề nghiệp"
                              colProps={{ span: 12 }}
                              fieldProps={fullWidth}
                              options={[
                                {
                                  label: "Chưa phân loại",
                                  value: "Chưa phân loại",
                                },
                                { label: "Khác", value: "Khác" },
                              ]}
                            />
                            <ProFormSelect
                              name="nhomKhachHang"
                              label="Nhóm Khách hàng"
                              colProps={{ span: 12 }}
                              fieldProps={fullWidth}
                              options={[
                                {
                                  label: "Chưa phân loại",
                                  value: "Chưa phân loại",
                                },
                                { label: "VIP", value: "VIP" },
                              ]}
                            />
                          </ProForm.Group>

                          <ProForm.Group>
                            <ProFormSelect
                              name="mucDich"
                              label="Mục đích"
                              colProps={{ span: 12 }}
                              fieldProps={fullWidth}
                              options={[
                                { label: "[Chưa chọn]", value: "[Chưa chọn]" },
                              ]}
                            />
                            <ProFormSelect
                              name="nguonDen"
                              label="Nguồn đến"
                              colProps={{ span: 12 }}
                              fieldProps={fullWidth}
                              options={[
                                { label: "[Chưa chọn]", value: "[Chưa chọn]" },
                              ]}
                            />
                          </ProForm.Group>

                          <ProForm.Group>
                            <ProFormText
                              name="nhanVien"
                              label="Nhân viên"
                              colProps={{ span: 12 }}
                              fieldProps={fullWidth}
                              placeholder="VD: BC1579"
                            />
                            <ProFormSelect
                              name="capDo"
                              label="Cấp độ"
                              colProps={{ span: 12 }}
                              fieldProps={fullWidth}
                              options={[
                                { label: "Chờ xử lý", value: "Chờ xử lý" },
                                {
                                  label: "Đang chăm sóc",
                                  value: "Đang chăm sóc",
                                },
                              ]}
                            />
                          </ProForm.Group>

                          <ProForm.Group>
                            <ProFormTextArea
                              name="ghiChu"
                              label="Ghi chú"
                              colProps={{ span: 24 }}
                              fieldProps={{ ...fullWidth, rows: 2 }}
                            />
                          </ProForm.Group>
                        </>
                      ),
                    },

                    {
                      key: "sync",
                      label: "G. Đồng bộ hệ thống",
                      children: (
                        <>
                          <ProForm.Group>
                            <ProFormText
                              name="maFast"
                              label="Mã Fast"
                              colProps={{ span: 12 }}
                              fieldProps={fullWidth}
                            />
                            <ProFormDatePicker
                              name="ngayDongBo"
                              label="Ngày đồng bộ"
                              colProps={{ span: 12 }}
                              fieldProps={fullWidth}
                            />
                          </ProForm.Group>

                          <ProForm.Group>
                            <ProFormSwitch
                              name="daDongBo"
                              label="Đã đồng bộ"
                              colProps={{ span: 12 }}
                              fieldProps={{
                                checkedChildren: "Đã đồng bộ",
                                unCheckedChildren: "Chưa đồng bộ",
                              }}
                            />
                            <div className="w-full" />
                          </ProForm.Group>
                        </>
                      ),
                    },
                  ]}
                />
              </ProCard>
            </>
          ) : (
            <ProCard
              title="2. DOANH NGHIỆP"
              bordered
              headerBordered
              className="rounded-xl"
              bodyStyle={{ paddingTop: 12, paddingBottom: 12 }}
            >
              {/* Tabs for Enterprise Info and Representative Info */}
              <Tabs
                className="mb-2"
                activeKey={enterpriseTab}
                onChange={(k) => setEnterpriseTab(k as any)}
                items={[
                  { key: "ttdn", label: "Thông tin doanh nghiệp" },
                  { key: "nldd", label: "Thông tin người đại diện" },
                ]}
              />

              {enterpriseTab === "ttdn" ? (
                <>
                  <Collapse
                    accordion
                    defaultActiveKey={["basic"]}
                    items={[
                      {
                        key: "basic",
                        label: "A. Thông tin cơ bản",
                        children: (
                          <>
                            <ProForm.Group>
                              <ProFormText
                                name="tenCongTy"
                                label="Tên công ty"
                                colProps={{ span: 12 }}
                                fieldProps={fullWidth}
                                rules={[
                                  {
                                    required: true,
                                    message: "Vui lòng nhập tên công ty",
                                  },
                                ]}
                              />
                              <ProFormText
                                name="code"
                                label="Code"
                                colProps={{ span: 12 }}
                                fieldProps={fullWidth}
                              />
                            </ProForm.Group>

                            <ProForm.Group>
                              <ProFormText
                                name="tenCongTyEN"
                                label="Tên công ty EN"
                                colProps={{ span: 12 }}
                                fieldProps={fullWidth}
                              />
                              <ProFormText
                                name="maSoThueCty"
                                label="Mã số thuế Cty"
                                colProps={{ span: 12 }}
                                fieldProps={fullWidth}
                                rules={[
                                  {
                                    required: true,
                                    message: "Vui lòng nhập mã số thuế công ty",
                                  },
                                ]}
                              />
                            </ProForm.Group>
                          </>
                        ),
                      },

                      {
                        key: "license_contact",
                        label: "B. Giấy phép & liên hệ",
                        children: (
                          <>
                            <ProForm.Group>
                              <ProFormText
                                name="soGPKD"
                                label="Số GPKD"
                                colProps={{ span: 12 }}
                                fieldProps={fullWidth}
                              />
                              <ProFormDatePicker
                                name="ngayCapGPKD"
                                label="Ngày cấp GPKD"
                                colProps={{ span: 12 }}
                                fieldProps={fullWidth}
                              />
                            </ProForm.Group>

                            <ProForm.Group>
                              <ProFormText
                                name="noiCapGPKD"
                                label="Nơi cấp GPKD"
                                colProps={{ span: 12 }}
                                fieldProps={fullWidth}
                              />
                              <ProFormDatePicker
                                name="ngayCapLaiGPKD"
                                label="Ngày cấp lại GPKD"
                                colProps={{ span: 12 }}
                                fieldProps={fullWidth}
                              />
                            </ProForm.Group>

                            <ProForm.Group>
                              <ProFormText
                                name="noiCapGPKDEN"
                                label="Nơi cấp GPKD EN"
                                colProps={{ span: 12 }}
                                fieldProps={fullWidth}
                              />
                              <ProFormText
                                name="dienThoaiCty"
                                label="Điện thoại Cty"
                                colProps={{ span: 12 }}
                                fieldProps={fullWidth}
                              />
                            </ProForm.Group>

                            <ProForm.Group>
                              <ProFormText
                                name="fax"
                                label="Fax"
                                colProps={{ span: 12 }}
                                fieldProps={fullWidth}
                              />
                              <ProFormText
                                name="emailCty"
                                label="Email Cty"
                                colProps={{ span: 12 }}
                                fieldProps={fullWidth}
                              />
                            </ProForm.Group>
                          </>
                        ),
                      },

                      {
                        key: "address",
                        label: "C. Địa chỉ",
                        children: (
                          <>
                            <ProForm.Group>
                              <ProFormTextArea
                                name="diaChiCongTy"
                                label="Địa chỉ Công ty"
                                colProps={{ span: 24 }}
                                fieldProps={{ ...fullWidth, rows: 2 }}
                              />
                            </ProForm.Group>

                            <ProForm.Group>
                              <ProFormTextArea
                                name="diaChiCongTyEN"
                                label="Địa chỉ Công ty EN"
                                colProps={{ span: 24 }}
                                fieldProps={{ ...fullWidth, rows: 2 }}
                              />
                            </ProForm.Group>

                            <ProForm.Group>
                              <ProFormTextArea
                                name="diaChiLienLacCty"
                                label="Địa chỉ liên lạc Công ty"
                                colProps={{ span: 24 }}
                                fieldProps={{ ...fullWidth, rows: 2 }}
                              />
                            </ProForm.Group>

                            <ProForm.Group>
                              <ProFormTextArea
                                name="diaChiLienLacCtyEN"
                                label="Địa chỉ liên lạc Công ty EN"
                                colProps={{ span: 24 }}
                                fieldProps={{ ...fullWidth, rows: 2 }}
                              />
                            </ProForm.Group>
                          </>
                        ),
                      },

                      {
                        key: "bank_bds",
                        label: "D. Ngân hàng & BĐS",
                        children: (
                          <>
                            <ProForm.Group>
                              <ProFormSelect
                                name="nganHang"
                                label="Ngân hàng"
                                colProps={{ span: 12 }}
                                fieldProps={fullWidth}
                                options={[{ label: "Chọn", value: "" }]}
                              />
                              <ProFormText
                                name="chiNhanh"
                                label="Chi nhánh"
                                colProps={{ span: 12 }}
                                fieldProps={fullWidth}
                              />
                            </ProForm.Group>

                            <ProForm.Group>
                              <ProFormText
                                name="soTaiKhoan"
                                label="Số tài khoản"
                                colProps={{ span: 12 }}
                                fieldProps={fullWidth}
                              />
                              <ProFormSelect
                                name="loaiBDS_1"
                                label="Loại BĐS"
                                colProps={{ span: 12 }}
                                fieldProps={fullWidth}
                                options={[
                                  { label: "Đất nền", value: "Đất nền" },
                                  { label: "Căn hộ", value: "Căn hộ" },
                                  { label: "Nhà phố", value: "Nhà phố" },
                                  { label: "Khác", value: "Khác" },
                                ]}
                              />
                            </ProForm.Group>

                            <ProForm.Group>
                              <ProFormText
                                name="loaiHinhKD"
                                label="Loại hình KD"
                                colProps={{ span: 12 }}
                                fieldProps={fullWidth}
                              />
                              <ProFormSelect
                                name="loaiBDS_2"
                                label="Loại BĐS"
                                colProps={{ span: 12 }}
                                fieldProps={fullWidth}
                                options={[
                                  { label: "Đất nền", value: "Đất nền" },
                                  { label: "Căn hộ", value: "Căn hộ" },
                                  { label: "Nhà phố", value: "Nhà phố" },
                                  { label: "Khác", value: "Khác" },
                                ]}
                              />
                            </ProForm.Group>
                          </>
                        ),
                      },

                      {
                        key: "classify",
                        label: "E. Phân loại & chăm sóc",
                        children: (
                          <>
                            <ProForm.Group>
                              <ProFormSelect
                                name="nguonDenCty"
                                label="Nguồn đến"
                                colProps={{ span: 12 }}
                                fieldProps={fullWidth}
                                options={[
                                  {
                                    label: "[Chưa chọn]",
                                    value: "[Chưa chọn]",
                                  },
                                ]}
                              />
                              <ProFormSelect
                                name="duAnCty"
                                label="Dự án"
                                colProps={{ span: 12 }}
                                fieldProps={fullWidth}
                                options={[{ label: "0", value: "0" }]}
                              />
                            </ProForm.Group>

                            <ProForm.Group>
                              <ProFormText
                                name="sanPhamQuanTamCty"
                                label="Sản phẩm quan tâm"
                                colProps={{ span: 12 }}
                                fieldProps={fullWidth}
                              />
                              <ProFormSelect
                                name="nhomKhachHangCty"
                                label="Nhóm Khách hàng"
                                colProps={{ span: 12 }}
                                fieldProps={fullWidth}
                                options={[
                                  {
                                    label: "Chưa phân loại",
                                    value: "Chưa phân loại",
                                  },
                                ]}
                              />
                            </ProForm.Group>

                            <ProForm.Group>
                              <ProFormText
                                name="nhanVienCty"
                                label="Nhân viên"
                                colProps={{ span: 12 }}
                                fieldProps={fullWidth}
                                placeholder="VD: BC1579"
                              />
                              <ProFormSelect
                                name="mucDichCty"
                                label="Mục đích"
                                colProps={{ span: 12 }}
                                fieldProps={fullWidth}
                                options={[
                                  {
                                    label: "[Chưa chọn]",
                                    value: "[Chưa chọn]",
                                  },
                                ]}
                              />
                            </ProForm.Group>

                            <ProForm.Group>
                              <ProFormSelect
                                name="capDoCty"
                                label="Cấp độ"
                                colProps={{ span: 12 }}
                                fieldProps={fullWidth}
                                options={[
                                  { label: "Chờ xử lý", value: "Chờ xử lý" },
                                ]}
                              />
                              <ProFormSelect
                                name="thoiDiemLienHeCty"
                                label="Thời điểm liên hệ"
                                colProps={{ span: 12 }}
                                fieldProps={fullWidth}
                                options={[
                                  {
                                    label: "[Chưa chọn]",
                                    value: "[Chưa chọn]",
                                  },
                                ]}
                              />
                            </ProForm.Group>
                          </>
                        ),
                      },

                      {
                        key: "note_sync",
                        label: "F. Ghi chú & đồng bộ",
                        children: (
                          <>
                            <ProForm.Group>
                              <ProFormTextArea
                                name="ghiChuCty"
                                label="Ghi chú"
                                colProps={{ span: 24 }}
                                fieldProps={{ ...fullWidth, rows: 2 }}
                              />
                            </ProForm.Group>

                            <ProForm.Group>
                              <ProFormText
                                name="maFastCty"
                                label="Mã Fast"
                                colProps={{ span: 12 }}
                                fieldProps={fullWidth}
                                rules={[
                                  {
                                    required: true,
                                    message: "Vui lòng nhập mã Fast",
                                  },
                                ]}
                              />
                              <ProFormDatePicker
                                name="ngayDongBoCty"
                                label="Ngày đồng bộ"
                                colProps={{ span: 12 }}
                                fieldProps={fullWidth}
                              />
                            </ProForm.Group>

                            <ProForm.Group>
                              <ProFormSwitch
                                name="daDongBoCty"
                                label="Đã đồng bộ"
                                colProps={{ span: 12 }}
                                fieldProps={{
                                  checkedChildren: "Đã đồng bộ",
                                  unCheckedChildren: "Chưa đồng bộ",
                                }}
                              />
                              <div className="w-full" />
                            </ProForm.Group>
                          </>
                        ),
                      },
                    ]}
                  />
                </>
              ) : (
                <>
                  <Collapse
                    accordion
                    defaultActiveKey={["basic"]}
                    items={[
                      // ======================
                      // A. THÔNG TIN CƠ BẢN
                      // ======================
                      {
                        key: "basic",
                        label: "A. Thông tin cơ bản",
                        children: (
                          <>
                            <ProForm.Group>
                              <ProFormSelect
                                name="nldd_quyDanh"
                                label="Quý danh"
                                colProps={{ span: 12 }}
                                fieldProps={fullWidth}
                                rules={[
                                  {
                                    required: true,
                                    message: "Vui lòng nhập quý danh",
                                  },
                                ]}
                                options={[
                                  { label: "Mr", value: "Mr" },
                                  { label: "Mrs", value: "Mrs" },
                                  { label: "Ms", value: "Ms" },
                                ]}
                              />
                              <ProFormText
                                name="nldd_hoVaTen"
                                label="Họ và tên"
                                colProps={{ span: 12 }}
                                fieldProps={fullWidth}
                                rules={[
                                  {
                                    required: true,
                                    message: "Vui lòng nhập họ và tên",
                                  },
                                ]}
                              />
                            </ProForm.Group>

                            <ProForm.Group>
                              <ProFormDatePicker
                                name="nldd_ngaySinh"
                                label="Ngày sinh"
                                colProps={{ span: 12 }}
                                fieldProps={fullWidth}
                              />
                              <ProFormSelect
                                name="nldd_quocTich"
                                label="Quốc tịch"
                                colProps={{ span: 12 }}
                                fieldProps={fullWidth}
                                options={[
                                  { label: "Việt Nam", value: "Việt Nam" },
                                  { label: "Khác", value: "Khác" },
                                ]}
                              />
                            </ProForm.Group>

                            <ProForm.Group>
                              <ProFormSelect
                                name="nldd_gioiTinh"
                                label="Giới tính"
                                colProps={{ span: 12 }}
                                fieldProps={fullWidth}
                                options={[
                                  {
                                    label: "Không xác định",
                                    value: "Không xác định",
                                  },
                                  { label: "Nam", value: "Nam" },
                                  { label: "Nữ", value: "Nữ" },
                                ]}
                              />
                              <div className="w-full" />
                            </ProForm.Group>
                          </>
                        ),
                      },

                      // ======================
                      // B. GIẤY TỜ TUỲ THÂN
                      // ======================
                      {
                        key: "id",
                        label: "B. Giấy tờ tuỳ thân",
                        children: (
                          <>
                            <ProForm.Group>
                              <ProFormSelect
                                name="nldd_loaiGiayTo"
                                label="Loại giấy tờ"
                                colProps={{ span: 12 }}
                                fieldProps={fullWidth}
                                options={[
                                  {
                                    label: "Thẻ căn cước nhân dân",
                                    value: "Thẻ căn cước nhân dân",
                                  },
                                  { label: "CMND", value: "CMND" },
                                  { label: "Passport", value: "Passport" },
                                ]}
                                rules={[
                                  {
                                    required: true,
                                    message: "Vui lòng nhập loại giấy tờ",
                                  },
                                ]}
                              />
                              <ProFormText
                                name="nldd_soGiayTo"
                                label="Số giấy tờ"
                                colProps={{ span: 12 }}
                                fieldProps={fullWidth}
                                rules={[
                                  {
                                    required: true,
                                    message: "Vui lòng nhập số giấy tờ",
                                  },
                                ]}
                              />
                            </ProForm.Group>

                            <ProForm.Group>
                              <ProFormDatePicker
                                name="nldd_ngayCap"
                                label="Ngày cấp"
                                colProps={{ span: 12 }}
                                fieldProps={fullWidth}
                              />
                              <ProFormDatePicker
                                name="nldd_ngayHetHan"
                                label="Ngày hết hạn"
                                colProps={{ span: 12 }}
                                fieldProps={fullWidth}
                              />
                            </ProForm.Group>

                            <ProForm.Group>
                              <ProFormText
                                name="nldd_noiCap"
                                label="Nơi cấp"
                                colProps={{ span: 12 }}
                                fieldProps={fullWidth}
                              />
                              <ProFormText
                                name="nldd_noiCapEN"
                                label="Nơi cấp EN"
                                colProps={{ span: 12 }}
                                fieldProps={fullWidth}
                              />
                            </ProForm.Group>
                          </>
                        ),
                      },

                      // ======================
                      // C. LIÊN HỆ
                      // ======================
                      {
                        key: "contact",
                        label: "C. Thông tin liên hệ",
                        children: (
                          <>
                            <ProForm.Group>
                              <ProFormText
                                name="nldd_diDong"
                                label="Di động"
                                colProps={{ span: 12 }}
                                fieldProps={fullWidth}
                              />
                              <ProFormText
                                name="nldd_diDong2"
                                label="Di động 2"
                                colProps={{ span: 12 }}
                                fieldProps={fullWidth}
                              />
                            </ProForm.Group>

                            <ProForm.Group>
                              <ProFormText
                                name="nldd_email"
                                label="Email"
                                colProps={{ span: 12 }}
                                fieldProps={fullWidth}
                              />
                              <ProFormText
                                name="nldd_email2"
                                label="Email 2"
                                colProps={{ span: 12 }}
                                fieldProps={fullWidth}
                              />
                            </ProForm.Group>
                          </>
                        ),
                      },

                      // ======================
                      // D. CHỨC VỤ / THUẾ
                      // ======================
                      {
                        key: "job_tax",
                        label: "D. Chức vụ & thuế",
                        children: (
                          <>
                            <ProForm.Group>
                              <ProFormText
                                name="nldd_chucVu"
                                label="Chức vụ"
                                colProps={{ span: 12 }}
                                fieldProps={fullWidth}
                              />
                              <ProFormText
                                name="nldd_chucVuEN"
                                label="Chức vụ EN"
                                colProps={{ span: 12 }}
                                fieldProps={fullWidth}
                              />
                            </ProForm.Group>

                            <ProForm.Group>
                              <ProFormText
                                name="nldd_maSoThueCaNhan"
                                label="Mã số thuế cá nhân"
                                colProps={{ span: 12 }}
                                fieldProps={fullWidth}
                              />
                              <div className="w-full" />
                            </ProForm.Group>
                          </>
                        ),
                      },

                      // ======================
                      // E. ĐỊA CHỈ
                      // ======================
                      {
                        key: "address",
                        label: "E. Địa chỉ",
                        children: (
                          <>
                            <ProForm.Group>
                              <ProFormText
                                name="nldd_nguyenQuan"
                                label="Nguyên quán"
                                colProps={{ span: 12 }}
                                fieldProps={fullWidth}
                              />
                              <ProFormText
                                name="nldd_nguyenQuanEN"
                                label="Nguyên quán EN"
                                colProps={{ span: 12 }}
                                fieldProps={fullWidth}
                              />
                            </ProForm.Group>

                            <ProForm.Group>
                              <ProFormTextArea
                                name="nldd_diaChiThuongTru"
                                label="Địa chỉ Thường trú"
                                colProps={{ span: 24 }}
                                fieldProps={{ ...fullWidth, rows: 2 }}
                              />
                            </ProForm.Group>

                            <ProForm.Group>
                              <ProFormSelect
                                name="nldd_xaHuyenTinhThuongTru"
                                label="Xã, huyện, tỉnh - Thường trú"
                                colProps={{ span: 12 }}
                                fieldProps={fullWidth}
                                options={[
                                  { label: "Chọn / Select", value: "" },
                                ]}
                              />
                              <ProFormTextArea
                                name="nldd_diaChiThuongTruEN"
                                label="Địa chỉ Thường trú EN"
                                colProps={{ span: 12 }}
                                fieldProps={{ ...fullWidth, rows: 2 }}
                              />
                            </ProForm.Group>

                            <ProForm.Group>
                              <ProFormTextArea
                                name="nldd_diaChiLienHe"
                                label="Địa chỉ Liên hệ"
                                colProps={{ span: 24 }}
                                fieldProps={{ ...fullWidth, rows: 2 }}
                              />
                            </ProForm.Group>

                            <ProForm.Group>
                              <ProFormSelect
                                name="nldd_xaHuyenTinhLienHe"
                                label="Xã, huyện, tỉnh - Liên hệ"
                                colProps={{ span: 12 }}
                                fieldProps={fullWidth}
                                options={[
                                  { label: "Chọn / Select", value: "" },
                                ]}
                              />
                              <ProFormTextArea
                                name="nldd_diaChiLienHeEN"
                                label="Địa chỉ Liên hệ EN"
                                colProps={{ span: 12 }}
                                fieldProps={{ ...fullWidth, rows: 2 }}
                              />
                            </ProForm.Group>
                          </>
                        ),
                      },
                    ]}
                  />
                </>
              )}
            </ProCard>
          )}
        </ProForm>
      </ProCard>
    </PageContainer>
  );
};

export default CustomerCreate;
