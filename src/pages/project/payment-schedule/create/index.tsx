import React from 'react';
import { PageContainer, ProCard, ProForm, ProFormSelect, ProFormSwitch, ProFormText } from '@ant-design/pro-components';
import { history } from '@umijs/max';
import { message } from 'antd';

const PaymentScheduleCreate: React.FC = () => {
  const onFinish = async (values: any) => {
    console.log('Create', values);
    message.success('Tạo lịch thành công');
    history.push('/project/payment-schedule');
    return true;
  };

  return (
    <PageContainer title="Tạo lịch thanh toán" onBack={() => history.push('/project/payment-schedule')}>
      <ProCard>
        <ProForm
          layout="vertical"
          grid
          colProps={{ span: 12 }}
          onFinish={onFinish}
          submitter={{ searchConfig: { submitText: 'Tạo', resetText: 'Huỷ' } }}
        >
          <ProFormSelect name="dot" label="Đợt" rules={[{ required: true }]} options={[{ label: 'Đợt 1', value: 'Đợt 1' }]} />
          <ProFormText name="truongHop" label="Trường hợp" rules={[{ required: true }]} colProps={{ span: 24 }} />
          <ProFormText name="khoangCach" label="Khoảng cách" />
          <ProFormSwitch name="macDinh" label="Mặc định" />
        </ProForm>
      </ProCard>
    </PageContainer>
  );
};

export default PaymentScheduleCreate;
