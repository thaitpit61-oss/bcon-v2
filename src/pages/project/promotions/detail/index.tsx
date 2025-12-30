import React, { useEffect, useMemo, useState } from 'react';
import { PageContainer, ProDescriptions, ProCard } from '@ant-design/pro-components';
import { Button, Spin, message } from 'antd';
import { history, useParams } from '@umijs/max';

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

const PromotionDetail: React.FC = () => {
  const params = useParams<{ id: string }>();
  const promotionId = useMemo(() => Number(params.id), [params.id]);

  const [loading, setLoading] = useState(true);
  const [promotion, setPromotion] = useState<Promotion | null>(null);

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

        setPromotion(res);
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

  return (
    <PageContainer
      title="Chi tiết khuyến mãi"
      onBack={() => history.push('/project/promotions')}
      extra={[
        <Button key="edit" type="primary" onClick={() => history.push(`/project/promotions/${promotionId}/edit`)}>
          Sửa
        </Button>,
      ]}
    >
      <Spin spinning={loading}>
        {promotion && (
          <ProCard>
            <ProDescriptions<Promotion>
              column={2}
              dataSource={promotion}
              columns={[
                { title: 'Dự án', dataIndex: 'duAn' },
                { title: 'Tên chương trình', dataIndex: 'tenChuongTrinh' },
                { title: 'Quà tặng', dataIndex: 'tenQuaTang' },
                { title: 'Kế hoạch bán hàng', dataIndex: 'keHoachBanHang' },
                { title: 'Từ ngày', dataIndex: 'tuNGay' },
                { title: 'Đến ngày', dataIndex: 'denNgay' },
                { title: 'Tỷ lệ', dataIndex: 'tyLe' },
                { title: 'Tiền mặt', dataIndex: 'tienMat' },
                { title: 'Nhân viên tạo', dataIndex: 'nhanVienTao' },
                { title: 'Ngày tạo', dataIndex: 'ngayTao' },
                { title: 'Nhân viên cập nhật', dataIndex: 'nhanVienCapNhat' },
                { title: 'Ngày cập nhật', dataIndex: 'ngayCapNhat' },
              ]}
            />
          </ProCard>
        )}
      </Spin>
    </PageContainer>
  );
};

export default PromotionDetail;
