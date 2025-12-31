import {
  PageContainer,
  ProCard,
  ProForm,
  ProFormDatePicker,
  ProFormDigit,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from "@ant-design/pro-components";
import { history } from "@umijs/max";
import { Button, message } from "antd";
import React, { useMemo } from "react";

type OpportunityCreatePayload = {
  // Thông tin sản phẩm
  product: string;
  area: string;
  bedrooms: number;
  paymentTotal: string;
  floors: number;
  block: string;
  email: string;
  paymentTerm: string;

  // Thông tin báo giá
  template: string;
  sendDate: string;
  expiredDate: string;
  description: string;

  // Thông tin nhu cầu
  soNhuCau: string;
  duAn: string;
  mucDich: string;
  nguon: string;
  capDo: string;
  ngayNhap: string;
  ghiChu: string;
};

const OpportunityEdit: React.FC = () => {
  const fullWidth = { style: { width: "100%" } };

  const optTemplate = useMemo(
    () => [
      { label: "[Chọn / Select]", value: "" },
      { label: "Template1", value: "1" },
      { label: "Template2", value: "2" },
      { label: "Template3", value: "3" },
    ],
    []
  );

  const optDuAn = useMemo(
    () => [
      { label: "[Chọn / Select]", value: "" },
      { label: "Dự án A", value: "Dự án A" },
      { label: "Dự án B", value: "Dự án B" },
    ],
    []
  );

  const optMucDich = useMemo(
    () => [
      { label: "[Chọn / Select]", value: "" },
      { label: "Đầu tư", value: "Đầu tư" },
      { label: "Ở", value: "Ở" },
      { label: "Cho thuê", value: "Cho thuê" },
    ],
    []
  );

  const optNguon = useMemo(
    () => [
      { label: "[Chọn / Select]", value: "" },
      { label: "Facebook", value: "Facebook" },
      { label: "Website", value: "Website" },
      { label: "Giới thiệu", value: "Giới thiệu" },
    ],
    []
  );

  const optCapDo = useMemo(
    () => [
      { label: "[Chọn / Select]", value: "" },
      { label: "Chờ xử lý", value: "Chờ xử lý" },
      { label: "Đang chăm sóc", value: "Đang chăm sóc" },
      { label: "Đã chuyển đổi", value: "Đã chuyển đổi" },
    ],
    []
  );

  const optNhanVien = useMemo(
    () => [
      { label: "[Chọn / Select]", value: "" },
      { label: "Trần Phương Thái", value: "Trần Phương Thái" },
      { label: "BC1579", value: "BC1579" },
      { label: "BC2001", value: "BC2001" },
    ],
    []
  );

  return (
    <PageContainer
      title="Chỉnh sửa báo giá"
      onBack={() => history.push("/price-quote")}
      extra={[
        <Button key="cancel" onClick={() => history.push("/crm/price-quote")}>
          Bỏ qua
        </Button>,
        <Button
          key="save"
          type="primary"
          onClick={() =>
            (
              document.getElementById("opportunity-submit") as HTMLButtonElement
            )?.click()
          }
        >
          Lưu & Đóng
        </Button>,
      ]}
    >
      <ProCard bodyStyle={{ padding: 12 }}>
        <ProForm<OpportunityCreatePayload>
          layout="vertical"
          grid
          colProps={{ span: 24 }}
          rowProps={{ gutter: [14, 8] }}
          initialValues={{
            soNhuCau: "CH-0000001",
          }}
          submitter={{
            render: () => [
              <button
                key="submit"
                id="opportunity-submit"
                type="submit"
                style={{ display: "none" }}
              />,
            ],
          }}
          onFinish={async (values) => {
            console.log("CREATE OPPORTUNITY:", values);
            message.success("Chỉnh sửa báo giá (demo) thành công!");
            history.push("/crm/opportunity");
            return true;
          }}
        >
          <ProCard
            gutter={[16, 16]}
            className="rounded-xl"
            bodyStyle={{ padding: 0 }}
          >
            <ProCard
              colSpan={{ xs: 24, md: 14 }} // ~60%
              className="rounded-xl"
              bodyStyle={{ padding: 12 }}
              split="horizontal"
            >
              {/* Thông tin sản phẩm */}
              <ProCard
                title="Thông tin sản phẩm"
                bordered
                headerBordered
                className="rounded-xl mb-5"
                bodyStyle={{ padding: 12 }}
              >
                <ProForm.Group>
                  <ProFormText
                    name="product"
                    label="Sản phẩm"
                    colProps={{ span: 24 }}
                    fieldProps={fullWidth}
                    addonAfter={
                      <Button
                        type="link"
                        className="px-0"
                        onClick={() =>
                          message.info("Demo: mở popup search/add khách hàng")
                        }
                      >
                        Search
                      </Button>
                    }
                  />
                </ProForm.Group>

                <ProForm.Group>
                  <ProFormText
                    name="area"
                    label="Diện tích."
                    colProps={{ span: 8 }}
                    fieldProps={fullWidth}
                  />
                  <ProFormDatePicker
                    name="bedrooms"
                    label="phòng ngủ"
                    colProps={{ span: 8 }}
                    fieldProps={fullWidth}
                  />
                  <ProFormText
                    name="paymentTotal"
                    label="giá trị căn hộ"
                    colProps={{ span: 8 }}
                    fieldProps={fullWidth}
                  />
                </ProForm.Group>

                <ProForm.Group>
                  <ProFormText
                    name="floors"
                    label="Tầng"
                    colProps={{ span: 8 }}
                    fieldProps={fullWidth}
                  />
                  <ProFormText
                    name="block"
                    label="Block"
                    colProps={{ span: 8 }}
                    fieldProps={fullWidth}
                  />
                  <ProFormText
                    name="paymentTerm"
                    label="CS thanh toán"
                    colProps={{ span: 8 }}
                    fieldProps={fullWidth}
                  />
                </ProForm.Group>
              </ProCard>
              {/* --- Thông tin Báo giá ) --- */}
              <ProCard
                title="Thông tin Báo giá"
                bordered
                headerBordered
                className="rounded-xl"
                bodyStyle={{ padding: 12 }}
              >
                <ProForm.Group>
                  <ProFormSelect
                    name="template"
                    label="Biểu mẫu"
                    colProps={{ span: 8 }}
                    fieldProps={fullWidth}
                    options={optTemplate}
                  />
                  <ProFormDatePicker
                    name="sendDate"
                    label="Ngày gửi"
                    colProps={{ span: 8 }}
                    fieldProps={fullWidth}
                  />
                  <ProFormDatePicker
                    name="ngayCap"
                    label="Ngày hết hạn"
                    colProps={{ span: 8 }}
                    fieldProps={fullWidth}
                  />
                </ProForm.Group>
                <ProForm.Group>
                  <ProFormTextArea
                    name="ghiChu"
                    label="Ghi chú / Comment"
                    colProps={{ span: 24 }}
                    fieldProps={{ ...fullWidth, rows: 5 }}
                  />
                </ProForm.Group>
              </ProCard>
            </ProCard>

            <ProCard
              colSpan={{ xs: 24, md: 10 }} // ~40%
              className="rounded-xl"
              bodyStyle={{ padding: 12 }}
            >
              <ProCard
                title="Thông tin Cơ hội"
                bordered
                headerBordered
                className="rounded-xl"
                bodyStyle={{ padding: 12 }}
              >
                <ProFormText
                  name="soNhuCau"
                  label="Số nhu cầu / No."
                  colProps={{ span: 24 }}
                  fieldProps={fullWidth}
                />

                <ProFormSelect
                  name="duAn"
                  label="Dự án / Project"
                  colProps={{ span: 24 }}
                  fieldProps={fullWidth}
                  options={optDuAn}
                />

                <ProFormSelect
                  name="mucDich"
                  label="Mục đích / Purpose"
                  colProps={{ span: 24 }}
                  fieldProps={fullWidth}
                  options={optMucDich}
                />

                <ProFormSelect
                  name="nguon"
                  label="Nguồn / Source"
                  colProps={{ span: 24 }}
                  fieldProps={fullWidth}
                  options={optNguon}
                />

                <ProFormSelect
                  name="capDo"
                  label="Cấp độ / Level"
                  colProps={{ span: 24 }}
                  fieldProps={fullWidth}
                  options={optCapDo}
                />

                <ProFormDatePicker
                  name="ngayNhap"
                  label="Ngày nhập / Action date"
                  colProps={{ span: 24 }}
                  fieldProps={fullWidth}
                />

                <ProFormDigit
                  name="giaTri"
                  label="Giá trị / Total"
                  colProps={{ span: 24 }}
                  fieldProps={{
                    ...fullWidth,
                    precision: 0,
                    formatter: (v) =>
                      v ? `${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "",
                    parser: (v) => Number((v || "").replace(/,/g, "")),
                  }}
                  min={0}
                />

                <ProFormTextArea
                  name="ghiChu"
                  label="Ghi chú / Comment"
                  colProps={{ span: 24 }}
                  fieldProps={{ ...fullWidth, rows: 3 }}
                />
              </ProCard>
            </ProCard>
          </ProCard>
        </ProForm>
      </ProCard>
    </PageContainer>
  );
};

export default OpportunityEdit;
