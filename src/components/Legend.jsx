import React from "react"
import withStyles from "react-jss"
import { EssayIcon, EventIcon, SocialIcon } from "../assets/icons"

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  item: {
    padding: "0.6rem 1rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  image: {
    height: "35px",
  },
  label: {
    fontSize: "12px",
  },
}

const Legend = ({ classes }) => {
  const items = [
    {
      image: EssayIcon,
      text: "Essays",
    },
    {
      image: EventIcon,
      text: "Events",
    },
    {
      image: SocialIcon,
      text: "Social",
    },
  ]
  return (
    <div className={classes.container}>
      {items.map(({ image, text }, i) => (
        <div key={i} className={classes.item}>
          <img className={classes.image} src={image} alt={text} />
          <p className={classes.label}>{text}</p>
        </div>
      ))}
    </div>
  )
}

export default withStyles(styles)(Legend)
