import React from "react";
import {
  PageContainer,
  ProCard,
  ProForm,
  ProFormDateTimePicker,
  ProFormDigit,
  ProFormSelect,
  ProFormSwitch,
  ProFormText,
  ProFormTextArea,
} from "@ant-design/pro-components";
import { history } from "@umijs/max";
import { message } from "antd";

type DotMoBanForm = {
  tenQuyetDinh?: string;
  duAn?: string;
  khu?: string;

  ngayBatDau?: any; // dayjs
  ngayKetThuc?: any; // dayjs

  tienGiuCho?: number;
  tienDatCoc?: number;

  thoiGianGiuCho?: number; // giờ
  thoiGianCoc?: number; // ngày

  loaiTien?: "VND" | "USD" | string;
  soNguoiGiuCho?: number;

  dienGiai?: string;

  saleManager?: string;
  saleAdmin?: string;

  baoCaoSoXD?: boolean;
};

const DotMoBanCreate: React.FC = () => {
  const onFinish = async (values: DotMoBanForm) => {
    console.log("Create dot mo ban", values);
    message.success("Lưu đợt mở bán thành công (mock)");
    history.push("/dot-mo-ban/list"); // đổi route theo dự án của bạn
    return true;
  };

  return (
    <PageContainer
      title="Tạo đợt mở bán"
      onBack={() => history.push("/dot-mo-ban/list")}
    >
      <ProCard>
        <ProForm<DotMoBanForm>
          layout="vertical"
          grid
          colProps={{ span: 12 }}
          onFinish={onFinish}
          submitter={{
            searchConfig: {
              submitText: "Lưu & Đóng",
              resetText: "Hủy",
            },
            resetButtonProps: {
              onClick: (e) => {
                e.preventDefault();
                history.push("/dot-mo-ban/list");
              },
            },
          }}
        >
          {/* Tên quyết định */}
          <ProFormText
            name="tenQuyetDinh"
            label="Tên quyết định"
            colProps={{ span: 24 }}
            rules={[{ required: true, message: "Vui lòng nhập tên quyết định" }]}
          />

          {/* Dự án / Khu */}
          <ProFormSelect
            name="duAn"
            label="Dự án"
            rules={[{ required: true, message: "Vui lòng chọn dự án" }]}
            request={async () => [
              { label: "TEST", value: "TEST" },
              { label: "Dự án A", value: "DA_A" },
              { label: "Dự án B", value: "DA_B" },
            ]}
          />

          <ProFormSelect
            name="khu"
            label="Khu"
            rules={[{ required: true, message: "Vui lòng chọn khu" }]}
            request={async () => [
              { label: "A", value: "A" },
              { label: "B", value: "B" },
              { label: "C", value: "C" },
            ]}
          />

          {/* Ngày bắt đầu / kết thúc */}
          <ProFormDateTimePicker
            name="ngayBatDau"
            label="Ngày bắt đầu"
            rules={[{ required: true, message: "Vui lòng chọn ngày bắt đầu" }]}
            fieldProps={{ format: "HH:mm:ss DD/MM/YYYY" }}
          />

          <ProFormDateTimePicker
            name="ngayKetThuc"
            label="Ngày kết thúc"
            rules={[{ required: true, message: "Vui lòng chọn ngày kết thúc" }]}
            fieldProps={{ format: "HH:mm:ss DD/MM/YYYY" }}
          />

          {/* Tiền giữ chỗ / đặt cọc */}
          <ProFormDigit
            name="tienGiuCho"
            label="Tiền giữ chỗ"
            min={0}
            fieldProps={{ precision: 0 }}
          />

          <ProFormDigit
            name="tienDatCoc"
            label="Tiền đặt cọc"
            min={0}
            fieldProps={{ precision: 0 }}
          />

          {/* Thời gian giữ chỗ / cọc */}
          <ProFormDigit
            name="thoiGianGiuCho"
            label="Thời gian giữ chỗ"
            min={0}
            fieldProps={{ precision: 0, addonAfter: "giờ" }}
          />

          <ProFormDigit
            name="thoiGianCoc"
            label="Thời gian cọc"
            min={0}
            fieldProps={{ precision: 0, addonAfter: "ngày" }}
          />

          {/* Loại tiền / số người giữ chỗ */}
          <ProFormSelect
            name="loaiTien"
            label="Loại tiền"
            rules={[{ required: true, message: "Vui lòng chọn loại tiền" }]}
            options={[
              { label: "VND", value: "VND" },
              { label: "USD", value: "USD" },
            ]}
          />

          <ProFormDigit
            name="soNguoiGiuCho"
            label="Số người giữ chỗ"
            min={0}
            fieldProps={{ precision: 0 }}
          />

          {/* Diễn giải */}
          <ProFormTextArea
            name="dienGiai"
            label="Diễn giải"
            colProps={{ span: 24 }}
            fieldProps={{ rows: 6 }}
          />

          {/* Sale Manager / Sale Admin */}
          <ProFormSelect
            name="saleManager"
            label="Sale Manager"
            placeholder="Chọn nhân viên"
            request={async () => [
              { label: "Nguyễn Văn A", value: "NV_A" },
              { label: "Trần Văn B", value: "NV_B" },
            ]}
          />

          <ProFormSelect
            name="saleAdmin"
            label="Sale Admin"
            placeholder="Chọn nhân viên"
            request={async () => [
              { label: "Lê Thị C", value: "NV_C" },
              { label: "Phạm Thị D", value: "NV_D" },
            ]}
          />

          {/* Tùy chọn */}
          <ProFormSwitch
            name="baoCaoSoXD"
            label="Tùy chọn: Báo cáo Số XD (Tất cả)"
            colProps={{ span: 24 }}
            fieldProps={{
              checkedChildren: "Bật",
              unCheckedChildren: "Tắt",
            }}
          />
        </ProForm>
      </ProCard>
    </PageContainer>
  );
};

export default DotMoBanCreate;
