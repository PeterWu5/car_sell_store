import "./globals.css";

export const metadata = {
  title: "曜车行 | 二手车辆售卖店",
  description:
    "中国高端二手车展厅风格单页，展示实景车源、分期试算、购车流程与到店预约。",
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
