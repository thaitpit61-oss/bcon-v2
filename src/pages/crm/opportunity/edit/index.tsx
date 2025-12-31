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
  // Thông tin khách hàng
  quyDanh: string;
  hoVaTen: string;
  soCMND: string;
  ngayCap: string;
  noiCap: string;
  diDong: string;
  email: string;
  quocTich: string;
  tinh: string;
  diaChi: string;

  // Thông tin nhân viên
  nhanVien: string;
  chiNhanh: string;

  // Thông tin cơ hội
  soNhuCau: string;
  duAn: string;
  mucDich: string;
  nguon: string;
  capDo: string;
  ngayNhap: string;
  giaTri: number;
  ghiChu: string;
};

const OpportunityEdit: React.FC = () => {
  const fullWidth = { style: { width: "100%" } };

  const optQuyDanh = useMemo(
    () => [
      { label: "[Chọn / Select]", value: "" },
      { label: "Mr", value: "Mr" },
      { label: "Mrs", value: "Mrs" },
      { label: "Ms", value: "Ms" },
    ],
    []
  );

  const optQuocTich = useMemo(
    () => [
      { label: "[Chọn / Select]", value: "" },
      { label: "Việt Nam", value: "Việt Nam" },
      { label: "Khác", value: "Khác" },
    ],
    []
  );

  const optTinh = useMemo(
    () => [
      { label: "[Chọn / Select]", value: "" },
      { label: "Hồ Chí Minh", value: "Hồ Chí Minh" },
      { label: "Bình Dương", value: "Bình Dương" },
      { label: "Hà Nội", value: "Hà Nội" },
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
      title="Chỉnh sửa Cơ hội"
      onBack={() => history.push("/opportunity")}
      extra={[
        <Button key="cancel" onClick={() => history.push("/crm/opportunity")}>
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
            giaTri: 0,
            chiNhanh: "CÔNG TY CỔ PHẦN ĐẦU TƯ XÂY DỰNG BCONS",
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
            message.success("Chỉnh sửa cơ hội (demo) thành công!");
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
              {/* Thông tin khách hàng */}
              <ProCard
                title="Thông tin Khách hàng"
                bordered
                headerBordered
                className="rounded-xl mb-3"
                bodyStyle={{ padding: 12 }}
              >
                <ProForm.Group>
                  <ProFormSelect
                    name="quyDanh"
                    label="Quý danh / Gender"
                    colProps={{ span: 8 }}
                    fieldProps={fullWidth}
                    options={optQuyDanh}
                  />

                  <ProFormText
                    name="hoVaTen"
                    label="Họ và tên / Full name"
                    colProps={{ span: 16 }}
                    fieldProps={fullWidth}
                    addonAfter={
                      <Button
                        type="link"
                        className="px-0"
                        onClick={() =>
                          message.info("Demo: mở popup search/add khách hàng")
                        }
                      >
                        Search Add
                      </Button>
                    }
                  />
                </ProForm.Group>

                <ProForm.Group>
                  <ProFormText
                    name="soCMND"
                    label="Số CMND / ID no."
                    colProps={{ span: 8 }}
                    fieldProps={fullWidth}
                  />
                  <ProFormDatePicker
                    name="ngayCap"
                    label="Ngày cấp / Date of Issue"
                    colProps={{ span: 8 }}
                    fieldProps={fullWidth}
                  />
                  <ProFormText
                    name="noiCap"
                    label="Nơi cấp / Place of Issue"
                    colProps={{ span: 8 }}
                    fieldProps={fullWidth}
                  />
                </ProForm.Group>

                <ProForm.Group>
                  <ProFormText
                    name="diDong"
                    label="Di động / Phone"
                    colProps={{ span: 8 }}
                    fieldProps={fullWidth}
                  />
                  <ProFormText
                    name="email"
                    label="Email"
                    colProps={{ span: 16 }}
                    fieldProps={fullWidth}
                  />
                </ProForm.Group>

                <ProForm.Group>
                  <ProFormSelect
                    name="quocTich"
                    label="Quốc tịch / Nationality"
                    colProps={{ span: 8 }}
                    fieldProps={fullWidth}
                    options={optQuocTich}
                  />
                  <ProFormSelect
                    name="tinh"
                    label="Tỉnh / Province"
                    colProps={{ span: 16 }}
                    fieldProps={fullWidth}
                    options={optTinh}
                  />
                </ProForm.Group>

                <ProFormTextArea
                  name="diaChi"
                  label="Địa chỉ / Address"
                  colProps={{ span: 24 }}
                  fieldProps={{ ...fullWidth, rows: 2 }}
                />
              </ProCard>
              {/* --- Thông tin Nhân viên ) --- */}
              <ProCard
                title="Thông tin Nhân viên"
                bordered
                headerBordered
                className="rounded-xl"
                bodyStyle={{ padding: 12 }}
              >
                <ProForm.Group>
                  <ProFormSelect
                    name="nhanVien"
                    label="Nhân viên / Staff charge"
                    colProps={{ span: 12 }}
                    fieldProps={fullWidth}
                    options={optNhanVien}
                  />
                  <ProFormText
                    name="chiNhanh"
                    label="Chi nhánh / Branch"
                    colProps={{ span: 12 }}
                    fieldProps={fullWidth}
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
