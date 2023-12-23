export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="p-5">
        <section className="about mb-8">
          <div>
            <h2 className="border-b-2 border-gray-200 pb-4 mb-4">About</h2>
            <p>
              タイムキーパーアプリケーションです。<br />
              指定された期限の7日前からCronで毎日Chatworkへメッセージを送信します。<br />
              主にドメイン、レンタルサーバーの更新管理などをターゲットにしています。<br />
              「タスク確認」からUPDATEすると設定された更新期間に合わせて、次回の更新日付に更新されます。<br />
              「タスク追加・編集」からタスクの追加と、タスクの編集が可能です。<br />
              URLにはドメイン、レンタルサーバーのURLを設定するとより便利に利用できます。
            </p>
          </div>
        </section>
        <section className="tool">
          <div>
            <h2 className="border-b-2 border-gray-200 pb-4 mb-4">可能ツール</h2>
            <ul>
              <li>
                ChatWork
              </li>
            </ul>
          </div>
        </section>
      </div>
    </main>
  )
}
