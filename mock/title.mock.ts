import type { Request, Response } from "express";

type DanhXung = {
  id: number;
  code: string;
  name: string;
  nameEN: string;
};

let DANH_XUNG_DATA: DanhXung[] = [
  { id: 1, code: "MR", name: "Ông", nameEN: "Mr" },
  { id: 2, code: "MRS", name: "Bà", nameEN: "Mrs" },
  { id: 3, code: "MS", name: "Cô", nameEN: "Ms" },
];

export default {
  // =========================
  // GET LIST DANH XƯNG
  // =========================
  "GET /api/danh-xung": (req: Request, res: Response) => {
    res.json({
      success: true,
      message: "OK",
      data: DANH_XUNG_DATA,
    });
  },

  // =========================
  // GET DETAIL DANH XƯNG
  // =========================
  "GET /api/danh-xung/:id": (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const record = DANH_XUNG_DATA.find((i) => i.id === id);

    if (!record) {
      res.status(404).json({
        success: false,
        message: "Danh xưng không tồn tại",
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
  // CREATE DANH XƯNG
  // =========================
  "POST /api/danh-xung": (req: Request, res: Response) => {
    const { code, name, nameEN } = req.body;

    const newItem = {
      id: Date.now(),
      code,
      name,
      nameEN,
    };

    DANH_XUNG_DATA.push(newItem);

    res.json({
      success: true,
      message: "Tạo danh xưng thành công",
      data: newItem,
    });
  },

  // =========================
  // UPDATE DANH XƯNG
  // =========================
  "PUT /api/danh-xung/:id": (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const index = DANH_XUNG_DATA.findIndex((i) => i.id === id);

    if (index === -1) {
      res.status(404).json({
        success: false,
        message: "Danh xưng không tồn tại",
      });
      return;
    }

    DANH_XUNG_DATA[index] = {
      ...DANH_XUNG_DATA[index],
      ...req.body,
    };

    res.json({
      success: true,
      message: "Cập nhật danh xưng thành công",
      data: DANH_XUNG_DATA[index],
    });
  },
};