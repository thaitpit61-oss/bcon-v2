import type { Request, Response } from "express";

const waitTime = (time: number = 100) =>
  new Promise((resolve) => setTimeout(resolve, time));

async function getFakeCaptcha(_req: Request, res: Response) {
  await waitTime(2000);
  return res.json("captcha-xxx");
}

const { ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION } = process.env;

let access =
  ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === "site" ? "admin" : "";

const getAccess = () => access;

/** ====== USER MOCK (BCONS) ====== */
type User = {
  id: number;

  xung: string;
  hoVaTen: string;
  maSo: string;
  loaiGiayTo: string;
  soGiayTo: string;

  ngaySinh: string; // dd/MM/yyyy
  ngayCap: string; // dd/MM/yyyy
  noiCap: string;
  nguyenQuan: string;

  diaChiLienLac: string;
  diaChiThuongTru: string;
  email: string;
  dienThoai: number;
  dienThoaiNB: number;
  maThueTNCN: string;
  chiNhanh: string;
  phongBan: string;
  nhomKD: string;
  chucDanh: string;
  maSoThue: string;
  soTaiKhoan: string;
  nganHang: string;
  nguoiQL1: string;
  nguoiQL2: string;
  ghiChu: string;
  mucHoaHoang: number;

  status: boolean;
};

const pad2 = (n: number) => `${n}`.padStart(2, "0");
const toDDMMYYYY = (d: Date) =>
  `${pad2(d.getDate())}/${pad2(d.getMonth() + 1)}/${d.getFullYear()}`;

let USERS: User[] = Array.from({ length: 57 }).map((_, i) => {
  const id = i + 1;
  const birth = new Date(1990, (i % 12) + 0, (i % 27) + 1);
  const issue = new Date(2015, (i % 12) + 0, (i % 27) + 1);

  return {
    id,
    xung: ["Mr", "Mrs", "Ms"][i % 3],
    hoVaTen: `NGƯỜI DÙNG ${pad2(id)}`,
    maSo: `NV-${pad2(id)}`,
    loaiGiayTo: ["Thẻ căn cước nhân dân", "CMND", "Passport"][i % 3],
    soGiayTo: `${100000000000 + id}`,

    ngaySinh: toDDMMYYYY(birth),
    ngayCap: toDDMMYYYY(issue),
    noiCap: ["TP.HCM", "Hà Nội", "Bình Dương"][i % 3],
    nguyenQuan: ["TP.HCM", "Hà Nội", "Đà Nẵng"][i % 3],

    diaChiLienLac: `Số ${id} Đường ABC, Phường ${i % 10}, Quận ${i % 12}`,
    diaChiThuongTru: `Số ${id} Đường XYZ, Phường ${i % 10}, Quận ${i % 12}`,
    email: `user${id}@bcons.vn`,
    dienThoai: 900000000 + id,
    dienThoaiNB: 280000 + id,
    maThueTNCN: `TNCN-${pad2(id)}`,
    chiNhanh: ["Sàn 1", "Sàn 2", "Sàn 3"][i % 3],
    phongBan: ["Kinh doanh", "Hành chính", "Kế toán"][i % 3],
    nhomKD: ["Nhóm A", "Nhóm B", "Nhóm C"][i % 3],
    chucDanh: ["NVKD", "Trưởng nhóm", "Trưởng phòng"][i % 3],
    maSoThue: `MST-${pad2(id)}`,
    soTaiKhoan: `${9704000000000000 + id}`,
    nganHang: ["VCB", "ACB", "TCB"][i % 3],
    nguoiQL1: `QL1-${pad2((i % 10) + 1)}`,
    nguoiQL2: `QL2-${pad2((i % 7) + 1)}`,
    ghiChu: `Ghi chú user ${id}`,
    mucHoaHoang: (i % 5) * 5, // 0,5,10,15,20
    status: i % 4 !== 0, // false mỗi 4 người
  };
});

