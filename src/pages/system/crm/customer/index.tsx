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

type profession = {
  id: number;
  code: string;
  name: string;
  nameEN: string;
};

type professionPayload = Pick<profession, "code" | "name" | "nameEN">;

const professionList: React.FC = () => {
  const actionRef = useRef<ActionType | null>(null);
  const [openCreate, setOpenCreate] = useState(false);
  const [form] = Form.useForm<professionPayload>();
  const [openEdit, setOpenEdit] = useState(false);
  const [editingRecord, setEditingRecord] = useState<profession | null>(null);
  const [editForm] = Form.useForm<professionPayload>();

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
      <ModalForm<professionPayload>
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
            const res = await fetch("/api/profession", {
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
              message.error(json?.message || "Thêm nghề thất bại");
              return false;
            }

            message.success("Thêm nghề thành công");
            setOpenCreate(false);
            form.resetFields();
            actionRef.current?.reload();
            return true;
          } catch (e) {
            message.error("Lỗi mạng khi thêm nghề");
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
          placeholder="VD: nghề Điện"
          rules={[{ required: true, message: "Vui lòng nhập tên nghề nghiệp" }]}
        />

        <ProFormText
          name="nameEN"
          label="Name EN"
          placeholder="VD: ELECTRIC"
          rules={[{ required: true, message: "Vui lòng nhập name EN" }]}
        />
      </ModalForm>
      <ProList<profession>
        actionRef={actionRef}
        rowKey="id"
        showActions="hover"
        split
        headerTitle="Danh sách nghề"
        pagination={{ pageSize: 10 }}
        request={async () => {
          try {
            const res = await fetch("/api/profession", { method: "GET" });
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
            title: "tên nghề",
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
      <ModalForm<professionPayload>
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
            const res = await fetch(`/api/profession/${editingRecord.id}`, {
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
              message.error(json?.message || "Cập nhật nghề thất bại");
              return false;
            }

            message.success("Cập nhật nghề thành công");
            setOpenEdit(false);
            setEditingRecord(null);
            actionRef.current?.reload();
            return true;
          } catch {
            message.error("Lỗi mạng khi cập nhật nghề");
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
          rules={[{ required: true, message: "Vui lòng nhập nghề" }]}
        />

        <ProFormText
          name="nameEN"
          label="Name EN"
          rules={[{ required: true, message: "Vui lòng nhập nghề EN" }]}
        />
      </ModalForm>
    </PageContainer>
  );
};

export default professionList;
