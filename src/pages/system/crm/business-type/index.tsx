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

type BusinessType = {
  id: number;
  name: string;
  nameEN: string;
};

type BusinessTypePayload = Pick<BusinessType, "name" | "nameEN">;

const BusinessTypeList: React.FC = () => {
  const actionRef = useRef<ActionType | null>(null);
  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const [editingRecord, setEditingRecord] = useState<BusinessType | null>(null);

  const [createForm] = Form.useForm<BusinessTypePayload>();
  const [editForm] = Form.useForm<BusinessTypePayload>();

  return (
    <PageContainer
      title="Danh sách Loại hình kinh doanh"
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
          Thêm loại hình
        </Button>,
      ]}
    >
      {/* ===== MODAL CREATE ===== */}
      <ModalForm<BusinessTypePayload>
        title="Thêm loại hình kinh doanh"
        open={openCreate}
        form={createForm}
        modalProps={{
          destroyOnClose: true,
          onCancel: () => setOpenCreate(false),
        }}
        layout="vertical"
        onFinish={async (values) => {
          try {
            const res = await fetch("/api/business-type", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                name: (values.name || "").trim(),
                nameEN: (values.nameEN || "").trim(),
              }),
            });

            const json = await res.json();

            if (!res.ok || !json?.success) {
              message.error(json?.message || "Thêm loại hình thất bại");
              return false;
            }

            message.success("Thêm loại hình thành công");
            setOpenCreate(false);
            createForm.resetFields();
            actionRef.current?.reload();
            return true;
          } catch {
            message.error("Lỗi mạng khi thêm loại hình");
            return false;
          }
        }}
      >
        <ProFormText
          name="name"
          label="Tên loại hình"
          placeholder="VD: Công ty TNHH"
          rules={[{ required: true, message: "Vui lòng nhập tên loại hình" }]}
        />

        <ProFormText
          name="nameEN"
          label="Tên EN"
          placeholder="VD: Limited Liability Company"
          rules={[{ required: true, message: "Vui lòng nhập tên EN" }]}
        />
      </ModalForm>

      {/* ===== LIST ===== */}
      <ProList<BusinessType>
        actionRef={actionRef}
        rowKey="id"
        showActions="hover"
        split
        headerTitle="Danh sách loại hình"
        pagination={{ pageSize: 10 }}
        request={async () => {
          try {
            const res = await fetch("/api/business-type", { method: "GET" });
            const json = await res.json();

            if (!res.ok || !json?.success) {
              message.error(
                json?.message || "Không tải được danh sách loại hình"
              );
              return { data: [], success: false };
            }

            return { data: json.data || [], success: true };
          } catch {
            message.error("Lỗi mạng khi tải danh sách loại hình");
            return { data: [], success: false };
          }
        }}
        metas={{
          title: { dataIndex: "name", title: "Loại hình" },
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
      <ModalForm<BusinessTypePayload>
        title="Sửa loại hình kinh doanh"
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
            const res = await fetch(`/api/business-type/${editingRecord.id}`, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                name: values.name.trim(),
                nameEN: values.nameEN.trim(),
              }),
            });

            const json = await res.json();

            if (!res.ok || !json?.success) {
              message.error(json?.message || "Cập nhật loại hình thất bại");
              return false;
            }

            message.success("Cập nhật loại hình thành công");
            setOpenEdit(false);
            setEditingRecord(null);
            actionRef.current?.reload();
            return true;
          } catch {
            message.error("Lỗi mạng khi cập nhật loại hình");
            return false;
          }
        }}
      >
        <ProFormText
          name="name"
          label="Tên loại hình"
          rules={[{ required: true, message: "Vui lòng nhập tên loại hình" }]}
        />

        <ProFormText
          name="nameEN"
          label="Tên EN"
          rules={[{ required: true, message: "Vui lòng nhập tên EN" }]}
        />
      </ModalForm>
    </PageContainer>
  );
};

export default BusinessTypeList;
