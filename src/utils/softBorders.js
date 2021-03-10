import { path, geoPath } from "d3"

export const curveContext = (curve) => {
  return {
    moveTo(x, y) {
      curve.lineStart()
      curve.point(x, y)
    },
    lineTo(x, y) {
      curve.point(x, y)
    },
    closePath() {
      curve.lineEnd()
    },
  }
}

export const geoCurvePath = (curve, projection, context) => {
  return (object) => {
    const pathContext = context === undefined ? path() : context
    geoPath(projection, curveContext(curve(pathContext)))(object)
    return context === undefined ? pathContext + "" : undefined
  }
}
