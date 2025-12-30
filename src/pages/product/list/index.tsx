import type { ProColumns } from "@ant-design/pro-components";
import { PageContainer, ProTable } from "@ant-design/pro-components";
import { history } from "@umijs/max";
import { Button, Tag } from "antd";
import React, { useMemo, useState } from "react";

type Product = {
  stt: number;
  trangThai: "Available" | "Sold" | string;
  maCan: string;
  duAn: string;
  dotBanHang: string;
  loaiSP: string;
  tang: string;
  dienTich: string;
  donGia: string;
  tongGia: string;
  chietKhau: string;
  tongSauCK: string;
};

const ProductList: React.FC = () => {
  const [data] = useState<Product[]>([
    {
      stt: 1,
      trangThai: "Available",
      maCan: "C-001",
      duAn: "Dự án A",
      dotBanHang: "Đợt 1",
      loaiSP: "Căn hộ",
      tang: "Tầng 5",
      dienTich: "75 m2",
      donGia: "1,200,000",
      tongGia: "90,000,000",
      chietKhau: "5%",
      tongSauCK: "85,500,000",
    },
    {
      stt: 2,
      trangThai: "Sold",
      maCan: "C-002",
      duAn: "Dự án B",
      dotBanHang: "Đợt 2",
      loaiSP: "Studio",
      tang: "Tầng 3",
      dienTich: "40 m2",
      donGia: "900,000",
      tongGia: "36,000,000",
      chietKhau: "0%",
      tongSauCK: "36,000,000",
    },
  ]);

  const columns: ProColumns<Product>[] = useMemo(
    () => [
      {
        title: "STT",
        dataIndex: "stt",
        search: false,
        width: 70,
        fixed: "left",
      },

      {
        title: "Trạng thái",
        dataIndex: "trangThai",
        valueType: "select",
        width: 120,
        valueEnum: {
          Available: { text: "Available" },
          Sold: { text: "Sold" },
        },
        render: (_, record) => {
          const s = (record.trangThai || "").toLowerCase();
          const color =
            s === "available" ? "green" : s === "sold" ? "red" : "default";
          return <Tag color={color}>{record.trangThai}</Tag>;
        },
      },

      { title: "Mã căn", dataIndex: "maCan", width: 120, copyable: true },
      { title: "Dự án", dataIndex: "duAn", width: 160, ellipsis: true },
      { title: "Đợt bán", dataIndex: "dotBanHang", width: 140 },
      { title: "Loại SP", dataIndex: "loaiSP", width: 120 },
      { title: "Tầng", dataIndex: "tang", width: 100 },

      { title: "Diện tích", dataIndex: "dienTich", search: false, width: 120 },
      { title: "Đơn giá", dataIndex: "donGia", search: false, width: 140 },
      { title: "Tổng giá", dataIndex: "tongGia", search: false, width: 140 },
      {
        title: "Chiết khấu",
        dataIndex: "chietKhau",
        search: false,
        width: 110,
      },
      {
        title: "Tổng sau CK",
        dataIndex: "tongSauCK",
        search: false,
        width: 150,
      },

      {
        title: "Hành động",
        valueType: "option",
        fixed: "right",
        width: 120,
        render: (_, record) => [
          <a
            key="view"
            onClick={() => history.push(`/product/${record.maCan}`)}
          >
            Xem
          </a>,
          <a
            key="edit"
            onClick={() => history.push(`/product/${record.maCan}/edit`)}
          >
            Sửa
          </a>,
        ],
      },
    ],
    []
  );

  return (
    <PageContainer title="Danh sách sản phẩm">
      <ProTable<Product>
        rowKey="maCan"
        columns={columns}
        dataSource={data}
        search={{ labelWidth: "auto" }}
        pagination={{ pageSize: 10 }}
        scroll={{ x: 1200 }}
        toolBarRender={() => [
          <Button
            key="create"
            type="primary"
            onClick={() => history.push("/product/create")}
          >
            Thêm sản phẩm
          </Button>,
        ]}
      />
    </PageContainer>
  );
};

export default ProductList;
