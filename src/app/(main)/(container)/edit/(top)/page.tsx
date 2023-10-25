"use client"

import Link from "next/link"

import ContainerTitle from "~/components/ContainerTitle"

export default function EditPage() {
  const [entries, setEntries] = useEntries()

  return (
    <>
      <ContainerTitle
        title="Editor"
        desc="このタブは設定で非表示にできるよん"
      />
      <section>
        <h2>リスト</h2>
        <div>
          <Link href="/edit/entry?id=hoge">a</Link>
          {entries.map((e, i) => (
            <Link href={`/edit/entry?id=${e.id}`} key={i} />
          ))}
        </div>
      </section>
      <section>
        <h2>json</h2>
        <textarea className="h-32 w-full resize-none rounded-md bg-stone-700 p-1.5 font-mono text-xs">
          {JSON.stringify(entries, null, 2)}
        </textarea>
      </section>
    </>
  )
}
