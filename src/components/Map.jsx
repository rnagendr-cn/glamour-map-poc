import React, { useState, useEffect } from "react"
import withStyles from "react-jss"
import { geoPath, geoAlbersUsa, curveCatmullRomClosed } from "d3"
import { feature } from "topojson-client"
import { isMobile } from "react-device-detect"
import countiesAlbersData from "../data/counties-albers-10m.json"
import { locations } from "../data"
import { Tooltip, FilteredData, Dropdown } from "."
import { geoCurvePath } from "../utils/softBorders"
import { EssayIcon, EventIcon, SocialIcon } from "../assets/icons"

const styles = {
  image: {
    cursor: "pointer",
  },
  dataContainer: {
    display: "flex",
    flexDirection: "column",
  },
}

const Map = ({ classes }) => {
  const height = 975,
    width = 610,
    stateBorderWidth = 1.5

  const projection = geoAlbersUsa().scale(1300).translate([487.5, 305])
  const path = geoPath()

  const [nationData] = useState(
    () =>
      feature(countiesAlbersData, countiesAlbersData.objects.nation).features[0]
  )

  const [statesData] = useState(
    () =>
      feature(countiesAlbersData, countiesAlbersData.objects.states).features
  )

  const getMarkerData = (type, [x, y]) => {
    if (type === "essays") {
      const width = 45.5,
        height = 42.5,
        w2 = width / 2,
        h2 = height / 2
      return {
        href: EssayIcon,
        width,
        height,
        // Position image at center of the location
        x: x - w2,
        y: y - h2,
      }
    } else if (type === "events") {
      const width = 39.5,
        height = 40,
        w2 = width / 2,
        h2 = height / 2
      return {
        href: EventIcon,
        width,
        height,
        // Position image at center of the location
        x: x - w2,
        y: y - h2,
      }
    } else if (type === "social") {
      const width = 43.25,
        height = 50.47,
        w2 = width / 2,
        h2 = height / 2
      return {
        href: SocialIcon,
        width,
        height,
        // Position image at center of the location
        x: x - w2,
        y: y - h2,
      }
    }
  }

  const [tooltip, setTooltip] = useState(false)
  const [tooltipPosition, setTooltipPosition] = useState([])
  const [type, setType] = useState("")
  const [tooltipData, setTooltipData] = useState({})

  const activateTooltip = (e, type, data) => {
    if (!isMobile) {
      setTooltip(true)
      setTooltipPosition([e.clientX, e.clientY])
      setType(type)
      setTooltipData(data)
    }
  }

  const [activeState, setActiveState] = useState("")
  const [activeStateData, setActiveStateData] = useState([])

  const highlightState = (data) => {
    if (isMobile) {
      const state = data.properties.name

      if (activeState === state) {
        setActiveState("")
      } else {
        setActiveState(state)
      }
    }
  }

  useEffect(() => {
    if (isMobile) {
      if (activeState === "") {
        setActiveStateData([])
      } else {
        setActiveStateData(locations.filter((d) => d.state === activeState))
      }
    }
  }, [activeState])

  return (
    <>
      <svg viewBox={[0, 0, height, width]}>
        <filter
          x="-2%"
          y="-2%"
          width="104%"
          height="104%"
          filterUnits="objectBoundingBox"
          id="pencilTexture">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="1.2"
            numOctaves="3"
            result="noise"
          />
          <feDisplacementMap
            xChannelSelector="R"
            yChannelSelector="G"
            scale="3"
            in="SourceGraphic"
            result="newSource"
          />
        </filter>
        <filter
          x="0%"
          y="0%"
          width="100%"
          height="100%"
          filterUnits="objectBoundingBox"
          id="pencilTexture2">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="2"
            numOctaves="5"
            stitchTiles="stitch"
            result="f1"></feTurbulence>
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0, 0 0 0 0 0, 0 0 0 0 0, 0 0 0 -1.5 1.5"
            result="f2"></feColorMatrix>
          <feComposite
            operator="in"
            in2="f2"
            in="SourceGraphic"
            result="f3"></feComposite>
        </filter>
        <rect
          x="0"
          y="0"
          width={10000}
          height={10000}
          fill="white"
          onClick={() => setActiveState("")}
        />
        {/* State borders */}
        <g filter="url(#pencilTexture)">
          {statesData &&
            statesData.map((item) => {
              return (
                <path
                  key={item.id}
                  fill={
                    item.properties.name === activeState ? "#EEEEEE" : "white"
                  }
                  stroke="#A5A5A5"
                  strokeWidth={stateBorderWidth}
                  // d={path(item)}
                  d={geoCurvePath(curveCatmullRomClosed)(item)}
                  onClick={() => highlightState(item)}
                />
              )
            })}
        </g>

        {/* Hide the large nation's borders caused by state borders */}
        {nationData && (
          <path
            d={geoCurvePath(curveCatmullRomClosed)(nationData)}
            fill="none"
            stroke="white"
            strokeWidth={stateBorderWidth}
          />
        )}

        {/* National border */}
        {nationData && (
          <path
            d={geoCurvePath(curveCatmullRomClosed)(nationData)}
            // d={path(nationData)}
            // d={geoCurvePath(curveCatmullRomClosed)(nationData)}
            fill="none"
            stroke="black"
            strokeWidth="2"
          />
        )}
        {/* Markers */}
        <g className="markers">
          {locations.map(({ type, lat, long, data }, i) => {
            const location = projection([long, lat])
            const marker = getMarkerData(type, location)
            return (
              <image
                key={i}
                className={classes.image}
                {...marker}
                onMouseEnter={(e) => activateTooltip(e, type, data)}
                onMouseLeave={() => {
                  setTooltip(false)
                }}
              />
            )
          })}
        </g>
      </svg>
      {tooltip && (
        <Tooltip
          type={type}
          data={tooltipData}
          position={tooltipPosition}
          setTooltip={setTooltip}
        />
      )}
      {isMobile && (
        <Dropdown activeState={activeState} setActiveState={setActiveState} />
      )}
      {isMobile && activeState ? (
        <FilteredData activeState={activeState} data={activeStateData} />
      ) : null}
    </>
  )
}

export default withStyles(styles)(Map)
