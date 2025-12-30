import React, { useMemo, useState } from 'react';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import type { ProColumns } from '@ant-design/pro-components';
import { Button, Tag } from 'antd';
import { history } from '@umijs/max';

export type PaymentScheduleItem = {
  id: number;
  dot: string;
  truongHop: string;
  khoangCach: string;
  macDinh: boolean;
  nvTao: string;
  ngayTao: string;
  nvCapNhat: string;
  ngayCapNhat: string;
};

export const MOCK_PAYMENT_SCHEDULES: PaymentScheduleItem[] = [
  {
    id: 1,
    dot: 'Đợt 1',
    truongHop: 'Thanh toán theo tiến độ',
    khoangCach: '30 ngày',
    macDinh: true,
    nvTao: 'Nguyễn A',
    ngayTao: '2025-05-01',
    nvCapNhat: 'Trần B',
    ngayCapNhat: '2025-05-10',
  },
  {
    id: 2,
    dot: 'Đợt 2',
    truongHop: 'Thanh toán đợt',
    khoangCach: '60 ngày',
    macDinh: false,
    nvTao: 'Lê C',
    ngayTao: '2025-06-01',
    nvCapNhat: 'Lê C',
    ngayCapNhat: '2025-06-02',
  },
];

const PaymentScheduleList: React.FC = () => {
  const [data] = useState<PaymentScheduleItem[]>(MOCK_PAYMENT_SCHEDULES);

  const columns: ProColumns<PaymentScheduleItem>[] = useMemo(
    () => [
      { title: 'ID', dataIndex: 'id', search: false, width: 70, fixed: 'left' },
      { title: 'Đợt', dataIndex: 'dot', width: 120 },
      { title: 'Trường hợp', dataIndex: 'truongHop', width: 220, ellipsis: true },
      { title: 'Khoảng cách', dataIndex: 'khoangCach', search: false, width: 120 },

      {
        title: 'Mặc định',
        dataIndex: 'macDinh',
        valueType: 'select',
        width: 110,
        valueEnum: {
          true: { text: 'Yes' },
          false: { text: 'No' },
        },
        render: (_, record) => (
          <Tag color={record.macDinh ? 'green' : 'default'}>
            {record.macDinh ? 'Yes' : 'No'}
          </Tag>
        ),
      },

      { title: 'Nhân viên tạo', dataIndex: 'nvTao', width: 160 },
      { title: 'Ngày tạo', dataIndex: 'ngayTao', valueType: 'date', search: false, width: 120 },

      { title: 'Nhân viên cập nhật', dataIndex: 'nvCapNhat', width: 180 },
      { title: 'Ngày cập nhật', dataIndex: 'ngayCapNhat', valueType: 'date', search: false, width: 140 },

      {
        title: 'Hành động',
        valueType: 'option',
        fixed: 'right',
        width: 160,
        render: (_, record) => [
          <a key="view" onClick={() => history.push(`/project/payment-schedule/${record.id}`)}>
            Xem
          </a>,
          <a key="edit" onClick={() => history.push(`/project/payment-schedule/${record.id}/edit`)}>
            Sửa
          </a>,
        ],
      },
    ],
    [],
  );

  return (
    <PageContainer title="Lịch thanh toán">
      <ProTable<PaymentScheduleItem>
        rowKey="id"
        columns={columns}
        dataSource={data}
        search={{ labelWidth: 'auto' }}
        pagination={{ pageSize: 10 }}
        scroll={{ x: 1200 }}
        toolBarRender={() => [
          <Button
            key="create"
            type="primary"
            onClick={() => history.push('/project/payment-schedule/create')}
          >
            Tạo lịch
          </Button>,
        ]}
      />
    </PageContainer>
  );
};

export default PaymentScheduleList;
