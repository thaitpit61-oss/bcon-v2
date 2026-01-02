import { EditOutlined, PlusOutlined, ReloadOutlined } from "@ant-design/icons";
import {
  ActionType,
  ModalForm,
  PageContainer,
  ProFormText,
  ProList,
} from "@ant-design/pro-components";
import { Button, Form, message } from "antd";
import { useRef, useState } from "react";

type contactTime = {
  id: number;
  name: string;
  nameEN: string;
};

type contactTimePayload = Pick<contactTime, "name" | "nameEN">;

const professionList: React.FC = () => {
  const actionRef = useRef<ActionType | null>(null);
  const [openCreate, setOpenCreate] = useState(false);
  const [form] = Form.useForm<contactTimePayload>();
  const [openEdit, setOpenEdit] = useState(false);
  const [editingRecord, setEditingRecord] = useState<contactTime | null>(null);
  const [editForm] = Form.useForm<contactTimePayload>();

  return (
    <PageContainer
      title="Danh sách thời điểm liên hệ"
      extra={[
        <Button
          key="reload"
          icon={<ReloadOutlined />}
          onClick={() => actionRef.current?.reload()}
        >
          Tải lại
        </Button>,
        <Button
          key="add"
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setOpenCreate(true)}
        >
          Thêm thời điểm liên hệ
        </Button>,
      ]}
    >
      {/* ===== MODAL CREATE ===== */}
      <ModalForm<contactTimePayload>
        title="Thêm thời điểm"
        open={openCreate}
        form={form}
        modalProps={{
          destroyOnClose: true,
          onCancel: () => setOpenCreate(false),
        }}
        layout="vertical"
        onFinish={async (values) => {
          try {
            const res = await fetch("/api/profession", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                name: (values.name || "").trim(),
                nameEN: (values.nameEN || "").trim(),
              }),
            });

            const json = await res.json();

            if (!res.ok || !json?.success) {
              message.error(json?.message || "Thêm thời điểm liên hệ thất bại");
              return false;
            }

            message.success("Thêm liên hệ thất bại thành công");
            setOpenCreate(false);
            form.resetFields();
            actionRef.current?.reload();
            return true;
          } catch (e) {
            message.error("Lỗi mạng khi thêm thời điểm liên hệ");
            return false;
          }
        }}
      >
        <ProFormText
          name="name"
          label="Name"
          placeholder="VD: từ 8 giờ tới 9 giờ sáng"
          rules={[
            { required: true, message: "Vui lòng nhập thời điểm liên hệ" },
          ]}
        />

        <ProFormText
          name="nameEN"
          label="Name EN"
          placeholder="VD: form 8 AM to 9 PM"
          rules={[
            { required: true, message: "Vui lòng nhập thời điểm liên hệ EN" },
          ]}
        />
      </ModalForm>
      <ProList<contactTime>
        actionRef={actionRef}
        rowKey="id"
        showActions="hover"
        split
        headerTitle="Danh sách thời điểm liên hệ"
        pagination={{ pageSize: 10 }}
        request={async () => {
          try {
            const res = await fetch("/api/contact-time", { method: "GET" });
            const json = await res.json();

            if (!res.ok || !json?.success) {
              message.error(
                json?.message || "Không tải được thời điểm liên hệ"
              );
              return { data: [], success: false };
            }

            return {
              data: json.data || [],
              success: true,
            };
          } catch (e) {
            message.error("Lỗi mạng khi tải thời điểm liên hệ");
            return { data: [], success: false };
          }
        }}
        metas={{
          title: {
            dataIndex: "name",
            title: "thời điểm liên hệ",
          },
          description: {
            render: (_, row) => (
              <>
                <div>Tiếng Anh: {row.nameEN}</div>
              </>
            ),
          },
          actions: {
            render: (_, row) => [
              <Button
                key="edit"
                type="link"
                icon={<EditOutlined />}
                onClick={() => {
                  setEditingRecord(row);
                  editForm.setFieldsValue({
                    name: row.name,
                    nameEN: row.nameEN,
                  });
                  setOpenEdit(true);
                }}
              >
                Sửa
              </Button>,
            ],
          },
        }}
      />
      {/* ===== MODAL EDIT ===== */}
      <ModalForm<contactTimePayload>
        title="Sửa thời điểm liên hệ"
        open={openEdit}
        form={editForm}
        modalProps={{
          destroyOnClose: true,
          onCancel: () => {
            setOpenEdit(false);
            setEditingRecord(null);
          },
        }}
        layout="vertical"
        onFinish={async (values) => {
          if (!editingRecord) return false;

          try {
            const res = await fetch(`/api/profession/${editingRecord.id}`, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                name: values.name.trim(),
                nameEN: values.nameEN.trim(),
              }),
            });

            const json = await res.json();

            if (!res.ok || !json?.success) {
              message.error(
                json?.message || "Cập nhật thời điểm liên hệ thất bại"
              );
              return false;
            }

            message.success("Cập nhật thời điểm liên hệ thành công");
            setOpenEdit(false);
            setEditingRecord(null);
            actionRef.current?.reload();
            return true;
          } catch {
            message.error("Lỗi mạng khi cập nhật thời điểm liên hệ ");
            return false;
          }
        }}
      >
        <ProFormText
          name="name"
          label="Name"
          rules={[
            { required: true, message: "Vui lòng nhập thời điểm liên hệ" },
          ]}
        />

        <ProFormText
          name="nameEN"
          label="Name EN"
          rules={[
            { required: true, message: "Vui lòng nhập thời điểm liên hệ EN" },
          ]}
        />
      </ModalForm>
    </PageContainer>
  );
};

export default professionList;
