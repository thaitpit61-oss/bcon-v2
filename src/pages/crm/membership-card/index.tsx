import { EditOutlined } from "@ant-design/icons";
import type { ProColumns } from "@ant-design/pro-components";
import { PageContainer, ProTable } from "@ant-design/pro-components";
import { history } from "@umijs/max";
import { Button, Tag, Tooltip } from "antd";
import React, { useMemo, useState } from "react";

type MembershipCard = {
  id: number;

  xung: string;
  hoVaTen: string;
  diDong: string;

  maThe: string;
  diemThuong: number;
  loaiThe: string;

  ngayBatDau: string;
  ngayHetHan: string;

  nguoiTao: string;
  ngayTao: string;

  noiDung: string;
};

const MembershipCardList: React.FC = () => {
  const [data] = useState<MembershipCard[]>([
    {
      id: 1,
      xung: "Ông",
      hoVaTen: "NGUYỄN CHÍ VIỆT",
      diDong: "0949429141",
      maThe: "Vime00002363",
      diemThuong: 0,
      loaiThe: "Chưa giao dịch",
      ngayBatDau: "25/04/2025",
      ngayHetHan: "25/04/2026",
      nguoiTao: "Nguyễn Thanh Thủy",
      ngayTao: "25/04/2025",
      noiDung: "",
    },
    {
      id: 2,
      xung: "Bà",
      hoVaTen: "LÊ THỊ THANH CHI",
      diDong: "0965772559",
      maThe: "Vime00001550",
      diemThuong: 0,
      loaiThe: "Chưa giao dịch",
      ngayBatDau: "10/03/2025",
      ngayHetHan: "10/03/2026",
      nguoiTao: "Nguyễn Thị Thùy Trang",
      ngayTao: "10/03/2025",
      noiDung: "",
    },
    {
      id: 3,
      xung: "Ông",
      hoVaTen: "NGUYỄN MẠNH HÙNG",
      diDong: "0903373658",
      maThe: "Vime00002242",
      diemThuong: 0,
      loaiThe: "Chưa giao dịch",
      ngayBatDau: "21/04/2025",
      ngayHetHan: "21/04/2026",
      nguoiTao: "Nguyễn Thị Thùy Trang",
      ngayTao: "21/04/2025",
      noiDung: "",
    },
  ]);

  const columns: ProColumns<MembershipCard>[] = useMemo(
    () => [
      { title: "STT", dataIndex: "id", width: 70, fixed: "left", search: false },

      {
        title: "Xưng",
        dataIndex: "xung",
        width: 80,
        valueType: "select",
        valueEnum: {
          Ông: { text: "Ông" },
          Bà: { text: "Bà" },
        },
      },

      {
        title: "Tên",
        dataIndex: "hoVaTen",
        width: 180,
        ellipsis: true,
      },

      {
        title: "Di động",
        dataIndex: "diDong",
        width: 130,
        copyable: true,
      },

      {
        title: "Mã thẻ",
        dataIndex: "maThe",
        width: 160,
        copyable: true,
      },

      {
        title: "Điểm thưởng",
        dataIndex: "diemThuong",
        width: 120,
        search: false,
      },

      {
        title: "Loại thẻ",
        dataIndex: "loaiThe",
        width: 160,
        valueType: "select",
        valueEnum: {
          "Chưa giao dịch": { text: "Chưa giao dịch" },
          "Đã giao dịch": { text: "Đã giao dịch" },
        },
        render: (_, r) => (
          <Tag color={r.loaiThe === "Chưa giao dịch" ? "default" : "green"}>
            {r.loaiThe}
          </Tag>
        ),
      },

      {
        title: "Ngày bắt đầu",
        dataIndex: "ngayBatDau",
        width: 130,
        search: false,
      },

      {
        title: "Ngày hết hạn",
        dataIndex: "ngayHetHan",
        width: 130,
        search: false,
      },

      {
        title: "Người tạo",
        dataIndex: "nguoiTao",
        width: 180,
        ellipsis: true,
      },

      {
        title: "Ngày tạo",
        dataIndex: "ngayTao",
        width: 130,
        search: false,
      },

      {
        title: "Nội dung",
        dataIndex: "noiDung",
        width: 240,
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
            <a onClick={() => history.push(`/crm/membership-card/${record.id}/edit`)}>
              <EditOutlined style={{ color: "#1677ff", fontSize: 16 }} />
            </a>
          </Tooltip>
        ),
      },
    ],
    []
  );

  return (
    <PageContainer title="Danh sách thẻ thành viên">
      <ProTable<MembershipCard>
        rowKey="id"
        columns={columns}
        dataSource={data}
        search={{ labelWidth: "auto" }}
        pagination={{ pageSize: 10 }}
        scroll={{ x: 1800 }}
        rowSelection={{}}
        toolBarRender={() => [
          <Button
            key="create"
            type="primary"
            onClick={() => history.push("/crm/membership-card/create")}
          >
            Tạo thẻ thành viên
          </Button>,
        ]}
      />
    </PageContainer>
  );
};

export default MembershipCardList;