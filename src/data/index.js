import SocialPost from "../assets/social-post.png"
import SocialPost2 from "../assets/social-post-2.png"

export const locations = [
  {
    type: "essays",
    city: "New York",
    state: "New York",
    lat: 40.712,
    long: -74.006,
    data: {
      title: "Personal Essay",
      quote:
        "It wasn't until I met other women with the same concerns that I felt seen.",
      location: "New York",
      link: "",
    },
  },
  {
    type: "events",
    city: "Chicago",
    state: "Illinois",
    lat: 41.8781,
    long: -87.6298,
    data: {
      title: "Event",
      description: "This is a sample event description.",
    },
  },
  {
    type: "social",
    city: "Denver",
    state: "Colorado",
    lat: 39.7392,
    long: -104.9903,
    data: {
      title: "#WhatUnitesUs",
      image: SocialPost,
    },
  },
  {
    type: "essays",
    city: "San Diego",
    state: "California",
    lat: 32.7157,
    long: -117.1611,
    data: {
      title: "Personal Essay",
      quote:
        "It wasn't until I met other women with the same concerns that I felt seen.",
      location: "San Diego, CA",
      link: "",
    },
  },
  {
    type: "essays",
    city: "Phoenix, AZ",
    state: "Arizona",
    lat: 33.4484,
    long: -112.074,
    data: {
      title: "Personal Essay",
      quote:
        "It wasn't until I met other women with the same concerns that I felt seen.",
      location: "Phoenix, AZ",
      link: "",
    },
  },
  {
    type: "social",
    city: "Kansas City",
    state: "Missouri",
    lat: 39.0997,
    long: -94.5786,
    data: {
      title: "#WhatUnitesUs",
      image: SocialPost2,
    },
  },
  {
    type: "events",
    city: "Las Vegas",
    state: "Nevada",
    lat: 36.1699,
    long: -115.1398,
    data: {
      title: "Event",
      description: "This is a sample event description.",
    },
  },
]
