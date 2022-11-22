import Layout from "@/components/Layout"
import {FaPencilAlt, FaTimes} from "react-icons/fa"
import { API_URL } from "@/config/index"
import styles from "@/styles/Event.module.css"
import Link from "next/link"
import Image from "next/image"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/router"

export default function EventPage( { evt }) {

  const router = useRouter()

  const deleteEvent = async (e) => {
    if(confirm('Are you sure?')){
      const res = await fetch(`${API_URL}/api/events/${evt.id}`, {
        method: 'DELETE'
      })

      const json = await res.json()
      const data = json.data

      if (!res.ok) {
        toast.error(data.message)
      } else {
        router.push('/events')
      }

    }
  }

  return (
    <Layout>
        <div className={styles.event}>

          <div className={styles.controls}>
            <Link href={`edit/${evt.id}`}>
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

          <ToastContainer theme="dark" />

          {evt.attributes.image && (
            <div className={styles.image}>
              <Image alt={evt.attributes.name} 
              src={
                evt.attributes.image && evt.attributes.image.data
                ? evt.attributes.image.data.attributes.formats.large.url
                : '/images/event-default.png'
              } 
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
