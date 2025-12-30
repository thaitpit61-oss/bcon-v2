import React, { useEffect, useMemo, useState } from 'react';
import { PageContainer, ProCard, ProDescriptions } from '@ant-design/pro-components';
import { Button, Spin, Tag, message } from 'antd';
import { history, useParams } from '@umijs/max';

type PaymentScheduleItem = {
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

const MOCK: PaymentScheduleItem[] = [
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
];

async function fetchById(id: number) {
  await new Promise((r) => setTimeout(r, 200));
  return MOCK.find((x) => x.id === id) ?? null;
}

const PaymentScheduleDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const scheduleId = useMemo(() => Number(id), [id]);

  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState<PaymentScheduleItem | null>(null);

  useEffect(() => {
    fetchById(scheduleId).then((res) => {
      if (!res) {
        message.error('Không tìm thấy');
        history.push('/project/payment-schedule');
      } else {
        setItem(res);
      }
      setLoading(false);
    });
  }, [scheduleId]);

  return (
    <PageContainer
      title="Chi tiết lịch thanh toán"
      onBack={() => history.push('/project/payment-schedule')}
      extra={[
        <Button key="edit" type="primary" onClick={() => history.push(`/project/payment-schedule/${scheduleId}/edit`)}>
          Sửa
        </Button>,
      ]}
    >
      <Spin spinning={loading}>
        {item && (
          <ProCard>
            <ProDescriptions column={2} dataSource={item} columns={[
              { title: 'Đợt', dataIndex: 'dot' },
              { title: 'Trường hợp', dataIndex: 'truongHop' },
              { title: 'Khoảng cách', dataIndex: 'khoangCach' },
              {
                title: 'Mặc định',
                dataIndex: 'macDinh',
                render: (_, r) => <Tag color={r.macDinh ? 'green' : 'default'}>{r.macDinh ? 'Yes' : 'No'}</Tag>,
              },
              { title: 'Nhân viên tạo', dataIndex: 'nvTao' },
              { title: 'Ngày tạo', dataIndex: 'ngayTao' },
              { title: 'Nhân viên cập nhật', dataIndex: 'nvCapNhat' },
              { title: 'Ngày cập nhật', dataIndex: 'ngayCapNhat' },
            ]} />
          </ProCard>
        )}
      </Spin>
    </PageContainer>
  );
};

export default PaymentScheduleDetail;
