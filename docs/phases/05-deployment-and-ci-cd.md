# 🚀 Phase 05: Deploy Lên Git (GitHub Pages & Vercel)

Mục tiêu của Phase này là hướng dẫn toàn bộ quy trình đẩy code lên Git (GitHub/GitLab) và thiết lập triển khai tự động (CI/CD) để bất kỳ ai trong nhóm bạn cũng có thể mở link trên điện thoại chơi ngay.

---

## 1. Khởi Tạo Git & Đẩy Code Lên GitHub

### Bước 1.1: Tạo file `.gitignore`
Đảm bảo file `.gitignore` ở thư mục gốc chứa các dòng sau:

```gitignore
node_modules
dist
dist-ssr
*.local
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?
```

### Bước 1.2: Commit code và tạo Repository
Mở terminal tại thư mục dự án:

```bash
# Khởi tạo Git repository
git init

# Thêm tất cả file vào staging
git add .

# Tạo commit đầu tiên
git commit -m "feat: complete mobile-first drinking game app"

# Đổi tên nhánh mặc định thành main
git branch -M main

# Liên kết với kho chứa trên GitHub (Thay <your-username> và <repo-name> bằng thông tin của bạn)
git remote add origin https://github.com/<your-username>/<repo-name>.git

# Đẩy code lên GitHub
git push -u origin main
```

---

## 2. Cách Triển Khai 1: Deploy Lên Vercel (Khuyên Dùng ⭐⭐⭐)

> **Ưu điểm**:
> - Hoàn toàn miễn phí, tốc độ tải cực nhanh tại Việt Nam.
> - Tự động build và deploy lại mỗi khi bạn commit code mới lên GitHub.
> - Không cần chỉnh sửa đường dẫn `base` trong `vite.config.js`.

### Các bước thực hiện:
1. Truy cập [vercel.com](https://vercel.com) và chọn **Sign in with GitHub**.
2. Tại trang Dashboard, bấm nút **"Add New..."** ➔ Chọn **"Project"**.
3. Danh sách kho lưu trữ GitHub của bạn sẽ hiện ra, tìm repository của dự án và bấm **"Import"**.
4. Vercel sẽ tự động phát hiện framework là **Vite**:
   - **Framework Preset**: Vite
   - **Root Directory**: `./` (hoặc tên thư mục chứa app nếu bạn để trong folder con)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Bấm nút **"Deploy"**.
6. Sau khoảng 30–45 giây, Vercel sẽ cung cấp link công khai có dạng:  
   👉 `https://<ten-du-an>.vercel.app`  
   Bạn có thể quét mã QR hoặc gửi link này vào nhóm chat Messenger/Zalo cho hội bạn bè!

---

## 3. Cách Triển Khai 2: Deploy Lên GitHub Pages

Nếu bạn muốn trang web chạy trực tiếp dưới tên miền `https://<username>.github.io/<repo-name>/`, hãy làm theo 3 bước sau:

### Bước 3.1: Cấu hình `base` trong `vite.config.js`
Mở file `vite.config.js` và thêm thuộc tính `base` là tên repository GitHub của bạn:

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Thay 'drinking-game' bằng tên chính xác của repository trên GitHub
  base: '/drinking-game/',
})
```

### Bước 3.2: Tạo GitHub Actions Workflow
Tạo file `.github/workflows/deploy.yml` trong dự án:

```yaml
name: Deploy Drinking Game to GitHub Pages

on:
  push:
    branches: [ main ]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: 'pages'
  cancel-in-progress: true

jobs:
  build-and-deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout mã nguồn
        uses: actions/checkout@v4

      - name: Cài đặt Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Cài đặt dependencies
        run: npm ci

      - name: Build ứng dụng
        run: npm run build

      - name: Thiết lập GitHub Pages
        uses: actions/configure-pages@v4

      - name: Tải lên artifact thư mục dist
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'

      - name: Triển khai lên GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### Bước 3.3: Bật GitHub Pages trên GitHub
1. Vào trang GitHub của dự án ➔ Bấm vào tab **Settings**.
2. Ở cột menu bên trái, chọn **Pages**.
3. Tại phần **Build and deployment > Source**, đổi từ *Deploy from a branch* sang **GitHub Actions**.
4. Push commit mới lên nhánh `main`:
   ```bash
   git add .
   git commit -m "ci: add github pages deployment workflow"
   git push
   ```
5. Đợi tab **Actions** chạy xong tích xanh, trang web của bạn sẽ hiển thị tại:  
   👉 `https://<your-username>.github.io/<repo-name>/`

---

## 4. Tạo Mã QR Để Quét Nhanh Trên Bàn Nhậu

Sau khi đã có link Vercel hoặc GitHub Pages:
1. Bạn có thể dùng trang [qr-code-generator.com](https://www.qr-code-generator.com/) để tạo mã QR.
2. Lưu ảnh mã QR về điện thoại hoặc dán vào nắp chai/bàn nhậu để bạn bè quét camera là vào chơi ngay lập tức không cần gõ URL!

---

## 5. Tổng Kết Toàn Bộ Dự Án
Chúc mừng bạn đã hoàn thành trọn vẹn cả 5 Phase phát triển và triển khai web Drinking Game!
- 📂 Danh mục tài liệu: [phases/README.md](file:///c:/Users/trong/Downloads/Code/phases/README.md)
- 📌 Kế hoạch tổng thể: [PLAN.md](file:///c:/Users/trong/Downloads/Code/PLAN.md)
