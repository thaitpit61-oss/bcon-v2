import type { ProColumns } from "@ant-design/pro-components";
import { PageContainer, ProTable } from "@ant-design/pro-components";
import { history } from "@umijs/max";
import { Button } from "antd";
import React, { useMemo, useState } from "react";

type SalePhase = {
  id: string;
  quyetDinh: string;
  duAn: string;
  dot: string;
  ngayBatDau: string;
  ngayKetThuc: string;
  thoiGianGiao: string;
  soNguoi: number;
  dienGia: string;
  donGia: string;
};

const ProductSale: React.FC = () => {
  const [data] = useState<SalePhase[]>([
    {
      id: "S-001",
      quyetDinh: "QD-01",
      duAn: "Dự án A",
      dot: "Đợt 1",
      ngayBatDau: "2025-06-01",
      ngayKetThuc: "2025-06-30",
      thoiGianGiao: "30 ngày",
      soNguoi: 5,
      dienGia: "1,000,000",
      donGia: "900,000",
    },
    {
      id: "S-002",
      quyetDinh: "QD-02",
      duAn: "Dự án B",
      dot: "Đợt 2",
      ngayBatDau: "2025-07-01",
      ngayKetThuc: "2025-07-15",
      thoiGianGiao: "15 ngày",
      soNguoi: 3,
      dienGia: "800,000",
      donGia: "750,000",
    },
  ]);

  const columns: ProColumns<SalePhase>[] = useMemo(
    () => [
      {
        title: "ID",
        dataIndex: "id",
        width: 90,
        fixed: "left",
        copyable: true,
      },

      {
        title: "Quyết định",
        dataIndex: "quyetDinh",
        width: 120,
        copyable: true,
      },

      {
        title: "Dự án",
        dataIndex: "duAn",
        width: 160,
        valueType: "select",
        valueEnum: {
          "Dự án A": { text: "Dự án A" },
          "Dự án B": { text: "Dự án B" },
        },
      },

      { title: "Đợt", dataIndex: "dot", width: 100 },

      {
        title: "Ngày bắt đầu",
        dataIndex: "ngayBatDau",
        valueType: "date",
        search: false,
        width: 130,
      },
      {
        title: "Ngày kết thúc",
        dataIndex: "ngayKetThuc",
        valueType: "date",
        search: false,
        width: 130,
      },

      {
        title: "Thời gian giao",
        dataIndex: "thoiGianGiao",
        search: false,
        width: 140,
      },

      {
        title: "Số người",
        dataIndex: "soNguoi",
        valueType: "digit",
        search: false,
        width: 100,
      },

      { title: "Diện giá", dataIndex: "dienGia", search: false, width: 130 },
      { title: "Đơn giá", dataIndex: "donGia", search: false, width: 130 },

      {
        title: "Hành động",
        valueType: "option",
        fixed: "right",
        width: 120,
        render: (_, record) => [
          <a
            key="view"
            onClick={() => history.push(`/product/sale/${record.id}`)}
          >
            Xem
          </a>,
          <a
            key="edit"
            onClick={() =>
              history.push(`/product/sale/${record.id}/edit`)
            }
          >
            Sửa
          </a>,
        ],
      },
    ],
    []
  );

  return (
    <PageContainer title="Đợt mở bán">
      <ProTable<SalePhase>
        rowKey="id"
        columns={columns}
        dataSource={data}
        search={{ labelWidth: "auto" }}
        pagination={{ pageSize: 10 }}
        scroll={{ x: 1100 }}
        toolBarRender={() => [
          <Button
            key="create"
            type="primary"
            onClick={() => history.push("/product/sale/create-sale")}
          >
            Thêm đợt mở bán
          </Button>,
        ]}
      />
    </PageContainer>
  );
};

export default ProductSale;
