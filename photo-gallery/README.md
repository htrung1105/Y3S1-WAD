# IA05: Picsum Photo Gallery

Mô tả: Xây dựng ứng dụng React có thể fetch và hiển thị danh sách ảnh từ Lorem Picsum API.

Bài tập này được tham khảo bởi: [Create Creat App](https://github.com/facebook/create-react-app).

## Triển khai ứng dụng web

Ứng dụng web Picsum Photo Gallery đã được triển khai trên Netlify, truy cập trực tiếp: [Picsum Photo Gallery]([https://wad-ia05-23122004.netlify.app/])

## 1. Các công nghệ sử dụng:
- **React:** Một thư viện JavaScript front-end để xây dựng giao diện người dùng, được sử dụng để tạo các thành phần giao diện có thể tái sử dụng và quản lý trạng thái ứng dụng một cách hiệu quả.
- **React Router:** Một thư viện định tuyến (routing) cho React, cho phép điều hướng giữa các trang khác nhau trong một ứng dụng đơn trang (Single Page Application) mà không cần tải lại trang.
- **Axios:** Một thư viện HTTP client dựa trên Promise, được sử dụng để thực hiện các yêu cầu API nhằm lấy dữ liệu ảnh từ Lorem Picsum.
- **HTML:** Ngôn ngữ đánh dấu siêu văn bản, được sử dụng làm cấu trúc xương sống cho ứng dụng web.
- **CSS:** Ngôn ngữ định dạng, được sử dụng để tạo kiểu và bố cục cho giao diện người dùng, đảm bảo thiết kế đáp ứng và hấp dẫn về mặt hình ảnh.
- **VS Code:** Trình soạn thảo mã nguồn được sử dụng để phát triển, gỡ lỗi và quản lý dự án.

## 2. Thông số kỹ thuật chức năng

### 2.1 Mục đích và Phạm vi
Mục đích của dự án này là xây dựng một ứng dụng web React có khả năng tìm và hiển thị danh sách ảnh từ API Lorem Picsum. Ứng dụng cho phép người dùng cuộn vô hạn để tải thêm ảnh và xem chi tiết của một ảnh cụ thể khi nhấp vào. Phạm vi của dự án bao gồm các tính năng được liệt kê dưới đây.

### 2.2 Các tính năng chính
- **Hiển thị Lưới/Danh sách Ảnh:**
  - Lấy danh sách ảnh từ API công khai của Lorem Picsum.
  - Hiển thị ảnh dưới dạng lưới đáp ứng, mỗi ảnh bao gồm một hình thu nhỏ và tên tác giả.
- **Cuộn vô hạn (Tải thêm khi cuộn):**
  - Tự động tải thêm ảnh từ API khi người dùng cuộn xuống cuối trang.
  - Sử dụng tham số `page` của API để lấy các trang ảnh tiếp theo.
  - Hiển thị chỉ báo tải (loading indicator) khi đang tìm nạp ảnh mới.
  - Xử lý trường hợp không còn ảnh để tải.
- **Xem Chi tiết Ảnh khi Nhấp:**
  - Điều hướng đến một trang xem chi tiết khi người dùng nhấp vào một ảnh.
  - Chế độ xem chi tiết hiển thị:
    - Hình ảnh kích thước đầy đủ.
    - Tên tác giả.
    - Văn bản giữ chỗ cho tiêu đề và mô tả (nếu có).
- **Điều hướng và Định tuyến:**
  - Sử dụng React Router để điều hướng giữa trang danh sách và trang chi tiết.
  - Triển khai các URL phù hợp như `/` cho danh sách và `/photos/:id` cho chế độ xem chi tiết.
- **Tích hợp API:**
  - Sử dụng điểm cuối API chính thức để lấy danh sách ảnh và chi tiết từng ảnh.
  - Xử lý các trạng thái tải và lỗi một cách thích hợp trong quá trình tìm nạp dữ liệu.

### 2.3 Đầu vào và hiển thị của người dùng
- **Đầu vào của người dùng:** Người dùng tương tác với ứng dụng bằng cách cuộn trang để tải thêm ảnh và nhấp vào một ảnh để xem chi tiết.
- **Xử lý hiển thị:** Màn hình chính hiển thị một lưới các ảnh thu nhỏ. Khi người dùng cuộn, các ảnh mới sẽ được thêm vào lưới. Khi nhấp vào một ảnh, ứng dụng sẽ điều hướng đến một trang mới hiển thị hình ảnh lớn hơn cùng với thông tin chi tiết của nó.

## 3. Thông số kỹ thuật phi chức năng
- **Hiệu suất:** Ứng dụng phản hồi nhanh chóng với các tương tác của người dùng, cuộn vô hạn mượt mà và cập nhật giao diện ngay lập tức.
- **Tính khả dụng:** Bố cục rõ ràng, trực quan và dễ sử dụng, giúp người dùng dễ dàng duyệt và khám phá ảnh.
- **Khả năng tương thích giữa các trình duyệt:** Ứng dụng tương thích với các phiên bản mới nhất của các trình duyệt web hiện đại, bao gồm Chrome, Edge, Firefox và Safari.
- **Thiết kế đáp ứng:** Thiết kế hoàn toàn đáp ứng và thích ứng với cả kích thước màn hình máy tính để bàn và di động.
- **Độ tin cậy và khả năng bảo trì:** Mã được cấu trúc tốt bằng cách sử dụng các thành phần React, giúp nó đáng tin cậy và dễ bảo trì hoặc mở rộng trong tương lai.

## 4. Tiêu chí chấp nhận
- Danh sách ảnh được tải thành công từ API và hiển thị chính xác trên trang chính.
- Cuộn xuống cuối trang sẽ kích hoạt việc tải và hiển thị thêm ảnh.
- Nhấp vào một ảnh sẽ điều hướng người dùng đến URL chi tiết chính xác.
- Trang chi tiết hiển thị đúng hình ảnh kích thước đầy đủ và thông tin của nó.
- Thiết kế ổn định và có thể sử dụng được trên các trình duyệt và thiết bị khác nhau.
- Ứng dụng xử lý các trạng thái tải một cách hiệu quả.

## 5. Cấu trúc thư mục
photo-gallery/\
├── public/\
│   ├── favicon.ico\
│   └── index.html\
├── src/\
│   ├── components/\
│   │   ├── PhotoDetail.js\
│   │   └── PhotoList.js\
│   ├── App.css/\
│   ├── App.js\
│   ├── index.css\
│   └── index.js\
├── package.json\
└── README.md\

## 6. Hướng dẫn sử dụng

Trong đường dẫn thư mục `photo gallery`, sử dụng các câu lệnh:

### `npm start`

Chạy ứng dụng trong chế độ development.\
Mở [http://localhost:3000](http://localhost:3000) để xem ứng dụng trên trình duyệt.\

Nếu muốn xây dựng ứng dụng thành sản phẩm để triển khai thư mục `build`, sử dụng câu lệnh:

### `npm run build`

Lệnh này đóng gói React một cách chính xác ở chế độ production và tối ưu hóa bản dựng (build) để có hiệu suất tốt nhất.

Bản dựng được rút gọn chứa các mã băm. Ứng dụng của bạn đã sẵn sàng để được triển khai!

Xem mục về [deployment](https://facebook.github.io/create-react-app/docs/deployment) để biết thêm thông tin.

### `npm run eject`

**Lưu ý: đây là thao tác một chiều. Một khi đã eject, bạn không thể quay lại!**

Nếu bạn không hài lòng với công cụ xây dựng (build tool) và các lựa chọn cấu hình, bạn có thể eject bất cứ lúc nào. Lệnh này sẽ loại bỏ sự phụ thuộc (dependency) xây dựng duy nhất ra khỏi dự án của bạn.

Thay vào đó, nó sẽ sao chép tất cả các tệp cấu hình và các phụ thuộc bắc cầu (webpack, Babel, ESLint, v.v.) trực tiếp vào dự án của bạn để bạn có toàn quyền kiểm soát chúng. Tất cả các lệnh (ngoại trừ eject) sẽ vẫn hoạt động, nhưng chúng sẽ trỏ đến các script đã được sao chép để bạn có thể tinh chỉnh chúng. Kể từ lúc này, bạn sẽ phải tự mình quản lý.

Bạn không nhất thiết phải sử dụng eject. Bộ tính năng được tuyển chọn phù hợp cho các đợt triển khai quy mô vừa và nhỏ, và bạn không nên cảm thấy bắt buộc phải sử dụng tính năng này. Tuy nhiên, chúng tôi hiểu rằng công cụ này sẽ không hữu ích nếu bạn không thể tùy chỉnh nó khi bạn đã sẵn sàng.
## Tham khảo thêm

Tham khảo thêm tại [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

Để học thêm về React, truy cập [React documentation](https://reactjs.org/).