import React, { useEffect, useMemo, useState } from 'react';
import {
  PageContainer,
  ProCard,
  ProForm,
  ProFormDatePicker,
  ProFormSelect,
  ProFormSwitch,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { Spin, message } from 'antd';
import { history, useParams } from '@umijs/max';
import dayjs from 'dayjs';

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

async function updateForm(id: number, payload: Partial<ProjectForm>) {
  await new Promise((r) => setTimeout(r, 200));
  console.log('Update form', { id, payload });
  return true;
}

const ProjectFormEdit: React.FC = () => {
  const params = useParams<{ id: string }>();
  const formId = useMemo(() => Number(params.id), [params.id]);

  const [loading, setLoading] = useState(true);
  const [initialValues, setInitialValues] = useState<any>(null);

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

        setInitialValues({
          ...res,
          ngayTao: res.ngayTao ? dayjs(res.ngayTao) : undefined,
          ngayCapNhat: res.ngayCapNhat ? dayjs(res.ngayCapNhat) : undefined,
        });
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

  const onFinish = async (values: any) => {
    const payload: Partial<ProjectForm> = {
      ...values,
      ngayTao: values.ngayTao ? values.ngayTao.format('YYYY-MM-DD') : '',
      ngayCapNhat: values.ngayCapNhat ? values.ngayCapNhat.format('YYYY-MM-DD') : '',
    };

    await updateForm(formId, payload);
    message.success('Cập nhật biểu mẫu thành công (mock)');
    history.push(`/project/forms/${formId}`);
    return true;
  };

  return (
    <PageContainer title="Sửa biểu mẫu" onBack={() => history.push(`/project/forms/${formId}`)}>
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
                    history.push(`/project/forms/${formId}`);
                  },
                },
              }}
            >
              <ProFormText
                name="tenBieuMau"
                label="Tên biểu mẫu"
                rules={[{ required: true, message: 'Vui lòng nhập tên biểu mẫu' }]}
                colProps={{ span: 24 }}
              />

              <ProFormText name="loaiBieuMau" label="Loại biểu mẫu" />
              <ProFormSelect
                name="duAn"
                label="Dự án"
                valueEnum={{
                  'Dự án A': { text: 'Dự án A' },
                  'Dự án B': { text: 'Dự án B' },
                }}
              />

              <ProFormTextArea
                name="dienGiai"
                label="Diễn giải"
                colProps={{ span: 24 }}
                fieldProps={{ rows: 4 }}
              />

              <ProFormSwitch
                name="khoa"
                label="Khóa"
                fieldProps={{ checkedChildren: 'Khóa', unCheckedChildren: 'Hoạt động' }}
              />

              <ProFormText name="nvTao" label="Nhân viên tạo" />
              <ProFormDatePicker name="ngayTao" label="Ngày tạo" fieldProps={{ format: 'YYYY-MM-DD' }} />

              <ProFormText name="nvCapNhat" label="Nhân viên cập nhật" />
              <ProFormDatePicker name="ngayCapNhat" label="Ngày cập nhật" fieldProps={{ format: 'YYYY-MM-DD' }} />
            </ProForm>
          </ProCard>
        )}
      </Spin>
    </PageContainer>
  );
};

export default ProjectFormEdit;
