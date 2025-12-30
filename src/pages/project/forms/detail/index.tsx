import React, { useEffect, useMemo, useState } from 'react';
import { PageContainer, ProCard, ProDescriptions } from '@ant-design/pro-components';
import { Button, Spin, Tag, message } from 'antd';
import { history, useParams } from '@umijs/max';

type ProjectForm = {
  id: number;
  tenBieuMau: string;
  loaiBieuMau: string;
  duAn: string;
  dienGiai: string;
  khoa: boolean;
  nvTao: string;
  ngayTao: string;
  nvCapNhat: string;
  ngayCapNhat: string;
};

// mock giống list của bạn
const MOCK_FORMS: ProjectForm[] = [
  {
    id: 1,
    tenBieuMau: 'Phiếu khảo sát',
    loaiBieuMau: 'Khảo sát khách hàng',
    duAn: 'Dự án A',
    dienGiai: 'Phiếu khảo sát chất lượng',
    khoa: false,
    nvTao: 'Nguyễn A',
    ngayTao: '2025-05-10',
    nvCapNhat: 'Trần B',
    ngayCapNhat: '2025-06-01',
  },
  {
    id: 2,
    tenBieuMau: 'Phiếu đăng ký',
    loaiBieuMau: 'Đăng ký tham gia',
    duAn: 'Dự án B',
    dienGiai: 'Phiếu đăng ký sự kiện',
    khoa: true,
    nvTao: 'Lê C',
    ngayTao: '2025-06-01',
    nvCapNhat: 'Lê C',
    ngayCapNhat: '2025-06-02',
  },
];

async function fetchFormById(id: number): Promise<ProjectForm | null> {
  await new Promise((r) => setTimeout(r, 200));
  return MOCK_FORMS.find((x) => x.id === id) ?? null;
}

const ProjectFormDetail: React.FC = () => {
  const params = useParams<{ id: string }>();
  const formId = useMemo(() => Number(params.id), [params.id]);

  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<ProjectForm | null>(null);

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      if (!Number.isFinite(formId) || formId <= 0) {
        message.error('ID biểu mẫu không hợp lệ');
        history.push('/project/forms');
        return;
      }

      setLoading(true);
      try {
        const res = await fetchFormById(formId);
        if (cancelled) return;

        if (!res) {
          message.warning('Không tìm thấy biểu mẫu');
          history.push('/project/forms');
          return;
        }

        setForm(res);
      } catch {
        if (!cancelled) message.error('Lỗi tải dữ liệu biểu mẫu');
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    run();
    return () => {
      cancelled = true;
    };
  }, [formId]);

  return (
    <PageContainer
      title="Chi tiết biểu mẫu"
      onBack={() => history.push('/project/forms')}
      extra={[
        <Button key="back" onClick={() => history.push('/project/forms')}>
          Quay lại danh sách
        </Button>,
        <Button
          key="edit"
          type="primary"
          disabled={!form}
          onClick={() => history.push(`/project/forms/${formId}/edit`)}
        >
          Sửa
        </Button>,
      ]}
    >
      <Spin spinning={loading}>
        {form && (
          <ProCard>
            <ProDescriptions<ProjectForm>
              column={2}
              dataSource={form}
              columns={[
                { title: 'ID', dataIndex: 'id' },
                { title: 'Tên biểu mẫu', dataIndex: 'tenBieuMau' },
                { title: 'Loại biểu mẫu', dataIndex: 'loaiBieuMau' },
                { title: 'Dự án', dataIndex: 'duAn' },
                {
                  title: 'Trạng thái',
                  dataIndex: 'khoa',
                  render: (_, r) => (
                    <Tag color={r.khoa ? 'red' : 'green'}>{r.khoa ? 'Khóa' : 'Hoạt động'}</Tag>
                  ),
                },
                { title: 'Diễn giải', dataIndex: 'dienGiai', span: 2 },
                { title: 'Nhân viên tạo', dataIndex: 'nvTao' },
                { title: 'Ngày tạo', dataIndex: 'ngayTao' },
                { title: 'Nhân viên cập nhật', dataIndex: 'nvCapNhat' },
                { title: 'Ngày cập nhật', dataIndex: 'ngayCapNhat' },
              ]}
            />
          </ProCard>
        )}
      </Spin>
    </PageContainer>
  );
};

export default ProjectFormDetail;
