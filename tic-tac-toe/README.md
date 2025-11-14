# IA04: React Tutorial

Đây là một ứng dụng web cho trò chơi Tic-Tac-Toe cổ điển, được xây dựng bằng React. Dự án này không chỉ hiện thực hóa logic cốt lõi của trò chơi mà còn tích hợp nhiều tính năng nâng cao để cải thiện trải nghiệm người dùng và chất lượng mã nguồn.

## Triển khai ứng dụng

Có thể truy cập web Tic-Tac-Toe của đồ án này tại: [Tic-Tac-Toe Link](https://wad-ia04-23122004.netlify.app)

## Các tính năng chính

1.  **Hiển thị nước đi hiện tại:** Thay vì hiển thị một nút cho nước đi hiện tại trong danh sách lịch sử, ứng dụng sẽ hiển thị một dòng chữ đơn giản như "Bạn đang ở nước đi số #..." để người dùng dễ dàng nhận biết.

2.  **Tạo bàn cờ bằng vòng lặp:** Thành phần (component) `Board` đã được tái cấu trúc để sử dụng hai vòng lặp lồng nhau để tạo ra các ô cờ. Cách tiếp cận này giúp mã nguồn trở nên gọn gàng, dễ bảo trì và mở rộng hơn so với việc viết mã cứng (hardcode) từng ô một.

3.  **Sắp xếp lịch sử nước đi:** Thêm một nút bật/tắt (toggle button) cho phép người dùng sắp xếp danh sách lịch sử các nước đi theo thứ tự tăng dần hoặc giảm dần.

4.  **Làm nổi bật các ô chiến thắng và xử lý hòa:** Khi có người chiến thắng, ba ô cờ tạo nên đường thắng sẽ được làm nổi bật để người dùng dễ dàng nhận ra. Trong trường hợp không có ai thắng (hòa), một thông báo sẽ được hiển thị.

5.  **Hiển thị vị trí nước đi:** Trong danh sách lịch sử, mỗi nước đi sẽ được hiển thị kèm theo vị trí của nó trên bàn cờ theo định dạng `(hàng, cột)`.

6.  **Giao diện người dùng hiện đại:** Ứng dụng có giao diện tối (dark theme) hiện đại, lấy cảm hứng từ thiết kế do người dùng cung cấp, với nền gradient màu xanh-tím, các nút được tạo kiểu và bố cục được căn giữa.

7.  **Nút "Chơi lại":** Nút "Bắt đầu lại trò chơi" được thay thế bằng nút "Chơi lại" thân thiện với người dùng hơn, xuất hiện khi ván chơi kết thúc (thắng hoặc hòa), cho phép người dùng nhanh chóng bắt đầu một ván mới.

## Cấu trúc đồ án
```plaintext
WAD-IA-04/
├── .gitignore          
├── README.md           
├── package-lock.json   
├── package.json        
│
├── public/             
│   └── index.html     
│
└── src/                   
    ├── App.js         
    ├── index.js 
    └── style.css   
```

## Hướng dẫn cài đặt và chạy

Làm theo các bước sau để thiết lập và chạy dự án trên máy của bạn.

### Yêu cầu

-   [Node.js](https://nodejs.org/) (phiên bản 12.x trở lên)
-   [npm](https://www.npmjs.com/) (thường được cài đặt cùng với Node.js)

### Cài đặt

1.  **Sao chép (clone) kho mã nguồn này về máy của bạn:**
    ```bash
    git clone https://github.com/htrung1105/WAD-IA04.git
    ```

2.  **Đi đến thư mục của dự án:**
    ```bash
    cd WAD-IA04
    ```

3.  **Cài đặt các gói phụ thuộc (dependencies):**
    ```bash
    npm install
    ```

### Chạy ứng dụng

1.  **Khởi động máy chủ phát triển (development server):**
    ```bash
    npm start
    ```
    Lệnh này sẽ chạy ứng dụng ở chế độ phát triển.

2.  **Mở trình duyệt của bạn và truy cập:**
    [http://localhost:3000](http://localhost:3000)

    Trang web sẽ tự động tải lại nếu bạn thực hiện bất kỳ thay đổi nào trong mã nguồn.

### Xây dựng (Build) cho môi trường Production

Nếu bạn muốn tạo một phiên bản tối ưu hóa của ứng dụng cho môi trường production, hãy chạy lệnh sau:

```bash
npm run build
```

Lệnh này sẽ tạo một thư mục `build` trong thư mục gốc của dự án với các tệp tĩnh của ứng dụng. Sau đó, bạn có thể triển khai thư mục `build` này lên bất kỳ nhà cung cấp dịch vụ lưu trữ (hosting) nào.

## Tham khảo

Tham khảo thêm về React App tại: [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

Để học về React, truy cập: [React documentation](https://reactjs.org/).
