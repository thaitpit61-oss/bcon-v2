import { EditOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { history } from '@umijs/max';
import { Button, message, Switch, Tag, Tooltip } from 'antd';
import React, { useMemo, useState } from 'react';

type Project = {
  id: number;
  ngay: string;
  code: string;
  maFast: string;
  tenDuAn: string;
  loaiDuAn: 'Loại 1' | 'Loại 2' | string;
  nhanVien: string;
  dienTich: number | string;
  soGiayPhep: string;
  ngayCap: string;
  donGia: number | string; // custom: cho phép number/string
  soLuong: number;
  diaChi: string;
  ngayDuyet: string;
  nguoiDuyet: string;
  daDuyet: boolean;

  // ✅ thêm status
  status: boolean;
};

const toNumber = (v: any) => {
  if (typeof v === 'number') return v;
  if (typeof v === 'string') return Number(v.replace(/,/g, ''));
  return 0;
};

const ProjectList: React.FC = () => {
  const [data] = useState<Project[]>([
    {
      id: 1,
      ngay: '2025-01-01',
      code: 'DA-001',
      maFast: 'MF001',
      tenDuAn: 'Dự án A',
      loaiDuAn: 'Loại 1',
      nhanVien: 'Nguyễn A',
      dienTich: 120,
      soGiayPhep: 'GP-123',
      ngayCap: '2024-12-01',
      donGia: 1000000,
      soLuong: 10,
      diaChi: 'Hà Nội',
      ngayDuyet: '2024-12-15',
      nguoiDuyet: 'Ban QL',
      daDuyet: true,

      status: true,
    },
    {
      id: 2,
      ngay: '2025-02-02',
      code: 'DA-002',
      maFast: 'MF002',
      tenDuAn: 'Dự án B',
      loaiDuAn: 'Loại 2',
      nhanVien: 'Trần B',
      dienTich: 80,
      soGiayPhep: 'GP-456',
      ngayCap: '2024-11-20',
      donGia: 800000,
      soLuong: 5,
      diaChi: 'Hồ Chí Minh',
      ngayDuyet: '2024-11-30',
      nguoiDuyet: 'BGĐ',
      daDuyet: false,

      status: false,
    },
  ]);

  const columns: ProColumns<Project>[] = useMemo(
    () => [
      { title: 'ID', dataIndex: 'id', search: false, width: 70, fixed: 'left' },

      { title: 'Mã', dataIndex: 'code', copyable: true, width: 120 },
      { title: 'Mã Fast', dataIndex: 'maFast', copyable: true, width: 120 },

      {
        title: 'Tên dự án',
        dataIndex: 'tenDuAn',
        ellipsis: true,
        width: 220,
      },

      {
        title: 'Loại dự án',
        dataIndex: 'loaiDuAn',
        valueType: 'select',
        width: 140,
        valueEnum: {
          'Loại 1': { text: 'Loại 1' },
          'Loại 2': { text: 'Loại 2' },
        },
      },

      { title: 'Nhân viên', dataIndex: 'nhanVien', width: 160 },
      { title: 'Địa chỉ', dataIndex: 'diaChi', ellipsis: true, width: 180 },

      // Hiển thị: không search
      {
        title: 'Diện tích (m²)',
        dataIndex: 'dienTich',
        search: false,
        width: 140,
        renderText: (v) => `${v}`,
      },

      // money: nên để number cho đẹp; nếu backend trả string có , thì parse
      {
        title: 'Đơn giá',
        dataIndex: 'donGia',
        search: false,
        width: 140,
        valueType: 'money',
        renderText: (v) => toNumber(v),
      },

      {
        title: 'Số lượng',
        dataIndex: 'soLuong',
        search: false,
        width: 100,
        valueType: 'digit',
      },

      {
        title: 'Đã duyệt',
        dataIndex: 'daDuyet',
        width: 120,
        valueType: 'select',
        valueEnum: {
          true: { text: 'Đã duyệt' },
          false: { text: 'Chưa duyệt' },
        },
        render: (_, record) => (
          <Tag color={record.daDuyet ? 'green' : 'default'}>
            {record.daDuyet ? 'Đã duyệt' : 'Chưa duyệt'}
          </Tag>
        ),
      },

      {
        title: 'Ngày',
        dataIndex: 'ngay',
        valueType: 'date',
        search: false,
        width: 120,
      },
      {
        title: 'Ngày duyệt',
        dataIndex: 'ngayDuyet',
        valueType: 'date',
        search: false,
        width: 120,
      },

      // ✅ Status (Switch UI mẫu: không lưu)
      {
        title: 'Status',
        dataIndex: 'status',
        width: 140,
        fixed: 'right',
        search: false, // demo UI thôi
        render: (_, record) => (
          <Switch
            defaultChecked={record.status}
            checkedChildren="ON"
            unCheckedChildren="OFF"
            onChange={(checked) => {
              message.info(
                `Demo status: ${checked ? 'Đang hoạt động' : 'Tạm dừng'}`,
              );
            }}
          />
        ),
      },

      {
        title: 'Hành động',
        valueType: 'option',
        width: 80,
        fixed: 'right',
        render: (_, record) => (
          <Tooltip title="Chỉnh sửa">
            <a onClick={() => history.push(`/project/${record.id}/edit`)}>
              <EditOutlined style={{ color: '#1677ff', fontSize: 16 }} />
            </a>
          </Tooltip>
        ),
      },
    ],
    [],
  );

  return (
    <PageContainer title="Quản lý dự án">
      <ProTable<Project>
        rowKey="id"
        columns={columns}
        dataSource={data}
        search={{ labelWidth: 'auto' }}
        pagination={{ pageSize: 10 }}
        scroll={{ x: 1350 }}
        rowSelection={{}}
        toolBarRender={() => [
          <Button
            key="create"
            type="primary"
            onClick={() => history.push('/project/create')}
          >
            Tạo dự án mới
          </Button>,
        ]}
      />
    </PageContainer>
  );
};

export default ProjectList;
