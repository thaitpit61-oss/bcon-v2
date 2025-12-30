import React from 'react';
import {
  PageContainer,
  ProCard,
  ProForm,
  ProFormDatePicker,
  ProFormDigit,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { history } from '@umijs/max';
import { message } from 'antd';
import dayjs from 'dayjs';

type PromotionCreateForm = {
  duAn?: string;
  tenChuongTrinh?: string;
  tenQuaTang?: string;
  keHoachBanHang?: string;
  tuNGay?: any; // dayjs
  denNgay?: any; // dayjs
  tyLe?: number; // %
  tienMat?: number; // tiền mặt
  nhanVienTao?: string;
  ngayTao?: any; // dayjs
};

async function createPromotion(payload: any) {
  await new Promise((r) => setTimeout(r, 200));
  console.log('Create promotion', payload);
  return true;
}

const PromotionCreate: React.FC = () => {
  const onFinish = async (values: any) => {
    // Convert dayjs -> string để đồng bộ backend/mock
    const payload = {
      ...values,
      tuNGay: values.tuNGay ? values.tuNGay.format('YYYY-MM-DD') : undefined,
      denNgay: values.denNgay ? values.denNgay.format('YYYY-MM-DD') : undefined,
      ngayTao: values.ngayTao ? values.ngayTao.format('YYYY-MM-DD') : undefined,
    };

    await createPromotion(payload);
    message.success('Tạo chương trình thành công (mock)');
    history.push('/project/promotions');
    return true;
  };

  return (
    <PageContainer title="Tạo chương trình khuyến mãi" onBack={() => history.push('/project/promotions')}>
      <ProCard>
        <ProForm<PromotionCreateForm>
          layout="vertical"
          grid
          colProps={{ span: 12 }}
          initialValues={{
            duAn: 'Dự án A',
            ngayTao: dayjs(),
          }}
          onFinish={onFinish}
          submitter={{
            searchConfig: { submitText: 'Tạo', resetText: 'Huỷ' },
            resetButtonProps: {
              onClick: (e) => {
                e.preventDefault();
                history.push('/project/promotions');
              },
            },
          }}
        >
          <ProFormSelect
            name="duAn"
            label="Dự án"
            rules={[{ required: true, message: 'Vui lòng chọn dự án' }]}
            valueEnum={{
              'Dự án A': { text: 'Dự án A' },
              'Dự án B': { text: 'Dự án B' },
            }}
          />

          <ProFormText
            name="tenChuongTrinh"
            label="Tên chương trình"
            rules={[{ required: true, message: 'Vui lòng nhập tên chương trình' }]}
            colProps={{ span: 24 }}
          />

          <ProFormText name="tenQuaTang" label="Quà tặng" colProps={{ span: 24 }} />

          <ProFormTextArea
            name="keHoachBanHang"
            label="Kế hoạch bán hàng"
            colProps={{ span: 24 }}
            fieldProps={{ rows: 4 }}
          />

          <ProFormDatePicker
            name="tuNGay"
            label="Từ ngày"
            rules={[{ required: true, message: 'Vui lòng chọn từ ngày' }]}
            fieldProps={{ format: 'YYYY-MM-DD' }}
          />

          <ProFormDatePicker
            name="denNgay"
            label="Đến ngày"
            rules={[{ required: true, message: 'Vui lòng chọn đến ngày' }]}
            fieldProps={{ format: 'YYYY-MM-DD' }}
          />

          <ProFormDigit
            name="tyLe"
            label="Tỷ lệ (%)"
            min={0}
            max={100}
            fieldProps={{ precision: 0, addonAfter: '%' }}
          />

          <ProFormDigit
            name="tienMat"
            label="Tiền mặt"
            min={0}
            fieldProps={{
              precision: 0,
              formatter: (v) => (v ? `${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : ''),
              parser: (v) => Number((v || '').replace(/,/g, '')),
            }}
          />

          <ProFormText name="nhanVienTao" label="Nhân viên tạo" />

          <ProFormDatePicker
            name="ngayTao"
            label="Ngày tạo"
            fieldProps={{ format: 'YYYY-MM-DD' }}
          />
        </ProForm>
      </ProCard>
    </PageContainer>
  );
};

export default PromotionCreate;
