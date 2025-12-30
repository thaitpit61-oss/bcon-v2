import React, { useEffect, useMemo, useState } from 'react';
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
import { Spin, message } from 'antd';
import { history, useParams } from '@umijs/max';
import dayjs from 'dayjs';

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

const MOCK_PROMOTIONS: Promotion[] = [
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
];

async function fetchPromotionById(id: number): Promise<Promotion | null> {
  await new Promise((r) => setTimeout(r, 200));
  return MOCK_PROMOTIONS.find((p) => p.id === id) ?? null;
}

async function updatePromotion(id: number, payload: Partial<Promotion>) {
  await new Promise((r) => setTimeout(r, 200));
  console.log('Update promotion', { id, payload });
  return true;
}

const PromotionEdit: React.FC = () => {
  const params = useParams<{ id: string }>();
  const promotionId = useMemo(() => Number(params.id), [params.id]);

  const [loading, setLoading] = useState(true);
  const [initialValues, setInitialValues] = useState<any>(null);

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      if (!Number.isFinite(promotionId)) {
        message.error('ID không hợp lệ');
        history.push('/project/promotions');
        return;
      }

      setLoading(true);
      try {
        const res = await fetchPromotionById(promotionId);
        if (cancelled) return;

        if (!res) {
          message.warning('Không tìm thấy chương trình');
          history.push('/project/promotions');
          return;
        }

        setInitialValues({
          ...res,
          tuNGay: dayjs(res.tuNGay),
          denNgay: dayjs(res.denNgay),
        });
      } catch {
        if (!cancelled) message.error('Lỗi tải dữ liệu');
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    run();
    return () => {
      cancelled = true;
    };
  }, [promotionId]);

  const onFinish = async (values: any) => {
    const payload = {
      ...values,
      tuNGay: values.tuNGay.format('YYYY-MM-DD'),
      denNgay: values.denNgay.format('YYYY-MM-DD'),
    };

    await updatePromotion(promotionId, payload);
    message.success('Cập nhật thành công');
    history.push(`/project/promotions/${promotionId}`);
    return true;
  };

  return (
    <PageContainer title="Sửa chương trình" onBack={() => history.push(`/project/promotions/${promotionId}`)}>
      <Spin spinning={loading}>
        {initialValues && (
          <ProCard>
            <ProForm
              layout="vertical"
              grid
              colProps={{ span: 12 }}
              initialValues={initialValues}
              onFinish={onFinish}
            >
              <ProFormSelect
                name="duAn"
                label="Dự án"
                valueEnum={{ 'Dự án A': { text: 'Dự án A' }, 'Dự án B': { text: 'Dự án B' } }}
              />
              <ProFormText name="tenChuongTrinh" label="Tên chương trình" rules={[{ required: true }]} />
              <ProFormText name="tenQuaTang" label="Quà tặng" />
              <ProFormTextArea name="keHoachBanHang" label="Kế hoạch bán hàng" colProps={{ span: 24 }} />
              <ProFormDatePicker name="tuNGay" label="Từ ngày" />
              <ProFormDatePicker name="denNgay" label="Đến ngày" />
              <ProFormText name="tyLe" label="Tỷ lệ" />
              <ProFormText name="tienMat" label="Tiền mặt" />
            </ProForm>
          </ProCard>
        )}
      </Spin>
    </PageContainer>
  );
};

export default PromotionEdit;
