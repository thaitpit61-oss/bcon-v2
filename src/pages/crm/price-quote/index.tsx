import { EditOutlined } from "@ant-design/icons";
import type { ProColumns } from "@ant-design/pro-components";
import { PageContainer, ProTable } from "@ant-design/pro-components";
import { history } from "@umijs/max";
import { Button, Tag, Tooltip } from "antd";
import React, { useMemo, useState } from "react";

type Quotation = {
  id: number;

  maCan: string;
  tenCoHoi: string;

  ngayTao: string;
  ngayGui: string;
  ngayHetHan: string;

  pheDuyet: boolean;
  pheDuyetLuc: string;
  pheDuyetBoi: string;

  dienTich: number;
  block: string;
  tang: number;
  phongNgu: number;

  tongGiaBan: number;
  chinhSach: string;

  taoBoi: string;
  capNhatBoi: string;

  dienGiai: string;
};

const QuotationList: React.FC = () => {
  const [data] = useState<Quotation[]>([
    {
      id: 1,
      maCan: "A1-12",
      tenCoHoi: "CH-0001",

      ngayTao: "2025-04-25",
      ngayGui: "2025-04-26",
      ngayHetHan: "2025-05-10",

      pheDuyet: true,
      pheDuyetLuc: "2025-04-26 10:30",
      pheDuyetBoi: "Nguyễn Thanh Thủy",

      dienTich: 68.5,
      block: "A",
      tang: 12,
      phongNgu: 2,

      tongGiaBan: 2850000000,
      chinhSach: "Chiết khấu 5%",

      taoBoi: "BC1579",
      capNhatBoi: "BC1579",

      dienGiai: "Báo giá lần 1",
    },
  ]);

  const columns: ProColumns<Quotation>[] = useMemo(
    () => [
      { title: "ID", dataIndex: "id", width: 60, search: false, fixed: "left" },

      {
        title: "Mã căn",
        dataIndex: "maCan",
        copyable: true,
        width: 120,
      },
      {
        title: "Tên cơ hội",
        dataIndex: "tenCoHoi",
        width: 160,
      },

      {
        title: "Ngày tạo",
        dataIndex: "ngayTao",
        valueType: "date",
        width: 120,
      },
      {
        title: "Ngày gửi",
        dataIndex: "ngayGui",
        valueType: "date",
        width: 120,
      },
      {
        title: "Ngày hết hạn",
        dataIndex: "ngayHetHan",
        valueType: "date",
        width: 130,
      },

      {
        title: "Phê duyệt",
        dataIndex: "pheDuyet",
        width: 120,
        valueType: "select",
        valueEnum: {
          true: { text: "Đã duyệt" },
          false: { text: "Chưa duyệt" },
        },
        render: (_, r) => (
          <Tag color={r.pheDuyet ? "green" : "default"}>
            {r.pheDuyet ? "Đã duyệt" : "Chưa duyệt"}
          </Tag>
        ),
      },

      {
        title: "Phê duyệt lúc",
        dataIndex: "pheDuyetLuc",
        width: 160,
        search: false,
      },
      {
        title: "Phê duyệt bởi",
        dataIndex: "pheDuyetBoi",
        width: 160,
      },

      {
        title: "Diện tích",
        dataIndex: "dienTich",
        width: 120,
        search: false,
      },
      {
        title: "Block",
        dataIndex: "block",
        width: 100,
      },
      {
        title: "Tầng",
        dataIndex: "tang",
        width: 80,
        search: false,
      },
      {
        title: "P. Ngủ",
        dataIndex: "phongNgu",
        width: 90,
        search: false,
      },

      {
        title: "Tổng giá bán",
        dataIndex: "tongGiaBan",
        valueType: "money",
        width: 160,
        search: false,
      },

      {
        title: "Chính sách",
        dataIndex: "chinhSach",
        width: 180,
        ellipsis: true,
      },

      {
        title: "Tạo bởi",
        dataIndex: "taoBoi",
        width: 140,
      },
      {
        title: "Cập nhật bởi",
        dataIndex: "capNhatBoi",
        width: 140,
      },

      {
        title: "Diễn giải",
        dataIndex: "dienGiai",
        width: 220,
        ellipsis: true,
        search: false,
      },

      {
        title: "Hành động",
        valueType: "option",
        width: 80,
        fixed: "right",
        render: (_, record) => (
          <Tooltip title="Chỉnh sửa">
            <a
              onClick={() =>
                history.push(`/crm/price-quote/${record.id}/edit`)
              }
            >
              <EditOutlined style={{ color: "#1677ff", fontSize: 16 }} />
            </a>
          </Tooltip>
        ),
      },
    ],
    []
  );

  return (
    <PageContainer title="Danh sách báo giá">
      <ProTable<Quotation>
        rowKey="id"
        columns={columns}
        dataSource={data}
        search={{ labelWidth: "auto" }}
        pagination={{ pageSize: 10 }}
        scroll={{ x: 2600 }}
        rowSelection={{}}
        // toolBarRender={() => [
        //   <Button
        //     key="create"
        //     type="primary"
        //     onClick={() => history.push("/crm/price-quote/create")}
        //   >
        //     Tạo báo giá
        //   </Button>,
        // ]}
      />
    </PageContainer>
  );
};

export default QuotationList;
