import type { Request, Response } from "express";

type profession = {
  id: number;
  name: string;
};

let PROFESSION_DATA: profession[] = [
  { id: 1, name: "Giám đốc Tài chính Kế toán" },
  { id: 2, name: "Giám đốc Khối Kinh doanh" },
  { id: 3, name: "Thư Ký Dự Án" },
  { id: 4, name: "Nhân Viên Quản Lý Đại Lý" },
];

export default {
  // =========================
  // GET LIST nguồn đến
  // =========================
  "GET /api/business-type": (req: Request, res: Response) => {
    res.json({
      success: true,
      message: "OK",
      data: PROFESSION_DATA,
    });
  },

  // =========================
  // GET DETAIL NGHỀ
  // =========================
  "GET /api/position/:id": (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const record = PROFESSION_DATA.find((i) => i.id === id);

    if (!record) {
      res.status(404).json({
        success: false,
        message: "thời điểm liên hệ không tồn tại",
      });
      return;
    }

    res.json({
      success: true,
      message: "OK",
      data: record,
    });
  },

  // =========================
  // CREATE N
  // =========================
  "POST /api/position": (req: Request, res: Response) => {
    const { name, nameEN } = req.body;

    const newItem = {
      id: Date.now(),
      name,
      nameEN,
    };

    PROFESSION_DATA.push(newItem);

    res.json({
      success: true,
      message: "Tạo thời điểm liên hệ thành công",
      data: newItem,
    });
  },

  // =========================
  // UPDATE NGHỀ
  // =========================
  "PUT /api/position/:id": (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const index = PROFESSION_DATA.findIndex((i) => i.id === id);

    if (index === -1) {
      res.status(404).json({
        success: false,
        message: "Thời điểm liên hệ không tồn tại",
      });
      return;
    }

    PROFESSION_DATA[index] = {
      ...PROFESSION_DATA[index],
      ...req.body,
    };

    res.json({
      success: true,
      message: "Cập nhật thời điểm liên hệ thành công",
      data: PROFESSION_DATA[index],
    });
  },
};
