import Layout from "@/components/Layout"
import {FaPencilAlt, FaTimes} from "react-icons/fa"
import { API_URL } from "@/config/index"
import styles from "@/styles/Event.module.css"
import Link from "next/link"
import Image from "next/image"


export default function EventPage( { evt }) {

  const deleteEvent = (e) => {
    console.log("delete")
  }

  return (
    <Layout>
        <div className={styles.event}>

          <div className={styles.controls}>
            <Link href={`events/edit/${evt.id}`}>
              <a>
                <FaPencilAlt /> Edit Event
              </a>
            </Link>
            
            <a href="#" className={styles.delete} onClick={deleteEvent}>
              <FaTimes /> Delete Event
            </a>
          </div>

          <span>
            {new Date(evt.attributes.date).toLocaleDateString('en-GB')} at {evt.attributes.time}
          </span>
          <h1>{evt.attributes.name}</h1>

          {evt.attributes.image && (
            <div className={styles.image}>
              <Image alt={evt.attributes.name} 
              src={evt.attributes.image.data.attributes.formats.large.url} 
              width={960} 
              height={600} 
            />
            </div>
          )}

          <h3>Performers:</h3>
          <p>{evt.attributes.performers}</p>
          <h3>Description:</h3>
          <p>{evt.attributes.description}</p>
          <h3>Venue: {evt.attributes.venue}</h3>
          <p>{evt.attributes.address}</p>

          <Link href='/events'>
            <a className={styles.back}>{'<'} Go Back</a>
          </Link>

        </div>
    </Layout>
  )
}

export async function getStaticPaths() {
  const res = await fetch(`${API_URL}/api/events?populate=*`)
  const json = await res.json()
  const events = json.data
  const paths = events.map((evt) => ({
     params: { slug: evt.attributes.slug },
  }))

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps( { params: {slug} } ){

  const res = await fetch(`${API_URL}/api/events/?filters[slug][$eq]=${slug}&populate=*`)
  const json = await res.json()
  const events = json.data

  return {
    props: {
      evt: events[0],
    },
    revalidate: 1,
  }
}

/*export async function getServerSideProps( {query: {slug}} ){

  const res = await fetch(`${API_URL}/api/events/${slug}`)
  const events = await res.json()

  return {
    props: {
      evt: events[0],
    },
  }

}*/
