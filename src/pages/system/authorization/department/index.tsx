import { EditOutlined, PlusOutlined, ReloadOutlined } from "@ant-design/icons";
import type { ActionType } from "@ant-design/pro-components";
import {
  ModalForm,
  PageContainer,
  ProFormText,
  ProList,
} from "@ant-design/pro-components";
import { Button, Form, message } from "antd";
import React, { useRef, useState } from "react";

type department = {
  id: number;
  name: string;
};

type departmentPayload = Pick<department, "name">;

const departmentList: React.FC = () => {
  const actionRef = useRef<ActionType | null>(null);
  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const [editingRecord, setEditingRecord] = useState<department | null>(null);

  const [createForm] = Form.useForm<departmentPayload>();
  const [editForm] = Form.useForm<departmentPayload>();

  return (
    <PageContainer
      title="Danh sách phòng ban"
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
          Thêm phòng ban
        </Button>,
      ]}
    >
      {/* ===== MODAL CREATE ===== */}
      <ModalForm<departmentPayload>
        title="Thêm phòng ban"
        open={openCreate}
        form={createForm}
        modalProps={{
          destroyOnClose: true,
          onCancel: () => setOpenCreate(false),
        }}
        layout="vertical"
        onFinish={async (values) => {
          try {
            const res = await fetch("/api/department", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                name: (values.name || "").trim(),
              }),
            });

            const json = await res.json();

            if (!res.ok || !json?.success) {
              message.error(json?.message || "Thêm phòng ban thất bại");
              return false;
            }

            message.success("Thêm phòng ban thành công");
            setOpenCreate(false);
            createForm.resetFields();
            actionRef.current?.reload();
            return true;
          } catch {
            message.error("Lỗi mạng khi thêm phòng ban");
            return false;
          }
        }}
      >
        <ProFormText
          name="name"
          label="Tên phòng ban"
          placeholder="VD: Giám đốc"
          rules={[{ required: true, message: "Vui lòng nhập tên phòng ban" }]}
        />
      </ModalForm>

      {/* ===== LIST ===== */}
      <ProList<department>
        actionRef={actionRef}
        rowKey="id"
        showActions="hover"
        split
        headerTitle="Danh sách phòng ban"
        pagination={{ pageSize: 10 }}
        request={async () => {
          try {
            const res = await fetch("/api/department", { method: "GET" });
            const json = await res.json();

            if (!res.ok || !json?.success) {
              message.error(
                json?.message || "Không tải được danh sách phòng ban"
              );
              return { data: [], success: false };
            }

            return { data: json.data || [], success: true };
          } catch {
            message.error("Lỗi mạng khi tải danh sách phòng ban");
            return { data: [], success: false };
          }
        }}
        metas={{
          title: { dataIndex: "name", title: "tên phòng ban" },
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
      <ModalForm<departmentPayload>
        title="Sửa phòng ban"
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
            const res = await fetch(`/api/position/${editingRecord.id}`, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                name: values.name.trim(),
              }),
            });

            const json = await res.json();

            if (!res.ok || !json?.success) {
              message.error(json?.message || "Cập nhật phòng ban thất bại");
              return false;
            }

            message.success("Cập nhật phòng ban thành công");
            setOpenEdit(false);
            setEditingRecord(null);
            actionRef.current?.reload();
            return true;
          } catch {
            message.error("Lỗi mạng khi cập nhật phòng ban");
            return false;
          }
        }}
      >
        <ProFormText
          name="name"
          label="Tên phòng ban"
          rules={[{ required: true, message: "Vui lòng nhập tên phòng ban" }]}
        />
      </ModalForm>
    </PageContainer>
  );
};

export default departmentList;
