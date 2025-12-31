import {
  PageContainer,
  ProCard,
  ProForm,
  ProFormDatePicker,
  ProFormText,
  ProFormTextArea,
} from "@ant-design/pro-components";
import { history } from "@umijs/max";
import { Button, message } from "antd";
import React from "react";

type MembershipCreatePayload = {
  hoTen: string;
  ngayBatDau: string;
  ngayHetHan: string;
  maThe: string;
  ghiChu: string;
};

const MembershipCreate: React.FC = () => {
  return (
    <PageContainer
      title="Thêm thẻ thành viên"
      onBack={() => history.push("/crm/membership-card")}
      extra={[
        <Button
          key="cancel"
          onClick={() => history.push("/crm/membership-card")}
        >
          Hủy
        </Button>,
        <Button
          key="save"
          type="primary"
          onClick={() =>
            (
              document.getElementById(
                "membership-create-submit"
              ) as HTMLButtonElement
            )?.click()
          }
        >
          Lưu & Đóng
        </Button>,
      ]}
    >
      <ProCard className="rounded-xl" bodyStyle={{ padding: 16 }}>
        <ProForm<MembershipCreatePayload>
          layout="vertical"
          initialValues={{
            maThe: "Vime00003536",
          }}
          submitter={{
            render: () => [
              <button
                key="submit"
                id="membership-create-submit"
                type="submit"
                style={{ display: "none" }}
              />,
            ],
          }}
          onFinish={async (values) => {
            console.log("CREATE MEMBERSHIP:", values);
            message.success("Tạo thẻ thành viên thành công!");
            history.push("/crm/membership");
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
              placeholder="Nhập tên khách hàng"
              addonAfter={
                <Button
                  type="link"
                  className="px-0"
                  onClick={() =>
                    message.info("Demo: mở popup search khách hàng")
                  }
                >
                  Search
                </Button>
              }
              rules={[{ required: true, message: "Vui lòng nhập họ tên" }]}
            />

            <ProFormDatePicker
              name="ngayBatDau"
              label="Ngày bắt đầu"
              rules={[{ required: true, message: "Chọn ngày bắt đầu" }]}
            />

            <ProFormDatePicker
              name="ngayHetHan"
              label="Ngày hết hạn"
              rules={[{ required: true, message: "Chọn ngày hết hạn" }]}
            />

            <ProFormText name="maThe" label="Mã thẻ" />

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

export default MembershipCreate;
