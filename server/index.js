const express = require("express");
const bodyParser = require("body-parser");
const path = require("path"); // Thêm thư viện path để xử lý đường dẫn file

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));

// APIs
app.get("/hello", (req, res) => {
  res.json({ message: "Hello from server!" });
});
app.use("/api/admin", require("./api/admin.js"));
app.use("/api/customer", require("./api/customer.js"));

// --- CẤU HÌNH HOSTING CHO MERN STACK (LAB 10) ---

// 1. Cấu hình cho client-admin
// Phục vụ các file tĩnh (css, js, img) từ thư mục build của admin
app.use(
  "/admin",
  express.static(path.resolve(__dirname, "../client-admin/build")),
);
// Điều hướng mọi request có tiền tố /admin/* về file index.html của admin (dành cho React Router)
app.get("/admin/*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client-admin/build", "index.html"));
});

// 2. Cấu hình cho client-customer (Trang chủ)
// Phục vụ các file tĩnh từ thư mục build của customer
app.use(
  "/",
  express.static(path.resolve(__dirname, "../client-customer/build")),
);
// Điều hướng tất cả các request còn lại về index.html của customer
app.get("*", (req, res) => {
  res.sendFile(
    path.resolve(__dirname, "../client-customer/build", "index.html"),
  );
});

// --- KẾT THÚC CẤU HÌNH HOSTING ---

// Start server
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
