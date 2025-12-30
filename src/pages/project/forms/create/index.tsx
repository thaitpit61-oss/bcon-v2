import React from 'react';
import {
  PageContainer,
  ProCard,
  ProForm,
  ProFormDatePicker,
  ProFormSwitch,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { history } from '@umijs/max';
import { message } from 'antd';

const ProjectFormCreate: React.FC = () => {
  const onFinish = async (values: any) => {
    console.log('Create form', values);
    message.success('Tạo biểu mẫu thành công (mock)');
    history.push('/project/forms');
    return true;
  };

  return (
    <PageContainer title="Tạo biểu mẫu">
      <ProCard>
        <ProForm
          layout="vertical"
          grid
          colProps={{ span: 12 }}
          onFinish={onFinish}
          submitter={{
            searchConfig: {
              submitText: 'Tạo',
              resetText: 'Huỷ',
            },
            resetButtonProps: {
              onClick: (e) => {
                e.preventDefault();
                history.push('/project/forms');
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
          <ProFormText name="duAn" label="Dự án" />

          <ProFormTextArea
            name="dienGiai"
            label="Diễn giải"
            fieldProps={{ rows: 4 }}
            colProps={{ span: 24 }}
          />

          <ProFormSwitch
            name="khoa"
            label="Khóa"
            fieldProps={{
              checkedChildren: 'Khóa',
              unCheckedChildren: 'Mở',
            }}
          />

          <ProFormText name="nvTao" label="Nhân viên tạo" />
          <ProFormDatePicker
            name="ngayTao"
            label="Ngày tạo"
            fieldProps={{ format: 'YYYY-MM-DD' }}
          />

          <ProFormText name="nvCapNhat" label="Nhân viên cập nhật" />
          <ProFormDatePicker
            name="ngayCapNhat"
            label="Ngày cập nhật"
            fieldProps={{ format: 'YYYY-MM-DD' }}
          />
        </ProForm>
      </ProCard>
    </PageContainer>
  );
};

export default ProjectFormCreate;
