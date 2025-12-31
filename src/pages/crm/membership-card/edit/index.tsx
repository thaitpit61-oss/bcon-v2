import {
  PageContainer,
  ProCard,
  ProForm,
  ProFormDatePicker,
  ProFormText,
  ProFormTextArea,
} from "@ant-design/pro-components";
import { history, useParams } from "@umijs/max";
import { Button, message } from "antd";
import React from "react";

type MembershipEditPayload = {
  hoTen: string;
  ngayBatDau: string;
  ngayHetHan: string;
  maThe: string;
  ghiChu: string;
};

const MembershipEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <PageContainer
      title="Sửa thẻ thành viên"
      onBack={() => history.push("/crm/membership-card")}
      extra={[
        <Button key="cancel" onClick={() => history.push("/crm/membership-card")}>
          Hủy
        </Button>,
        <Button
          key="save"
          type="primary"
          onClick={() =>
            (
              document.getElementById(
                "membership-edit-submit"
              ) as HTMLButtonElement
            )?.click()
          }
        >
          Lưu & Đóng
        </Button>,
      ]}
    >
      <ProCard className="rounded-xl" bodyStyle={{ padding: 16 }}>
        <ProForm<MembershipEditPayload>
          layout="vertical"
          initialValues={{
            hoTen: "NGUYỄN CHÍ VIỆT",
            ngayBatDau: "2025-04-25",
            ngayHetHan: "2026-04-25",
            maThe: "Vime00002363",
            ghiChu: "",
          }}
          submitter={{
            render: () => [
              <button
                key="submit"
                id="membership-edit-submit"
                type="submit"
                style={{ display: "none" }}
              />,
            ],
          }}
          onFinish={async (values) => {
            console.log("UPDATE MEMBERSHIP:", id, values);
            message.success("Cập nhật thẻ thành viên thành công!");
            history.push("/crm/membership-card");
            return true;
          }}
        >
          <ProCard
            title="Thông tin thẻ"
            bordered
            headerBordered
            className="rounded-lg"
          >
            <ProFormText
              name="hoTen"
              label="Họ tên"
              addonAfter={
                <Button type="link" className="px-0">
                  Search
                </Button>
              }
              rules={[{ required: true }]}
            />

            <ProFormDatePicker name="ngayBatDau" label="Ngày bắt đầu" />
            <ProFormDatePicker name="ngayHetHan" label="Ngày hết hạn" />

            <ProFormText name="maThe" label="Mã thẻ" readonly />

            <ProFormTextArea
              name="ghiChu"
              label="Ghi chú"
              fieldProps={{ rows: 3 }}
            />
          </ProCard>
        </ProForm>
      </ProCard>
    </PageContainer>
  );
};

export default MembershipEdit;
