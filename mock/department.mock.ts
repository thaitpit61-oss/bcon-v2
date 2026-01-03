import type { Request, Response } from "express";

type department = {
  id: number;
  name: string;
};

let DEPARTMENT_DATA: department[] = [
  { id: 1, name: "Ban giám đốc" },
  { id: 2, name: "Ban an ninh" },
  { id: 3, name: "Khối đấu thầu" },
  { id: 4, name: "Khối đầu tư" },
];

export default {
  // =========================
  // GET LIST nguồn đến
  // =========================
  "GET /api/department": (req: Request, res: Response) => {
    res.json({
      success: true,
      message: "OK",
      data: DEPARTMENT_DATA,
    });
  },

  // =========================
  // GET DETAIL NGHỀ
  // =========================
  "GET /api/department/:id": (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const record = DEPARTMENT_DATA.find((i) => i.id === id);

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
  "POST /api/department": (req: Request, res: Response) => {
    const { name } = req.body;

    const newItem = {
      id: Date.now(),
      name,
    };

    DEPARTMENT_DATA.push(newItem);

    res.json({
      success: true,
      message: "Tạo thời điểm liên hệ thành công",
      data: newItem,
    });
  },

  // =========================
  // UPDATE NGHỀ
  // =========================
  "PUT /api/department/:id": (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const index = DEPARTMENT_DATA.findIndex((i) => i.id === id);

    if (index === -1) {
      res.status(404).json({
        success: false,
        message: "Thời điểm liên hệ không tồn tại",
      });
      return;
    }

    DEPARTMENT_DATA[index] = {
      ...DEPARTMENT_DATA[index],
      ...req.body,
    };

    res.json({
      success: true,
      message: "Cập nhật thời điểm liên hệ thành công",
      data: DEPARTMENT_DATA[index],
    });
  },
};
