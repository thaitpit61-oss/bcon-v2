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

type insource = {
  id: number;
  code: string;
  name: string;
  nameEN: string;
};

type insourcePayload = Pick<insource, "code" | "name" | "nameEN">;

const insourceList: React.FC = () => {
  const actionRef = useRef<ActionType | null>(null);
  const [openCreate, setOpenCreate] = useState(false);
  const [form] = Form.useForm<insourcePayload>();
  const [openEdit, setOpenEdit] = useState(false);
  const [editingRecord, setEditingRecord] = useState<insource | null>(null);
  const [editForm] = Form.useForm<insourcePayload>();

  return (
    <PageContainer
      title="Danh sách nguồn đến"
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
          Thêm nguồn đến
        </Button>,
      ]}
    >
      {/* ===== MODAL CREATE ===== */}
      <ModalForm<insourcePayload>
        title="Thêm nguồn đến"
        open={openCreate}
        form={form}
        modalProps={{
          destroyOnClose: true,
          onCancel: () => setOpenCreate(false),
        }}
        layout="vertical"
        onFinish={async (values) => {
          try {
            const res = await fetch("/api/insource", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                code: (values.code || "").trim().toUpperCase(),
                name: (values.name || "").trim(),
                nameEN: (values.nameEN || "").trim(),
              }),
            });

            const json = await res.json();

            if (!res.ok || !json?.success) {
              message.error(json?.message || "Thêm nguồn đến thất bại");
              return false;
            }

            message.success("Thêm nguồn đến thành công");
            setOpenCreate(false);
            form.resetFields();
            actionRef.current?.reload();
            return true;
          } catch (e) {
            message.error("Lỗi mạng khi thêm nguồn đến");
            return false;
          }
        }}
      >
        <ProFormText
          name="code"
          label="Code"
          placeholder="VD: MR"
          rules={[{ required: true, message: "Vui lòng nhập code" }]}
          fieldProps={{
            maxLength: 10,
            onChange: (e) =>
              form.setFieldsValue({
                code: (e.target.value || "").toUpperCase(),
              }),
          }}
        />

        <ProFormText
          name="name"
          label="Name"
          placeholder="VD: nội bộ"
          rules={[{ required: true, message: "Vui lòng nhập nguồn đến" }]}
        />

        <ProFormText
          name="nameEN"
          label="Name EN"
          placeholder="VD: INSIDE"
          rules={[{ required: true, message: "Vui lòng nhập nguồn đến EN" }]}
        />
      </ModalForm>
      <ProList<insource>
        actionRef={actionRef}
        rowKey="id"
        showActions="hover"
        split
        headerTitle="Danh sách nguồn đến"
        pagination={{ pageSize: 10 }}
        request={async () => {
          try {
            const res = await fetch("/api/insource", { method: "GET" });
            const json = await res.json();

            if (!res.ok || !json?.success) {
              message.error(
                json?.message || "Không tải được danh sách nguồn đến"
              );
              return { data: [], success: false };
            }

            return {
              data: json.data || [],
              success: true,
            };
          } catch (e) {
            message.error("Lỗi mạng khi tải danh sách nguồn đến");
            return { data: [], success: false };
          }
        }}
        metas={{
          title: {
            dataIndex: "name",
            title: "tên nguồn đến",
          },
          description: {
            render: (_, row) => (
              <>
                <div>
                  Mã: <b>{row.code}</b>
                </div>
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
                    code: row.code,
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
      <ModalForm<insourcePayload>
        title="Sửa nguồn đến"
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
            const res = await fetch(`/api/insource/${editingRecord.id}`, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                code: values.code.trim().toUpperCase(),
                name: values.name.trim(),
                nameEN: values.nameEN.trim(),
              }),
            });

            const json = await res.json();

            if (!res.ok || !json?.success) {
              message.error(json?.message || "Cập nhật nguồn đến thất bại");
              return false;
            }

            message.success("Cập nhật nguồn đến thành công");
            setOpenEdit(false);
            setEditingRecord(null);
            actionRef.current?.reload();
            return true;
          } catch {
            message.error("Lỗi mạng khi cập nhật nguồn đến");
            return false;
          }
        }}
      >
        <ProFormText
          name="code"
          label="Code"
          rules={[{ required: true, message: "Vui lòng nhập nguồn đến" }]}
          fieldProps={{
            maxLength: 10,
            onChange: (e) =>
              editForm.setFieldsValue({
                code: (e.target.value || "").toUpperCase(),
              }),
          }}
        />

        <ProFormText
          name="name"
          label="Name"
          rules={[{ required: true, message: "Vui lòng nhập nguồn đến" }]}
        />

        <ProFormText
          name="nameEN"
          label="Name EN"
          rules={[{ required: true, message: "Vui lòng nhập nguồn đến EN" }]}
        />
      </ModalForm>
    </PageContainer>
  );
};

export default insourceList;
