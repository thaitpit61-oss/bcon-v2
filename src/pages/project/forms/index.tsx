import type { ProColumns } from "@ant-design/pro-components";
import { PageContainer, ProTable } from "@ant-design/pro-components";
import { history } from "@umijs/max";
import { Button, Tag } from "antd";
import React, { useMemo, useState } from "react";

type ProjectForm = {
  id: number;
  tenBieuMau: string;
  loaiBieuMau: string;
  duAn: string;
  dienGiai: string;
  khoa: boolean;
  nvTao: string;
  ngayTao: string;
  nvCapNhat: string;
  ngayCapNhat: string;
};

const ProjectForms: React.FC = () => {
  const [data] = useState<ProjectForm[]>([
    {
      id: 1,
      tenBieuMau: "Phiếu khảo sát",
      loaiBieuMau: "Khảo sát khách hàng",
      duAn: "Dự án A",
      dienGiai: "Phiếu khảo sát chất lượng",
      khoa: false,
      nvTao: "Nguyễn A",
      ngayTao: "2025-05-10",
      nvCapNhat: "Trần B",
      ngayCapNhat: "2025-06-01",
    },
    {
      id: 2,
      tenBieuMau: "Phiếu đăng ký",
      loaiBieuMau: "Đăng ký tham gia",
      duAn: "Dự án B",
      dienGiai: "Phiếu đăng ký sự kiện",
      khoa: true,
      nvTao: "Lê C",
      ngayTao: "2025-06-01",
      nvCapNhat: "Lê C",
      ngayCapNhat: "2025-06-02",
    },
  ]);

  const columns: ProColumns<ProjectForm>[] = useMemo(
    () => [
      { title: "ID", dataIndex: "id", search: false, width: 70, fixed: "left" },

      {
        title: "Tên biểu mẫu",
        dataIndex: "tenBieuMau",
        ellipsis: true,
        width: 200,
      },

      {
        title: "Loại biểu mẫu",
        dataIndex: "loaiBieuMau",
        ellipsis: true,
        width: 200,
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
        title: "Diễn giải",
        dataIndex: "dienGiai",
        search: false,
        ellipsis: true,
        width: 220,
      },

      {
        title: "Trạng thái",
        dataIndex: "khoa",
        valueType: "select",
        width: 130,
        valueEnum: {
          false: { text: "Hoạt động" },
          true: { text: "Khóa" },
        },
        render: (_, record) => (
          <Tag color={record.khoa ? "red" : "green"}>
            {record.khoa ? "Khóa" : "Hoạt động"}
          </Tag>
        ),
      },

      { title: "Nhân viên tạo", dataIndex: "nvTao", width: 160 },
      {
        title: "Ngày tạo",
        dataIndex: "ngayTao",
        valueType: "date",
        search: false,
        width: 120,
      },

      { title: "Nhân viên cập nhật", dataIndex: "nvCapNhat", width: 170 },
      {
        title: "Ngày cập nhật",
        dataIndex: "ngayCapNhat",
        valueType: "date",
        search: false,
        width: 140,
      },

      {
        title: "Hành động",
        valueType: "option",
        width: 120,
        fixed: "right",
        render: (_, record) => [
          <a
            key="view"
            onClick={() => history.push(`/project/forms/${record.id}`)}
          >
            Xem
          </a>,
          <a
            key="edit"
            onClick={() => history.push(`/project/forms/${record.id}/edit`)}
          >
            Sửa
          </a>,
        ],
      },
    ],
    []
  );

  return (
    <PageContainer title="Biểu mẫu">
      <ProTable<ProjectForm>
        rowKey="id"
        columns={columns}
        dataSource={data}
        search={{ labelWidth: "auto" }}
        pagination={{ pageSize: 10 }}
        scroll={{ x: 1200 }}
        toolBarRender={() => [
          <Button
            key="create"
            type="primary"
            onClick={() => history.push("/project/forms/create")}
          >
            Tạo biểu mẫu
          </Button>,
        ]}
      />
    </PageContainer>
  );
};

export default ProjectForms;
