import { PageContainer, ProCard, ProForm, ProFormDigit, ProFormSelect, ProFormText, ProFormTextArea } from "@ant-design/pro-components";
import { history } from "@umijs/max";
import { message } from "antd";
import React from "react";

const ProductCreate: React.FC = () => {
  const onFinish = async (values: any) => {
    console.log("Create product", values);
    message.success("Tạo sản phẩm thành công (mock)");
    history.push("/product/list");
    return true; // ProForm cần true để reset/đóng submit loading đúng chuẩn
  };

  return (
    <PageContainer title="Thêm sản phẩm">
      <ProCard>
        <ProForm
          layout="vertical"
          grid
          colProps={{ span: 12 }}
          onFinish={onFinish}
          submitter={{
            searchConfig: {
              submitText: "Tạo sản phẩm",
              resetText: "Hủy",
            },
            resetButtonProps: {
              onClick: (e) => {
                e.preventDefault(); // chặn reset form mặc định
                history.push("/product/list");
              },
            },
          }}
        >
          <ProFormText
            name="maCan"
            label="Mã căn"
            rules={[{ required: true, message: "Vui lòng nhập mã căn" }]}
          />

          <ProFormSelect
            name="trangThai"
            label="Trạng thái"
            rules={[{ required: true, message: "Vui lòng chọn trạng thái" }]}
            options={[
              { label: "Available", value: "Available" },
              { label: "Sold", value: "Sold" },
            ]}
          />

          <ProFormText
            name="duAn"
            label="Dự án"
            rules={[{ required: true, message: "Vui lòng nhập dự án" }]}
          />

          <ProFormText name="dotBanHang" label="Đợt bán hàng" />
          <ProFormText name="loaiSP" label="Loại sản phẩm" />
          <ProFormText name="tang" label="Tầng" />

          <ProFormDigit
            name="dienTich"
            label="Diện tích"
            min={0}
            fieldProps={{ precision: 2 }}
          />

          <ProFormDigit
            name="donGia"
            label="Đơn giá"
            min={0}
            fieldProps={{
              precision: 0,
              formatter: (v) => (v ? `${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",") : ""),
              parser: (v) => Number((v || "").replace(/,/g, "")),
            }}
          />

          <ProFormText
            name="chietKhau"
            label="Chiết khấu"
            placeholder="VD: 5%"
          />

          <ProFormDigit
            name="tongGia"
            label="Tổng giá"
            min={0}
            fieldProps={{
              precision: 0,
              formatter: (v) => (v ? `${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",") : ""),
              parser: (v) => Number((v || "").replace(/,/g, "")),
            }}
          />

          {/* full width */}
          <ProFormTextArea
            name="desc"
            label="Mô tả"
            fieldProps={{ rows: 3 }}
            colProps={{ span: 24 }}
          />
        </ProForm>
      </ProCard>
    </PageContainer>
  );
};

export default ProductCreate;
