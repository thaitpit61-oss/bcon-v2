import { EditOutlined } from "@ant-design/icons";
import type { ProColumns } from "@ant-design/pro-components";
import { PageContainer, ProTable } from "@ant-design/pro-components";
import { history } from "@umijs/max";
import { Button, Tag, Tooltip } from "antd";
import React, { useMemo, useState } from "react";

type Customer = {
  id: number;

  xung: string;
  hoVaTen: string;
  maKhachHang: string;
  ngaySinh: string; // dd/MM/yyyy (demo)
  diDong: string;
  soGiayTo: string;

  diaChiLienLac: string;
  diaChiThuongTru: string;
  email: string;

  maThueTNCN: string;
  chucVu: string;
  nhomKhachHang: string;
  nhanVien: string;
  ngheNghiep: string;

  duAn: string;
  loaiBDS: string;
  sanPhamQuanTam: string;
  donViCongTac: string;

  nguonDen: string;
  capDo: string;
  mucDich: string;
  dienGiai: string;
  ngayXuLy: string; // dd/MM/yyyy

  danhSachDuAn: string;

  loaiGiayTo: string;
  soCCCD: string;
  passport: string;
  noiCap: string;
  ngayCap: string; // dd/MM/yyyy

  gioiTinh: "Nam" | "Nữ" | string;

  maKHFast: string;
  ngayDongBo: string; // dd/MM/yyyy | HH:mm
  daDongBo: boolean;
};

