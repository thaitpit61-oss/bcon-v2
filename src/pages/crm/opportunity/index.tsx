import { EditOutlined } from "@ant-design/icons";
import type { ProColumns } from "@ant-design/pro-components";
import { PageContainer, ProTable } from "@ant-design/pro-components";
import { history } from "@umijs/max";
import { Button, Tooltip } from "antd";
import React, { useMemo, useState } from "react";

type Opportunity = {
  id: number;

  // Thông tin sản phẩm
  maSoCoHoi: string;
  duAn: string;
  maSanPham: string;
  giaTri: number;

  // Thời gian thao tác
  ngayCapNhat: string; // YYYY-MM-DD
  ngayXacNhanNhuCau: string;
  ngayThoaThuanDamBao: string;
  ngayMuaBan: string;

  // Thông tin khách hàng
  quyDanh: string;
  hoVaTen: string;
  quocGia: string;
  tinh: string;
  loaiKhachHang: "Cá nhân" | "Công ty" | string;
  nguonDen: string;
  mucDich: string;

  // Thông tin nhân viên
  nhanVien: string;
  sanGiaoDich: string;

  // Thông tin ghi chú
  phanTramHoanThanh: number; // 0..100
  capDo: string;
  ghiChu: string;
};

const OpportunityList: React.FC = () => {
  const [data] = useState<Opportunity[]>([
    {
      id: 1,
      maSoCoHoi: "CH-0001",
      duAn: "Dự án A",
      maSanPham: "SP-001",
      giaTri: 1200000000,

      ngayCapNhat: "2025-12-30",
      ngayXacNhanNhuCau: "2025-12-28",
      ngayThoaThuanDamBao: "2025-12-29",
      ngayMuaBan: "2026-01-05",

      quyDanh: "Mr",
      hoVaTen: "BÙI QUỲNH ANH",
      quocGia: "Việt Nam",
      tinh: "Hồ Chí Minh",
      loaiKhachHang: "Cá nhân",
      nguonDen: "Facebook",
      mucDich: "Đầu tư",

      nhanVien: "BC1579",
      sanGiaoDich: "Sàn 1",

      phanTramHoanThanh: 35,
      capDo: "Chờ xử lý",
      ghiChu: "Đã gọi lần 1, chờ phản hồi.",
    },
    {
      id: 2,
      maSoCoHoi: "CH-0002",
      duAn: "Dự án B",
      maSanPham: "SP-012",
      giaTri: 850000000,

      ngayCapNhat: "2025-12-29",
      ngayXacNhanNhuCau: "2025-12-20",
      ngayThoaThuanDamBao: "2025-12-25",
      ngayMuaBan: "2026-02-01",

      quyDanh: "Mrs",
      hoVaTen: "TRẦN THỊ B",
      quocGia: "Việt Nam",
      tinh: "Bình Dương",
      loaiKhachHang: "Công ty",
      nguonDen: "Giới thiệu",
      mucDich: "Ở",

      nhanVien: "BC2001",
      sanGiaoDich: "Sàn 2",

      phanTramHoanThanh: 70,
      capDo: "Đang chăm sóc",
      ghiChu: "Đã xem nhà mẫu.",
    },
  ]);

  const columns: ProColumns<Opportunity>[] = useMemo(
    () => [
      // ===== Thông tin sản phẩm =====
      {
        title: "Thông tin sản phẩm",
        children: [
          {
            title: "Mã số cơ hội",
            dataIndex: "maSoCoHoi",
            copyable: true,
            width: 150,
            fixed: "left",
          },
          {
            title: "Dự án",
            dataIndex: "duAn",
            valueType: "select",
            width: 160,
            valueEnum: {
              "Dự án A": { text: "Dự án A" },
              "Dự án B": { text: "Dự án B" },
            },
          },
          {
            title: "Mã sản phẩm",
            dataIndex: "maSanPham",
            copyable: true,
            width: 150,
          },
          {
            title: "Giá trị",
            dataIndex: "giaTri",
            valueType: "money",
            width: 150,
            search: false,
            onHeaderCell: () => ({
              className: "border-r border-slate-200",
            }),
            onCell: () => ({
              className: "border-r border-slate-200",
            }),
          },
        ],
      },

      // ===== Thời gian thao tác =====
      {
        title: "Thời gian thao tác",
        children: [
          {
            title: "Ngày cập nhật",
            dataIndex: "ngayCapNhat",
            valueType: "date",
            width: 140,
          },
          {
            title: "Ngày xác nhận nhu cầu",
            dataIndex: "ngayXacNhanNhuCau",
            valueType: "date",
            width: 190,
          },
          {
            title: "Ngày thỏa thuận đảm bảo",
            dataIndex: "ngayThoaThuanDamBao",
            valueType: "date",
            width: 210,
          },
          {
            title: "Ngày mua bán",
            dataIndex: "ngayMuaBan",
            valueType: "date",
            width: 140,
            onHeaderCell: () => ({
              className: "border-r border-slate-200",
            }),
            onCell: () => ({
              className: "border-r border-slate-200",
            }),
          },
        ],
      },

      // ===== Thông tin khách hàng =====
      {
        title: "Thông tin khách hàng",
        children: [
          {
            title: "Quý danh",
            dataIndex: "quyDanh",
            valueType: "select",
            width: 100,
            valueEnum: {
              Mr: { text: "Mr" },
              Mrs: { text: "Mrs" },
              Ms: { text: "Ms" },
            },
          },
          {
            title: "Họ và tên",
            dataIndex: "hoVaTen",
            ellipsis: true,
            width: 200,
          },
          {
            title: "Quốc gia",
            dataIndex: "quocGia",
            width: 130,
          },
          {
            title: "Tỉnh",
            dataIndex: "tinh",
            width: 140,
          },
          {
            title: "Loại khách hàng",
            dataIndex: "loaiKhachHang",
            valueType: "select",
            width: 150,
            valueEnum: {
              "Cá nhân": { text: "Cá nhân" },
              "Công ty": { text: "Công ty" },
            },
          },
          {
            title: "Nguồn đến",
            dataIndex: "nguonDen",
            width: 150,
          },
          {
            title: "Mục đích",
            dataIndex: "mucDich",
            width: 140,
            onHeaderCell: () => ({
              className: "border-r border-slate-200",
            }),
            onCell: () => ({
              className: "border-r border-slate-200",
            }),
          },
        ],
      },

      // ===== Thông tin nhân viên =====
      {
        title: "Thông tin nhân viên",
        children: [
          { title: "Nhân viên", dataIndex: "nhanVien", width: 130 },
          { title: "Sàn giao dịch", dataIndex: "sanGiaoDich", width: 150 },
        ],
      },

      // ===== Thông tin ghi chú =====
      {
        title: "Thông tin ghi chú",
        children: [
          {
            title: "% hoàn thành",
            dataIndex: "phanTramHoanThanh",
            width: 140,
            valueType: "percent",
            // ProTable percent expects 0..1
            renderText: (v) => (typeof v === "number" ? v / 100 : 0),
            search: false,
          },
          {
            title: "Cấp độ",
            dataIndex: "capDo",
            valueType: "select",
            width: 150,
            valueEnum: {
              "Chờ xử lý": { text: "Chờ xử lý" },
              "Đang chăm sóc": { text: "Đang chăm sóc" },
              "Đã chuyển đổi": { text: "Đã chuyển đổi" },
            },
          },
          {
            title: "Ghi chú",
            dataIndex: "ghiChu",
            ellipsis: true,
            width: 240,
            search: false,
            onHeaderCell: () => ({
              className: "border-r border-slate-200",
            }),
            onCell: () => ({
              className: "border-r border-slate-200",
            }),
          },
        ],
      },

      // ===== Hành động =====
      {
        title: "Hành động",
        valueType: "option",
        width: 80,
        fixed: "right",
        search: false,
        render: (_, record) => (
          <Tooltip title="Chỉnh sửa">
            <a onClick={() => history.push(`/opportunity/${record.id}/edit`)}>
              <EditOutlined style={{ color: "#1677ff", fontSize: 16 }} />
            </a>
          </Tooltip>
        ),
      },
    ],
    []
  );

  return (
    <PageContainer title="Danh sách cơ hội">
      <ProTable<Opportunity>
        rowKey="id"
        columns={columns}
        dataSource={data}
        search={{ labelWidth: "auto" }}
        pagination={{ pageSize: 10 }}
        scroll={{ x: 2600 }}
        rowSelection={{}}
        toolBarRender={() => [
          <Button
            key="create"
            type="primary"
            onClick={() => history.push("/opportunity/create")}
          >
            Tạo cơ hội mới
          </Button>,
        ]}
      />
    </PageContainer>
  );
};

export default OpportunityList;
