import Layout from '@/components/Layout'
import EventItem from '@/components/EventItem'
import {API_URL} from '@/config/index'
import Link from 'next/link'

export default function HomePage({ events }) {
  return (
    <Layout>
      <h1>Upcoming Events</h1>
      
      { events.length === 0 && <h3>No Events Found</h3> }
      { events.map((evt) => ( 
          <EventItem key={evt.id} evt={evt.attributes} />  
      ))}

      { events.length > 0 && (
      <Link href="/events">
        <a className="btn-secondary">View All Events</a>
      </Link>
      )}

    </Layout>
  )
}

export async function getStaticProps() {
    const res = await fetch(`${API_URL}/api/events?populate=*&sort=date:desc&pagination[pageSize]=3`)
    const json = await res.json()
    const events = json.data
    
    return {
      props: { events: events },
      revalidate: 1,
    }

}