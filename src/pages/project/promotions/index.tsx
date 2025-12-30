import React, { useMemo, useState } from 'react';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import type { ProColumns } from '@ant-design/pro-components';
import { Button } from 'antd';
import { history } from '@umijs/max';

type Promotion = {
  id: number;
  duAn: string;
  tenChuongTrinh: string;
  tenQuaTang: string;
  keHoachBanHang: string;
  tuNGay: string;
  denNgay: string;
  tyLe: string;
  tienMat: string;
  nhanVienTao: string;
  ngayTao: string;
  nhanVienCapNhat: string;
  ngayCapNhat: string;
};

const Promotions: React.FC = () => {
  const [data] = useState<Promotion[]>([
    {
      id: 1,
      duAn: 'Dự án A',
      tenChuongTrinh: 'KM Mùa hè',
      tenQuaTang: 'Voucher 100k',
      keHoachBanHang: 'Bán trực tiếp, online',
      tuNGay: '2025-06-01',
      denNgay: '2025-06-30',
      tyLe: '10%',
      tienMat: '100000',
      nhanVienTao: 'Nguyễn A',
      ngayTao: '2025-05-20',
      nhanVienCapNhat: 'Trần B',
      ngayCapNhat: '2025-05-25',
    },
    {
      id: 2,
      duAn: 'Dự án B',
      tenChuongTrinh: 'KM Khai trương',
      tenQuaTang: 'Phiếu quà 50k',
      keHoachBanHang: 'Event, social',
      tuNGay: '2025-07-01',
      denNgay: '2025-07-15',
      tyLe: '5%',
      tienMat: '50000',
      nhanVienTao: 'Lê C',
      ngayTao: '2025-06-10',
      nhanVienCapNhat: 'Lê C',
      ngayCapNhat: '2025-06-10',
    },
  ]);

  const columns: ProColumns<Promotion>[] = useMemo(
    () => [
      { title: 'ID', dataIndex: 'id', search: false, width: 70, fixed: 'left' },

      {
        title: 'Dự án',
        dataIndex: 'duAn',
        valueType: 'select',
        width: 150,
        valueEnum: {
          'Dự án A': { text: 'Dự án A' },
          'Dự án B': { text: 'Dự án B' },
        },
      },

      { title: 'Tên chương trình', dataIndex: 'tenChuongTrinh', width: 200, ellipsis: true },
      { title: 'Quà tặng', dataIndex: 'tenQuaTang', width: 160, ellipsis: true },
      { title: 'Kế hoạch bán hàng', dataIndex: 'keHoachBanHang', search: false, width: 220, ellipsis: true },

      { title: 'Từ ngày', dataIndex: 'tuNGay', valueType: 'date', search: false, width: 120 },
      { title: 'Đến ngày', dataIndex: 'denNgay', valueType: 'date', search: false, width: 120 },

      { title: 'Tỷ lệ', dataIndex: 'tyLe', search: false, width: 90 },
      { title: 'Tiền mặt', dataIndex: 'tienMat', search: false, width: 110 },

      { title: 'Nhân viên tạo', dataIndex: 'nhanVienTao', width: 160 },
      { title: 'Ngày tạo', dataIndex: 'ngayTao', valueType: 'date', search: false, width: 120 },

      { title: 'Nhân viên cập nhật', dataIndex: 'nhanVienCapNhat', width: 180 },
      { title: 'Ngày cập nhật', dataIndex: 'ngayCapNhat', valueType: 'date', search: false, width: 140 },

      {
        title: 'Hành động',
        valueType: 'option',
        fixed: 'right',
        width: 120,
        render: (_, record) => [
          <a key="view" onClick={() => history.push(`/project/promotions/${record.id}`)}>
            Xem
          </a>,
          <a key="edit" onClick={() => history.push(`/project/promotions/${record.id}/edit`)}>
            Sửa
          </a>,
        ],
      },
    ],
    [],
  );

  return (
    <PageContainer title="Chương trình khuyến mãi">
      <ProTable<Promotion>
        rowKey="id"
        columns={columns}
        dataSource={data}
        search={{ labelWidth: 'auto' }}
        pagination={{ pageSize: 10 }}
        scroll={{ x: 1400 }}
        toolBarRender={() => [
          <Button key="create" type="primary" onClick={() => history.push('/project/promotions/create')}>
            Tạo chương trình
          </Button>,
        ]}
      />
    </PageContainer>
  );
};

export default Promotions;
