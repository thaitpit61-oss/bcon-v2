import React, { useEffect, useMemo, useState } from 'react';
import {
  PageContainer,
  ProCard,
  ProForm,
  ProFormDatePicker,
  ProFormDigit,
  ProFormSelect,
  ProFormSwitch,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { Button, Spin, message } from 'antd';
import { history, useParams } from '@umijs/max';
import dayjs from 'dayjs';

type Project = {
  id: number;
  ngay: string;
  code: string;
  maFast: string;
  tenDuAn: string;
  loaiDuAn: string;
  nhanVien: string;
  dienTich: string; // bạn đang dùng "120 m2" => giữ string
  soGiayPhep: string;
  ngayCap: string;
  donGia: string; // "1,000,000" => giữ string
  soLuong: number;
  diaChi: string;
  ngayDuyet: string;
  nguoiDuyet: string;
  daDuyet: boolean;
};

// Mock data
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

async function fetchProjectById(id: number): Promise<Project | null> {
  await new Promise((r) => setTimeout(r, 200));
  return MOCK_PROJECTS.find((p) => p.id === id) ?? null;
}

// mock update
async function updateProjectById(id: number, payload: Partial<Project>) {
  await new Promise((r) => setTimeout(r, 200));
  console.log('Update project', { id, payload });
  return true;
}

const ProjectEdit: React.FC = () => {
  const params = useParams<{ id: string }>();
  const projectId = useMemo(() => Number(params.id), [params.id]);

  const [loading, setLoading] = useState(true);
  const [initialValues, setInitialValues] = useState<any>(null);

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
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

        // ProFormDatePicker cần dayjs object
        setInitialValues({
          ...res,
          ngay: res.ngay ? dayjs(res.ngay) : undefined,
          ngayCap: res.ngayCap ? dayjs(res.ngayCap) : undefined,
          ngayDuyet: res.ngayDuyet ? dayjs(res.ngayDuyet) : undefined,
        });
      } catch (e) {
        if (!cancelled) message.error('Lỗi tải dữ liệu dự án');
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    run();
    return () => {
      cancelled = true;
    };
  }, [projectId]);

  const onFinish = async (values: any) => {
    // Convert dayjs -> string YYYY-MM-DD (đồng bộ mock data của bạn)
    const payload: Partial<Project> = {
      ...values,
      ngay: values.ngay ? values.ngay.format('YYYY-MM-DD') : '',
      ngayCap: values.ngayCap ? values.ngayCap.format('YYYY-MM-DD') : '',
      ngayDuyet: values.ngayDuyet ? values.ngayDuyet.format('YYYY-MM-DD') : '',
    };

    await updateProjectById(projectId, payload);
    message.success('Cập nhật dự án thành công (mock)');

    // tuỳ bạn: về detail hoặc list
    history.push(`/project/${projectId}`);
    return true;
  };

  return (
    <PageContainer
      title="Sửa dự án"
      onBack={() => history.push(`/project/${projectId}`)}
      extra={[
        <Button key="back" onClick={() => history.push(`/project/${projectId}`)}>
          Quay lại chi tiết
        </Button>,
      ]}
    >
      <Spin spinning={loading}>
        {initialValues ? (
          <ProCard>
            <ProForm
              layout="vertical"
              grid
              colProps={{ span: 12 }}
              initialValues={initialValues}
              onFinish={onFinish}
              submitter={{
                searchConfig: { submitText: 'Cập nhật', resetText: 'Hủy' },
                resetButtonProps: {
                  onClick: (e) => {
                    e.preventDefault();
                    history.push(`/project/${projectId}`);
                  },
                },
              }}
            >
              <ProFormText name="code" label="Mã" rules={[{ required: true, message: 'Vui lòng nhập mã' }]} />
              <ProFormText name="maFast" label="Mã Fast" />

              <ProFormText
                name="tenDuAn"
                label="Tên dự án"
                colProps={{ span: 24 }}
                rules={[{ required: true, message: 'Vui lòng nhập tên dự án' }]}
              />

              <ProFormSelect
                name="loaiDuAn"
                label="Loại dự án"
                valueEnum={{
                  'Loại 1': { text: 'Loại 1' },
                  'Loại 2': { text: 'Loại 2' },
                }}
              />

              <ProFormText name="nhanVien" label="Nhân viên" />

              <ProFormTextArea
                name="diaChi"
                label="Địa chỉ"
                colProps={{ span: 24 }}
                fieldProps={{ rows: 2 }}
              />

              <ProFormDatePicker name="ngay" label="Ngày" fieldProps={{ format: 'YYYY-MM-DD' }} />

              <ProFormText name="dienTich" label="Diện tích" placeholder="VD: 120 m2" />
              <ProFormText name="soGiayPhep" label="Số giấy phép" />

              <ProFormDatePicker name="ngayCap" label="Ngày cấp" fieldProps={{ format: 'YYYY-MM-DD' }} />

              <ProFormText name="donGia" label="Đơn giá" placeholder="VD: 1,000,000" />
              <ProFormDigit name="soLuong" label="Số lượng" min={0} fieldProps={{ precision: 0 }} />

              <ProFormSwitch
                name="daDuyet"
                label="Đã duyệt"
                fieldProps={{ checkedChildren: 'Đã duyệt', unCheckedChildren: 'Chưa duyệt' }}
              />

              <ProFormDatePicker
                name="ngayDuyet"
                label="Ngày duyệt"
                fieldProps={{ format: 'YYYY-MM-DD' }}
              />

              <ProFormText name="nguoiDuyet" label="Người duyệt" />
            </ProForm>
          </ProCard>
        ) : null}
      </Spin>
    </PageContainer>
  );
};

export default ProjectEdit;