export default {
  /** ===== giữ nguyên currentUser/login của template ===== */
  "GET /api/currentUser": (_req: Request, res: Response) => {
    if (!getAccess()) {
      res.status(401).send({
        data: { isLogin: false },
        errorCode: "401",
        errorMessage: "请先登录！",
        success: true,
      });
      return;
    }
    res.send({
      success: true,
      data: {
        name: "Serati Ma",
        avatar:
          "https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png",
        userid: "00000001",
        email: "antdesign@alipay.com",
        signature: "海纳百川，有容乃大",
        title: "交互专家",
        group: "蚂蚁金服－某某某事业群－某某平台部－某某技术部－UED",
        notifyCount: 12,
        unreadCount: 11,
        country: "China",
        access: getAccess(),
        address: "西湖区工专路 77 号",
        phone: "0752-268888888",
      },
    });
  },

  /** ====== USERS API (đúng format ProTable của bạn) ====== */
  "GET /api/users": (req: Request, res: Response) => {
    const page = Number(req.query.page || 1);
    const pageSize = Number(req.query.pageSize || 10);
    const keyword = String(req.query.keyword || "").trim().toLowerCase();

    let filtered = USERS;

    if (keyword) {
      filtered = USERS.filter((u) => {
        return (
          u.hoVaTen.toLowerCase().includes(keyword) ||
          u.maSo.toLowerCase().includes(keyword) ||
          u.email.toLowerCase().includes(keyword) ||
          String(u.dienThoai).includes(keyword)
        );
      });
    }

    const total = filtered.length;
    const start = (page - 1) * pageSize;
    const items = filtered.slice(start, start + pageSize);

    res.json({
      success: true,
      message: "OK",
      data: { items, page, pageSize, total },
    });
  },

  "GET /api/users/:id": (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const found = USERS.find((u) => u.id === id);

    if (!found) {
      res.status(404).json({ success: false, message: "Not found" });
      return;
    }

    res.json({ success: true, message: "OK", data: found });
  },

  "POST /api/users": async (req: Request, res: Response) => {
    await waitTime(400);
    const body = req.body || {};

    const newItem: User = {
      id: Date.now(),
      // default fallbacks
      xung: body.xung || "Mr",
      hoVaTen: body.hoVaTen || "",
      maSo: body.maSo || "",
      loaiGiayTo: body.loaiGiayTo || "",
      soGiayTo: body.soGiayTo || "",
      ngaySinh: body.ngaySinh || "",
      ngayCap: body.ngayCap || "",
      noiCap: body.noiCap || "",
      nguyenQuan: body.nguyenQuan || "",
      diaChiLienLac: body.diaChiLienLac || "",
      diaChiThuongTru: body.diaChiThuongTru || "",
      email: body.email || "",
      dienThoai: Number(body.dienThoai || 0),
      dienThoaiNB: Number(body.dienThoaiNB || 0),
      maThueTNCN: body.maThueTNCN || "",
      chiNhanh: body.chiNhanh || "",
      phongBan: body.phongBan || "",
      nhomKD: body.nhomKD || "",
      chucDanh: body.chucDanh || "",
      maSoThue: body.maSoThue || "",
      soTaiKhoan: body.soTaiKhoan || "",
      nganHang: body.nganHang || "",
      nguoiQL1: body.nguoiQL1 || "",
      nguoiQL2: body.nguoiQL2 || "",
      ghiChu: body.ghiChu || "",
      mucHoaHoang: Number(body.mucHoaHoang || 0),
      status: Boolean(body.status ?? true),
    };

    USERS = [newItem, ...USERS];
    res.json({ success: true, message: "Created", data: newItem });
  },

  "PUT /api/users/:id": async (req: Request, res: Response) => {
    await waitTime(400);
    const id = Number(req.params.id);
    const idx = USERS.findIndex((u) => u.id === id);

    if (idx === -1) {
      res.status(404).json({ success: false, message: "Not found" });
      return;
    }

    USERS[idx] = { ...USERS[idx], ...(req.body || {}) };
    res.json({ success: true, message: "Updated", data: USERS[idx] });
  },

  "DELETE /api/users/:id": async (req: Request, res: Response) => {
    await waitTime(300);
    const id = Number(req.params.id);
    const idx = USERS.findIndex((u) => u.id === id);

    if (idx === -1) {
      res.status(404).json({ success: false, message: "Not found" });
      return;
    }

    const deleted = USERS[idx];
    USERS = USERS.filter((u) => u.id !== id);

    res.json({ success: true, message: "Deleted", data: deleted });
  },

  /** ===== template login giữ nguyên ===== */
  "POST /api/login/account": async (req: Request, res: Response) => {
    const { password, username, type } = req.body;
    await waitTime(2000);

    if (password === "ant.design" && username === "admin") {
      res.send({ status: "ok", type, currentAuthority: "admin" });
      access = "admin";
      return;
    }
    if (password === "ant.design" && username === "user") {
      res.send({ status: "ok", type, currentAuthority: "user" });
      access = "user";
      return;
    }
    if (type === "mobile") {
      res.send({ status: "ok", type, currentAuthority: "admin" });
      access = "admin";
      return;
    }

    res.send({ status: "error", type, currentAuthority: "guest" });
    access = "guest";
  },

  "POST /api/login/outLogin": (_req: Request, res: Response) => {
    access = "";
    res.send({ data: {}, success: true });
  },

  "POST /api/register": (_req: Request, res: Response) => {
    res.send({ status: "ok", currentAuthority: "user", success: true });
  },

  "GET /api/500": (_req: Request, res: Response) => {
    res.status(500).send({
      timestamp: 1513932555104,
      status: 500,
      error: "error",
      message: "error",
      path: "/base/category/list",
    });
  },

  "GET /api/404": (_req: Request, res: Response) => {
    res.status(404).send({
      timestamp: 1513932643431,
      status: 404,
      error: "Not Found",
      message: "No message available",
      path: "/base/category/list/2121212",
    });
  },

  "GET /api/403": (_req: Request, res: Response) => {
    res.status(403).send({
      timestamp: 1513932555104,
      status: 403,
      error: "Forbidden",
      message: "Forbidden",
      path: "/base/category/list",
    });
  },

  "GET /api/401": (_req: Request, res: Response) => {
    res.status(401).send({
      timestamp: 1513932555104,
      status: 401,
      error: "Unauthorized",
      message: "Unauthorized",
      path: "/base/category/list",
    });
  },

  "GET  /api/login/captcha": getFakeCaptcha,
};
