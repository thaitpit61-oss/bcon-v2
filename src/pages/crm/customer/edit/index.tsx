import React, { useEffect, useMemo, useState } from 'react';
import { PageContainer, ProCard, ProForm, ProFormSelect, ProFormText } from '@ant-design/pro-components';
import { Button, Spin, message } from 'antd';
import { history, useParams } from 'umi';

type Product = {
  stt: number;
  trangThai: 'Available' | 'Sold' | string;
  maCan: string;
  duAn: string;
  dotBanHang: string;
  loaiSP: string;
  tang: string;
  dienTich: string;
  donGia: string;
  tongGia: string;
  chietKhau: string;
  tongSauCK: string;
};

// Mock data (giống bên detail)
const MOCK_PRODUCTS: Product[] = [
  {
    stt: 1,
    trangThai: 'Available',
    maCan: 'C-001',
    duAn: 'Dự án A',
    dotBanHang: 'Đợt 1',
    loaiSP: 'Căn hộ',
    tang: 'Tầng 5',
    dienTich: '75 m2',
    donGia: '1,200,000',
    tongGia: '90,000,000',
    chietKhau: '5%',
    tongSauCK: '85,500,000',
  },
  {
    stt: 2,
    trangThai: 'Sold',
    maCan: 'C-002',
    duAn: 'Dự án B',
    dotBanHang: 'Đợt 2',
    loaiSP: 'Studio',
    tang: 'Tầng 3',
    dienTich: '40 m2',
    donGia: '900,000',
    tongGia: '36,000,000',
    chietKhau: '0%',
    tongSauCK: '36,000,000',
  },
];

// mock “API”
async function fetchProductByMaCan(maCan: string): Promise<Product | null> {
  await new Promise((r) => setTimeout(r, 200));
  return MOCK_PRODUCTS.find((p) => p.maCan === maCan) ?? null;
}

async function updateProductByMaCan(maCan: string, payload: Partial<Product>) {
  await new Promise((r) => setTimeout(r, 200));
  console.log('Update product', { maCan, payload });
  return true;
}

const ProductEdit: React.FC = () => {
  const params = useParams<{ maCan?: string }>();
  const maCan = useMemo(() => (params.maCan ?? '').trim(), [params.maCan]);

  const [loading, setLoading] = useState(true);
  const [initialValues, setInitialValues] = useState<Product | null>(null);

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      if (!maCan) {
        message.error('Mã căn không hợp lệ');
        history.push('/product/list');
        return;
      }

      setLoading(true);
      try {
        const res = await fetchProductByMaCan(maCan);
        if (cancelled) return;

        if (!res) {
          message.warning('Không tìm thấy sản phẩm');
          history.push('/product/list');
          return;
        }

        setInitialValues(res);
      } catch {
        if (!cancelled) message.error('Lỗi tải dữ liệu sản phẩm');
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    run();
    return () => {
      cancelled = true;
    };
  }, [maCan]);

  const onFinish = async (values: any) => {
    await updateProductByMaCan(maCan, values);
    message.success('Cập nhật sản phẩm thành công (mock)');
    history.push(`/product/${maCan}`);
    return true;
  };

  return (
    <PageContainer
      title="Sửa sản phẩm"
      onBack={() => history.push(`/product/${maCan}`)}
      extra={[
        <Button key="back" onClick={() => history.push(`/product/${maCan}`)}>
          Quay lại chi tiết
        </Button>,
      ]}
    >
      <Spin spinning={loading}>
        {initialValues ? (
          <ProCard>
            <ProForm<Product>
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
                    history.push(`/product/${maCan}`);
                  },
                },
              }}
            >
              {/* Mã căn: thường không cho sửa */}
              <ProFormText
                name="maCan"
                label="Mã căn"
                disabled
                rules={[{ required: true, message: 'Vui lòng nhập mã căn' }]}
              />

              <ProFormText name="stt" label="STT" disabled />

              <ProFormSelect
                name="trangThai"
                label="Trạng thái"
                rules={[{ required: true, message: 'Vui lòng chọn trạng thái' }]}
                valueEnum={{
                  Available: { text: 'Available' },
                  Sold: { text: 'Sold' },
                }}
              />

              <ProFormText name="duAn" label="Dự án" rules={[{ required: true, message: 'Vui lòng nhập dự án' }]} />
              <ProFormText name="dotBanHang" label="Đợt bán hàng" />
              <ProFormText name="loaiSP" label="Loại sản phẩm" />
              <ProFormText name="tang" label="Tầng" />
              <ProFormText name="dienTich" label="Diện tích" placeholder="VD: 75 m2" />

              <ProFormText name="donGia" label="Đơn giá" placeholder="VD: 1,200,000" />
              <ProFormText name="tongGia" label="Tổng giá" placeholder="VD: 90,000,000" />
              <ProFormText name="chietKhau" label="Chiết khấu" placeholder="VD: 5%" />
              <ProFormText name="tongSauCK" label="Tổng sau CK" placeholder="VD: 85,500,000" />
            </ProForm>
          </ProCard>
        ) : null}
      </Spin>
    </PageContainer>
  );
};

export default ProductEdit;
