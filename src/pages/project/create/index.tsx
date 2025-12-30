import {
  PageContainer,
  ProCard,
  ProForm,
  ProFormDatePicker,
  ProFormDigit,
  ProFormSwitch,
  ProFormText,
  ProFormTextArea,
} from "@ant-design/pro-components";
import { history } from "@umijs/max";
import { message } from "antd";
import React from "react";

const ProjectCreate: React.FC = () => {
  const onFinish = async (values: any) => {
    console.log("Create project", values);
    message.success("Tạo dự án thành công");
    history.push("/project/list");
    return true;
  };

  return (
    <PageContainer title="Tạo dự án">
      <ProCard>
        <ProForm
          layout="vertical"
          grid
          colProps={{ span: 12 }}
          onFinish={onFinish}
          submitter={{
            searchConfig: {
              submitText: "Tạo",
              resetText: "Huỷ",
            },
            resetButtonProps: {
              onClick: (e) => {
                e.preventDefault();
                history.push("/project/list");
              },
            },
          }}
        >
          {/* Ngày */}
          <ProFormDatePicker
            name="ngay"
            label="Ngày"
            fieldProps={{ format: "YYYY-MM-DD" }}
          />

          <ProFormText name="code" label="Mã" />
          <ProFormText name="maFast" label="Mã Fast" />

          <ProFormText
            name="tenDuAn"
            label="Tên dự án"
            rules={[{ required: true, message: "Vui lòng nhập tên dự án" }]}
          />

          <ProFormText name="loaiDuAn" label="Loại dự án" />
          <ProFormText name="nhanVien" label="Nhân viên" />

          {/* Nếu diện tích là số -> dùng Digit (đỡ nhập linh tinh) */}
          <ProFormDigit
            name="dienTich"
            label="Diện tích"
            min={0}
            fieldProps={{ precision: 2 }}
          />

          <ProFormText name="soGiayPhep" label="Số giấy phép" />

          <ProFormDatePicker
            name="ngayCap"
            label="Ngày cấp"
            fieldProps={{ format: "YYYY-MM-DD" }}
          />

          <ProFormDatePicker
            name="ngayDuyet"
            label="Ngày duyệt"
            fieldProps={{ format: "YYYY-MM-DD" }}
          />

          {/* Nếu đơn giá là số -> Digit + format nghìn */}
          <ProFormDigit
            name="donGia"
            label="Đơn giá"
            min={0}
            fieldProps={{
              precision: 0,
              formatter: (v) =>
                v ? `${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "",
              parser: (v) => Number((v || "").replace(/,/g, "")),
            }}
          />

          <ProFormDigit
            name="soLuong"
            label="Số lượng"
            min={0}
            fieldProps={{ precision: 0 }}
          />

          <ProFormText name="nguoiDuyet" label="Người duyệt" />

          {/* Địa chỉ thường dài hơn -> full width cho dễ nhìn */}
          <ProFormTextArea
            name="diaChi"
            label="Địa chỉ"
            colProps={{ span: 24 }}
            fieldProps={{ rows: 2 }}
          />

          {/* Checkbox -> Switch nhìn “pro” hơn */}
          <ProFormSwitch
            name="daDuyet"
            label="Đã duyệt"
            fieldProps={{
              checkedChildren: "Đã duyệt",
              unCheckedChildren: "Chưa duyệt",
            }}
          />
        </ProForm>
      </ProCard>
    </PageContainer>
  );
};

export default ProjectCreate;
