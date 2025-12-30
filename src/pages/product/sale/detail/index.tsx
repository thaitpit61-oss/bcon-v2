import React, { useEffect, useMemo, useState } from 'react';
import { PageContainer, ProCard, ProDescriptions } from '@ant-design/pro-components';
import { Button, Spin, message } from 'antd';
import { history, useParams } from '@umijs/max';

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

// Mock data (giống list)
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

const ProductSaleDetail: React.FC = () => {
  const params = useParams<{ id?: string }>();
  const saleId = useMemo(() => (params.id ?? '').trim(), [params.id]);

  const [loading, setLoading] = useState(true);
  const [sale, setSale] = useState<SalePhase | null>(null);

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

        setSale(res);
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

  return (
    <PageContainer
      title="Chi tiết đợt mở bán"
      onBack={() => history.push('/product/sale')}
      extra={[
        <Button key="back" onClick={() => history.push('/product/sale')}>
          Quay lại danh sách
        </Button>,
        <Button
          key="edit"
          type="primary"
          disabled={!sale}
          onClick={() => history.push(`/product/sale/${saleId}/edit`)}
        >
          Sửa
        </Button>,
      ]}
    >
      <Spin spinning={loading}>
        {sale && (
          <ProCard gutter={16} direction="column">
            <ProCard title="Thông tin đợt mở bán" bordered>
              <ProDescriptions<SalePhase>
                column={2}
                dataSource={sale}
                columns={[
                  { title: 'ID', dataIndex: 'id' },
                  { title: 'Quyết định', dataIndex: 'quyetDinh' },
                  { title: 'Dự án', dataIndex: 'duAn' },
                  { title: 'Đợt', dataIndex: 'dot' },
                  { title: 'Ngày bắt đầu', dataIndex: 'ngayBatDau' },
                  { title: 'Ngày kết thúc', dataIndex: 'ngayKetThuc' },
                  { title: 'Thời gian giao', dataIndex: 'thoiGianGiao' },
                  { title: 'Số người', dataIndex: 'soNguoi' },
                ]}
              />
            </ProCard>

            <ProCard title="Giá" bordered>
              <ProDescriptions<SalePhase>
                column={2}
                dataSource={sale}
                columns={[
                  { title: 'Diện giá', dataIndex: 'dienGia' },
                  { title: 'Đơn giá', dataIndex: 'donGia' },
                ]}
              />
            </ProCard>
          </ProCard>
        )}
      </Spin>
    </PageContainer>
  );
};

export default ProductSaleDetail;
