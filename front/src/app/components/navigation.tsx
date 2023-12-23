import Link from 'next/link'

export default function Navigation() {
  return (
    <nav className="bg-gray-200 p-5">
      <ul className="flex gap-x-4">
        <li>
          <Link href="./">
            TOP
          </Link>
        </li>
        <li>
          <Link href="/manager">
            タスク確認
          </Link>
        </li>
        <li>
          <Link href="/edit">
            タスク追加・編集
          </Link>
        </li>
      </ul>
    </nav>
  )
}
