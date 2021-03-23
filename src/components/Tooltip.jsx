import React from "react"
import withStyles from "react-jss"

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    flexDirection: "column",
    background: "white",
    border: "1px solid black",
    padding: "1.7rem 1.2rem",
    maxWidth: "20vw",
    minWidth: "280px",
    zIndex: "100",
  },
  title: {
    margin: "0 0 1rem 0",
    fontWeight: "bold",
    fontSize: "18px",
  },
  quote: {
    padding: "0 0 0 15px",
    fontSize: "14px",
    fontWeight: "bold",
    margin: "0.5rem 0",
    borderLeft: "3px solid red",
  },
  location: {
    fontSize: "13px",
    margin: "0.5rem 0 1rem 0",
  },
  expand: {
    fontSize: "12px",
    fontWeight: "bold",
    margin: "0.3rem 0 0 0",
    textDecoration: "inherit",
    color: "inherit",
    "&:visited": {
      textDecoration: "inherit",
      color: "inherit",
    },
  },
  expandSymbol: {
    fontSize: "10px",
  },
  image: {
    maxWidth: "100%",
    height: "auto",
    alignSelf: "center",
  },
  description: {
    fontSize: "14px",
    margin: "0.5rem 0",
  },
}

const EssaysView = ({ classes, data: { title, quote, location, link } }) => (
  <>
    <p className={classes.title}>{title}</p>
    <blockquote className={classes.quote}>"{quote}"</blockquote>
    <p className={classes.location}>{location}</p>
    <a className={classes.expand} href={link}>
      READ MORE <span className={classes.expandSymbol}>></span>
    </a>
  </>
)

const EventView = ({ classes, data: { title, description, rsvp } }) => (
  <>
    <p className={classes.title}>{title}</p>
    <p className={classes.description}>{description}</p>
    <a className={classes.expand} href={`mailto:${rsvp}`}>
      RSVP <span className={classes.expandSymbol}>></span>
    </a>
  </>
)

const SocialView = ({ classes, data: { title, image } }) => (
  <>
    <p className={classes.title}>{title}</p>
    <img className={classes.image} src={image} alt="Instagram post" />
  </>
)

const Tooltip = ({ classes, type, data, position, setTooltip }) => {
  const displayTooltip = (type) => {
    if (type === "essays") {
      return <EssaysView classes={classes} data={data} />
    } else if (type === "events") {
      return <EventView classes={classes} data={data} />
    } else if (type === "social") {
      return <SocialView classes={classes} data={data} />
    }
  }

  let styles = {
    position: "absolute",
    transition:
      "left 0.3s ease-in-out, top 0.3s ease-in-out, right 0.3s ease-in-out",
    left: `${position[0]}px`,
    top: `${position[1]}px`,
  }

  if (position[0] + 320 >= window.innerWidth) {
    styles = {
      ...styles,
      left: `${position[0] - 320}px`,
    }
  }
  if (position[1] + 220 >= window.innerHeight) {
    styles = {
      ...styles,
      top: `${position[1] - 120}px`,
    }
  }
  if (window.innerWidth < 480) {
    const sidePadding = (window.innerWidth - 280) / 2
    styles = {
      ...styles,
      left: `${sidePadding}px`,
    }
  }

  return (
    <div
      className={classes.container}
      style={styles}
      onMouseEnter={() => setTooltip(true)}
      onMouseLeave={() => setTooltip(false)}>
      {displayTooltip(type)}
    </div>
  )
}

export default withStyles(styles)(Tooltip)
