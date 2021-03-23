import React from "react"
import withStyles from "react-jss"

const styles = {
  dataContainer: {
    display: "flex",
    flexDirection: "column",
    marginTop: "2rem",
    width: "95%",
    maxWidth: "900px",
    margin: "0 1rem",
  },
  row: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    flexDirection: "column",
    padding: "0.6rem 1.7rem",
    border: "1px solid black",
  },
  location: {},
  title: {
    margin: "0.6rem 0",
    fontWeight: "bold",
    fontSize: "18px",
  },
  city: {
    margin: "0.6rem 0",
    fontSize: "13px",
  },
  eventCity: {
    margin: "-0.3rem 0 0.6rem 0",
    fontSize: "13px",
  },
  quote: {
    padding: "0 0 0 15px",
    fontSize: "14px",
    fontWeight: "bold",
    margin: "0 0",
    borderLeft: "3px solid red",
    margin: "0.4rem 0",
  },
  expand: {
    margin: "0.6rem 0 1rem 0",
    fontSize: "14px",
    fontWeight: "bold",
    textDecoration: "none",
    color: "black",
  },
  description: {
    margin: "0.6rem 0",
    fontSize: "14px",
  },
  image: {
    maxWidth: "100%",
    height: "auto",
    marginBottom: "1rem",
  },
  noData: {
    margin: "1.4rem 0",
    fontSize: "14px",
  },
}

const EssaysView = ({
  classes,
  data: { title, quote, location, link },
  city,
}) => {
  return (
    <>
      <p className={classes.title}>{title}</p>
      <p className={classes.quote}>"{quote}"</p>
      <p className={classes.city}>{city}</p>
      <a className={classes.expand} href={link}>
        READ MORE >
      </a>
    </>
  )
}

const EventView = ({ classes, data: { title, description, rsvp }, city }) => (
  <>
    <p className={classes.title}>{title}</p>
    <p className={classes.eventCity}>{city}</p>
    <p className={classes.description}>{description}</p>
    <a className={classes.expand} href={`mailto:${rsvp}`} target="_blank">
      RSVP
    </a>
  </>
)

const SocialView = ({ classes, data: { title, image } }) => (
  <>
    <p className={classes.title}>{title}</p>
    <img className={classes.image} src={image} alt="Instagram post" />
  </>
)

const NoEventView = ({ classes, state }) => {
  return (
    <div className={classes.dataContainer}>
      <div className={classes.row}>
        <p className={classes.noData}>
          Looks like there's nothin in {state} yet!
          <br />
          <br />
          Check back for updates, and check out some of the resources below in
          the meantime!
        </p>
      </div>
    </div>
  )
}

const FilteredData = ({ classes, data, activeState }) => {
  const viewData = (type, data, city) => {
    if (type === "essays") {
      return <EssaysView classes={classes} data={data} city={city} />
    } else if (type === "events") {
      return <EventView classes={classes} data={data} city={city} />
    } else if (type === "social") {
      return <SocialView classes={classes} data={data} city={city} />
    }
  }

  return data.length ? (
    data.map(({ type, data, city, state }, i) => (
      <div className={classes.dataContainer} key={i}>
        <div className={classes.row}>
          {viewData(type, data, `${city}, ${state}`)}
          {/* <p className={classes.location}>{`${city}, ${state}`}</p> */}
        </div>
      </div>
    ))
  ) : (
    <NoEventView classes={classes} state={activeState} />
  )
}

export default withStyles(styles)(FilteredData)
