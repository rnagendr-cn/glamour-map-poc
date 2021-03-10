import React from "react"
import withStyles from "react-jss"

const styles = {
  dataContainer: {
    display: "flex",
    flexDirection: "column",
    marginTop: "2rem",
    width: "100%",
    maxWidth: "900px",
    margin: "0 1rem",
  },
  containerHeading: {
    marginLeft: "1rem",
  },
  row: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    flexDirection: "column",
    padding: "0.4rem 1.4rem",
    border: "1px solid black",
    borderRadius: "6px",
    // width: "100%",
  },
  location: {},
  title: {
    margin: "0.6rem 0",
    fontWeight: "bold",
    fontSize: "16px",
  },
  quote: {
    padding: "0 0 0 15px",
    fontSize: "14px",
    fontWeight: "bold",
    margin: "0 0",
    borderLeft: "3px solid red",
  },
  expand: {
    margin: "0.6rem 0",
    fontSize: "14px",
  },
  description: {
    margin: "0.6rem 0",
    fontSize: "14px",
  },
  image: {
    maxWidth: "100%",
    height: "auto",
    // alignSelf: "center",
  },
}

const EssaysView = ({ classes, data: { title, quote, location, link } }) => {
  return (
    <>
      <p className={classes.title}>{title}</p>
      <p className={classes.quote}>"{quote}"</p>
      <a className={classes.expand} href={link}>
        Read More
      </a>
    </>
  )
}

const EventView = ({ classes, data: { title, description } }) => (
  <>
    <p className={classes.title}>{title}</p>
    <p className={classes.description}>{description}</p>
  </>
)

const SocialView = ({ classes, data: { title, image } }) => (
  <>
    <p className={classes.title}>{title}</p>
    <img className={classes.image} src={image} alt="Instagram post" />
  </>
)

const FilteredData = ({ classes, data }) => {
  const viewData = (type, data) => {
    if (type === "essays") {
      return <EssaysView classes={classes} data={data} />
    } else if (type === "events") {
      return <EventView classes={classes} data={data} />
    } else if (type === "social") {
      return <SocialView classes={classes} data={data} />
    }
  }

  return (
    data &&
    data.map((data, i) => (
      <div className={classes.dataContainer} key={i}>
        <h3 className={classes.containerHeading}>Resources</h3>
        <div className={classes.row}>
          {viewData(data.type, data.data)}
          <p className={classes.location}>{`${data.city}, ${data.state}`}</p>
        </div>
      </div>
    ))
  )
}

export default withStyles(styles)(FilteredData)
