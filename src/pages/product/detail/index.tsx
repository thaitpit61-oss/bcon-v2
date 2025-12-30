import {
  PageContainer,
  ProCard,
  ProDescriptions,
} from "@ant-design/pro-components";
import { Button, Spin, Tag, message } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import { history, useParams } from "umi";

type Product = {
  stt: number;
  trangThai: "Available" | "Sold" | string;
  maCan: string;
  duAn: string;
  dotBanHang: string;
  loaiSP: string;
  tang: string;
  dienTich: string;
  donGia: string;
  tongGia: string;
  chietKhau: string;
  tongSauCK: string;
};

// Mock data (giống bên list)
const MOCK_PRODUCTS: Product[] = [
  {
    stt: 1,
    trangThai: "Available",
    maCan: "C-001",
    duAn: "Dự án A",
    dotBanHang: "Đợt 1",
    loaiSP: "Căn hộ",
    tang: "Tầng 5",
    dienTich: "75 m2",
    donGia: "1,200,000",
    tongGia: "90,000,000",
    chietKhau: "5%",
    tongSauCK: "85,500,000",
  },
  {
    stt: 2,
    trangThai: "Sold",
    maCan: "C-002",
    duAn: "Dự án B",
    dotBanHang: "Đợt 2",
    loaiSP: "Studio",
    tang: "Tầng 3",
    dienTich: "40 m2",
    donGia: "900,000",
    tongGia: "36,000,000",
    chietKhau: "0%",
    tongSauCK: "36,000,000",
  },
];

// Tạm thời mock “API”
async function fetchProductByMaCan(maCan: string): Promise<Product | null> {
  await new Promise((r) => setTimeout(r, 200));
  return MOCK_PRODUCTS.find((p) => p.maCan === maCan) ?? null;
}

const ProductDetail: React.FC = () => {
  const params = useParams<{ maCan?: string }>();
  const maCan = useMemo(() => (params.maCan ?? "").trim(), [params.maCan]);

  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      if (!maCan) {
        console.log("maCan", maCan);
        message.error("Mã căn không hợp lệ");
        history.push("/product/list");
        return;
      }

      setLoading(true);
      try {
        const res = await fetchProductByMaCan(maCan);
        if (cancelled) return;

        if (!res) {
          message.warning("Không tìm thấy sản phẩm");
          history.push("/product/list");
          return;
        }

        setProduct(res);
      } catch (e) {
        if (!cancelled) message.error("Lỗi tải dữ liệu sản phẩm");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [maCan]);

  const statusTag = (status: string) => {
    const s = status?.toLowerCase?.() ?? "";
    const color =
      s === "available" ? "green" : s === "sold" ? "red" : "default";
    return <Tag color={color}>{status}</Tag>;
  };

  return (
    <PageContainer
      title="Chi tiết sản phẩm"
      onBack={() => history.push("/product/list")}
      extra={[
        <Button key="back" onClick={() => history.push("/product/list")}>
          Quay lại danh sách
        </Button>,
        <Button
          key="edit"
          type="primary"
          disabled={!product}
          onClick={() => history.push(`/product/edit/${maCan}`)}
        >
          Sửa
        </Button>,
      ]}
    >
      <Spin spinning={loading}>
        {product ? (
          <ProCard gutter={16} direction="column">
            <ProCard title="Thông tin sản phẩm" bordered>
              <ProDescriptions<Product>
                column={2}
                dataSource={product}
                columns={[
                  { title: "Mã căn", dataIndex: "maCan" },
                  { title: "STT", dataIndex: "stt" },
                  {
                    title: "Trạng thái",
                    dataIndex: "trangThai",
                    render: (_, record) => statusTag(record.trangThai),
                  },
                  { title: "Loại sản phẩm", dataIndex: "loaiSP" },
                  { title: "Tầng", dataIndex: "tang" },
                  { title: "Diện tích", dataIndex: "dienTich" },
                  { title: "Dự án", dataIndex: "duAn" },
                  { title: "Đợt bán hàng", dataIndex: "dotBanHang" },
                ]}
              />
            </ProCard>

            <ProCard title="Giá & chiết khấu" bordered>
              <ProDescriptions<Product>
                column={2}
                dataSource={product}
                columns={[
                  { title: "Đơn giá", dataIndex: "donGia" },
                  { title: "Tổng giá", dataIndex: "tongGia" },
                  { title: "Chiết khấu", dataIndex: "chietKhau" },
                  { title: "Tổng sau CK", dataIndex: "tongSauCK" },
                ]}
              />
            </ProCard>
          </ProCard>
        ) : null}
      </Spin>
    </PageContainer>
  );
};

export default ProductDetail;
