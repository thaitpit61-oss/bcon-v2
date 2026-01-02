import type { Request, Response } from "express";

type profession = {
  id: number;
  code: string;
  name: string;
  nameEN: string;
};

let PROFESSION_DATA: profession[] = [
  { id: 1, code: "1", name: "Nội bộ", nameEN: "Nội bộ" },
  { id: 2, code: "2", name: "VIP", nameEN: "VIP" },
  { id: 3, code: "3", name: "Quảng cáo", nameEN: "Quảng cáo" },
  { id: 4, code: "4", name: "Báo chí", nameEN: "Báo chí" },
];

export default {
  // =========================
  // GET LIST nguồn đến
  // =========================
  "GET /api/insource": (req: Request, res: Response) => {
    res.json({
      success: true,
      message: "OK",
      data: PROFESSION_DATA,
    });
  },

  // =========================
  // GET DETAIL NGHỀ
  // =========================
  "GET /api/insource/:id": (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const record = PROFESSION_DATA.find((i) => i.id === id);

    if (!record) {
      res.status(404).json({
        success: false,
        message: "nguồn đến không tồn tại",
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
  "POST /api/insource": (req: Request, res: Response) => {
    const { code, name, nameEN } = req.body;

    const newItem = {
      id: Date.now(),
      code,
      name,
      nameEN,
    };

    PROFESSION_DATA.push(newItem);

    res.json({
      success: true,
      message: "Tạo nguồn đến thành công",
      data: newItem,
    });
  },

  // =========================
  // UPDATE NGHỀ
  // =========================
  "PUT /api/insource/:id": (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const index = PROFESSION_DATA.findIndex((i) => i.id === id);

    if (index === -1) {
      res.status(404).json({
        success: false,
        message: "Nguồn đến không tồn tại",
      });
      return;
    }

    PROFESSION_DATA[index] = {
      ...PROFESSION_DATA[index],
      ...req.body,
    };

    res.json({
      success: true,
      message: "Cập nhật nguồn đến thành công",
      data: PROFESSION_DATA[index],
    });
  },
};
