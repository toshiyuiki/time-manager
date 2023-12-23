# Time Manager - Docker Next
*Nodejs 20  
*Docker 24 - in Nodejs20 postgres15  
*ChatWork API  
*Vercel Cron

*ChatWorkのAPIキーが必要になります。  
*Vercelのcronを使用しているので（vercel.json）、ローカルでメッセージ送信を確認したい場合はapi/cronにアクセスしてください。

## about  
タスク追加・編集からタスクを追加。  
期限の７日前に連絡日が自動で設定されます。  
cronで現在の日付が連絡日を過ぎているとChatworkにメッセージが送信されます。  
メッセージ内にアプリのURLを記載してるので、そこからタスクの更新が可能。  
タスクのUPDATEを行うと、更新期間に応じて期限と連絡日が更新されます。

## 手順

### DB設定  
/.envを作成してDB情報を入力します。  

    DB_HOST=db
    DB_NAME=db_name
    DB_USER=db_user
    DB_PASS=db_pass

### コンテナ起動→Prismaのinit

    docker-compose up -d
    cd front
    npm i
    npx prisma init

#### nextのenv設定

    /front/.env  

prisma init時に自動で生成されてます。  
コンテナのDBへの接続設定を入力。APIKEYも入れます。  

    DATABASE_URL="postgresql://db_user:db_pass@localhost:5432/db_name?schema=public"
    CHATWORK_API="APIKEY"
    CHATWORK_ROOM="Chatworkメッセージ送信先のroomID"


#### prismaスキーマの設定

    /front/prisma/schema.prisma  

prisma init時に自動で生成されてます。 
以下をもろもろを入力。  

    generator client {
    provider = "prisma-client-js"
    }

    datasource db {
    provider = "postgresql"
    url      = env("DATABASE_URL")
    }

    model task {
    id         Int       @id @default(autoincrement())
    time_limit DateTime?
    time_title String?
    time_msg   DateTime?
    time_next  String?
    time_text  String?
    time_link  String?
    created_at DateTime  @default(now())
    updated_at DateTime? @updatedAt
    }


#### Prisma をDBへPush

    npx prisma db push
    npx prisma generate

#### nextを起動

    npm run dev