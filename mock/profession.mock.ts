import type { Request, Response } from "express";

type profession = {
  id: number;
  code: string;
  name: string;
  nameEN: string;
};

let PROFESSION_DATA: profession[] = [
  { id: 1, code: "1", name: "ngành Thuế", nameEN: "ngành Thuế" },
  { id: 2, code: "2", name: "ngành Du Lịch", nameEN: "ngành Du Lịch" },
  { id: 3, code: "3", name: "Nghề kiểm toán", nameEN: "Nghề kiểm toán" },
  { id: 4, code: "4", name: "nghề dược", nameEN: "Nghề dược" },
];

export default {
  // =========================
  // GET LIST nghề
  // =========================
  "GET /api/profession": (req: Request, res: Response) => {
    res.json({
      success: true,
      message: "OK",
      data: PROFESSION_DATA,
    });
  },

  // =========================
  // GET DETAIL NGHỀ
  // =========================
  "GET /api/profession/:id": (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const record = PROFESSION_DATA.find((i) => i.id === id);

    if (!record) {
      res.status(404).json({
        success: false,
        message: "nghề không tồn tại",
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
  // CREATE NGHỀ
  // =========================
  "POST /api/profession": (req: Request, res: Response) => {
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
      message: "Tạo nghề thành công",
      data: newItem,
    });
  },

  // =========================
  // UPDATE NGHỀ
  // =========================
  "PUT /api/profession/:id": (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const index = PROFESSION_DATA.findIndex((i) => i.id === id);

    if (index === -1) {
      res.status(404).json({
        success: false,
        message: "Nghề không tồn tại",
      });
      return;
    }

    PROFESSION_DATA[index] = {
      ...PROFESSION_DATA[index],
      ...req.body,
    };

    res.json({
      success: true,
      message: "Cập nhật danh xưng thành công",
      data: PROFESSION_DATA[index],
    });
  },
};
