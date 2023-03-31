import useLoading from '../../hooks/useLoading'

async function loadEntries() {
  const res = await fetch('https://api.publicapis.org/entries')
  const data = await res.json()
  return data
}

export async function getServerSideProps() {
  const entries = await loadEntries()

  return {
    props: {
      entries,
    },
  }
}

export default function Posts({ entries = { entries: [] } }) {
  console.log(entries)
  const isLoading = useLoading()

  return (
    <>
      {isLoading && <h1>Loading...</h1>}

      {!isLoading &&
        entries.entries.map((post, index) => (
          <div key={index}>{post.Description}</div>
        ))}
    </>
  )
}
