import Layout from '@/components/Layout'
import EventItem from '@/components/EventItem'
import {API_URL} from '@/config/index'
export default function EventsPage({ events }) {
  return (
    <Layout>
      <h1>Upcoming Events</h1>
      
      { events.length === 0 && <h3>No Events Found</h3> }
      { events.map((evt) => ( 
          <EventItem key={evt.id} evt={evt.attributes} />  
      ))}

    </Layout>
  )
}

export async function getStaticProps() {
  const res = await fetch(`${API_URL}/api/events?populate=*&sort=date:desc`)
  const json = await res.json()
  const events = json.data

  return {
    props: { events: events },
    revalidate: 1,
  }

}