因為原本我就已經有 MySQL 練習環境，所以在 config/config.json 的 password 是 `root` ，助教在批改時候再看要不再改成 `password`
因為題目沒有要求搜尋功能，所以我間 disable 搜尋的功能

# 餐廳收藏資網站料庫 CRUD 操作作業
在伺服器啟動期間使用者在瀏覽器輸入 http://localhost:3000/ 會開啟網站頁面

## Features 網站功能
* 使用者可以新增一家餐廳
* 使用者可以瀏覽一家餐廳的詳細資訊
* 使用者可以瀏覽全部所有餐廳
* 使用者可以修改一家餐廳的資訊
* 使用者可以刪除一家餐廳

## Environment Requirement 環境需求
* 必須已經安裝 Nodejs 執行環境
* git 套件
* 已經安裝 MySQL Server

## Execution 執行方式
**Winsows 執行環境注意事項**
    其專案所在路徑不可以有空白字元 ex: `C:\alpha camp\my folder` 跟含有非英文非 ASCII 字元 ex: `C:\Users\吳柏毅\dev`

**步驟 Step**
1. 先用 git clone 從 github repositories 複製檔案，使用 ssh 協定。
```sh
git clone git@github.com:weijieChi/DevC4BackendM1TaskRestautantDatabaseCRUD.git
```
2. 進入專案所在目錄
```sh
cd ./DevC4BackendM1TaskRestautantDatabaseCRUD
```
3. 使用 npm 安裝執行所需的套件。
```sh
npm install
```
4. 使用 seuqelize-cli 建立 database table
```sh
npx sequelize db:migrate
```
5. 使用 seuqelize-cli 建立初始資料
```sh
npx sequelize db:seed:all
```
5. 透過 npm 執行伺服器程式。
```sh
npm run start
```
6. 在瀏覽器網址列輸入 `http://localhost:3000/` 就可以打開網頁了

7. 最後要關閉伺服器就在 terminal 案 `ctrl` + `C` 再按 `y` + `enter` 關閉 nodejs 伺服器。