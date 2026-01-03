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

type position = {
  id: number;
  name: string;
};

type positionPayload = Pick<position, "name">;

const positionList: React.FC = () => {
  const actionRef = useRef<ActionType | null>(null);
  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const [editingRecord, setEditingRecord] = useState<position | null>(null);

  const [createForm] = Form.useForm<positionPayload>();
  const [editForm] = Form.useForm<positionPayload>();

  return (
    <PageContainer
      title="Danh sách chức vụ"
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
          Thêm chức vụ
        </Button>,
      ]}
    >
      {/* ===== MODAL CREATE ===== */}
      <ModalForm<positionPayload>
        title="Thêm chức vụ"
        open={openCreate}
        form={createForm}
        modalProps={{
          destroyOnClose: true,
          onCancel: () => setOpenCreate(false),
        }}
        layout="vertical"
        onFinish={async (values) => {
          try {
            const res = await fetch("/api/position", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                name: (values.name || "").trim(),
              }),
            });

            const json = await res.json();

            if (!res.ok || !json?.success) {
              message.error(json?.message || "Thêm chức vụ thất bại");
              return false;
            }

            message.success("Thêm chức vụ thành công");
            setOpenCreate(false);
            createForm.resetFields();
            actionRef.current?.reload();
            return true;
          } catch {
            message.error("Lỗi mạng khi thêm chức vụ");
            return false;
          }
        }}
      >
        <ProFormText
          name="name"
          label="Tên chức vụ"
          placeholder="VD: Giám đốc"
          rules={[{ required: true, message: "Vui lòng nhập tên chức vụ" }]}
        />
      </ModalForm>

      {/* ===== LIST ===== */}
      <ProList<position>
        actionRef={actionRef}
        rowKey="id"
        showActions="hover"
        split
        headerTitle="Danh sách chức vụ"
        pagination={{ pageSize: 10 }}
        request={async () => {
          try {
            const res = await fetch("/api/business-type", { method: "GET" });
            const json = await res.json();

            if (!res.ok || !json?.success) {
              message.error(
                json?.message || "Không tải được danh sách chức vụ"
              );
              return { data: [], success: false };
            }

            return { data: json.data || [], success: true };
          } catch {
            message.error("Lỗi mạng khi tải danh sách chức vụ");
            return { data: [], success: false };
          }
        }}
        metas={{
          title: { dataIndex: "name", title: "tên chức vụ" },
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
      <ModalForm<positionPayload>
        title="Sửa chức vụ"
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
              message.error(json?.message || "Cập nhật chức vụ thất bại");
              return false;
            }

            message.success("Cập nhật chức vụ thành công");
            setOpenEdit(false);
            setEditingRecord(null);
            actionRef.current?.reload();
            return true;
          } catch {
            message.error("Lỗi mạng khi cập nhật chức vụ");
            return false;
          }
        }}
      >
        <ProFormText
          name="name"
          label="Tên chức vụ"
          rules={[{ required: true, message: "Vui lòng nhập tên chức vụ" }]}
        />
      </ModalForm>
    </PageContainer>
  );
};

export default positionList;
