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

type title = {
  id: number;
  code: string;
  name: string;
  nameEN: string;
};

type titlePayload = Pick<title, "code" | "name" | "nameEN">;

const titleList: React.FC = () => {
  const actionRef = useRef<ActionType | null>(null);
  const [openCreate, setOpenCreate] = useState(false);
  const [form] = Form.useForm<titlePayload>();
  const [openEdit, setOpenEdit] = useState(false);
  const [editingRecord, setEditingRecord] = useState<title | null>(null);
  const [editForm] = Form.useForm<titlePayload>();

  return (
    <PageContainer
      title="Danh sách Danh xưng"
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
          Thêm danh xưng
        </Button>,
      ]}
    >
      {/* ===== MODAL CREATE ===== */}
      <ModalForm<titlePayload>
        title="Thêm danh xưng"
        open={openCreate}
        form={form}
        modalProps={{
          destroyOnClose: true,
          onCancel: () => setOpenCreate(false),
        }}
        layout="vertical"
        onFinish={async (values) => {
          try {
            const res = await fetch("/api/danh-xung", {
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
              message.error(json?.message || "Thêm danh xưng thất bại");
              return false;
            }

            message.success("Thêm danh xưng thành công");
            setOpenCreate(false);
            form.resetFields();
            actionRef.current?.reload();
            return true;
          } catch (e) {
            message.error("Lỗi mạng khi thêm danh xưng");
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
          placeholder="VD: Ông"
          rules={[{ required: true, message: "Vui lòng nhập name" }]}
        />

        <ProFormText
          name="nameEN"
          label="Name EN"
          placeholder="VD: Mr"
          rules={[{ required: true, message: "Vui lòng nhập name EN" }]}
        />
      </ModalForm>
      <ProList<title>
        actionRef={actionRef}
        rowKey="id"
        showActions="hover"
        split
        headerTitle="Danh xưng"
        pagination={{ pageSize: 10 }}
        request={async () => {
          try {
            const res = await fetch("/api/danh-xung", { method: "GET" });
            const json = await res.json();

            if (!res.ok || !json?.success) {
              message.error(
                json?.message || "Không tải được danh sách danh xưng"
              );
              return { data: [], success: false };
            }

            return {
              data: json.data || [],
              success: true,
            };
          } catch (e) {
            message.error("Lỗi mạng khi tải danh sách danh xưng");
            return { data: [], success: false };
          }
        }}
        metas={{
          title: {
            dataIndex: "name",
            title: "Danh xưng",
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
      <ModalForm<titlePayload>
        title="Sửa danh xưng"
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
            const res = await fetch(`/api/danh-xung/${editingRecord.id}`, {
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
              message.error(json?.message || "Cập nhật danh xưng thất bại");
              return false;
            }

            message.success("Cập nhật danh xưng thành công");
            setOpenEdit(false);
            setEditingRecord(null);
            actionRef.current?.reload();
            return true;
          } catch {
            message.error("Lỗi mạng khi cập nhật danh xưng");
            return false;
          }
        }}
      >
        <ProFormText
          name="code"
          label="Code"
          rules={[{ required: true, message: "Vui lòng nhập code" }]}
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
          rules={[{ required: true, message: "Vui lòng nhập name" }]}
        />

        <ProFormText
          name="nameEN"
          label="Name EN"
          rules={[{ required: true, message: "Vui lòng nhập name EN" }]}
        />
      </ModalForm>
    </PageContainer>
  );
};

export default titleList;
