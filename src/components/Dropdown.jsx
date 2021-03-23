import React, { useState } from "react"
import withStyles from "react-jss"
import { options } from "../data"
import Down from "../assets/icons/chevron-down.svg"

const styles = {
  select: {
    position: "relative",
    minWidth: "180px",
    alignSelf: "flex-start",
    margin: "1rem",
  },
  selected: {
    padding: "1rem 0.2rem",
    borderBottom: "1px solid black",
    fontSize: "min(18px, calc(10px + 1.7vmin))",
    fontWeight: "700",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    cursor: "pointer",
  },
  icon: {
    marginLeft: "0.5rem",
    width: "26px",
    height: "26px",
  },
  options: {
    marginTop: "0.5rem",
    border: "1px solid black",
    maxHeight: "210px",
    background: "white",
    overflowY: "scroll",
    position: "absolute",
    zIndex: "50",
  },
  option: {
    padding: "0.7rem 1rem",
    margin: 0,
    cursor: "pointer",
    "&:hover": {
      background: "black",
      color: "white",
    },
  },
}

const Dropdown = ({ classes, activeState, setActiveState }) => {
  const [active, setActive] = useState(false)

  const toggle = () => {
    if (active) {
      setActive(false)
      return
    }
    setActive(true)
  }

  const keyboardToggle = ({ code }) => {
    // Open the dropdown
    if (code === "Enter" || code === "Space") {
      toggle()
      return
    }
    // Toggle the next / previous option using arrow keys
    if (code === "ArrowDown" || code === "ArrowUp") {
      let activeOption = "Clear selection"
      if (activeState !== "") {
        activeOption = activeState
      }
      const index = options.indexOf(activeOption)
      const length = options.length
      if (code === "ArrowDown") {
        if (index + 1 > length - 1) {
          handleSelection(options[0])
        } else {
          handleSelection(options[index + 1])
        }
      } else if (code === "ArrowUp") {
        if (index - 1 < 0) {
          handleSelection(options[length - 1])
        } else {
          handleSelection(options[index - 1])
        }
      }
      setActive(false)
    }
  }

  const handleSelection = (selection) => {
    if (selection === "Clear selection") {
      setActiveState("")
      return
    }
    setActiveState(selection)
  }

  return (
    <div className={classes.select} onClick={toggle}>
      <div className={classes.selected} tabIndex="0" onKeyDown={keyboardToggle}>
        {activeState ? activeState : "Select a State"}
        <img className={classes.icon} src={Down} />
      </div>
      {active && (
        <div className={classes.options}>
          {options.map((option, i) => (
            <p
              key={i}
              className={classes.option}
              onClick={() => handleSelection(option)}>
              {option}
            </p>
          ))}
        </div>
      )}
    </div>
  )
}

export default withStyles(styles)(Dropdown)
