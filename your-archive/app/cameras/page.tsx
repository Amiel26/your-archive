import { createClient } from '@/lib/supabase/server'

export default async function CamerasPage() {
  const supabase = await createClient()

  const { data: cameras, error } = await supabase
    .from('cameras')
    .select('id, code, name, subtitle, day_rate, week_rate, categories(name)')
    .eq('is_active', true)
    .order('day_rate')

  if (error) {
    return <p className="p-6 text-red-600">Error: {error.message}</p>
  }

  return (
    <main className="mx-auto max-w-5xl p-6">
      <h1 className="mb-6 text-3xl font-semibold">Archival Vault &amp; Rental Catalog</h1>

      <div className="grid gap-4 md:grid-cols-2">
        {cameras?.map((c) => (
          <article key={c.id} className="rounded-lg border p-5">
            <p className="text-xs uppercase tracking-wide text-pink-800">
              ID: {c.code}
            </p>
            <h2 className="mt-1 text-lg font-medium">{c.name}</h2>
            <p className="mt-1 text-sm text-gray-600">{c.subtitle}</p>
            <div className="mt-4 flex items-baseline justify-between">
              <b>${c.day_rate} / day</b>
              <span className="text-sm text-gray-500">${c.week_rate} / 7 days</span>
            </div>
          </article>
        ))}
      </div>
    </main>
  )
}