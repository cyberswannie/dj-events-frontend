import Link from "next/link"
import Image from "next/image"
import styles from "@/styles/EventItem.module.css"

export default function EventItem({evt}) {

  return (
    <div className={styles.event}>
        
        <div key={ evt.id } className={styles.img}>
            <Image alt={ evt.name } src={ evt.image ? evt.image : "/images/event-default.png" } width={170} height={100} />
        </div>

        <div className={ styles.info }>
            <span>{ evt.date } at { evt.time }</span>
            <h4>{ evt.name }</h4>
        </div>

        <div className={styles.link}>
            <Link href={ `events/${ evt.slug }` }>
                <a className="btn">Details</a>
            </Link>
        </div>

    </div>

  )
}
