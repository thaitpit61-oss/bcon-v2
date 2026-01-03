import {
  PageContainer,
  ProCard,
  ProForm,
  ProFormDatePicker,
  ProFormDigit,
  ProFormSelect,
  ProFormSwitch,
  ProFormText,
  ProFormTextArea,
} from "@ant-design/pro-components";
import { history } from "@umijs/max";
import { message } from "antd";
import React from "react";

type UserPayload = {
  xung: string;
  hoVaTen: string;
  maSo: string;
  loaiGiayTo: string;
  soGiayTo: string;

  ngaySinh: string;
  ngayCap: string;
  noiCap: string;
  nguyenQuan: string;

  diaChiLienLac: string;
  diaChiThuongTru: string;
  email: string;
  dienThoai: number;
  dienThoaiNB: number;

  chiNhanh: string;
  phongBan: string;
  nhomKD: string;
  chucDanh: string;

  maSoThue: string;
  soTaiKhoan: string;
  nganHang: string;

  nguoiQL1: string;
  nguoiQL2: string;
  ghiChu: string;
  mucHoaHoang: number;

  status: boolean;
};

const UserCreate: React.FC = () => {
  const onFinish = async (values: UserPayload) => {
    try {
      const payload = {
        ...values,
        // Chuẩn hóa nhẹ
        hoVaTen: (values.hoVaTen || "").trim(),
        maSo: (values.maSo || "").trim().toUpperCase(),
        email: (values.email || "").trim(),
        soGiayTo: (values.soGiayTo || "").trim(),
        noiCap: (values.noiCap || "").trim(),
        nguyenQuan: (values.nguyenQuan || "").trim(),
        diaChiLienLac: (values.diaChiLienLac || "").trim(),
        diaChiThuongTru: (values.diaChiThuongTru || "").trim(),
      };

      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json();

      if (!res.ok || !json?.success) {
        message.error(json?.message || "Tạo người dùng thất bại");
        return false;
      }

      message.success("Tạo người dùng thành công (mock)");
      history.push("/crm/user/list");
      return true;
    } catch {
      message.error("Lỗi mạng khi tạo người dùng");
      return false;
    }
  };

  return (
    <PageContainer title="Thêm người dùng">
      <ProCard>
        <ProForm<UserPayload>
          layout="vertical"
          grid
          colProps={{ span: 12 }}
          rowProps={{ gutter: [16, 8] }}
          onFinish={onFinish}
          initialValues={{
            xung: "Mr",
            loaiGiayTo: "Thẻ căn cước nhân dân",
            status: true,
            mucHoaHoang: 0,
          }}
          submitter={{
            searchConfig: {
              submitText: "Tạo người dùng",
              resetText: "Hủy",
            },
            resetButtonProps: {
              onClick: (e) => {
                e.preventDefault();
                history.push("/crm/user/list");
              },
            },
          }}
        >
          {/* ===== Thông tin cơ bản ===== */}
          <ProFormSelect
            name="xung"
            label="Xưng hô"
            rules={[{ required: true, message: "Vui lòng chọn xưng hô" }]}
            options={[
              { label: "Mr", value: "Mr" },
              { label: "Mrs", value: "Mrs" },
              { label: "Ms", value: "Ms" },
            ]}
          />

          <ProFormText
            name="hoVaTen"
            label="Họ và tên"
            rules={[{ required: true, message: "Vui lòng nhập họ và tên" }]}
          />

          <ProFormText
            name="maSo"
            label="Mã số"
            placeholder="VD: NV-0001"
            rules={[{ required: true, message: "Vui lòng nhập mã số" }]}
            fieldProps={{
              onChange: (e) => {
                // uppercase nhẹ, tránh sai format
                e.target.value = (e.target.value || "").toUpperCase();
              },
            }}
          />

          <ProFormText name="email" label="Email" />

          <ProFormDigit
            name="dienThoai"
            label="Điện thoại"
            min={0}
            fieldProps={{ precision: 0 }}
          />

          <ProFormDigit
            name="dienThoaiNB"
            label="Điện thoại nội bộ"
            min={0}
            fieldProps={{ precision: 0 }}
          />

          {/* ===== Giấy tờ ===== */}
          <ProFormSelect
            name="loaiGiayTo"
            label="Loại giấy tờ"
            rules={[{ required: true, message: "Vui lòng chọn loại giấy tờ" }]}
            options={[
              { label: "Thẻ căn cước nhân dân", value: "Thẻ căn cước nhân dân" },
              { label: "CMND", value: "CMND" },
              { label: "Passport", value: "Passport" },
            ]}
          />

          <ProFormText
            name="soGiayTo"
            label="Số giấy tờ"
            rules={[{ required: true, message: "Vui lòng nhập số giấy tờ" }]}
          />

          <ProFormDatePicker name="ngaySinh" label="Ngày sinh" />

          <ProFormDatePicker name="ngayCap" label="Ngày cấp" />

          <ProFormText name="noiCap" label="Nơi cấp" />

          <ProFormText name="nguyenQuan" label="Nguyên quán" />

          {/* ===== Địa chỉ (full width) ===== */}
          <ProFormTextArea
            name="diaChiLienLac"
            label="Địa chỉ liên lạc"
            colProps={{ span: 24 }}
            fieldProps={{ rows: 2 }}
          />

          <ProFormTextArea
            name="diaChiThuongTru"
            label="Địa chỉ thường trú"
            colProps={{ span: 24 }}
            fieldProps={{ rows: 2 }}
          />

          {/* ===== Công việc ===== */}
          <ProFormText name="chiNhanh" label="Chi nhánh" />
          <ProFormText name="phongBan" label="Phòng ban" />
          <ProFormText name="nhomKD" label="Nhóm KD" />
          <ProFormText name="chucDanh" label="Chức danh" />

          {/* ===== Tài chính ===== */}
          <ProFormText name="maSoThue" label="Mã số thuế" />
          <ProFormText name="nganHang" label="Ngân hàng" />
          <ProFormText name="soTaiKhoan" label="Số tài khoản" />

          {/* ===== Quản lý ===== */}
          <ProFormText name="nguoiQL1" label="Người quản lý 1" />
          <ProFormText name="nguoiQL2" label="Người quản lý 2" />

          <ProFormDigit
            name="mucHoaHoang"
            label="Mức hoa hồng"
            min={0}
            fieldProps={{ precision: 0 }}
          />

          {/* ===== Trạng thái (full width) ===== */}
          <ProFormSwitch
            name="status"
            label="Trạng thái"
            colProps={{ span: 24 }}
            fieldProps={{
              checkedChildren: "Đang hoạt động",
              unCheckedChildren: "Ngưng",
            }}
          />

          {/* ===== Ghi chú (full width) ===== */}
          <ProFormTextArea
            name="ghiChu"
            label="Ghi chú"
            colProps={{ span: 24 }}
            fieldProps={{ rows: 3 }}
          />
        </ProForm>
      </ProCard>
    </PageContainer>
  );
};

export default UserCreate;
