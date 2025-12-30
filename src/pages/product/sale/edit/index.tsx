import React, { useEffect, useMemo, useState } from 'react';
import {
  PageContainer,
  ProCard,
  ProForm,
  ProFormDatePicker,
  ProFormDigit,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import { Button, Spin, message } from 'antd';
import { history, useParams } from '@umijs/max';
import dayjs from 'dayjs';

type SalePhase = {
  id: string;
  quyetDinh: string;
  duAn: string;
  dot: string;
  ngayBatDau: string;
  ngayKetThuc: string;
  thoiGianGiao: string;
  soNguoi: number;
  dienGia: string;
  donGia: string;
};

// Mock data
const MOCK_SALES: SalePhase[] = [
  {
    id: 'S-001',
    quyetDinh: 'QD-01',
    duAn: 'Dự án A',
    dot: 'Đợt 1',
    ngayBatDau: '2025-06-01',
    ngayKetThuc: '2025-06-30',
    thoiGianGiao: '30 ngày',
    soNguoi: 5,
    dienGia: '1,000,000',
    donGia: '900,000',
  },
  {
    id: 'S-002',
    quyetDinh: 'QD-02',
    duAn: 'Dự án B',
    dot: 'Đợt 2',
    ngayBatDau: '2025-07-01',
    ngayKetThuc: '2025-07-15',
    thoiGianGiao: '15 ngày',
    soNguoi: 3,
    dienGia: '800,000',
    donGia: '750,000',
  },
];

async function fetchSaleById(id: string): Promise<SalePhase | null> {
  await new Promise((r) => setTimeout(r, 200));
  return MOCK_SALES.find((x) => x.id === id) ?? null;
}

async function updateSaleById(id: string, payload: Partial<SalePhase>) {
  await new Promise((r) => setTimeout(r, 200));
  console.log('Update sale', { id, payload });
  return true;
}

const ProductSaleEdit: React.FC = () => {
  const params = useParams<{ id?: string }>();
  const saleId = useMemo(() => (params.id ?? '').trim(), [params.id]);

  const [loading, setLoading] = useState(true);
  const [initialValues, setInitialValues] = useState<any>(null);

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      if (!saleId) {
        message.error('ID không hợp lệ');
        history.push('/product/sale');
        return;
      }

      setLoading(true);
      try {
        const res = await fetchSaleById(saleId);
        if (cancelled) return;

        if (!res) {
          message.warning('Không tìm thấy đợt mở bán');
          history.push('/product/sale');
          return;
        }

        setInitialValues({
          ...res,
          ngayBatDau: res.ngayBatDau ? dayjs(res.ngayBatDau) : undefined,
          ngayKetThuc: res.ngayKetThuc ? dayjs(res.ngayKetThuc) : undefined,
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
  }, [saleId]);

  const onFinish = async (values: any) => {
    const payload: Partial<SalePhase> = {
      ...values,
      ngayBatDau: values.ngayBatDau ? values.ngayBatDau.format('YYYY-MM-DD') : '',
      ngayKetThuc: values.ngayKetThuc ? values.ngayKetThuc.format('YYYY-MM-DD') : '',
    };

    await updateSaleById(saleId, payload);
    message.success('Cập nhật thành công (mock)');
    history.push(`/product/sale/${saleId}`);
    return true;
  };

  return (
    <PageContainer
      title="Sửa đợt mở bán"
      onBack={() => history.push(`/product/sale/${saleId}`)}
      extra={[
        <Button key="detail" onClick={() => history.push(`/product/sale/${saleId}`)}>
          Quay lại chi tiết
        </Button>,
      ]}
    >
      <Spin spinning={loading}>
        {initialValues && (
          <ProCard>
            <ProForm
              layout="vertical"
              grid
              colProps={{ span: 12 }}
              initialValues={initialValues}
              onFinish={onFinish}
              submitter={{
                searchConfig: { submitText: 'Cập nhật', resetText: 'Huỷ' },
                resetButtonProps: {
                  onClick: (e) => {
                    e.preventDefault();
                    history.push(`/product/sale/${saleId}`);
                  },
                },
              }}
            >
              <ProFormText name="id" label="ID" disabled />
              <ProFormText name="quyetDinh" label="Quyết định" rules={[{ required: true }]} />
              <ProFormSelect
                name="duAn"
                label="Dự án"
                rules={[{ required: true }]}
                valueEnum={{
                  'Dự án A': { text: 'Dự án A' },
                  'Dự án B': { text: 'Dự án B' },
                }}
              />
              <ProFormText name="dot" label="Đợt" rules={[{ required: true }]} />

              <ProFormDatePicker name="ngayBatDau" label="Ngày bắt đầu" fieldProps={{ format: 'YYYY-MM-DD' }} />
              <ProFormDatePicker name="ngayKetThuc" label="Ngày kết thúc" fieldProps={{ format: 'YYYY-MM-DD' }} />

              <ProFormText name="thoiGianGiao" label="Thời gian giao" placeholder="VD: 30 ngày" />

              <ProFormDigit
                name="soNguoi"
                label="Số người"
                min={0}
                fieldProps={{ precision: 0 }}
              />

              <ProFormText name="dienGia" label="Diện giá" placeholder="VD: 1,000,000" />
              <ProFormText name="donGia" label="Đơn giá" placeholder="VD: 900,000" />
            </ProForm>
          </ProCard>
        )}
      </Spin>
    </PageContainer>
  );
};

export default ProductSaleEdit;
