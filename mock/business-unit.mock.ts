import type { Request, Response } from "express";

type businessUnit = {
  id: number;
  name: string;
};

let BUSINESS_UNIT_DATA: businessUnit[] = [
  { id: 1, name: "Nhóm căn hộ" },
  { id: 2, name: "Nhóm CTV" },
  { id: 3, name: "Nhóm CSKH" },
  { id: 4, name: "Nhóm công nợ" },
];

export default {
  // =========================
  // GET LIST nguồn đến
  // =========================
  "GET /api/business-unit": (req: Request, res: Response) => {
    res.json({
      success: true,
      message: "OK",
      data: BUSINESS_UNIT_DATA,
    });
  },

  // =========================
  // GET DETAIL NGHỀ
  // =========================
  "GET /api/business-unit/:id": (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const record = BUSINESS_UNIT_DATA.find((i) => i.id === id);

    if (!record) {
      res.status(404).json({
        success: false,
        message: "nhóm kinh doanh không tồn tại",
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
  "POST /api/business-unit": (req: Request, res: Response) => {
    const { name } = req.body;

    const newItem = {
      id: Date.now(),
      name,
    };

    BUSINESS_UNIT_DATA.push(newItem);

    res.json({
      success: true,
      message: "Tạo nhóm kinh doanh thành công",
      data: newItem,
    });
  },

  // =========================
  // UPDATE NGHỀ
  // =========================
  "PUT /api/businessUnit/:id": (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const index = BUSINESS_UNIT_DATA.findIndex((i) => i.id === id);

    if (index === -1) {
      res.status(404).json({
        success: false,
        message: "nhóm kinh doanh không tồn tại",
      });
      return;
    }

    BUSINESS_UNIT_DATA[index] = {
      ...BUSINESS_UNIT_DATA[index],
      ...req.body,
    };

    res.json({
      success: true,
      message: "Cập nhật nhóm kinh doanh thành công",
      data: BUSINESS_UNIT_DATA[index],
    });
  },
};
