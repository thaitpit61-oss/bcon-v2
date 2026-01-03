import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import type { ProColumns } from "@ant-design/pro-components";
import { PageContainer, ProTable } from "@ant-design/pro-components";
import { history } from "@umijs/max";
import { Button, message, Switch, Tooltip } from "antd";
import React, { useMemo } from "react";

type User = {
  id: number;

  xung: string;
  hoVaTen: string;
  maSo: string;
  loaiGiayTo: string;
  soGiayTo: string;

  ngaySinh: string; // dd/MM/yyyy
  ngayCap: string; // dd/MM/yyyy
  noiCap: string;
  nguyenQuan: string;

  diaChiLienLac: string;
  diaChiThuongTru: string;
  email: string;
  dienThoai: number;
  dienThoaiNB: number;
  chiNhanh: string;
  phongBan: string;
  nhomKD: string;
  chucDanh: string;
  maSoThue: string;
  soTaiKhoan: string;
  nganHang: string;
  nguoiQL1: string;
  nguoiQL2: string;
  ghiChu: string;
  mucHoaHoang: number;

  status: boolean;
};

type ApiListResponse<T> = {
  success: boolean;
  message?: string;
  data: {
    items: T[];
    page: number;
    pageSize: number;
    total: number;
  };
};

const UserList: React.FC = () => {
  const columns: ProColumns<User>[] = useMemo(
    () => [
      { title: "ID", dataIndex: "id", search: false, width: 70, fixed: "left" },

      { title: "Mã số", dataIndex: "maSo", width: 140, ellipsis: true },

      { title: "Họ và tên", dataIndex: "hoVaTen", width: 180, ellipsis: true },
      { title: "Ngày sinh", dataIndex: "ngaySinh", width: 120, search: false },
      {
        title: "Điện thoại",
        dataIndex: "dienThoai",
        copyable: true,
        width: 130,
      },
      {
        title: "Điện thoại NB",
        dataIndex: "dienThoaiNB",
        copyable: true,
        width: 130,
        search: false,
      },
      {
        title: "Trạng thái",
        dataIndex: "status",
        width: 100,
        search: false,
        render: (_, record) => (
          <Switch
            checked={record.status}
            checkedChildren="on"
            unCheckedChildren="off"
            onChange={async (checked) => {
              try {
                const res = await fetch(`/api/users/${record.id}`, {
                  method: "PUT",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ status: checked }),
                });

                const json = await res.json();

                if (!res.ok || !json?.success) {
                  message.error("Cập nhật trạng thái thất bại");
                  return;
                }

                message.success("Cập nhật trạng thái thành công");
              } catch {
                message.error("Lỗi mạng");
              }
            }}
          />
        ),
      },
      { title: "Nhóm KD", dataIndex: "nhomKD", width: 140, ellipsis: true },
      { title: "Chức danh", dataIndex: "chucDanh", width: 160, ellipsis: true },

      {
        title: "Loại giấy tờ",
        dataIndex: "loaiGiayTo",
        width: 170,
        valueType: "select",
        valueEnum: {
          "Thẻ căn cước nhân dân": { text: "Thẻ căn cước nhân dân" },
          CMND: { text: "CMND" },
          Passport: { text: "Passport" },
        },
      },

      {
        title: "Số giấy tờ",
        dataIndex: "soGiayTo",
        copyable: true,
        width: 160,
        search: false,
      },

      { title: "Ngày cấp", dataIndex: "ngayCap", width: 120, search: false },

      {
        title: "Nơi cấp",
        dataIndex: "noiCap",
        width: 200,
        ellipsis: true,
        search: false,
      },

      {
        title: "Nguyên quán",
        dataIndex: "nguyenQuan",
        width: 200,
        ellipsis: true,
        search: false,
      },

      {
        title: "Email",
        dataIndex: "email",
        copyable: true,
        width: 220,
        ellipsis: true,
      },

      {
        title: "Địa chỉ liên lạc",
        dataIndex: "diaChiLienLac",
        width: 260,
        ellipsis: true,
        search: false,
      },
      {
        title: "Địa chỉ thường trú",
        dataIndex: "diaChiThuongTru",
        width: 260,
        ellipsis: true,
        search: false,
      },

      {
        title: "Mã số thuế",
        dataIndex: "maSoThue",
        width: 160,
        ellipsis: true,
        search: false,
      },

      {
        title: "Ngân hàng",
        dataIndex: "nganHang",
        width: 160,
        ellipsis: true,
        search: false,
      },
      {
        title: "Số tài khoản",
        dataIndex: "soTaiKhoan",
        width: 170,
        ellipsis: true,
        search: false,
      },

      {
        title: "QL1",
        dataIndex: "nguoiQL1",
        width: 160,
        ellipsis: true,
        search: false,
      },
      {
        title: "QL2",
        dataIndex: "nguoiQL2",
        width: 160,
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
            <a onClick={() => history.push(`/crm/user/${record.id}/edit`)}>
              <EditOutlined style={{ color: "#1677ff", fontSize: 16 }} />
            </a>
          </Tooltip>
        ),
      },
    ],
    []
  );

  return (
    <PageContainer title="Danh sách người dùng">
      <ProTable<User>
        rowKey="id"
        columns={columns}
        search={{ labelWidth: "auto" }}
        pagination={{ pageSize: 10 }}
        scroll={{ x: 2600 }}
        rowSelection={{}}
        toolBarRender={() => [
          <Button
            key="create"
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => history.push("/user/create")}
          >
            Tạo người dùng mới
          </Button>,
        ]}
        request={async (params) => {
          const { current = 1, pageSize = 10, ...rest } = params;

          // ✅ keyword chỉ lấy từ field có trong User
          const keyword =
            (rest.hoVaTen as string) ||
            (rest.maSo as string) ||
            (rest.email as string) ||
            (rest.dienThoai as any) ||
            "";

          const qs = new URLSearchParams({
            page: String(current),
            pageSize: String(pageSize),
            keyword: String(keyword || "").trim(),
          });

          const res = await fetch(`/api/users?${qs.toString()}`, {
            method: "GET",
          });
          const resp: ApiListResponse<User> = await res.json();

          return {
            data: resp.data.items,
            success: resp.success,
            total: resp.data.total,
          };
        }}
      />
    </PageContainer>
  );
};

export default UserList;
