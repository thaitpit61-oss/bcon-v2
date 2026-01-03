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

type businessUnit = {
  id: number;
  name: string;
};

type businessUnitPayload = Pick<businessUnit, "name">;

const businessUnitList: React.FC = () => {
  const actionRef = useRef<ActionType | null>(null);
  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const [editingRecord, setEditingRecord] = useState<businessUnit | null>(null);

  const [createForm] = Form.useForm<businessUnitPayload>();
  const [editForm] = Form.useForm<businessUnitPayload>();

  return (
    <PageContainer
      title="Danh sách nhóm kinh doanh"
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
          Thêm nhóm kinh doanh
        </Button>,
      ]}
    >
      {/* ===== MODAL CREATE ===== */}
      <ModalForm<businessUnitPayload>
        title="Thêm nhóm kinh doanh"
        open={openCreate}
        form={createForm}
        modalProps={{
          destroyOnClose: true,
          onCancel: () => setOpenCreate(false),
        }}
        layout="vertical"
        onFinish={async (values) => {
          try {
            const res = await fetch("/api/businessUnit", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                name: (values.name || "").trim(),
              }),
            });

            const json = await res.json();

            if (!res.ok || !json?.success) {
              message.error(json?.message || "Thêm nhóm kinh doanh thất bại");
              return false;
            }

            message.success("Thêm nhóm kinh doanh thành công");
            setOpenCreate(false);
            createForm.resetFields();
            actionRef.current?.reload();
            return true;
          } catch {
            message.error("Lỗi mạng khi thêm nhóm kinh doanh");
            return false;
          }
        }}
      >
        <ProFormText
          name="name"
          label="Tên nhóm kinh doanh"
          placeholder="VD: Giám đốc"
          rules={[{ required: true, message: "Vui lòng nhập tên nhóm kinh doanh" }]}
        />
      </ModalForm>

      {/* ===== LIST ===== */}
      <ProList<businessUnit>
        actionRef={actionRef}
        rowKey="id"
        showActions="hover"
        split
        headerTitle="Danh sách nhóm kinh doanh"
        pagination={{ pageSize: 10 }}
        request={async () => {
          try {
            const res = await fetch("/api/business-unit", { method: "GET" });
            const json = await res.json();

            if (!res.ok || !json?.success) {
              message.error(
                json?.message || "Không tải được danh sách nhóm kinh doanh"
              );
              return { data: [], success: false };
            }

            return { data: json.data || [], success: true };
          } catch {
            message.error("Lỗi mạng khi tải danh sách nhóm kinh doanh");
            return { data: [], success: false };
          }
        }}
        metas={{
          title: { dataIndex: "name", title: "tên nhóm kinh doanh" },
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
      <ModalForm<businessUnitPayload>
        title="Sửa nhóm kinh doanh"
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
            const res = await fetch(`/api/business-unit/${editingRecord.id}`, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                name: values.name.trim(),
              }),
            });

            const json = await res.json();

            if (!res.ok || !json?.success) {
              message.error(json?.message || "Cập nhật nhóm kinh doanh thất bại");
              return false;
            }

            message.success("Cập nhật nhóm kinh doanh thành công");
            setOpenEdit(false);
            setEditingRecord(null);
            actionRef.current?.reload();
            return true;
          } catch {
            message.error("Lỗi mạng khi cập nhật nhóm kinh doanh");
            return false;
          }
        }}
      >
        <ProFormText
          name="name"
          label="Tên nhóm kinh doanh"
          rules={[{ required: true, message: "Vui lòng nhập tên nhóm kinh doanh" }]}
        />
      </ModalForm>
    </PageContainer>
  );
};

export default businessUnitList;