const CustomerList: React.FC = () => {
  const [data] = useState<Customer[]>([
    {
      id: 1,
      xung: "Bà",
      hoVaTen: "BÙI QUỲNH ANH",
      maKhachHang: "030296021611",
      ngaySinh: "06/12/2007",
      diDong: "0903316742",
      soGiayTo: "079307004898",

      diaChiLienLac:
        "Số nhà 724/5 Điện Biên Phủ, Phường Vườn Lài, Thành Phố Hồ Chí Minh",
      diaChiThuongTru:
        "232/8/3 Bà Hạt, Khu phố 18, Phường Vườn Lài, Thành Phố Hồ Chí Minh",
      email: "thy_huong78@yahoo.com",

      maThueTNCN: "079307004898",
      chucVu: "",
      nhomKhachHang: "Chưa phân loại",
      nhanVien: "",
      ngheNghiep: "Chưa phân loại",

      duAn: "",
      loaiBDS: "Đất nền",
      sanPhamQuanTam: "",
      donViCongTac: "",

      nguonDen: "",
      capDo: "Chờ xử lý",
      mucDich: "[Chưa chọn]",
      dienGiai: "",
      ngayXuLy: "",

      danhSachDuAn: "",

      loaiGiayTo: "Thẻ căn cước nhân dân",
      soCCCD: "079307004898",
      passport: "",
      noiCap: "Cục Cảnh sát quản lý hành chính về trật tự xã hội",
      ngayCap: "27/04/2022",

      gioiTinh: "Nữ",

      maKHFast: "030200202544",
      ngayDongBo: "30/12/2025 | 11:35",
      daDongBo: true,
    },
  ]);

  const columns: ProColumns<Customer>[] = useMemo(
    () => [
      { title: "ID", dataIndex: "id", search: false, width: 70, fixed: "left" },

      {
        title: "Xưng",
        dataIndex: "xung",
        width: 80,
        valueType: "select",
        valueEnum: {
          Ông: { text: "Ông" },
          Bà: { text: "Bà" },
          Anh: { text: "Anh" },
          Chị: { text: "Chị" },
        },
      },

      { title: "Họ và tên", dataIndex: "hoVaTen", width: 180, ellipsis: true },

      {
        title: "Mã khách hàng",
        dataIndex: "maKhachHang",
        copyable: true,
        width: 150,
      },
      {
        title: "Mã KH Fast",
        dataIndex: "maKHFast",
        copyable: true,
        width: 140,
      },

      {
        title: "Giới tính",
        dataIndex: "gioiTinh",
        width: 110,
        valueType: "select",
        valueEnum: {
          Nam: { text: "Nam" },
          Nữ: { text: "Nữ" },
        },
      },

      { title: "Ngày sinh", dataIndex: "ngaySinh", width: 120, search: false },
      { title: "Di động", dataIndex: "diDong", copyable: true, width: 130 },

      {
        title: "Email",
        dataIndex: "email",
        copyable: true,
        width: 200,
        ellipsis: true,
      },

      {
        title: "Số giấy tờ",
        dataIndex: "soGiayTo",
        copyable: true,
        width: 160,
        search: false,
      },
      {
        title: "Loại giấy tờ",
        dataIndex: "loaiGiayTo",
        width: 180,
        valueType: "select",
        valueEnum: {
          "Thẻ căn cước nhân dân": { text: "Thẻ căn cước nhân dân" },
          CMND: { text: "CMND" },
          Passport: { text: "Passport" },
        },
      },

      {
        title: "Số CCCD",
        dataIndex: "soCCCD",
        copyable: true,
        width: 160,
        search: false,
      },
      {
        title: "Passport",
        dataIndex: "passport",
        copyable: true,
        width: 140,
        search: false,
      },

      {
        title: "Nơi cấp",
        dataIndex: "noiCap",
        width: 220,
        ellipsis: true,
        search: false,
      },
      { title: "Ngày cấp", dataIndex: "ngayCap", width: 120, search: false },

      {
        title: "Địa chỉ liên lạc",
        dataIndex: "diaChiLienLac",
        width: 280,
        ellipsis: true,
        search: false,
      },
      {
        title: "Địa chỉ thường trú",
        dataIndex: "diaChiThuongTru",
        width: 280,
        ellipsis: true,
        search: false,
      },

      {
        title: "Mã thuế TNCN",
        dataIndex: "maThueTNCN",
        width: 160,
        search: false,
      },

      { title: "Chức vụ", dataIndex: "chucVu", width: 140 },
      {
        title: "Nhóm khách hàng",
        dataIndex: "nhomKhachHang",
        width: 160,
        valueType: "select",
        valueEnum: {
          "Chưa phân loại": { text: "Chưa phân loại" },
          VIP: { text: "VIP" },
          "Tiềm năng": { text: "Tiềm năng" },
        },
      },
      { title: "Nhân viên", dataIndex: "nhanVien", width: 140 },
      { title: "Nghề nghiệp", dataIndex: "ngheNghiep", width: 140 },

      { title: "Dự án", dataIndex: "duAn", width: 160 },
      {
        title: "Danh sách dự án",
        dataIndex: "danhSachDuAn",
        width: 180,
        ellipsis: true,
        search: false,
      },

      {
        title: "Loại BĐS",
        dataIndex: "loaiBDS",
        width: 140,
        valueType: "select",
        valueEnum: {
          "Đất nền": { text: "Đất nền" },
          "Căn hộ": { text: "Căn hộ" },
          "Nhà phố": { text: "Nhà phố" },
        },
      },

      {
        title: "Sản phẩm quan tâm",
        dataIndex: "sanPhamQuanTam",
        width: 180,
        ellipsis: true,
      },
      {
        title: "Đơn vị công tác",
        dataIndex: "donViCongTac",
        width: 180,
        ellipsis: true,
      },

      { title: "Nguồn đến", dataIndex: "nguonDen", width: 140 },
      {
        title: "Cấp độ",
        dataIndex: "capDo",
        width: 140,
        valueType: "select",
        valueEnum: {
          "Chờ xử lý": { text: "Chờ xử lý" },
          "Đang chăm sóc": { text: "Đang chăm sóc" },
          "Đã chuyển đổi": { text: "Đã chuyển đổi" },
        },
      },
      { title: "Mục đích", dataIndex: "mucDich", width: 140 },
      { title: "Diễn giải", dataIndex: "dienGiai", width: 220, ellipsis: true },

      { title: "Ngày xử lý", dataIndex: "ngayXuLy", width: 120, search: false },

      {
        title: "Ngày đồng bộ",
        dataIndex: "ngayDongBo",
        width: 160,
        search: false,
      },

      {
        title: "Đã đồng bộ",
        dataIndex: "daDongBo",
        width: 120,
        valueType: "select",
        valueEnum: {
          true: { text: "Đã đồng bộ" },
          false: { text: "Chưa đồng bộ" },
        },
        render: (_, r) => (
          <Tag color={r.daDongBo ? "green" : "default"}>
            {r.daDongBo ? "Checked" : "Chưa đồng bộ"}
          </Tag>
        ),
      },

      {
        title: "Hành động",
        valueType: "option",
        width: 80,
        fixed: "right",
        render: (_, record) => (
          <Tooltip title="Chỉnh sửa">
            <a onClick={() => history.push('#')}>
              <EditOutlined style={{ color: "#1677ff", fontSize: 16 }} />
            </a>
          </Tooltip>
        ),
      },
    ],
    []
  );

  return (
    <PageContainer title="Danh sách khách hàng">
      <ProTable<Customer>
        rowKey="id"
        columns={columns}
        dataSource={data}
        search={{
          labelWidth: "auto",
          // collapsed: false, // nếu muốn mở sẵn
        }}
        pagination={{ pageSize: 10 }}
        scroll={{ x: 3600 }}
        rowSelection={{}}
        toolBarRender={() => [
          <Button
            key="create"
            type="primary"
            onClick={() => history.push("/crm/customer/create")}
          >
            Tạo khách hàng mới
          </Button>,
        ]}
      />
    </PageContainer>
  );
};

export default CustomerList;
