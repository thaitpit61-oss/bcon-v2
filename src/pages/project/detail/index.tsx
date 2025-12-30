import React, { useEffect, useMemo, useState } from 'react';
import { PageContainer, ProDescriptions, ProCard } from '@ant-design/pro-components';
import { Button, Tag, Spin, message } from 'antd';
import { history, useParams } from '@umijs/max';

type Project = {
  id: number;
  ngay: string;
  code: string;
  maFast: string;
  tenDuAn: string;
  loaiDuAn: string;
  nhanVien: string;
  dienTich: string;
  soGiayPhep: string;
  ngayCap: string;
  donGia: string;
  soLuong: number;
  diaChi: string;
  ngayDuyet: string;
  nguoiDuyet: string;
  daDuyet: boolean;
};

// Mock data (giống bên list)
const MOCK_PROJECTS: Project[] = [
  {
    id: 1,
    ngay: '2025-01-01',
    code: 'DA-001',
    maFast: 'MF001',
    tenDuAn: 'Dự án A',
    loaiDuAn: 'Loại 1',
    nhanVien: 'Nguyễn A',
    dienTich: '120 m2',
    soGiayPhep: 'GP-123',
    ngayCap: '2024-12-01',
    donGia: '1,000,000',
    soLuong: 10,
    diaChi: 'Hà Nội',
    ngayDuyet: '2024-12-15',
    nguoiDuyet: 'Ban QL',
    daDuyet: true,
  },
  {
    id: 2,
    ngay: '2025-02-02',
    code: 'DA-002',
    maFast: 'MF002',
    tenDuAn: 'Dự án B',
    loaiDuAn: 'Loại 2',
    nhanVien: 'Trần B',
    dienTich: '80 m2',
    soGiayPhep: 'GP-456',
    ngayCap: '2024-11-20',
    donGia: '800,000',
    soLuong: 5,
    diaChi: 'Hồ Chí Minh',
    ngayDuyet: '2024-11-30',
    nguoiDuyet: 'BGĐ',
    daDuyet: false,
  },
];

// Tạm thời mock “API”
async function fetchProjectById(id: number): Promise<Project | null> {
  // giả lập delay
  await new Promise((r) => setTimeout(r, 200));
  return MOCK_PROJECTS.find((p) => p.id === id) ?? null;
}

const ProjectDetail: React.FC = () => {
  const params = useParams<{ id: string }>();
  const projectId = useMemo(() => Number(params.id), [params.id]);

  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      if (!Number.isFinite(projectId) || projectId <= 0) {
        message.error('ID dự án không hợp lệ');
        history.push('/project/list');
        return;
      }

      setLoading(true);
      try {
        const res = await fetchProjectById(projectId);
        if (cancelled) return;

        if (!res) {
          message.warning('Không tìm thấy dự án');
          history.push('/project/list');
          return;
        }

        setProject(res);
      } catch (e) {
        if (!cancelled) message.error('Lỗi tải dữ liệu dự án');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [projectId]);

  return (
    <PageContainer
      title="Chi tiết dự án"
      onBack={() => history.push('/project/list')}
      extra={[
        <Button key="back" onClick={() => history.push('/project/list')}>
          Quay lại danh sách
        </Button>,
        <Button
          key="edit"
          type="primary"
          disabled={!project}
          onClick={() => history.push(`/project/edit/${projectId}`)}
        >
          Sửa
        </Button>,
      ]}
    >
      <Spin spinning={loading}>
        {project ? (
          <ProCard gutter={16} direction="column">
            <ProCard title="Thông tin chung" bordered>
              <ProDescriptions<Project>
                column={2}
                dataSource={project}
                columns={[
                  { title: 'ID', dataIndex: 'id' },
                  { title: 'Mã', dataIndex: 'code' },
                  { title: 'Mã Fast', dataIndex: 'maFast' },
                  { title: 'Tên dự án', dataIndex: 'tenDuAn' },
                  { title: 'Loại dự án', dataIndex: 'loaiDuAn' },
                  { title: 'Nhân viên', dataIndex: 'nhanVien' },
                  { title: 'Địa chỉ', dataIndex: 'diaChi' },
                  { title: 'Ngày', dataIndex: 'ngay' },
                ]}
              />
            </ProCard>

            <ProCard title="Thông tin pháp lý / chi phí" bordered>
              <ProDescriptions<Project>
                column={2}
                dataSource={project}
                columns={[
                  { title: 'Diện tích', dataIndex: 'dienTich' },
                  { title: 'Số giấy phép', dataIndex: 'soGiayPhep' },
                  { title: 'Ngày cấp', dataIndex: 'ngayCap' },
                  { title: 'Đơn giá', dataIndex: 'donGia' },
                  { title: 'Số lượng', dataIndex: 'soLuong' },
                  {
                    title: 'Đã duyệt',
                    dataIndex: 'daDuyet',
                    render: (_, record) => (
                      <Tag color={record.daDuyet ? 'green' : 'default'}>
                        {record.daDuyet ? 'Yes' : 'No'}
                      </Tag>
                    ),
                  },
                  { title: 'Ngày duyệt', dataIndex: 'ngayDuyet' },
                  { title: 'Người duyệt', dataIndex: 'nguoiDuyet' },
                ]}
              />
            </ProCard>
          </ProCard>
        ) : null}
      </Spin>
    </PageContainer>
  );
};

export default ProjectDetail;
