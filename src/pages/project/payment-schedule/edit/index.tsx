import React, { useEffect, useMemo, useState } from 'react';
import { PageContainer, ProCard, ProForm, ProFormSelect, ProFormSwitch, ProFormText } from '@ant-design/pro-components';
import { history, useParams } from '@umijs/max';
import { Spin, message } from 'antd';

const MOCK = [
  { id: 1, dot: 'Đợt 1', truongHop: 'Thanh toán theo tiến độ', khoangCach: '30 ngày', macDinh: true },
];

async function fetchById(id: number) {
  await new Promise((r) => setTimeout(r, 200));
  return MOCK.find((x) => x.id === id);
}

const PaymentScheduleEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const scheduleId = useMemo(() => Number(id), [id]);

  const [loading, setLoading] = useState(true);
  const [initialValues, setInitialValues] = useState<any>();

  useEffect(() => {
    fetchById(scheduleId).then((res) => {
      if (!res) {
        message.error('Không tìm thấy');
        history.push('/project/payment-schedule');
      } else {
        setInitialValues(res);
      }
      setLoading(false);
    });
  }, [scheduleId]);

  const onFinish = async (values: any) => {
    console.log('Update', scheduleId, values);
    message.success('Cập nhật thành công');
    history.push(`/project/payment-schedule/${scheduleId}`);
    return true;
  };

  return (
    <PageContainer title="Sửa lịch thanh toán" onBack={() => history.push(`/project/payment-schedule/${scheduleId}`)}>
      <Spin spinning={loading}>
        {initialValues && (
          <ProCard>
            <ProForm
              layout="vertical"
              grid
              colProps={{ span: 12 }}
              initialValues={initialValues}
              onFinish={onFinish}
              submitter={{ searchConfig: { submitText: 'Cập nhật', resetText: 'Huỷ' } }}
            >
              <ProFormSelect name="dot" label="Đợt" rules={[{ required: true }]} options={[{ label: 'Đợt 1', value: 'Đợt 1' }]} />
              <ProFormText name="truongHop" label="Trường hợp" rules={[{ required: true }]} colProps={{ span: 24 }} />
              <ProFormText name="khoangCach" label="Khoảng cách" />
              <ProFormSwitch name="macDinh" label="Mặc định" />
            </ProForm>
          </ProCard>
        )}
      </Spin>
    </PageContainer>
  );
};

export default PaymentScheduleEdit;
